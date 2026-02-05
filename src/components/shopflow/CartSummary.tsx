"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, X } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function CartSummary() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useShopStore();

  if (!cart.length) {
    return (
      <Card className="p-8 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--color-muted-foreground)" }} />
        <h3 className="text-lg font-semibold mb-2">Cart is Empty</h3>
        <p style={{ color: "var(--color-muted-foreground)" }}>Start shopping to add items</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
          <h3 className="font-semibold">Cart ({cart.length})</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
      </div>

      <div>
        {cart.map((item) => (
          <motion.div key={item.id} layout className="p-4 flex items-center gap-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
            <div className="w-12 h-12 rounded-lg overflow-hidden" style={{ backgroundColor: "var(--color-muted)" }}>
              <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
              <p style={{ color: "var(--color-primary)" }} className="font-semibold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded" style={{ backgroundColor: "var(--color-muted)" }}><Minus className="w-4 h-4" /></button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded" style={{ backgroundColor: "var(--color-muted)" }}><Plus className="w-4 h-4" /></button>
            </div>
            <p className="font-semibold w-16 text-right">${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart(item.id)} className="p-1" style={{ color: "var(--color-muted-foreground)" }}><X className="w-5 h-5" /></button>
          </motion.div>
        ))}
      </div>

      <div className="p-4" style={{ backgroundColor: "color-mix(in srgb, var(--color-muted) 30%, transparent)" }}>
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
}