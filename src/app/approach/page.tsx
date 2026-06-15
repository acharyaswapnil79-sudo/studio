"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { PrincipleCard } from '@/components/approach/PrincipleCard';
import { PhaseCard } from '@/components/approach/PhaseCard';
import { MediaPlaceholder } from '@/components/shared/MediaPlaceholder';
import { 
  ShieldCheck, 
  Target, 
  Zap, 
  LineChart, 
  CheckSquare, 
  MessageSquare,
  ArrowRight,
  Plus,
  Mic,
  Volume2
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
          <div className="mb-16">
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
            <div className="max-w-3xl mb-24">
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
              <MediaPlaceholder 
                type="flow" 
                label="Process Flow: From Diagnostic Handoff to Production Stability" 
                className="h-[300px]"
              />
            </div>
          </div>
        </section>

        {/* How It Looks in Practice (UI Mockups) */}
        <section className="container mx-auto px-6 py-24 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
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
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#111] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0445a4]/10 blur-[100px] rounded-full" />
                
                {/* Simulated UI Mockup */}
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-3">
                    <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold text-white/40">
                      <CheckSquare className="w-3.5 h-3.5" /> Approve P.O.s
                    </div>
                    <div className="bg-[#0445a4]/10 border border-[#0445a4]/30 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold text-[#0445a4]">
                      <Plus className="w-3.5 h-3.5" /> Reconcile AR
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#0445a4]/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#0445a4]" />
                      </div>
                      <div className="text-sm font-bold text-white tracking-tight">System Status: Active</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0445a4] w-2/3" />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-[#444] uppercase tracking-widest">
                        <span>Sync Progress</span>
                        <span>67% COMPLETE</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                      <Mic className="w-4 h-4 text-white/20" />
                      <span className="text-white/40 text-sm font-medium italic">Ask anything about your operations...</span>
                    </div>
                    <div className="w-full h-16 bg-white/5 border border-white/10 rounded-full px-4 flex items-center justify-end">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group cursor-pointer hover:bg-[#0445a4] transition-colors">
                        <Volume2 className="w-4 h-4 text-black group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12">
          <MediaPlaceholder 
            type="graph" 
            label="Insert Graph: Baseline vs Pilot Performance for N=14 Deployments" 
            className="h-[400px]"
          />
        </section>

        <DiagnosticCTA onOpenIntake={() => setIsIntakeOpen(true)} />
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}
