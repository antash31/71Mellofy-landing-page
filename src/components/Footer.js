"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Aurora from "./Aurora";

const footerLinks = {
  Product: [
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Documentation", href: "#" }
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" }
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" }
  ],
  Social: [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" }
  ]
};

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="absolute inset-0 opacity-20">
        <Aurora
          colorStops={["#000000", "#1a1a1a", "#000000"]}
          amplitude={0.3}
          blend={0.8}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-6 lg:py-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Brand section */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="font-montserrat text-3xl font-normal tracking-wide text-white">
              AI SDR
            </Link>
            <p className="font-montserrat text-sm tracking-wide text-white/60 max-w-xs leading-relaxed">
              Revolutionizing sales development with AI-powered automation that works 24/7 to fill your pipeline with qualified leads.
            </p>
            <div className="flex space-x-6">
              {footerLinks.Social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="h-8 w-8 bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10 flex items-center justify-center border border-white/10 hover:border-white/30">
                    <span className="font-montserrat text-sm">{item.name[0]}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Links section */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="font-montserrat text-sm tracking-ultra uppercase text-white/80">
                  Product
                </h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.Product.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="font-montserrat text-sm tracking-wide text-white/60 hover:text-white transition-colors duration-300"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="font-montserrat text-sm tracking-ultra uppercase text-white/80">
                  Company
                </h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.Company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="font-montserrat text-sm tracking-wide text-white/60 hover:text-white transition-colors duration-300"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="font-montserrat text-sm tracking-ultra uppercase text-white/80">
                  Legal
                </h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.Legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="font-montserrat text-sm tracking-wide text-white/60 hover:text-white transition-colors duration-300"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="font-montserrat text-sm tracking-wide text-white/60 text-center">
            © {new Date().getFullYear()} AI SDR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 