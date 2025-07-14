"use client";
import { motion } from "framer-motion";
import Aurora from "./Aurora";
import WorkflowDiagram from "./WorkflowDiagram";

const steps = [
  {
    number: "01",
    title: "Connect Your Data",
    description:
      "Integrate with your CRM and existing tools to sync your customer data and preferences.",
  },
  {
    number: "02",
    title: "Define Your ICP",
    description:
      "Our AI learns your Ideal Customer Profile and builds targeted prospect lists.",
  },
  {
    number: "03",
    title: "Customize Campaigns",
    description:
      "Set up personalized outreach sequences with custom messaging and timing.",
  },
  {
    number: "04",
    title: "Auto-pilot Mode",
    description:
      "Let AI handle prospecting, outreach, and follow-ups while you focus on closing deals.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <span className="font-montserrat text-sm tracking-ultra uppercase text-white/80">
              The Process
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-normal tracking-elegant text-white font-cormorant mb-4">
            How It Works
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto mb-10"></div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-montserrat tracking-wide leading-relaxed">
            Get started in minutes with our simple four-step process
          </p>
        </motion.div>

        {/* Workflow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <WorkflowDiagram />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-[1px] bg-white/10 transform translate-y-[-50%] z-0" />
              )}

              {/* Step content */}
              <div className="relative z-10 p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative">
                  <div className="font-cormorant text-4xl font-light tracking-wide text-white/80 mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-cormorant font-normal tracking-wide text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="font-montserrat text-sm tracking-wide text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
