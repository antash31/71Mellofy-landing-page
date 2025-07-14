"use client";
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      altLink="/signup"
      altText="Don't have an account? Sign up"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="block text-sm font-montserrat text-white/80 tracking-wide"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label 
              htmlFor="password" 
              className="block text-sm font-montserrat text-white/80 tracking-wide"
            >
              Password
            </label>
            <a 
              href="/forgot-password" 
              className="text-xs font-montserrat text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="relative w-full group"
        >
          <div className="absolute inset-0 bg-white/10 rounded-lg transition-all duration-300 group-hover:bg-white/20" />
          <div className="absolute inset-0 rounded-lg border border-white/30 transition-all duration-300 group-hover:border-white" />
          <div className="relative px-6 py-2.5 text-sm font-montserrat tracking-wide text-white text-center">
            Sign In
          </div>
        </motion.button>
      </form>
    </AuthLayout>
  );
} 