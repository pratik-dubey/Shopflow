"use client";

import React from "react";
import { Star, User, CheckCircle, ThumbsUp, MessageSquare } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { getReviewsForProduct, getAggregatedStats } from "@/data/mockReviews";
import { Card } from "@/components/ui/Card";

interface ReviewCardProps {
  productId?: number;
}

export default function ReviewCard({ productId }: ReviewCardProps) {
  const { products } = useShopStore();
  const product = productId ? products.find((p) => p.id === productId) : products[0];

  if (!product) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--color-muted-foreground)" }} />
        <p style={{ color: "var(--color-muted-foreground)" }}>No product selected</p>
      </Card>
    );
  }

  const reviews = getReviewsForProduct(product.id);
  const stats = getAggregatedStats(reviews);

  return (
    <Card className="overflow-hidden p-0">
      <div className="p-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden" style={{ backgroundColor: "var(--color-muted)" }}>
            <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-2 text-sm mb-1">{product.title}</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(stats.average) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="font-bold">{stats.average}</span>
              <span className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>({stats.total} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="p-4 rounded-xl" style={{ backgroundColor: "color-mix(in srgb, var(--color-muted) 30%, transparent)" }}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)" }}>
                  <User className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{review.author}</span>
                    {review.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                  </div>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
            <h4 className="font-medium text-sm mb-1">{review.title}</h4>
            <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>{review.content}</p>
            <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              <ThumbsUp className="w-3 h-3" />
              <span>{review.helpful} helpful</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}