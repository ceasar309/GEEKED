"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@geeked.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && (session.user as any)?.role === "ADMIN") {
      router.push("/admin");
    }
  }, [status, session, router]);

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
      return;
    }

    toast.success("Welcome back!");
    window.location.href = "/admin";
  };

  if (status === "authenticated" && (session.user as any)?.role === "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-white">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-[0.2em]">GEEKED ADMIN</h1>
          <p className="text-neutral-400 text-sm mt-2">Sign in to manage your store</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-white transition-colors text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-white transition-colors text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black text-sm tracking-wider uppercase font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
