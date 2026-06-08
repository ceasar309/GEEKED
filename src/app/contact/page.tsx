"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { IoLocation, IoCall, IoMail, IoTime } from "react-icons/io5";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Have a question or need assistance? We&apos;re here to help. Reach out and our team will respond promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4 p-8 border border-neutral-200 dark:border-neutral-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300 tracking-wide">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                  />
                </div>
                <Button type="submit" variant="dark" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="p-6 border border-neutral-200 dark:border-neutral-700 flex items-start gap-4">
                <IoLocation size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm mb-1">Address</h3>
                  <p className="text-sm text-neutral-500">123 Fashion Avenue<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="p-6 border border-neutral-200 dark:border-neutral-700 flex items-start gap-4">
                <IoCall size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm mb-1">Phone</h3>
                  <p className="text-sm text-neutral-500">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="p-6 border border-neutral-200 dark:border-neutral-700 flex items-start gap-4">
                <IoMail size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm mb-1">Email</h3>
                  <p className="text-sm text-neutral-500">support@geeked.com</p>
                </div>
              </div>
              <div className="p-6 border border-neutral-200 dark:border-neutral-700 flex items-start gap-4">
                <IoTime size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm mb-1">Hours</h3>
                  <p className="text-sm text-neutral-500">Mon - Fri: 9AM - 6PM<br />Sat: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
