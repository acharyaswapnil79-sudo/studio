
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  Infinity,
  Layout,
  LineChart,
  Plus,
  X
} from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  {
    icon: Cpu,
    title: "Workflow Automation",
    desc: "We identify manual, recurring processes and replace them with agentic workflows that execute without human touchpoints.",
    gradient: "radial-gradient(circle at 0% 0%, #0445a4 0%, #7000ff 50%, #ff0055 100%)"
  },
  {
    icon: BarChart3,
    title: "Operational Intelligence",
    desc: "Every deployment comes with a measurement layer — so you know exactly what changed, by how much, and why it matters.",
    gradient: "radial-gradient(circle at 100% 0%, #0445a4 0%, #00d2ff 50%, #3a7bd5 100%)"
  },
  {
    icon: ShieldCheck,
    title: "Audit-Ready Governance",
    desc: "Full traceability on every automated decision. Built for finance, compliance, and ops teams that need defensible outcomes.",
    gradient: "radial-gradient(circle at 50% 50%, #0445a4 0%, #1a1a1a 100%)"
  },
  {
    icon: Plug,
    title: "Systems Integration",
    desc: "GreyShacks connects to your existing stack — CRMs, ERPs, finance tools — without ripping and replacing what works.",
    gradient: "radial-gradient(circle at 0% 100%, #0445a4 0%, #4b6cb7 50%, #182848 100%)"
  },
  {
    icon: Clock,
    title: "Rapid Time-to-Value",
    desc: "Most clients see measurable impact within 8–14 weeks. We pilot before we scale — no long commitments upfront.",
    gradient: "radial-gradient(circle at 100% 100%, #0445a4 0%, #8e2de2 50%, #4a00e0 100%)"
  },
  {
    icon: Layers,
    title: "Production-First Deployment",
    desc: "We don't deliver prototypes. Every system goes into live operations — tested, monitored, and maintained.",
    gradient: "radial-gradient(circle at 50% 0%, #0445a4 0%, #2c3e50 100%)"
  }
];

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
    <div className="relative min-h-screen bg-[#0A0A0A] selection:bg-[#0445a4]/30 overflow-hidden">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center pt-20">
          <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-[40px] md:text-[64px] font-bold text-[#F5F5F5] tracking-tighter leading-[1.1] max-w-[640px]"
                >
                  Operational Intelligence. <br />
                  <span className="text-[#0445a4]">Built to Deploy.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-6 text-[16px] md:text-[18px] text-[#888888] leading-relaxed max-w-[520px]"
                >
                  GreyShacks gives mid-market operations teams a structured system to eliminate manual work, track what matters, and scale what works — without the guesswork.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-10 flex flex-col sm:flex-row gap-4"
                >
                  <Button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="bg-[#0445a4] text-white hover:bg-[#0445a4]/90 px-8 py-6 text-sm font-semibold tracking-wider uppercase w-full sm:w-auto min-h-[56px]"
                  >
                    Request a Diagnostic
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    asChild
                    className="border-[#333333] text-[#F5F5F5] hover:border-[#0445a4] hover:text-[#0445a4] px-8 py-6 text-sm font-semibold tracking-wider uppercase w-full sm:w-auto min-h-[56px]"
                  >
                    <Link href="/about">See How It Works</Link>
                  </Button>
                </motion.div>
              </div>

              <div className="lg:col-span-5 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative w-full aspect-square flex items-center justify-center"
                >
                  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 50H350V350H50V50Z" stroke="#222222" strokeWidth="1" />
                    <path d="M50 150H350" stroke="#222222" strokeWidth="1" />
                    <path d="M50 250H350" stroke="#222222" strokeWidth="1" />
                    <path d="M150 50V350" stroke="#222222" strokeWidth="1" />
                    <path d="M250 50V350" stroke="#222222" strokeWidth="1" />
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      d="M50 150H150V250H350" 
                      stroke="#0445a4" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                    />
                    <circle cx="50" cy="150" r="4" fill="#0445a4" />
                    <circle cx="150" cy="150" r="4" fill="#333333" />
                    <circle cx="150" cy="250" r="4" fill="#0445a4" />
                    <circle cx="250" cy="250" r="4" fill="#333333" />
                    <circle cx="350" cy="250" r="4" fill="#0445a4" />
                    <motion.circle 
                      animate={{ r: [4, 8, 4], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      cx="150" cy="250" r="4" stroke="#0445a4" strokeWidth="1" fill="none" 
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* THE PLATFORM SECTION */}
        <section className="py-24 bg-[#0A0A0A] border-t border-[#1A1A1A]">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="text-[11px] font-bold tracking-[0.12em] text-[#0445a4] uppercase mb-4 block">THE PLATFORM</span>
              <h2 className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] tracking-tight leading-[1.1] mb-6">
                Every operation. Every platform.<br />
                <span className="text-white">One place.</span>
              </h2>
              <p className="text-[16px] md:text-[17px] text-[#888888] leading-relaxed max-w-[720px] mx-auto">
                You've spent years switching between platforms, chasing approvals in inboxes, and reconciling data across tools that don't talk to each other. GreyShacks ends that. Every workflow, every alert, every decision — surfaced, prioritised, and actioned from a single intelligent layer.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
              {[
                { icon: Infinity, t: "Always On", d: "GreyShacks monitors your operations 24/7, not just when you remember to check." },
                { icon: Layout, t: "Zero Platform Switching", d: "Every approval, alert, and action lives in one interface. Your 12 open tabs become one." },
                { icon: ShieldCheck, t: "Nothing Slips Through", d: "Priority scoring ensures critical items — approvals, escalations, deadlines — are never buried." },
                { icon: LineChart, t: "Gets Smarter Over Time", d: "The longer GreyShacks runs, the better it understands your operation's patterns and priorities." }
              ].map((item, i) => (
                <Card key={i} className="p-10 flex flex-col items-center text-center group">
                  <item.icon className="w-8 h-8 text-[#0445a4] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">{item.t}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed">{item.d}</p>
                </Card>
              ))}
            </div>

            <div className="max-w-4xl mx-auto p-12 bg-[#0445a4]/5 border border-[#0445a4]/20 rounded-xl">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                You're not adding another tool. You're replacing the chaos.
              </h3>
              <p className="text-[#888888] text-sm md:text-base mb-10">
                The first platform that treats operational intelligence as a product — not a consulting engagement.
                Once in a lifetime opportunity to use the magic to solve your every problem without moving from the platform.
              </p>
              <Button 
                onClick={() => setIsIntakeOpen(true)}
                className="bg-transparent border border-white/10 hover:border-[#0445a4] text-white hover:text-[#0445a4] px-10 py-6 text-sm font-bold uppercase tracking-widest"
              >
                See It In Action
              </Button>
            </div>
          </div>
        </section>

        {/* WHAT WE DO SECTION — NEXT-GEN DESIGN */}
        <section className="py-32 border-t border-[#1A1A1A] bg-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#0445a4] uppercase mb-6 block">WHAT WE DO</span>
              <h2 className="text-[40px] md:text-[64px] font-bold text-[#F5F5F5] tracking-tight leading-[1] mb-8">
                Next-gen operational <br /> intelligence features.
              </h2>
              <p className="text-[18px] md:text-[20px] text-[#888888] leading-relaxed max-w-[600px]">
                GreyShacks maps your operations, identifies the highest-friction workflows, and deploys systems that run without manual oversight.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative aspect-[4/5] rounded-[32px] overflow-hidden flex flex-col justify-end p-10 cursor-pointer"
                >
                  {/* Mesh Gradient Background */}
                  <div 
                    className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: feature.gradient }}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 backdrop-blur-[80px]" />
                  
                  {/* Subtle noise/texture overlay */}
                  <div className="absolute inset-0 noise-bg opacity-[0.05] pointer-events-none" />

                  {/* Top Plus Icon */}
                  <div className="absolute top-8 right-8">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Content (Bottom Aligned) */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed max-w-[280px] group-hover:text-white transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-24 border-t border-[#1A1A1A] bg-[#0A0A0A]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <span className="text-[11px] font-medium tracking-[0.12em] text-[#0445a4] uppercase mb-4 block">HOW IT WORKS</span>
              <h2 className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] tracking-[-0.02em] leading-[1.1]">From diagnostic to deployment in weeks, not quarters.</h2>
            </motion.div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px border-t border-dashed border-[#2A2A2A] z-0" />
              
              {[
                { n: "01", t: "Operational Diagnostic", d: "We spend 2 weeks inside your operations — mapping workflows, measuring friction, and identifying the highest-ROI automation targets.", dur: "2 Weeks" },
                { n: "02", t: "Pilot Deployment", d: "We deploy a scoped system against one priority workflow. You see real results in your real environment before committing to scale.", dur: "4–6 Weeks" },
                { n: "03", t: "Production Rollout", d: "Once the pilot validates ROI, we systematically expand to adjacent workflows — with full measurement and governance built in.", dur: "Ongoing" }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col"
                >
                  <div className="text-[48px] font-bold text-[#0445a4] opacity-40 leading-none mb-6 font-display">
                    {step.n}
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#F5F5F5] mb-4 tracking-tight">{step.t}</h3>
                  <p className="text-[15px] text-[#888888] leading-relaxed mb-6">{step.d}</p>
                  <div className="mt-auto">
                    <span className="inline-block bg-[#111111] text-[#0445a4] text-[12px] font-bold px-3 py-1 rounded-full border border-[#222222]">
                      {step.dur}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Assurance Strip */}
          <div className="mt-24 bg-[#111111] border-y border-[#1E1E1E] py-8">
            <div className="container mx-auto px-6 flex items-center justify-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0445a4] shrink-0" />
              <p className="text-[14px] md:text-[15px] italic text-[#888888] text-center max-w-[480px]">
                No pilot is approved without a defined measurement framework. If we can't measure it, we don't deploy it.
              </p>
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL METRICS STRIP */}
        <section className="bg-[#111111] border-y border-[#1E1E1E] py-12 md:py-[48px]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center">
              {/* Metric 1 */}
              <div className="flex flex-col gap-2 px-4 border-b md:border-b-0 md:border-r border-[#1E1E1E] pb-8 md:pb-0">
                <div className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] leading-none tracking-tighter">
                  <CountUp value={190} suffix="+" />
                </div>
                <div className="text-[13px] text-[#888888] max-w-[160px] leading-tight mt-1">
                  Workflows Automated
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col gap-2 px-4 mt-8 md:mt-0 border-b md:border-b-0 md:border-r border-[#1E1E1E] pb-8 md:pb-0">
                <div className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] leading-none tracking-tighter whitespace-nowrap">
                  8–14 wk
                </div>
                <div className="text-[13px] text-[#888888] max-w-[160px] leading-tight mt-1">
                  Typical ROI Window
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col gap-2 px-4 mt-8 md:mt-0">
                <div className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] leading-none tracking-tighter">
                  <CountUp value={30} suffix="+" />
                </div>
                <div className="text-[13px] text-[#888888] max-w-[160px] leading-tight mt-1">
                  Production Deployments
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-[10px] italic text-[#555555]">
                Figures represent aggregate outcomes across client deployments from Q3 2023–Q1 2026.
              </p>
            </div>
          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section className="bg-[#111111] py-24 border-b border-[#222222]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <h2 className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] tracking-tight">Industries We Operate In</h2>
              <p className="mt-4 text-[#888888] text-lg">We deploy production-grade systems across core business verticals.</p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { t: "Manufacturing", d: "Production quality, procurement, and vendor operations" },
                { t: "Real Estate", d: "Lead operations, sales follow-up, and documentation workflows" },
                { t: "Logistics", d: "Exception management, PO tracking, and delivery reconciliation" },
                { t: "Healthcare", d: "Scheduling, claims pre-processing, and patient communications" },
                { t: "Professional Services", d: "Contract intelligence, billing operations, and reporting" }
              ].map((ind, i) => (
                <div key={i} className="bg-[#0A0A0A] border border-[#1E1E1E] p-8 rounded-xl hover:border-[#2A2A2A] transition-all group">
                  <h3 className="text-lg font-bold text-[#F5F5F5] mb-2 group-hover:text-[#0445a4] transition-colors">{ind.t}</h3>
                  <p className="text-[14px] text-[#888888] leading-relaxed">{ind.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATIONS SECTION — NEW SPLIT LAYOUT */}
        <section className="py-32 bg-black overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              {/* Left Column: Editorial Content */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-6">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[40px] md:text-[56px] font-bold text-white tracking-tight leading-[1.05]"
                  >
                    Works inside the stack <br className="hidden md:block" /> you already run.
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-[18px] md:text-[20px] text-[#888888] leading-relaxed max-w-[540px]"
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
                    className="bg-[#1A1A1A] text-white border border-white/10 hover:border-white/30 rounded-full px-10 py-7 text-sm font-semibold tracking-wide"
                  >
                    Get started
                  </Button>
                </motion.div>
              </div>

              {/* Right Column: Visual Proof Grid */}
              <div className="lg:col-span-5 relative">
                <div 
                  className="grid grid-cols-3 gap-8 md:gap-12"
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
                      transition={{ delay: i * 0.03 }}
                      className="group flex flex-col items-center justify-center gap-3"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-[#0F0F0F] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#1A1A1A] group-hover:border-white/10 group-hover:scale-110">
                        <platform.icon className="w-7 h-7 text-[#444] transition-colors duration-500 group-hover:text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Visual Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0445a4]/5 rounded-full blur-[120px] pointer-events-none" />
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[14px] text-[#555555]">
                Don't see your stack? We've integrated with <span className="text-white font-semibold">40+ platforms</span>.
              </p>
              <button 
                onClick={() => setIsIntakeOpen(true)}
                className="text-white/40 hover:text-white text-[13px] font-medium tracking-wide flex items-center gap-2 transition-colors"
              >
                Talk to an Integration Specialist
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* DIAGNOSTIC CTA */}
        <DiagnosticCTA onOpenIntake={() => setIsIntakeOpen(true)} />
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}
