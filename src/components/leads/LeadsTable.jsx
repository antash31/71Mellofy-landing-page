import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Users, Mail, Eye, MousePointer, Clock } from "lucide-react";
import StatusBadge from './StatusBadge';
import MessageTypeBadge from './MessageTypeBadge';

const LeadsTable = ({ leads }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLatestActivity = (history) => {
    if (!history || history.length === 0) return null;
    return history[history.length - 1];
  };

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Users className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Leads Found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          There are no leads available for this campaign yet. Leads will appear here once your campaign starts generating engagement.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="font-semibold">Lead Info</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold">Sequence</TableHead>
          <TableHead className="font-semibold">Latest Activity</TableHead>
          <TableHead className="font-semibold">Engagement</TableHead>
          <TableHead className="font-semibold">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => {
          const latestActivity = getLatestActivity(lead.history);
          const totalOpens = lead.history?.reduce((sum, h) => sum + (h.open_count || 0), 0) || 0;
          const totalClicks = lead.history?.reduce((sum, h) => sum + (h.click_count || 0), 0) || 0;
          
          return (
            <TableRow key={lead.lead_id} className="group">
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{lead.to}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    From: {lead.from}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ID: {lead.lead_id}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={lead.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{lead.last_seq_num}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Sequence {lead.last_seq_num}</span>
                </div>
              </TableCell>
              <TableCell>
                {latestActivity ? (
                  <div className="space-y-2">
                    <MessageTypeBadge type={latestActivity.type} />
                    <div className="text-xs text-muted-foreground">
                      {formatDate(latestActivity.time)}
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">No activity</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-accent-foreground" />
                    <span className="text-sm font-medium">{totalOpens}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MousePointer className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{totalClicks}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default LeadsTable;
