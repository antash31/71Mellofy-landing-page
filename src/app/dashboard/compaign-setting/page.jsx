"use client";
import React, { useState, useEffect } from "react";
import { campaignService } from "@/services/api";
import { Calendar, Clock, Mail, Settings, Users, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const CampaignSetting = () => {
  const [campaignData, setCampaignData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaignSettings();
  }, []);

  const fetchCampaignSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await campaignService.getCampaignSettings();
      setCampaignData(response);
    } catch (err) {
      console.error("Error fetching campaign settings:", err);
      setError(err.message || "Failed to fetch campaign settings");
      toast.error("Failed to load campaign settings");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading campaign settings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <p className="text-destructive">Error: {error}</p>
              <button
                onClick={fetchCampaignSettings}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaignData) return null;

  const { campaign, sequences } = campaignData;
  const scheduler = campaign?.scheduler_cron_value || {};
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
                Campaign Settings
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your campaign configuration and sequences
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Campaign Overview */}
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-card-foreground tracking-tight">
                Campaign Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Campaign Name</p>
                <p className="text-lg font-semibold text-card-foreground break-all">
                  {campaign.name}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Status</p>
                <span
                  className={`inline-flex px-4 py-2 rounded-xl text-sm font-semibold shadow-sm ${
                    campaign.status === "ACTIVE"
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : campaign.status === "PAUSED"
                      ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      : "bg-gray-500/10 text-gray-500 border border-gray-500/20"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Campaign ID</p>
                <p className="text-lg font-semibold text-card-foreground">{campaign.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Created At</p>
                <p className="text-lg font-semibold text-card-foreground">
                  {new Date(campaign.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Last Updated</p>
                <p className="text-lg font-semibold text-card-foreground">
                  {new Date(campaign.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Schedule Settings */}
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-card-foreground tracking-tight">
                Schedule Settings
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-border/30">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Time Zone</p>
                    <p className="text-lg font-semibold text-card-foreground">
                      {scheduler.tz || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-border/30">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Working Hours</p>
                    <p className="text-lg font-semibold text-card-foreground">
                      {scheduler.startHour || "N/A"} - {scheduler.endHour || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                  <p className="text-sm text-muted-foreground font-medium mb-3">Active Days</p>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day, index) => (
                      <span
                        key={index}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                          scheduler.days?.includes(index + 1)
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-muted text-muted-foreground border border-border/30"
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                    <p className="text-sm text-muted-foreground font-medium">Min Time Between</p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {campaign.min_time_btwn_emails || 0}m
                    </p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                    <p className="text-sm text-muted-foreground font-medium">Max Leads/Day</p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {campaign.max_leads_per_day || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Sequences */}
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-card-foreground tracking-tight">
                Email Sequences ({sequences?.length || 0})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sequences?.map((sequence, index) => (
                <div
                  key={sequence.id}
                  className="p-6 bg-gradient-to-br from-background/80 to-background/50 rounded-xl border border-border/30 hover:border-primary/30 transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 shadow-sm">
                      <span className="text-2xl font-bold text-primary">
                        {sequence.seq_number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-card-foreground mb-2">
                        Sequence {sequence.seq_number}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                          {sequence.seq_delay_details?.delayInDays === 0 
                            ? "Immediate" 
                            : `${sequence.seq_delay_details?.delayInDays} ${sequence.seq_delay_details?.delayInDays === 1 ? 'day' : 'days'}`}
                        </span>
                      </div>
                    </div>
                    <div className="w-full pt-3 border-t border-border/30">
                      <p className="text-xs text-muted-foreground">
                        ID: {sequence.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSetting;