"use client";

import { Zap, History, User } from "lucide-react";

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md px-8 py-6 border-t border-gray-100 max-w-md mx-auto grid grid-cols-3 text-center shadow-lg shadow-black/5 rounded-t-3xl">
      <button className="flex flex-col items-center gap-1.5 transition-transform active:scale-90 text-black">
        <Zap className="w-5 h-5" />
        <span className="text-[9px] font-black uppercase tracking-[0.15em]">Dashboard</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 opacity-20 transition-transform active:scale-90 text-black">
        <History className="w-5 h-5" />
        <span className="text-[9px] font-black uppercase tracking-[0.15em]">History</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 opacity-20 transition-transform active:scale-90 text-black">
        <User className="w-5 h-5" />
        <span className="text-[9px] font-black uppercase tracking-[0.15em]">Profile</span>
      </button>
    </nav>
  );
}
