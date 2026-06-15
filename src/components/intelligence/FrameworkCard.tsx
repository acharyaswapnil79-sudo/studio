"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface FrameworkCardProps {
  title: string;
  description: string;
  bullets: string[];
}

export function FrameworkCard({ title, description, bullets }: FrameworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-[#0D0D0D] border border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col h-full hover:border-[#0445a4]/40 transition-all duration-300 group shadow-2xl"
    >
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight">
          {title}
        </h3>
        
        <p className="text-[16px] text-[#888] mb-10 leading-relaxed font-medium">
          {description}
        </p>

        <ul className="space-y-5">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-4 text-white/90 font-medium group/li">
              <div className="w-5 h-5 rounded-full bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/li:bg-[#0445a4] transition-colors duration-300">
                <Check className="w-3 h-3 text-[#0445a4] group-hover/li:text-white transition-colors" />
              </div>
              <span className="text-sm md:text-[15px] opacity-80 group-hover/li:opacity-100 transition-opacity">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
