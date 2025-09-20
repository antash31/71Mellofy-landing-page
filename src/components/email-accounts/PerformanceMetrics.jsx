import React from 'react';

const PerformanceMetrics = ({ stats }) => (
  stats.sent_count > 0 && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
      <div className="text-center">
        <div className="text-sm text-muted-foreground">Open Rate</div>
        <div className="text-lg font-semibold text-foreground">
          {((stats.open_count / stats.sent_count) * 100).toFixed(1)}%
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm text-muted-foreground">Click Rate</div>
        <div className="text-lg font-semibold text-foreground">
          {((stats.click_count / stats.sent_count) * 100).toFixed(1)}%
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm text-muted-foreground">Reply Rate</div>
        <div className="text-lg font-semibold text-foreground">
          {((stats.reply_count / stats.sent_count) * 100).toFixed(1)}%
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm text-muted-foreground">Bounce Rate</div>
        <div className="text-lg font-semibold text-foreground">
          {((stats.bounce_count / stats.sent_count) * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  )
);

export default PerformanceMetrics;
