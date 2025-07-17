"use client";
import { motion } from "framer-motion";
import Aurora from "./Aurora";

const stats = [
  {
    value: "17%",
    label: "Avg. Response Rate",
    description: "Up from 5% with our 3-agent AI system for 3× engagement",
  },
  {
    value: "90%",
    label: "Cost Savings",
    description: "Replace a $60k SDR with a $6k AI platform",
  },
  {
    value: "5x",
    label: "More Meetings",
    description: "20 qualified leads daily vs 4 using traditional methods",
  },
  {
    value: "43%",
    label: "Better Lead Qualification",
    description: "AI scoring analyzes 50+ intent signals in real-time",
  },
];

const benefits = [
  "Scale your outreach without scaling your team",
  "Never miss a follow-up opportunity",
  "Perfect timing for every prospect",
  "Consistent brand voice across all communications",
  "Real-time performance analytics",
  "Seamless CRM integration",
];

export default function Benefits() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-black via-[#9333ea]/20 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <span className="font-inter text-sm tracking-ultra uppercase text-white/80">
              Results That Matter
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-poppins font-semibold tracking-tight text-white mb-4">
            The Numbers Speak
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-inter tracking-normal leading-relaxed">
            Stop playing the cold email lottery. While 95% of cold emails fail,
            our AI SDR platform delivers measurable results that transform your
            sales pipeline.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group transition-all duration-300 hover:scale-105"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

              <div className="relative p-8 rounded-xl bg-black/60 backdrop-blur-xl h-full text-center border border-white/10">
                <div className="text-5xl md:text-6xl font-poppins font-semibold tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  {stat.value}
                </div>
                <div className="text-xl font-poppins font-medium tracking-tight text-white mb-3">
                  {stat.label}
                </div>
                <p className="font-inter text-sm tracking-normal text-white/60 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24"
        >
          <h3 className="text-4xl font-poppins font-semibold tracking-tight text-white mb-12 text-center">
            Additional Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group transition-all duration-300 hover:scale-105"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-md opacity-0 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex items-center space-x-4 p-6 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 h-full">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-pink-500/50 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-inter text-base tracking-normal text-white/90">
                    {benefit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
