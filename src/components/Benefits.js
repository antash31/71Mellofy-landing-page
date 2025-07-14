"use client";
import { motion } from "framer-motion";
import Aurora from "./Aurora";

const stats = [
  {
    value: "3x",
    label: "More Meetings Booked",
    description: "Compared to traditional SDR teams"
  },
  {
    value: "80%",
    label: "Cost Reduction",
    description: "Lower customer acquisition costs"
  },
  {
    value: "24/7",
    label: "Always Working",
    description: "Continuous outreach and follow-ups"
  },
  {
    value: "95%",
    label: "Response Rate",
    description: "With personalized messaging"
  }
];

const benefits = [
  "Scale your outreach without scaling your team",
  "Never miss a follow-up opportunity",
  "Perfect timing for every prospect",
  "Consistent brand voice across all communications",
  "Real-time performance analytics",
  "Seamless CRM integration"
];

export default function Benefits() {
  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <span className="font-montserrat text-sm tracking-ultra uppercase text-white/80">
              Results That Matter
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-normal tracking-elegant text-white font-cormorant mb-4">
            The Numbers Speak
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-montserrat tracking-wide leading-relaxed">
            Our AI SDR delivers measurable results that transform your sales process
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
              className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="relative">
                <div className="text-5xl md:text-6xl font-cormorant font-light tracking-wide text-white mb-4">
                  {stat.value}
                </div>
                <div className="text-xl font-cormorant font-normal tracking-wide text-white mb-3">
                  {stat.label}
                </div>
                <p className="font-montserrat text-sm tracking-wide text-white/60 leading-relaxed">
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
          className="p-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-3xl font-cormorant font-normal tracking-wide text-white mb-10 text-center">
            Additional Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white/60" />
                </div>
                <span className="font-montserrat text-sm tracking-wide text-white/80">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 