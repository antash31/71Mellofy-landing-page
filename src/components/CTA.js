"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-indigo-700/20 via-purple-700/20 to-pink-700/20 border-y border-white/10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-white mb-4">
          Start Booking More Meetings Today
        </h2>
        <p className="text-white/80 mb-8 max-w-3xl mx-auto">
          Free trial. No setup fees. Cancel anytime. Join 500+ teams using AI SDR software for automated lead generation and AI sales automation.
        </p>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link href="/signup" className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold">
            Start Free Trial
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


