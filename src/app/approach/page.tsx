"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { PrincipleCard } from '@/components/approach/PrincipleCard';
import { PhaseCard } from '@/components/approach/PhaseCard';
import { PerformanceSimulator } from '@/components/approach/PerformanceSimulator';
import { AnimatedProcessFlow } from '@/components/approach/AnimatedProcessFlow';
import { 
  ShieldCheck, 
  Target, 
  Zap, 
  LineChart, 
  ArrowRight
} from 'lucide-react';

const PRINCIPLES = [
  {
    icon: Target,
    title: "Measurement First",
    description: "We don't deploy logic based on assumptions. Every engagement begins with a 4-week rigorous baseline of manual performance."
  },
  {
    icon: ShieldCheck,
    title: "Governance by Default",
    description: "Every decision an agent makes is logged, auditable, and reversible. Transparency is built into the system architecture."
  },
  {
    icon: Zap,
    title: "Native Integration",
    description: "We operate inside your existing stack. No new platforms to learn, no data migration, just direct API-level execution."
  },
  {
    icon: LineChart,
    title: "Pilot-to-Scale",
    description: "We only discuss production scaling after outcomes are mathematically proven in a scoped, live environment."
  }
];

export default function ApproachPage() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#0445a4]/30">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} activeSection="approach" />
      
      <main className="pt-32 md:pt-48 pb-0">
        {/* Institutional Hero */}
        <section className="container mx-auto px-6 mb-24 md:mb-40">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold tracking-[0.3em] text-[#0445a4] uppercase mb-8 block"
            >
              OUR APPROACH
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1] mb-12"
            >
              Built on data. <br />
              <span className="text-white/40 italic">Guided by governance.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#888] text-xl md:text-2xl leading-relaxed max-w-2xl"
            >
              GreyShacks isn't an AI vendor. We are a deployment firm that builds high-integrity systems for mid-market operations.
            </motion.p>
          </div>
        </section>

        {/* Core Principles Grid */}
        <section className="container mx-auto px-6 mb-32 md:mb-60">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Core Design Principles</h2>
            <p className="text-[#666] max-w-xl">Four non-negotiable architectural rules that guide every system we deploy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((p, i) => (
              <PrincipleCard key={i} {...p} />
            ))}
          </div>
        </section>

        {/* 3-Phase Engagement Model */}
        <section className="bg-black py-24 md:py-40 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-24 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">The Engagement Model</h2>
              <p className="text-[#888] text-lg leading-relaxed">
                Short, measured milestones. We prove value before we ask for commitment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <PhaseCard 
                number="01"
                title="Operational Diagnostic"
                description="A 4-week deep dive to map manual latency and establish precise baselines."
                bullets={[
                  "Operator-level process mapping",
                  "Manual hour census",
                  "ROI delta projection"
                ]}
              />
              <PhaseCard 
                number="02"
                title="Focused Pilot"
                description="A 6–10 week deployment against a scoped, high-impact workflow."
                bullets={[
                  "Live parallel run",
                  "Weekly performance dashboards",
                  "Governance model calibration"
                ]}
              />
              <PhaseCard 
                number="03"
                title="Production Deployment"
                description="Scaling to full production only after outcomes are mathematically verified."
                bullets={[
                  "End-to-end autonomous execution",
                  "Quarterly logic drift audits",
                  "24/7 stability monitoring"
                ]}
              />
            </div>

            <div className="mt-20">
              <AnimatedProcessFlow />
            </div>
          </div>
        </section>

        {/* How It Looks in Practice (Interactive Simulator) */}
        <section className="container mx-auto px-6 py-24 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">How It Looks in Practice</h2>
              <p className="text-[#888] text-lg leading-relaxed">
                Our systems don't just 'suggest' actions. They execute them inside your stack, with a clean layer of oversight for your team.
              </p>
              <div className="space-y-4">
                {[
                  "Context-aware input bars for rapid queries",
                  "Real-time approval orchestration",
                  "Audit-ready decision logs"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0445a4]" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <button 
                  onClick={() => setIsIntakeOpen(true)}
                  className="flex items-center gap-2 text-[#0445a4] text-xs font-bold uppercase tracking-[0.2em] group"
                >
                  Request diagnostic briefing
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <PerformanceSimulator />
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