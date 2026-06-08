"use client";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm bg-transparent border border-neutral-300 dark:border-neutral-600 px-3 py-2 outline-none focus:border-black dark:focus:border-white transition-colors"
    >
      <option value="newest">Newest</option>
      <option value="bestselling">Best Selling</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}
