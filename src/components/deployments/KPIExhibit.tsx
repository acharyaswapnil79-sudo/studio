"use client"
import React from 'react';

interface KPI {
  label: string;
  before: string;
  after: string;
  impact: string;
}

interface KPIExhibitProps {
  kpis: KPI[];
}

export function KPIExhibit({ kpis }: KPIExhibitProps) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-xl p-8 mt-12">
      <h3 className="text-xl font-headline font-semibold mb-8">Operational Impact</h3>
      <div className="space-y-10">
        {kpis.map((kpi, index) => (
          <div key={index} className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="text-sm font-body text-white/50">{kpi.label}</div>
              <div className="text-[#0047AB] font-bold text-sm font-body">{kpi.impact}</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-xs font-body text-white/40 w-24 text-right">
                {kpi.before}
              </div>
              <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 bg-white/5 border-r border-white/10 w-1/2" />
                <div className="bg-[#0047AB] h-2 w-[70%] rounded-full shadow-[0_0_8px_rgba(0,71,171,0.5)]" />
              </div>
              <div className="text-xs font-body text-white font-semibold w-24">
                {kpi.after}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[10px] text-white/30 italic uppercase tracking-widest text-center">
        Metrics measured during the first full quarter post-deployment against a four-week pre-deployment baseline.
      </p>
    </div>
  );
}
