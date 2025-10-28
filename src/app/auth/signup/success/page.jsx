"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Congratulations!
            </h1>
            
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              You've successfully registered with 71Mellofy
            </h2>
          </div>

          {/* Success Message */}
          <div className="bg-card border border-border rounded-xl p-8 mb-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-primary mb-4">
                <Users className="w-6 h-6" />
                <span className="text-lg font-semibold">Welcome to the Team!</span>
              </div>
              
              <p className="text-lg text-foreground leading-relaxed">
                Our team will contact you shortly to help you get started with your AI SDR journey.
              </p>
              
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/" className="flex items-center gap-2">
                Discover more 
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at{" "}
              <a 
                href="mailto:info@71mellofy.com" 
                className="text-primary hover:underline font-medium"
              >
                ceo@71mellofy.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
