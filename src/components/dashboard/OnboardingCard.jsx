import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import ProgressSteps from './ProgressSteps';

const OnboardingCard = () => (
  <div className="bg-card rounded-3xl shadow-2xl p-12 mb-12 border border-border/50 backdrop-blur-sm">
    <div className="text-center mb-10">
      <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-accent/10">
        <Mail className="w-10 h-10 text-accent-foreground drop-shadow-sm" />
      </div>
      <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">
        Let's Get You Started! 👋
      </h2>
      <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
        To create your first SDR agent, you'll need to connect at least one email account for outreach campaigns.
      </p>
      <Link href="/dashboard/email-accounts">
        <Button size="lg" className="group relative inline-flex items-center gap-4 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl ring-2 ring-primary/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40 hover:scale-105">
          <Mail className="w-6 h-6" />
          Connect Your First Email Account
          <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
    <div className="border-t border-border/30 pt-10">
      <h3 className="text-2xl font-bold text-foreground mb-8 text-center tracking-tight">
        Quick Setup Process
      </h3>
      <ProgressSteps />
    </div>
  </div>
);

export default OnboardingCard;
