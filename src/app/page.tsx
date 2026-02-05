"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ShoppingBag, MessageSquare, Zap, ArrowRight, Star, Shield, Clock } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Header } from "@/components/header-3";
import { HeroSection } from "@/components/hero-section-1";
import { CTA } from "@/components/ui/call-to-action";
import { MinimalFooter } from "@/components/minimal-footer";


const features = [
  { icon: MessageSquare, title: "Natural Language", description: "Just describe what you want", gradient: "from-blue-500 to-cyan-500" },
  { icon: Zap, title: "Instant UI", description: "AI generates interfaces instantly", gradient: "from-purple-500 to-pink-500" },
  { icon: ShoppingBag, title: "Smart Shopping", description: "Browse, compare, checkout", gradient: "from-orange-500 to-red-500" },
];

export default function LandingPage() {
  const router = useRouter();
  const { setUserName, userName } = useShopStore();
  const [name, setName] = useState(userName);
  const [showInput, setShowInput] = useState(false);

  const handleGetStarted = () => {
    if (showInput && name.trim()) {
      setUserName(name.trim());
      router.push("/dashboard");
    } else {
      setShowInput(true);
    }
  };

  return (
    <div >
      {/* <Header/> */}
      <HeroSection />
      <CTA />
      <MinimalFooter/>
</div>
  );
}