"use client";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from 'sonner';
import { X, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEmailAccounts } from "@/hooks/useEmailAccounts";
import { locationService, campaignService, clientService } from "@/services/api";

export default function CreateSDRModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    domain: "",
    emailAccount: "",
    targetRegions: [], 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [emailAccountOptions, setEmailAccountOptions] = useState([]);
  const { emailAccounts, isLoading: isLoadingEmailAccounts } = useEmailAccounts();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load initial location data and email accounts
  useEffect(() => {
    const loadInitialLocations = async () => {
      try {
        setIsLoadingLocations(true);
        const countries = await locationService.getAllCountries();
        const formattedOptions = countries.map(country => ({
          value: `country:${country.code}`,
          label: `${country.flag} ${country.name}`,
          type: 'country',
          country: country
        }));
        setLocationOptions(formattedOptions);
      } catch (error) {
        console.error('Error loading countries:', error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    if (isOpen) {
      loadInitialLocations();
    }
  }, [isOpen]);

  // Transform email accounts to combobox options
  useEffect(() => {
    const emailOptions = emailAccounts.map(account => ({
      value: account.id,
      label: `${account.email} (${account.provider})`,
      account: account
    }));
    setEmailAccountOptions(emailOptions);
  }, [emailAccounts]);

  // Handle location search
  const handleLocationSearch = useCallback(async (query) => {
    if (!query || query.length < 2) {
      // Reset to countries only
      try {
        const countries = await locationService.getAllCountries();
        const formattedOptions = countries.map(country => ({
          value: `country:${country.code}`,
          label: `${country.flag} ${country.name}`,
          type: 'country',
          country: country
        }));
        setLocationOptions(formattedOptions);
      } catch (error) {
        console.error('Error loading countries:', error);
      }
      return;
    }

    try {
      setIsLoadingLocations(true);
      const results = await locationService.searchLocations(query);
      
      const formattedOptions = results.map(location => {
        if (location.type === 'country') {
          return {
            value: `country:${location.code}`,
            label: `${location.flag} ${location.name}`,
            type: 'country',
            country: location
          };
        } else {
          // State/province
          const countryFlag = location.countryCode === 'US' ? '🇺🇸' : 
                            location.countryCode === 'CA' ? '🇨🇦' : 
                            location.countryCode === 'GB' ? '🇬🇧' : 
                            location.countryCode === 'AU' ? '🇦🇺' : '🌍';
          return {
            value: `state:${location.countryCode}:${location.code}`,
            label: `${countryFlag} ${location.name}, ${location.countryCode}`,
            type: 'state',
            state: location
          };
        }
      });
      
      setLocationOptions(formattedOptions);
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setIsLoadingLocations(false);
    }
  }, []);

  // Handle region selection
  const handleRegionChange = (selectedRegions) => {
    setFormData(prev => ({
      ...prev,
      targetRegions: selectedRegions
    }));
  };

  // Handle email account selection
  const handleEmailAccountChange = (selectedAccount) => {
    setFormData(prev => ({
      ...prev,
      emailAccount: selectedAccount
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get the selected email account information
      const selectedEmailAccount = emailAccounts.find(account => account.id === formData.emailAccount);
      
      if (!selectedEmailAccount) {
        throw new Error("Selected email account not found");
      }

      console.log("Creating SDR Agent with:", {
        domain: formData.domain,
        emailAccount: selectedEmailAccount.email,
        targetRegions: formData.targetRegions
      });

      // Step 1: Create client domain entry
      try {
        const clientData = {
          domain: formData.domain,
          name: `Client for ${formData.domain}`,
          target_regions: formData.targetRegions,
          created_at: new Date().toISOString(),
          status: 'active'
        };
        
        // const clientResult = await clientService.createClient(clientData);
        console.log("Client created successfully:", clientResult);
      } catch (clientError) {
        console.warn("Client creation failed, continuing with campaign creation:", clientError);
        // Continue even if client creation fails, as it might already exist
      }

      // Step 2: Create campaign template with orchestrated API calls
      const campaignData = campaignService.buildCampaignData(formData, selectedEmailAccount);
      const campaignResult = await campaignService.createCampaignTemplate(campaignData);
      
      console.log("Campaign template created successfully:", campaignResult);
      
      // Check for any failed parallel operations and show warnings
      const { parallelResults } = campaignResult;
      const failedOperations = [];
      
      if (parallelResults.schedule.status === 'rejected') {
        failedOperations.push('Schedule update');
      }
      if (parallelResults.settings.status === 'rejected') {
        failedOperations.push('Settings update');
      }
      if (parallelResults.sequence.status === 'rejected') {
        failedOperations.push('Sequence creation');
      }
      if (parallelResults.attachment.status === 'rejected') {
        failedOperations.push('Email attachment');
      }
      
      // Reset form and close modal
      setFormData({ domain: "", emailAccount: "", targetRegions: [] });
      onClose();
      
      // Success message with warnings if any operations failed
      if (failedOperations.length > 0) {
        toast.success(`SDR Agent created for ${formData.domain}`, {
          description: `Campaign created successfully. Warning: ${failedOperations.join(', ')} failed but can be configured later.`
        });
      } else {
        toast.success(`SDR Agent created for ${formData.domain}`, {
          description: `Campaign: ${campaignData.campaignName} • Email: ${selectedEmailAccount.email} • Regions: ${formData.targetRegions.length}`
        });
      }
      
    } catch (error) {
      console.error("Error creating SDR agent:", error);
      
      // Extract meaningful error message
      let errorMessage = "Error creating SDR agent. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(`Failed to create SDR Agent`, { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.domain && formData.emailAccount && formData.targetRegions.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Create SDR Agent
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Set up your AI-powered Sales Development Representative to automate your outreach campaigns.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Domain Field */}
          <div className="space-y-2">
            <Label htmlFor="domain" className="text-white font-medium">
              Target Domain
            </Label>
            <Input
              id="domain"
              name="domain"
              type="text"
              placeholder="e.g., techstartup.com"
              value={formData.domain}
              onChange={handleInputChange}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/50"
              required
            />
            <p className="text-xs text-white/60">
              Enter the domain of companies you want to target for outreach
            </p>
          </div>

          {/* Email Account Selection */}
          <div className="space-y-2">
            <Label className="text-white font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Account
            </Label>
            <Combobox
              options={emailAccountOptions}
              value={formData.emailAccount}
              onValueChange={handleEmailAccountChange}
              placeholder="Select an email account..."
              searchPlaceholder="Search email accounts..."
              emptyText={isLoadingEmailAccounts ? "Loading email accounts..." : "No email accounts found."}
              loading={isLoadingEmailAccounts}
              multiple={false}
              className="w-full [&>button]:bg-white/10 [&>button]:border-white/30 [&>button]:text-white [&>button:hover]:bg-white/20 [&>button]:focus:border-white/50"
              renderOption={(option) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{option.account?.email}</span>
                    <span className="text-xs text-muted-foreground">
                      {option.account?.provider} • {option.account?.messagePerDay} msgs/day
                    </span>
                  </div>
                  {option.account?.isVerified && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              )}
              renderValue={(values, options) => {
                if (!values || values === "") return "Select an email account...";
                const option = options.find(opt => opt.value === values);
                return option ? option.account?.email : values;
              }}
            />
            <p className="text-xs text-white/60">
              Choose which email account the SDR will use for outreach
            </p>
          </div>

          {/* Target Regions Selection */}
          <div className="space-y-2">
            <Label className="text-white font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Target Regions
            </Label>
            <Combobox
              options={locationOptions}
              value={formData.targetRegions}
              onValueChange={handleRegionChange}
              onSearch={handleLocationSearch}
              placeholder="Select countries or states..."
              searchPlaceholder="Search countries and states..."
              emptyText={isLoadingLocations ? "Loading locations..." : "No locations found."}
              loading={isLoadingLocations}
              multiple={true}
              className="w-full [&>button]:bg-white/10 [&>button]:border-white/30 [&>button]:text-white [&>button:hover]:bg-white/20 [&>button]:focus:border-white/50"
              renderOption={(option) => (
                <div className="flex items-center gap-2">
                  <span>{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.type === 'country' ? 'Country' : 'State/Province'}
                  </span>
                </div>
              )}
              renderValue={(values, options) => {
                if (values.length === 0) return "Select regions to target...";
                if (values.length === 1) {
                  const option = options.find(opt => opt.value === values[0]);
                  return option?.label || values[0];
                }
                return `${values.length} regions selected`;
              }}
            />
            <p className="text-xs text-white/60">
              Select the countries and states you want to target for lead generation. You can search and select multiple regions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </div>
              ) : (
                "Create SDR Agent"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
