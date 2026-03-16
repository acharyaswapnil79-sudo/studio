"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { MethodologyModal } from '@/components/MethodologyModal';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const CAPABILITIES_LIST = [
  { id: 'screening', title: 'Candidate Screening & Scheduling', outcome: '70% reduction in recruitment time', approach: 'End-to-end hiring pipeline management — resume parsing, role-fit evaluation, shortlisting, and interview coordination handled by the system.' },
  { id: 'leads', title: 'Intelligent Lead Operations', outcome: 'Instant lead qualification at scale', approach: 'Inbound lead capture, enrichment, scoring, and routing — the system qualifies, prioritizes, and assigns leads without a human in the loop.' },
  { id: 'ar', title: 'Accounts Receivable Operations', outcome: 'DSO reduction by 15-20 days', approach: 'Invoice issuance, payment tracking, follow-up sequencing, dispute flagging, and reconciliation handled end-to-end by the system.' },
  { id: 'finance', title: 'Financial Close & Reporting', outcome: 'Close cycles reduced by 4 days', approach: 'Data ingestion, multi-source reconciliation, anomaly detection, and report generation delivered to role-based dashboards.' },
  { id: 'sales', title: 'Autonomous Sales Follow-Up', outcome: '2.5x increase in meeting volume', approach: 'Prospect behaviour tracking and response-based outreach sequences handled by the system for consistent engagement.' },
  { id: 'procurement', title: 'Procurement & Vendor Operations', outcome: '80% faster PO processing', approach: 'Vendor communication, purchase order tracking, delivery confirmation, and invoice reconciliation handled by the system.' },
  { id: 'customer', title: 'Customer Query Resolution', outcome: '90% automated resolution rate', approach: 'Customer questions classified, resolved, or routed with full context so your team only handles complex cases.' },
  { id: 'reporting', title: 'Operations Reporting & Alerting', outcome: 'Real-time KPI visibility', approach: 'Operational data aggregated across systems to generate leadership reports, KPI dashboards, and real-time alerts.' },
  { id: 'contracts', title: 'Contract & Document Intelligence', outcome: 'Zero missed renewal deadlines', approach: 'Contract ingestion, clause extraction, obligation tracking, and renewal alerts managed by the system.' },
  { id: 'compliance', title: 'Compliance & Audit Trail Management', outcome: '100% audit readiness', approach: 'Every system decision logged with context, timestamp, and decision logic — producing audit-ready operational histories.' }
];

export default function CapabilitiesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Command Center", href: "/#hero" },
    { name: "Operational Impact", href: "/#operational-impact" },
    { name: "Capabilities", href: "/#capabilities" },
    { name: "Case Studies", href: "/#case-studies" },
    { name: "Insights", href: "/#insights" }
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    // If it's an anchor on the home page, let the default Link behavior handle it or redirect
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-body text-white selection:bg-blue-900/30">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="capabilities"
        handleNavClick={handleNavClick}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="mb-16 max-w-4xl">
            <h1 className="font-headline font-semibold text-4xl md:text-6xl mb-8 leading-tight">
              Capabilities — Agentic Systems for Mid-Market and Enterprise Operations
            </h1>
            <p className="text-[#A0A0A0] text-xl md:text-2xl leading-relaxed mb-10">
              We design and deploy agentic systems that handle end-to-end business processes with minimal to zero human intervention. Every engagement starts with a structured diagnosis, runs through a time-boxed pilot with weekly measurement, and scales with full governance and observability built in.
            </p>

            <div className="bg-[#111] border border-[#0047AB]/30 p-8 rounded-xl mb-12">
              <p className="text-white text-lg leading-relaxed">
                GreyShacks builds agentic systems — not scripts, not triggers, not RPA. Our systems observe inputs, reason across context, and act end-to-end. Human intervention is the exception, not the default.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="font-bold text-lg mb-4">What We Don't Do</h3>
              <p className="text-[#A0A0A0] text-lg leading-relaxed">
                We don’t build generic software. Every engagement is scoped to a specific operational problem, measured against your baseline, and designed to run in your existing systems stack.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-white/60 font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#0047AB]" />
              Currently deployed across 14 operational environments.
            </div>
          </div>

          {/* How We Engage */}
          <section className="mb-24 border-t border-white/5 pt-16">
            <h2 className="font-headline text-3xl md:text-4xl mb-12">How We Engage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-[#0047AB] font-bold text-lg">Phase 1 — Discovery (2–4 weeks)</div>
                <p className="text-[#A0A0A0] leading-relaxed">
                  We map your current operational workflows, identify the highest-impact opportunities, capture KPI baselines, and align with your team on scope and success criteria before a single system is built.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-[#0047AB] font-bold text-lg">Phase 2 — Pilot (4–8 weeks)</div>
                <p className="text-[#A0A0A0] leading-relaxed">
                  A production-safe, scoped pilot on your highest-priority process. We measure weekly against the baseline, share results transparently, and only proceed to scale when the numbers support it.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-[#0047AB] font-bold text-lg">Phase 3 — Scale & Govern (ongoing)</div>
                <p className="text-[#A0A0A0] leading-relaxed">
                  Phased rollout across processes with continuous monitoring, anomaly alerting, full audit trails, and regular business reviews. Your team retains full visibility and control at every stage.
                </p>
              </div>
            </div>
          </section>

          {/* Core Agentic Systems */}
          <section className="mb-24 border-t border-white/5 pt-16">
            <div className="mb-12">
              <h2 className="font-headline text-3xl md:text-4xl mb-4">Core Agentic Systems</h2>
              <p className="text-[#A0A0A0] text-lg max-w-3xl">
                These are not workflow triggers or RPA scripts. These are systems that observe, reason, and act — handling end-to-end processes the way a trained operator would, without the bottlenecks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {CAPABILITIES_LIST.map((item) => (
                <div key={item.id} className="bg-[#111] border border-white/5 p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="md:w-1/3">
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <div className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider">{item.outcome}</div>
                  </div>
                  <div className="md:w-2/3 text-[#A0A0A0] leading-relaxed">
                    {item.approach}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Measurement & Outcomes */}
          <section className="mb-24 border-t border-white/5 pt-16">
            <h2 className="font-headline text-3xl md:text-4xl mb-8">Expected Outcomes & Measurement</h2>
            <p className="text-[#A0A0A0] text-lg max-w-4xl leading-relaxed mb-12">
              Our engagements follow a three-stage measurement model. We capture a 4-week operational baseline before any system goes live, measure weekly during the pilot against that baseline, and project annualized impact using realized pilot data — not assumptions. Where figures are projections, we say so explicitly. We do not publish averages we cannot support. Full methodology and anonymized pilot data available under NDA on request.
            </p>

            <div className="mb-16">
              <h3 className="text-xl font-bold mb-6">Typical Outcome Ranges</h3>
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10">
                      <TableHead className="text-white font-bold">Metric</TableHead>
                      <TableHead className="text-white font-bold">Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-white/5">
                      <TableCell className="text-[#A0A0A0]">Manual task reduction</TableCell>
                      <TableCell className="text-white font-medium">50–85% (process dependent)</TableCell>
                    </TableRow>
                    <TableRow className="border-white/5">
                      <TableCell className="text-[#A0A0A0]">Time to measurable ROI</TableCell>
                      <TableCell className="text-white font-medium">8–14 weeks</TableCell>
                    </TableRow>
                    <TableRow className="border-white/5">
                      <TableCell className="text-[#A0A0A0]">Pilot duration</TableCell>
                      <TableCell className="text-white font-medium">4–8 weeks</TableCell>
                    </TableRow>
                    <TableRow className="border-white/5">
                      <TableCell className="text-[#A0A0A0]">Annualized savings</TableCell>
                      <TableCell className="text-white font-medium">varies by process scope</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsIntakeOpen(true)}
                className="bg-[#0047AB] text-white font-bold text-[14.5px] px-8 py-4 rounded-[7px] shadow-lg flex items-center gap-2"
              >
                Request pilot methodology — we’ll send it under a mutual NDA within 48 hours.
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-12 px-6 md:px-10 border-t border-white/5 text-center text-[#A0A0A0] text-sm">
        <div className="max-w-[1240px] mx-auto">
          &copy; {new Date().getFullYear()} GreyShacks. All decisions logged and audit-ready.
        </div>
      </footer>

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="capabilities"
        handleNavClick={handleNavClick}
      />

      <MethodologyModal 
        isOpen={isMethodologyOpen} 
        onClose={() => setIsMethodologyOpen(false)} 
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <IntakeFormModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </div>
  );
}
