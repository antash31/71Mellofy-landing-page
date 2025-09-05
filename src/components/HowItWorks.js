"use client";
import { motion } from "framer-motion";
import Aurora from "./Aurora";
import WorkflowDiagram from "./WorkflowDiagram";
import Script from 'next/script';

const steps = [
  {
    number: "01",
    title: "Connect Your Data",
    description:
      "Integrate with your CRM and existing tools to sync your customer data and preferences.",
    icon: "/file.svg",
  },
  {
    number: "02",
    title: "Define Your ICP",
    description:
      "Our AI learns your Ideal Customer Profile and builds targeted prospect lists.",
    icon: "/globe.svg",
  },
  {
    number: "03",
    title: "Customize Campaigns",
    description:
      "Set up personalized outreach sequences with custom messaging and timing.",
    icon: "/window.svg",
  },
  {
    number: "04",
    title: "Auto-pilot Mode",
    description:
      "Let AI handle prospecting, outreach, and follow-ups while you focus on closing deals.",
    icon: "/next.svg",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How It Works",
  "description": "Get started in minutes with our simple four-step process",
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "name": step.title,
    "text": step.description,
    "position": index + 1,
  })),
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6 bg-gradient-to-b from-gray-900 to-black overflow-hidden ">
      <Script id="howto-schema" type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </Script>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Aurora
          colorStops={["#000000", "#1a1a1a", "#000000"]}
          amplitude={0.5}
          blend={0.8}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <span className="text-caption tracking-ultra uppercase text-white/80">
              The Process
            </span>
          </div>
          <h2 className="font-inter text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
            How It Works
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>
          <p className="body-light text-lg md:text-xl text-white/60 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Get started in minutes with our simple four-step process
          </p>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <WorkflowDiagram />
        </motion.div> */}

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-[1px] bg-white/10 transform translate-y-[-50%] z-0" />
              )}

              <div className="relative z-10 p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative flex flex-col flex-grow">
                  <img src={step.icon} alt={`${step.title} icon`} className="w-12 h-12 mb-4" />
                  <div className="font-inter text-4xl font-light tracking-wide text-white/80 mb-6">
                    {step.number}
                  </div>
                  <h3 className="font-inter text-2xl font-normal tracking-wide text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="body-light text-white/60 leading-relaxed mt-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
