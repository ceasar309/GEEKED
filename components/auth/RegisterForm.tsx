"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } else {
      const data = await res.json();
      toast.error(data.error || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="John Doe"
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Min 8 characters"
        minLength={8}
      />
      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? "Creating account..." : "Create Account"}
      </Button>
      <p className="text-center text-sm text-neutral-500">
        Already have an account?{" "}
        <Link href="/login" className="text-black dark:text-white font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
