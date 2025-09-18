"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Mail, CheckCircle, AlertCircle, Settings, Loader2, RefreshCw, Send, Eye, MousePointer, Reply, Ban, UserX, BarChart3 } from "lucide-react";
import AddEmailModal from "@/components/AddEmailModal";
import { campaignService } from "@/services/api";
import { checkEmailAccounts } from '@/store/slices/authSlice';
import { useEmailAccounts } from '@/hooks/useEmailAccounts';

const EmailAccountsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mailboxStats, setMailboxStats] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);
  
  const { 
    emailAccounts, 
    addEmailAccount, 
    removeEmailAccount, 
    refreshEmailAccounts, 
    isLoading, 
    error 
  } = useEmailAccounts();

  useEffect(() => {
    checkEmailAccounts();
  }, [checkEmailAccounts]);

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

  // Fetch mailbox statistics
  const fetchMailboxStats = async () => {
    try {
      setIsLoadingStats(true);
      setStatsError(null);
      console.log('Fetching mailbox statistics...');
      const response = await campaignService.getCampaignMailboxStatistics();
      console.log('Mailbox statistics received:', response);
      setMailboxStats(response.data || []);
    } catch (err) {
      console.error('Error fetching mailbox statistics:', err);
      setStatsError(err.message || 'Failed to fetch mailbox statistics');
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Fetch statistics when component mounts and email accounts are loaded
  useEffect(() => {    
    if (!isLoading && emailAccounts.length > 0) {
      fetchMailboxStats();
    }
  }, [isLoading, emailAccounts.length]);

  const handleRefreshAccounts = async () => {
    try {
      setIsRefreshing(true);
      await refreshEmailAccounts();
      // Also refresh statistics
      if (emailAccounts.length > 0) {
        await fetchMailboxStats();
      }
    } catch (err) {
      console.error('Failed to refresh email accounts:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Get statistics for a specific email account
  const getAccountStats = (accountEmail) => {
    return mailboxStats.find(stat => stat.from_email === accountEmail);
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
        <div className="grid gap-6">
          {emailAccounts.map((account) => {
            const stats = getAccountStats(account.email);
            
            return (
              <Card key={account.id} className="border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">
                            {account.fromName}
                          </CardTitle>
                          {account.isVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <CardDescription className="text-base">
                          {account.email}
                        </CardDescription>
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
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Campaign Statistics */}
                  {isLoadingStats ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 text-primary animate-spin mr-2" />
                      <span className="text-muted-foreground">Loading campaign statistics...</span>
                    </div>
                  ) : statsError ? (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-destructive mb-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-medium">Statistics Unavailable</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{statsError}</p>
                    </div>
                  ) : stats ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">Campaign Performance</span>
                        <Badge variant="outline" className="text-xs">
                          Campaign ID: {stats.email_campaign_id}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Send className="w-4 h-4 text-primary" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Sent</span>
                          </div>
                          <div className="text-xl font-bold text-foreground">{stats.sent_count}</div>
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Eye className="w-4 h-4 text-accent-foreground" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Opens</span>
                          </div>
                          <div className="text-xl font-bold text-foreground">{stats.open_count}</div>
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <MousePointer className="w-4 h-4 text-primary" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Clicks</span>
                          </div>
                          <div className="text-xl font-bold text-foreground">{stats.click_count}</div>
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Reply className="w-4 h-4 text-primary" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Replies</span>
                          </div>
                          <div className="text-xl font-bold text-foreground">{stats.reply_count}</div>
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Ban className="w-4 h-4 text-destructive" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Bounced</span>
                          </div>
                          <div className="text-xl font-bold text-foreground">{stats.bounce_count}</div>
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <UserX className="w-4 h-4 text-destructive" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Unsub</span>
                          </div>
                          <div className="text-xl font-bold text-foreground">{stats.unsubscribed_count}</div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      {stats.sent_count > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Open Rate</div>
                            <div className="text-lg font-semibold text-foreground">
                              {((stats.open_count / stats.sent_count) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Click Rate</div>
                            <div className="text-lg font-semibold text-foreground">
                              {((stats.click_count / stats.sent_count) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Reply Rate</div>
                            <div className="text-lg font-semibold text-foreground">
                              {((stats.reply_count / stats.sent_count) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Bounce Rate</div>
                            <div className="text-lg font-semibold text-foreground">
                              {((stats.bounce_count / stats.sent_count) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-muted/20 rounded-lg p-6 text-center">
                      <BarChart3 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No campaign statistics available</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Statistics will appear once this email account is used in campaigns
                      </p>
                    </div>
                  )}

                  {/* SMTP Details */}
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <div className="text-xs text-muted-foreground">
                      SMTP: {account.smtpHost}:{account.smtpPort} ({account.smtpPortType})
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
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