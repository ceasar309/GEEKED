"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { IoHeart, IoHeartOutline, IoBagAdd } from "react-icons/io5";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: ProductType }) {
  const { isWishlisted, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]?.url,
    });
    toast.success("Added to cart");
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-3">
        <Image
          src={product.images[0]?.url || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-black text-white text-[10px] px-2 py-1 tracking-wider uppercase">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-1 tracking-wider uppercase">
            Sale
          </span>
        )}
        {product.comparePrice && (
          <span className="absolute top-3 right-3 bg-gold text-black text-[10px] px-2 py-1 tracking-wider uppercase font-bold">
            -{Math.round(100 - (product.price / product.comparePrice) * 100)}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product.id);
            toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
        >
          {wishlisted ? (
            <IoHeart size={16} className="text-red-500" />
          ) : (
            <IoHeartOutline size={16} />
          )}
        </button>
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-black/80 dark:bg-white/80 text-white dark:text-black py-3 text-xs tracking-wider uppercase font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
        >
          <IoBagAdd size={16} />
          Add to Cart
        </button>
      </div>
      <h3 className="text-sm font-medium truncate">{product.name}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
        {product.comparePrice && (
          <span className="text-xs text-neutral-400 line-through">
            {formatPrice(product.comparePrice)}
          </span>
        )}
      </div>
    </Link>
  );
}
