"use client";

import { useState } from "react";
import { Zap, History, User, CheckCircle2, Loader2, Play, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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
    } catch (err: any) {
      setError(err.message);
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

      {/* Bento Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 flex flex-col justify-between aspect-square"
        >
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Processed</p>
          <div className="space-y-1">
            <h3 className="text-5xl font-bold">{result ? "143" : "142"}</h3>
            <p className="text-[10px] text-green-600 font-bold tracking-tight uppercase">+13 since Monday</p>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 flex flex-col justify-between aspect-square"
        >
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Credits</p>
          <div className="space-y-3">
            <h3 className="text-5xl font-bold">{result ? "84" : "85"}<span className="text-xl text-gray-200">/100</span></h3>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "85%" }}
                animate={{ width: result ? "84%" : "85%" }}
                className="bg-black h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Result / Activity Toggle */}
      <AnimatePresence mode="wait">
        {result ? (
          <motion.section 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-end px-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black">New Action Plan</p>
              <button onClick={() => setResult(null)} className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest">Reset</button>
            </div>
            <div className="bg-black text-white p-6 rounded-[1.5rem] shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">{result.protocol}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Blueprint Ready</p>
                </div>
              </div>
              <div className="h-px bg-white/10 w-full" />
              <p className="text-xs leading-relaxed text-gray-400">
                Extracted from video: <span className="text-white italic">"{result.raw.substring(0, 40)}..."</span>
              </p>
              <button className="w-full bg-white text-black py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
                View Full Protocol
              </button>
            </div>
          </motion.section>
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
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group">
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

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md px-8 py-6 border-t border-gray-100 max-w-md mx-auto grid grid-cols-3 text-center shadow-lg shadow-black/5 rounded-t-3xl">
        <button className="flex flex-col items-center gap-1.5 transition-transform active:scale-90">
          <Zap className="w-5 h-5 text-black" />
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black">Dashboard</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 opacity-20 transition-transform active:scale-90">
          <History className="w-5 h-5 text-black" />
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black">History</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 opacity-20 transition-transform active:scale-90">
          <User className="w-5 h-5 text-black" />
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black">Profile</span>
        </button>
      </nav>
    </div>
  );
}
