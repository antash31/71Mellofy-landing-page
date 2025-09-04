"use client";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import Aurora from "@/components/Aurora";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plan = {
    name: "AI SDR Pro",
    price: "$497",
    period: "/month",
    description: "Complete AI-powered sales development solution for serious revenue growth",
    features: [
      "Unlimited lead scoring & qualification",
      "Advanced AI personalization engine",
      "Multi-channel outreach (Email + LinkedIn)",
      "Intelligent response handling",
      "Real-time analytics & reporting",
      "CRM integrations (HubSpot, Salesforce)",
      "A/B testing for email sequences",
      "Priority support & onboarding",
      "Custom AI model training",
      "Dedicated success manager"
    ],
    highlighted: [
      "10x faster lead qualification",
      "3x higher response rates",
      "50% reduction in sales cycle"
    ]
  };

  const handleBuyNow = () => {
    // This would typically integrate with your payment processor
    // For now, we'll redirect to a checkout or contact page
    window.location.href = '/auth/signup';
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-black text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <Aurora
            colorStops={["#2563eb", "#9333ea", "#db2777"]}
            amplitude={0.5}
            blend={0.8}
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
              <span className="font-inter text-sm tracking-ultra uppercase text-white/80">
                Simple Pricing
              </span>
            </div>
            <h1 className="text-hero text-white mb-4">
              One Plan, Unlimited Growth
            </h1>
            <p className="text-subtitle text-white/60 max-w-2xl mx-auto leading-luxurious">
              Everything you need to transform your sales process with AI-powered precision
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            {/* Main Pricing Card */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              
              {/* Card */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 group-hover:border-white/40 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_50px_rgba(147,51,234,0.2)]">
                
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8 pt-4">
                  <h3 className="h2 text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-hero text-white">
                      {plan.price}
                    </span>
                    <span className="text-white/60 ml-1 text-caption">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-white/70 body-text leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="mb-8">
                  <h4 className="h3 text-white mb-4">Key Results:</h4>
                  <div className="grid gap-3">
                    {plan.highlighted.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white/90 font-medium body-text">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-8">
                  <h4 className="h3 text-white mb-4">Everything Included:</h4>
                  <div className="grid gap-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white/80 body-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleBuyNow}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(147,51,234,0.4)] transform hover:-translate-y-1"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
                  
                  <span className="relative btn">
                    Start Your AI SDR Today
                  </span>
                </button>

                {/* Money Back Guarantee */}
                <div className="text-center mt-6">
                  <p className="text-white/60 text-caption">
                    30-day money-back guarantee • Cancel anytime
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="h1 text-white mb-2">500+</div>
                <div className="text-white/60 body-text">Companies Growing</div>
              </div>
              <div className="text-center">
                <div className="h1 text-white mb-2">10M+</div>
                <div className="text-white/60 body-text">Emails Sent</div>
              </div>
              <div className="text-center">
                <div className="h1 text-white mb-2">300%</div>
                <div className="text-white/60 body-text">Average ROI</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}