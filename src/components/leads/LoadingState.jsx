import React from 'react';
import { Loader2 } from "lucide-react";

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
    <p className="text-muted-foreground">Loading leads data...</p>
  </div>
);

export default LoadingState;
