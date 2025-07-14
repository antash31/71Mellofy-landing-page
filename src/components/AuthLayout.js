"use client";
import Aurora from "./Aurora";
import Logo from "./Logo";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthLayout({ children, title, subtitle, altLink, altText }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#FFFFFF", "#FFFFFF"]}
          blend={0.6}
          amplitude={1.5}
          speed={0.4}
        />
      </div>

      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-auto px-8"
      >
        {/* Logo Section */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
        </div>

        {/* Auth Card */}
        <div className="relative backdrop-blur-md bg-black/70 rounded-2xl p-8 ring-1 ring-white/20 shadow-xl shadow-black/20">
          {/* Card Inner Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="relative text-center mb-8">
            <h1 className="text-2xl font-cormorant font-light tracking-wide text-white mb-2">
              {title}
            </h1>
            <p className="text-sm text-white/60 font-montserrat tracking-wide">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="relative">
            {children}
          </div>

          {/* Alternative Action Link */}
          <div className="relative mt-6 text-center">
            <Link 
              href={altLink} 
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-montserrat tracking-wide"
            >
              {altText}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 