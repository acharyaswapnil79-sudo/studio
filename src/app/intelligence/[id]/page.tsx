"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { INSIGHTS, CATEGORIES } from '@/lib/intelligence-data';
import { ArrowLeft, ArrowRight, Clock, Calendar, ShieldCheck, Info, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function InsightDetailPage() {
  const params = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  const insight = INSIGHTS.find(i => i.id === params.id);

  useEffect(() => {
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
    { name: "Field Intelligence", href: "/intelligence" }
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
            <ChevronRight className="w-3 h-3" />
            <Link href="/intelligence" className="hover:text-white transition-colors">Intelligence</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">{insight.type === 'framework' ? 'Practitioner Framework' : insight.category}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-12">
              <header className="space-y-8">
                <div 
                  className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] font-bold px-3 py-1 border border-current rounded"
                  style={{ color: CATEGORIES.find(c => c.name === insight.category || (c.name === 'Practitioner Frameworks' && insight.type === 'framework'))?.color || '#3B82F6' }}
                >
                  {insight.type === 'framework' ? 'Practitioner Framework' : insight.category}
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

              <article className="space-y-12">
                <p className="text-xl leading-relaxed text-white/90 font-sans font-light">
                  {insight.openingParagraph}
                </p>

                {insight.pullQuote && (
                  <div className="bg-[#0F0F0F] border-l-2 border-[#0047AB] p-8 my-12 italic text-white/80 text-2xl font-headline leading-relaxed">
                    "{insight.pullQuote}"
                  </div>
                )}

                {insight.diagram && (
                  <div className="bg-[#111] border border-white/5 rounded-xl p-8 my-12 overflow-x-auto">
                    <div className="flex items-center justify-between min-w-[600px] gap-4">
                      {insight.diagram.map((step, i) => (
                        <React.Fragment key={step}>
                          <div className="flex-1 text-center p-4 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono uppercase tracking-widest text-white/60">
                            {step}
                          </div>
                          {i < insight.diagram!.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="mt-4 text-[10px] font-mono text-white/30 text-center uppercase tracking-widest">Operational Flow Architecture</div>
                  </div>
                )}

                <div className="space-y-16 text-[#A0A0A0] leading-relaxed text-lg font-sans">
                  {insight.sections.map((section, idx) => (
                    <section key={idx} className="space-y-6">
                      <h2 className="text-2xl font-headline font-bold text-white border-b border-white/5 pb-4">{section.heading}</h2>
                      <div className="space-y-6">
                        <p>{section.content}</p>
                        {section.callout && (
                          <div className="bg-[#060B10] border-l-4 border-[#0047AB] p-8 my-8 flex gap-8 items-start rounded-r-lg">
                            <div className="text-5xl font-headline font-bold text-[#0047AB] leading-none">{section.callout.number}</div>
                            <div className="text-sm italic leading-relaxed text-white/60">{section.callout.label}</div>
                          </div>
                        )}
                      </div>
                    </section>
                  ))}
                </div>

                {insight.charts && (
                  <div className="bg-[#111] border border-white/5 rounded-xl p-10 my-16 space-y-10">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-8">Performance Exhibits</h3>
                    {insight.charts.map((chart, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-bold">{chart.label}</span>
                          <span className="text-[#0047AB] font-mono text-xs font-bold uppercase">{chart.impact}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div className="space-y-2">
                            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Pre-Deployment</div>
                            <div className="text-lg font-bold text-white/60">{chart.before}</div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-white/10 w-full" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-[10px] font-mono text-[#0047AB] uppercase tracking-widest font-bold">Post-Deployment</div>
                            <div className="text-lg font-bold text-white">{chart.after}</div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-[#0047AB]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <p className="text-[10px] text-white/30 italic text-center pt-4 border-t border-white/5">
                      Baseline captured over 4 weeks pre-deployment. Performance measured during first full quarter post-deployment.
                    </p>
                  </div>
                )}

                <div className="pt-16 border-t border-white/5 space-y-12">
                  <h3 className="font-headline text-3xl font-bold">Related Intelligence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {INSIGHTS.filter(i => i.id !== insight.id && i.category === insight.category).slice(0, 2).map((related) => (
                      <Link key={related.id} href={`/intelligence/${related.id}`} className="bg-[#111] border border-white/5 p-8 rounded-xl hover:border-[#0047AB]/30 transition-all">
                        <div className="text-[9px] font-mono uppercase tracking-widest text-[#0047AB] mb-4">{related.type === 'framework' ? 'Practitioner Framework' : related.category}</div>
                        <h4 className="text-xl font-bold mb-4">{related.title}</h4>
                        <ArrowRight className="w-4 h-4 text-white/30" />
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-32 space-y-8">
                <div className="bg-[#111] border border-white/5 p-8 rounded-xl space-y-8 shadow-xl">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 font-bold pb-4 border-b border-white/5">
                    Publication Metadata
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Category</div>
                      <div className="text-sm font-bold text-white">{insight.type === 'framework' ? 'Practitioner Framework' : insight.category}</div>
                    </div>

                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Data Window</div>
                      <div className="text-sm font-bold text-white">{insight.dataWindow}</div>
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

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <p className="text-[10px] text-[#A0A0A0] leading-relaxed italic">
                        {insight.methodologyNote || "All observations are verified against raw system logs and anonymized before publication."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0047AB] p-8 rounded-xl space-y-6 shadow-2xl">
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

          {/* Final Conversion */}
          <section className="text-center py-24 border-t border-white/5 mt-24">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-headline text-4xl md:text-6xl font-bold leading-tight">
                Evaluating agentic systems in your operations?
              </h2>
              <p className="text-[#A0A0A0] text-xl leading-relaxed">
                We begin with a structured operational diagnostic (typically 2–3 weeks) to determine whether a system is the appropriate intervention.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setIsIntakeOpen(true)}
                  className="bg-[#0047AB] text-white font-bold text-sm px-10 py-4 rounded-lg shadow-xl"
                >
                  Discuss an Operational Diagnostic
                </button>
              </div>
              <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Diagnostic", val: "2–3 weeks" },
                  { label: "Pilot", val: "4–8 weeks" },
                  { label: "Safety", val: "Production safe" },
                  { label: "Evidence", val: "Measured baseline" }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                    <div className="text-sm font-bold">{stat.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
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
