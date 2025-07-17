"use client";
import { motion } from "framer-motion";
import Aurora from "@/components/Aurora";
import BlurText from "@/components/BlurText";

export default function ContactPage() {
  return (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group h-full"
          >
            <div className="absolute inset-0 bg-white/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 group-hover:border-white/20 transition-all duration-300 h-full shadow-[0_0_15px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.2)]">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-semibold text-white/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 font-inter text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter font-semibold text-white/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 font-inter text-base"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter font-semibold text-white/80 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 font-inter text-base"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter font-semibold text-white/80 mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300 h-32 font-inter text-base"
                    placeholder="How can we help you?"
                  />
                </div>
                <button className="btn group relative px-5 py-2.5 text-black text-base transition-all duration-300">
                  <div className="absolute inset-0 bg-white rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 shadow-[0_4px_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]" />
                  <div className="absolute inset-0 rounded-xl bg-white/90 -bottom-1 translate-y-1 group-hover:translate-y-0.5 transition-transform duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.05)]" />
                  <span className="relative z-10 uppercase font-inter font-bold">Send Message</span>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/0 via-black/5 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ transform: "translateX(-100%)" }} />
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group h-full"
          >
            <div className="absolute inset-0 bg-white/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-8 space-y-8 group-hover:border-white/20 transition-all duration-300 h-full shadow-[0_0_15px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.2)]">
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
                    <span className="text-white/80 font-inter text-base">contact@aisdr.com</span>
                  </div>
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-white/80 font-inter text-base">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-poppins font-semibold mb-4 text-white">
                  Office Hours
                </h3>
                <div className="p-3 bg-black/40 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300">
                  <p className="text-white/80 font-inter text-base">
                    Monday - Friday: 9:00 AM - 6:00 PM EST
                  </p>
                  <p className="text-white/80 font-inter text-base">
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-poppins font-semibold mb-4 text-white">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {["LinkedIn", "Twitter", "Facebook"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-4 py-2 bg-black/40 rounded-lg border border-white/10 text-white/80 hover:border-white/30 hover:bg-black/60 transition-all duration-300 font-inter text-base"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}