"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Banner */}
      <div className="bg-black text-white text-center py-2 px-4 text-sm">
        <span className="text-red-400 font-medium">Launch offer</span>
        <span className="ml-1">Try prebuiltui today and get $50 free credits</span>
      </div>

      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900">ShopFlow</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Products</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Stories</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleGetStarted}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Get started
            </button>
            <button className="px-5 py-2.5 text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Stories</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <button
                onClick={handleGetStarted}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors w-fit"
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-md uppercase">
              NEW
            </span>
            <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors group">
              <span>Try 7 days free trial option</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-tight mb-6">
            The fastest way to go from idea to impact.
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Our platform helps you build, test, and deliver faster — so you can focus on what matters.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#c8ff00] text-gray-900 rounded-full font-semibold hover:bg-[#b8ef00] transition-colors shadow-lg shadow-[#c8ff00]/20"
            >
              Get started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-7 py-3.5 text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
