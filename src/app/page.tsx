
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
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
  Wallet
} from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  {
    icon: Cpu,
    title: "Workflow Automation",
    desc: "We identify manual, recurring processes and replace them with agentic workflows that execute without human touchpoints."
  },
  {
    icon: BarChart3,
    title: "Operational Intelligence",
    desc: "Every deployment comes with a measurement layer — so you know exactly what changed, by how much, and why it matters."
  },
  {
    icon: ShieldCheck,
    title: "Audit-Ready Governance",
    desc: "Full traceability on every automated decision. Built for finance, compliance, and ops teams that need defensible outcomes."
  },
  {
    icon: Plug,
    title: "Systems Integration",
    desc: "GreyShacks connects to your existing stack — CRMs, ERPs, finance tools — without ripping and replacing what works."
  },
  {
    icon: Clock,
    title: "Rapid Time-to-Value",
    desc: "Most clients see measurable impact within 8–14 weeks. We pilot before we scale — no long commitments upfront."
  },
  {
    icon: Layers,
    title: "Production-First Deployment",
    desc: "We don't deliver prototypes. Every system goes into live operations — tested, monitored, and maintained."
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
    <div className="relative min-h-screen bg-[#0A0A0A] selection:bg-[#E8FF47]/30 overflow-hidden">
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
                  <span className="text-[#E8FF47]">Built to Deploy.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-6 text-[18px] text-[#888888] leading-relaxed max-w-[520px]"
                >
                  GreyShacks gives mid-market operations teams a structured system to eliminate manual work, track what matters, and scale what works — without the guesswork.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <Button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="bg-[#E8FF47] text-[#0A0A0A] hover:bg-[#E8FF47]/90 px-8 py-6 text-sm font-semibold tracking-wider uppercase"
                  >
                    Request a Diagnostic
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    asChild
                    className="border-[#333333] text-[#F5F5F5] hover:border-[#E8FF47] hover:text-[#E8FF47] px-8 py-6 text-sm font-semibold tracking-wider uppercase"
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
                      stroke="#E8FF47" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                    />
                    <circle cx="50" cy="150" r="4" fill="#E8FF47" />
                    <circle cx="150" cy="150" r="4" fill="#333333" />
                    <circle cx="150" cy="250" r="4" fill="#E8FF47" />
                    <circle cx="250" cy="250" r="4" fill="#333333" />
                    <circle cx="350" cy="250" r="4" fill="#E8FF47" />
                    <motion.circle 
                      animate={{ r: [4, 8, 4], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      cx="150" cy="250" r="4" stroke="#E8FF47" strokeWidth="1" fill="none" 
                    />
                  </svg>
                </motion.div>
              </div>
            </div>

            <div className="mt-24 lg:mt-32 pt-8 border-t border-[#1A1A1A] flex flex-wrap gap-4">
              {[
                { n: "190+", t: "Workflows Automated" },
                { n: "$8M+", t: "Annual Savings Tracked" },
                { n: "8–14 Week", t: "ROI" },
                { n: "30+", t: "Production Deployments" }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="bg-[#111111] border border-[#222222] rounded-full px-6 py-2 flex items-center gap-2"
                >
                  <span className="text-[#E8FF47] font-bold text-[13px]">{stat.n}</span>
                  <span className="text-[#888888] text-[13px]">{stat.t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE DO SECTION */}
        <section className="py-24 border-t border-[#1A1A1A]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] font-medium tracking-[0.12em] text-[#E8FF47] uppercase mb-4 block">WHAT WE DO</span>
              <h2 className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] max-w-[600px] tracking-[-0.02em] leading-[1.1]">One system. Every operational bottleneck.</h2>
              <p className="text-[17px] text-[#888888] leading-[1.65] max-w-[560px] mt-6">GreyShacks maps your operations, identifies the highest-friction workflows, and deploys intelligent systems that run without manual oversight.</p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, i) => (
                <Card key={i} className="group p-8">
                  <feature.icon className="w-6 h-6 text-[#E8FF47] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[20px] font-semibold text-[#F5F5F5] mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-[14px] text-[#888888] leading-relaxed">{feature.desc}</p>
                </Card>
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
              <span className="text-[11px] font-medium tracking-[0.12em] text-[#E8FF47] uppercase mb-4 block">HOW IT WORKS</span>
              <h2 className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] tracking-[-0.02em] leading-[1.1]">From diagnostic to deployment in weeks, not quarters.</h2>
            </motion.div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
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
                  <div className="text-[48px] font-bold text-[#E8FF47] opacity-40 leading-none mb-6 font-display">
                    {step.n}
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#F5F5F5] mb-4 tracking-tight">{step.t}</h3>
                  <p className="text-[14px] text-[#888888] leading-relaxed mb-6">{step.d}</p>
                  <div className="mt-auto">
                    <span className="inline-block bg-[#111111] text-[#E8FF47] text-[12px] font-bold px-3 py-1 rounded-full border border-[#222222]">
                      {step.dur}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Assurance Strip */}
          <div className="mt-24 bg-[#111111] border-y border-[#1E1E1E] py-6">
            <div className="container mx-auto px-6 flex items-center justify-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#E8FF47] shrink-0" />
              <p className="text-[15px] italic text-[#888888] text-center">
                No pilot is approved without a defined measurement framework. If we can't measure it, we don't deploy it.
              </p>
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL METRICS STRIP */}
        <section className="bg-[#111111] border-y border-[#1E1E1E] py-[48px]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center">
              {/* Metric 1 */}
              <div className="flex flex-col gap-2 px-4 md:border-r border-[#1E1E1E]">
                <div className="text-[48px] font-bold text-[#F5F5F5] leading-none tracking-tighter">
                  <CountUp value={190} suffix="+" />
                </div>
                <div className="text-[13px] text-[#888888] max-w-[160px] leading-tight">
                  Workflows Automated
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col gap-2 px-4 md:border-r border-[#1E1E1E]">
                <div className="text-[48px] font-bold text-[#F5F5F5] leading-none tracking-tighter">
                  <CountUp value={8} prefix="$" suffix="M+" />
                </div>
                <div className="text-[13px] text-[#888888] max-w-[160px] leading-tight">
                  Annual Savings Tracked Across Deployments
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col gap-2 px-4 mt-8 md:mt-0 md:border-r border-[#1E1E1E]">
                <div className="text-[48px] font-bold text-[#F5F5F5] leading-none tracking-tighter">
                  8–14 wk
                </div>
                <div className="text-[13px] text-[#888888] max-w-[160px] leading-tight">
                  Typical ROI Window
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col gap-2 px-4 mt-8 md:mt-0">
                <div className="text-[48px] font-bold text-[#F5F5F5] leading-none tracking-tighter">
                  <CountUp value={30} suffix="+" />
                </div>
                <div className="text-[13px] text-[#888888] max-w-[160px] leading-tight">
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
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: "Manufacturing", d: "Production quality, procurement, and vendor operations" },
                { t: "Real Estate", d: "Lead operations, sales follow-up, and documentation workflows" },
                { t: "Logistics", d: "Exception management, PO tracking, and delivery reconciliation" },
                { t: "Financial Services", d: "AR automation, compliance monitoring, and close cycle compression" },
                { t: "Healthcare", d: "Scheduling, claims pre-processing, and patient communications" },
                { t: "Professional Services", d: "Contract intelligence, billing operations, and reporting" },
                { t: "Retail", d: "Customer query resolution, refund workflows, and inventory ops" },
                { t: "SaaS", d: "Lead operations, onboarding automation, and access provisioning" }
              ].map((ind, i) => (
                <div key={i} className="bg-[#0A0A0A] border border-[#1E1E1E] p-8 rounded-xl hover:border-[#2A2A2A] transition-all group">
                  <h3 className="text-lg font-bold text-[#F5F5F5] mb-2 group-hover:text-[#E8FF47] transition-colors">{ind.t}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed">{ind.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATIONS SECTION */}
        <section className="py-24 bg-[#0A0A0A]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[11px] font-medium tracking-[0.12em] text-[#E8FF47] uppercase mb-4 block">INTEGRATIONS</span>
              <h2 className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] tracking-tight leading-[1.1]">Works inside the stack you already run.</h2>
              <p className="text-[17px] text-[#888888] leading-relaxed max-w-[640px] mx-auto mt-6">
                GreyShacks connects to your CRM, ERP, finance, and communication tools. No rip-and-replace. No new software to learn.
              </p>
            </motion.div>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3 md:gap-4 max-w-5xl mx-auto">
              {INTEGRATIONS.map((platform, i) => (
                <div 
                  key={i} 
                  className="group relative flex items-center justify-center bg-[#111111] border border-[#1E1E1E] rounded-[12px] aspect-square transition-all hover:border-[#2A2A2A] hover:bg-[#1A1A1A]"
                >
                  <platform.icon className="w-6 h-6 text-[#555555] group-hover:text-[#F5F5F5] transition-colors" />
                  
                  {/* Simple Tooltip Label */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#222222] text-[#F5F5F5] text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20">
                    {platform.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center space-y-8">
              <p className="text-[14px] text-[#888888]">
                Don't see your stack? We've integrated with <span className="text-[#E8FF47] font-bold">40+ platforms</span>.
              </p>
              <Button 
                variant="outline"
                onClick={() => setIsIntakeOpen(true)}
                className="px-10 py-6 text-sm font-semibold tracking-wider uppercase border-[#333333] hover:border-[#E8FF47]"
              >
                Talk to an Integration Specialist
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}
