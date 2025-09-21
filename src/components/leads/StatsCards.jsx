import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, XCircle } from "lucide-react";

const StatsCards = ({ totalLeads, currentPage, totalPages, startIndex, endIndex, hasMore }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <h4 className="text-sm font-medium text-muted-foreground">Total Leads</h4>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-2xl font-bold text-foreground">{totalLeads}</span>
        </div>
      </CardContent>
    </Card>
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <h4 className="text-sm font-medium text-muted-foreground">Current Page</h4>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">{currentPage}</span>
          <span className="text-muted-foreground">of {totalPages || 1}</span>
        </div>
      </CardContent>
    </Card>
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <h4 className="text-sm font-medium text-muted-foreground">Showing</h4>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {startIndex}-{endIndex}
        </div>
      </CardContent>
    </Card>
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <h4 className="text-sm font-medium text-muted-foreground">Has More</h4>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {hasMore ? (
            <CheckCircle className="w-5 h-5 text-primary" />
          ) : (
            <XCircle className="w-5 h-5 text-muted-foreground" />
          )}
          <span className="text-2xl font-bold text-foreground">
            {hasMore ? 'Yes' : 'No'}
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default StatsCards;
