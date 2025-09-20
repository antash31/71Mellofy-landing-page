import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import OnboardingCard from './OnboardingCard';

const OnboardingSection = () => (
  <div className="max-w-4xl mx-auto">
    <OnboardingCard />
    <div className="text-center mt-12">
      <Button
        size="lg"
        disabled
        className="px-10 py-6 text-xl font-bold opacity-40 cursor-not-allowed rounded-2xl shadow-lg"
      >
        <Plus className="w-6 h-6 mr-4" />
        Create SDR Agent
      </Button>
      <p className="text-muted-foreground mt-4 text-lg">
        Available after connecting an email account
      </p>
    </div>
  </div>
);

export default OnboardingSection;
