"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, GitCompare, Trophy, X } from "lucide-react";
import { useShopStore, Product } from "@/store/useShopStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ComparisonTableProps {
  showTopRated?: boolean;
  topCount?: number;
}

export default function ComparisonTable({ showTopRated = false, topCount = 3 }: ComparisonTableProps) {
  const { comparisonItems, products, addToCart, removeFromComparison, clearComparison } = useShopStore();

  let displayProducts: Product[] = showTopRated
    ? [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)).slice(0, topCount)
    : comparisonItems;

  if (!displayProducts.length) {
    return (
      <Card className="p-8 text-center">
        <GitCompare className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--color-muted-foreground)" }} />
        <h3 className="text-lg font-semibold mb-2">No Products to Compare</h3>
        <p style={{ color: "var(--color-muted-foreground)" }}>Select products to compare</p>
      </Card>
    );
  }

  const bestPrice = Math.min(...displayProducts.map((p) => p.price));
  const bestRating = Math.max(...displayProducts.map((p) => p.rating?.rate || 0));

  return (
    <Card className="overflow-hidden p-0">
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" }}>
            {showTopRated ? <Trophy className="w-5 h-5 text-yellow-500" /> : <GitCompare className="w-5 h-5" style={{ color: "var(--color-accent)" }} />}
          </div>
          <div>
            <h3 className="font-semibold">{showTopRated ? `Top ${topCount} Rated` : "Comparison"}</h3>
            <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>{displayProducts.length} products</p>
          </div>
        </div>
        {!showTopRated && <Button variant="ghost" size="sm" onClick={clearComparison}>Clear</Button>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <th className="p-4 text-left font-medium w-24" style={{ color: "var(--color-muted-foreground)" }}>Feature</th>
              {displayProducts.map((p) => (
                <th key={p.id} className="p-4 text-center min-w-[140px]">
                  <div className="relative">
                    {!showTopRated && (
                      <button onClick={() => removeFromComparison(p.id)} className="absolute -top-1 -right-1 p-1 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--color-destructive) 20%, transparent)" }}>
                        <X className="w-3 h-3" style={{ color: "var(--color-destructive)" }} />
                      </button>
                    )}
                    <div className="h-16 rounded-lg mb-2" style={{ backgroundColor: "var(--color-muted)" }}>
                      <img src={p.image} alt={p.title} className="w-full h-full object-contain p-2" />
                    </div>
                    <p className="text-xs font-medium line-clamp-2">{p.title}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td className="p-4" style={{ color: "var(--color-muted-foreground)" }}>💰 Price</td>
              {displayProducts.map((p) => (
                <td key={p.id} className="p-4 text-center">
                  <span style={{ color: p.price === bestPrice ? "#22c55e" : "inherit", fontWeight: p.price === bestPrice ? 600 : 400 }}>
                    ${p.price.toFixed(2)}
                    {p.price === bestPrice && <span className="ml-1 text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>Best</span>}
                  </span>
                </td>
              ))}
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td className="p-4" style={{ color: "var(--color-muted-foreground)" }}>⭐ Rating</td>
              {displayProducts.map((p) => (
                <td key={p.id} className="p-4 text-center">
                  <span style={{ color: p.rating?.rate === bestRating ? "#22c55e" : "inherit", fontWeight: p.rating?.rate === bestRating ? 600 : 400 }}>
                    {p.rating?.rate?.toFixed(1)}
                    {p.rating?.rate === bestRating && <span className="ml-1 text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>Best</span>}
                  </span>
                </td>
              ))}
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td className="p-4" style={{ color: "var(--color-muted-foreground)" }}>🏷️ Category</td>
              {displayProducts.map((p) => <td key={p.id} className="p-4 text-center text-sm capitalize">{p.category}</td>)}
            </tr>
            <tr>
              <td className="p-4" style={{ color: "var(--color-muted-foreground)" }}>🛒 Action</td>
              {displayProducts.map((p) => (
                <td key={p.id} className="p-4 text-center">
                  <Button size="sm" onClick={() => addToCart(p)}><ShoppingCart className="w-4 h-4" />Add</Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}