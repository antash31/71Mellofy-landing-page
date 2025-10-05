"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Aurora from "./Aurora";
import TiltedCard from "./TiltedCard";
import { WEBSITE_CONFIG } from "@/constants/website.constants";

const features = [
  {
    title: WEBSITE_CONFIG.SECTION_2.Cards[0].title,
    headline: "Quality Over Quantity: AI That Builds The Best ICP and Finds Your Perfect Prospects",
    description: WEBSITE_CONFIG.SECTION_2.Cards[0].description,
    icon: "/globe.svg",
  },
  {
    title: WEBSITE_CONFIG.SECTION_2.Cards[1].title,
    description: WEBSITE_CONFIG.SECTION_2.Cards[1].description,
    icon: "/file.svg",
  },
  {
    title: WEBSITE_CONFIG.SECTION_2.Cards[2].title,
    description: WEBSITE_CONFIG.SECTION_2.Cards[2].description,
    icon: "/window.svg",
  },
];

export default function Features() {
  return (
    <section id="why-choose-ai-sdrs" className="relative py-14 px-6 bg-black overflow-hidden">
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
            <span className="font-inter text-sm tracking-ultra uppercase text-white/80">
              Problem-Solution Mapping
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-poppins font-semibold tracking-tight text-white mb-4">
            {WEBSITE_CONFIG.SECTION_2.heading_1}
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>
          <p className="text-lg text-white/60 max-w-3xl mx-auto font-inter tracking-normal leading-relaxed">
            {WEBSITE_CONFIG.SECTION_2.description}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
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
                  <div className="relative w-full h-full p-8 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-xl rounded-lg flex flex-col group">
                    {/* Animated glowing border */}
                    <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-pink-600/50 animate-gradient blur-sm" />
                    <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-blue-600/25 via-purple-600/25 to-pink-600/25 animate-gradient blur-md" />
                    <div className="absolute inset-[1px] rounded-lg bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-xl" />

                    {/* Content container */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-lg">
                          <Image
                            src={feature.icon}
                            width={24}
                            height={24}
                            alt={feature.title}
                            className="opacity-80"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      {/* <h4 className="text-lg font-medium text-white/90 mb-3">
                        {feature.headline}
                      </h4> */}
                      <p className="text-white/70 mb-6 flex-grow">
                        {feature.description}
                      </p>

                      {/* Metric */}
                      <div className="pt-6 border-t border-white/10">
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                            {feature.metric}
                          </span>
                          <span className="ml-2 text-sm text-white/60">
                            {feature.metricLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
