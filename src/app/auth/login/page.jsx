"use client";
import React, { useState, useEffect } from "react";
import { LoginForm } from "@/components/login-form";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <a href="https://71mellofy.com">
            <Logo />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {isClient ? (
              <LoginForm />
            ) : (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
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
    </div>
  );
}