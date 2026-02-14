"use client";

import { useState } from "react";
import { User, CheckCircle2, Loader2, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ActionPlanResult } from "@/types/action-lab";
import { StatsBento } from "@/components/dashboard/stats-bento";
import { ActionPlanCard } from "@/components/dashboard/action-plan-card";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ActionPlanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTransmute = async () => {
    if (!url) return;
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await fetch("/api/transmute", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to build action plan");
      
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to build action plan";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-8 gap-10">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg shadow-black/5">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight uppercase">Action Lab</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
          <User className="w-5 h-5 text-gray-400" />
        </div>
      </header>

      {/* Main Message */}
      <section className="space-y-3">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight leading-tight"
        >
          Turn your saves <br/>
          <span className="text-gray-400 font-medium">into momentum.</span>
        </motion.h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
          The most efficient way to process TikTok tutorials into actionable guides.
        </p>
      </section>

      {/* Hero Input Area */}
      <section className="space-y-4">
        <div className="relative group">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            placeholder="Paste TikTok Link..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all disabled:opacity-50"
          />
          <button 
            onClick={handleTransmute}
            disabled={isLoading || !url}
            className="absolute right-3 top-3 bottom-3 bg-black text-white px-5 rounded-xl text-xs font-bold hover:scale-[0.98] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            {isLoading ? "Building" : "Build Action Plan"}
          </button>
        </div>
        {error && (
          <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-2">{error}</p>
        )}
      </section>

      {/* Bento Stats Component */}
      <StatsBento processedCount={result ? 143 : 142} credits={result ? 84 : 85} />

      {/* Result / Activity Toggle */}
      <AnimatePresence mode="wait">
        {result ? (
          <ActionPlanCard result={result} onReset={() => setResult(null)} />
        ) : (
          <motion.section 
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-end px-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Recent Action Plans</p>
              <button className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-tighter">View All</button>
            </div>
            <div className="space-y-3 pb-20">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors border border-orange-100/50">
                  <span className="text-lg">🥩</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate tracking-tight text-gray-800">Gordon Ramsay Steak</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">Kitchen Protocol</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group opacity-60">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors border border-blue-100/50">
                  <span className="text-lg">🧘</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate tracking-tight text-gray-800">15m Morning Flow</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">Health Protocol</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Component */}
      <MobileNav />
    </div>
  );
}
