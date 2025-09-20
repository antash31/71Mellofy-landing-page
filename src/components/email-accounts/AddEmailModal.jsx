"use client";
import React, { useState } from "react";
import { toast } from 'sonner';
import { X, Eye, EyeOff, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { emailAccountsService } from '@/services/api';
import { useEmailAccounts } from "@/hooks/useEmailAccounts";

export default function AddEmailModal({ isOpen, onClose, onEmailAdded }) {
  const { refreshEmailAccounts } = useEmailAccounts();
  const [formData, setFormData] = useState({
    fromName: "",
    fromEmail: "",
    userName: "",
    password: "",
    smtpHost: "",
    smtpPort: "465",
    smtpSecurity: "SSL",
    messagesPerDay: "25",
    minimumTimeGap: "",
    replyToAddress: false,
    useDifferentIMAP: false,
    imapHost: "",
    imapPort: "993",
    imapSecurity: "SSL",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fromName.trim()) newErrors.fromName = "From Name is required";
    if (!formData.fromEmail.trim()) newErrors.fromEmail = "From Email is required";
    if (!formData.userName.trim()) newErrors.userName = "User Name is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.smtpHost.trim()) newErrors.smtpHost = "SMTP Host is required";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.fromEmail && !emailRegex.test(formData.fromEmail)) {
      newErrors.fromEmail = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      // Prepare the API payload
      const apiPayload = {
        id: null,
        from_name: formData.fromName,
        from_email: formData.fromEmail,
        user_name: formData.userName,
        password: formData.password,
        smtp_host: formData.smtpHost,
        smtp_port: parseInt(formData.smtpPort),
        imap_host: formData.useDifferentIMAP ? formData.imapHost : formData.smtpHost.replace('smtp', 'imap'),
        imap_port: parseInt(formData.useDifferentIMAP ? formData.imapPort : '993'),
        max_email_per_day: parseInt(formData.messagesPerDay),
        custom_tracking_url: "",
        bcc: "",
        signature: "",
        warmup_enabled: false,
        total_warmup_per_day: null,
        daily_rampup: null,
        reply_rate_percentage: null,
        client_id: null
      };

      // Make API call to create email account using axios
      const result = await emailAccountsService.create(apiPayload);
      ("Email account created successfully:", result);
      
      // Refresh the email accounts context to get the latest data
      try {
        await refreshEmailAccounts();
      } catch (refreshError) {
        console.warn("Failed to refresh email accounts:", refreshError);
      }
      
      // Call the callback to update parent component
      if (onEmailAdded) {
        onEmailAdded({
          id: result.id || Date.now().toString(),
          email: formData.fromEmail,
          fromName: formData.fromName,
          provider: formData.smtpHost.includes('gmail') ? 'Gmail' : 
                   formData.smtpHost.includes('outlook') ? 'Outlook' : 'Custom',
          isVerified: true
        });
      }
      
      // Reset form and close modal
      setFormData({
        fromName: "",
        fromEmail: "",
        userName: "",
        password: "",
        smtpHost: "",
        smtpPort: "465",
        smtpSecurity: "SSL",
        messagesPerDay: "25",
        minimumTimeGap: "",
        replyToAddress: false,
        useDifferentIMAP: false,
        imapHost: "",
        imapPort: "993",
        imapSecurity: "SSL",
      });
      setErrors({});
      onClose();
      
      toast.success("Email account added and verified successfully!");
      
    } catch (error) {
      console.error("Error adding email account:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      toast.error(`Error adding email account: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!validateForm()) return;
    
    setIsVerifying(true);

    try {
      // Same API call but just for verification
      const apiPayload = {
        id: null,
        from_name: formData.fromName,
        from_email: formData.fromEmail,
        user_name: formData.userName,
        password: formData.password,
        smtp_host: formData.smtpHost,
        smtp_port: parseInt(formData.smtpPort),
        imap_host: formData.useDifferentIMAP ? formData.imapHost : formData.smtpHost.replace('smtp', 'imap'),
        imap_port: parseInt(formData.useDifferentIMAP ? formData.imapPort : '993'),
        max_email_per_day: parseInt(formData.messagesPerDay),
        custom_tracking_url: "",
        bcc: "",
        signature: "",
        warmup_enabled: false,
        total_warmup_per_day: null,
        daily_rampup: null,
        reply_rate_percentage: null,
        client_id: null
      };

      // Use axios to verify email account
      const result = await emailAccountsService.verify(apiPayload);
      ("Email account verified successfully:", result);
      toast.success("Email account verified successfully! Connection is working.");
      
    } catch (error) {
      console.error("Error verifying email account:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Verification failed';
      toast.error(`Verification failed: ${errorMessage}`);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card border text-card-foreground">
          <DialogHeader className="border-b border-border pb-4">
            <DialogTitle className="text-xl font-semibold text-card-foreground">
              Add Email
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Read the full tutorial on setting up your{" "}
              <a href="#" className="text-primary hover:underline">
                email account here
              </a>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* SMTP Settings */}
            <div>
              <h3 className="text-lg font-medium text-card-foreground mb-4">
                SMTP Settings (sending emails)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From Name */}
                <div className="space-y-2">
                  <Label htmlFor="fromName" className="text-foreground font-medium">
                    From Name
                  </Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.fromName}
                    onChange={handleInputChange}
                    className={`${errors.fromName ? 'border-destructive' : 'border-input'} focus:border-primary bg-background text-foreground`}
                    required
                  />
                  {errors.fromName && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <span>!</span> {errors.fromName}
                    </p>
                  )}
                </div>

                {/* From Email */}
                <div className="space-y-2">
                  <Label htmlFor="fromEmail" className="text-foreground font-medium">
                    From Email
                  </Label>
                  <Input
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.fromEmail}
                    onChange={handleInputChange}
                    className={`${errors.fromEmail ? 'border-destructive' : 'border-input'} focus:border-primary bg-background text-foreground`}
                    required
                  />
                  {errors.fromEmail && (
                    <p className="text-destructive text-sm">{errors.fromEmail}</p>
                  )}
                </div>

                {/* User Name */}
                <div className="space-y-2">
                  <Label htmlFor="userName" className="text-foreground font-medium">
                    User Name
                  </Label>
                  <Input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="your_email@company.com"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className={`${errors.userName ? 'border-destructive' : 'border-input'} focus:border-primary bg-background text-foreground`}
                    required
                  />
                  {errors.userName && (
                    <p className="text-destructive text-sm">{errors.userName}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your email password or app password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`${errors.password ? 'border-destructive' : 'border-input'} focus:border-primary bg-background text-foreground pr-10`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password}</p>
                  )}
                </div>

                {/* SMTP Host */}
                <div className="space-y-2">
                  <Label htmlFor="smtpHost" className="text-foreground font-medium">
                    SMTP Host
                  </Label>
                  <Input
                    id="smtpHost"
                    name="smtpHost"
                    type="text"
                    placeholder="smtp.gmail.com"
                    value={formData.smtpHost}
                    onChange={handleInputChange}
                    className={`${errors.smtpHost ? 'border-destructive' : 'border-input'} focus:border-primary bg-background text-foreground`}
                    required
                  />
                  {errors.smtpHost && (
                    <p className="text-destructive text-sm">{errors.smtpHost}</p>
                  )}
                </div>

                {/* SMTP Port */}
                <div className="space-y-2">
                  <Label htmlFor="smtpPort" className="text-foreground font-medium">
                    SMTP Port
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="smtpPort"
                      name="smtpPort"
                      type="number"
                      placeholder="465"
                      value={formData.smtpPort}
                      onChange={handleInputChange}
                      className="border-input focus:border-primary bg-background text-foreground w-24"
                    />
                    <div className="flex gap-4">
                      {['SSL', 'TLS', 'None'].map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="smtpSecurity"
                            value={option}
                            checked={formData.smtpSecurity === option}
                            onChange={handleInputChange}
                            className="text-primary"
                          />
                          <span className="text-foreground">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Messages Per Day */}
                <div className="space-y-2">
                  <Label htmlFor="messagesPerDay" className="text-foreground font-medium flex items-center gap-1">
                    Message Per Day (Warmups not included)
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Maximum number of messages to send per day</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="messagesPerDay"
                    name="messagesPerDay"
                    type="number"
                    placeholder="25"
                    value={formData.messagesPerDay}
                    onChange={handleInputChange}
                    className="border-input focus:border-primary bg-background text-foreground"
                  />
                </div>

                {/* Minimum Time Gap */}
                <div className="space-y-2">
                  <Label htmlFor="minimumTimeGap" className="text-foreground font-medium flex items-center gap-1">
                    Minimum time gap (min)
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Minimum time between messages in minutes</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="minimumTimeGap"
                    name="minimumTimeGap"
                    type="number"
                    placeholder="15"
                    value={formData.minimumTimeGap}
                    onChange={handleInputChange}
                    className="border-input focus:border-primary bg-background text-foreground"
                  />
                </div>
              </div>

              {/* Reply to address checkbox */}
              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="replyToAddress"
                    checked={formData.replyToAddress}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span className="text-foreground">Set a different reply to address</span>
                </label>
              </div>
            </div>

            {/* IMAP Settings */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium text-card-foreground mb-4">
                IMAP Settings (receives emails)
              </h3>

              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="useDifferentIMAP"
                    checked={formData.useDifferentIMAP}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span className="text-foreground">Use different email accounts for receiving emails</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* IMAP Host */}
                <div className="space-y-2">
                  <Label htmlFor="imapHost" className="text-foreground font-medium">
                    IMAP Host
                  </Label>
                  <Input
                    id="imapHost"
                    name="imapHost"
                    type="text"
                    placeholder="imap.gmail.com"
                    value={formData.imapHost}
                    onChange={handleInputChange}
                    className="border-input focus:border-primary bg-background text-foreground"
                  />
                </div>

                {/* IMAP Port */}
                <div className="space-y-2">
                  <Label htmlFor="imapPort" className="text-foreground font-medium">
                    IMAP Port
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="imapPort"
                      name="imapPort"
                      type="number"
                      placeholder="993"
                      value={formData.imapPort}
                      onChange={handleInputChange}
                      className="border-input focus:border-primary bg-background text-foreground w-24"
                    />
                    <div className="flex gap-4">
                      {['SSL', 'TLS', 'None'].map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="imapSecurity"
                            value={option}
                            checked={formData.imapSecurity === option}
                            onChange={handleInputChange}
                            className="text-primary"
                          />
                          <span className="text-foreground">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading || isVerifying}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                disabled={isLoading || isVerifying}
                onClick={handleVerifyEmail}
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary-foreground"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Email Account"
                )}
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                disabled={isLoading || isVerifying}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    Saving...
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
