import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Mail, Eye, MousePointer } from "lucide-react";

const MessageTypeBadge = ({ type }) => {
  const typeConfig = {
    'SENT': { className: 'bg-primary/10 text-primary border-primary/20', icon: Mail },
    'OPENED': { className: 'bg-accent/10 text-accent-foreground border-accent/20', icon: Eye },
    'CLICKED': { className: 'bg-primary/10 text-primary border-primary/20', icon: MousePointer },
    'REPLIED': { className: 'bg-primary/10 text-primary border-primary/20', icon: Mail }
  };

  const config = typeConfig[type] || typeConfig['SENT'];
  const IconComponent = config.icon;

  return (
    <Badge variant="outline" className={`flex items-center gap-1 text-xs ${config.className}`}>
      <IconComponent className="w-3 h-3" />
      {type}
    </Badge>
  );
};

export default MessageTypeBadge;
