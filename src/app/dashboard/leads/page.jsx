"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { campaignService } from "@/services/api";
import LeadsHeader from '@/components/leads/LeadsHeader';
import StatsCards from '@/components/leads/StatsCards';
import LeadsTable from '@/components/leads/LeadsTable';
import LoadingState from '@/components/leads/LoadingState';
import ErrorState from '@/components/leads/ErrorState';
import { useSelector } from 'react-redux';
import OnboardingCard from '@/components/dashboard/OnboardingCard';
import ReadyCard from '@/components/dashboard/ReadyCard';
import { useRouter } from 'next/navigation';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const hasFetchedRef = useRef(false);
  const isCampaignPresent = useSelector((state) => state.auth.doesCampaignExist);
  const isLoadingEmailAccounts = useSelector((state) => state.auth.isLoadingEmailAccounts);
  const errorEmailAccounts = useSelector((state) => state.auth.errorEmailAccounts);
  const hasEmailAccounts = useSelector((state) => state.auth.hasEmailAccounts);
  const isLoadingCampaign = useSelector((state) => state.auth.isLoadingCampaign);
  const router = useRouter();

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Fetch all leads for DataGrid to handle pagination internally
      const response = await campaignService.getCampaignLeadStatistics(20, 0);
      setLeads(response.statistics.data || []);
      setTotalLeads(response.total || response.statistics?.data?.length || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch leads data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCampaignPresent) {
      if (hasFetchedRef.current) return;
      hasFetchedRef.current = true;
      fetchLeads();
    }
  }, [isCampaignPresent]);

  const handleRefresh = () => {
    fetchLeads();
  };

  if (isLoading || isLoadingEmailAccounts || isLoadingCampaign) {
    return <LoadingState />;
  }

  if (!isCampaignPresent && !hasEmailAccounts && !isLoading) {
    return <OnboardingCard />
  }

  // if(hasEmailAccounts && !isCampaignPresent && !isLoading){
  //    return <ReadyCard onCreateSDR={()=>router.push('/dashboard')}/>
  // }



  if (error) {
    return <ErrorState error={error} onRefresh={handleRefresh} />;
  }

  return (
    <div className="space-y-8">
      <Card className="border-border/50">
        <CardContent className="p-0">
          <LeadsTable leads={leads} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsPage;
