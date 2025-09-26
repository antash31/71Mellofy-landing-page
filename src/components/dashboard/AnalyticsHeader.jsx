import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, Users, Bot } from "lucide-react";

const AnalyticsHeader = ({ analyticsData }) => {
 return <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border/50 backdrop-blur-sm">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center shadow-lg border border-primary/10">
          <BarChart3 className="w-8 h-8 text-primary drop-shadow-sm" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-card-foreground tracking-tight">
            Campaign Analytics
          </h2>
          <p className="text-muted-foreground text-lg mt-1">
            {analyticsData?.data?.name || 'Loading campaign...'}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard/leads">
          <Button size="lg" className="flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
            <Users className="w-5 h-5" />
            View Leads
          </Button>
        </Link>
      </div>
    </div>
  </div>
};

export default AnalyticsHeader;
