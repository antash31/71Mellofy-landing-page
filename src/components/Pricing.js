"use client";
import { motion } from "framer-motion";
import StarBorder from "./StarBorder";
import Link from 'next/link';

const tiers = [
  {
    name: "Starter",
    price: "999",
    description: "Perfect for small teams getting started with AI-powered sales",
    features: [
      "Up to 500 prospects/month",
      "Basic AI personalization",
      "Email outreach",
      "Basic CRM integration",
      "5 email templates",
      "Basic analytics"
    ]
  },
  {
    name: "Professional",
    price: "1,999",
    description: "Ideal for growing teams looking to scale their outreach",
    features: [
      "Up to 2,000 prospects/month",
      "Advanced AI personalization",
      "Multi-channel outreach",
      "Advanced CRM integration",
      "20 email templates",
      "Advanced analytics",
      "A/B testing",
      "Priority support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large organizations with specific needs",
    features: [
      "Unlimited prospects",
      "Custom AI training",
      "Full multi-channel suite",
      "Enterprise CRM integration",
      "Custom templates",
      "Custom analytics",
      "Dedicated success manager",
      "24/7 priority support",
      "Custom security features"
    ]
  }
];

export default function Pricing() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the perfect plan for your team's needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative p-8 rounded-2xl border ${
                tier.popular
                  ? "bg-gradient-to-b from-indigo-900/50 to-indigo-900/20 border-indigo-500"
                  : "bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-800"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <span className="bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline mb-4">
                {tier.price === "Custom" ? (
                  <span className="text-4xl font-bold text-white">Custom</span>
                ) : (
                  <>
                    <span className="text-2xl font-semibold text-gray-400">$</span>
                    <span className="text-4xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </>
                )}
              </div>
              <p className="text-gray-400 mb-6">{tier.description}</p>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <svg
                      className="h-5 w-5 text-indigo-500 mr-3"
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
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link href={tier.price === "Custom" ? "/contact" : "/signup"}>
                  <StarBorder
                    color={tier.popular ? "#818cf8" : "#4f46e5"}
                    speed="4s"
                    thickness={2}
                  >
                    <span className="font-bold text-lg tracking-wide">
                      {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </span>
                  </StarBorder>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 