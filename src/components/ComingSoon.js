"use client";
import { motion } from "framer-motion";
import Link from 'next/link';

const teasers = [
  {
    title: "AI-Powered Cold Calling",
    description:
      "Imagine an AI that listens to your calls, suggests perfect responses, and handles objections better than your top SDR.",
    icon: "📞",
  },
  {
    title: "Automated Social Selling",
    description:
      "Picture automated LinkedIn outreach that feels personal, builds relationships, and converts 4x better than cold email.",
    icon: "💼",
  },
  {
    title: "Multi-Channel Orchestration",
    description:
      "Envision one platform orchestrating email, calls, and social touches in perfect harmony for a seamless customer journey.",
    icon: "🎶",
  },
];

export default function ComingSoon() {
  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <span className="font-inter text-sm tracking-ultra uppercase text-white/80">
              The Future is Coming
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-poppins font-semibold tracking-tight text-white mb-4">
            Beyond Email
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>
          <p className="text-lg text-white/60 max-w-3xl mx-auto font-inter tracking-normal leading-relaxed">
            Why limit your AI SDR to email? The future of sales development is
            omnichannel, and we're building it now. Join thousands of companies
            preparing for the AI-powered sales revolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teasers.map((teaser, index) => (
            <motion.div
              key={teaser.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 h-full flex flex-col group"
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/50 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                Coming Soon
              </div>
              <div className="text-4xl mb-6">{teaser.icon}</div>
              <h3 className="text-2xl font-poppins font-semibold tracking-tight text-white mb-4">
                {teaser.title}
              </h3>
              <p className="font-inter text-base tracking-normal text-white/70 leading-relaxed flex-grow">
                {teaser.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link href="/auth/signup">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg px-8 py-4 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105">
              Request a Demo
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
