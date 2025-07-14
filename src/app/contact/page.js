"use client";
import TiltedCard from "@/components/TiltedCard";
import { motion } from "framer-motion";
import Aurora from "@/components/Aurora";

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white py-20 px-4 relative overflow-hidden">
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <span className="font-montserrat text-sm tracking-ultra uppercase text-white/80">
              Contact Us
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-normal tracking-elegant text-white font-cormorant mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-montserrat tracking-wide leading-relaxed">
            Have questions about our AI SDR solution? We're here to help you scale
            your outreach efforts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TiltedCard
              containerHeight="600px"
              containerWidth="100%"
              imageHeight="600px"
              imageWidth="100%"
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              scaleOnHover={1.05}
              rotateAmplitude={10}
              overlayContent={
                <div className="w-full p-8 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-xl rounded-lg border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-lg" />
                  <form className="relative space-y-6">
                    <div>
                      <label className="block text-sm font-montserrat tracking-wide text-white/80 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-montserrat text-sm tracking-wide"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat tracking-wide text-white/80 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-montserrat text-sm tracking-wide"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat tracking-wide text-white/80 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-montserrat text-sm tracking-wide"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat tracking-wide text-white/80 mb-2">
                        Message
                      </label>
                      <textarea
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 h-32 font-montserrat text-sm tracking-wide"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button className="relative overflow-hidden group w-full bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-all duration-300 border border-white/30 hover:border-white">
                      <div className="absolute inset-0 w-3/12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-40 blur-lg group-hover:w-6/12 transition-all duration-300" />
                      <span className="relative font-montserrat text-sm tracking-wide">Send Message</span>
                    </button>
                  </form>
                </div>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TiltedCard
              containerHeight="600px"
              containerWidth="100%"
              imageHeight="600px"
              imageWidth="100%"
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              scaleOnHover={1.05}
              rotateAmplitude={10}
              overlayContent={
                <div className="w-full p-8 space-y-8 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-xl rounded-lg border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-lg" />
                  <div className="relative">
                    <div>
                      <h3 className="text-3xl font-cormorant font-normal tracking-wide mb-4 text-white">
                        Contact Info
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/10 hover:bg-white/20 transition-colors">
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
                          <span className="text-white/80 font-montserrat text-sm tracking-wide">contact@aisdr.com</span>
                        </div>
                        <div className="flex items-center p-3 bg-white/10 rounded-lg border border-white/10 hover:bg-white/20 transition-colors">
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
                          <span className="text-white/80 font-montserrat text-sm tracking-wide">+1 (555) 123-4567</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-3xl font-cormorant font-normal tracking-wide mb-4 text-white">
                        Office Hours
                      </h3>
                      <div className="space-y-2 p-3 bg-white/10 rounded-lg border border-white/10">
                        <p className="text-white/80 font-montserrat text-sm tracking-wide">
                          Monday - Friday: 9:00 AM - 6:00 PM EST
                        </p>
                        <p className="text-white/80 font-montserrat text-sm tracking-wide">Saturday - Sunday: Closed</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-3xl font-cormorant font-normal tracking-wide mb-4 text-white">
                        Follow Us
                      </h3>
                      <div className="flex space-x-4">
                        {["LinkedIn", "Twitter", "Facebook"].map((social) => (
                          <a
                            key={social}
                            href="#"
                            className="px-4 py-2 bg-white/10 rounded-lg border border-white/10 text-white/80 hover:bg-white/20 transition-colors font-montserrat text-sm tracking-wide"
                          >
                            {social}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}