"use client";
import React, { useState } from "react";
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

export default function AddEmailModal({ isOpen, onClose, onEmailAdded }) {
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
      // Simulate API call to verify and save email account
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log("Adding email account:", formData);
      
      // Call the callback to update parent component
      if (onEmailAdded) {
        onEmailAdded({
          id: Date.now().toString(),
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
      
      alert("Email account added and verified successfully!");
      
    } catch (error) {
      console.error("Error adding email account:", error);
      alert("Error adding email account. Please check your settings and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white border border-gray-200 text-gray-900">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              Add Email
              <button
                onClick={onClose}
                className="ml-auto p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Read the full tutorial on setting up your{" "}
              <a href="#" className="text-blue-500 hover:underline">
                email account here
              </a>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* SMTP Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                SMTP Settings (sending emails)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From Name */}
                <div className="space-y-2">
                  <Label htmlFor="fromName" className="text-gray-700 font-medium">
                    From Name
                  </Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    type="text"
                    value={formData.fromName}
                    onChange={handleInputChange}
                    className={`${errors.fromName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500`}
                    required
                  />
                  {errors.fromName && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span>!</span> {errors.fromName}
                    </p>
                  )}
                </div>

                {/* From Email */}
                <div className="space-y-2">
                  <Label htmlFor="fromEmail" className="text-gray-700 font-medium">
                    From Email
                  </Label>
                  <Input
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    value={formData.fromEmail}
                    onChange={handleInputChange}
                    className={`${errors.fromEmail ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500`}
                    required
                  />
                  {errors.fromEmail && (
                    <p className="text-red-500 text-sm">{errors.fromEmail}</p>
                  )}
                </div>

                {/* User Name */}
                <div className="space-y-2">
                  <Label htmlFor="userName" className="text-gray-700 font-medium">
                    User Name
                  </Label>
                  <Input
                    id="userName"
                    name="userName"
                    type="text"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className={`${errors.userName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500`}
                    required
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm">{errors.userName}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 pr-10`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* SMTP Host */}
                <div className="space-y-2">
                  <Label htmlFor="smtpHost" className="text-gray-700 font-medium">
                    SMTP Host
                  </Label>
                  <Input
                    id="smtpHost"
                    name="smtpHost"
                    type="text"
                    value={formData.smtpHost}
                    onChange={handleInputChange}
                    className={`${errors.smtpHost ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500`}
                    required
                  />
                  {errors.smtpHost && (
                    <p className="text-red-500 text-sm">{errors.smtpHost}</p>
                  )}
                </div>

                {/* SMTP Port */}
                <div className="space-y-2">
                  <Label htmlFor="smtpPort" className="text-gray-700 font-medium">
                    SMTP Port
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="smtpPort"
                      name="smtpPort"
                      type="number"
                      value={formData.smtpPort}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 w-24"
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
                            className="text-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Messages Per Day */}
                <div className="space-y-2">
                  <Label htmlFor="messagesPerDay" className="text-gray-700 font-medium flex items-center gap-1">
                    Message Per Day (Warmups not included)
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
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
                    value={formData.messagesPerDay}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                {/* Minimum Time Gap */}
                <div className="space-y-2">
                  <Label htmlFor="minimumTimeGap" className="text-gray-700 font-medium flex items-center gap-1">
                    Minimum time gap (min)
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
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
                    value={formData.minimumTimeGap}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500"
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
                  <span className="text-gray-700">Set a different reply to address</span>
                </label>
              </div>
            </div>

            {/* IMAP Settings */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
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
                  <span className="text-gray-700">Use different email accounts for receiving emails</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* IMAP Host */}
                <div className="space-y-2">
                  <Label htmlFor="imapHost" className="text-gray-700 font-medium">
                    IMAP Host
                  </Label>
                  <Input
                    id="imapHost"
                    name="imapHost"
                    type="text"
                    value={formData.imapHost}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                {/* IMAP Port */}
                <div className="space-y-2">
                  <Label htmlFor="imapPort" className="text-gray-700 font-medium">
                    IMAP Port
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="imapPort"
                      name="imapPort"
                      type="number"
                      value={formData.imapPort}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 w-24"
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
                            className="text-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t">
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
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Verifying Email Account...
                  </div>
                ) : (
                  "Verify Email Account"
                )}
              </Button>
              <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
