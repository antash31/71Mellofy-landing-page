import dynamic from 'next/dynamic';
import Link from 'next/link';

export const metadata = {
  title: 'AI SDR Automation: Scale Outreach With an AI Sales Assistant',
  description:
    'Learn how AI SDR automation replaces manual prospecting with automated lead generation, qualification, and meeting booking. See benefits and get started.',
  alternates: { canonical: '/ai-sdr-automation' },
  openGraph: {
    title: 'AI SDR Automation: Scale Outreach With an AI Sales Assistant',
    description:
      'Replace manual prospecting with automated lead generation, qualification, and booking.',
    url: '/ai-sdr-automation',
  },
};

const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function AISDRAutomationPage() {
  return (
    <main className="w-full bg-black text-white">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
          AI SDR Automation
        </h1>
        <p className="text-lg text-white/70 mb-8">
          Automate sales development with AI that prospects, qualifies, and books meetings 24/7. Discover how teams use AI SDR software to scale outreach without hiring.
        </p>
        <Link href="/signup" className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold">
          Start Free Trial
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 space-y-6">
        <h2 className="text-3xl font-semibold">Why Automate SDR Work?</h2>
        <p className="text-white/80">
          Manual prospecting kills productivity. AI sales automation continuously identifies high-intent leads, personalizes outreach, and handles replies, so your team focuses on closing.
        </p>
        <h3 className="text-2xl font-semibold">Core Capabilities</h3>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li>Automated lead generation and AI lead scoring</li>
          <li>Personalized multi-touch outreach</li>
          <li>Response handling and meeting booking</li>
        </ul>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}


