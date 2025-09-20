import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";

const ErrorState = ({ error, onRefresh, isRefreshing }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <AlertCircle className="w-8 h-8 text-red-600" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Email Accounts</h3>
    <p className="text-muted-foreground mb-4">{error}</p>
    <Button onClick={onRefresh} disabled={isRefreshing}>
      {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
      Try Again
    </Button>
  </div>
);

export default ErrorState;
