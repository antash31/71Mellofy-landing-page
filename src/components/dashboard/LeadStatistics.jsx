import React from 'react';

const LeadStatistics = ({ analyticsData }) => {
  console.log({ analyticsData });
  return <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl">
    <h3 className="text-2xl font-bold text-card-foreground mb-6 tracking-tight">
      Lead Statistics
    </h3>
    <div className="grid grid-cols-2 gap-4">
      {analyticsData.data.campaign_lead_stats && Object.entries(analyticsData.data.campaign_lead_stats).map(([key, value]) => (
        <div key={key} className="text-center p-4 bg-muted/30 rounded-xl border border-border/20 hover:bg-muted/50 transition-colors duration-200">
          <p className="text-2xl font-bold text-card-foreground mb-1">
            {value}
          </p>
          <p className="text-xs text-muted-foreground capitalize font-semibold tracking-wide">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </p>
        </div>
      ))}
    </div>
  </div>
};

export default LeadStatistics;
