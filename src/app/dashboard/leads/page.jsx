"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Mail, 
  Eye, 
  MousePointer, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Pause,
  Play
} from "lucide-react";
import { campaignService } from "@/services/api";

const LEADS_PER_PAGE = 10;

const getStatusBadge = (status) => {
  const statusConfig = {
    'COMPLETED': { 
      variant: 'default', 
      icon: CheckCircle, 
      className: 'bg-primary/10 text-primary border-primary/20' 
    },
    'PAUSED': { 
      variant: 'secondary', 
      icon: Pause, 
      className: 'bg-accent/10 text-accent-foreground border-accent/20' 
    },
    'STOPPED': { 
      variant: 'destructive', 
      icon: XCircle, 
      className: 'bg-destructive/10 text-destructive border-destructive/20' 
    },
    'IN_PROGRESS': { 
      variant: 'default', 
      icon: Play, 
      className: 'bg-primary/10 text-primary border-primary/20' 
    },
    'BLOCKED': { 
      variant: 'destructive', 
      icon: XCircle, 
      className: 'bg-destructive/10 text-destructive border-destructive/20' 
    }
  };

  const config = statusConfig[status] || statusConfig['COMPLETED'];
  const IconComponent = config.icon;

  return (
    <Badge className={`flex items-center gap-1.5 px-3 py-1 font-medium ${config.className}`}>
      <IconComponent className="w-3 h-3" />
      {status.replace('_', ' ')}
    </Badge>
  );
};

const getMessageTypeBadge = (type) => {
  const typeConfig = {
    'SENT': { className: 'bg-primary/10 text-primary border-primary/20', icon: Mail },
    'OPENED': { className: 'bg-accent/10 text-accent-foreground border-accent/20', icon: Eye },
    'CLICKED': { className: 'bg-primary/10 text-primary border-primary/20', icon: MousePointer },
    'REPLIED': { className: 'bg-primary/10 text-primary border-primary/20', icon: Mail }
  };

  const config = typeConfig[type] || typeConfig['SENT'];
  const IconComponent = config.icon;

  return (
    <Badge variant="outline" className={`flex items-center gap-1 text-xs ${config.className}`}>
      <IconComponent className="w-3 h-3" />
      {type}
    </Badge>
  );
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalLeads, setTotalLeads] = useState(0);
  const hasFetchedRef = useRef(false);

  const fetchLeads = async (page = 1) => {
    try {
      ('🔄 Starting fetchLeads...');
      setIsLoading(true);
      setError(null);
      
      const offset = (page - 1) * LEADS_PER_PAGE;
      (`📊 Fetching leads: page ${page}, offset ${offset}, limit ${LEADS_PER_PAGE}`);
            
      const apiPromise = campaignService.getCampaignLeadStatistics(LEADS_PER_PAGE, offset);
      
      // ('⏳ Making API call...');
      // const response = await Promise.race([apiPromise, timeoutPromise]);
      ('✅ Leads data received:', response);
      
      if (!response) {
        throw new Error('No response received from API');
      }
      
      setLeads(response.data || []);
      setHasMore(response.hasMore || false);
      setTotalLeads(response.total || response.data?.length || 0);
      setCurrentPage(page);
      
      (`📈 Set leads: ${response.data?.length || 0} items, hasMore: ${response.hasMore}, total: ${response.total}`);
    } catch (err) {
      console.error('❌ Error fetching leads:', err);
      console.error('❌ Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data
      });
      setError(err.message || 'Failed to fetch leads data');
    } finally {
      ('🏁 fetchLeads completed');
      setIsLoading(false);
    }
  };


  useEffect(() => {   
    ('🚀 Leads useEffect triggered');
    ('🔍 hasFetchedRef.current:', hasFetchedRef.current);
    
    // Check authentication status
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      ('🔑 Access token exists:', !!token);
      ('🔑 Token preview:', token ? token.substring(0, 20) + '...' : 'null');
    }
    
    // Prevent double API calls in development (React Strict Mode)
    if (hasFetchedRef.current) {
      ('⏭️ Skipping fetch - already fetched');
      return;
    }
    
    ('✨ Setting hasFetchedRef to true and calling fetchLeads');
    hasFetchedRef.current = true;
    
    // Set a fallback timeout to prevent infinite loading
    const fallbackTimeout = setTimeout(() => {
      ('⚠️ Fallback timeout triggered - forcing error state');
      setIsLoading(false);
      setError('Request is taking too long. Please check your connection and try again.');
    }, 15000);
    
    fetchLeads(1).finally(() => {
      clearTimeout(fallbackTimeout);
    });
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && (hasMore || newPage < currentPage)) {
      fetchLeads(newPage);
    }
  };

  const handleRefresh = () => {
    fetchLeads(currentPage);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLatestActivity = (history) => {
    if (!history || history.length === 0) return null;
    return history[history.length - 1];
  };

  if (isLoading && leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading leads data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Leads</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={handleRefresh} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalLeads / LEADS_PER_PAGE);
  const startIndex = (currentPage - 1) * LEADS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * LEADS_PER_PAGE, totalLeads);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Campaign Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your campaign leads and their engagement history
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={async () => {
              ('🧪 Manual test API call');
              try {
                ('🔗 Testing direct API call...');
                const response = await fetch('https://yofoleesojtwibrcfddx.supabase.co/functions/v1/Get-Campaign-Lead-Statistics?limit=10&offset=0', {
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                  }
                });
                ('📡 Direct API response status:', response.status);
                const data = await response.json();
                ('📊 Direct API response data:', data);
              } catch (err) {
                console.error('❌ Direct API test failed:', err);
              }
              
              // Also test the service method
              hasFetchedRef.current = false;
              fetchLeads(1);
            }} 
            variant="secondary" 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            🧪 Test API
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">{totalLeads}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">{currentPage}</span>
              <span className="text-muted-foreground">of {totalPages || 1}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Showing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {leads.length > 0 ? `${startIndex}-${endIndex}` : '0'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Has More</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {hasMore ? (
                <CheckCircle className="w-5 h-5 text-primary" />
              ) : (
                <XCircle className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="text-2xl font-bold text-foreground">
                {hasMore ? 'Yes' : 'No'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
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
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Leads Found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                There are no leads available for this campaign yet. Leads will appear here once your campaign starts generating engagement.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold">Lead Info</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Sequence</TableHead>
                    <TableHead className="font-semibold">Latest Activity</TableHead>
                    <TableHead className="font-semibold">Engagement</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => {
                    const latestActivity = getLatestActivity(lead.history);
                    const totalOpens = lead.history?.reduce((sum, h) => sum + (h.open_count || 0), 0) || 0;
                    const totalClicks = lead.history?.reduce((sum, h) => sum + (h.click_count || 0), 0) || 0;
                    
                    return (
                      <TableRow key={lead.lead_id} className="group">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-primary" />
                              <span className="font-medium text-foreground">{lead.to}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              From: {lead.from}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: {lead.lead_id}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {getStatusBadge(lead.status)}
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">{lead.last_seq_num}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">Sequence {lead.last_seq_num}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {latestActivity ? (
                            <div className="space-y-2">
                              {getMessageTypeBadge(latestActivity.type)}
                              <div className="text-xs text-muted-foreground">
                                {formatDate(latestActivity.time)}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">No activity</span>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-accent-foreground" />
                              <span className="text-sm font-medium">{totalOpens}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MousePointer className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">{totalClicks}</span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {formatDate(lead.created_at)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {leads.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex} to {endIndex} of {totalLeads} leads
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, currentPage - 2) + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    disabled={isLoading}
                    className="w-10 h-10 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasMore || isLoading}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;