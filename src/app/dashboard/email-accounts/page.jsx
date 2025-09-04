"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Mail, CheckCircle, AlertCircle, Settings, Loader2, RefreshCw } from "lucide-react";
import AddEmailModal from "@/components/AddEmailModal";
import { useEmailAccounts } from "@/contexts/EmailAccountsContext";

const EmailAccountsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { 
    emailAccounts, 
    addEmailAccount, 
    removeEmailAccount, 
    refreshEmailAccounts, 
    isLoading, 
    error 
  } = useEmailAccounts();

  const handleAddEmail = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailAdded = (newEmail) => {
    addEmailAccount(newEmail);
  };

  const handleDeleteEmail = (emailId) => {
    if (confirm("Are you sure you want to delete this email account?")) {
      removeEmailAccount(emailId);
    }
  };

  const handleRefreshAccounts = async () => {
    try {
      setIsRefreshing(true);
      await refreshEmailAccounts();
    } catch (err) {
      console.error('Failed to refresh email accounts:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Email Accounts</h1>
          <p className="text-muted-foreground">
            Manage your email accounts for SDR campaigns
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleRefreshAccounts}
            disabled={isRefreshing || isLoading}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Refresh
          </Button>
          <Button onClick={handleAddEmail} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Email
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Loading Email Accounts
          </h3>
          <p className="text-muted-foreground">
            Fetching your email accounts from the server...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Error Loading Email Accounts
          </h3>
          <p className="text-muted-foreground mb-4">
            {error}
          </p>
          <Button onClick={handleRefreshAccounts} disabled={isRefreshing}>
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Try Again
          </Button>
        </div>
      ) : emailAccounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Email Accounts Yet
          </h3>
          <p className="text-muted-foreground max-w-md mb-6">
            You need to add at least one email account before you can create SDR agents. 
            Email accounts are used to send and receive messages in your campaigns.
          </p>
          <Button onClick={handleAddEmail} size="lg" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Your First Email Account
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {emailAccounts.map((account) => (
            <div
              key={account.id}
              className="border border-border rounded-lg p-6 bg-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {account.fromName}
                      </h3>
                      {account.isVerified ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-muted-foreground">{account.email}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{account.provider}</span>
                      <span>•</span>
                      <span>{account.messagePerDay} msgs/day</span>
                      <span>•</span>
                      <span>{account.dailySentCount} sent today</span>
                      {account.campaignCount > 0 && (
                        <>
                          <span>•</span>
                          <span>{account.campaignCount} campaigns</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="text-muted-foreground">
                        SMTP: {account.smtpHost}:{account.smtpPort} ({account.smtpPortType})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteEmail(account.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Another Email Button */}
          <button
            onClick={handleAddEmail}
            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <span className="text-muted-foreground">Add Another Email Account</span>
          </button>
        </div>
      )}

      {/* Add Email Modal */}
      <AddEmailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onEmailAdded={handleEmailAdded}
      />
    </div>
  );
};

export default EmailAccountsPage;