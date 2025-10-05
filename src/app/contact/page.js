"use client";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import Aurora from "@/components/Aurora";

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Aurora
            colorStops={["#2563eb", "#9333ea", "#db2777"]}
            amplitude={0.5}
            blend={0.8}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full mb-8">
              <span className="font-sans text-xs tracking-ultra uppercase text-white/80">
                Contact Us
              </span>
            </div>
            <h1 className="text-hero font-poppins mb-4 text-white">
              Get in Touch
            </h1>
            <p className="text-subtitle text-gray-300 leading-luxurious max-w-2xl mx-auto font-inter">
              Have questions about our AI SDR solution? We're here to help you scale
              your outreach efforts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group max-w-xl mx-auto"
          >
            <div className="absolute inset-0 bg-white/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 space-y-8 group-hover:border-white/20 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.2)]">
              <div>
                <h3 className="text-3xl font-poppins font-semibold mb-4 text-white">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-black/40 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300">
                    <svg
                      className="w-6 h-6 mr-3 text-white/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href="mailto:ceo@71mellofy.com" className="text-white/80 font-inter text-base hover:text-white transition-colors duration-300">
                      ceo@71mellofy.com
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-poppins font-semibold mb-4 text-white">
                  Office Hours
                </h3>
                <div className="p-3 bg-black/40 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300">
                  <p className="text-white/80 font-inter text-base">
                    Monday - Friday: 9:00 AM - 6:00 PM IST
                  </p>
                  <p className="text-white/80 font-inter text-base">
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-poppins font-semibold mb-4 text-white">
                  Connect With Us
                </h3>
                <div className="flex">
                  <a
                    href="https://www.linkedin.com/company/71mellofy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-black/40 rounded-lg border border-white/10 text-white/80 hover:border-white/30 hover:bg-black/60 transition-all duration-300 font-inter text-base"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}