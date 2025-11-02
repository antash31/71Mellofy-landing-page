"use client";
import Link from "next/link";
import { User2, Home, Mail, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

// Navigation visibility flags
const SHOW_PRICING = false;
const SHOW_LOGIN = true;

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-2 z-300 flex justify-center pointer-events-none h-16">
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
            href="/#why-choose-ai-sdrs"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <Layout size={16} />
            <span>Features</span>
          </Link>
          {SHOW_PRICING && (
            <Link
              href="/pricing"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Pricing
            </Link>
          )}
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <Mail size={16} />
            <span>Contact</span>
          </Link>
        </nav>

        {/* Right section with auth buttons */}
        <div className="flex items-center justify-end gap-3">
          {/* Login Button */}
          {SHOW_LOGIN && (
            <Button asChild variant="ghost" size="sm" className="text-white/90 hover:text-white hover:bg-white/10">
              <Link href="/auth/login">
                Login
              </Link>
            </Button>
          )}

          {/* Get Started Button */}
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/auth/signup">
              Get Started 
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
