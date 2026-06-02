"use client"
import React from 'react';

interface ImpactPanelProps {
  impact: string;
}

export function ImpactPanel({ impact }: ImpactPanelProps) {
  return (
    <div className="bg-[#0445a4]/10 border border-[#0445a4]/30 rounded-xl p-10 mt-12">
      <h3 className="text-xl font-headline font-semibold mb-4 text-white">
        Business Impact
      </h3>
      <p className="text-white/80 font-body leading-relaxed text-lg">
        {impact}
      </p>
    </div>
  );
}