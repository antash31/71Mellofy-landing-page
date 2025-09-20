import React from 'react';
import { Send, Eye, MousePointer, Reply, Ban, UserX } from "lucide-react";

const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    <div className="bg-muted/30 rounded-lg p-3 text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        <Send className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Sent</span>
      </div>
      <div className="text-xl font-bold text-foreground">{stats.sent_count}</div>
    </div>
    <div className="bg-muted/30 rounded-lg p-3 text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        <Eye className="w-4 h-4 text-accent-foreground" />
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Opens</span>
      </div>
      <div className="text-xl font-bold text-foreground">{stats.open_count}</div>
    </div>
    <div className="bg-muted/30 rounded-lg p-3 text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        <MousePointer className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Clicks</span>
      </div>
      <div className="text-xl font-bold text-foreground">{stats.click_count}</div>
    </div>
    <div className="bg-muted/30 rounded-lg p-3 text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        <Reply className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Replies</span>
      </div>
      <div className="text-xl font-bold text-foreground">{stats.reply_count}</div>
    </div>
    <div className="bg-muted/30 rounded-lg p-3 text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        <Ban className="w-4 h-4 text-destructive" />
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Bounced</span>
      </div>
      <div className="text-xl font-bold text-foreground">{stats.bounce_count}</div>
    </div>
    <div className="bg-muted/30 rounded-lg p-3 text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        <UserX className="w-4 h-4 text-destructive" />
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Unsub</span>
      </div>
      <div className="text-xl font-bold text-foreground">{stats.unsubscribed_count}</div>
    </div>
  </div>
);

export default StatsGrid;
