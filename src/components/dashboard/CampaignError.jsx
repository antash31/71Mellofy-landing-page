import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";

const CampaignError = ({ campaignError, onRefresh, isLoadingCampaign }) => (
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
        onClick={onRefresh}
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
);

export default CampaignError;
