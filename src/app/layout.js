import "./globals.css";
import Header from "@/components/Header";
import { inter, playfair, montserrat, roboto, poppins, oswald } from "@/fonts/fonts";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.71mellofy.com'),
  title: {
    default: "AI SDR Software That Books 10X More Meetings",
    template: "%s | Mellofy AI SDR",
  },
  description:
    "Automate sales development with AI that prospects, qualifies, and books meetings 24/7. Trusted by 500+ sales teams. Start your free trial in 5 minutes.",
  keywords: [
    "AI SDR software",
    "AI sales automation",
    "automated lead generation",
    "AI sales assistant",
    "sales development automation",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, maxSnippet: -1, maxImagePreview: 'large', maxVideoPreview: -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mellofy AI SDR",
    title: "AI SDR Software That Books 10X More Meetings",
    description:
      "Automate sales development with AI that prospects, qualifies, and books meetings 24/7. Trusted by 500+ sales teams.",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "Mellofy AI SDR software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SDR Software That Books 10X More Meetings",
    description:
      "Automate sales development with AI that prospects, qualifies, and books meetings 24/7. Trusted by 500+ sales teams.",
    images: ["/vercel.svg"],
  },
  icons: { icon: "/favicon.ico" },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${roboto.variable} ${poppins.variable} ${oswald.variable} font-sans antialiased min-h-screen bg-black relative`}
      >
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/globe.svg" />
        {/* Organization & Product Schema */}
        <Script id="org-schema" type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mellofy",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.71mellofy.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.71mellofy.com"}/favicon.ico`,
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mellofy AI SDR",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.71mellofy.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.71mellofy.com"}/search?q={query}`,
                "query-input": "required name=query"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Mellofy AI SDR",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "AI SDR software for automated lead generation, AI sales automation, and meeting booking.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "category": "FreeTrial",
                "availability": "https://schema.org/InStock"
              }
            }
          ])}
        </Script>
        <div className="relative z-1">
          {children}
        </div>
        <div className="relative z-300">
          <Header />
        </div>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    </html>
  );
}
