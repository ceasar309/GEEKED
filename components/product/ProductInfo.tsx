"use client";

import { useState } from "react";
import { ProductType } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import QuantitySelector from "@/components/ui/QuantitySelector";
import Rating from "@/components/ui/Rating";
import Button from "@/components/ui/Button";
import { IoHeart, IoHeartOutline, IoShareSocial } from "react-icons/io5";
import toast from "react-hot-toast";

interface ProductInfoProps {
  product: ProductType;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const sizeArr = product.sizes ? product.sizes.split(",") : [];
  const colorArr = product.colors ? product.colors.split(",") : [];
  const tagArr = product.tags ? product.tags.split(",") : [];
  const [selectedSize, setSelectedSize] = useState<string>(sizeArr[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(colorArr[0] || "");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0]?.url,
    });
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  const discount = product.comparePrice
    ? Math.round(100 - (product.price / product.comparePrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {product.brand && (
        <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">{product.brand}</p>
      )}
      <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

      <div className="flex items-center gap-4">
        <Rating rating={product.rating} />
        <span className="text-sm text-neutral-500">({product.reviewCount} reviews)</span>
      </div>

      {tagArr.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tagArr.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-1 bg-neutral-100 dark:bg-neutral-800 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
        {product.comparePrice && (
          <>
            <span className="text-lg text-neutral-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
            <span className="text-sm text-red-500 font-medium">-{discount}% OFF</span>
          </>
        )}
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {product.description}
      </p>

      {colorArr.length > 0 && (
          <div>
            <p className="text-xs font-medium tracking-wider uppercase mb-2">Color: {selectedColor}</p>
            <div className="flex gap-2">
              {colorArr.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 text-xs border transition-colors ${
                  selectedColor === color
                    ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                    : "border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizeArr.length > 0 && (
          <div>
            <p className="text-xs font-medium tracking-wider uppercase mb-2">Size: {selectedSize}</p>
            <div className="flex flex-wrap gap-2">
              {sizeArr.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 text-xs border transition-colors ${
                  selectedSize === size
                    ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                    : "border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
        <button
          onClick={() => {
            toggleItem(product.id);
            toast.success(isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="w-12 h-12 border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-black dark:hover:border-white transition-colors"
        >
          {isWishlisted(product.id) ? (
            <IoHeart size={18} className="text-red-500" />
          ) : (
            <IoHeartOutline size={18} />
          )}
        </button>
        <button className="w-12 h-12 border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-black dark:hover:border-white transition-colors">
          <IoShareSocial size={18} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleAddToCart} variant="dark" className="flex-1">
          Add to Cart
        </Button>
        <Button onClick={handleBuyNow} className="flex-1">
          Buy Now
        </Button>
      </div>

      <div className="text-xs text-neutral-500 space-y-1 border-t border-neutral-200 dark:border-neutral-700 pt-4">
        <p>Free shipping on orders over $100</p>
        <p>30-day easy return policy</p>
        <p>Secure checkout with Visa, Mastercard, PayPal, M-Pesa</p>
      </div>
    </div>
  );
}
