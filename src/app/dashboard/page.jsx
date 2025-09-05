"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Mail, AlertTriangle, Loader2, RefreshCw, ArrowRight, CheckCircle, Users, Activity, BarChart3, Eye, MousePointer, Reply, Send } from "lucide-react";
import CreateSDRModal from "@/components/CreateSDRModal";
import { useEmailAccounts } from "@/contexts/EmailAccountsContext";
import { campaignService } from "@/services/api";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState(null);
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(true);
  const [campaignError, setCampaignError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);
  const { hasEmailAccounts, emailAccounts, isLoading, error, refreshEmailAccounts } = useEmailAccounts();
  
  // Ref to prevent double API calls in development (React Strict Mode)
  const hasFetchedRef = useRef(false);

  // Fetch campaign status on component mount
  useEffect(() => {
    // Prevent double API calls in development (React Strict Mode)
    if (hasFetchedRef.current) {
      return;
    }
    
    const fetchCampaignStatus = async () => {
      try {
        hasFetchedRef.current = true;
        setIsLoadingCampaign(true);
        setCampaignError(null);
        
        console.log('Fetching campaign status...');
        const response = await campaignService.getCampaignStatus();
        setCampaignStatus(response);
        
        // If campaign exists, fetch analytics
        if (response?.exists) {
          console.log('Campaign exists, fetching analytics...');
          fetchAnalytics();
        }
      } catch (err) {
        console.error('Error fetching campaign status:', err);
        setCampaignError(err.message || 'Failed to check campaign status');
      } finally {
        setIsLoadingCampaign(false);
      }
    };

    fetchCampaignStatus();
  }, []);

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setIsLoadingAnalytics(true);
      setAnalyticsError(null);
      console.log('Fetching analytics data...');
      const response = await campaignService.getCampaignAnalytics();
      console.log('Analytics data received:', response);
      setAnalyticsData(response);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setAnalyticsError(err.message || 'Failed to fetch analytics data');
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  const handleCreateSDR = () => {
    if (!hasEmailAccounts || (campaignStatus?.exists)) {
      // Don't open modal if no email accounts or campaign already exists
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Refresh campaign status when modal closes (in case SDR was created)
    handleRefreshCampaignStatus();
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

  const handleRefreshCampaignStatus = async () => {
    try {
      setIsLoadingCampaign(true);
      setCampaignError(null);
      console.log('Manually refreshing campaign status...');
      const response = await campaignService.getCampaignStatus();
      setCampaignStatus(response);
      
      // If campaign exists, refresh analytics too
      if (response?.exists) {
        console.log('Campaign exists, refreshing analytics...');
        fetchAnalytics();
      }
    } catch (err) {
      console.error('Error refreshing campaign status:', err);
      setCampaignError(err.message || 'Failed to check campaign status');
    } finally {
      setIsLoadingCampaign(false);
    }
  };

  // Show loading state while fetching email accounts or campaign status
  if (isLoading || isLoadingCampaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            AI SDR Dashboard
          </h1>
          <p className="text-muted-foreground max-w-md">
            Loading your email accounts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/15 to-primary/5 rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-primary/10 backdrop-blur-sm">
            <Bot className="w-12 h-12 text-primary drop-shadow-sm" />
          </div>
          <h1 className="text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            AI SDR Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create and manage your AI-powered Sales Development Representatives to automate your outreach campaigns.
          </p>
        </div>

        {!error ? (
          <>
            {/* Main Content */}
            {hasEmailAccounts ? (
              /* When email accounts exist - Check if SDR already created */
              <div className="text-center space-y-8">
                {campaignStatus?.exists ? (
                  /* Analytics Dashboard */
                  <div className="w-full max-w-7xl mx-auto space-y-10">
                    {/* Header Section */}
                    <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border/50 backdrop-blur-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center shadow-lg border border-primary/10">
                            <BarChart3 className="w-8 h-8 text-primary drop-shadow-sm" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-card-foreground tracking-tight">
                              Campaign Analytics
                            </h2>
                            <p className="text-muted-foreground text-lg mt-1">
                              {analyticsData?.data?.name || 'Loading campaign...'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Link href="/dashboard/leads">
                            <Button size="lg" className="flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                              <Users className="w-5 h-5" />
                              View Leads
                            </Button>
                          </Link>
                          <Link href="/dashboard/leads/Agent">
                            <Button variant="outline" size="lg" className="flex items-center gap-3 px-6 py-3 rounded-xl border-2 hover:bg-accent/50 transition-all duration-200 font-semibold">
                              <Bot className="w-5 h-5" />
                              Manage Agent
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {isLoadingAnalytics ? (
                      /* Analytics Loading State */
                      <div className="bg-card rounded-2xl p-8 border border-border">
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-primary animate-spin mr-3" />
                          <span className="text-muted-foreground">Loading analytics data...</span>
                        </div>
                      </div>
                    ) : analyticsError ? (
                      /* Analytics Error State */
                      <div className="bg-card rounded-2xl p-8 border border-border">
                        <div className="text-center">
                          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-card-foreground mb-2">
                            Analytics Unavailable
                          </h3>
                          <p className="text-muted-foreground mb-4">{analyticsError}</p>
                          <Button onClick={fetchAnalytics} variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retry
                          </Button>
                        </div>
                      </div>
                    ) : analyticsData ? (
                      /* Analytics Dashboard Grid */
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Email Metrics */}
                        <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center shadow-lg border border-primary/10 group-hover:scale-110 transition-transform duration-200">
                              <Send className="w-7 h-7 text-primary drop-shadow-sm" />
                            </div>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Sent</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-3xl font-bold text-card-foreground tracking-tight">
                              {analyticsData.data.sent_count}
                            </p>
                            <p className="text-sm text-muted-foreground font-medium">
                              Total emails sent
                            </p>
                          </div>
                        </div>

                        <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center shadow-lg border border-primary/10 group-hover:scale-110 transition-transform duration-200">
                              <Eye className="w-7 h-7 text-primary drop-shadow-sm" />
                            </div>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Opens</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-3xl font-bold text-card-foreground tracking-tight">
                              {analyticsData.data.open_count}
                            </p>
                            <p className="text-sm text-muted-foreground font-medium">
                              Email opens
                            </p>
                          </div>
                        </div>

                        <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center shadow-lg border border-primary/10 group-hover:scale-110 transition-transform duration-200">
                              <MousePointer className="w-7 h-7 text-primary drop-shadow-sm" />
                            </div>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Clicks</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-3xl font-bold text-card-foreground tracking-tight">
                              {analyticsData.data.click_count}
                            </p>
                            <p className="text-sm text-muted-foreground font-medium">
                              Link clicks
                            </p>
                          </div>
                        </div>

                        <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center shadow-lg border border-primary/10 group-hover:scale-110 transition-transform duration-200">
                              <Reply className="w-7 h-7 text-primary drop-shadow-sm" />
                            </div>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Replies</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-3xl font-bold text-card-foreground tracking-tight">
                              {analyticsData.data.reply_count}
                            </p>
                            <p className="text-sm text-muted-foreground font-medium">
                              Email replies
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* Campaign Details & Lead Stats */}
                    {analyticsData && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Campaign Information */}
                        <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl">
                          <h3 className="text-2xl font-bold text-card-foreground mb-6 tracking-tight">
                            Campaign Details
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-border/30">
                              <span className="text-muted-foreground font-medium">Status</span>
                              <span className={`px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm ${
                                analyticsData.data.status === 'DRAFTED' 
                                  ? 'bg-accent text-accent-foreground border border-accent/20' 
                                  : 'bg-primary/10 text-primary border border-primary/20'
                              }`}>
                                {analyticsData.data.status}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/30">
                              <span className="text-muted-foreground font-medium">Campaign ID</span>
                              <span className="font-bold text-card-foreground text-lg">
                                {analyticsData.data.id}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/30">
                              <span className="text-muted-foreground font-medium">Sequences</span>
                              <span className="font-bold text-card-foreground text-lg">
                                {analyticsData.data.sequence_count}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/30">
                              <span className="text-muted-foreground font-medium">Total Leads</span>
                              <span className="font-bold text-card-foreground text-lg">
                                {analyticsData.data.total_count}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                              <span className="text-muted-foreground font-medium">Created</span>
                              <span className="font-bold text-card-foreground text-lg">
                                {new Date(analyticsData.data.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Lead Statistics */}
                        <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl">
                          <h3 className="text-2xl font-bold text-card-foreground mb-6 tracking-tight">
                            Lead Statistics
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(analyticsData.data.campaign_lead_stats).map(([key, value]) => (
                              <div key={key} className="text-center p-4 bg-muted/30 rounded-xl border border-border/20 hover:bg-muted/50 transition-colors duration-200">
                                <p className="text-2xl font-bold text-card-foreground mb-1">
                                  {value}
                                </p>
                                <p className="text-xs text-muted-foreground capitalize font-semibold tracking-wide">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Ready to create SDR */
                  <div className="bg-card rounded-3xl shadow-2xl p-12 max-w-3xl mx-auto border border-border/50 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-primary/10">
                      <CheckCircle className="w-10 h-10 text-primary drop-shadow-sm" />
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">
                    You're All Set! 🚀
                  </h2>
                    <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                    {emailAccounts.length} email account{emailAccounts.length !== 1 ? 's' : ''} configured and ready for outreach campaigns.
                  </p>
                  <Button
                    onClick={handleCreateSDR}
                    size="lg"
                      className="group relative inline-flex items-center gap-4 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl ring-2 ring-primary/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40 hover:scale-105"
                  >
                      <Plus className="w-6 h-6" />
                    Create Your First SDR Agent
                      <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
                )}

              </div>
            ) : (
              /* When no email accounts - Onboarding flow */
              <div className="max-w-4xl mx-auto">
                {/* Getting Started Card */}
                <div className="bg-card rounded-3xl shadow-2xl p-12 mb-12 border border-border/50 backdrop-blur-sm">
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-accent/10">
                      <Mail className="w-10 h-10 text-accent-foreground drop-shadow-sm" />
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">
                      Let's Get You Started! 👋
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                      To create your first SDR agent, you'll need to connect at least one email account for outreach campaigns.
                    </p>
                    <Link href="/dashboard/email-accounts">
                      <Button size="lg" className="group relative inline-flex items-center gap-4 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl ring-2 ring-primary/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40 hover:scale-105">
                        <Mail className="w-6 h-6" />
                        Connect Your First Email Account
                        <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>

                  {/* Progress Steps */}
                  <div className="border-t border-border/30 pt-10">
                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center tracking-tight">
                      Quick Setup Process
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          step: 1,
                          title: "Connect Email Account",
                          description: "Add your email account for sending outreach messages",
                          status: "current"
                        },
                        {
                          step: 2,
                          title: "Create SDR Agent",
                          description: "Set up your AI agent with target domains and regions",
                          status: "upcoming"
                        },
                        {
                          step: 3,
                          title: "Launch Campaign",
                          description: "Start your automated outreach and track results",
                          status: "upcoming"
                        }
                      ].map((step, index) => (
                        <div key={index} className="text-center">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg transition-all duration-200 ${
                            step.status === 'current' 
                              ? 'bg-primary text-primary-foreground border-2 border-primary/20' 
                              : 'bg-muted text-muted-foreground border-2 border-muted/20'
                          }`}>
                            {step.step}
                          </div>
                          <h4 className="font-bold text-foreground mb-3 text-lg">{step.title}</h4>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Disabled Create SDR Button */}
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    disabled
                    className="px-10 py-6 text-xl font-bold opacity-40 cursor-not-allowed rounded-2xl shadow-lg"
                  >
                    <Plus className="w-6 h-6 mr-4" />
                    Create SDR Agent
                  </Button>
                  <p className="text-muted-foreground mt-4 text-lg">
                    Available after connecting an email account
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Error State */
          <div className="text-center max-w-lg mx-auto">
            <div className="bg-card rounded-3xl shadow-2xl p-12 border border-border/50 backdrop-blur-sm">
              <div className="w-20 h-20 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-destructive/20">
                <AlertTriangle className="w-10 h-10 text-destructive drop-shadow-sm" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">
                Connection Error
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {error}
              </p>
              <Button
                onClick={handleRefreshAccounts}
                disabled={isRefreshing}
                className="flex items-center gap-3 mx-auto px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isRefreshing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5" />
                )}
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Campaign Status Error (if email accounts loaded but campaign status failed) */}
        {!error && !isLoading && campaignError && (
          <div className="text-center max-w-lg mx-auto mt-12">
            <div className="bg-accent/30 rounded-2xl p-8 border border-accent/50 shadow-xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-accent/30">
                <AlertTriangle className="w-8 h-8 text-accent-foreground drop-shadow-sm" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                Campaign Status Unavailable
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {campaignError}
              </p>
              <Button
                onClick={handleRefreshCampaignStatus}
                disabled={isLoadingCampaign}
                variant="outline"
                className="flex items-center gap-3 mx-auto px-6 py-3 font-semibold rounded-xl border-2 hover:bg-accent/20 transition-all duration-200"
              >
                {isLoadingCampaign ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5" />
                )}
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Modal */}
        <CreateSDRModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    </div>
  );
}

