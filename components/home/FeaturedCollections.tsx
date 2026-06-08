"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Women's Collection",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=90",
    link: "/shop?gender=women",
    subtitle: "Elegance Redefined",
  },
  {
    title: "Men's Collection",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=90",
    link: "/shop?gender=men",
    subtitle: "Modern Sophistication",
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=90",
    link: "/shop",
    subtitle: "The Finishing Touch",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">Collections</p>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.link}
              className="group relative overflow-hidden aspect-[4/5]"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-1">
                  {col.subtitle}
                </p>
                <h3 className="text-white text-xl font-bold">{col.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
