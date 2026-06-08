"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed successfully!");
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">Stay Connected</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="text-neutral-500 mb-8 text-sm">
          Subscribe to receive exclusive offers, early access to new drops, and fashion inspiration straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-sm tracking-wider uppercase font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
