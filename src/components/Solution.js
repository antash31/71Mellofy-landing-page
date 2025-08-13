"use client";
import { motion } from "framer-motion";
import Aurora from "./Aurora";

export default function Solution() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
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
            Meet Your AI Sales Development Representative
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-8"></div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Your always-on AI SDR software finds and qualifies buyers, personalizes outreach, handles replies, and books meetings—so your reps focus on closing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


