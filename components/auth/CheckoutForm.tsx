"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  onComplete: (data: any) => void;
}

export default function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);
  const { getTotal, items } = useCart();

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items,
          paymentMethod,
          total: getTotal(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onComplete(data);
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order");
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const paymentMethods = [
    { id: "stripe", label: "Stripe", icon: "💳" },
    { id: "visa", label: "Visa", icon: "💳" },
    { id: "mastercard", label: "Mastercard", icon: "💳" },
    { id: "paypal", label: "PayPal", icon: "📧" },
    { id: "mpesa", label: "M-Pesa", icon: "📱" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="Address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              required
            />
          </div>
          <Input
            label="City"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            required
          />
          <Input
            label="State"
            value={form.state}
            onChange={(e) => updateField("state", e.target.value)}
            required
          />
          <Input
            label="ZIP Code"
            value={form.zip}
            onChange={(e) => updateField("zip", e.target.value)}
            required
          />
          <Input
            label="Country"
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Payment Method</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 border text-center transition-colors ${
                paymentMethod === method.id
                  ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                  : "border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white"
              }`}
            >
              <span className="text-lg block mb-1">{method.icon}</span>
              <span className="text-xs tracking-wider">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? "Processing..." : `Place Order`}
      </Button>
    </form>
  );
}
