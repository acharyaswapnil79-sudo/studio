"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { MethodologyModal } from '@/components/MethodologyModal';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Footer } from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, ArrowRight, Magnet, Repeat, Users, ReceiptText, BarChart3, ShoppingCart, MessageSquare, PieChart, FileText, ShieldCheck, Wallet, Activity, HardDrive, Key, Presentation } from 'lucide-react';

const SYSTEMS_BY_DOMAIN = [
  {
    domain: "Sales & Marketing",
    systems: [
      { 
        id: 'leads', 
        title: 'Intelligent Lead Operations', 
        icon: Magnet,
        outcome: 'Inbound→qualified ratio ↑; response time < 5 minutes.', 
        approach: 'Inbound lead capture, enrichment, scoring and routing handled by the system without human triage.' 
      },
      { 
        id: 'sales', 
        title: 'Autonomous Sales Follow-Up', 
        icon: Repeat,
        outcome: 'Reply→meeting conversion ↑; pipeline coverage ↑.', 
        approach: 'Behavior-triggered outreach sequences and reply classification; human reps intervene only on high-intent signals.' 
      },
      { 
        id: 'expansion', 
        title: 'Account Expansion Intelligence', 
        icon: Activity,
        outcome: 'Uplift in cross-sell leads; higher account coverage.', 
        approach: 'Automatically identifies expansion opportunities inside existing accounts and routes contextual recommendations to teams.' 
      }
    ]
  },
  {
    domain: "Talent & People Ops",
    systems: [
      { 
        id: 'screening', 
        title: 'Candidate Screening & Scheduling', 
        icon: Users,
        outcome: 'Screening time −70–90%; interview fill rates ↑.', 
        approach: 'Resume parsing, role-fit scoring, shortlisting and interview coordination handled by the system from application to confirmed slot.' 
      },
      { 
        id: 'onboarding', 
        title: 'Offer & Onboarding Orchestration', 
        icon: ShieldCheck,
        outcome: 'Faster offer acceptance; onboarding completion ↑.', 
        approach: 'Offer approvals, paperwork and onboarding tasks sequenced and executed by the system with full audit trails.' 
      }
    ]
  },
  {
    domain: "Finance & Accounting",
    systems: [
      { 
        id: 'ar', 
        title: 'Accounts Receivable Operations', 
        icon: ReceiptText,
        outcome: 'DSO reduction; collections handled by the system ↑.', 
        approach: 'Invoice issuance, payment tracking, follow-up sequencing, dispute flagging and reconciliation handled end-to-end.' 
      },
      { 
        id: 'finance', 
        title: 'Financial Close & Reporting', 
        icon: BarChart3,
        outcome: 'Close cycle reduced; audit-ready outputs.', 
        approach: 'Data ingestion, multi-source reconciliation, anomaly detection and report generation delivered to role-based dashboards.' 
      },
      { 
        id: 'procurement', 
        title: 'Procurement & Vendor Operations', 
        icon: ShoppingCart,
        outcome: 'Fewer PO mismatches; cycle time ↓.', 
        approach: 'PO lifecycle management, vendor follow-ups and invoice matching handled by the system with exception management.' 
      }
    ]
  },
  {
    domain: "Customer Operations",
    systems: [
      { 
        id: 'customer', 
        title: 'Customer Query Resolution', 
        icon: MessageSquare,
        outcome: '90% automated resolution rate; human load ↓.', 
        approach: 'Customer questions classified, resolved, or routed with full context handled by the system.' 
      },
      { 
        id: 'recovery', 
        title: 'Self-Service Recovery & Refunds', 
        icon: Wallet,
        outcome: 'Faster refund time; policy consistency ↑.', 
        approach: 'Return/refund workflows managed end-to-end with exception routing by the system.' 
      }
    ]
  },
  {
    domain: "Legal & Docs",
    systems: [
      { 
        id: 'contracts', 
        title: 'Contract & Document Intelligence', 
        icon: FileText,
        outcome: 'Zero missed renewal deadlines; review time ↓.', 
        approach: 'Contract ingestion, clause extraction, obligation tracking, and renewal alerts managed by the system.' 
      },
      { 
        id: 'compliance', 
        title: 'Compliance & Audit Trail Management', 
        icon: ShieldCheck,
        outcome: '100% audit readiness; zero manual logging.', 
        approach: 'Every system decision logged with context, timestamp, and decision logic — producing audit-ready histories.' 
      }
    ]
  },
  {
    domain: "Analytics & IT",
    systems: [
      { 
        id: 'reporting', 
        title: 'Operations Reporting & Alerting', 
        icon: PieChart,
        outcome: 'Real-time KPI visibility; manual assembly removed.', 
        approach: 'Operational data aggregated across systems to generate leadership reports and real-time alerts.' 
      },
      { 
        id: 'access', 
        title: 'Access Provisioning', 
        icon: Key,
        outcome: 'Access turnaround time ↓; reduced orphan accounts.', 
        approach: 'Role-based account handoffs handled by the system automatically with audit logs.' 
      },
      { 
        id: 'anomaly', 
        title: 'Anomaly Detection Assist', 
        icon: Activity,
        outcome: 'Faster incident resolution; actionable insights surfaced.', 
        approach: 'Automated anomaly detection with suggested root-cause hypotheses handled by the system.' 
      }
    ]
  }
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
    { name: "About", href: "/about" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Engagement", href: "/#engagement-model" },
    { name: "Deployment Library", href: "/deployments" },
    { name: "Field Intelligence", href: "/intelligence" }
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    // Navigate normally since we're on a separate page
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
        onOpenIntake={() => setIsIntakeOpen(true)}
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
                GreyShacks builds agentic systems — not scripts, not triggers. Our systems observe inputs, reason across context, and act end-to-end. Human intervention is the exception, not the default.
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
                  We map your current operational workflows, identify the highest-impact opportunities, capture KPI baselines, and align with your team on scope and success criteria before a single agentic system is built.
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
                  Phased rollout across processes with continuous monitoring, anomaly alerting, full audit trails, and regular reviews. Your team retains full operational intelligence at every stage.
                </p>
              </div>
            </div>
          </section>

          {/* Core Agentic Systems Catalog */}
          <section className="mb-24 border-t border-white/5 pt-16">
            <div className="mb-12">
              <h2 className="font-headline text-3xl md:text-4xl mb-4">Core Agentic Systems</h2>
              <p className="text-[#A0A0A0] text-lg max-w-3xl">
                These are not workflow triggers. These are systems that observe, reason, and act — handling end-to-end processes the way a trained operator would, without the bottlenecks.
              </p>
            </div>

            <div className="space-y-20">
              {SYSTEMS_BY_DOMAIN.map((group) => (
                <div key={group.domain}>
                  <h3 className="text-white/40 text-sm font-bold uppercase tracking-widest mb-8 border-l-2 border-[#0047AB] pl-4">
                    {group.domain}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.systems.map((system) => (
                      <div key={system.id} className="bg-[#111] border border-white/5 p-6 rounded-xl group hover:border-[#0047AB]/50 transition-all">
                        <system.icon className="w-8 h-8 text-[#0047AB] mb-4" />
                        <h4 className="font-bold text-xl mb-3">{system.title}</h4>
                        <div className="text-[#0047AB] font-semibold text-xs uppercase tracking-wider mb-4">
                          {system.outcome}
                        </div>
                        <p className="text-[#A0A0A0] text-sm leading-relaxed">
                          {system.approach}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 text-center">
              <p className="text-[#A0A0A0] text-lg mb-6">
                Plus 100+ more agentic systems across functions — tell us your process and we’ll show a tailored deployment map.
              </p>
              <button 
                onClick={() => setIsIntakeOpen(true)}
                className="text-[#0047AB] font-bold underline hover:text-white transition-colors"
              >
                Request an Operational Diagnostic
              </button>
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
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-white font-bold">Metric</TableHead>
                      <TableHead className="text-white font-bold">Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-[#A0A0A0]">Manual task reduction</TableCell>
                      <TableCell className="text-white font-medium">50–85% (process dependent)</TableCell>
                    </TableRow>
                    <TableRow className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-[#A0A0A0]">Time to measurable ROI</TableCell>
                      <TableCell className="text-white font-medium">8–14 weeks</TableCell>
                    </TableRow>
                    <TableRow className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-[#A0A0A0]">Pilot duration</TableCell>
                      <TableCell className="text-white font-medium">4–8 weeks</TableCell>
                    </TableRow>
                    <TableRow className="border-white/5 hover:bg-white/5">
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
                Request an Operational Diagnostic
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </section>
        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="capabilities"
        handleNavClick={handleNavClick}
        onOpenIntake={() => setIsIntakeOpen(true)}
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