// import { ApiKeyCheck } from "@/components/ApiKeyCheck";
// import Image from "next/image";

// const KeyFilesSection = () => (
//   <div className="bg-white px-8 py-4">
//     <h2 className="text-xl font-semibold mb-4">How it works:</h2>
//     <ul className="space-y-4 text-gray-600">
//       <li className="flex items-start gap-2">
//         <span>📄</span>
//         <span>
//           <code className="font-medium">src/app/layout.tsx</code> - Main layout
//           with TamboProvider
//         </span>
//       </li>
//       <li className="flex items-start gap-2">
//         <span>📄</span>
//         <span>
//           <code className="font-medium font-mono">src/app/chat/page.tsx</code> -
//           Chat page with TamboProvider and MCP integration
//         </span>
//       </li>
//       <li className="flex items-start gap-2">
//         <span>📄</span>
//         <span>
//           <code className="font-medium font-mono">
//             src/app/interactables/page.tsx
//           </code>{" "}
//           - Interactive demo page with tools and components
//         </span>
//       </li>
//       <li className="flex items-start gap-2">
//         <span>📄</span>
//         <span>
//           <code className="font-medium font-mono">
//             src/components/tambo/message-thread-full.tsx
//           </code>{" "}
//           - Chat UI
//         </span>
//       </li>
//       <li className="flex items-start gap-2">
//         <span>📄</span>
//         <span>
//           <code className="font-medium font-mono">
//             src/components/tambo/graph.tsx
//           </code>{" "}
//           - A generative graph component
//         </span>
//       </li>
//       <li className="flex items-start gap-2">
//         <span>📄</span>
//         <span>
//           <code className="font-medium font-mono">
//             src/services/population-stats.ts
//           </code>{" "}
//           - Example tool implementation with mock population data
//         </span>
//       </li>
//       <li className="flex items-start gap-2">
//         <span className="text-blue-500">📄</span>
//         <span>
//           <code className="font-medium font-mono">src/lib/tambo.ts</code> -
//           Component and tool registration
//         </span>
//       </li>
//       <li className="flex items-start gap-2">
//         <span className="text-blue-500">📄</span>
//         <span>
//           <code className="font-medium font-mono">README.md</code> - For more
//           details check out the README
//         </span>
//       </li>
//     </ul>
//     <div className="flex gap-4 flex-wrap mt-4">
//       <a
//         href="https://docs.tambo.co"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="px-6 py-3 rounded-md font-medium transition-colors text-lg mt-4 border border-gray-300 hover:bg-gray-50"
//       >
//         View Docs
//       </a>
//       <a
//         href="https://tambo.co/dashboard"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="px-6 py-3 rounded-md font-medium transition-colors text-lg mt-4 border border-gray-300 hover:bg-gray-50"
//       >
//         Dashboard
//       </a>
//     </div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="min-h-screen p-8 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
//       <main className="max-w-2xl w-full space-y-8">
//         <div className="flex flex-col items-center">
//           <a href="https://tambo.co" target="_blank" rel="noopener noreferrer">
//             <Image
//               src="/Octo-Icon.svg"
//               alt="Tambo AI Logo"
//               width={80}
//               height={80}
//               className="mb-4"
//             />
//           </a>
//           <h1 className="text-4xl text-center">tambo-ai chat template</h1>
//         </div>

//         <div className="w-full space-y-8">
//           <div className="bg-white px-8 py-4">
//             <h2 className="text-xl font-semibold mb-4">Setup Checklist</h2>
//             <ApiKeyCheck>
//               <div className="flex gap-4 flex-wrap">
//                 <a
//                   href="/chat"
//                   className="px-6 py-3 rounded-md font-medium shadow-sm transition-colors text-lg mt-4 bg-[#7FFFC3] hover:bg-[#72e6b0] text-gray-800"
//                 >
//                   Go to Chat →
//                 </a>
//                 <a
//                   href="/interactables"
//                   className="px-6 py-3 rounded-md font-medium shadow-sm transition-colors text-lg mt-4 bg-[#FFE17F] hover:bg-[#f5d570] text-gray-800"
//                 >
//                   Interactables Demo →
//                 </a>
//               </div>
//             </ApiKeyCheck>
//           </div>

//           <KeyFilesSection />
//         </div>
//       </main>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ShoppingBag, MessageSquare, Zap, ArrowRight, Star, Shield, Clock } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
    <div className="min-h-screen animated-gradient">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl neon-glow" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))" }}>
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">ShopFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="secondary" size="sm" onClick={() => setShowInput(true)}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <Sparkles className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
              <span className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>Powered by Tambo AI</span>
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 20%, transparent)", color: "var(--color-primary)" }}>Hackathon</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Shopping that<br /><span className="gradient-text">adapts to you</span>
            </h1>

            <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--color-muted-foreground)" }}>
              Describe what you want in natural language. Watch the perfect UI appear instantly. Shop smarter.
            </p>

            <div className="pt-4">
              {!showInput ? (
                <Button size="lg" onClick={() => setShowInput(true)}>
                  Start Shopping <ArrowRight className="w-5 h-5" />
                </Button>
              ) : (
                <motion.div className="inline-flex flex-col sm:flex-row items-center gap-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name..." className="w-72" autoFocus onKeyDown={(e) => e.key === "Enter" && handleGetStarted()} />
                  <Button size="lg" onClick={handleGetStarted} disabled={!name.trim()}>Let's Go <ArrowRight className="w-5 h-5" /></Button>
                </motion.div>
              )}
            </div>

            <motion.div className="flex flex-wrap items-center justify-center gap-8 pt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              {[{ value: "70%", label: "Less Friction" }, { value: "3x", label: "Faster" }, { value: "100%", label: "Natural" }].map((stat, i) => (
                <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1 }}>
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="glass-card p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p style={{ color: "var(--color-muted-foreground)" }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 px-6" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {[{ icon: Shield, label: "Secure" }, { icon: Star, label: "Top Rated" }, { icon: Clock, label: "24/7 Support" }].map((item) => (
            <div key={item.label} className="flex items-center gap-2" style={{ color: "var(--color-muted-foreground)" }}>
              <item.icon className="w-5 h-5" /><span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-sm" style={{ color: "var(--color-muted-foreground)" }}>
        Built for WeMakeDevs × Tambo AI "The UI Strikes Back" Hackathon
      </footer>
    </div>
  );
}