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
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatus = (lead) => {
    if (lead.is_bounced) return 'bounced';
    if (lead.is_unsubscribed) return 'unsubscribed';
    if (lead.reply_time) return 'replied';
    if (lead.click_time) return 'clicked';
    if (lead.open_time) return 'opened';
    if (lead.sent_time) return 'sent';
    return 'pending';
  };

  const getLatestActivity = (lead) => {
    if (lead.reply_time) return { type: 'reply', time: lead.reply_time };
    if (lead.click_time) return { type: 'click', time: lead.click_time };
    if (lead.open_time) return { type: 'open', time: lead.open_time };
    if (lead.sent_time) return { type: 'sent', time: lead.sent_time };
    return null;
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
          <TableHead className="font-semibold">Lead</TableHead>
          <TableHead className="font-semibold">Email Subject</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold">Sequence</TableHead>
          <TableHead className="font-semibold">Engagement</TableHead>
          <TableHead className="font-semibold">Latest Activity</TableHead>
          <TableHead className="font-semibold">Sent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead, index) => {
          const latestActivity = getLatestActivity(lead);
          const status = getStatus(lead);

          return (
            <TableRow key={lead.stats_id || index} className="group">
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{lead.lead_name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {lead.lead_email}
                  </div>
                  {lead.lead_category && (
                    <div className="text-xs text-muted-foreground">
                      Category: {lead.lead_category}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <div className="font-medium text-foreground truncate" title={lead.email_subject}>
                    {lead.email_subject}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ID: {lead.email_campaign_seq_id}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{lead.sequence_number}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Sequence {lead.sequence_number}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-accent-foreground" />
                    <span className="text-sm font-medium">{lead.open_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MousePointer className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{lead.click_count}</span>
                  </div>
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
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(lead.sent_time)}
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
