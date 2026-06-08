"use client";

import { IoStar } from "react-icons/io5";

const reviews = [
  {
    name: "Sophia M.",
    text: "Absolutely in love with my purchase! The quality is unmatched and the fit is perfect. GEEKED has become my go-to for premium streetwear.",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    name: "James K.",
    text: "The attention to detail is incredible. Shipping was fast and the packaging felt premium. Definitely a 10/10 experience.",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "Amara L.",
    text: "I've never felt more confident in an outfit. The fabric quality speaks for itself. Worth every penny!",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    name: "David R.",
    text: "The customer service team went above and beyond to help me with sizing. The clothes arrived and they fit perfectly. Will be a returning customer.",
    rating: 5,
    date: "1 month ago",
  },
];

export default function Reviews() {
  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="p-6 border border-neutral-800">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <IoStar key={i} size={16} className="text-gold" />
                ))}
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{review.name}</p>
                <p className="text-xs text-neutral-500">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
