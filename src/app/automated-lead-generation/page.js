import Link from 'next/link';

export const metadata = {
  title: 'Automated Lead Generation With AI SDR Software',
  description:
    'Automate lead generation with AI that finds, scores, and engages high-intent prospects. Drive more qualified meetings with less manual work.',
  alternates: { canonical: '/automated-lead-generation' },
  openGraph: {
    title: 'Automated Lead Generation With AI SDR Software',
    description:
      'Find, score, and engage high-intent prospects automatically with AI SDR software.',
    url: '/automated-lead-generation',
  },
};

export default function AutomatedLeadGenerationPage() {
  return (
    <main className="w-full bg-black text-white">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
          Automated Lead Generation
        </h1>
        <p className="text-lg text-white/70 mb-8">
          Scale your pipeline with automated lead generation that continuously finds and qualifies ideal buyers.
        </p>
        <Link href="/signup" className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold">
          Start Free Trial
        </Link>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-6">
        <h2 className="text-3xl font-semibold">Key Benefits</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li>Better targeting with AI lead scoring</li>
          <li>More responses with context-aware personalization</li>
          <li>Faster handoffs with automated booking</li>
        </ul>
      </section>
    </main>
  );
}


