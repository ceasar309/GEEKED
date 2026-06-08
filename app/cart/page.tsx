"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/store/cart";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items } = useCart();

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-medium mb-4">Your cart is empty</p>
              <Button href="/shop">Continue Shopping</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
              <div>
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
