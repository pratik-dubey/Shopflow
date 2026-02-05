"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Loader2, Package, GitCompare } from "lucide-react";
import { useShopStore, Product } from "@/store/useShopStore";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface ProductGridProps {
  category?: string;
  limit?: number;
  searchQuery?: string;
}

export default function ProductGrid({ category, limit, searchQuery }: ProductGridProps) {
  const { filteredProducts, isLoading, error } = useProducts();
  const { addToCart, addToComparison, isInComparison } = useShopStore();

  let displayProducts = [...filteredProducts];

  if (category) {
    displayProducts = displayProducts.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    displayProducts = displayProducts.filter(
      (p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  if (limit && limit > 0) displayProducts = displayProducts.slice(0, limit);

  if (isLoading) {
    return (
      <Card className="p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "var(--color-primary)" }} />
        <p style={{ color: "var(--color-muted-foreground)" }}>Loading products...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <Package className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--color-destructive)" }} />
        <p style={{ color: "var(--color-destructive)" }}>{error}</p>
      </Card>
    );
  }

  if (!displayProducts.length) {
    return (
      <Card className="p-8 text-center">
        <Package className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--color-muted-foreground)" }} />
        <p style={{ color: "var(--color-muted-foreground)" }}>No products found</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">{category || "All Products"}</h2>
          <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
            {displayProducts.length} products
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="overflow-hidden h-full">
                <div className="relative h-32 rounded-lg overflow-hidden mb-4" style={{ backgroundColor: "var(--color-muted)" }}>
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4" />
                  <button
                    onClick={() => addToComparison(product)}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                      isInComparison(product.id) ? "bg-[var(--color-accent)] text-white" : "bg-black/50 text-white"
                    }`}
                  >
                    <GitCompare className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-semibold text-sm line-clamp-2 mb-2 min-h-[2.5rem]">{product.title}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.round(product.rating?.rate || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                    ({product.rating?.count})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <Button size="sm" onClick={() => addToCart(product)}>
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}