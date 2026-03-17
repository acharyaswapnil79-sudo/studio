
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, CheckCircle2, Zap, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';

interface StepProps {
  id: number;
  title: string;
  duration: string;
  bullets: string[];
  assurance: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const StepCard = ({ id, title, duration, bullets, assurance, icon, isActive }: StepProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <article
      role="group"
      aria-labelledby={`step-${id}-heading`}
      className={cn(
        "relative flex flex-col p-6 md:p-8 rounded-xl border transition-all duration-500 bg-[#0D0D0D]",
        isActive 
          ? "border-[#0047AB]/50 shadow-[0_18px_40px_rgba(0,71,171,0.12)] -translate-y-1.5 scale-[1.01]" 
          : "border-white/5 opacity-50 grayscale scale-100"
      )}
    >
      {/* Glow Effect */}
      {isActive && !shouldReduceMotion && (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,71,171,0.15)_0%,transparent_70%)] blur-2xl rounded-xl opacity-100 transition-opacity duration-700" />
      )}

      <div className="flex items-start justify-between mb-6">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-500",
          isActive ? "bg-[#0047AB] text-white" : "bg-white/5 text-white/20"
        )}>
          {icon}
        </div>
        <div className={cn(
          "font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border transition-colors",
          isActive ? "text-[#0047AB] border-[#0047AB]/30" : "text-white/20 border-white/5"
        )}>
          Phase 0{id}
        </div>
      </div>

      <h3 id={`step-${id}-heading`} className="font-headline text-xl md:text-2xl font-bold mb-2">
        {title}
      </h3>
      <p className="text-[#0047AB] font-bold text-xs uppercase tracking-wider mb-6">
        {duration}
      </p>

      <ul className="space-y-3 mb-8 flex-1">
        {bullets.map((bullet, idx) => (
          <motion.li 
            key={idx}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3 text-sm text-[#A0A0A0]"
          >
            <CheckCircle2 className={cn("w-4 h-4 mt-0.5 shrink-0", isActive ? "text-[#0047AB]" : "text-white/10")} />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>

      <div className="pt-6 border-t border-white/5">
        <p className="text-[11px] text-white/40 italic mb-4">
          {assurance}
        </p>
        <button className="text-[11px] font-bold uppercase tracking-widest text-[#0047AB] hover:text-white transition-colors flex items-center gap-2 group">
          See diagnostic checklist
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
};

export function EngagementModel({ onOpenIntake }: { onOpenIntake: () => void }) {
  const [activeStep, setActiveStep] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step') || '1');
            setActiveStep(step);
          }
        });
      },
      { threshold: 0.45, rootMargin: "-10% 0px -10% 0px" }
    );

    const elements = document.querySelectorAll('.step-trigger');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: 1,
      title: "Operational Diagnostic",
      duration: "2–3 weeks · low friction · measured output",
      bullets: [
        "Process map at operator level",
        "4-week baseline plan",
        "Integration feasibility check"
      ],
      assurance: "We capture your data — you keep control.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Pilot Deployment",
      duration: "4–8 weeks · parallel run · live calibration",
      bullets: [
        "Live parallel run vs manual outputs",
        "Threshold calibration & operator onboarding",
        "Measured before / after"
      ],
      assurance: "Pilot uses your live data; we measure against your baseline.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Production Deployment",
      duration: "Scale safely · governance · 24/7 monitoring",
      bullets: [
        "Controlled ramp by team & geography",
        "Governance + audit trail",
        "Continuous improvement plan"
      ],
      assurance: "We only scale after you approve measurable results.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  return (
    <section 
      id="engagement-model"
      ref={sectionRef}
      aria-labelledby="engage-h"
      className="py-24 bg-[#0A0A0A] px-6 md:px-10 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto">
        <header className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 id="engage-h" className="font-headline text-3xl md:text-5xl font-bold mb-6">
            How Engagements Begin
          </h2>
          <p className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed">
            Short, measured pilots built on your data. No commitment beyond the pilot — we prove value first.
          </p>
        </header>

        {/* Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Desktop Timeline Path */}
          <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-px bg-white/5 z-0">
            <motion.div 
              className="h-full bg-[#0047AB]"
              initial={{ width: 0 }}
              animate={{ width: `${((activeStep - 1) / 2) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
            />
          </div>

          {steps.map((step) => (
            <div key={step.id} className="step-trigger" data-step={step.id}>
              <StepCard {...step} isActive={activeStep === step.id} />
            </div>
          ))}
        </div>

        {/* Risk Reversal & FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#111] border-l-4 border-[#0047AB] p-8 rounded-r-xl mb-12">
            <p className="text-white font-bold text-lg mb-6 leading-relaxed">
              We do not proceed to full deployment unless the pilot delivers measurable outcomes against your baseline. No surprise fees. No hidden lock-ins.
            </p>
            
            <div className="space-y-4">
              {[
                {
                  q: "Will this disrupt operations?",
                  a: "No. The pilot runs in parallel with your existing workflow. Your manual fallback stays active until you approve the system's performance."
                },
                {
                  q: "What do you need from us?",
                  a: "Access to the relevant data feeds & a single domain expert (SME) for 1–2 hours per week during the diagnostic phase."
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-t border-white/5 pt-4">
                  <button 
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{faq.q}</span>
                    {faqOpen === idx ? <ChevronUp className="w-4 h-4 text-[#0047AB]" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                  </button>
                  <AnimatePresence>
                    {faqOpen === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#A0A0A0] mt-3 pb-2 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenIntake}
                className="bg-[#0047AB] text-white font-bold text-[14.5px] px-10 py-4 rounded-[7px] shadow-lg flex items-center justify-center gap-2"
              >
                Scope a Pilot
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <button 
                className="bg-transparent border border-white/10 text-white font-bold text-[14.5px] px-10 py-4 rounded-[7px] hover:bg-white/5 transition-all"
              >
                Request Deployment Brief (NDA)
              </button>
            </div>
            <p className="text-[13px] text-[#A0A0A0] font-medium">
              Typical diagnostic: 2–3 weeks · Pilot: 4–8 weeks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
