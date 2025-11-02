"use client";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 ">
      {/* Logo Image */}
      <motion.img
        src="/71mellofy_logo.png"
        alt="71Mellofy Logo"
        className="w-[60px] h-[60px] rounded-full object-cover"
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2 }}
      />
      

      {/* Beautiful Logo Text */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Text with gradient and shadow */}
        <div className="relative">
          {/* Background gradient text effect */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-[0.5px] opacity-50">
            <span className="font-bold text-2xl tracking-tight">71Mellofy</span>
          </div> */}

          {/* Main text */}
          <div className="relative bg-gradient-to-r from-blue-100 via-white to-purple-100 bg-clip-text text-transparent">
            <span
              className="font-bold text-2xl tracking-tight"
              style={{
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
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
