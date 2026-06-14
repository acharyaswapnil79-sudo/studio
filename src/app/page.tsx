
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Cpu, 
  BarChart3, 
  ShieldCheck, 
  Plug, 
  Clock, 
  Layers,
  Database,
  Users,
  Server,
  Globe,
  Calculator,
  FileText,
  Hash,
  Video,
  Mail,
  Book,
  Table,
  CheckSquare,
  Zap,
  Repeat,
  Phone,
  MessageCircle,
  CreditCard,
  Wallet,
  Plus,
  Sparkles,
  Mic,
  Volume2,
  Check
} from 'lucide-react';
import Link from 'next/link';

const INTEGRATIONS = [
  { name: "Salesforce", icon: Database },
  { name: "HubSpot", icon: Users },
  { name: "Zoho CRM", icon: Layers },
  { name: "SAP", icon: Server },
  { name: "NetSuite", icon: Globe },
  { name: "QuickBooks", icon: BarChart3 },
  { name: "Xero", icon: Calculator },
  { name: "Tally", icon: FileText },
  { name: "Slack", icon: Hash },
  { name: "MS Teams", icon: Video },
  { name: "Workspace", icon: Mail },
  { name: "Notion", icon: Book },
  { name: "Airtable", icon: Table },
  { name: "Jira", icon: CheckSquare },
  { name: "Zapier", icon: Zap },
  { name: "Make", icon: Repeat },
  { name: "Twilio", icon: Phone },
  { name: "WhatsApp", icon: MessageCircle },
  { name: "Stripe", icon: CreditCard },
  { name: "Razorpay", icon: Wallet },
];

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

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] selection:bg-[#0445a4]/30 overflow-x-hidden">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center pt-20 px-6">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 blur-[100px]" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                animate={{
                  d: [
                    "M0 500C200 300 300 700 500 500C700 300 800 700 1000 500V1000H0V500Z",
                    "M0 500C200 700 300 300 500 500C700 700 800 300 1000 500V1000H0V500Z",
                    "M0 500C200 300 300 700 500 500C700 300 800 700 1000 500V1000H0V500Z"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                d="M0 500C200 300 300 700 500 500C700 300 800 700 1000 500V1000H0V500Z"
                fill="url(#paint0_linear_hero)"
              />
              <defs>
                <linearGradient id="paint0_linear_hero" x1="0" y1="500" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0445a4" />
                  <stop offset="0.5" stopColor="#021d3a" />
                  <stop offset="1" stopColor="#0A0A0A" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="container relative z-10 max-w-4xl mx-auto px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0445a4] fill-current" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">Updated for Q1 2026</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[40px] md:text-[84px] font-bold text-white tracking-tighter leading-[1.05] mb-8"
            >
              Operational Intelligence. <br />
              <span className="text-white/40 italic">Built to Deploy.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16px] md:text-[21px] text-[#888888] leading-relaxed max-w-2xl mx-auto"
            >
              GreyShacks gives mid-market operations teams a structured system to eliminate manual work, track what matters, and scale what works.
            </motion.p>
          </div>
        </section>

        {/* COMMAND CENTER SECTION */}
        <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5">
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
                  className="text-[32px] md:text-[56px] font-bold text-white tracking-tight leading-[1.1]"
                >
                  Query your operations. <br />
                  Get the work done.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[17px] md:text-[20px] text-[#888888] leading-relaxed max-w-[580px]"
                >
                  GreyShacks analyzes your entire stack in real-time. It identifies urgent approvals, surfaces critical alerts, and ensures no important email or decision slips through. A single layer of truth for your operations.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="bg-transparent border border-white/20 text-white hover:bg-[#0445a4] hover:border-[#0445a4] rounded-full px-10 py-7 text-sm font-semibold tracking-wide transition-all w-full sm:w-auto"
                  >
                    Get started
                  </Button>
                </motion.div>
              </div>

              <div className="lg:col-span-5 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative w-full aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl border border-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0445a4] via-[#021d3a] to-[#0A0A0A]" />
                  <div className="absolute top-1/4 left-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#0445a4] rounded-full blur-[80px] md:blur-[100px] opacity-40 animate-pulse" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8">
                    <div className="w-full bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl space-y-6">
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 text-white/80 text-[10px] md:text-xs font-medium">
                          <CheckSquare className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          Approve Invoices
                        </div>
                        <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 text-white/80 text-[10px] md:text-xs font-medium">
                          <FileText className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          Summarize CRM
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                          <Plus className="w-3.5 h-3.5 text-white/40" />
                          <span className="text-white/60 text-xs md:text-sm">Ask anything...</span>
                        </div>
                        <div className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-end gap-3">
                          <Mic className="w-4 h-4 text-white/40" />
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <Volume2 className="w-4 h-4 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
              transition={{ duration: 0.6 }}
              className="mb-24"
            >
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-[#0445a4] uppercase mb-6 block">WHAT WE DO</span>
              <h2 className="text-[32px] md:text-[64px] font-bold text-[#F5F5F5] tracking-tight leading-[1.1] mb-8">
                Two things. <br /> Done exceptionally well.
              </h2>
              <p className="text-[17px] md:text-[21px] text-[#888888] leading-relaxed max-w-[600px]">
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
                <p className="text-[17px] md:text-[20px] text-[#888888] leading-relaxed max-w-[540px]">
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
                <p className="text-[17px] md:text-[20px] text-[#888888] leading-relaxed max-w-[540px]">
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
        <section className="py-24 md:py-32 border-t border-white/5 bg-[#0A0A0A]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 md:mb-24"
            >
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-[#0445a4] uppercase mb-6 block">HOW IT WORKS</span>
              <h2 className="text-[32px] md:text-[56px] font-bold text-[#F5F5F5] tracking-tight leading-[1.1]">We don’t guess. <br className="hidden md:block" /> We measure. Then we build.</h2>
            </motion.div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24">
              <div className="hidden md:block absolute top-12 left-0 right-0 h-px border-t border-dashed border-white/10 z-0" />
              
              {[
                { 
                  n: "01", 
                  t: "Operational Diagnostic", 
                  d: "We spend 4 weeks deeply understanding your current operations. We establish precise baselines across the workflows that matter most to you.", 
                  metadata: [
                    { label: "Outcome", val: "A clear diagnostic report with quantified opportunities, success criteria, and a recommended pilot scope." }
                  ]
                },
                { 
                  n: "02", 
                  t: "Focused Pilot", 
                  d: "We deploy a targeted set of agents against one or two high-impact workflows. Progress is measured live against the baseline you approved.", 
                  metadata: [
                    { label: "Duration", val: "Typically 6–10 weeks" },
                    { label: "Review cadence", val: "Weekly dashboards + bi-weekly reviews" }
                  ]
                },
                { 
                  n: "03", 
                  t: "Production Deployment", 
                  d: "Only after the pilot delivers verified results do we discuss scaling. The same measurement infrastructure and governance model carries forward.", 
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
                  <div className="text-[64px] md:text-[84px] font-bold text-[#0445a4]/20 leading-none mb-8 tracking-tighter">
                    {step.n}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">{step.t}</h3>
                  <p className="text-[15px] md:text-[16px] text-[#888888] leading-relaxed mb-8">{step.d}</p>
                  
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
            <div className="mt-32 pt-16 border-t border-white/5">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-12 tracking-tight">Why our approach builds real credibility</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  "You stay in control. Every decision is data-driven and reversible.",
                  "Risk is front-loaded and minimized. The diagnostic is the lowest-risk, highest-insight step.",
                  "Your team builds ownership. They see the numbers and participate in validation."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <ArrowRight className="w-5 h-5 text-[#0445a4] shrink-0 group-hover:translate-x-1 transition-transform mt-0.5" />
                    <p className="text-[15px] md:text-[16px] text-[#888888] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL METRICS STRIP */}
        <section className="bg-[#0D0D0D] border-y border-white/5 py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 items-center">
              <div className="flex flex-col gap-3 px-4 md:border-r border-white/5">
                <div className="text-[40px] md:text-[64px] font-bold text-white tracking-tighter leading-none">
                  <CountUp value={190} suffix="+" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555]">
                  Workflows Automated
                </div>
              </div>

              <div className="flex flex-col gap-3 px-4 md:px-12 md:border-r border-white/5">
                <div className="text-[40px] md:text-[64px] font-bold text-white tracking-tighter leading-none">
                  8–14 wk
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555]">
                  Typical ROI Window
                </div>
              </div>

              <div className="flex flex-col gap-3 px-4 md:px-12">
                <div className="text-[40px] md:text-[64px] font-bold text-white tracking-tighter leading-none">
                  <CountUp value={30} suffix="+" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555]">
                  Production Deployments
                </div>
              </div>
            </div>
            
            <div className="mt-16 md:mt-20 text-center opacity-30">
              <p className="text-[9px] italic font-medium uppercase tracking-[0.3em]">
                AGGREGATE OUTCOMES Q3 2023 – Q1 2026
              </p>
            </div>
          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section className="bg-[#0A0A0A] py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="mb-16 md:mb-20 max-w-2xl">
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-[#0445a4] uppercase mb-6 block">CORE VERTICALS</span>
              <h2 className="text-[32px] md:text-[56px] font-bold text-white tracking-tight leading-tight">Industries We Operate In</h2>
              <p className="mt-6 text-[#888888] text-lg leading-relaxed">We deploy production-grade systems across core mid-market business verticals.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { t: "Manufacturing", d: "Production quality, procurement, and vendor operations" },
                { t: "Real Estate", d: "Lead operations, sales follow-up, and documentation workflows" },
                { t: "Logistics", d: "Exception management, PO tracking, and delivery reconciliation" },
                { t: "Healthcare", d: "Scheduling, claims pre-processing, and patient communications" },
                { t: "Professional Services", d: "Contract intelligence, billing operations, and reporting" }
              ].map((ind, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className="bg-[#0D0D0D] border border-white/5 p-8 md:p-10 rounded-2xl transition-all group hover:border-[#0445a4]/30"
                >
                  <h3 className="text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-[#0445a4] transition-colors">{ind.t}</h3>
                  <p className="text-[14px] md:text-[15px] text-[#666] leading-relaxed">{ind.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATIONS SECTION */}
        <section className="py-24 md:py-32 bg-black overflow-hidden border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-6">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[32px] md:text-[56px] font-bold text-white tracking-tight leading-[1.05]"
                  >
                    Works inside the stack <br className="hidden md:block" /> you already run.
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-[17px] md:text-[20px] text-[#888888] leading-relaxed max-w-[540px]"
                  >
                    GreyShacks connects to your CRM, ERP, finance, and communication tools. No rip-and-replace. No new software to learn.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="bg-transparent border border-white/20 text-white hover:bg-[#0445a4] hover:border-[#0445a4] rounded-full px-10 py-7 text-sm font-semibold tracking-wide transition-all w-full sm:w-auto"
                  >
                    Get started
                  </Button>
                </motion.div>
              </div>

              <div className="lg:col-span-5 relative">
                <div 
                  className="grid grid-cols-3 gap-6 md:gap-12"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
                  }}
                >
                  {INTEGRATIONS.map((platform, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02 }}
                      className="group flex flex-col items-center justify-center gap-3"
                    >
                      <div className="w-14 md:w-16 h-14 md:h-16 rounded-xl md:rounded-2xl bg-[#0F0F0F] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#1A1A1A] group-hover:border-white/10 group-hover:scale-110">
                        <platform.icon className="w-6 md:w-7 h-6 md:h-7 text-[#444] transition-colors duration-500 group-hover:text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 md:mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[13px] md:text-[14px] text-[#555555] text-center md:text-left">
                Don't see your stack? We've integrated with <span className="text-white font-semibold">40+ platforms</span>.
              </p>
              <button 
                onClick={() => setIsIntakeOpen(true)}
                className="text-white/40 hover:text-white text-[12px] md:text-[13px] font-medium tracking-wide flex items-center gap-2 transition-colors"
              >
                Talk to an Integration Specialist
                <ArrowRight className="w-3 h-3" />
              </button>
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
