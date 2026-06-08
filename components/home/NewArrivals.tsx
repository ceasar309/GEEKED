"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/types";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

export default function NewArrivals() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=8&sort=newest")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">Fresh Drops</p>
            <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
          </div>
          <Button href="/shop?sort=newest" variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
}
