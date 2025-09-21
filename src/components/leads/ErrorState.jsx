import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorState = ({ error, onRefresh }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
    <div className="text-center">
      <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Leads</h3>
      <p className="text-muted-foreground mb-4">{error}</p>
      <Button onClick={onRefresh} className="flex items-center gap-2">
        <RefreshCw className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  </div>
);

export default ErrorState;
