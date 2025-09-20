import React from 'react';

const steps = [
  { step: 1, title: "Connect Email Account", description: "Add your email account for sending outreach messages", status: "current" },
  { step: 2, title: "Create SDR Agent", description: "Set up your AI agent with target domains and regions", status: "upcoming" },
  { step: 3, title: "Launch Campaign", description: "Start your automated outreach and track results", status: "upcoming" }
];

const ProgressSteps = () => (
  <div className="grid md:grid-cols-3 gap-8">
    {steps.map((step, index) => (
      <div key={index} className="text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg transition-all duration-200 ${
          step.status === 'current' 
            ? 'bg-primary text-primary-foreground border-2 border-primary/20' 
            : 'bg-muted text-muted-foreground border-2 border-muted/20'
        }`}>
          {step.step}
        </div>
        <h4 className="font-bold text-foreground mb-3 text-lg">{step.title}</h4>
        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
      </div>
    ))}
  </div>
);

export default ProgressSteps;
