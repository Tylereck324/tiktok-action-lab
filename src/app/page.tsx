"use client";

import { useState } from "react";
import { ArrowRight, Zap, Battery, CheckCircle2, History, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [url, setUrl] = useState("");

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-8 gap-10">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-lg tracking-tight">Action Lab</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
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
            placeholder="Paste TikTok Link..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
          />
          <button className="absolute right-3 top-3 bottom-3 bg-black text-white px-5 rounded-xl text-xs font-bold hover:scale-[0.98] active:scale-95 transition-all">
            Build Action Plan
          </button>
        </div>
      </section>

      {/* Bento Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 flex flex-col justify-between aspect-square"
        >
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Processed</p>
          <div className="space-y-1">
            <h3 className="text-5xl font-bold">142</h3>
            <p className="text-[10px] text-green-600 font-bold">+12 since Monday</p>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 flex flex-col justify-between aspect-square"
        >
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Credits</p>
          <div className="space-y-3">
            <h3 className="text-5xl font-bold">85<span className="text-xl text-gray-300">/100</span></h3>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-black h-full w-[85%]"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activity List */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Recent Action Plans</p>
          <button className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors">View All</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <span className="text-lg">🥩</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Gordon Ramsay Steak</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Kitchen Protocol</p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group opacity-60">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <span className="text-lg">🧘</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">15m Morning Flow</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Health Protocol</p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
        </div>
      </section>

      {/* Nav */}
      <nav className="mt-auto grid grid-cols-3 text-center border-t border-gray-100 pt-6">
        <button className="flex flex-col items-center gap-1">
          <Zap className="w-5 h-5 text-black" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-black">Dashboard</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-20">
          <History className="w-5 h-5 text-black" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-black">History</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-20">
          <User className="w-5 h-5 text-black" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-black">Profile</span>
        </button>
      </nav>
    </div>
  );
}
