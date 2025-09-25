"use client";
import React, { useState, useEffect } from "react";
import { useEmailAccounts } from "@/hooks/useEmailAccounts";
import { campaignService } from "@/services/api";
import { useSelector } from "react-redux";
import CreateSDRModal from "@/components/dashboard/CreateSDRModal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ReadyCard from "@/components/dashboard/ReadyCard";
import LoadingState from "@/components/dashboard/LoadingState"; 
import ErrorState from "@/components/dashboard/ErrorState";
import CampaignError from "@/components/dashboard/CampaignError";
import OnboardingSection from "@/components/dashboard/OnboardingSelection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import { toast } from "sonner";
import OnboardingCard from "@/components/dashboard/OnboardingCard";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState(null);
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);
  const [campaignError, setCampaignError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);
  const emailAccounts = useSelector((state) => state.auth.emailAccounts);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const hasEmailAccounts = useSelector((state) => state.auth.hasEmailAccounts);
  const isCampaignPresent = useSelector((state) => state.auth.doesCampaignExist);

  // const fetchCampaignStatus = async () => {
  //   try {
  //     setIsLoadingCampaign(true);
  //     setCampaignError(null);
  //     const response = await campaignService.getCampaignStatus();
  //     setCampaignStatus(response);
  //     if (response?.exists) {
  //       fetchAnalytics();
  //     }
  //   } catch (err) {
  //     console.error('Error fetching campaign status:', err);
  //     if(err.response.data.message=="No active campaign found for this client" && err.status==404){
  //       setIsCampaignPresent(false);
  //     }
  //     toast.error(err.response.data.message);
  //     setCampaignError(err.message || 'Failed to check campaign status');
  //   } finally {
  //     setIsLoadingCampaign(false);
  //   }
  // };

  const fetchAnalytics = async () => {
    try {
      setIsLoadingAnalytics(true);
      setAnalyticsError(null);
      const response = await campaignService.getCampaignAnalytics();
      setAnalyticsData(response);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setAnalyticsError(err.message || 'Failed to fetch analytics data');
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    console.log({isCampaignPresent})
    if(isCampaignPresent){
    fetchAnalytics();
    }
  }, [isCampaignPresent]);

  const handleCreateSDR = () => {
    if (!hasEmailAccounts || (isCampaignPresent)) return;
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchAnalytics();
  };

  const handleRefreshAccounts = async () => {
    try {
      setIsRefreshing(true);
      // await refreshEmailAccounts(); // Uncomment if needed
    } catch (err) {
      console.error('Failed to refresh email accounts:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefreshCampaignStatus = async () => {
    await fetchCampaignStatus();
  };

  if (isLoading || isLoadingCampaign) {
    return <LoadingState />;
  }

  // if(!isCampaignPresent){
  //   return <OnboardingCard/>
  // }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <DashboardHeader />
          <ErrorState error={error} onRefresh={handleRefreshAccounts} isRefreshing={isRefreshing} />
          <CreateSDRModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    );
  }

  let mainContent;
  if (!hasEmailAccounts) {
    mainContent = <OnboardingSection />;
  } else if (!isCampaignPresent) {
    mainContent = (
      <div className="text-center space-y-8">
        <ReadyCard onCreateSDR={handleCreateSDR} />
      </div>
    );
  } else {
    mainContent = (
      <div className="text-center space-y-8">
        <AnalyticsSection 
          analyticsData={analyticsData} 
          isLoadingAnalytics={isLoadingAnalytics} 
          analyticsError={analyticsError} 
          onRetryAnalytics={fetchAnalytics} 
        />
      </div>
    );
  }
console.log({mainContent});
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        {mainContent}
        {!error && !isLoading && campaignError && (
          <CampaignError 
            campaignError={campaignError} 
            onRefresh={handleRefreshCampaignStatus} 
            isLoadingCampaign={isLoadingCampaign} 
          />
        )}
        <CreateSDRModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    </div>
  );
}
