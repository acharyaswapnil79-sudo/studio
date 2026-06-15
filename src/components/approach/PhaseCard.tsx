"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface PhaseCardProps {
  number: string;
  title: string;
  description: string;
  bullets: string[];
}

export function PhaseCard({ number, title, description, bullets }: PhaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0D0D0D] border border-white/5 p-8 md:p-12 rounded-[32px] flex flex-col h-full hover:border-[#0445a4]/20 transition-all group shadow-xl"
    >
      <div className="text-[64px] font-bold text-[#0445a4]/10 leading-none mb-8 tracking-tighter group-hover:text-[#0445a4]/20 transition-colors">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight">
        {title}
      </h3>
      <p className="text-[16px] text-[#666] mb-8 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-4 mt-auto pt-8 border-t border-white/5">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3 text-[13px] font-medium text-[#888]">
            <CheckCircle2 className="w-4 h-4 text-[#0445a4] shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
