import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";

const ErrorState = ({ error, onRefresh, isRefreshing }) => (
  <div className="text-center max-w-lg mx-auto">
    <div className="bg-card rounded-3xl shadow-2xl p-12 border border-border/50 backdrop-blur-sm">
      <div className="w-20 h-20 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg border border-destructive/20">
        <AlertTriangle className="w-10 h-10 text-destructive drop-shadow-sm" />
      </div>
      <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">
        Connection Error
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        {error}
      </p>
      <Button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-3 mx-auto px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isRefreshing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <RefreshCw className="w-5 h-5" />
        )}
        Try Again
      </Button>
    </div>
  </div>
);

export default ErrorState;
