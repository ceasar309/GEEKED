"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/store/wishlist";
import { ProductType } from "@/types";
import ProductCard from "@/components/home/ProductCard";

export default function WishlistPage() {
  const { items } = useWishlist();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }
    fetch(`/api/products?ids=${items.join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [items]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">My Wishlist ({items.length})</h2>
      {items.length === 0 ? (
        <div className="text-center py-12 border border-neutral-200 dark:border-neutral-700">
          <p className="text-neutral-500">Your wishlist is empty</p>
          <p className="text-sm text-neutral-400 mt-1">Save your favorite items here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
