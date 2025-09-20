
"use client";
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const referralSources = [
  { value: "google", label: "Google Search" },
  { value: "social-media", label: "Social Media" },
  { value: "friend-referral", label: "Friend/Colleague Referral" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "blog-article", label: "Blog/Article" },
  { value: "podcast", label: "Podcast" },
  { value: "conference", label: "Conference/Event" },
  { value: "email-marketing", label: "Email Marketing" },
  { value: "online-ad", label: "Online Advertisement" },
  { value: "other", label: "Other" },
]

export function SignupForm({
  className,
  ...props
}) {
  // Add error boundary protection
  if (typeof React === 'undefined' || React === null) {
    console.error('React is not available in SignupForm');
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Loading error. Please refresh the page.</p>
      </div>
    );
  }
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_no: "",
    company_name: "",
    referral_source: "",
    role: "user" // default role
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // List of personal email domains to block
  const personalEmailDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'me.com', 'mac.com', 'live.com', 'msn.com',
    'yandex.com', 'mail.ru', 'protonmail.com', 'tutanota.com',
    'zoho.com', 'fastmail.com', 'gmx.com', 'mail.com',
    'rediffmail.com', 'inbox.com', 'ymail.com', 'rocketmail.com'
  ]

  // Validate if email is a company email
  const isCompanyEmail = (email) => {
    if (!email) return true // Allow empty for real-time validation
    
    const domain = email.toLowerCase().split('@')[1]
    if (!domain) return false
    
    return !personalEmailDomains.includes(domain)
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing and validate email in real-time
    if (name === 'email' && error && error.includes('company email')) {
      setError(null)
    }
  }

  // Handle email/password signup
  const handleEmailSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate company email before proceeding
    if (!isCompanyEmail(formData.email)) {
      setError('Please use your company email address. Personal email addresses (Gmail, Yahoo, Hotmail, etc.) are not allowed.')
      setLoading(false)
      return
    }

    try {
      // Call the PostRegistrations API
      const response = await fetch('https://yofoleesojtwibrcfddx.supabase.co/functions/v1/PostRegistrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZm9sZWVzb2p0d2licmNmZGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NzUwMTYsImV4cCI6MjA2ODI1MTAxNn0.XMKrB0qx0oGzijMeJUegdmYcAB336rkrAiO2mR0cFrA'
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone_no,
          company_name: formData.company_name,
          referral_source: formData.referral_source,
          role: formData.role
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Registration failed with status: ${response.status}`)
      }

      const result = await response.json()
      ('Registration successful:', result)

      setSuccess(true)
      setError(null)
      
      // Reset form after successful registration
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_no: "",
        company_name: "",
        referral_source: "",
        role: "user"
      })
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push('/auth/signup/success')
      }, 1000)
      
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || 'Registration failed. Please try again.')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex flex-col gap-6 font-poppins ${className || ""}`} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-4xl font-light font-poppins">Get Started</h1>
        <p className="text-balance text-sm text-muted-foreground font-poppins">
          Start your journey with us.
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-900/50">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-900/50">
          Account created successfully! Redirecting you to the next steps...
        </div>
      )}

      <form onSubmit={handleEmailSignup} className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input 
              id="first_name" 
              name="first_name" 
              type="text" 
              placeholder="John" 
              value={formData.first_name}
              onChange={handleChange}
              required 
              className="bg-accent"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input 
              id="last_name" 
              name="last_name" 
              type="text" 
              placeholder="Doe" 
              value={formData.last_name}
              onChange={handleChange}
              required 
              className="bg-accent"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Work Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="john@yourcompany.com" 
            value={formData.email}
            onChange={handleChange}
            required 
            className={`bg-accent ${formData.email && !isCompanyEmail(formData.email) ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          />
          {formData.email && !isCompanyEmail(formData.email) && (
            <p className="text-sm text-red-500 mt-1">
              Please use your company email address. Personal emails are not allowed.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            We require a company email address for verification purposes.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Choose a password" 
            value={formData.password}
            onChange={handleChange}
            required 
            className="bg-accent"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone_no">Phone Number</Label>
          <Input 
            id="phone_no" 
            name="phone_no" 
            type="tel" 
            placeholder="Your phone number" 
            value={formData.phone_no}
            onChange={handleChange}
            className="bg-accent"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company_name">Company Name</Label>
          <Input 
            id="company_name" 
            name="company_name" 
            type="text" 
            placeholder="Your company name" 
            value={formData.company_name}
            onChange={handleChange}
            required
            className="bg-accent"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="referral_source">Where did you hear about us?</Label>
          <select
            id="referral_source"
            name="referral_source"
            value={formData.referral_source}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-accent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select an option...</option>
            {referralSources.map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-sm text-muted-foreground">
          By registering, you agree that you have read, understand, and acknowledge our{" "}
          <a href="/privacy" className="text-sm text-primary hover:underline">
            Privacy Policy
          </a>{" "}
          and accept our{" "}
          <a href="/terms" className="text-sm text-primary hover:underline">
            General Terms of Use
          </a>
          .
        </div>
        
        <Button 
          type="submit" 
          className="w-full text-sm" 
          disabled={loading || (formData.email && !isCompanyEmail(formData.email))}
        >
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>



      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="text-sm underline underline-offset-4">
          Sign in
        </a>
      </div>
    </div>
  );
}
