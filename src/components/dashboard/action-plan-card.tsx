"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ActionPlanResult } from "@/types/action-lab";

interface ActionPlanCardProps {
  result: ActionPlanResult;
  onReset: () => void;
}

export function ActionPlanCard({ result, onReset }: ActionPlanCardProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-end px-1">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black">New Action Plan</p>
        <button onClick={onReset} className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest">Reset</button>
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
  );
}
