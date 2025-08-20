"use client";
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    (<div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10  ">
        <div className="flex justify-center gap-2 md:justify-start font-roboto">
          <a href="https://71mellofy.com" className="flex items-center gap-2 font-medium">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            71Mellofy
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/image.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end justify-center bg-black/40">
          <div className="text-center px-8 pb-16">
             <h2 className="text-3xl xl:text-5xl 2xl:text-8xl font-light text-white leading-tight font-poppins drop-shadow-2xl">
                Build like a team of real SDRs_
              </h2>
          </div>
        </div>
          
      </div>
    </div>)
  );
}
