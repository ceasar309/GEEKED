"use client";

import { IoRemove, IoAdd } from "react-icons/io5";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-neutral-300 dark:border-neutral-600">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-50 transition-colors"
      >
        <IoRemove size={16} />
      </button>
      <span className="px-4 py-2 min-w-[40px] text-center font-medium text-sm">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-50 transition-colors"
      >
        <IoAdd size={16} />
      </button>
    </div>
  );
}
