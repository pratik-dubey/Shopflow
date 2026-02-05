"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Shield, Truck, ChevronRight, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface PolicyCardProps {
  policyType?: "returns" | "warranty" | "shipping";
}

const policies = {
  returns: { icon: RotateCcw, title: "Return Policy", color: "#3b82f6", summary: "30-day hassle-free returns", details: [{ label: "Window", value: "30 days" }, { label: "Condition", value: "Unused" }, { label: "Refund", value: "5-7 days" }] },
  warranty: { icon: Shield, title: "Warranty", color: "#22c55e", summary: "1-year manufacturer warranty", details: [{ label: "Coverage", value: "1 year" }, { label: "Covers", value: "Defects" }, { label: "Extended", value: "Available" }] },
  shipping: { icon: Truck, title: "Shipping", color: "#a855f7", summary: "Free shipping over $50", details: [{ label: "Standard", value: "5-7 days" }, { label: "Express", value: "2-3 days" }, { label: "Free", value: "Over $50" }] },
};

export default function PolicyCard({ policyType }: PolicyCardProps) {
  const [expanded, setExpanded] = useState<string | null>(policyType || null);
  const displayPolicies = policyType ? { [policyType]: policies[policyType] } : policies;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
        <h2 className="font-semibold">Store Policies</h2>
      </div>

      {Object.entries(displayPolicies).map(([key, policy]) => {
        const Icon = policy.icon;
        const isExpanded = expanded === key;

        return (
          <Card key={key} className="overflow-hidden p-0">
            <button onClick={() => setExpanded(isExpanded ? null : key)} className="w-full p-4 flex items-center justify-between transition-colors hover:opacity-90">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${policy.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: policy.color }} />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">{policy.title}</h3>
                  <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>{policy.summary}</p>
                </div>
              </div>
              <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                <ChevronRight className="w-5 h-5" style={{ color: "var(--color-muted-foreground)" }} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} style={{ overflow: "hidden", borderTop: "1px solid var(--color-border)" }}>
                  <div className="p-4 grid grid-cols-3 gap-3">
                    {policy.details.map((d, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: "color-mix(in srgb, var(--color-muted) 30%, transparent)" }}>
                        <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted-foreground)" }}>{d.label}</p>
                        <p className="font-medium text-sm">{d.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
}