import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Plus } from "lucide-react";

const PageHeader = ({ onAddEmail, onRefresh, isRefreshing, isLoading }) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Email Accounts</h1>
      <p className="text-muted-foreground">Manage your email accounts for SDR campaigns</p>
    </div>
    <div className="flex items-center gap-2">
      <Button 
        onClick={onRefresh}
        disabled={isRefreshing || isLoading}
        variant="outline"
        className="flex items-center gap-2"
      >
        {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
        Refresh
      </Button>
      {/* <Button onClick={onAddEmail} className="flex items-center gap-2">
      <Plus className="w-4 h-4" />
        Add Email
      </Button> */}
    </div>
  </div>
);

export default PageHeader;
