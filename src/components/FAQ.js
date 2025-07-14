"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Aurora from "./Aurora";

const faqs = [
  {
    question: "How does the AI SDR actually work?",
    answer: "Our AI SDR uses advanced machine learning to analyze your ideal customer profile, find matching prospects, and engage them with personalized messages. It learns from successful interactions to continuously improve its approach, handling everything from initial outreach to meeting scheduling."
  },
  {
    question: "Will prospects know they're talking to an AI?",
    answer: "Our AI is designed to be transparent while maintaining natural, professional communication. While it can identify itself as an AI assistant if required, its communications are so well-crafted that prospects often engage just as they would with a human SDR."
  },
  {
    question: "How long does it take to get started?",
    answer: "Most teams are up and running within 24-48 hours. The setup process includes connecting your CRM, defining your ideal customer profile, and customizing your outreach preferences. Our team provides full support throughout the implementation."
  },
  {
    question: "What CRM systems do you integrate with?",
    answer: "We integrate with all major CRM platforms including Salesforce, HubSpot, Pipedrive, and more. Our flexible API also allows for custom integrations with other systems if needed."
  },
  {
    question: "How do you ensure data privacy and security?",
    answer: "We maintain the highest standards of data security with SOC 2 Type II compliance, end-to-end encryption, and regular security audits. Your data is stored in secure, encrypted databases with strict access controls."
  },
  {
    question: "Can I customize the AI's outreach strategy?",
    answer: "Absolutely! You can customize everything from the tone of voice to outreach cadence, preferred channels, and response handling. The AI adapts to your brand voice and sales methodology."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Aurora
          colorStops={["#000000", "#1a1a1a", "#000000"]}
          amplitude={0.5}
          blend={0.8}
        />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <span className="font-montserrat text-sm tracking-ultra uppercase text-white/80">
              Common Questions
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-normal tracking-elegant text-white font-cormorant mb-4">
            Frequently Asked
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-montserrat tracking-wide leading-relaxed">
            Everything you need to know about the AI SDR platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-cormorant font-normal tracking-wide text-white">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-white/60 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 font-montserrat text-sm tracking-wide text-white/60 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 