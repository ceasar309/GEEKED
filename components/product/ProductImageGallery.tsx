"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: { url: string; alt?: string | null }[];
  name: string;
}

export default function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800 group cursor-crosshair">
          <Image
            src={images[selected]?.url || "/images/placeholder.jpg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 col-span-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-20 h-20 overflow-hidden border-2 transition-colors ${
                i === selected
                  ? "border-black dark:border-white"
                  : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-600"
              }`}
            >
              <Image
                src={img.url}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
