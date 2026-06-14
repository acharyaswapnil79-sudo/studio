
"use client"

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { 
  Database, 
  Bot, 
  RefreshCcw, 
  Wand2, 
  Network, 
  ShieldCheck, 
  PlayCircle, 
  UserCheck, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DATA_CAPABILITIES = [
  {
    icon: RefreshCcw,
    t: "Ingestion & Normalization",
    d: "Connect disparate sources and bring data into consistent, structured formats ready for agent consumption."
  },
  {
    icon: Wand2,
    t: "Enrichment & Reconciliation",
    d: "Automatically enrich records and reconcile conflicting data across systems with clear audit history."
  },
  {
    icon: Network,
    t: "Semantic Structure",
    d: "Create canonical models and relationships that agents can reliably reason over and act upon."
  },
  {
    icon: ShieldCheck,
    t: "Lineage & Governance",
    d: "Every change is tracked. Full data lineage and governance built into the foundation from day one."
  }
];

const AGENT_CAPABILITIES = [
  {
    icon: PlayCircle,
    t: "End-to-End Execution",
    d: "Agents handle complete workflows from trigger to resolution, including multi-step processes and cross-system actions."
  },
  {
    icon: UserCheck,
    t: "Exception Handling by Design",
    d: "Humans stay in the loop only for true exceptions. Agents manage the repetitive, high-volume work reliably."
  },
  {
    icon: BarChart3,
    t: "Built-in Measurement",
    d: "Every agent deployment includes live dashboards comparing performance against your established baseline."
  }
];

export default function CapabilitiesPage() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0A] min-h-screen selection:bg-[#0445a4]/30">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} activeSection="capabilities" />
      
      <main className="pt-32 md:pt-48 pb-0">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-4xl mb-24 md:mb-32">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[1] mb-8"
            >
              Two integrated capabilities. <br />
              <span className="text-white/40 italic">One powerful foundation.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#888] text-xl md:text-2xl leading-relaxed max-w-2xl"
            >
              We design and deploy agentic systems that operate inside your existing stack. These aren't just triggers; they are decision-engines.
            </motion.p>
          </div>

          <div className="space-y-12 md:space-y-20 mb-32">
            {/* Pillar 1: Organizing Data */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111]/40 border border-white/5 rounded-[32px] p-8 md:p-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
                <div className="lg:col-span-4 space-y-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center">
                    <Database className="w-6 h-6 text-[#0445a4]" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Organizing Data</h2>
                    <p className="text-[#888] leading-relaxed">
                      The quality of any agent system is limited by the quality of its data foundation. We build that foundation properly.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="flex items-center gap-2 text-[#0445a4] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors group"
                  >
                    Discuss your data challenges 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {DATA_CAPABILITIES.map((cap, i) => (
                    <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:border-[#0445a4]/30 transition-all group">
                      <cap.icon className="w-5 h-5 text-[#0445a4] mb-6" />
                      <h3 className="text-white font-bold mb-3 tracking-tight">{cap.t}</h3>
                      <p className="text-sm text-[#666] leading-relaxed group-hover:text-[#888] transition-colors">{cap.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Pillar 2: Deep Agents */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111]/40 border border-white/5 rounded-[32px] p-8 md:p-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
                <div className="lg:col-span-4 space-y-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-[#0445a4]" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Deep Agents</h2>
                    <p className="text-[#888] leading-relaxed">
                      Not chatbots. Production-grade agents that execute real operational workflows with reliability, governance, and measurable results.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-8 space-y-4">
                  {AGENT_CAPABILITIES.map((cap, i) => (
                    <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:border-[#0445a4]/30 transition-all group flex items-start gap-6">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#0445a4]/10 transition-colors">
                        <cap.icon className="w-5 h-5 text-[#444] group-hover:text-[#0445a4] transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-2 tracking-tight">{cap.t}</h3>
                        <p className="text-sm text-[#666] leading-relaxed group-hover:text-[#888] transition-colors">{cap.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Integration Logic: Data + Agents */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="py-24 text-center"
            >
              <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                  Data + Agents = Reliable Autonomy
                </h2>
                <p className="text-[#888] text-lg leading-relaxed">
                  The two capabilities are deeply integrated. Clean data makes agents more accurate. Reliable agents improve data quality over time.
                </p>
              </div>

              <div className="bg-[#0D0D0D] border border-white/5 p-10 md:p-16 rounded-[40px] text-left shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
                  <div className="space-y-4">
                    <span className="text-[#0445a4] text-[10px] font-bold tracking-[0.25em] uppercase">01 — FOUNDATION</span>
                    <h3 className="text-white font-bold text-xl tracking-tight">Organized Data Layer</h3>
                    <p className="text-sm text-[#666] leading-relaxed">The single source of truth that agents can trust.</p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[#0445a4] text-[10px] font-bold tracking-[0.25em] uppercase">02 — EXECUTION</span>
                    <h3 className="text-white font-bold text-xl tracking-tight">Deep Agent Core</h3>
                    <p className="text-sm text-[#666] leading-relaxed">Autonomous execution with governance and exception routing.</p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[#0445a4] text-[10px] font-bold tracking-[0.25em] uppercase">03 — FEEDBACK</span>
                    <h3 className="text-white font-bold text-xl tracking-tight">Continuous Improvement</h3>
                    <p className="text-sm text-[#666] leading-relaxed">Outcomes feed back into data quality and agent refinement.</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          <div className="mt-40 border-t border-white/5 py-24 grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-3xl text-white font-bold mb-8 tracking-tight">Production Stability.</h2>
              <p className="text-[#888] text-lg leading-relaxed mb-12">
                GreyShacks systems are designed for high-uptime, high-integrity environments. Every decision is logged, and exception handling is explicit.
              </p>
              <div className="space-y-6">
                {[
                  "No generic 'wrappers' or prototypes",
                  "Native API integrations for zero-lag data",
                  "SOC2-compliant audit trail architecture",
                  "Weekly performance reporting vs baseline"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0445a4]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#0D0D0D] border border-white/5 p-12 rounded-[20px]">
              <h3 className="text-white text-2xl font-bold mb-6 tracking-tight">Request Diagnostic</h3>
              <p className="text-[#888] text-sm leading-relaxed mb-10">
                We take a limited number of diagnostic engagements each quarter. Start with a structured audit of your manual latency.
              </p>
              <button 
                onClick={() => setIsIntakeOpen(true)}
                className="w-full py-5 bg-[#0445a4] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:opacity-90 transition-all shadow-xl shadow-[#0445a4]/10"
              >
                Apply for Diagnostic
              </button>
            </div>
          </div>
        </div>

        <DiagnosticCTA onOpenIntake={() => setIsIntakeOpen(true)} />
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}
