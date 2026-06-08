"use client";

import { useEffect, useState, useRef } from "react";
import { ProductType } from "@/types";
import ProductCard from "./ProductCard";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function TrendingProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products?limit=10&sort=bestselling")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || data || []))
      .catch(() => {});
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  if (!products.length) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">Trending Now</p>
            <h2 className="text-3xl md:text-4xl font-bold">Best Sellers</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <IoChevronBack size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <IoChevronForward size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[250px] sm:min-w-[280px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
