"use client"

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrincipleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PrincipleCard({ icon: Icon, title, description }: PrincipleCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#111] border border-white/5 p-8 md:p-10 rounded-[24px] hover:border-[#0445a4]/30 transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center mb-8 group-hover:bg-[#0445a4] transition-colors duration-500">
        <Icon className="w-5 h-5 text-[#0445a4] group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4 tracking-tight leading-tight">
        {title}
      </h3>
      <p className="text-[15px] text-[#666] leading-relaxed group-hover:text-[#888] transition-colors">
        {description}
      </p>
    </motion.div>
  );
}
