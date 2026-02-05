"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Filter, RotateCcw } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { useProducts } from "@/hooks/useProducts";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface PriceFilterProps {
  initialMax?: number;
}

export default function PriceFilter({ initialMax }: PriceFilterProps) {
  const { filteredProducts } = useProducts();
  const { priceRange, setPriceFilter, resetFilters } = useShopStore();
  const [localValue, setLocalValue] = useState(initialMax || priceRange.current);

  useEffect(() => {
    if (initialMax) {
      setPriceFilter(initialMax);
      setLocalValue(initialMax);
    }
  }, [initialMax, setPriceFilter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalValue(value);
    setPriceFilter(value);
  };

  const percentage = ((localValue - priceRange.min) / (priceRange.max - priceRange.min)) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)" }}>
            <Filter className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
          </div>
          <div>
            <h3 className="font-semibold">Price Filter</h3>
            <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>Set your budget</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-center gap-2 rounded-2xl px-6 py-3"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)" }}
        >
          <DollarSign className="w-6 h-6" style={{ color: "var(--color-primary)" }} />
          <span className="text-3xl font-bold" style={{ color: "var(--color-primary)" }}>
            {localValue.toFixed(0)}
          </span>
        </motion.div>
      </div>

      <div className="relative mb-6">
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-muted)" }}>
          <div className="h-full rounded-full" style={{ width: `${percentage}%`, background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }} />
        </div>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={localValue}
          onChange={handleChange}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex justify-between text-sm mb-4" style={{ color: "var(--color-muted-foreground)" }}>
        <span>${priceRange.min}</span>
        <span>${priceRange.max}</span>
      </div>

      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: "color-mix(in srgb, var(--color-muted) 50%, transparent)" }}>
        <span className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>{filteredProducts.length}</span>{" "}
        <span style={{ color: "var(--color-muted-foreground)" }}>products match</span>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {[25, 50, 100, 200].map((price) => (
          <button
            key={price}
            onClick={() => { setLocalValue(price); setPriceFilter(price); }}
            className="py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: Math.abs(localValue - price) < 5 ? "var(--color-primary)" : "var(--color-muted)",
              color: Math.abs(localValue - price) < 5 ? "white" : "inherit",
            }}
          >
            ${price}
          </button>
        ))}
      </div>
    </Card>
  );
}