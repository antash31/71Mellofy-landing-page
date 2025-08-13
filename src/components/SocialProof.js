"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { src: "/vercel.svg", alt: "Vercel" },
  { src: "/next.svg", alt: "Next.js" },
  { src: "/globe.svg", alt: "Global Co" },
  { src: "/window.svg", alt: "Window Inc" },
];

const testimonials = [
  {
    name: "Sarah Lee",
    title: "VP Sales, Acme Corp",
    quote:
      "We booked 48% more meetings in 30 days. The AI handles replies better than any SDR playbook we've used.",
  },
  {
    name: "Mark Johnson",
    title: "Head of Growth, NovaTech",
    quote:
      "Automated lead generation turned our outbound from sporadic to predictable. Setup was under an hour.",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-poppins font-semibold text-white text-center mb-12">
          Trusted by 500+ Sales Teams Worldwide
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-16">
          {logos.map((logo, idx) => (
            <Image key={idx} src={logo.src} alt={`${logo.alt} logo`} width={120} height={40} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              <p className="text-white/90 mb-4">“{t.quote}”</p>
              <footer className="text-white/60">{t.name} — {t.title}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}


