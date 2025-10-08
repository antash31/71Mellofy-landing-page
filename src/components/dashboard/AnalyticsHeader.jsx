import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, Users, Bot, Play, Pause, StopCircle, Settings } from "lucide-react";
import { CAMPAIGN_ACTIONS, CAMPAIGN_STATUS } from "@/constants/config.constants";

const AnalyticsHeader = ({ analyticsData, onTakeAction }) => {
  return (
    <div className="bg-card rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-border/50 backdrop-blur-sm">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center shadow-lg border border-primary/10">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary drop-shadow-sm" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground tracking-tight">
                Campaign Analytics
              </h2>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link href="/dashboard/settings" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" variant="outline">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="sm:inline">Settings</span>
              </Button>
            </Link>
            <Link href="/dashboard/leads" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="sm:inline">View Leads</span>
              </Button>
            </Link>

            {(analyticsData?.data?.status === CAMPAIGN_STATUS.DRAFTED || analyticsData?.data?.status === CAMPAIGN_STATUS.PAUSED) && (
              <Button
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                onClick={() => onTakeAction(CAMPAIGN_ACTIONS.START)}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="sm:inline">Start Campaign</span>
              </Button>
            )}

            {analyticsData?.data?.status === CAMPAIGN_STATUS.ACTIVE && (
              <>
                <Button
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                  onClick={() => onTakeAction(CAMPAIGN_ACTIONS.PAUSED)}
                >
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="sm:inline">Pause Campaign</span>
                </Button>
                <Button
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                  onClick={() => onTakeAction(CAMPAIGN_ACTIONS.STOPPED)}
                >
                  <StopCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="sm:inline">Stop Campaign</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
