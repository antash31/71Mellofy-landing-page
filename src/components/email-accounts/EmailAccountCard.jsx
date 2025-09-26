import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertCircle, Settings, Loader2, BarChart3 } from "lucide-react";
import StatsGrid from './StatsGrid';
import PerformanceMetrics from './PerformanceMetrics';

const EmailAccountCard = ({ account, stats, isLoadingStats, statsError, onDelete }) => {
  console.log({account})
  return <Card className="border-border/50">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{account.fromName || account.email_address}</CardTitle>
               <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <CardDescription className="text-base">{account.email_address}</CardDescription>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span>{account.provider}</span>
              <span>•</span>
              <span>{account.message_per_day} msgs/day</span>
              <span>•</span>
              <span>{account.daily_sent_count} sent today</span>
              {account.campaignCount > 0 && (
                <>
                  <span>•</span>
                  <span>{account.campaignCount} campaigns</span>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDelete(account.id)}
            className="text-destructive hover:text-destructive"
          >
            Delete
          </Button>
        </div> */}
      </div>
    </CardHeader>
    <CardContent>
      {isLoadingStats ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-primary animate-spin mr-2" />
          <span className="text-muted-foreground">Loading campaign statistics...</span>
        </div>
      ) : statsError ? (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Statistics Unavailable</span>
          </div>
          <p className="text-sm text-muted-foreground">{statsError}</p>
        </div>
      ) : stats ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">Campaign Performance</span>
            <Badge variant="outline" className="text-xs">Campaign ID: {stats.email_campaign_id}</Badge>
          </div>
          <StatsGrid stats={stats} />
          <PerformanceMetrics stats={stats} />
        </div>
      ) : (
        <div className="bg-muted/20 rounded-lg p-6 text-center">
          <BarChart3 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No campaign statistics available</p>
          <p className="text-xs text-muted-foreground mt-1">Statistics will appear once this email account is used in campaigns</p>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="text-xs text-muted-foreground">
          SMTP: {account.smtpHost}:{account.smtpPort} ({account.smtpPortType})
        </div>
      </div>
    </CardContent>
  </Card>
}

export default EmailAccountCard;
