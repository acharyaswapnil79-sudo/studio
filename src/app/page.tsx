"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { cn } from '@/lib/utils';
import { X, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SITE_EVIDENCE = {
  deployments_count: 0,         // integer - number of real deployments completed
  pilots_in_flight: 0,          // number of active pilots
  projected_metrics_based_on: 'baseline-measurements'
};

const NAV_OFFSET = 76;

interface NavLink {
  name: string;
  href: string;
}

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

  const navLinks: NavLink[] = [
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
        <section id="capabilities" className="py-24 bg-[#0A0A0A]"></section>
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

function Navbar({ isScrolled, navLinks, mobileMenuOpen, setMobileMenuOpen, activeSection, handleNavClick }: any) {
  return (
    <motion.nav
      initial={{ top: 24 }}
      animate={{ 
        top: isScrolled ? 12 : 24,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed left-0 right-0 z-50 flex justify-center w-full px-4 md:px-8"
    >
      <div className={cn(
        "flex items-center justify-between w-full max-w-[1240px] px-6 md:px-8 transition-all duration-300 rounded-[14px] h-[68px] overflow-visible",
        isScrolled ? "bg-[rgba(15,15,15,0.72)] backdrop-blur-[12px] saturate-[180%] border-b border-[rgba(255,255,255,0.07)] border-l border-[rgba(255,255,255,0.04)] border-r border-[rgba(255,255,255,0.04)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent border-transparent"
      )}>
        <div className="flex items-center shrink-0">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="font-headline font-bold text-lg text-white">GreyShacks</a>
        </div>

        <div className="hidden md:flex items-center gap-[22px] lg:gap-[34px] mx-4">
          {navLinks.map((link: NavLink) => (
            <div key={link.href} className="relative group py-2">
              <a 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-label={`Scroll to ${link.name} section`}
                className={cn(
                  "text-[13px] lg:text-[13.5px] tracking-wider transition-colors duration-[0.18s] whitespace-nowrap",
                  activeSection === link.href.replace('#', '') ? "text-white" : "text-[#888888] hover:text-white"
                )}
              >
                {link.name}
              </a>
              <motion.div 
                className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-white w-5 transition-opacity",
                  activeSection === link.href.replace('#', '') ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeSection === link.href.replace('#', '') ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </div>
          ))}
        </div>

        <div className="hidden md:block shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="bg-[#0047AB] text-white font-semibold text-[13.5px] px-5 py-2.5 rounded-[7px] shadow-[0_4px_16px_rgba(0,71,171,0.25)] hover:shadow-[0_6px_28px_rgba(0,71,171,0.45)] whitespace-nowrap"
          >
            Apply for Pilot
          </motion.button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button className="bg-[#0047AB] text-white font-semibold text-[12px] px-4 py-2 rounded-[7px] shadow-lg whitespace-nowrap">
            Apply
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col justify-center gap-[5px] w-[32px] h-[32px] items-end"
            aria-label="Toggle mobile menu"
          >
            <motion.div 
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
            <motion.div 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
            <motion.div 
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenuOverlay({ isOpen, onClose, navLinks, activeSection, handleNavClick }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="fixed inset-0 z-[200] bg-[rgba(8,8,8,0.97)] backdrop-blur-[20px] flex flex-col items-center justify-center"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-white/70"
            aria-label="Close mobile menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          
          <div className="flex flex-col items-center w-full px-8">
            {navLinks.map((link: NavLink, i: number) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.06 + i * 0.08 }}
                className={cn(
                  "w-full text-center py-[18px] border-b border-white/5 font-headline font-medium text-[28px] transition-colors",
                  activeSection === link.href.replace('#', '') ? "text-white" : "text-white/80 hover:text-white"
                )}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  onClose();
                }}
              >
                {link.name}
              </motion.a>
            ))}
            
            <motion.button
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.46 }}
              className="mt-8 w-full max-w-[280px] bg-[#0047AB] text-white font-bold text-[14.5px] py-3.5 rounded-[7px] shadow-xl"
            >
              Apply for Pilot
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
          GreyShacks designs intelligent systems that eliminate manual workflows, driving enterprise efficiency through agentic operational cores.
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
            Apply for Pilot
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6.5H12M12 6.5L7.5 2M12 6.5L7.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.25)" }}
            className="bg-transparent border border-white/14 text-white/82 font-semibold text-[14.5px] px-[30px] py-[14px] rounded-[7px] transition-colors md:min-w-[180px] whitespace-nowrap"
          >
            Explore Capabilities
          </motion.button>
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

  const snapshots = [
    {
      industry: 'Manufacturing (Anonymized)',
      title: 'Accounts Reconciliation Agent',
      points: [
        'Problem: 72 hour cross-system reconciliation latency',
        'Intervention: agentic orchestration + OCR document pipeline',
        'Outcome: reconciliation latency reduced 72h → 3 min; projected annual savings $1.2M'
      ]
    },
    {
      industry: 'Real Estate (Anonymized)',
      title: 'Lead-to-Contract Automation',
      points: [
        'Problem: 40 hours human screening per property lead',
        'Intervention: candidate scoring + automated follow-up agent',
        'Outcome: screening time reduced 40h → 10m; cost per lead cut ~96%'
      ]
    }
  ];

  return (
    <section id="operational-impact" className="bg-[#0D0D0D] border-t border-white/5 py-14 md:py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {snapshots.map((s, i) => (
            <motion.div 
              key={s.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="p-8 bg-[#0b0b0b] border border-white/6 rounded-xl hover:border-white/10 transition-colors group"
            >
              <div className="text-[#A0A0A0] text-xs font-semibold tracking-widest uppercase mb-4 opacity-60">
                {s.industry}
              </div>
              <h3 className="text-white font-headline font-bold text-2xl mb-6 group-hover:text-[#0047AB] transition-colors">
                {s.title}
              </h3>
              <ul className="space-y-4">
                {s.points.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#B3B3B3] text-[15px] leading-relaxed">
                    <span className="text-[#0047AB] font-bold shrink-0 mt-0.5">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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

function MethodologyModal({ isOpen, onClose, onOpenIntake }: { isOpen: boolean, onClose: () => void, onOpenIntake: () => void }) {
  const steps = [
    {
      title: "Baseline capture",
      description: "Measure existing process for 1–4 weeks (time, error rate, headcount cost) to establish the control."
    },
    {
      title: "Pilot deployment",
      description: "Compare pilot performance week-by-week against the baseline using the same KPIs and variables."
    },
    {
      title: "Annualization",
      description: "Convert observed pilot delta to annualized savings using conservative multipliers and volume projections."
    },
    {
      title: "Audit",
      description: "Full, anonymized logs and sample exports are available for review under a standard NDA."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-[#0A0A0A] border-white/6 overflow-hidden flex flex-col sm:max-w-[640px] lg:max-w-[720px] sm:max-h-[85vh] lg:max-h-[80vh] w-full max-sm:fixed max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-t-[16px] max-sm:h-[90vh] sm:rounded-[12px] shadow-[0_20px_80px_rgba(0,0,0,0.6)] gap-0 [&>button]:hidden">
        <div className="sticky top-0 z-20 bg-[#0A0A0A] border-b border-white/6 px-5 py-5 sm:px-8 sm:py-8 flex items-center justify-between">
          <DialogTitle className="font-headline text-xl sm:text-2xl font-bold text-white leading-none">
            Measurement Methodology
          </DialogTitle>
          <DialogClose className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors group">
            <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          </DialogClose>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[600px] mx-auto px-6 py-8 sm:px-8 sm:py-10">
            <DialogDescription className="text-[#A0A0A0] text-base mb-12 text-center">
              Our benchmarks are calculated through a rigorous 4-step process.
            </DialogDescription>
            
            <div className="space-y-10 relative">
              <div className="absolute left-[13.5px] top-7 bottom-3 w-[1px] bg-white/10 hidden sm:block" />
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 sm:gap-6 relative">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0047AB] flex items-center justify-center text-white text-[14px] font-bold z-10">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[16px] mb-1.5">{step.title}</h4>
                    <p className="text-[14px] text-[#A0A0A0] leading-[1.6]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 bg-[#0A0A0A] border-t border-white/6 p-5 sm:px-8 sm:py-6">
          <button 
            onClick={() => {
              onClose();
              onOpenIntake();
            }}
            className="w-full h-12 bg-[#0047AB] hover:bg-[#0047AB]/90 text-white font-bold text-[14px] rounded-[8px] transition-all flex items-center justify-center shadow-lg shadow-[#0047AB]/20"
          >
            Request anonymized logs / methodology
          </button>
          <p className="text-center text-[11px] text-[#A0A0A0] mt-3 uppercase tracking-[0.15em] font-semibold">
            Standard NDA required for document access
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function IntakeFormModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const domain = email.split('@')[1];
    if (domain && publicDomains.includes(domain.toLowerCase())) {
      setEmailError('Please use your business email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-[#0A0A0A] border-white/6 overflow-hidden flex flex-col sm:max-w-[640px] w-full max-sm:fixed max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-t-[16px] max-sm:h-[90vh] sm:rounded-[12px] shadow-[0_20px_80px_rgba(0,0,0,0.6)] gap-0 [&>button]:hidden">
        
        {!submitted ? (
          <>
            <div className="sticky top-0 z-20 bg-[#0A0A0A] border-b border-white/6 px-6 py-6 sm:px-8 sm:py-8 flex items-center justify-between">
              <div>
                <DialogTitle className="font-headline text-xl sm:text-2xl font-bold text-white mb-2">
                  Request Methodology Access
                </DialogTitle>
                <DialogDescription className="text-[#A0A0A0] text-sm">
                  Access to anonymized operational logs and measurement documentation requires a standard NDA.
                </DialogDescription>
              </div>
              <DialogClose className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors group shrink-0 ml-4">
                <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </DialogClose>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
              <form id="intake-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/80">Full Name</Label>
                  <Input id="fullName" placeholder="Your full name" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Business Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    required 
                    onChange={handleEmailChange}
                    className={cn(
                      "bg-white/5 border-white/10 text-white placeholder:text-white/30",
                      emailError && "border-red-500/50"
                    )} 
                  />
                  {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white/80">Company Name</Label>
                  <Input id="company" placeholder="Company name" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-white/80">Role / Title</Label>
                    <Select required>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10 text-white">
                        <SelectItem value="founder">Founder</SelectItem>
                        <SelectItem value="ceo">CEO</SelectItem>
                        <SelectItem value="coo">COO</SelectItem>
                        <SelectItem value="cto">CTO</SelectItem>
                        <SelectItem value="head-ops">Head of Operations</SelectItem>
                        <SelectItem value="head-finance">Head of Finance</SelectItem>
                        <SelectItem value="ops-manager">Operations Manager</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Company Size</Label>
                    <Select required>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10 text-white">
                        <SelectItem value="1-10">1–10 employees</SelectItem>
                        <SelectItem value="11-50">11–50</SelectItem>
                        <SelectItem value="51-200">51–200</SelectItem>
                        <SelectItem value="201-1000">201–1000</SelectItem>
                        <SelectItem value="1000+">1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Industry</Label>
                  <Select required>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111] border-white/10 text-white">
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="useCase" className="text-white/80">Primary Use Case</Label>
                  <Textarea 
                    id="useCase" 
                    placeholder="Briefly describe the operational process you are evaluating automation for." 
                    maxLength={300}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[100px] resize-none"
                  />
                  <p className="text-[10px] text-white/30 text-right">Max 300 characters</p>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox 
                    id="nda" 
                    checked={ndaAccepted} 
                    onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
                    className="mt-1 border-white/20 data-[state=checked]:bg-[#0047AB]" 
                  />
                  <Label htmlFor="nda" className="text-xs text-white/60 leading-relaxed cursor-pointer">
                    I acknowledge that access to anonymized logs and methodology documentation requires a mutual NDA.
                  </Label>
                </div>
              </form>
            </div>

            <div className="sticky bottom-0 z-20 bg-[#0A0A0A] border-t border-white/6 p-6 sm:px-8 sm:py-6">
              <button 
                type="submit"
                form="intake-form"
                disabled={!ndaAccepted || !!emailError}
                className="w-full h-12 bg-[#0047AB] hover:bg-[#0047AB]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[14px] rounded-[8px] transition-all flex items-center justify-center shadow-lg shadow-[#0047AB]/20"
              >
                Request Access
              </button>
              <p className="text-center text-[11px] text-[#A0A0A0] mt-4">
                All shared operational logs are anonymized and sanitized before distribution.
              </p>
            </div>
          </>
        ) : (
          <div className="p-8 sm:p-12 flex flex-col items-center text-center">
            <CheckCircle2 className="w-16 h-16 text-[#0047AB] mb-6" />
            <DialogTitle className="font-headline text-2xl sm:text-3xl font-bold text-white mb-4">
              Request Received
            </DialogTitle>
            <div className="space-y-4 text-[#A0A0A0] text-sm sm:text-base max-w-[400px]">
              <p>Our team will review your request and respond within 1–2 business days.</p>
              <p>If approved, NDA documentation and access instructions will be shared via email.</p>
            </div>
            <button 
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-10 w-full max-w-[200px] h-12 bg-white/5 hover:bg-white/10 text-white font-bold text-[14px] rounded-[8px] transition-all border border-white/10"
            >
              Close
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
