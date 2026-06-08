"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutForm from "@/components/auth/CheckoutForm";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getSubtotal, getTax, getTotal, discount, couponCode, clearCart } = useCart();
  const [completed, setCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleComplete = (data: any) => {
    setOrderId(data.id || data.orderId);
    setCompleted(true);
    clearCart();
  };

  if (completed) {
    return (
      <>
        <Header />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-neutral-500 mb-2">Thank you for your purchase.</p>
            <p className="text-sm text-neutral-400 mb-6">Order ID: {orderId}</p>
            <button
              onClick={() => router.push("/account/orders")}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm tracking-wider uppercase font-medium"
            >
              View Orders
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-medium mb-4">Your cart is empty</p>
              <button
                onClick={() => router.push("/shop")}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm tracking-wider uppercase font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CheckoutForm onComplete={handleComplete} />
              </div>
              <div>
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 space-y-4 sticky top-24">
                  <h3 className="text-lg font-bold">Order Summary</h3>
                  <div className="space-y-3 text-sm max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-16 bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{item.name}</p>
                          <p className="text-neutral-500">x{item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-neutral-300 dark:border-neutral-600 pt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Subtotal</span>
                      <span>{formatPrice(getSubtotal())}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({couponCode})</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Tax</span>
                      <span>{formatPrice(getTax())}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-neutral-300 dark:border-neutral-600">
                      <span>Total</span>
                      <span>{formatPrice(getTotal())}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
