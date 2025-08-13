"use client";
import Link from "next/link";
import { User2, Home, Mail } from "lucide-react";
import Logo from "./Logo";

// Navigation visibility flags
const SHOW_PRICING = false;
const SHOW_LOGIN = false;

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-2 z-300 flex justify-center pointer-events-none">
      <div className="pointer-events-auto mx-4 flex w-full max-w-7xl items-center justify-between rounded-2xl bg-black/90 px-6 py-3 shadow-xl ring-1 ring-white/10 backdrop-blur">
        {/* Left section with fixed width */}
        <div className="w-[140px]">
          <Link
            href="/"
            className="group flex items-center gap-2 transition duration-300"
          >
            <Logo />
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center justify-center space-x-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <Home size={16} />
            <span>Home</span>
          </Link>
          <Link
            href="/ai-sdr-automation"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            AI SDR Automation
          </Link>
          <Link
            href="/sales-automation-software"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Sales Automation Software
          </Link>
          <Link
            href="/automated-lead-generation"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Lead Generation
          </Link>
          <Link
            href="/pricing"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <Mail size={16} />
            <span>Contact</span>
          </Link>
        </nav>

        {/* Right section with auth buttons */}
        <div className="w-[240px] flex items-center justify-end gap-3">
          {/* Login Button */}
          {SHOW_LOGIN && (
            <Link
              href="/login"
              className="px-4 py-2 text-caption text-white/90 hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              Log In
            </Link>
          )}

          {/* Sign Up Button */}
          <Link href="/signup" className="group relative px-4 py-2">
            {/* Button background and effects */}
            <div className="absolute inset-0 bg-white/10 rounded-lg transition-all duration-300 group-hover:bg-white/20" />
            <div className="absolute inset-0 rounded-lg border border-white/30 transition-all duration-300 group-hover:border-white group-hover:scale-105" />

            {/* Gradient line at the bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Button text */}
            <span className="relative text-caption text-white whitespace-nowrap">
              Register Now
            </span>
          </Link>

          {/* Account Icon */}
          {/* <div className="h-8 w-[1px] bg-white/10 mx-1" />
            <Link
            href="/account"
            className="grid h-10 w-10 place-content-center rounded-md border border-white/30 text-gray-200 transition-all duration-300 hover:border-white hover:text-white hover:scale-105"
           >
            <User2 size={20} strokeWidth={1.5} />
            </Link> */}
        </div>
      </div>
    </header>
  );
}
