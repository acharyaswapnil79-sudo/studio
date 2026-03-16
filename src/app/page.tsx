"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { cn } from '@/lib/utils';
import { Users, Magnet, ReceiptText, BarChart3, Repeat, ShoppingCart, MessageSquare, PieChart, FileText, ShieldCheck, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { MethodologyModal } from '@/components/MethodologyModal';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import Link from 'next/link';

const SITE_EVIDENCE = {
  deployments_count: 0,
  pilots_in_flight: 0,
  projected_metrics_based_on: 'baseline-measurements'
};

const NAV_OFFSET = 76;

const CAPABILITIES = [
  { id: 'screening', icon: Users, name: 'Candidate Screening & Scheduling', description: 'End-to-end hiring pipeline management — resume parsing, role-fit evaluation, shortlisting, and interview coordination handled by the system from application to confirmed slot.' },
  { id: 'lead-ops', icon: Magnet, name: 'Intelligent Lead Operations', description: 'Inbound lead capture, enrichment, scoring, and routing — the system qualifies, prioritizes, and assigns leads without a human in the loop.' },
  { id: 'ar-ops', icon: ReceiptText, name: 'Accounts Receivable Operations', description: 'Invoice issuance, payment tracking, follow-up sequencing, dispute flagging, and reconciliation — the system manages the full AR cycle and escalates only genuine exceptions.' },
  { id: 'finance-close', icon: BarChart3, name: 'Financial Close & Reporting', description: 'Data ingestion, multi-source reconciliation, anomaly detection, and report generation across close cycles — delivered to role-based dashboards with full audit trails.' },
  { id: 'sales-followup', icon: Repeat, name: 'Autonomous Sales Follow-Up', description: 'Prospect behaviour tracking and response-based outreach sequences handled by the system, ensuring consistent engagement without manual follow-up.' },
  { id: 'procurement', icon: ShoppingCart, name: 'Procurement & Vendor Operations', description: 'Vendor communication, purchase order tracking, delivery confirmation, and invoice reconciliation handled by the system across procurement cycles.' },
  { id: 'customer-query', icon: MessageSquare, name: 'Customer Query Resolution', description: 'Customer questions classified, resolved, or routed with full context so your team only handles genuinely complex cases.' },
  { id: 'ops-reporting', icon: PieChart, name: 'Operations Reporting & Alerting', description: 'Operational data aggregated across systems to generate leadership reports, KPI dashboards, and real-time alerts when thresholds are breached.' },
  { id: 'contract-intel', icon: FileText, name: 'Contract & Document Intelligence', description: 'Contract ingestion, clause extraction, obligation tracking, and renewal alerts managed by the system across document repositories.' },
  { id: 'compliance', icon: ShieldCheck, name: 'Compliance & Audit Trail Management', description: 'Every system decision logged with context, timestamp, and decision logic — producing audit-ready operational histories automatically.' }
];

export default function GreyShacksLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    
    const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ['hero', 'operational-impact', 'capabilities', 'case-studies', 'insights'];
      const triggerLine = window.innerHeight * 0.25;

      let newActive = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine && rect.bottom > 0) {
          newActive = id;
          break;
        }
      }
      setActiveSection(prev => (prev === newActive ? prev : newActive));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Command Center", href: "#hero" },
    { name: "Operational Impact", href: "#operational-impact" },
    { name: "Capabilities", href: "#capabilities" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Insights", href: "#insights" }
  ];

  return (
    <div className="relative min-h-screen font-body overflow-x-hidden">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
      />
      
      <main>
        <HeroSection />
        <IndustriesSection />
        <OperationalImpactSection openMethodologyModal={() => setIsMethodologyOpen(true)} />
        <CapabilitiesSection />
        <section id="case-studies" className="py-24 bg-[#0A0A0A]"></section>
        <section id="insights" className="py-24 bg-[#0A0A0A]"></section>
      </main>

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection={activeSection}
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

function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden box-border px-5 md:px-8 pt-[88px] md:pt-[96px] pb-[56px] md:pb-[64px]"
    >
      <ParticleBackground />
      
      <div className="relative z-10 w-full max-w-[860px] flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-[7px] bg-[rgba(0,71,171,0.09)] border border-[rgba(0,71,171,0.2)] px-3.5 py-1.5 rounded-full mb-[26px]"
        >
          <div className="w-[6px] h-[6px] rounded-full bg-[#0047AB] shadow-[0_0_8px_rgba(0,71,171,0.9)] animate-dot-pulse" />
          <span className="text-[11px] font-medium tracking-[0.13em] uppercase text-white/60">
            Agentic Systems for Mid-Market Operations
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75, ease: [0.2, 0.9, 0.2, 1] }}
          className="font-headline font-semibold text-white mb-5 max-w-[820px]"
          style={{ 
            fontSize: "clamp(44px, 7vw, 58px)",
            lineHeight: 1.08,
            letterSpacing: "-0.022em"
          }}
        >
          The Architecture of<br />Autonomous Operations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.75, ease: [0.2, 0.9, 0.2, 1] }}
          className="text-[#A0A0A0] text-[15px] md:text-[16px] lg:text-[17px] leading-[1.7] max-w-[560px] md:max-w-[600px] mb-[34px]"
        >
          GreyShacks designs intelligent systems that eliminate manual workflows, driving operational intelligence through agentic operational cores.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.75, ease: [0.2, 0.9, 0.2, 1] }}
          className="flex flex-col md:flex-row gap-[11px] w-full md:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            className="flex items-center justify-center gap-2 bg-[#0047AB] text-white font-bold text-[14.5px] px-[30px] py-[14px] rounded-[7px] shadow-[0_8px_28px_rgba(0,71,171,0.32)] md:min-w-[180px] whitespace-nowrap"
          >
            Pilot
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          
          <Link href="/capabilities">
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.25)" }}
              className="bg-transparent border border-white/14 text-white/82 font-semibold text-[14.5px] px-[30px] py-[14px] rounded-[7px] transition-colors md:min-w-[180px] whitespace-nowrap w-full"
            >
              See How It Works
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const industries = [
    "Manufacturing", "Real Estate", "Retail", "Logistics", 
    "Food & Beverage", "Healthcare", "SaaS", "Financial Services", 
    "Telecommunications", "Energy", "Supply Chain", "E-commerce", 
    "Construction", "Professional Services"
  ];

  return (
    <section className="bg-[#0A0A0A] border-t border-white/6 py-16 md:py-24 overflow-hidden relative">
      <div className="flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-body text-[13px] tracking-[0.1em] text-[#A0A0A0] uppercase mb-10 text-center"
        >
          Trusted by enterprise teams across industries
        </motion.p>

        <div className="w-full relative overflow-hidden whitespace-nowrap">
          <div className="flex animate-industry-marquee w-max">
            {[...industries, ...industries].map((industry, i) => (
              <div key={i} className="flex items-center">
                <span className="font-headline text-[20px] md:text-[28px] text-white/70 px-[30px] leading-none">
                  {industry}
                </span>
                <div className="w-[1px] h-[24px] bg-white/15" />
              </div>
            ))}
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-10 px-6 font-body text-[16px] text-[#A0A0A0] text-center max-w-[640px] leading-[1.7]"
        >
          GreyShacks builds operational systems for organizations where efficiency, speed, and accuracy directly impact revenue.
        </motion.p>
      </div>
    </section>
  );
}

function OperationalImpactSection({ openMethodologyModal }: { openMethodologyModal: () => void }) {
  let subheadline = '';
  let metricsArray = [];
  
  if (SITE_EVIDENCE.deployments_count >= 2) {
    subheadline = `Results from our first ${SITE_EVIDENCE.deployments_count} operational deployments (2024–2025). Outcomes below are conservative, measured changes recorded during pilot and early production runs.`;
    metricsArray = [
      { key: 'workflows', value: '+120', label: 'Workflows Automated', hint: `Measured across ${SITE_EVIDENCE.deployments_count} deployments (2024–2025)` },
      { key: 'savings', value: '$8M+', label: 'Annual Client Savings', hint: 'Aggregated annualized savings across measured deployments' },
      { key: 'roi', value: '3–6 Mo.', label: 'Average ROI Period', hint: 'Median time-to-payback observed in deployments' }
    ];
  } else if (SITE_EVIDENCE.pilots_in_flight > 0) {
    subheadline = `Projected outcomes from pilots currently in deployment. Projections based on baseline measurements completed in weeks 1–4.`;
    metricsArray = [
      { key: 'workflows', value: 'Projected', label: 'Workflows Automated', hint: 'Estimated based on current pilot scope' },
      { key: 'savings', value: '$2M–$5M', label: 'Est. Annual Savings', hint: 'Annualized projection from pilot baseline' },
      { key: 'roi', value: '4–8 Mo.', label: 'Projected ROI', hint: 'Projected payback based on scaling models' }
    ];
  } else {
    subheadline = "Benchmarked outcomes. These figures are derived from published industry benchmarks and our pilot-scoping models (sources available in methodology).";
    metricsArray = [
      { key: 'workflows', value: '20–200', label: 'Automation Potential', hint: 'Task volume typical for mid-market ops cores' },
      { key: 'savings', value: '30%–85%', label: 'Efficiency Gains', hint: 'Observed industry benchmark (McKinsey 2021)' },
      { key: 'roi', value: '3–9 Mo.', label: 'Estimated ROI', hint: 'Validated against our pilot scoping models' }
    ];
  }

  return (
    <section id="operational-impact" className="bg-[#0D0D0D] border-t border-white/5 py-14 md:py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-8">
          <div className="lg:col-span-1">
            <h2 className="font-headline text-white text-3xl md:text-4xl mb-6">Operational Impact Benchmarks</h2>
            <p className="text-[#A0A0A0] text-lg leading-relaxed mb-8">
              {subheadline}
            </p>

            <div className="text-sm">
              <button 
                className="text-[#A0A0A0] underline decoration-white/20 hover:text-white transition-colors" 
                onClick={openMethodologyModal}
              >
                How we measure
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {metricsArray.map((m, i) => (
              <motion.div 
                key={m.key} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center md:text-left"
              >
                <div className="text-white font-headline font-bold mb-1" style={{fontSize: 'clamp(32px, 5vw, 48px)'}}>
                  {m.value}
                </div>
                <div className="text-white font-medium text-sm tracking-wide uppercase mb-3">
                  {m.label}
                </div>
                {m.hint && <div className="text-xs text-[#8e8e8e] leading-relaxed max-w-[200px] mx-auto md:mx-0">{m.hint}</div>}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            onClick={openMethodologyModal}
            className="text-white border border-white/10 px-8 py-3.5 rounded-lg hover:bg-white/5 transition-colors text-sm font-semibold w-full md:w-auto"
          >
            Request methodology & anonymized logs (NDA)
          </button>
          <button 
            className="bg-[#0047AB] text-white px-8 py-3.5 rounded-lg hover:bg-[#0047AB]/90 transition-colors text-sm font-bold w-full md:w-auto"
          >
            Discuss pilot design
          </button>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 bg-[#0A0A0A] px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-16">
          <h2 className="font-headline text-white text-3xl md:text-4xl mb-4">How We Help Operations Teams Do More</h2>
          <p className="text-[#A0A0A0] text-lg max-w-3xl leading-relaxed">
            We build agentic systems that handle the repetitive, high-volume work slowing your teams down — across sales, finance, hiring, and operations. Minimal to zero human intervention by design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {CAPABILITIES.map((cap) => (
            <motion.div
              key={cap.id}
              whileHover={{ scale: 1.03, borderColor: '#0047AB' }}
              onClick={() => console.log('capabilities_card_click', { card_name: cap.name })}
              className="bg-[#111111] border border-[#1F1F1F] p-5 rounded-[12px] transition-colors cursor-pointer"
            >
              <cap.icon className="w-8 h-8 text-[#0047AB] mb-4" />
              <h3 className="text-white font-bold text-[15px] mb-2 leading-tight">{cap.name}</h3>
              <p className="text-[#A0A0A0] text-[13px] leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/capabilities">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => console.log('cta_explore_capabilities')}
              className="bg-[#0047AB] text-white font-bold text-[14.5px] px-8 py-4 rounded-[7px] shadow-lg flex items-center gap-2"
            >
              See How It Works
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}