import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Users } from "lucide-react";

const LeadsHeader = ({ onRefresh, isLoading, totalLeads }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-foreground tracking-tight">Leads</h1>
      <p className="text-muted-foreground mt-1 flex items-center gap-2">
        Manage and track your campaign leads and their engagement history
        {totalLeads !== undefined && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <Users className="w-3 h-3" />
            {totalLeads} Total
          </span>
        )}
      </p>
    </div>
    <div className="flex items-center gap-3">
      <Button 
        onClick={onRefresh} 
        variant="outline" 
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  </div>
);

export default LeadsHeader;
