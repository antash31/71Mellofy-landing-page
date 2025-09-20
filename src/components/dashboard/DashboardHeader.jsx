import React from 'react';
import { Bot } from "lucide-react";

const DashboardHeader = () => (
  <div className="text-center mb-16">
    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/15 to-primary/5 rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-primary/10 backdrop-blur-sm">
      <Bot className="w-12 h-12 text-primary drop-shadow-sm" />
    </div>
    <h1 className="text-5xl font-extrabold text-foreground mb-6 tracking-tight">
      AI SDR Dashboard
    </h1>
    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
      Create and manage your AI-powered Sales Development Representatives to automate your outreach campaigns.
    </p>
  </div>
);

export default DashboardHeader;
