"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function CartSummary() {
  const { getSubtotal, getTax, getTotal, discount, couponCode, setCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");

  const applyCoupon = () => {
    if (couponInput.toUpperCase() === "GEEKED10") {
      setCoupon("GEEKED10", getSubtotal() * 0.1);
      toast.success("Coupon applied! 10% off");
    } else if (couponInput.toUpperCase() === "WELCOME20") {
      setCoupon("WELCOME20", getSubtotal() * 0.2);
      toast.success("Coupon applied! 20% off");
    } else {
      toast.error("Invalid coupon code");
    }
    setCouponInput("");
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 space-y-4">
      <h3 className="text-lg font-bold">Order Summary</h3>
      <div className="space-y-2 text-sm">
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
          <span className="text-neutral-500">Shipping</span>
          <span>{getSubtotal() >= 100 ? "Free" : formatPrice(10)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Tax (8%)</span>
          <span>{formatPrice(getTax())}</span>
        </div>
        <div className="border-t border-neutral-300 dark:border-neutral-600 pt-2 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatPrice(getTotal() + (getSubtotal() >= 100 ? 0 : 10))}</span>
        </div>
      </div>

      {!couponCode && (
        <div className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Coupon code"
            className="flex-1 px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 outline-none"
            onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
          />
          <button
            onClick={applyCoupon}
            className="px-4 py-2 text-xs tracking-wider uppercase border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      <Button href="/checkout" className="w-full" size="lg">
        Proceed to Checkout
      </Button>
      <Button href="/shop" variant="outline" className="w-full" size="sm">
        Continue Shopping
      </Button>
    </div>
  );
}
