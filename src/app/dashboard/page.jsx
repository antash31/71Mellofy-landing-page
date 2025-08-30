"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Mail, AlertTriangle } from "lucide-react";
import CreateSDRModal from "@/components/CreateSDRModal";
import { useEmailAccounts } from "@/contexts/EmailAccountsContext";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasEmailAccounts, emailAccounts } = useEmailAccounts();

  const handleCreateSDR = () => {
    if (!hasEmailAccounts) {
      // Don't open modal if no email accounts
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Bot className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          AI SDR Dashboard
        </h1>
        <p className="text-muted-foreground max-w-md">
          Create and manage your AI-powered Sales Development Representatives to automate your outreach campaigns.
        </p>
      </div>

      {/* Email Account Check */}
      {!hasEmailAccounts ? (
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Email Account Required
            </h3>
            <p className="text-muted-foreground mb-4">
              You need to add at least one email account before creating an SDR agent. 
              Email accounts are used to send and receive messages in your campaigns.
            </p>
          </div>
          <div className="space-y-3">
            <Link href="/dashboard/email-accounts">
              <Button size="lg" className="w-full flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Set Up Email Account
              </Button>
            </Link>
            <Button
              onClick={handleCreateSDR}
              size="lg"
              variant="outline"
              disabled
              className="w-full flex items-center gap-2 opacity-50 cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Create SDR Agent (Disabled)
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6">
          {/* Email Account Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">
                {emailAccounts.length} email account{emailAccounts.length !== 1 ? 's' : ''} configured
              </span>
            </div>
          </div>

          {/* Create SDR Button */}
          <Button
            onClick={handleCreateSDR}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create SDR Agent
          </Button>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground max-w-lg">
            <p>
              Your SDR agents will help you identify prospects, craft personalized messages, 
              and manage outreach campaigns automatically.
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      <CreateSDRModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

