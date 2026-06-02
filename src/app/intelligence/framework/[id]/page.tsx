"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { Footer } from '@/components/Footer';
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

  const navLinks = [
    { name: "Command Center", href: "/#hero" },
    { name: "Operational Impact", href: "/#operational-impact" },
    { name: "About", href: "/about" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Engagement", href: "/#engagement-model" },
    { name: "Deployment Library", href: "/deployments" },
    { name: "Field Intelligence", href: "/intelligence" }
  ];

  if (!insight) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center font-body">
        <div className="max-w-md space-y-6">
          <h1 className="font-headline text-3xl font-bold">Analysis Pending</h1>
          <p className="text-[#A0A0A0] text-sm leading-relaxed">
            The complete operational analysis for this publication is being prepared for the institutional library.
          </p>
          <button 
            onClick={() => router.push('/intelligence')}
            className="inline-flex items-center gap-2 text-[#0445a4] font-mono text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Intelligence
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D0D8E4] font-body selection:bg-[#0445a4]/30">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="intelligence"
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-0 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Breadcrumb / Back */}
          <button 
            onClick={() => router.push('/intelligence')}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#0445a4] mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Intelligence Library
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 mb-24">
            {/* Content Column (70%) */}
            <div className="lg:col-span-7 space-y-12">
              <header className="space-y-6">
                <div className="inline-block px-3 py-1 border border-[#0445a4]/20 bg-[#0445a4]/5 text-[#0445a4] text-[10px] font-mono uppercase tracking-widest rounded">
                  {insight.category}
                </div>
                <h1 className="font-headline text-4xl md:text-6xl text-white font-bold leading-tight">
                  {insight.title}
                </h1>
                <div className="flex items-start gap-3 text-sm text-[#0445a4] font-mono italic max-w-2xl">
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
                  <div className="border-l-2 border-[#0445a4] pl-8 py-4 my-12 italic">
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
                        <div className="bg-[#060B10] border border-[#0F1D2A] border-l-4 border-l-[#0445a4] p-8 my-8 flex gap-8 items-start">
                          <div className="font-headline text-5xl text-[#0445a4] font-bold shrink-0">
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
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0445a4]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0445a4] animate-pulse" />
                        {insight.reliability}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <DiagnosticCTA onOpenIntake={() => setIsIntakeOpen(true)} />
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <IntakeFormModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </div>
  );
}