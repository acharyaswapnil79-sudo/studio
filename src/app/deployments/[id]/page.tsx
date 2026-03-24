"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { MethodologyModal } from '@/components/MethodologyModal';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Footer } from '@/components/Footer';
import { DEPLOYMENTS } from '@/lib/deployments-data';
import { OperationalFlow } from "@/components/deployments/OperationalFlow";
import { KPIExhibit } from "@/components/deployments/KPIExhibit";
import { ImpactPanel } from "@/components/deployments/ImpactPanel";
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Info, FileText, BarChart3, Clock, Lock, Activity } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudyPage() {
  const params = useParams();
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
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white font-body">
        <h1 className="text-4xl font-headline mb-4">Deployment Not Found</h1>
        <Link href="/deployments" className="text-[#0047AB] underline">Return to Library</Link>
      </div>
    );
  }

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
            <p className="text-[#A0A0A0] text-xl md:text-2xl leading-relaxed max-w-3xl font-body">
              {deployment.summary || `A specialized system designed to operate ${deployment.function.toLowerCase()} end-to-end for mid-market operations.`}
            </p>
          </section>

          {/* Deployment Snapshot Bar */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111] border border-white/5 rounded-xl p-6 mb-16 shadow-lg">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Pilot Duration</div>
              <div className="text-lg font-bold font-body">{deployment.pilotDuration || '6 weeks'}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Measurement Window</div>
              <div className="text-lg font-bold font-body">{deployment.measurementWindow || '12 weeks'}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="text-lg font-bold font-body">{deployment.status}</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Methodology</div>
              <div className="text-lg font-bold text-[#0047AB] font-body">Audit-Ready</div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Client Context */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Info className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-headline font-bold uppercase tracking-widest">Client Context</h2>
                </div>
                <div className="space-y-4 text-[#A0A0A0] leading-relaxed text-lg font-body">
                  {deployment.detailedContext ? (
                    deployment.detailedContext.map((p, i) => <p key={i}>{p}</p>)
                  ) : (
                    <p>{deployment.clientContext}</p>
                  )}
                </div>
              </section>

              {/* Operational Problem */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-headline font-bold uppercase tracking-widest">Operational Problem</h2>
                </div>
                <div className="space-y-6">
                  <ul className="space-y-4 text-[#A0A0A0] text-lg leading-relaxed font-body">
                    {(deployment.detailedProblem || [deployment.operationalProblem]).map((p, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-white/20 font-bold shrink-0">—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {deployment.problemSignificance && (
                    <div className="bg-[#111] border-l-2 border-[#0047AB] p-6 rounded-r-lg italic text-white/80 font-body">
                      &ldquo;{deployment.problemSignificance}&rdquo;
                    </div>
                  )}
                </div>
              </section>

              {/* Operational Workflow Diagram */}
              <OperationalFlow 
                title={deployment.title} 
                beforeSteps={deployment.beforeFlow} 
                afterSteps={deployment.afterFlow}
              />

              {/* Deployment Timeline */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-headline font-bold uppercase tracking-widest">Deployment Timeline</h2>
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
                      <h4 className="font-headline font-bold text-white mb-1">{item.phase}</h4>
                      <p className="text-sm text-[#A0A0A0] leading-relaxed font-body">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* KPI Impact Exhibit */}
              <KPIExhibit kpis={deployment.kpis} />

              {/* Scope Limitations */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-headline font-bold uppercase tracking-widest">Scope Limitations</h2>
                </div>
                <div className="bg-[#111] border border-white/5 p-8 rounded-xl font-body">
                  <p className="text-[#A0A0A0] leading-relaxed">
                    {deployment.scopeLimitation || "Operational constraints and technical limitations identified during scoping."}
                  </p>
                </div>
              </section>

              {/* Business Impact Panel */}
              <ImpactPanel impact={deployment.businessImpact} />

              {/* What Stayed Human */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Info className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-headline font-bold uppercase tracking-widest">What Stayed Human</h2>
                </div>
                <div className="bg-black/40 border border-white/5 p-8 rounded-xl">
                  <ul className="space-y-4 font-body">
                    {(deployment.whatStayedHuman || ['Strategic Decisioning', 'Complex Exceptions', 'Stakeholder Comms']).map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* What We Learned */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Info className="w-5 h-5 text-[#0047AB]" />
                  <h2 className="text-xl font-headline font-bold uppercase tracking-widest">What We Learned</h2>
                </div>
                <div className="bg-[#1a1111]/20 border border-red-900/10 p-8 rounded-xl font-body">
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
                  <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 font-body">Deployment Details</h3>
                  <div className="space-y-8 font-body">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Industry</div>
                      <div className="text-white font-bold">{deployment.industry}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Team Impacted</div>
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

                {/* Conversion */}
                <div className="bg-[#0047AB] p-8 rounded-xl shadow-2xl space-y-6 font-body">
                  <h4 className="text-white font-bold text-lg leading-tight">Scope a similar pilot for your team</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We can capture your operational baseline and scope a production-safe pilot in 2–3 weeks.
                  </p>
                  <button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="w-full bg-white text-[#0047AB] font-bold text-sm py-3.5 rounded-lg hover:bg-white/90 transition-colors"
                  >
                    Request an Operational Diagnostic
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
                  <h4 className="text-white font-headline font-bold mb-4 group-hover:text-[#0047AB] transition-colors">{d.title}</h4>
                  <div className="flex items-center text-xs text-[#A0A0A0] gap-2 font-body">
                    View Deployment <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Final Conversion Section */}
          <section className="mt-24 pt-24 border-t border-white/5 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-headline text-3xl md:text-5xl font-semibold leading-tight">
                If your team is managing a similar operational problem, we scope a pilot in 2–3 weeks.
              </h2>
              <p className="text-[#A0A0A0] text-lg md:text-xl font-body">
                The pilot is production-safe and measured against your operational baseline.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setIsIntakeOpen(true)}
                  className="bg-[#0047AB] text-white font-bold text-sm px-10 py-4 rounded-lg shadow-xl flex items-center justify-center gap-2 font-body"
                >
                  Request an Operational Diagnostic
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsMethodologyOpen(true)}
                  className="bg-transparent border border-white/10 text-white font-bold text-sm px-10 py-4 rounded-lg hover:bg-white/5 transition-all font-body"
                >
                  Request the Deployment Brief (NDA)
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

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