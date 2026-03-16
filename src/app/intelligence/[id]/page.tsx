"use client"

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { INSIGHTS, CATEGORIES } from '@/lib/intelligence-data';
import { ArrowLeft, ArrowRight, Clock, Calendar, Database, ShieldCheck, Info, FileText, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function InsightDetailPage() {
  const params = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  const insight = INSIGHTS.find(i => i.id === params.id);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!insight) return null;

  const navLinks = [
    { name: "Command Center", href: "/#hero" },
    { name: "Operational Impact", href: "/#operational-impact" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Deployment Library", href: "/deployments" },
    { name: "Intelligence", href: "/intelligence" }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-sans text-white selection:bg-blue-900/30">
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-12">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight className="w-3 h-3" />
            <Link href="/intelligence" className="hover:text-white transition-colors">Intelligence</Link>
            <ArrowRight className="w-3 h-3" />
            <span className="text-white/60">{insight.category}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-12">
              <header className="space-y-8">
                <div 
                  className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] font-bold px-3 py-1 border border-current rounded"
                  style={{ color: CATEGORIES.find(c => c.name === insight.category)?.color }}
                >
                  {insight.category}
                </div>
                <h1 className="font-headline text-4xl md:text-6xl font-bold leading-tight">
                  {insight.title}
                </h1>
                <div className="flex items-center gap-6 text-[10px] font-mono text-[#0047AB] uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    {insight.provenance}
                  </div>
                </div>
                <div className="flex items-center gap-8 py-6 border-y border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> {insight.readingTime}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {insight.date}</div>
                </div>
              </header>

              <article className="space-y-12 text-lg leading-relaxed text-[#A0A0A0]">
                {insight.content.map((p, i) => (
                  <div key={i} className="space-y-6">
                    {i === 1 && (
                      <div className="bg-[#0F0F0F] border-l-2 border-[#0047AB] p-8 my-12 italic text-white/80">
                        "{insight.summary}"
                      </div>
                    )}
                    <p>{p}</p>
                  </div>
                ))}
              </article>

              <div className="pt-16 border-t border-white/5 space-y-12">
                <h3 className="font-headline text-3xl font-bold">Related Intelligence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {INSIGHTS.filter(i => i.id !== insight.id).slice(0, 2).map((related) => (
                    <Link key={related.id} href={`/intelligence/${related.id}`} className="bg-[#111] border border-white/5 p-8 rounded-xl hover:border-[#0047AB]/30 transition-all">
                      <div className="text-[9px] font-mono uppercase tracking-widest text-[#0047AB] mb-4">{related.category}</div>
                      <h4 className="text-xl font-bold mb-4">{related.title}</h4>
                      <ArrowRight className="w-4 h-4 text-white/30" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-32 space-y-8">
                <div className="bg-[#111] border border-white/5 p-8 rounded-xl space-y-8">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 font-bold pb-4 border-b border-white/5">
                    Publication Metadata
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Data Window</div>
                      <div className="text-sm font-bold">{insight.dataWindow}</div>
                    </div>
                    
                    {insight.deploymentRef && (
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Deployment Reference</div>
                        <Link href={`/deployments/${insight.deploymentRef.id}`} className="text-sm font-bold text-[#0047AB] hover:underline">
                          {insight.deploymentRef.title}
                        </Link>
                      </div>
                    )}

                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Data Reliability</div>
                      <div className="inline-flex items-center gap-2 text-sm font-bold">
                        <ShieldCheck className="w-4 h-4 text-[#0047AB]" />
                        {insight.reliability}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <p className="text-[10px] text-[#A0A0A0] leading-relaxed italic">
                        Methodology note: All observations are verified against raw system logs and anonymized before publication.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0047AB] p-8 rounded-xl space-y-6">
                  <h4 className="text-xl font-bold leading-tight">Discuss these findings with an operator</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We can run an operational diagnostic on your processes to validate these benchmarks against your baseline.
                  </p>
                  <button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="w-full bg-white text-[#0047AB] font-bold text-sm py-4 rounded-lg hover:bg-white/90 transition-colors"
                  >
                    Schedule Diagnostic
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="py-12 px-6 md:px-10 border-t border-white/5 text-center text-[#A0A0A0] text-sm">
        <div className="max-w-[1240px] mx-auto">
          &copy; 2023 GreyShacks. All research observations grounded in deployment data.
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
