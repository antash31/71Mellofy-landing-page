import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Pause, Play } from "lucide-react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'COMPLETED': { icon: CheckCircle, className: 'bg-primary/10 text-primary border-primary/20' },
    'PAUSED': { icon: Pause, className: 'bg-accent/10 text-accent-foreground border-accent/20' },
    'STOPPED': { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20' },
    'IN_PROGRESS': { icon: Play, className: 'bg-primary/10 text-primary border-primary/20' },
    'BLOCKED': { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20' }
  };

  const config = statusConfig[status] || statusConfig['COMPLETED'];
  const IconComponent = config.icon;

  return (
    <Badge className={`flex items-center gap-1.5 px-3 py-1 font-medium ${config.className}`}>
      <IconComponent className="w-3 h-3" />
      {status.replace('_', ' ')}
    </Badge>
  );
};

export default StatusBadge;
