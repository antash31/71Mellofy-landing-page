import React from 'react';

const CampaignDetails = ({ analyticsData }) => (
  <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl">
    <h3 className="text-2xl font-bold text-card-foreground mb-6 tracking-tight">
      Campaign Details
    </h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center py-3 border-b border-border/30">
        <span className="text-muted-foreground font-medium">Status</span>
        <span className={`px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm ${
          analyticsData.data.status === 'DRAFTED' 
            ? 'bg-accent text-accent-foreground border border-accent/20' 
            : 'bg-primary/10 text-primary border border-primary/20'
        }`}>
          {analyticsData.data.status}
        </span>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-border/30">
        <span className="text-muted-foreground font-medium">Campaign ID</span>
        <span className="font-bold text-card-foreground text-lg">
          {analyticsData.data.id}
        </span>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-border/30">
        <span className="text-muted-foreground font-medium">Sequences</span>
        <span className="font-bold text-card-foreground text-lg">
          {analyticsData.data.sequence_count}
        </span>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-border/30">
        <span className="text-muted-foreground font-medium">Total Leads</span>
        <span className="font-bold text-card-foreground text-lg">
          {analyticsData.data.total_count}
        </span>
      </div>
      <div className="flex justify-between items-center py-3">
        <span className="text-muted-foreground font-medium">Created</span>
        <span className="font-bold text-card-foreground text-lg">
          {new Date(analyticsData.data.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>
);

export default CampaignDetails;
