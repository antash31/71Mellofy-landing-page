import React from 'react';
import { Send, Eye, MousePointer, Reply } from "lucide-react";

const AnalyticCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
    <div className="flex items-center justify-between mb-6">
      <div className="w-14 h-14 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center shadow-lg border border-primary/10 group-hover:scale-110 transition-transform duration-200">
        <Icon className="w-7 h-7 text-primary drop-shadow-sm" />
      </div>
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{title}</span>
    </div>
    <div className="space-y-2">
      <p className="text-3xl font-bold text-card-foreground tracking-tight">
        {value}
      </p>
      <p className="text-sm text-muted-foreground font-medium">
        {description}
      </p>
    </div>
  </div>
);

const AnalyticsGrid = ({ analyticsData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <AnalyticCard icon={Send} title="Sent" value={analyticsData.data.sent_count} description="Total emails sent" />
    <AnalyticCard icon={Eye} title="Opens" value={analyticsData.data.open_count} description="Email opens" />
    <AnalyticCard icon={MousePointer} title="Clicks" value={analyticsData.data.click_count} description="Link clicks" />
    <AnalyticCard icon={Reply} title="Replies" value={analyticsData.data.reply_count} description="Email replies" />
  </div>
);

export default AnalyticsGrid;
