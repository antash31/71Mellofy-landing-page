import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const LeadsHeader = ({ onRefresh, isLoading }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-foreground tracking-tight">Campaign Leads</h1>
      <p className="text-muted-foreground mt-1">
        Manage and track your campaign leads and their engagement history
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
