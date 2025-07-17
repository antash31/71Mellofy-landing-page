"use client";
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase";
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });

      if (error) throw error;
      setSuccess(true);
      router.push('/signup/success');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to automate your outreach"
      altLink="/login"
      altText="Already have an account? Sign in"
    >
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">Signup successful! Please check your email for confirmation.</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div className="space-y-2">
          <label 
            htmlFor="name" 
            className="block text-sm font-montserrat text-white/80 tracking-wide"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Enter your full name"
            required
          />
        </div>

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
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="block text-sm font-montserrat text-white/80 tracking-wide"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Create a password"
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label 
            htmlFor="confirmPassword" 
            className="block text-sm font-montserrat text-white/80 tracking-wide"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="text-xs text-white/60 font-montserrat tracking-wide">
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-xs text-white/60 font-montserrat tracking-wide text-white/80 hover:text-white underline transition-colors duration-200">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-xs text-white/60 font-montserrat tracking-wide text-white/80 hover:text-white underline transition-colors duration-200">
            Privacy Policy
          </a>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="relative w-full group mt-6"
        >
          <div className="absolute inset-0 bg-white/10 rounded-lg transition-all duration-300 group-hover:bg-white/20" />
          <div className="absolute inset-0 rounded-lg border border-white/30 transition-all duration-300 group-hover:border-white" />
          <div className="relative px-6 py-2.5 text-sm font-montserrat tracking-wide text-white text-center">
            {loading ? 'Creating Account...' : 'Create Account'}
          </div>
        </motion.button>
      </form>
    </AuthLayout>
  );
} 