"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  displayDuration: number;
}

const defaultSlides: Slide[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&q=90",
    title: "NEW SEASON",
    subtitle: "Where Streetwear Meets Luxury",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    displayDuration: 5,
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=90",
    title: "SUMMER COLLECTION",
    subtitle: "Effortless Style for Every Moment",
    buttonText: "Explore",
    buttonLink: "/shop?gender=women",
    displayDuration: 5,
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&q=90",
    title: "URBAN ESSENTIALS",
    subtitle: "Redefining Modern Streetwear",
    buttonText: "Shop Men",
    buttonLink: "/shop?gender=men",
    displayDuration: 5,
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&q=90",
    title: "EXCLUSIVE DROPS",
    subtitle: "Limited Edition Luxury",
    buttonText: "View Collection",
    buttonLink: "/shop?sale=true",
    displayDuration: 5,
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=90",
    title: "ACCESSORIES",
    subtitle: "Complete Your Look",
    buttonText: "Shop Accessories",
    buttonLink: "/shop",
    displayDuration: 5,
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=90",
    title: "GEEKED",
    subtitle: "Premium Fashion for the Modern Icon",
    buttonText: "Discover More",
    buttonLink: "/shop",
    displayDuration: 5,
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  useEffect(() => {
    const duration = slides[current]?.displayDuration || 5;
    intervalRef.current = setInterval(next, duration * 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current, slides, next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen max-h-[900px] min-h-[600px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={s.imageUrl}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
            {slide.subtitle || "GEEKED"}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-[0.05em] mb-6">
            {slide.title}
          </h1>
          <div className="flex items-center justify-center gap-4">
            {slide.buttonText && (
              <Link
                href={slide.buttonLink || "/shop"}
                className="inline-flex items-center px-8 py-3 bg-white text-black text-sm tracking-[0.15em] uppercase font-medium hover:bg-neutral-200 transition-colors"
              >
                {slide.buttonText}
              </Link>
            )}
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-3 border border-white text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-white hover:text-black transition-colors"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
      >
        <IoChevronBack size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/30 transition-colors text-white"
      >
        <IoChevronForward size={20} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 ${
              i === current
                ? "w-8 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
