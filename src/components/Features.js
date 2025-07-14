"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Aurora from "./Aurora";

const features = [
  {
    title: "AI-Powered Prospecting",
    description: "Our AI analyzes millions of data points to find your ideal customers with unprecedented accuracy.",
    icon: "/globe.svg"
  },
  {
    title: "Smart Personalization",
    description: "Generate hyper-personalized messages that resonate with each prospect's unique context and needs.",
    icon: "/file.svg"
  },
  {
    title: "Automated Outreach",
    description: "Set up sophisticated multi-channel outreach campaigns that run 24/7 while maintaining a human touch.",
    icon: "/window.svg"
  }
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
              Key Features
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-normal tracking-elegant text-white font-cormorant mb-4">
            Supercharge Your Sales
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-montserrat tracking-wide leading-relaxed">
            Leverage cutting-edge AI technology to automate and optimize every step of your sales development process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              
              <div className="relative">
                <div className="h-12 w-12 mb-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <Image src={feature.icon} alt={feature.title} width={24} height={24} className="opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-2xl font-cormorant font-normal tracking-wide text-white mb-4">
                  {feature.title}
                </h3>
                <p className="font-montserrat text-sm tracking-wide text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 