"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/home/ProductCard";
import ProductFilters from "@/components/shop/ProductFilters";
import SortSelect from "@/components/shop/SortSelect";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { ProductType } from "@/types";
import { IoFilter, IoClose } from "react-icons/io5";

export default function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (sort) params.set("sort", sort);
    if (searchQuery) params.set("search", searchQuery);

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length) params.set(key, values.join(","));
    });

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || data || []);
    } catch {
      setProducts([]);
    }
    setLoading(false);
  }, [sort, filters, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) setSearchQuery(search);
    const gender = searchParams.get("gender");
    if (gender) setFilters({ gender: [gender] });
    const sale = searchParams.get("sale");
    if (sale === "true") setFilters({ sale: ["true"] });
    const sortParam = searchParams.get("sort");
    if (sortParam) setSort(sortParam);
  }, [searchParams]);

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Shop</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {loading ? "Loading..." : `${products.length} products`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-sm border border-neutral-300 dark:border-neutral-600 px-3 py-2"
            >
              <IoFilter size={16} />
              Filters
            </button>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="flex gap-8">
          <aside className={`lg:block w-full lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden"}`}>
            <div className="lg:hidden flex items-center justify-between mb-4">
              <span className="font-medium">Filters</span>
              <button onClick={() => setShowFilters(false)}>
                <IoClose size={20} />
              </button>
            </div>
            <ProductFilters onFilterChange={setFilters} />
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm text-neutral-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
