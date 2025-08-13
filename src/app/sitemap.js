export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.71mellofy.com';
  const routes = ['', '/ai-sdr-automation', '/sales-automation-software', '/automated-lead-generation', '/pricing', '/contact', '/signup'];
  const now = new Date().toISOString();
  return routes.map((route) => ({
    url: `${base}${route || '/'}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.7,
  }));
}


