"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  ShoppingBag,
  Menu,
  ShoppingCart,
  ArrowLeft,
  Plus,
  X,
  GitCompare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useShopStore } from "@/store/useShopStore";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Notifications } from "@/components/Notifications";

// Import ShopFlow components for fallback/demo rendering
import ProductGrid from "@/components/shopflow/ProductGrid";
import PriceFilter from "@/components/shopflow/PriceFilter";
import ComparisonTable from "@/components/shopflow/ComparisonTable";
import ReviewCard from "@/components/shopflow/ReviewCard";
import PolicyCard from "@/components/shopflow/PolicyCard";
import CheckoutCard from "@/components/shopflow/CheckoutCard";
import CartSummary from "@/components/shopflow/CartSummary";

const quickPrompts = [
  { label: "Browse All", prompt: "Show me all products", icon: "🛍️" },
  { label: "Under $50", prompt: "Show products under $50", icon: "💰" },
  { label: "Electronics", prompt: "Show me electronics", icon: "📱" },
  { label: "Top Rated", prompt: "Compare top 3 rated products", icon: "⭐" },
  { label: "My Cart", prompt: "Show my cart", icon: "🛒" },
  { label: "Returns", prompt: "What is your return policy?", icon: "📦" },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  component?: React.ReactNode;
}

/**
 * Intent matching for component rendering
 * This simulates what Tambo's AI does - matching user intent to components
 */
function matchIntentToComponent(text: string): { component: React.ReactNode; response: string } {
  const t = text.toLowerCase();

  // Product browsing intents
  if (
    t.includes("product") ||
    t.includes("browse") ||
    t.includes("show me") ||
    t.includes("what do you have") ||
    t.includes("catalog") ||
    t.includes("items") ||
    t.includes("all")
  ) {
    if (t.includes("electronic")) {
      return {
        component: <ProductGrid category="electronics" />,
        response: "Here are our electronics products:",
      };
    }
    if (t.includes("jewel")) {
      return {
        component: <ProductGrid category="jewelery" />,
        response: "Check out our beautiful jewelry collection:",
      };
    }
    if (t.includes("men") && t.includes("cloth")) {
      return {
        component: <ProductGrid category="men's clothing" />,
        response: "Here's our men's clothing selection:",
      };
    }
    if (t.includes("women") && t.includes("cloth")) {
      return {
        component: <ProductGrid category="women's clothing" />,
        response: "Here's our women's clothing collection:",
      };
    }
    return {
      component: <ProductGrid />,
      response: "Here are all our available products:",
    };
  }

  // Price/budget intents
  if (
    t.includes("under") ||
    t.includes("budget") ||
    t.includes("price") ||
    t.includes("$") ||
    t.includes("cheap") ||
    t.includes("afford") ||
    t.includes("less than")
  ) {
    const priceMatch = t.match(/\$?(\d+)/);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : undefined;
    return {
      component: <PriceFilter initialMax={maxPrice} />,
      response: maxPrice
        ? `Let me filter products under $${maxPrice} for you:`
        : "Use the slider to set your budget:",
    };
  }

  // Comparison intents
  if (
    t.includes("compare") ||
    t.includes("top") ||
    t.includes("best") ||
    t.includes("rated") ||
    t.includes("versus") ||
    t.includes("difference")
  ) {
    const countMatch = t.match(/(\d+)/);
    const topCount = countMatch ? parseInt(countMatch[1]) : 3;
    return {
      component: <ComparisonTable showTopRated topCount={topCount} />,
      response: `Here's a comparison of the top ${topCount} rated products:`,
    };
  }

  // Review intents
  if (
    t.includes("review") ||
    t.includes("rating") ||
    t.includes("good") ||
    t.includes("feedback") ||
    t.includes("quality")
  ) {
    return {
      component: <ReviewCard />,
      response: "Here are the reviews for this product:",
    };
  }

  // Policy intents
  if (
    t.includes("return") ||
    t.includes("policy") ||
    t.includes("refund") ||
    t.includes("exchange")
  ) {
    return {
      component: <PolicyCard policyType="returns" />,
      response: "Here's our return policy:",
    };
  }
  if (t.includes("shipping") || t.includes("delivery")) {
    return {
      component: <PolicyCard policyType="shipping" />,
      response: "Here's our shipping information:",
    };
  }
  if (t.includes("warranty") || t.includes("guarantee")) {
    return {
      component: <PolicyCard policyType="warranty" />,
      response: "Here's our warranty coverage:",
    };
  }

  // Cart intents
  if (t.includes("cart") || t.includes("basket") || t.includes("added")) {
    return {
      component: <CartSummary />,
      response: "Here's what's in your cart:",
    };
  }

  // Checkout intents
  if (
    t.includes("checkout") ||
    t.includes("buy") ||
    t.includes("purchase") ||
    t.includes("order")
  ) {
    return {
      component: <CheckoutCard mode="checkout" />,
      response: "Ready to complete your purchase?",
    };
  }

  // Default: show some products
  return {
    component: <ProductGrid limit={6} />,
    response: "Here are some products you might like:",
  };
}

function ChatInterface() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userName, cart, cartTotal, comparisonItems } = useShopStore();

  // Initialize products on mount
  useProducts();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsLoading(true);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Match intent and get component
    const { component, response } = matchIntentToComponent(userInput);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      component,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const { component, response } = matchIntentToComponent(prompt);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      component,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 bottom-0 w-72 z-40 flex flex-col"
            style={{
              backgroundColor: "var(--color-card)",
              borderRight: "1px solid var(--color-border)",
            }}
          >
            {/* Sidebar Header */}
            <div
              className="p-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    }}
                  >
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold">ShopFlow</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg lg:hidden"
                  style={{ backgroundColor: "var(--color-muted)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Button className="w-full" onClick={() => setMessages([])}>
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex-1 p-4 overflow-y-auto">
              <p
                className="text-xs font-medium uppercase tracking-wide mb-3"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                Quick Actions
              </p>
              <div className="space-y-2">
                {quickPrompts.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(item.prompt)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-sm hover:opacity-80"
                    style={{ backgroundColor: "var(--color-muted)" }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div
              className="p-4"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {userName?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{userName || "User"}</p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    Free Plan
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push("/")}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors hover:opacity-80"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-72" : ""
        }`}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-30 backdrop-blur-xl"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-background) 80%, transparent)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg transition-colors"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Sparkles
                  className="w-4 h-4"
                  style={{ color: "var(--color-primary)" }}
                />
                <span
                  className="text-sm hidden sm:inline"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  AI Shopping Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Comparison Badge */}
              <AnimatePresence>
                {comparisonItems.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                      border:
                        "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
                    }}
                  >
                    <GitCompare
                      className="w-4 h-4"
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {comparisonItems.length}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cart Badge */}
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
                }}
                animate={{ scale: cart.length > 0 ? [1, 1.05, 1] : 1 }}
              >
                <ShoppingCart
                  className="w-4 h-4"
                  style={{ color: "var(--color-primary)" }}
                />
                <span className="text-sm font-medium">{cart.length}</span>
                {cartTotal > 0 && (
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ${cartTotal.toFixed(2)}
                  </span>
                )}
              </motion.div>

              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-65px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <ShoppingBag className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">
                  Hey {userName || "there"}! 👋
                </h2>
                <p
                  className="mb-8 max-w-md mx-auto"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  I'm your AI shopping assistant. Tell me what you're looking
                  for and I'll show you exactly what you need!
                </p>

                {/* Quick Action Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {quickPrompts.map((item, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleQuickPrompt(item.prompt)}
                      className="flex items-center gap-3 p-4 glass-card text-left transition-colors hover:opacity-90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Chat Messages */}
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        message.role === "user"
                          ? "var(--color-primary)"
                          : "linear-gradient(135deg, var(--color-accent), var(--color-primary))",
                    }}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={`max-w-[85%] ${
                      message.role === "user" ? "text-right" : ""
                    }`}
                  >
                    {message.role === "user" ? (
                      <div
                        className="inline-block p-4 rounded-2xl rounded-tr-none text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="glass-card rounded-2xl rounded-tl-none p-4">
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {/* Rendered Component */}
                        {message.component && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {message.component}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading State */}
            {isLoading && (
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent), var(--color-primary))",
                  }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="glass-card rounded-2xl rounded-tl-none p-4">
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Finding the perfect UI...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar (when messages exist) */}
          {messages.length > 0 && (
            <motion.div
              className="px-4 pb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickPrompts.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(item.prompt)}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 glass-card rounded-full text-xs transition-colors hover:opacity-80"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div
            className="p-4 backdrop-blur-xl"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-background) 80%, transparent)",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, prices, or policies..."
                className="w-full h-12 px-4 pr-14 rounded-xl transition-all"
                style={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-foreground)",
                }}
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 p-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
            <p
              className="text-center text-xs mt-2"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              Powered by Tambo Generative UI
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Notifications */}
      <Notifications />
    </div>
  );
}

export default function DashboardPage() {
  return <ChatInterface />;
}