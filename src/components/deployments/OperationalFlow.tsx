"use client"
import React from 'react';

interface OperationalFlowProps {
  title: string;
  beforeSteps?: string[];
  afterSteps?: string[];
}

export function OperationalFlow({ title, beforeSteps, afterSteps }: OperationalFlowProps) {
  const defaultBefore = ["Manual intake", "Spreadsheet tracking", "Delayed operational response", "Fragmented visibility"];
  const defaultAfter = ["Structured intake engine", "Automated prioritisation", "System-driven routing", "Operational visibility dashboard"];

  const before = beforeSteps || defaultBefore;
  const after = afterSteps || defaultAfter;

  return (
    <div className="bg-[#111] border border-white/5 rounded-xl p-6 md:p-8 mt-12">
      <h3 className="text-xl font-headline font-semibold mb-8">Operational Workflow</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10">
        <div className="space-y-6">
          <h4 className="text-[11px] font-bold uppercase font-body text-white/40 tracking-[0.2em]">Before Deployment</h4>
          <ul className="space-y-4 text-[14px] md:text-sm font-body text-white/70">
            {before.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="text-white/20 font-bold leading-none mt-1">—</span> 
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6 relative md:before:absolute md:before:-left-5 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-white/5">
          <h4 className="text-[11px] font-bold uppercase font-body text-white/40 tracking-[0.2em]">After Deployment</h4>
          <ul className="space-y-4 text-[14px] md:text-sm font-body text-white">
            {after.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="text-[#E8FF47] font-bold leading-none mt-1">✓</span> 
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
