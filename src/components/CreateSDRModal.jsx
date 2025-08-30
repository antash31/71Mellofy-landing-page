"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
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
import { useEmailAccounts } from "@/contexts/EmailAccountsContext";

export default function CreateSDRModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    domain: "",
    emailAccount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { emailAccounts } = useEmailAccounts();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Creating SDR Agent with:", formData);
      
      // Reset form and close modal
      setFormData({ domain: "", emailAccount: "" });
      onClose();
      
      // In a real app, you'd show a success message
      alert("SDR Agent created successfully!");
      
    } catch (error) {
      console.error("Error creating SDR agent:", error);
      alert("Error creating SDR agent. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.domain && formData.emailAccount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-black/95 backdrop-blur-xl border border-white/20 text-white">
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
            <Label htmlFor="emailAccount" className="text-white font-medium">
              Email Account
            </Label>
            <select
              id="emailAccount"
              name="emailAccount"
              value={formData.emailAccount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white focus:outline-none focus:border-white/50"
              required
            >
              <option value="" className="bg-gray-800 text-white">
                Select an email account
              </option>
              {emailAccounts.map((account) => (
                <option 
                  key={account.id} 
                  value={account.id}
                  className="bg-gray-800 text-white"
                >
                  {account.email} ({account.provider})
                </option>
              ))}
            </select>
            <p className="text-xs text-white/60">
              Choose which email account the SDR will use for outreach
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
