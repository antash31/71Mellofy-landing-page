"use client";
import Link from "next/link";
import Aurora from "./Aurora";

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
      <div className="relative z-10 max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="font-montserrat text-3xl font-normal tracking-wide text-white">
              AI SDR
            </Link>
            
            {/* Contact Information */}
            <div className="flex flex-col items-center space-y-2">
              <a
                href="https://www.linkedin.com/company/71mellofy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <div className="h-8 w-8 bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10 flex items-center justify-center border border-white/10 hover:border-white/30">
                  <span className="font-montserrat text-sm">L</span>
                </div>
                <span className="font-montserrat text-sm">LinkedIn</span>
              </a>
              <a
                href="mailto:ceo@71mellofy.com"
                className="font-montserrat text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                ceo@71mellofy.com
              </a>
              <p className="font-montserrat text-sm text-white/60">
                Gurgaon, India
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/10 w-full">
            <p className="font-montserrat text-sm tracking-wide text-white/60 text-center">
              © {new Date().getFullYear()} AI SDR. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 