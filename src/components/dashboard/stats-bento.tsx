"use client";

import { motion } from "framer-motion";

interface StatsBentoProps {
  processedCount: number;
  credits: number;
}

export function StatsBento({ processedCount, credits }: StatsBentoProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        whileHover={{ y: -4 }}
        className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 flex flex-col justify-between aspect-square"
      >
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Processed</p>
        <div className="space-y-1">
          <h3 className="text-5xl font-bold">{processedCount}</h3>
          <p className="text-[10px] text-green-600 font-bold tracking-tight uppercase">+13 SINCE MONDAY</p>
        </div>
      </motion.div>
      <motion.div 
        whileHover={{ y: -4 }}
        className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 flex flex-col justify-between aspect-square"
      >
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Credits</p>
        <div className="space-y-3">
          <h3 className="text-5xl font-bold">{credits}<span className="text-xl text-gray-200">/100</span></h3>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${credits}%` }}
              className="bg-black h-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
