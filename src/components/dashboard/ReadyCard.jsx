import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Plus, ArrowRight } from "lucide-react";

const ReadyCard = ({ onCreateSDR }) => (
  <div className="bg-card rounded-3xl shadow-2xl p-12 max-w-3xl mx-auto border border-border/50 backdrop-blur-sm">
    <div className="w-20 h-20 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-primary/10">
      <CheckCircle className="w-10 h-10 text-primary drop-shadow-sm" />
    </div>
    <h2 className="text-4xl font-bold text-foreground mb-6 tracking-tight">
      You're All Set! 🚀
    </h2>
    <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
      {/* Placeholder for dynamic content if needed */}
    </p>
    <Button
      onClick={onCreateSDR}
      size="lg"
      className="group relative inline-flex items-center gap-4 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl ring-2 ring-primary/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40 hover:scale-105"
    >
      <Plus className="w-6 h-6" />
      Create Your First SDR Agent
      <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  </div>
);

export default ReadyCard;
