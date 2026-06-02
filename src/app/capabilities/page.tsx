"use client"

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Database, Zap, Activity, Users, FileText, ShoppingCart, MessageSquare, ShieldCheck } from 'lucide-react';

const SYSTEMS = [
  { icon: Activity, t: "Lead Operations", b: "Capture, enrichment, and qualification without human triage. Response times under 5 minutes." },
  { icon: Users, t: "Candidate Screening", b: "Resume parsing and role-fit scoring synchronized with interview availability." },
  { icon: Database, t: "Accounts Receivable", b: "Follow-up sequencing and bank-to-ledger reconciliation managed end-to-end." },
  { icon: Zap, t: "Financial Close", b: "Multi-source reconciliation and report generation with full audit transparency." },
  { icon: ShoppingCart, t: "Vendor Coordination", b: "PO tracking, delivery confirmation, and discrepancy flagging." },
  { icon: MessageSquare, t: "Customer Triage", b: "90% automated resolution for Tier-1 queries; structured handoffs for complexity." },
  { icon: FileText, t: "Document Intelligence", b: "Obligation extraction and renewal alerting for contract management." },
  { icon: ShieldCheck, t: "Compliance Monitoring", b: "24/7 logging of system decisions against regulatory frameworks." }
];

export default function CapabilitiesPage() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} activeSection="capabilities" />
      
      <main className="pt-40 pb-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mb-24">
            <h1 className="font-display text-5xl md:text-8xl text-[#F5F5F5] leading-[0.9] mb-8">
              Operational Cores.
            </h1>
            <p className="text-[#888] text-xl md:text-2xl leading-relaxed">
              We design and deploy agentic systems that operate inside your existing stack. These aren't just triggers; they are decision-engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222] border border-[#222]">
            {SYSTEMS.map((s, i) => (
              <div key={i} className="bg-[#111] p-12 hover:bg-[#1A1A1A] transition-all group border-b border-r border-[#222]">
                <s.icon className="w-8 h-8 text-[#4DFFB4] mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl text-[#F5F5F5] mb-4 font-display tracking-tight">{s.t}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>

          <div className="mt-40 border-t border-[#222] pt-24 grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-3xl text-[#F5F5F5] font-display mb-8">Production Stability.</h2>
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
                  <div key={i} className="flex items-center gap-4 text-[#F5F5F5] text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4DFFB4]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#111] border border-[#222] p-12 rounded-[4px]">
              <h3 className="text-[#F5F5F5] font-display text-2xl mb-6">Request Diagnostic</h3>
              <p className="text-[#888] text-sm leading-relaxed mb-10">
                We take a limited number of diagnostic engagements each quarter. Start with a structured audit of your manual latency.
              </p>
              <button 
                onClick={() => setIsIntakeOpen(true)}
                className="w-full py-4 bg-[#F5F5F5] text-[#0A0A0A] font-bold text-xs uppercase tracking-[0.2em] rounded-[2px] hover:bg-[#4DFFB4] transition-all"
              >
                Apply for Diagnostic
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}