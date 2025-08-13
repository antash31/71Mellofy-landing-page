"use client";
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
export const metadata = {
  title: "Start Free Trial | Mellofy AI SDR",
  description: "Register in minutes and start booking more meetings with AI SDR software.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Start Free Trial | Mellofy AI SDR",
    description: "Get started with AI sales automation in minutes.",
    url: "/signup",
  },
};

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    organization_name: "",
    phone_number: "",
    referral_source: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission and add registration to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("registrations")
        .insert([formData]);
      if (error) throw error;
      setSuccess(true);
      router.push("/signup/success");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Register Now"
      subtitle="Join us to automate your outreach"
      altLink="/login"
      altText="Already have an account? Sign in"
    >
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm mb-4">
          Registration successful! We will get in touch with you soon.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="full_name"
            className="block text-sm font-montserrat text-white/80 tracking-wide"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
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

        {/* Organization Name */}
        <div className="space-y-2">
          <label
            htmlFor="organization_name"
            className="block text-sm font-montserrat text-white/80 tracking-wide"
          >
            Company / Organization Name
          </label>
          <input
            type="text"
            id="organization_name"
            name="organization_name"
            value={formData.organization_name}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Enter your company or organization name"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label
            htmlFor="phone_number"
            className="block text-sm font-montserrat text-white/80 tracking-wide"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Referral Source */}
        <div className="space-y-2">
          <label
            htmlFor="referral_source"
            className="block text-sm font-montserrat text-white/80 tracking-wide"
          >
            How did you hear about us?
          </label>
          <input
            type="text"
            id="referral_source"
            name="referral_source"
            value={formData.referral_source}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors duration-200 font-montserrat text-sm tracking-wide"
            placeholder="e.g. Google, LinkedIn, Friend..."
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="text-xs text-white/60 font-montserrat tracking-wide">
          By registering, you agree to our{" "}
          <a
            href="/terms"
            className="text-xs text-white/60 font-montserrat tracking-wide text-white/80 hover:text-white underline transition-colors duration-200"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-xs text-white/60 font-montserrat tracking-wide text-white/80 hover:text-white underline transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </div>

        {/* Register Button */}
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
            {loading ? "Registering..." : "Register Now"}
          </div>
        </motion.button>
      </form>
    </AuthLayout>
  );
}
