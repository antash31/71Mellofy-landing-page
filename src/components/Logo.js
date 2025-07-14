"use client";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Radar Icon with Ping Animation */}
      <div className="relative w-8 h-8">
        {/* Base circle */}
        <div className="absolute inset-0 rounded-full border border-white/50"></div>
        
        {/* Inner dot */}
        <motion.div 
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{
            boxShadow: ['0 0 0 0 rgba(255,255,255,0.4)', '0 0 0 8px rgba(255,255,255,0)'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        
        {/* Radar sweep */}
        <motion.div
          className="absolute w-[1px] h-4 bg-gradient-to-b from-white/80 to-transparent"
          style={{ 
            top: '50%', 
            left: '50%', 
            transformOrigin: '0 0',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Logo Text */}
      <div className="flex items-center text-lg font-cormorant tracking-widest">
        <span className="font-light">NOVA</span>
        <span className="mx-1 text-white/30">|</span>
        <span className="font-medium">SDR</span>
      </div>
    </div>
  );
} 