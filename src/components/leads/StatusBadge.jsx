import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Pause, Play, Mail, Eye, MousePointer, Send, Clock } from "lucide-react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    // Lead statuses
    'bounced': { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Bounced' },
    'unsubscribed': { icon: XCircle, className: 'bg-orange-500/10 text-orange-500 border-orange-500/20', label: 'Unsubscribed' },
    'replied': { icon: CheckCircle, className: 'bg-green-500/10 text-green-500 border-green-500/20', label: 'Replied' },
    'clicked': { icon: MousePointer, className: 'bg-primary/10 text-primary border-primary/20', label: 'Clicked' },
    'opened': { icon: Eye, className: 'bg-blue-500/10 text-blue-500 border-blue-500/20', label: 'Opened' },
    'sent': { icon: Send, className: 'bg-accent/10 text-accent-foreground border-accent/20', label: 'Sent' },
    'pending': { icon: Clock, className: 'bg-muted/10 text-muted-foreground border-muted/20', label: 'Pending' },
    // Campaign statuses (legacy)
    'COMPLETED': { icon: CheckCircle, className: 'bg-primary/10 text-primary border-primary/20', label: 'Completed' },
    'PAUSED': { icon: Pause, className: 'bg-accent/10 text-accent-foreground border-accent/20', label: 'Paused' },
    'STOPPED': { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Stopped' },
    'IN_PROGRESS': { icon: Play, className: 'bg-primary/10 text-primary border-primary/20', label: 'In Progress' },
    'BLOCKED': { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Blocked' }
  };

  const config = statusConfig[status] || statusConfig['pending'];
  const IconComponent = config.icon;

  return (
    <Badge className={`flex items-center gap-1.5 px-3 py-1 font-medium ${config.className}`}>
      <IconComponent className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
