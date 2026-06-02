"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { ArrowRight, ChevronRight, Activity, Zap, Shield, BarChart3, Database } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function GreyShacksHome() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="relative min-h-screen selection:bg-[#4DFFB4]/30">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} activeSection={activeSection} />
      
      <main>
        {/* HERO */}
        <section id="hero" className="relative flex flex-col items-center justify-center overflow-hidden min-h-[90vh] border-b border-[#222]">
          <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
          <div className="absolute inset-0 noise-bg" />
          
          <div className="container relative z-10 px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[11px] font-medium tracking-widest uppercase border rounded-full border-[#222] bg-[#111] text-[#888]"
            >
              <div className="w-1 h-1 rounded-full bg-[#4DFFB4]" />
              Operational Intelligence v2.0
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-8xl lg:text-[100px] leading-[0.9] mb-8 text-[#F5F5F5] max-w-5xl mx-auto"
            >
              Eliminate Manual Latency.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#888] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              GreyShacks builds production-grade agentic systems that replace manual process bottlenecks with measurable operational cores.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => setIsIntakeOpen(true)}
                className="group relative flex items-center justify-center gap-2 bg-[#4DFFB4] text-[#0A0A0A] font-bold text-[15px] px-10 py-5 rounded-[4px] hover:scale-[1.02] transition-all mint-glow"
              >
                Request an Operational Diagnostic
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
          
          {/* Abstract Ops Diagram */}
          <div className="mt-20 container px-6 mx-auto">
            <div className="h-[1px] w-full bg-[#222]" />
            <div className="grid grid-cols-4 h-24 border-x border-[#222]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={cn("border-r border-[#222] relative overflow-hidden", i === 3 && "border-r-0")}>
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#4DFFB4]/5 to-transparent"
                  />
                </div>
              ))}
            </div>
            <div className="h-[1px] w-full bg-[#222]" />
          </div>
        </section>

        {/* METRICS */}
        <section id="operational-impact" className="border-b border-[#222] bg-[#0A0A0A]">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: "Workflows Automated", value: "190+", sub: "Verified production deployments" },
                { label: "Annualized Savings", value: "$8M+", sub: "Conservative client median" },
                { label: "ROI Period", value: "3–6 Mo.", sub: "Observed payback window" }
              ].map((stat, i) => (
                <div key={i} className="group p-8 border border-[#222] bg-[#111] rounded-[4px] hover:border-[#4DFFB4]/30 transition-all">
                  <div className="text-[#888] text-[10px] uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className="text-4xl md:text-5xl font-display text-[#F5F5F5] mb-4">{stat.value}</div>
                  <div className="text-[#888] text-sm">{stat.sub}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/intelligence" className="text-[11px] font-bold text-[#888] hover:text-[#4DFFB4] transition-colors flex items-center justify-center gap-2">
                READ MEASUREMENT METHODOLOGY <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section id="capabilities" className="bg-[#111] border-b border-[#222]">
          <div className="container px-6 mx-auto">
            <div className="max-w-3xl mb-24">
              <h2 className="text-4xl md:text-6xl text-[#F5F5F5] mb-8 font-display">Systematic Efficiency.</h2>
              <p className="text-[#888] text-xl leading-relaxed">
                We design systems that observe, reason, and act across your operations stack. Minimal human intervention, audit-ready by design.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222] border border-[#222]">
              {[
                { icon: Database, t: "AR Operations", b: "End-to-end collections, reconciliation and escalation managed by the system." },
                { icon: Activity, t: "Lead Intelligence", b: "Intelligent triage, enrichment, and assignment with sub-5 minute response times." },
                { icon: Zap, t: "Close Cycles", b: "Automated data ingestion and reconciliation for month-end financial compression." },
                { icon: Shield, t: "Compliance", b: "Automated obligation monitoring and audit trail generation across all actions." }
              ].map((cap, i) => (
                <div key={i} className="bg-[#0A0A0A] p-10 hover:bg-[#111] transition-all">
                  <cap.icon className="w-6 h-6 text-[#4DFFB4] mb-6" />
                  <h3 className="text-xl text-[#F5F5F5] mb-4">{cap.t}</h3>
                  <p className="text-[#888] text-sm leading-relaxed">{cap.b}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-20 flex justify-center">
              <Link href="/capabilities">
                <button className="flex items-center gap-2 text-[13px] font-bold py-4 px-8 border border-[#222] rounded-[4px] text-[#F5F5F5] hover:bg-[#1A1A1A] transition-all">
                  Full Capabilities Catalog <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* METHODOLOGY */}
        <section id="how-we-work" className="bg-[#0A0A0A]">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl text-[#F5F5F5] mb-10 font-display">Baseline-First<br />Deployment.</h2>
                <div className="space-y-12">
                  {[
                    { step: "01", t: "Mapping & Measurement", b: "We capture 4 weeks of operational data before proposing a single system change. We don't guess impact." },
                    { step: "02", t: "Parallel Pilot", b: "A 4-8 week production-safe parallel run. We only proceed if the pilot delta matches projections." },
                    { step: "03", t: "Sustained Scale", b: "Continuous monitoring, anomaly detection, and quarterly logic calibration to prevent drift." }
                  ].map((p, i) => (
                    <div key={i} className="flex gap-8">
                      <div className="text-[12px] font-bold text-[#4DFFB4] font-mono mt-1">{p.step}</div>
                      <div>
                        <h3 className="text-xl text-[#F5F5F5] mb-2">{p.t}</h3>
                        <p className="text-[#888] leading-relaxed">{p.b}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Abstract Visual Geometry */}
              <div className="relative aspect-square border border-[#222] p-12 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 noise-bg opacity-5" />
                <div className="w-full h-full border border-[#222] rounded-full flex items-center justify-center">
                  <div className="w-[80%] h-[80%] border border-[#222] rounded-full flex items-center justify-center">
                    <div className="w-[60%] h-[60%] border border-[#4DFFB4]/20 rounded-full flex items-center justify-center relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-2px] border-t-2 border-[#4DFFB4] rounded-full"
                      />
                      <div className="text-[#4DFFB4] font-mono text-[10px] tracking-tighter">OPERATING_SYSTEM_STABLE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      
      <IntakeFormModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </div>
  );
}