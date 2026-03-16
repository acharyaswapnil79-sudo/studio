
"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { MethodologyModal } from '@/components/MethodologyModal';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DEPLOYMENTS, Deployment } from '@/lib/deployments-data';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Info, FileText, BarChart3, Clock, Lock, Activity } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  const deployment = DEPLOYMENTS.find(d => d.id === params.id);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!deployment) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-headline mb-4">Deployment Not Found</h1>
        <Link href="/deployments" className="text-[#0047AB] underline">Return to Library</Link>
      </div>
    );
  }

  const navLinks = [
    { name: "Command Center", href: "/#hero" },
    { name: "Operational Impact", href: "/#operational-impact" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Deployment Library", href: "/deployments" },
    { name: "Insights", href: "/#insights" }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-body text-white selection:bg-blue-900/30">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="deployments"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Back Button */}
          <Link href="/deployments" className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Deployment Library</span>
          </Link>

          {/* Hero Section */}
          <section className="mb-12">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0047AB] mb-4">
              {deployment.industry} Deployment
            </div>
            <h1 className="font-headline font-semibold text-4xl md:text-6xl mb-6 leading-tight max-w-4xl">
              {deployment.title} System
            </h1>
            <p className="text-[#A0A0A0] text-xl md:text-2xl leading-relaxed max-w-3xl">
              {deployment.summary || `A specialized system designed to handle ${deployment.function.toLowerCase()} end-to-end for mid-market operations.`}
            </p>
          </section>

          {/* Deployment Snapshot Bar */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111] border border-white/5 rounded-xl p-6 mb-16 shadow-lg">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Pilot Duration</div>
              <div className="text-lg font-bold">{deployment.pilotDuration || '6 weeks'}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Measurement Window</div>
              <div className="text-lg font-bold">{deployment.measurementWindow || '12 weeks'}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Deployment Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="text-lg font-bold">{deployment.status}</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Methodology</div>
              <div className="text-lg font-bold text-[#0047AB]">Audit-Ready</div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-24">
              {/* Client Context */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Info className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Client Context</h2>
                </div>
                <div className="space-y-4 text-[#A0A0A0] leading-relaxed text-lg">
                  {deployment.detailedContext ? (
                    deployment.detailedContext.map((p, i) => <p key={i}>{p}</p>)
                  ) : (
                    <p>{deployment.clientContext}</p>
                  )}
                  <div className="pt-4 grid grid-cols-2 gap-8 border-t border-white/5">
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase mb-3">Systems in use</h4>
                      <ul className="space-y-2">
                        {(deployment.systemsIntegrated || ['Existing ERP', 'Spreadsheet-based Triage']).map((s, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <ChevronRight className="w-3 h-3 text-[#0047AB]" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Operational Problem */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Operational Problem</h2>
                </div>
                <div className="space-y-6">
                  <ul className="space-y-4 text-[#A0A0A0] text-lg leading-relaxed">
                    {(deployment.detailedProblem || [deployment.operationalProblem]).map((p, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-white/20 font-bold shrink-0">—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {deployment.problemSignificance && (
                    <div className="bg-[#111] border-l-2 border-[#0047AB] p-6 rounded-r-lg italic text-white/80">
                      &ldquo;{deployment.problemSignificance}&rdquo;
                    </div>
                  )}
                </div>
              </section>

              {/* Operational Flow Diagram */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <Activity className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Operational Flow</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                    <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Before Deployment</h4>
                    <div className="space-y-4">
                      {(deployment.beforeFlow || ['Step 1', 'Manual Review', 'Weekly Meeting', 'Manual Action']).map((step, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-full bg-white/5 border border-white/5 py-3 text-center text-xs text-[#A0A0A0] rounded-md">
                            {step}
                          </div>
                          {i < (deployment.beforeFlow?.length || 4) - 1 && <ArrowRight className="w-3 h-3 text-white/10 rotate-90 my-2" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#0047AB]/5 border border-[#0047AB]/20 p-6 rounded-xl">
                    <h4 className="text-[#0047AB] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">After Deployment</h4>
                    <div className="space-y-4">
                      {(deployment.afterFlow || ['Step 1', 'System Capture', 'Handled by the system', 'Human Exception']).map((step, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className={cn(
                            "w-full py-3 text-center text-xs rounded-md border",
                            step.includes('system') ? "bg-[#0047AB]/20 border-[#0047AB]/30 text-white font-bold" : "bg-white/5 border-white/5 text-[#A0A0A0]"
                          )}>
                            {step}
                          </div>
                          {i < (deployment.afterFlow?.length || 4) - 1 && <ArrowRight className="w-3 h-3 text-[#0047AB]/30 rotate-90 my-2" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Deployment Timeline */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Deployment Timeline</h2>
                </div>
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                  {(deployment.timelinePhases || [
                    { phase: 'Pilot', description: 'Initial deployment on scoped process.' },
                    { phase: 'Measurement', description: 'Tracking against baseline.' },
                    { phase: 'Scale', description: 'Full production rollout.' }
                  ]).map((item, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-0 top-1 w-[22px] h-[22px] rounded-full bg-[#0A0A0A] border-2 border-[#0047AB] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#0047AB]" />
                      </div>
                      <h4 className="font-bold text-white mb-1">{item.phase}</h4>
                      <p className="text-sm text-[#A0A0A0] leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Measurement Framework */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Measurement Framework</h2>
                </div>
                <div className="bg-[#111] border border-white/5 p-8 rounded-xl space-y-6">
                  <p className="text-[#A0A0A0] leading-relaxed italic">
                    All metrics follow our standardized measurement methodology:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(deployment.measurementFramework || [
                      'Baseline metrics recorded over 4-week observation.',
                      'System logs used for real-time validation.',
                      'Manual time tracking logs compared weekly.'
                    ]).map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-[#0047AB] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* KPI Exhibit Charts */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <BarChart3 className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">KPI Exhibit</h2>
                </div>
                <div className="space-y-12">
                  {deployment.kpis.map((kpi, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <h4 className="text-lg font-bold text-white">{kpi.label}</h4>
                        <div className="text-[#0047AB] font-bold text-sm">{kpi.impact}</div>
                      </div>
                      <div className="relative h-12 bg-white/5 rounded-full overflow-hidden flex items-center px-6">
                        <div className="absolute left-0 top-0 bottom-0 bg-white/5 border-r border-white/10" style={{ width: '50%' }} />
                        <div className="flex-1 text-sm font-medium z-10 text-white/40">Before: <span className="text-white ml-2">{kpi.before}</span></div>
                        <ArrowRight className="w-4 h-4 text-[#0047AB] mx-4 z-10" />
                        <div className="flex-1 text-right text-sm font-bold z-10">After: <span className="text-[#0047AB] ml-2">{kpi.after}</span></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 text-center">
                    <p className="text-[10px] text-white/30 italic uppercase tracking-widest">
                      Metrics measured during the first full quarter post-deployment against a four-week baseline period.
                    </p>
                  </div>
                </div>
              </section>

              {/* What We Learned */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Info className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">What We Learned</h2>
                </div>
                <div className="bg-[#1a1111]/20 border border-red-900/10 p-8 rounded-xl">
                  <p className="text-[#A0A0A0] leading-relaxed text-lg">
                    {deployment.whatWeLearned || "Standard pilot outcomes met projections; recalibration of rule-based logic occurred in Week 4."}
                  </p>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="sticky top-32 space-y-8">
                <div className="bg-[#111] border border-white/5 p-8 rounded-xl shadow-xl">
                  <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Deployment Details</h3>
                  <div className="space-y-8">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Industry</div>
                      <div className="text-white font-bold">{deployment.industry}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Team Size Impacted</div>
                      <div className="text-white font-bold">{deployment.teamSize} staff</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Function</div>
                      <div className="text-white font-bold">{deployment.function}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Systems Integrated</div>
                      <div className="space-y-1">
                        {(deployment.systemsIntegrated || ['Existing ERP']).map((s, i) => (
                          <div key={i} className="text-white font-bold text-sm">• {s}</div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[#0047AB] mb-2">
                        <Lock className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Audited Evidence</span>
                      </div>
                      <p className="text-[11px] text-[#A0A0A0]">
                        Full methodology and anonymized pilot data logs are available under a standard NDA.
                      </p>
                    </div>
                  </div>
                </div>

                {/* What Stayed Human */}
                <div className="bg-black/40 border border-white/5 p-8 rounded-xl">
                  <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">What Stayed Human</h3>
                  <ul className="space-y-4">
                    {(deployment.whatStayedHuman || ['Strategic Decisioning', 'Complex Exceptions', 'Stakeholder Comms']).map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conversion */}
                <div className="bg-[#0047AB] p-8 rounded-xl shadow-2xl space-y-6">
                  <h4 className="text-white font-bold text-lg leading-tight">Scope a similar pilot for your team</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We can capture your operational baseline and scope a production-safe pilot in 2–3 weeks.
                  </p>
                  <button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="w-full bg-white text-[#0047AB] font-bold text-sm py-3.5 rounded-lg hover:bg-white/90 transition-colors"
                  >
                    Request Pilot
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Cross-Deployment References */}
          <section className="mt-32 pt-16 border-t border-white/5">
            <h2 className="font-headline text-3xl mb-12">Related Deployments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DEPLOYMENTS.filter(d => d.id !== deployment.id).slice(0, 3).map((d) => (
                <Link 
                  key={d.id} 
                  href={`/deployments/${d.id}`}
                  className="bg-[#111] border border-white/5 p-6 rounded-xl hover:border-[#0047AB]/50 transition-all group"
                >
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0047AB] mb-2">{d.industry}</div>
                  <h4 className="text-white font-bold mb-4 group-hover:text-[#0047AB] transition-colors">{d.title}</h4>
                  <div className="flex items-center text-xs text-[#A0A0A0] gap-2">
                    View Deployment <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="py-12 px-6 md:px-10 border-t border-white/5 text-center text-[#A0A0A0] text-sm">
        <div className="max-w-[1240px] mx-auto">
          &copy; {new Date().getFullYear()} GreyShacks. All operational evidence measured and verified.
        </div>
      </footer>

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="deployments"
        handleNavClick={() => {}}
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
