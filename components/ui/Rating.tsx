"use client";

import { IoStar, IoStarOutline } from "react-icons/io5";

export default function Rating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? (
            <IoStar size={size} className="text-gold" />
          ) : (
            <IoStarOutline size={size} className="text-neutral-300 dark:text-neutral-600" />
          )}
        </span>
      ))}
    </div>
  );
}
