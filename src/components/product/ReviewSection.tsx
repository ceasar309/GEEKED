"use client";

import { useState } from "react";
import Rating from "@/components/ui/Rating";
import Button from "@/components/ui/Button";
import { ReviewType } from "@/types";

interface ReviewSectionProps {
  reviews: ReviewType[];
  productId: string;
}

export default function ReviewSection({ reviews, productId }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setComment("");
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold">Customer Reviews</h3>
        <Button onClick={() => setShowForm(!showForm)} variant="outline" size="sm">
          Write a Review
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 border border-neutral-200 dark:border-neutral-700 space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Your Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)}>
                  <Rating rating={star >= rating ? star : 0} size={24} />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-transparent outline-none focus:border-black dark:focus:border-white transition-colors text-sm resize-none h-28"
          />
          <div className="flex gap-3">
            <Button type="submit" variant="dark" size="sm">Submit Review</Button>
            <Button onClick={() => setShowForm(false)} variant="ghost" size="sm">Cancel</Button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-neutral-500 text-sm">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-medium">
                  {review.user.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="text-sm font-medium">{review.user.name || "Anonymous"}</p>
                  <Rating rating={review.rating} size={12} />
                </div>
                <p className="ml-auto text-xs text-neutral-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              {review.comment && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 ml-11">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
