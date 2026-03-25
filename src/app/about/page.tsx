"use client"

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Footer } from '@/components/Footer';
import { CheckCircle2, BarChart3, Settings, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// --- Components ---

const CountUp = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0;
        const end = value;
        const duration = 1200;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#A0A0A0] mb-4">
    {children}
  </div>
);

// --- Page ---

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-sans text-white selection:bg-blue-900/30">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="about"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          
          {/* SECTION 1 — PAGE HERO */}
          <section className="mb-32 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-headline font-semibold text-4xl md:text-7xl mb-8 leading-tight text-white"
            >
              Three Years of Operational Deployments. No Fluff.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#A0A0A0] text-xl md:text-2xl leading-relaxed max-w-3xl"
            >
              GreyShacks has been designing and deploying agentic operational systems since 2023. 
              This is the record of what we have built, what we have learned, and why it works.
            </motion.p>
          </section>

          {/* SECTION 2 — WHAT WE ARE */}
          <section className="mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-7">
                <SectionLabel>THE FIRM</SectionLabel>
                <h2 className="font-headline text-3xl md:text-5xl font-bold mb-10 text-white">We Are Not a Software Vendor</h2>
                <div className="space-y-8 text-lg md:text-xl leading-relaxed text-[#A0A0A0]">
                  <p>
                    GreyShacks is an agentic systems firm. We design and deploy autonomous operational 
                    systems for mid-market businesses — systems that handle end-to-end business processes 
                    with minimal to zero human intervention across sales, finance, HR, and operations.
                  </p>
                  <p>
                    We are not an RPA firm. We are not building chatbots, demos, or proof-of-concepts 
                    that stall before production. We build operational infrastructure — systems that 
                    run continuously, measure their own performance, and produce audit-ready records 
                    of every action taken. The difference between a demo and a production system is 
                    the gap we were built to close.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                {[
                  { val: 30, suffix: "+", label: "Operational Deployments", sub: "Across 14 operational environments since 2023" },
                  { val: 8, prefix: "$", suffix: "M+", label: "Annualised Client Savings", sub: "Conservative median. Full methodology available on request." },
                  { static: "8–14 Wks", label: "Median Time to Measurable ROI", sub: "From pilot start to verified outcome against baseline" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#111111] border border-white/5 p-8 rounded-xl"
                  >
                    <div className="text-[#0047AB] font-headline text-4xl font-bold mb-2">
                      {stat.static ? stat.static : <CountUp value={stat.val!} suffix={stat.suffix} prefix={stat.prefix} />}
                    </div>
                    <div className="text-white font-bold text-sm uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="text-[#A0A0A0] text-xs leading-relaxed">{stat.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3 — JOURNEY TIMELINE */}
          <section className="mb-40">
            <div className="text-center mb-20">
              <SectionLabel>OUR JOURNEY</SectionLabel>
              <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6 text-white">Built Deployment by Deployment</h2>
              <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
                Every capability we offer was developed from operational observation — 
                not from a product roadmap.
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 overflow-hidden">
                <motion.div 
                  className="w-full bg-[#0047AB]"
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              </div>

              <div className="space-y-24">
                {[
                  { q: "Q3 2023", t: "GreyShacks Founded", b: "Founded with a single thesis: that mid-market businesses were being sold AI promises that never reached production. The firm was built to close that gap — starting with a structured diagnostic methodology before any system was scoped." },
                  { q: "Q4 2023", t: "First Operational Deployments — Sales & Lead Operations", b: "First production deployments in real estate and hospitality sales operations. Inbound lead capture, enrichment, scoring, and routing handled end-to-end. Baseline measurement methodology established from this cohort. Observed: response time under 5 minutes, manual triage eliminated." },
                  { q: "Q1 2024", t: "Finance Operations Systems — AR and Close Cycle", b: "Accounts receivable and financial close deployments across manufacturing and distribution clients. DSO reduction observed in first measured cohort. Month-end close cycle compression confirmed in N=3 deployments. Measurement framework refined to account for seasonal baseline variation." },
                  { q: "Q2 2024", t: "Talent Acquisition Systems — Screening to Shortlist", b: "Candidate screening and scheduling systems deployed across IT services and professional services operations. Screening time reduction of 70–90% observed in first cohort. Interview fill rate improvement documented. Human review retained at final shortlist stage." },
                  { q: "Q3 2024", t: "Customer Operations and Compliance Systems", b: "Customer query resolution and compliance monitoring systems deployed in telecom, SaaS, and financial services contexts. 90% automated resolution rate observed in structured Tier-1 query deployments. Compliance audit trail architecture standardised across all new engagements from this point." },
                  { q: "Q4 2024", t: "Procurement and Vendor Operations", b: "PO lifecycle management, vendor follow-up, and invoice reconciliation systems deployed across manufacturing and retail distribution. Exception management framework formalised. Supplier adoption variable identified as primary determinant of system value realisation." },
                  { q: "Q1 2025", t: "Cross-Function Deployments — 14 Operational Environments", b: "GreyShacks reached 14 simultaneous operational environments across 7 industry verticals. Deployment Library and Intelligence publication programme launched. Measurement methodology rebuilt after identification of baseline capture errors in 6 earlier engagements — revised figures published transparently." },
                  { q: "Q2–Q3 2025", t: "Practitioner Framework Programme", b: "15 practitioner frameworks published across deployment observation, measurement methodology, failure analysis, and system architecture categories. Each framework drawn from N=3 to N=23 real deployment observations. No framework published without an operational data foundation." },
                  { q: "2026", t: "Current: Production Systems at Scale", b: "190+ workflows automated across the deployment base. Engagements now structured as three-phase programmes: Operational Diagnostic, Pilot Deployment, and Production Scale — with measurable pilot outcomes required before full deployment proceeds. Actively taking engagements across APAC, MENA, and NAMER.", isCurrent: true }
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  )}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#111] border-2 border-[#0047AB] -translate-x-1/2 z-10">
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-[#0047AB]"
                        initial={{ opacity: item.isCurrent ? 1 : 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-[45%] pl-12 md:pl-0">
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i % 2 === 0 ? 0.1 : 0 }}
                        className="bg-[#111111] border border-white/5 p-8 rounded-xl shadow-xl"
                      >
                        <div className="text-[#0047AB] font-mono text-[10px] font-bold uppercase tracking-widest mb-2">{item.q}</div>
                        <h3 className="text-white font-headline text-xl font-bold mb-4">{item.t}</h3>
                        <p className="text-[#A0A0A0] text-sm leading-relaxed">{item.b}</p>
                      </motion.div>
                    </div>
                    <div className="hidden md:block w-[10%]" />
                    <div className="hidden md:block w-[45%]" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4 — WHY CLIENTS CHOOSE US */}
          <section className="mb-40">
            <div className="mb-16">
              <SectionLabel>WHY GREYSHACKS</SectionLabel>
              <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6 text-white">What Operations Leaders Say They Were Looking For</h2>
              <p className="text-[#A0A0A0] text-lg max-w-3xl leading-relaxed">
                These are not testimonials. These are the consistent reasons we hear 
                during diagnostic conversations for why organisations came to us 
                after previous automation efforts failed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: CheckCircle2, t: "They needed a firm that starts with measurement, not technology", b: "Most automation engagements begin with a vendor's product and work backwards to a use case. GreyShacks starts with a 4-week operational baseline and works forward to a system only if the data supports it. Operations leaders consistently cite this as the reason they chose us over both software vendors and generalist consultancies." },
                { icon: BarChart3, t: "They needed outcomes they could defend to a CFO", b: "Every figure we publish — workflows automated, time saved, cost reduction — is derived from pilot-phase measurement against a real baseline, not vendor benchmarks or market research. Finance leaders choosing an agentic systems partner cite measurement transparency as a primary selection criterion." },
                { icon: Settings, t: "They needed production systems, not extended pilots", b: "Organisations that had been through failed automation programmes — RPA rollouts that stalled, chatbot deployments that required more human oversight than the original process — came to GreyShacks specifically for our production-first methodology. The pilot exists to validate, not to delay." },
                { icon: FileText, t: "They needed governance and audit readiness built in", b: "Mid-market businesses in regulated industries — financial services, healthcare administration, professional services — consistently require that every system action is logged, explainable, and audit-ready. GreyShacks builds governance architecture into every system from day one, not as a post-deployment addition." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#111111] border border-white/5 p-10 rounded-xl"
                >
                  <item.icon className="w-8 h-8 text-[#0047AB] mb-6" />
                  <h3 className="text-white font-bold text-xl mb-4 leading-tight">{item.t}</h3>
                  <p className="text-[#A0A0A0] leading-relaxed">{item.b}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SECTION 5 — DEPLOYMENT STORIES */}
          <section className="mb-40">
            <div className="mb-16">
              <SectionLabel>FROM THE DEPLOYMENT LIBRARY</SectionLabel>
              <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6 text-white">How It Looks in Practice</h2>
              <p className="text-[#A0A0A0] text-lg max-w-3xl leading-relaxed">
                Anonymised deployment observations from the GreyShacks production base. 
                Client names are withheld under standard engagement confidentiality. 
                Full methodology and supporting data available under mutual NDA.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  tag: "Real Estate · Sales Operations",
                  t: "Lead Response Time: 4 Hours to Under 5 Minutes",
                  ctx: "N=1 deployment · Residential developer · North India · 2023",
                  b: "A residential real estate developer with a 12-person sales team was managing inbound leads from 6 sources — portals, WhatsApp, direct calls, walk-ins, referrals, and digital campaigns — through a manual triage process that averaged 4+ hours from lead capture to first contact. The GreyShacks lead operations system captured, enriched, scored, and routed inbound leads to the appropriate sales representative within 5 minutes of submission — without human triage. Lead scoring was calibrated against the sales team's actual qualification logic, not a generic model. Observed over 8-week pilot: inbound-to-qualified ratio increased. Manual coordination hours eliminated from the sales team's week."
                },
                {
                  tag: "Manufacturing · Finance Operations",
                  t: "Month-End Close: 6 Days to Under 2",
                  ctx: "N=1 deployment · Components manufacturer · Western India · 2024",
                  b: "A mid-market components manufacturer was running a 6-day month-end close cycle driven by manual data consolidation from 4 source systems — ERP, bank feeds, procurement records, and a separate inventory platform with no direct integration. The GreyShacks financial close system automated data ingestion from all four sources, ran multi-source reconciliation, flagged anomalies for human review, and generated role-specific dashboard outputs. The finance team's involvement shifted from manual assembly to exception review and sign-off. Observed over pilot and first 3 production months: close cycle reduced to under 2 days. Anomaly detection surfaced 3 recurring reconciliation discrepancies."
                },
                {
                  tag: "Professional Services · HR Operations",
                  t: "Recruiter Capacity: 70% of Time Recovered from Intake Administration",
                  ctx: "N=1 deployment · IT services firm · South India · 2024",
                  b: "A growing IT services firm with an 8-person recruitment function was spending an estimated 70% of recruiter time on intake administration — resume collection, initial screening correspondence, scheduling, and status tracking — across 40–60 open roles at any point. The GreyShacks candidate screening and scheduling system handled resume parsing, role-fit scoring against defined criteria, shortlist compilation, and interview slot coordination end-to-end. Observed over pilot: screening time reduced by 78% on measured role cohort. Interview fill rate improved. Hiring managers reported higher shortlist quality."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-[#111111] border border-white/5 p-8 rounded-xl flex flex-col h-full"
                >
                  <div className="inline-block self-start bg-[#0047AB] text-white text-[10px] font-bold px-3 py-1 rounded-full mb-6">
                    {item.tag}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">{item.t}</h3>
                  <div className="text-[#A0A0A0] text-xs font-mono mb-6">{item.ctx}</div>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed flex-1">{item.b}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/deployments" className="text-[#0047AB] font-bold text-sm hover:underline flex items-center justify-center gap-2">
                View the full Deployment Library <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* SECTION 6 — OPERATING PRINCIPLES */}
          <section className="mb-40">
            <div className="mb-16">
              <SectionLabel>HOW WE THINK</SectionLabel>
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-white">Four Principles. Non-Negotiable.</h2>
            </div>

            <div className="space-y-6">
              {[
                { n: "1", t: "Operational problems are measurement problems first.", b: "Most automation fails because organisations try to fix a process they have never properly measured. We capture a 4-week operational baseline before we build anything. If you cannot measure the current state, you cannot verify the improved state." },
                { n: "2", t: "Honest outcomes are a structural advantage.", b: "The agentic AI market is saturated with inflated claims. We publish conservative figures, disclose our methodology, and stand behind every number on this site. When our figures are projections, we say so. When they are observed, we show the data. Credibility compounds." },
                { n: "3", t: "A system requiring constant intervention is not a system.", b: "It is a more complicated version of the problem. We design for minimal human intervention by default — the human is the exception handler, not the operator. We measure exception rates and include them in pilot reporting." },
                { n: "4", t: "We only take engagements where we can define success in advance.", b: "Not every business is a fit for what we build. We do not take engagements where we cannot agree on a measurable success criterion before the pilot begins. If the diagnostic does not surface a high-confidence opportunity, we will tell you and we will not proceed to a paid engagement." }
              ].map((item, i) => (
                <div key={i} className="bg-[#111111] border border-white/5 p-8 md:p-12 rounded-xl flex flex-col md:flex-row gap-8 items-start">
                  <div className="text-[#0047AB] font-headline text-6xl font-bold leading-none opacity-50">{item.n}</div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-4">{item.t}</h3>
                    <p className="text-[#A0A0A0] text-lg leading-relaxed">{item.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7 — CLOSING CTA */}
          <section className="text-center py-24 border-t border-white/5">
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-8 text-white">Start With a Diagnostic</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto mb-12">
              We take a limited number of engagements each quarter. 
              Every engagement begins with a structured operational diagnostic — 
              typically 2–3 weeks — before any system is scoped or built. 
              If the diagnostic does not surface a high-confidence opportunity, we will tell you.
            </p>
            <button 
              onClick={() => setIsIntakeOpen(true)}
              className="bg-[#0047AB] text-white font-bold text-[14px] px-10 py-4 rounded-lg shadow-lg hover:bg-[#0047AB]/90 transition-colors inline-flex items-center gap-2"
            >
              Request an Operational Diagnostic
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="about"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <IntakeFormModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </div>
  );
}
