"use client";

import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { IoClose } from "react-icons/io5";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-6 border-b border-neutral-200 dark:border-neutral-700">
      <Link
        href={`/product/${item.productId}`}
        className="relative w-24 h-32 sm:w-28 sm:h-36 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 overflow-hidden"
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        )}
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <Link
            href={`/product/${item.productId}`}
            className="text-sm font-medium hover:underline truncate"
          >
            {item.name}
          </Link>
          <p className="text-sm font-semibold flex-shrink-0 ml-2">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
        {item.size && (
          <p className="text-xs text-neutral-500 mb-0.5">Size: {item.size}</p>
        )}
        {item.color && (
          <p className="text-xs text-neutral-500 mb-0.5">Color: {item.color}</p>
        )}
        <p className="text-xs text-neutral-500 mb-3">{formatPrice(item.price)} each</p>
        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(qty) => updateQuantity(item.id, qty)}
          />
          <button
            onClick={() => removeItem(item.id)}
            className="text-neutral-400 hover:text-red-500 transition-colors p-1"
          >
            <IoClose size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
