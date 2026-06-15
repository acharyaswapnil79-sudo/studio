"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Activity, BarChart3, Network } from 'lucide-react';

interface MediaPlaceholderProps {
  type: 'graph' | 'flow' | 'demo';
  label: string;
  className?: string;
}

export function MediaPlaceholder({ type, label, className }: MediaPlaceholderProps) {
  const icons = {
    graph: BarChart3,
    flow: Network,
    demo: Activity
  };
  const Icon = icons[type];

  return (
    <div className={cn(
      "relative bg-[#0D0D0D] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-12 text-center group transition-all hover:border-[#0445a4]/30",
      className
    )}>
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#0445a4]/10 transition-colors">
        <Icon className="w-5 h-5 text-[#333] group-hover:text-[#0445a4] transition-colors" />
      </div>
      <div className="space-y-1">
        <p className="text-[11px] font-bold text-[#444] uppercase tracking-[0.2em] group-hover:text-[#666] transition-colors italic">
          Placeholder Area
        </p>
        <p className="text-sm font-medium text-white/40 group-hover:text-white/60 transition-colors">
          {label}
        </p>
      </div>
    </div>
  );
}
