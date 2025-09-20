import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Plus } from "lucide-react";

const EmptyState = ({ onAddEmail }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
      <Mail className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">No Email Accounts Yet</h3>
    <p className="text-muted-foreground max-w-md mb-6">
      You need to add at least one email account before you can create SDR agents. 
      Email accounts are used to send and receive messages in your campaigns.
    </p>
    <Button onClick={onAddEmail} size="lg" className="flex items-center gap-2">
      <Plus className="w-5 h-5" />
      Add Your First Email Account
    </Button>
  </div>
);

export default EmptyState;
