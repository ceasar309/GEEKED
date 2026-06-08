"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid email or password");
      setLoading(false);
    } else {
      const session = await getSession();
      const role = (session?.user as any)?.role;
      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/account/dashboard");
      }
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="••••••••"
      />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-black" />
          <span className="text-neutral-500">Remember me</span>
        </label>
        <Link href="/forgot-password" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      <p className="text-center text-sm text-neutral-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-black dark:text-white font-medium hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
