"use client";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicAurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

export default function SuccessPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <DynamicAurora
          colorStops={["#2563eb", "#9333ea", "#db2777"]}
          amplitude={0.5}
          blend={0.8}
        />
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg mx-auto text-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-10 shadow-[0_0_20px_rgba(37,99,235,0.15)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.25)] transition-shadow duration-300"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="flex justify-center mb-6 relative"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
          <svg className="h-16 w-16 text-green-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-4xl font-poppins font-bold mb-4 text-white bg-gradient-to-r from-green-400 to-green-200 text-transparent bg-clip-text"
        >
          Welcome Aboard!
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-lg text-gray-200 leading-relaxed mb-8 font-inter"
        >
          Congratulations! You've secured your spot in our early access program. We've sent a confirmation email with all the details to get you started on revolutionizing your outreach.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Link 
            href="/" 
            className="btn group relative px-8 py-4 text-black transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 shadow-[0_4px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]" />
            <div className="absolute inset-0 rounded-xl bg-white/90 -bottom-1 translate-y-1 group-hover:translate-y-0.5 transition-transform duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.05)]" />
            <span className="relative z-10 uppercase">Back to Website</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/0 via-black/5 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ transform: "translateX(-100%)" }} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 