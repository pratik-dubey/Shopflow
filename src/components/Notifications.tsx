"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";

export function Notifications() {
  const { notifications, removeNotification } = useShopStore();

  const icons = { success: CheckCircle, error: AlertCircle, warning: AlertTriangle, info: Info };
  const colors = {
    success: "border-green-500/30 bg-green-500/10",
    error: "border-red-500/30 bg-red-500/10",
    warning: "border-yellow-500/30 bg-yellow-500/10",
    info: "border-blue-500/30 bg-blue-500/10",
  };
  const iconColors = { success: "text-green-500", error: "text-red-500", warning: "text-yellow-500", info: "text-blue-500" };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = icons[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-xl ${colors[n.type]}`}
            >
              <Icon className={`w-5 h-5 ${iconColors[n.type]}`} />
              <p className="text-sm">{n.message}</p>
              <button onClick={() => removeNotification(n.id)} className="p-1 hover:opacity-70">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}