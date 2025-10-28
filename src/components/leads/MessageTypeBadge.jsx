import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Mail, Eye, MousePointer, Send } from "lucide-react";

const MessageTypeBadge = ({ type }) => {
  const typeConfig = {
    'sent': { className: 'bg-accent/10 text-accent-foreground border-accent/20', icon: Send, label: 'Sent' },
    'open': { className: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Eye, label: 'Opened' },
    'click': { className: 'bg-primary/10 text-primary border-primary/20', icon: MousePointer, label: 'Clicked' },
    'reply': { className: 'bg-green-500/10 text-green-500 border-green-500/20', icon: Mail, label: 'Replied' },
    // Legacy uppercase formats
    'SENT': { className: 'bg-accent/10 text-accent-foreground border-accent/20', icon: Send, label: 'Sent' },
    'OPENED': { className: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Eye, label: 'Opened' },
    'CLICKED': { className: 'bg-primary/10 text-primary border-primary/20', icon: MousePointer, label: 'Clicked' },
    'REPLIED': { className: 'bg-green-500/10 text-green-500 border-green-500/20', icon: Mail, label: 'Replied' }
  };

  const config = typeConfig[type] || typeConfig['sent'];
  const IconComponent = config.icon;

  return (
    <Badge variant="outline" className={`flex items-center gap-1 text-xs ${config.className}`}>
      <IconComponent className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

export default MessageTypeBadge;
