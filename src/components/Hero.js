"use client";
import Aurora from "./Aurora";
import BlurText from "./BlurText";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">
      <div className="absolute inset-0 z-[1]">
        <Aurora
          colorStops={["#2563eb", "#9333ea", "#db2777"]}
          blend={0.8}
          amplitude={2}
          speed={0.5}
        />
      </div>

      <div className="relative z-[20] max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-2 text-xs font-sans tracking-ultra text-white/80 uppercase">
          Introducing
        </div>

        <div className="flex justify-center w-full">
          <BlurText
            text="Turn Cold Emails into"
            animateBy="words"
            delay={120}
            className="mb-3 text-hero font-poppins text-center"
          />
        </div>

        <BlurText
          text="Warm Conversations with AI-Powered Precision"
          animateBy="words"
          delay={150}
          direction="bottom"
          className="mb-10 text-hero font-poppins"
        />

        <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>

        <div className="w-full max-w-2xl flex justify-center items-center">
          <BlurText
            text="Stop wasting time on generic outreach. Our AI agents score leads, personalize every email, and handle responses intelligently - so you can focus on closing deals."
            animateBy="words"
            delay={30}
            stepDuration={0.25}
            className="text-subtitle text-gray-300 leading-luxurious text-center"
          />
        </div>

        {/* Improved CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center mt-14 relative z-[30]"
        >
          <Link href="/pricing" className="relative z-[30]">
            <button className="btn group relative z-[30] px-8 py-4 text-black transition-all duration-300" style={{ transform: 'translate3d(0,0,0)' }}>
              {/* Button background */}
              <div className="absolute inset-0 bg-white rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 shadow-[0_4px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]" />

              {/* Button border and 3D effect */}
              <div className="absolute inset-0 rounded-xl bg-white/90 -bottom-1 translate-y-1 group-hover:translate-y-0.5 transition-transform duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.05)]" />

              {/* Button text */}
              <span className="relative z-[40] uppercase">Buy an AI SDR</span>

              {/* Button shine effect */}
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-black/0 via-black/5 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ transform: "translateX(-100%)" }}
              />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
