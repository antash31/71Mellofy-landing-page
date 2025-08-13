"use client";
import { motion } from "framer-motion";
import Aurora from "./Aurora";

export default function Problem() {
  return (
    <section className="relative py-20 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Aurora colorStops={["#000000", "#1a1a1a", "#000000"]} amplitude={0.5} blend={0.8} />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-semibold tracking-tight text-white mb-4">
            Tired of Manual Prospecting Killing Your Team's Performance?
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-8"></div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            SDRs waste hours on low-value tasks—hunting for leads, copying data, chasing replies, and missing follow-ups. Pipeline stalls. Meetings slip. Quotas suffer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


