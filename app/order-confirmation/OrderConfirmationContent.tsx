"use client";

import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center py-12">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-neutral-500 mb-1">Thank you for your purchase.</p>
        {orderId && (
          <p className="text-sm text-neutral-400 mb-6">Order ID: {orderId}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/account/orders">View Orders</Button>
          <Button href="/shop" variant="outline">Continue Shopping</Button>
        </div>
      </div>
    </div>
  );
}
