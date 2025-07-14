"use client";
import Aurora from "./Aurora";
import BlurText from "./BlurText";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="absolute inset-0 z-1">
        <Aurora
          colorStops={["#FFFFFF", "#FFFFFF"]}
          blend={0.8}
          amplitude={2}
          speed={0.5}
        />
      </div>

      <div className="relative z-2 max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-2 text-xs font-sans tracking-ultra text-white/80 uppercase">Introducing</div>
        
        <div className="flex justify-center w-full">
          <BlurText
            text="Cold Email."
            animateBy="words"
            delay={120}
            className="mb-3 text-hero font-poppins text-center"
          />
        </div>
        
        <BlurText
          text="Completely Automated."
          animateBy="words"
          delay={150}
          direction="bottom"
          className="mb-10 text-hero font-poppins"
        />

        <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>

        <div className="w-full max-w-2xl flex justify-center items-center">
          <BlurText
            text="Your AI SDR finds prospects, personalises messages, and books meetings while you sleep"
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
          className="flex justify-center mt-14"
        >
          <button className="btn group relative px-8 py-4 text-white transition-all duration-300">
            {/* Button background */}
            <div className="absolute inset-0 bg-white/10 rounded-xl transition-all duration-300 group-hover:bg-white/20" />
            
            {/* Button border */}
            <div className="absolute inset-0 rounded-xl border border-white/50 transition-all duration-300 group-hover:border-white group-hover:scale-105" />
            
            {/* Button text */}
            <span className="relative z-10 uppercase">Join the Waitlist</span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ transform: 'translateX(-100%)' }} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
