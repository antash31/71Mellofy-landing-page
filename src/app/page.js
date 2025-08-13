import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/components/Hero"), { ssr: true });
const Features = dynamic(() => import("@/components/Features"), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: true });
const Benefits = dynamic(() => import("@/components/Benefits"), { ssr: true });
const SocialProof = dynamic(() => import("@/components/SocialProof"), { ssr: true });
const ComingSoon = dynamic(() => import("@/components/ComingSoon"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const Problem = dynamic(() => import("@/components/Problem"), { ssr: true });
const Solution = dynamic(() => import("@/components/Solution"), { ssr: true });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true });

export const metadata = {
  title: "AI SDR That Books 10X More Meetings While You Sleep",
  description:
    "Automate your entire sales pipeline with AI that prospects, qualifies, and books meetings 24/7. Join 500+ sales teams crushing their quotas.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI SDR That Books 10X More Meetings While You Sleep",
    description:
      "Automate your entire sales pipeline with AI that prospects, qualifies, and books meetings 24/7.",
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <Features />
      <Problem />
      <Solution />
      <HowItWorks />
      <Benefits />
      <SocialProof />
      <ComingSoon />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
