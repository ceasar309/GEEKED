"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ReviewSection from "@/components/product/ReviewSection";
import ProductCard from "@/components/home/ProductCard";
import { ProductType, ReviewType } from "@/types";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [related, setRelated] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product || data);
        setReviews(data.reviews || []);
        setRelated(data.related || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
            <div className="h-96 bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 w-1/2" />
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 w-1/3" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <p className="text-lg">Product not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductImageGallery images={product.images} name={product.name} />
            <ProductInfo product={product} />
          </div>

          <ReviewSection reviews={reviews} productId={product.id} />

          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold mb-6">You May Also Like</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
