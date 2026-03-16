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
    <div className="bg-[#111] border border-white/5 rounded-xl p-8 mt-12">
      <h3 className="text-xl font-headline font-semibold mb-6">Operational Workflow</h3>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h4 className="text-sm uppercase font-body text-white/40 mb-4 tracking-widest">Before Deployment</h4>
          <ul className="space-y-3 text-sm font-body text-white/70">
            {before.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-white/20">—</span> {step}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase font-body text-white/40 mb-4 tracking-widest">After Deployment</h4>
          <ul className="space-y-3 text-sm font-body text-white">
            {after.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[#0047AB]">✓</span> {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
