"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { cn } from '@/lib/utils';
import { Users, Magnet, ReceiptText, BarChart3, Repeat, ShoppingCart, MessageSquare, PieChart, FileText, ShieldCheck, ArrowRight, Factory, Building2, Truck, Landmark, Stethoscope, Briefcase, ShoppingBag, Laptop } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { MethodologyModal } from '@/components/MethodologyModal';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { EngagementModel } from '@/components/EngagementModel';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

const SITE_EVIDENCE = {
  deployments_count: 35,
  pilots_in_flight: 0,
  projected_metrics_based_on: 'baseline-measurements'
};

const NAV_OFFSET = 76;

const CAPABILITIES = [
  { id: 'screening', icon: Users, name: 'Candidate Screening & Scheduling', description: 'Resume parsing, role-fit evaluation, shortlisting, and interview coordination handled by the system from application to confirmed slot.' },
  { id: 'lead-ops', icon: Magnet, name: 'Intelligent Lead Operations', description: 'Inbound lead capture, enrichment, scoring, and routing — qualified and assigned without a human in the loop.' },
  { id: 'ar-ops', icon: ReceiptText, name: 'Accounts Receivable Operations', description: 'Invoice issuance, payment tracking, follow-up sequencing, dispute flagging, and reconciliation handled end-to-end.' },
  { id: 'finance-close', icon: BarChart3, name: 'Financial Close & Reporting', description: 'Data ingestion, multi-source reconciliation, and report generation — delivered to dashboards with full audit trails.' },
  { id: 'sales-followup', icon: Repeat, name: 'Autonomous Sales Follow-Up', description: 'Prospect behaviour tracking and response-based outreach sequences handled by the system, ensuring consistent engagement.' },
  { id: 'procurement', icon: ShoppingCart, name: 'Procurement & Vendor Operations', description: 'Vendor communication, purchase order tracking, delivery confirmation, and invoice reconciliation handled by the system.' },
  { id: 'customer-query', icon: MessageSquare, name: 'Customer Query Resolution', description: 'Customer questions classified, resolved, or routed with full context handled by the system.' },
  { id: 'ops-reporting', icon: PieChart, name: 'Operations Reporting & Alerting', description: 'Operational data aggregated across systems to generate leadership reports, dashboards, and real-time alerts.' },
  { id: 'contract-intel', icon: FileText, name: 'Contract & Document Intelligence', description: 'Contract ingestion, clause extraction, obligation tracking, and renewal alerts managed by the system.' },
  { id: 'compliance', icon: ShieldCheck, name: 'Compliance & Audit Trail Management', description: 'Every system decision logged with context and decision logic — producing audit-ready histories handled by the system.' }
];

const INDUSTRIES = [
  { id: 'mfg', icon: Factory, name: 'Manufacturing', description: 'Production quality, procurement, and vendor operations' },
  { id: 're', icon: Building2, name: 'Real Estate', description: 'Lead operations, sales follow-up, and documentation workflows' },
  { id: 'log', icon: Truck, name: 'Logistics & Supply Chain', description: 'Exception management, PO tracking, and delivery reconciliation' },
  { id: 'fin', icon: Landmark, name: 'Financial Services', description: 'AR automation, compliance monitoring, and close cycle compression' },
  { id: 'hc', icon: Stethoscope, name: 'Healthcare Administration', description: 'Scheduling, claims pre-processing, and patient communications' },
  { id: 'prof', icon: Briefcase, name: 'Professional Services', description: 'Contract intelligence, billing operations, and reporting' },
  { id: 'retail', icon: ShoppingBag, name: 'Retail & E-commerce', description: 'Customer query resolution, refund workflows, and inventory ops' },
  { id: 'saas', icon: Laptop, name: 'SaaS & Technology', description: 'Lead operations, onboarding automation, and access provisioning' }
];

const HOW_WE_WORK = [
  {
    title: "We Start With Your Baseline, Not Our Technology",
    body: "Before any system is built, we spend 2–4 weeks mapping your current operational workflows and capturing a 4-week performance baseline. We do not propose solutions until we can measure whether they worked."
  },
  {
    title: "We Only Publish Outcomes We Can Defend",
    body: "Every figure on this site — workflows automated, time saved, ROI period — is derived from pilot-phase measurement against a real operational baseline. Where a figure is a projection, we say so explicitly. Where it is observed, we can show the data."
  },
  {
    title: "We Do Not Scale Until the Pilot Proves It",
    body: "Our engagement model is structured so that full deployment is contingent on measurable pilot outcomes — not on a contract already signed. If the pilot does not deliver, we do not proceed. That is in writing."
  }
];

export default function GreyShacksLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('/#', '').replace('#', '');
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
      const sections = ['hero', 'operational-impact', 'capabilities', 'engagement-model', 'case-studies', 'insights'];
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
    { name: "Command Center", href: "/#hero" },
    { name: "Operational Impact", href: "/#operational-impact" },
    { name: "About", href: "/about" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Engagement", href: "/#engagement-model" },
    { name: "Deployment Library", href: "/deployments" },
    { name: "Field Intelligence", href: "/intelligence" }
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
        onOpenIntake={() => setIsIntakeOpen(true)}
      />
      
      <main>
        <HeroSection onOpenIntake={() => setIsIntakeOpen(true)} />
        <IndustriesSection />
        <OperationalImpactSection openMethodologyModal={() => setIsMethodologyOpen(true)} />
        <CapabilitiesSection />
        
        {/* How We Work Section */}
        <section className="py-24 bg-[#0D0D0D] px-6 md:px-10 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto">
            <div className="mb-16">
              <h2 className="font-headline text-white text-3xl md:text-4xl mb-4">How We Work</h2>
              <p className="text-[#A0A0A0] text-lg max-w-3xl leading-relaxed">
                Three principles that govern every engagement we take on.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_WE_WORK.map((item, i) => (
                <div key={i} className="bg-[#111111] border border-[#1F1F1F] p-8 rounded-[12px]">
                  <h3 className="text-white font-bold text-lg mb-4 leading-tight">{item.title}</h3>
                  <p className="text-[#A0A0A0] text-[14px] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <EngagementModel 
          onOpenIntake={() => setIsIntakeOpen(true)} 
          onOpenMethodology={() => setIsMethodologyOpen(true)}
        />
        
        {/* Case Studies Teaser */}
        <section id="case-studies" className="py-24 bg-[#0D0D0D] px-6 md:px-10 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto text-center">
            <h2 className="font-headline text-3xl md:text-5xl mb-8">Rigorous Operational Evidence</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto mb-12">
              Explore our full deployment library of consulting-grade evidence, anonymized and measured against real operational baselines.
            </p>
            <Link href="/deployments">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-transparent border border-[#0047AB] text-[#0047AB] font-bold text-sm px-10 py-4 rounded-lg hover:bg-[#0047AB] hover:text-white transition-all"
              >
                View Deployment Library
              </motion.button>
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection={activeSection}
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

function HeroSection({ onOpenIntake }: { onOpenIntake: () => void }) {
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
            onClick={onOpenIntake}
            className="flex items-center justify-center gap-2 bg-[#0047AB] text-white font-bold text-[14.5px] px-[30px] py-[14px] rounded-[7px] shadow-[0_8px_28px_rgba(0,71,171,0.32)] md:min-w-[180px] whitespace-nowrap"
          >
            Request an Operational Diagnostic
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
  return (
    <section className="bg-[#0A0A0A] border-t border-white/6 py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-white text-3xl md:text-4xl mb-4">Industries We Operate In</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((industry) => (
            <div key={industry.id} className="bg-[#111111] border border-white/5 p-6 rounded-[12px] hover:border-[#0047AB]/30 transition-all group">
              <industry.icon className="w-6 h-6 text-[#0047AB] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold text-[16px] mb-2">{industry.name}</h3>
              <p className="text-[#A0A0A0] text-[13px] leading-relaxed">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperationalImpactSection({ openMethodologyModal }: { openMethodologyModal: () => void }) {
  let subheadline = '';
  let metricsArray = [];
  
  if (SITE_EVIDENCE.deployments_count >= 2) {
    subheadline = `Results from our first 30+ operational deployments (From 2023). Outcomes below are conservative, measured changes recorded during pilot and early production runs.`;
    metricsArray = [
      { key: 'workflows', value: '+190', label: 'Workflows Automated', hint: 'Measured across 30+ deployments (From 2023)' },
      { key: 'savings', value: '$8M+', label: 'Annual Client Savings', hint: 'Aggregated annualized savings across measured deployments' },
      { key: 'roi', value: '3–6 Mo.', label: 'ROI Period', hint: 'Median time-to-payback observed in deployments' }
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
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
        
        <div className="max-w-3xl pt-8 border-t border-white/5">
          <p className="text-[#606060] text-xs italic leading-relaxed mb-4">
            Outcomes are calculated using a conservative measurement methodology — annualised from pilot-phase data, validated against 4-week operational baselines captured before deployment. Figures represent the median of observed ranges, not peak outcomes. Full methodology available on request.
          </p>
          <Link href="/intelligence" className="text-[#0047AB] text-xs font-bold hover:underline">
            Read our measurement methodology →
          </Link>
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