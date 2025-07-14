"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    quote: "The AI SDR has completely transformed our sales process. We're booking more qualified meetings than ever before, and our sales team can focus on what they do best - closing deals.",
    author: "Sarah Chen",
    role: "VP of Sales",
    company: "TechGrowth Inc."
  },
  {
    quote: "Implementation was seamless, and the results were immediate. Our cost per qualified lead dropped by 60% in the first month while maintaining high quality conversations.",
    author: "Michael Rodriguez",
    role: "Sales Operations Director",
    company: "ScaleUp Solutions"
  },
  {
    quote: "The personalization capabilities are mind-blowing. Our prospects often can't tell they're interacting with an AI, and our response rates have skyrocketed.",
    author: "Emily Thompson",
    role: "Head of Revenue",
    company: "DataFlow Systems"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-30 animate-gradient" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See how companies are transforming their sales process with AI SDR
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <blockquote className="text-xl md:text-2xl text-gray-300 mb-8">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <div className="font-semibold text-white text-lg mb-1">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-indigo-400 mb-1">
                  {testimonials[activeIndex].role}
                </div>
                <div className="text-gray-500">
                  {testimonials[activeIndex].company}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-indigo-500 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 