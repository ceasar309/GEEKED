"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password reset link sent to your email");
    setSent(true);
  };

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            <p className="text-sm text-neutral-500">Enter your email and we&apos;ll send you a reset link</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 p-8 border border-neutral-200 dark:border-neutral-700">
            {sent ? (
              <div className="text-center">
                <p className="text-sm text-neutral-500 mb-4">Check your email for the reset link.</p>
                <Button href="/login" variant="outline" size="sm">Back to Login</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
                <Button type="submit" className="w-full" size="lg">
                  Send Reset Link
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
