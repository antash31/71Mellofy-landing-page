import React from 'react';
import { Loader2 } from "lucide-react";

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
    <div className="text-center space-y-4">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
      <h1 className="text-3xl font-bold text-foreground">
        AI SDR Dashboard
      </h1>
      <p className="text-muted-foreground max-w-md">
        Loading your email accounts...
      </p>
    </div>
  </div>
);

export default LoadingState;
