"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { campaignService } from "@/services/api";
import LeadsHeader from '@/components/leads/LeadsHeader';
import StatsCards from '@/components/leads/StatsCards';
import LeadsTable from '@/components/leads/LeadsTable';
import Pagination from '@/components/Pagination';
import LoadingState from '@/components/leads/LoadingState';
import ErrorState from '@/components/leads/ErrorState';

const LEADS_PER_PAGE = 10;

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalLeads, setTotalLeads] = useState(0);
  const hasFetchedRef = useRef(false);

  const fetchLeads = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const offset = (page - 1) * LEADS_PER_PAGE;
      const response = await campaignService.getCampaignLeadStatistics(LEADS_PER_PAGE, offset);
      console.log({key:response.lead_statistics});
      setLeads(response.lead_statistics.data || []);
      setHasMore(response.hasMore || false);
      setTotalLeads(response.total || response.lead_statistics?.data?.length || 0);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err.message || 'Failed to fetch leads data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchLeads(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && (hasMore || newPage < currentPage)) {
      fetchLeads(newPage);
    }
  };

  const handleRefresh = () => {
    fetchLeads(currentPage);
  };

  if (isLoading && leads.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRefresh={handleRefresh} />;
  }

  const totalPages = Math.ceil(totalLeads / LEADS_PER_PAGE);
  const startIndex = (currentPage - 1) * LEADS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * LEADS_PER_PAGE, totalLeads);

  return (
    <div className="space-y-8">
      <LeadsHeader onRefresh={handleRefresh} isLoading={isLoading} />
      <StatsCards 
        totalLeads={totalLeads} 
        currentPage={currentPage} 
        totalPages={totalPages} 
        startIndex={startIndex} 
        endIndex={endIndex} 
        hasMore={hasMore} 
      />
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Leads Data
          </CardTitle>
          <CardDescription>
            Detailed view of all campaign leads with their engagement history
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <LeadsTable leads={leads} />
          </div>
        </CardContent>
      </Card>
      {leads.length > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          hasMore={hasMore} 
          onPageChange={handlePageChange} 
          isLoading={isLoading} 
          totalLeads={totalLeads} 
          LEADS_PER_PAGE={LEADS_PER_PAGE} 
        />
      )}
    </div>
  );
};

export default LeadsPage;
