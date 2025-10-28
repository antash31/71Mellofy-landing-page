"use client";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from 'sonner';
import { X, MapPin, Mail, MailCheckIcon, Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
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
import { useSelector } from "react-redux";
import ConfirmSDRModal from "./ConfirmSDRModal";

export default function CreateSDRModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    domain: "",
    emailAccount: { id: "", email_address: "" },
    targetRegions: [],
    meetingLink: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [domainError, setDomainError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [fileUploadStatus, setFileUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  // const [locationOptions, setLocationOptions] = useState([]);
  // const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [emailAccountOptions, setEmailAccountOptions] = useState([]);
  const emailAccounts = useSelector((state) => state.auth.emailAccounts) || [];
  const isLoadingEmailAccounts = useSelector((state) => state.auth.isLoadingEmailAccounts);

  const validateDomain = (url) => {
    try {
      // Remove protocol if exists and clean up the URL
      let domain = url.trim().toLowerCase();
      if (domain.startsWith('http://')) domain = domain.slice(7);
      if (domain.startsWith('https://')) domain = domain.slice(8);
      if (domain.startsWith('www.')) domain = domain.slice(4);

      // Remove path and query parameters
      domain = domain.split('/')[0];

      // Basic domain validation regex
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

      if (!domainRegex.test(domain)) {
        return { isValid: false, error: "Please enter a valid domain (e.g., example.com)" };
      }

      return { isValid: true, domain };
    } catch (error) {
      return { isValid: false, error: "Invalid URL format" };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'domain') {
      const { isValid, error, domain } = validateDomain(value);
      setDomainError(isValid ? "" : error);

      // Still update the form value to show user input
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Load initial location data and email accounts
  // useEffect(() => {
  //   const loadInitialLocations = async () => {
  //     try {
  //       setIsLoadingLocations(true);
  //       const countries = await locationService.getAllCountries();
  //       const formattedOptions = countries.map(country => ({
  //         value: `country:${country.code}`,
  //         label: `${country.flag} ${country.name}`,
  //         type: 'country',
  //         country: country
  //       }));
  //       setLocationOptions(formattedOptions);
  //     } catch (error) {
  //       console.error('Error loading countries:', error);
  //     } finally {
  //       setIsLoadingLocations(false);
  //     }
  //   };

  //   if (isOpen) {
  //     loadInitialLocations();
  //   }
  // }, [isOpen]);

  // Transform email accounts to combobox options
  useEffect(() => {
    const emailOptions = emailAccounts?.map(account => ({
      value: account.email_address,
      label: `${account.email_address}`,
      account: account
    }));
    setEmailAccountOptions(emailOptions);
  }, [emailAccounts]);

  // Handle location search
  // const handleLocationSearch = useCallback(async (query) => {
  //   if (!query || query.length < 2) {
  //     // Reset to countries only
  //     try {
  //       const countries = await locationService.getAllCountries();
  //       const formattedOptions = countries.map(country => ({
  //         value: `country:${country.code}`,
  //         label: `${country.flag} ${country.name}`,
  //         type: 'country',
  //         country: country
  //       }));
  //       setLocationOptions(formattedOptions);
  //     } catch (error) {
  //       console.error('Error loading countries:', error);
  //     }
  //     return;
  //   }

  //   try {
  //     setIsLoadingLocations(true);
  //     const results = await locationService.searchLocations(query);

  //     const formattedOptions = results.map(location => {
  //       if (location.type === 'country') {
  //         return {
  //           value: `country:${location.code}`,
  //           label: `${location.flag} ${location.name}`,
  //           type: 'country',
  //           country: location
  //         };
  //       } else {
  //         // State/province
  //         const countryFlag = location.countryCode === 'US' ? '🇺🇸' : 
  //                           location.countryCode === 'CA' ? '🇨🇦' : 
  //                           location.countryCode === 'GB' ? '🇬🇧' : 
  //                           location.countryCode === 'AU' ? '🇦🇺' : '🌍';
  //         return {
  //           value: `state:${location.countryCode}:${location.code}`,
  //           label: `${countryFlag} ${location.name}, ${location.countryCode}`,
  //           type: 'state',
  //           state: location
  //         };
  //       }
  //     });

  //     setLocationOptions(formattedOptions);
  //   } catch (error) {
  //     console.error('Error searching locations:', error);
  //   } finally {
  //     setIsLoadingLocations(false);
  //   }
  // }, []);

  // // Handle region selection
  // const handleRegionChange = (selectedRegions) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     targetRegions: selectedRegions
  //   }));
  // };

  // Handle email account selection
  const handleEmailAccountChange = (selectedAccount) => {
    setFormData(prev => ({
      ...prev,
      emailAccount: { email_address: selectedAccount }
    }));
  };

  // Handle CSV file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type (CSV only)
      const allowedTypes = ['text/csv', 'application/vnd.ms-excel'];
      const isCSV = allowedTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.csv');
      
      if (isCSV) {
        setCsvFile(selectedFile);
        setFileUploadStatus('idle');
      } else {
        toast.error('Invalid file type', {
          description: 'Please upload a CSV file (.csv)'
        });
      }
    }
  };

  const removeFile = () => {
    setCsvFile(null);
    setFileUploadStatus('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmCreate = async () => {
    setIsLoading(true);
    setShowConfirmModal(false);

    try {
      const selectedEmailAccount = emailAccounts.find(account => account.email_address === formData.emailAccount.email_address);

      if (!selectedEmailAccount) {
        throw new Error("Selected email account not found");
      }

      // Upload CSV file if one is selected
      let uploadedData = null;
      if (csvFile) {
        setFileUploadStatus('uploading');
        
        try {
          const metadata = {
            domain: formData.domain,
            emailAccount: selectedEmailAccount.email_address,
            uploadedAt: new Date().toISOString()
          };
          
          uploadedData = await campaignService.updateCsvUpload(csvFile, metadata);
          setFileUploadStatus('success');
          console.log('CSV upload successful:', uploadedData);
        } catch (uploadError) {
          setFileUploadStatus('error');
          console.error('CSV upload failed:', uploadError);
          toast.error('File upload failed', {
            description: 'Continuing with campaign creation, but client data from CSV was not uploaded.'
          });
        }
      }
      try {
        const clientData = {
          domain: formData.domain,
          name: `Client for ${formData.domain}`,
          target_regions: formData.targetRegions,
          created_at: new Date().toISOString(),
          status: 'active'
        };

        const clientResult = await clientService.createClient(clientData);

        console.log({clientResult})

      } catch (clientError) {
        console.error("Client creation failed, continuing with campaign creation:", clientError);
      }

      const campaignData = campaignService.buildCampaignData(formData, selectedEmailAccount);
      const campaignResult = await campaignService.createCampaignTemplate(campaignData);

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

      setFormData({ domain: "", emailAccount: "" });
      setCsvFile(null);
      setFileUploadStatus('idle');
      onClose();

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
      let errorMessage = "Error creating SDR agent. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(`Failed to create SDR Agent`, { description: errorMessage });
    } finally {
      setIsLoading(false);
      // window.location.reload();
    }
  };

  const isFormValid = formData.domain && formData.emailAccount.email_address && !domainError;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create SDR Agent
          </DialogTitle>
          <DialogDescription>
            Set up your AI-powered Sales Development Representative to automate your outreach campaigns.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Domain Field */}
          <div className="space-y-2">
            <Label htmlFor="domain" className="font-medium">
              Target Link (The website link of the company you want to find ICP for)
            </Label>
            <div className="relative">
              <Input
                id="domain"
                name="domain"
                type="text"
                placeholder="e.g., techstartup.com"
                value={formData.domain}
                onChange={handleInputChange}
                className={`${domainError
                  ? 'border-red-500 focus:border-red-500'
                  : formData.domain
                    ? 'border-green-500 focus:border-green-500'
                    : ''
                  }`}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter the domain or website link of the company you want to target for outreach
            </p>
            {domainError && (
              <p className=" -bottom-6 left-0 text-xs text-red-500">
                {domainError}
              </p>
            )}
          </div>

          {/* Email Account Selection */}
          <div className="space-y-2">
            <Label className="font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Account
            </Label>
            <Combobox
              options={emailAccountOptions}
              value={formData.emailAccount.email_address}
              onValueChange={handleEmailAccountChange}
              placeholder="Select an email account..."
              searchPlaceholder="Search email accounts..."
              emptyText={isLoadingEmailAccounts ? "Loading email accounts..." : "No email accounts found."}
              loading={isLoadingEmailAccounts}
              multiple={false}
              className="w-full"
              renderOption={(option) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <MailCheckIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{option.account?.email_address}</span>
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
            <p className="text-xs text-muted-foreground">
              Select the email account that will be used for sending outreach emails. Make sure it's verified and has sufficient daily limits.
            </p>
          </div>

          {/* CSV File Upload */}
          <div className="space-y-2">
            <Label className="font-medium flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Client Data Upload (Optional)
            </Label>
            <div className="space-y-3">
              {!csvFile ? (
                <div className="relative">
                  <input
                    type="file"
                    id="csv-upload"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-foreground font-medium mb-1">Click to upload client data</p>
                    <p className="text-xs text-muted-foreground">CSV file only</p>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium text-sm">{csvFile.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {(csvFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {fileUploadStatus === 'success' && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {fileUploadStatus === 'error' && (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                      {fileUploadStatus === 'uploading' && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="p-1 h-auto"
                        disabled={fileUploadStatus === 'uploading'}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Upload a CSV file with your client list. The data will be processed and used for targeted outreach.
            </p>
          </div>

          {/* Meeting Link Field */}
          <div className="space-y-2">
            <Label htmlFor="meetingLink" className="font-medium">
              Meeting Link (Optional)
            </Label>
            <Input
              id="meetingLink"
              name="meetingLink"
              type="url"
              placeholder="e.g., https://calendly.com/yourname/meeting"
              value={formData.meetingLink}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground">
              Add your meeting scheduling link to include in outreach emails
            </p>
          </div>

          {/* Target Regions Selection
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
          </div> */}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
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

      <ConfirmSDRModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmCreate}
        formData={formData}
        selectedEmailAccount={emailAccounts.find(account => account.email_address === formData.emailAccount.email_address)}
        isLoading={isLoading}
      />
    </Dialog>
  );
}
