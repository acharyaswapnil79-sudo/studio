"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Sparkles, 
  Mic, 
  Volume2, 
  Check,
  Zap,
  Plus,
  FileText,
  CheckSquare,
  ArrowRight
} from 'lucide-react';
import { useUser } from '@/firebase';

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function GreyShacksHome() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] selection:bg-[#0445a4]/30 overflow-x-hidden">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-40 md:pt-56 pb-20 px-6">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0445a4]/10 blur-[120px] rounded-full opacity-50" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#021d3a]/20 blur-[100px] rounded-full opacity-30" />
          </div>

          <div className="container relative z-10 max-w-6xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-[#0445a4] mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0445a4] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">SYSTEMS FOR MID-MARKET OPS</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[48px] md:text-[88px] font-bold text-white tracking-tighter leading-[0.95] mb-10"
              >
                Organized Data. <br />
                <span className="text-white/40 italic">Autonomous Agents.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[18px] md:text-[22px] text-[#888888] leading-relaxed max-w-xl mx-auto mb-12"
              >
                GreyShacks gives operations teams a high-integrity system to eliminate manual work and scale what works.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {!user && (
                  <Link href="/signup">
                    <Button className="bg-[#0445a4] text-white hover:bg-[#0445a4]/90 rounded-full px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all shadow-2xl shadow-[#0445a4]/20 group">
                      Start Pilot Deployment
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
                {user && (
                  <div className="text-[#888888] font-medium italic">
                    Logged in as <span className="text-white font-bold">{user.email}</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMMAND CENTER SECTION */}
        <section className="py-24 md:py-48 bg-[#0A0A0A] border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-[#0445a4]"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Command Center</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[36px] md:text-[64px] font-bold text-white tracking-tight leading-[1] mb-6"
                >
                  Query your operations. <br />
                  Get the work done.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[17px] md:text-[21px] text-[#888888] leading-relaxed max-w-[580px]"
                >
                  GreyShacks analyzes your entire stack in real-time. A single layer of truth for your operations.
                </motion.p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative w-full aspect-square rounded-[40px] overflow-hidden shadow-2xl border border-white/5 bg-[#111]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0445a4]/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div className="w-full bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-white/5 px-3 py-2 rounded-lg flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                          <CheckSquare className="w-3.5 h-3.5" /> Approve Invoices
                        </div>
                        <div className="bg-[#0445a4]/10 border border-[#0445a4]/20 px-3 py-2 rounded-lg flex items-center gap-2 text-[#0445a4] text-[10px] font-bold uppercase tracking-widest">
                          <FileText className="w-3.5 h-3.5" /> Summarize CRM
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                          <Plus className="w-4 h-4 text-white/20" />
                          <span className="text-white/40 text-sm">Ask anything...</span>
                        </div>
                        <div className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-end gap-3">
                          <Mic className="w-4 h-4 text-white/20" />
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <Volume2 className="w-4 h-4 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO SECTION */}
        <section className="py-24 md:py-40 border-t border-white/5 bg-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0445a4] uppercase mb-6 block">WHAT WE DO</span>
              <h2 className="text-[36px] md:text-[72px] font-bold text-white tracking-tight leading-[1] mb-8">
                Two things. <br /> Done exceptionally well.
              </h2>
              <p className="text-[18px] md:text-[22px] text-[#888888] leading-relaxed max-w-[600px]">
                Everything we build serves these two capabilities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              {/* Pillar 1: Organizing Data */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Organizing Data</h3>
                <p className="text-[17px] md:text-[20px] text-[#888888] leading-relaxed">
                  We transform fragmented, messy operational data into clean, structured, query-ready foundations with full lineage and governance.
                </p>
                <ul className="space-y-6">
                  {[
                    "Ingestion, enrichment & reconciliation at scale",
                    "Canonical data models & semantic structure",
                    "Complete audit trails and data lineage"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-white font-medium group">
                      <div className="w-6 h-6 rounded-full bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0445a4] transition-colors duration-300">
                        <Check className="w-3.5 h-3.5 text-[#0445a4] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-base md:text-lg opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Pillar 2: Deploying Systems */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-10"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Deploying Systems</h3>
                <p className="text-[17px] md:text-[20px] text-[#888888] leading-relaxed">
                  We build and deploy agentic systems that operate across your entire tech stack to manage approvals, surface alerts, and execute workflows.
                </p>
                <ul className="space-y-6">
                  {[
                    "Multi-platform approval orchestration",
                    "Cross-functional alert prioritization",
                    "Production-grade maintenance & stability"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-white font-medium group">
                      <div className="w-6 h-6 rounded-full bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0445a4] transition-colors duration-300">
                        <Check className="w-3.5 h-3.5 text-[#0445a4] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-base md:text-lg opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-24 md:py-48 border-t border-white/5 bg-[#0A0A0A]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0445a4] uppercase mb-6 block">HOW IT WORKS</span>
              <h2 className="text-[36px] md:text-[64px] font-bold text-white tracking-tight leading-[1]">We don’t guess. <br className="hidden md:block" /> We measure. Then we build.</h2>
            </motion.div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24 mb-32">
              <div className="hidden md:block absolute top-12 left-0 right-0 h-px border-t border-dashed border-white/10 z-0" />
              
              {[
                { 
                  n: "01", 
                  t: "Operational Diagnostic", 
                  d: "We spend 4 weeks deeply understanding your current operations. We establish precise baselines across your most critical workflows.", 
                  metadata: [
                    { label: "Outcome", val: "Quantified diagnostic report with success criteria." }
                  ]
                },
                { 
                  n: "02", 
                  t: "Focused Pilot", 
                  d: "We deploy a targeted set of agents against one or two high-impact workflows. Progress is measured live against the baseline.", 
                  metadata: [
                    { label: "Duration", val: "6–10 weeks" }
                  ]
                },
                { 
                  n: "03", 
                  t: "Production Deployment", 
                  d: "Only after the pilot delivers verified results do we discuss scaling. The same measurement infrastructure carries forward.", 
                  metadata: [
                    { label: "Status", val: "Production only when outcomes are proven" }
                  ]
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10"
                >
                  <div className="text-[64px] font-bold text-[#0445a4]/20 leading-none mb-8 tracking-tighter">
                    {step.n}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.t}</h3>
                  <p className="text-[15px] md:text-[17px] text-[#888888] leading-relaxed mb-8">{step.d}</p>
                  
                  <div className="space-y-4">
                    {step.metadata.map((m, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0445a4] opacity-60">
                          {m.label}
                        </div>
                        <div className="text-[12px] text-white/80 font-medium leading-relaxed bg-white/5 border border-white/5 px-4 py-3 rounded-lg">
                          {m.val}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Credibility Footer */}
            <div className="pt-24 border-t border-white/5">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 tracking-tight">Why our approach builds real credibility</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  "You stay in control. Every decision is data-driven and reversible.",
                  "Risk is front-loaded and minimized. The diagnostic is the highest-insight step.",
                  "Your team builds ownership. They see the numbers and participate in validation."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <ArrowRight className="w-5 h-5 text-[#0445a4] shrink-0 group-hover:translate-x-1 transition-transform mt-0.5" />
                    <p className="text-[16px] text-[#888888] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL METRICS STRIP */}
        <section className="bg-[#0D0D0D] border-y border-white/5 py-24 md:py-48">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 items-center">
              <div className="flex flex-col gap-3 px-4 md:border-r border-white/5">
                <div className="text-[56px] md:text-[88px] font-bold text-white tracking-tighter leading-none">
                  <CountUp value={190} suffix="+" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0445a4]">
                  Workflows Automated
                </div>
              </div>

              <div className="flex flex-col gap-3 px-4 md:px-12 md:border-r border-white/5">
                <div className="text-[56px] md:text-[88px] font-bold text-white tracking-tighter leading-none">
                  8–14 wk
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0445a4]">
                  Typical ROI Window
                </div>
              </div>

              <div className="flex flex-col gap-3 px-4 md:px-12">
                <div className="text-[56px] md:text-[88px] font-bold text-white tracking-tighter leading-none">
                  <CountUp value={30} suffix="+" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0445a4]">
                  Production Deployments
                </div>
              </div>
            </div>
          </div>
        </section>

        <DiagnosticCTA onOpenIntake={() => setIsIntakeOpen(true)} />
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}
