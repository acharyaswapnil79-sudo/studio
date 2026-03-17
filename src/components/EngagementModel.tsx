
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    id: "01",
    title: "Operational Diagnostic",
    subtitle: "Weeks 1–3 · Low friction · Measured output",
    bullets: [
      "Process map at operator level",
      "4-week baseline plan",
      "Integration feasibility check"
    ],
    note: "We capture your data — you keep control."
  },
  {
    id: "02",
    title: "Pilot Deployment",
    subtitle: "Weeks 4–8 · Parallel run · Live calibration",
    bullets: [
      "Live parallel run vs manual outputs",
      "Threshold calibration & onboarding",
      "Measured before / after"
    ],
    note: "Pilot uses your live data; we measure against baseline."
  },
  {
    id: "03",
    title: "Production Deployment",
    subtitle: "Scale safely · Governance · 24/7 Monitoring",
    bullets: [
      "Controlled ramp by team & geography",
      "Governance + audit trail",
      "Continuous improvement plan"
    ],
    note: "We only scale after you approve measurable results."
  }
];

export function EngagementModel({ onOpenIntake }: { onOpenIntake: () => void }) {
  return (
    <section 
      id="engagement-model" 
      className="py-24 bg-[#0A0A0A] px-6 md:px-10 border-t border-white/5"
    >
      <div className="max-w-[1240px] mx-auto">
        <header className="mb-16">
          <div className="inline-block bg-[#0047AB]/10 border border-[#0047AB]/20 px-3 py-1 rounded-full mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#0047AB] font-bold">Engagement Model</span>
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6">
            How Engagements Begin
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl leading-relaxed">
            Short, measured pilots built on your data. No commitment beyond the pilot — we prove value first.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, borderColor: 'rgba(0, 71, 171, 0.4)' }}
              className="group bg-[#0D0D0D] border border-white/5 p-8 rounded-xl transition-all shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="font-mono text-[10px] text-white/30 tracking-[0.2em] mb-6">
                  PHASE {step.id}
                </div>
                
                <h3 className="font-headline text-2xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                
                <div className="text-[#0047AB] text-xs font-bold uppercase tracking-wider mb-8">
                  {step.subtitle}
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {step.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-[#A0A0A0] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#0047AB] mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {step.note && (
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[11px] text-white/40 italic leading-relaxed">
                      {step.note}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#111] border-l-4 border-[#0047AB] p-8 md:p-10 rounded-r-xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-white font-bold text-lg mb-2">
                The GreyShacks Assurance
              </p>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">
                We do not proceed to full deployment unless the pilot delivers measurable outcomes against your baseline. No surprise fees. No hidden lock-ins.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenIntake}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#0047AB] text-white font-bold text-[14px] px-8 py-4 rounded-lg shadow-lg hover:bg-[#0047AB]/90 transition-colors"
              >
                Discuss an Operational Diagnostic
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
