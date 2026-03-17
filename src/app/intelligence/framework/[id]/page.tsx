"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { INSIGHTS } from '@/lib/intelligence-data';
import { ArrowLeft, ArrowRight, Clock, Info, CheckCircle2, ShieldCheck, BarChart3, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function IntelligenceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!id) return null;

  const insight = INSIGHTS.find(item => item.id === id);

  console.log("Route ID:", id);
  console.log("Matched Insight:", insight);

  const navLinks = [
    { name: "Command Center", href: "/#hero" },
    { name: "Operational Impact", href: "/#operational-impact" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Engagement", href: "/#engagement-model" },
    { name: "Deployment Library", href: "/deployments" },
    { name: "Field Intelligence", href: "/intelligence" }
  ];

  if (!insight) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <h1 className="font-headline text-3xl font-bold">Analysis Pending</h1>
          <p className="text-[#A0A0A0] text-sm leading-relaxed">
            The complete operational analysis for this publication is being prepared for the institutional library.
          </p>
          <button 
            onClick={() => router.push('/intelligence')}
            className="inline-flex items-center gap-2 text-[#0047AB] font-mono text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Intelligence
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D0D8E4] font-sans selection:bg-blue-900/30">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="intelligence"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Breadcrumb / Back */}
          <button 
            onClick={() => router.push('/intelligence')}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#0047AB] mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Intelligence Library
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16">
            {/* Content Column (70%) */}
            <div className="lg:col-span-7 space-y-12">
              <header className="space-y-6">
                <div className="inline-block px-3 py-1 border border-[#0047AB]/20 bg-[#0047AB]/5 text-[#0047AB] text-[10px] font-mono uppercase tracking-widest rounded">
                  {insight.category}
                </div>
                <h1 className="font-headline text-4xl md:text-6xl text-white font-bold leading-tight">
                  {insight.title}
                </h1>
                <div className="flex items-start gap-3 text-sm text-[#0047AB] font-mono italic max-w-2xl">
                  <Info className="w-4 h-4 shrink-0 mt-1" />
                  <span>{insight.provenance}</span>
                </div>
                <div className="flex items-center gap-8 pt-6 border-b border-white/5 pb-8 text-[10px] font-mono text-white/30 uppercase tracking-[0.15em]">
                  <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {insight.readingTime}</span>
                  <span>{insight.date}</span>
                  <span>GREYHACKS INTELLIGENCE</span>
                </div>
              </header>

              <section className="prose prose-invert max-w-none">
                <p className="text-xl text-[#8A9AA8] leading-relaxed font-light mb-12">
                  {insight.openingParagraph}
                </p>

                {insight.pullQuote && (
                  <div className="border-l-2 border-[#0047AB] pl-8 py-4 my-12 italic">
                    <p className="font-headline text-2xl text-[#EEF2F6] leading-relaxed">
                      "{insight.pullQuote}"
                    </p>
                  </div>
                )}

                <div className="space-y-16">
                  {insight.sections.map((section, idx) => (
                    <div key={idx} className="space-y-6">
                      <h2 className="font-headline text-2xl text-white font-bold pt-8 border-t border-white/5">
                        {section.heading}
                      </h2>
                      <div className="text-[#A0A0A0] text-lg leading-relaxed space-y-4 whitespace-pre-line">
                        {section.content}
                      </div>
                      {section.callout && (
                        <div className="bg-[#060B10] border border-[#0F1D2A] border-l-4 border-l-[#0047AB] p-8 my-8 flex gap-8 items-start">
                          <div className="font-headline text-5xl text-[#0047AB] font-bold shrink-0">
                            {section.callout.number}
                          </div>
                          <p className="text-sm italic text-[#6A7A88] leading-relaxed pt-2">
                            {section.callout.label}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Disclaimer / Caveat */}
              <div className="mt-24 p-8 bg-white/5 border border-white/10 rounded-lg italic text-xs text-white/40 leading-relaxed">
                Methodology note: This analysis is grounded in deployment observation across real operational environments. Timelines and outcomes reflect median durations across the observed cohort. Individual business results vary based on process complexity and existing technical debt.
              </div>
            </div>

            {/* Sidebar Column (30%) */}
            <aside className="lg:col-span-3 space-y-8">
              <div className="sticky top-32 space-y-8">
                <div className="bg-[#060B10] border border-white/5 p-8 rounded-xl shadow-xl space-y-8">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-4">
                    Publication Metadata
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Data Window</div>
                      <div className="text-xs font-bold text-white">{insight.dataWindow}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Reliability Level</div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0047AB]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0047AB] animate-pulse" />
                        {insight.reliability}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Methodology Note</div>
                      <div className="text-[11px] text-[#6A7A88] leading-relaxed italic">
                        Observations derived from live operational pilots. Benchmarks validated against pre-deployment baselines.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0047AB] p-8 rounded-xl shadow-2xl space-y-6">
                  <h4 className="text-white font-headline font-bold text-xl leading-tight">
                    Discuss these findings with an operator
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We can run an operational diagnostic on your processes to validate these observations against your baseline.
                  </p>
                  <button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="w-full bg-white text-[#0047AB] font-bold text-xs py-4 rounded-lg hover:bg-white/90 transition-colors uppercase tracking-widest"
                  >
                    Schedule Diagnostic
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Final Conversion Section */}
          <section className="mt-24 pt-24 border-t border-white/5 text-center flex flex-col items-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-headline text-3xl md:text-5xl font-semibold leading-tight">
                Evaluating agentic systems in your operations?
              </h2>
              <p className="text-[#A0A0A0] text-lg md:text-xl font-body">
                We begin with a structured operational diagnostic (typically 2–3 weeks) to determine whether a system is the appropriate intervention.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setIsIntakeOpen(true)}
                  className="bg-[#0047AB] text-white font-bold text-sm px-10 py-4 rounded-lg shadow-xl flex items-center justify-center gap-2 font-body"
                >
                  Discuss an Operational Diagnostic
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-mono uppercase tracking-widest text-white/20">
                <span>Diagnostic 2–3 weeks</span>
                <span>Pilot 4–8 weeks</span>
                <span>Production safe</span>
                <span>Measured baseline</span>
              </div>
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
        activeSection="intelligence"
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
