import { Inter } from "next/font/google";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "AI SDR - Intelligent Sales Development",
  description: "AI-powered sales development representative platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} ${montserrat.variable} font-sans antialiased min-h-screen bg-black relative`}
      >
        <div className="relative z-1">
          {children}
        </div>
        <div className="relative z-300">
          <Header />
        </div>
      </body>
    </html>
  );
}
