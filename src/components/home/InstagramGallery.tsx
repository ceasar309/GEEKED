"use client";

import Image from "next/image";
import { IoLogoInstagram } from "react-icons/io5";

const images = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
];

export default function InstagramGallery() {
  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">Follow Us</p>
        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
          <IoLogoInstagram size={28} /> @GEEKED
        </h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 max-w-7xl mx-auto">
        {images.map((src, i) => (
          <a
            key={i}
            href="#"
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={src}
              alt={`Instagram ${i + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <IoLogoInstagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
