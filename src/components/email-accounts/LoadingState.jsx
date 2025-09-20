import React from 'react';
import { Loader2 } from "lucide-react";

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">Loading Email Accounts</h3>
    <p className="text-muted-foreground">Fetching your email accounts from the server...</p>
  </div>
);

export default LoadingState;
