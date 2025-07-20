import "./globals.css";
import Header from "@/components/Header";
import { inter, playfair, montserrat, roboto, poppins, oswald } from "@/fonts/fonts";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = { 
  title: "AI SDR - Intelligent Sales Development",
  description: "AI-powered sales development representative platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${roboto.variable} ${poppins.variable} ${oswald.variable} font-sans antialiased min-h-screen bg-black relative`}
      >
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
