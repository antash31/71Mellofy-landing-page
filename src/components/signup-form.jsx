
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupForm({
  className,
  ...props
}) {
  return (
    (<form className={cn("flex flex-col gap-6 font-poppins", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-4xl font-light font-poppins">Get Started</h1>
        <p className="text-balance text-sm text-muted-foreground font-poppins">
          Create an account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="full_name">Name</Label>
          <Input id="full_name" name="full_name" type="text" placeholder="Your name" required className="bg-accent"/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Your email" required className="bg-accent"/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="organization_name">Company Name</Label>
          <Input id="organization_name" name="organization_name" type="text" placeholder="Your company name" required className="bg-accent"/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input id="phone_number" name="phone_number" type="tel" placeholder="Your phone number" required className="bg-accent"/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="referral_source">How did you hear about us?</Label>
          <Input id="referral_source" name="referral_source" type="text" placeholder="e.g. Google, LinkedIn, Friend..." required className="bg-accent"/>
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
        
        <Button type="submit" className="w-full text-md">
          Sign up
        </Button>
        <div
          className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full bg-secondary text-secondary-foreground text-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor" />
          </svg>
          Sign up with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/dashboard/login" className="text-sm underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>)
  );
}
