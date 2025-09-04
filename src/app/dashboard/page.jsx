"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Mail, AlertTriangle, Loader2, RefreshCw, ArrowRight, CheckCircle, Users, Target, TrendingUp } from "lucide-react";
import CreateSDRModal from "@/components/CreateSDRModal";
import { useEmailAccounts } from "@/contexts/EmailAccountsContext";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { hasEmailAccounts, emailAccounts, isLoading, error, refreshEmailAccounts } = useEmailAccounts();

  const handleCreateSDR = () => {
    if (!hasEmailAccounts) {
      // Don't open modal if no email accounts
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefreshAccounts = async () => {
    try {
      setIsRefreshing(true);
      await refreshEmailAccounts();
    } catch (err) {
      console.error('Failed to refresh email accounts:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Show loading state while fetching email accounts
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            AI SDR Dashboard
          </h1>
          <p className="text-muted-foreground max-w-md">
            Loading your email accounts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Bot className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI SDR Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create and manage your AI-powered Sales Development Representatives to automate your outreach campaigns.
          </p>
        </div>

        {!error ? (
          <>
            {/* Main Content */}
            {hasEmailAccounts ? (
              /* When email accounts exist - Ready to create SDR */
              <div className="text-center space-y-8">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-slate-200 dark:border-slate-700">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    You're All Set! 🚀
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {emailAccounts.length} email account{emailAccounts.length !== 1 ? 's' : ''} configured and ready for outreach campaigns.
                  </p>
                  <Button
                    onClick={handleCreateSDR}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First SDR Agent
                  </Button>
                </div>

                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                  {[
                    {
                      icon: Target,
                      title: "Targeted Outreach",
                      description: "AI-powered targeting based on your ideal customer profile"
                    },
                    {
                      icon: Users,
                      title: "Lead Generation",
                      description: "Automatically identify and engage high-quality prospects"
                    },
                    {
                      icon: TrendingUp,
                      title: "Performance Analytics",
                      description: "Track campaign performance and optimize your results"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* When no email accounts - Onboarding flow */
              <div className="max-w-4xl mx-auto">
                {/* Getting Started Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-slate-200 dark:border-slate-700">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Let's Get You Started! 👋
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      To create your first SDR agent, you'll need to connect at least one email account for outreach campaigns.
                    </p>
                    <Link href="/dashboard/email-accounts">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                        <Mail className="w-5 h-5 mr-2" />
                        Connect Your First Email Account
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Progress Steps */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                    <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
                      Quick Setup Process
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          step: 1,
                          title: "Connect Email Account",
                          description: "Add your email account for sending outreach messages",
                          status: "current"
                        },
                        {
                          step: 2,
                          title: "Create SDR Agent",
                          description: "Set up your AI agent with target domains and regions",
                          status: "upcoming"
                        },
                        {
                          step: 3,
                          title: "Launch Campaign",
                          description: "Start your automated outreach and track results",
                          status: "upcoming"
                        }
                      ].map((step, index) => (
                        <div key={index} className="text-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-medium ${
                            step.status === 'current' 
                              ? 'bg-primary text-white' 
                              : 'bg-slate-100 dark:bg-slate-700 text-muted-foreground'
                          }`}>
                            {step.step}
                          </div>
                          <h4 className="font-medium text-foreground mb-2">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features Preview for new users */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: Bot,
                      title: "AI-Powered",
                      description: "Advanced AI that learns and improves your outreach"
                    },
                    {
                      icon: Target,
                      title: "Smart Targeting",
                      description: "Target prospects by domain, region, and more"
                    },
                    {
                      icon: Mail,
                      title: "Email Integration",
                      description: "Works with Gmail, Outlook, and custom SMTP"
                    },
                    {
                      icon: TrendingUp,
                      title: "Analytics",
                      description: "Detailed insights on campaign performance"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-medium text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Disabled Create SDR Button */}
                <div className="text-center mt-8">
                  <Button
                    size="lg"
                    disabled
                    className="px-8 py-4 text-lg font-medium opacity-50 cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create SDR Agent
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Available after connecting an email account
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Error State */
          <div className="text-center max-w-md mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Connection Error
              </h2>
              <p className="text-muted-foreground mb-6">
                {error}
              </p>
              <Button
                onClick={handleRefreshAccounts}
                disabled={isRefreshing}
                className="flex items-center gap-2 mx-auto"
              >
                {isRefreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Modal */}
        <CreateSDRModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    </div>
  );
}

