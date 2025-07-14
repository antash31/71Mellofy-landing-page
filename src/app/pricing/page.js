"use client";
import TiltedCard from "@/components/TiltedCard";
import { motion } from "framer-motion";
import Aurora from "@/components/Aurora";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for small businesses starting with AI SDR",
      features: [
        "Up to 100 leads/month",
        "Basic AI personalization",
        "Email outreach",
        "Basic analytics",
      ],
    },
    {
      name: "Professional",
      price: "$299",
      description: "Ideal for growing teams with advanced needs",
      features: [
        "Up to 500 leads/month",
        "Advanced AI personalization",
        "Multi-channel outreach",
        "Advanced analytics & reporting",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations requiring custom solutions",
      features: [
        "Unlimited leads",
        "Custom AI model training",
        "Full API access",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 premium support",
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Aurora
          colorStops={["#000000", "#1a1a1a", "#000000"]}
          amplitude={0.5}
          blend={0.8}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <span className="font-montserrat text-sm tracking-ultra uppercase text-white/80">
              Choose Your Plan
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-normal tracking-elegant text-white font-cormorant mb-4">
            Pricing Plans
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-montserrat tracking-wide leading-relaxed">
            Scale your outreach with AI-powered precision. Select the plan that
            best fits your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltedCard
                containerHeight="500px"
                containerWidth="100%"
                imageHeight="500px"
                imageWidth="100%"
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                scaleOnHover={1.05}
                rotateAmplitude={10}
                overlayContent={
                  <div className="text-center p-6 w-full bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.07)] relative z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-lg" />
                    <div className="relative z-20">
                      <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-montserrat tracking-wide mb-2">
                        {plan.name}
                      </span>
                      <div className="text-4xl font-cormorant font-light tracking-wide mb-2 text-white">
                        {plan.price}
                      </div>
                      <p className="text-white/60 mb-6 font-montserrat text-sm tracking-wide">{plan.description}</p>
                      <ul className="text-left space-y-3 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-white/80 font-montserrat text-sm tracking-wide">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="relative overflow-hidden group bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-all duration-500 border border-white/30 hover:border-white">
                        <div className="absolute inset-0 w-3/12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-40 blur-lg group-hover:w-6/12 transition-all duration-500" />
                        <div className="absolute inset-[-1px] bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative font-montserrat text-sm tracking-wide">Get Started</span>
                      </button>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}