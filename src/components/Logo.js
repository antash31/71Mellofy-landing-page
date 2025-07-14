"use client";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Enhanced Icon with Gradient */}
      <div className="relative w-10 h-10">
        {/* Outer glow ring */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-sm"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Base circle with gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-[1px]">
          <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-sm"></div>
        </div>
        
        {/* Inner dot with gradient */}
        <motion.div 
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(147, 51, 234, 0.4)', 
              '0 0 0 12px rgba(147, 51, 234, 0)',
              '0 0 0 0 rgba(59, 130, 246, 0.4)',
              '0 0 0 12px rgba(59, 130, 246, 0)'
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        
        {/* Enhanced radar sweep with gradient */}
        <motion.div
          className="absolute w-[2px] h-5 bg-gradient-to-b from-white via-purple-300 to-transparent rounded-full"
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

      {/* Beautiful Logo Text */}
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Text with gradient and shadow */}
        <div className="relative">
          {/* Background gradient text effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-[0.5px] opacity-50">
            <span className="font-bold text-xl tracking-tight">71Mellofy</span>
          </div>
          
          {/* Main text */}
          <div className="relative bg-gradient-to-r from-blue-100 via-white to-purple-100 bg-clip-text text-transparent">
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
              71Mellofy
            </span>
          </div>
          
          {/* Subtle underline */}
          <motion.div 
            className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-blue-400/60 via-purple-400/60 to-pink-400/60"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
} 