"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, Check, Loader2 } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface CheckoutCardProps {
  productId?: number;
  mode?: "cart" | "checkout";
}

export default function CheckoutCard({ productId, mode = "checkout" }: CheckoutCardProps) {
  const { cart, cartTotal, addToCart, products, clearCart, addNotification } = useShopStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = productId ? products.find((p) => p.id === productId) : null;

  const handleCheckout = async () => {
    if (!cart.length) { addNotification("Cart is empty", "warning"); return; }
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    addNotification("🎉 Order confirmed!", "success");
    clearCart();
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (mode === "cart" && product) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-lg overflow-hidden" style={{ backgroundColor: "var(--color-muted)" }}>
            <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-2 text-sm mb-1">{product.title}</h3>
            <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>${product.price.toFixed(2)}</p>
          </div>
        </div>
        <Button className="w-full" onClick={() => addToCart(product)}>
          <ShoppingCart className="w-5 h-5" />Add to Cart
        </Button>
      </Card>
    );
  }

  if (!cart.length && !showSuccess) {
    return (
      <Card className="p-8 text-center">
        <ShoppingCart className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--color-muted-foreground)" }} />
        <p style={{ color: "var(--color-muted-foreground)" }}>Your cart is empty</p>
      </Card>
    );
  }

  if (showSuccess) {
    return (
      <Card className="p-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
          <Check className="w-8 h-8 text-green-500" />
        </motion.div>
        <h4 className="text-lg font-semibold mb-1">Thank You!</h4>
        <p style={{ color: "var(--color-muted-foreground)" }}>Order placed successfully</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="p-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <h3 className="font-semibold flex items-center gap-2">
          <CreditCard className="w-5 h-5" style={{ color: "var(--color-primary)" }} />Checkout
        </h3>
      </div>

      <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: "color-mix(in srgb, var(--color-muted) 30%, transparent)" }}>
            <div className="w-10 h-10 rounded overflow-hidden" style={{ backgroundColor: "var(--color-background)" }}>
              <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm line-clamp-1">{item.title}</p>
              <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>Qty: {item.quantity}</p>
            </div>
            <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="p-4" style={{ backgroundColor: "color-mix(in srgb, var(--color-muted) 30%, transparent)", borderTop: "1px solid var(--color-border)" }}>
        <div className="flex justify-between mb-2">
          <span style={{ color: "var(--color-muted-foreground)" }}>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span style={{ color: "var(--color-muted-foreground)" }}>Shipping</span>
          <span className="text-green-500">Free</span>
        </div>
        <div className="flex justify-between mb-4 pt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>${cartTotal.toFixed(2)}</span>
        </div>
        <Button className="w-full" onClick={handleCheckout} disabled={isProcessing}>
          {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" />Processing...</> : <><CreditCard className="w-5 h-5" />Complete Purchase</>}
        </Button>
      </div>
    </Card>
  );
}