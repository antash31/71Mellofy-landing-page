"use client";
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"

export function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")  
  const { loading, error, success, handleEmailLogin } = useAuth();
  
  return (
    <div className={cn("flex flex-col gap-6 font-poppins", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-light font-poppins">Welcome Back</h1>
        <p className="text-balance text-md text-muted-foreground font-poppins">
          Sign in to your account
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-900/50">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-900/50">
          Login successful! Welcome back.
        </div>
      )}

      <form onSubmit={(e) => handleEmailLogin(e, email, password)} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="bg-accent"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="bg-accent"
          />
        </div>
        <Button type="submit" className="w-full text-md bg-primary text-primary-foreground font-poppins" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>

      <div className="text-sm text-center">
        Don&apos;t have an account?{" "}
        <a href="/auth/signup" className="text-sm font-roboto underline underline-offset-4">
          Sign up
        </a>
      </div>
    </div>
  );
}
