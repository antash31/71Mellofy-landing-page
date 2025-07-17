"use client";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import ComingSoon from "@/components/ComingSoon";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <ComingSoon />
      <FAQ />
      <Footer />
    </div>
  );
}
