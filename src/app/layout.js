import "./globals.css";
import { inter, playfair, montserrat, roboto, poppins, oswald } from "@/fonts/fonts";
import { ReduxProvider } from "@/store/provider";
import { AuthProvider } from "@/components/AuthProvider";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'sonner';

export const metadata = { 
  title: "AI SDR - Intelligent Sales Development",
  description: "AI-powered sales development representative platform",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${roboto.variable} ${poppins.variable} ${oswald.variable} font-sans antialiased min-h-screen bg-black relative`}
      >
        <ReduxProvider>
            <div className="relative z-1">
              {children}
            </div>
            <Toaster richColors closeButton />
        </ReduxProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    </html>
  );
}
