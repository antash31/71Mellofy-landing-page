
"use client";
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/utils/supabase"

export function SignupForm({
  className,
  ...props
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_no: "",
    role: "user" // default role
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle email/password signup
  const handleEmailSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_no: formData.phone_no,
            role: formData.role
          }
        }
      })

      if (authError) throw authError

      // Create profile record in the profiles table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id, // This will match auth.uid()
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone_no: formData.phone_no,
            role: formData.role,
            client_id: null // Set to null for now, can be updated later
          }])

        if (profileError) {
          console.warn('Profile creation failed:', profileError)
          // Don't throw error as user account is already created
        }
      }

      setSuccess(true)
      setError(null)
      // Show success message instead of navigation
    } catch (error) {
      setError(error.message)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  // Handle Google OAuth signup
  const handleGoogleSignup = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) throw error
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6 font-poppins", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-4xl font-light font-poppins">Get Started</h1>
        <p className="text-balance text-sm text-muted-foreground font-poppins">
          Create an account
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-900/50">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-900/50">
          Account created successfully! Please check your email to verify your account.
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
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="john@example.com" 
            value={formData.email}
            onChange={handleChange}
            required 
            className="bg-accent"
          />
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
        
        <Button type="submit" className="w-full text-md" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <Button 
        variant="outline" 
        className="w-full bg-secondary text-secondary-foreground text-md"
        onClick={handleGoogleSignup}
        disabled={loading}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4" />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853" />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05" />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335" />
        </svg>
        {loading ? "Connecting..." : "Sign up with Google"}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/dashboard/login" className="text-sm underline underline-offset-4">
          Sign in
        </a>
      </div>
    </div>
  );
}
