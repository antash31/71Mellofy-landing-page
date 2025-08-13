import Link from 'next/link';

export const metadata = {
  title: 'Sales Automation Software for B2B Teams',
  description:
    'Sales automation software that streamlines prospecting, outreach, and follow-ups. Improve pipeline velocity and book more meetings with AI.',
  alternates: { canonical: '/sales-automation-software' },
  openGraph: {
    title: 'Sales Automation Software for B2B Teams',
    description:
      'Streamline prospecting, outreach, and follow-ups. Book more meetings with AI.',
    url: '/sales-automation-software',
  },
};

export default function SalesAutomationSoftwarePage() {
  return (
    <main className="w-full bg-black text-white">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
          Sales Automation Software
        </h1>
        <p className="text-lg text-white/70 mb-8">
          Use AI sales automation to eliminate manual tasks, accelerate follow-ups, and personalize at scale.
        </p>
        <Link href="/signup" className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold">
          Start Free Trial
        </Link>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-6">
        <h2 className="text-3xl font-semibold">Everything You Need to Dominate Sales Outreach</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li>End-to-end automation from lead to meeting</li>
          <li>AI-driven personalization and objection handling</li>
          <li>CRM integrations and analytics</li>
        </ul>
      </section>
    </main>
  );
}


