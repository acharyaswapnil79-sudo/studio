
"use client"

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { useSearchParams } from 'next/navigation';

const frameworks = [
  {
    id: 1,
    category: "PRACTITIONER FRAMEWORK",
    categoryColor: "#3B82F6",
    title: "The Operational Pilot Framework: Scope, Baseline, Deploy, Measure",
    provenance: "Framework refined across N=23 operational pilots — manufacturing, finance, real estate, logistics, and healthcare contexts",
    readTime: "12 MIN READ",
    date: "FEB 2025",
    dataReliability: "Field-validated",
    dataWindow: "2022–2025",
    deploymentRef: "All deployment categories",
    methodologyNote: "All phases derived from live pilot observation. Timelines reflect median durations across the deployment cohort.",
    openingParagraph: "Of the 23 operational pilots we have run since 2022, 17 produced outcomes within 15% of projection. The six that missed projections shared a single structural failure: the baseline was either poorly defined, captured over too short a window, or compromised by a concurrent process change that the scoping team did not detect. This framework exists because we got those six wrong before we got the pattern right.",
    pullQuote: "\"The most common pilot failure is not a technology failure. It is a measurement failure that was baked in during the first two weeks of scoping.\"",
    sections: [
      {
        heading: "Phase 1 — Operational Diagnostic (Weeks 1–3)",
        content: "Before a single line of system logic is written, spend three weeks understanding the process at operator level — not management level. Management describes what the process should do. Operators describe what it actually does. These are rarely the same.\n\nIn a 2023 AR operations diagnostic at a mid-market manufacturer, management described a 5-step collections process. When we mapped it at operator level, it had 14 steps — 9 of which were undocumented workarounds for system gaps. A pilot scoped against the 5-step description would have failed to cover 60% of the actual workload.\n\nDiagnostic outputs required before proceeding: (1) A process map at operator level with step count, average duration per step, and weekly volume. (2) A manual hour distribution showing where time goes across the week — not estimated, but logged. Ask operators to track their own time for 5 working days using a simple hour log. (3) A systems inventory: every tool, spreadsheet, email thread, or messaging app involved in the process. (4) Exception catalogue: the top 5–8 exceptions that break the standard flow, their frequency, and how they are currently handled.",
        callout: { number: "14", label: "Undocumented process steps discovered in a 5-step process — visible only at operator level, not management level" }
      },
      {
        heading: "Phase 2 — Baseline Capture (Weeks 3–6)",
        content: "Baseline capture is the most technically boring and operationally critical phase of any deployment. It determines whether your post-deployment numbers mean anything.\n\nCapture baseline over a minimum of 4 consecutive working weeks. If the process has known seasonal variation — collections during quarter-end, support volume during festival season, admissions during application cycles — baseline must include a representative sample of that variation or results will be uninterpretable.\n\nWhat to measure: (1) Primary throughput metric — volume of units processed per week (invoices, leads, tickets, applications). (2) Manual hours per week spent on the process — captured by operator time log, not estimated by managers. (3) Error rate — define what constitutes an error for this process specifically, then count them. (4) Cycle time — end-to-end elapsed time from trigger to completion for the process unit. (5) Exception rate — what percentage of process units require non-standard handling.\n\nCommon baseline errors we have made and corrected: Capturing only 2 weeks of baseline is insufficient — variance is too high for a 2-week window to be statistically meaningful. Using manager estimates instead of operator time logs overstates productive time by 20–35% on average in our deployment data. Failing to define 'error' before capturing baseline means the pre and post measurements end up counting different things.",
        callout: { number: "4 weeks", label: "Minimum baseline capture window. Below this, variance is too high for post-deployment comparisons to be statistically meaningful" }
      },
      {
        heading: "Phase 3 — Pilot Deployment (Weeks 6–12)",
        content: "Scope the pilot to one process segment, one team, or one geography. The pilot proves the system works and calibrates the logic against real operational data — it is not a full deployment.\n\nWeek 6–7: System configuration and integration setup. Connect to live data sources. Do not use test data — pilots run on test environments consistently underperform live environments because the data quality differences are significant. Week 8: Parallel run. System operates alongside the existing process. Operators continue doing their work manually. System outputs are checked against manual outputs. Discrepancies are logged and investigated. Week 9–10: Transition. System takes primary ownership of defined process segments. Manual fallback remains available. Operators log exceptions daily. Week 11–12: Measurement. Compare against baseline using the same metrics, same definitions, same time-of-week capture windows.\n\nCritical calibration event: In 14 of 23 pilots, the escalation threshold required recalibration between weeks 8 and 10. The initial threshold was set based on historical data — but live operational data always has patterns that historical data obscures. Build threshold review into the pilot schedule explicitly, not as an ad hoc response.",
        callout: { number: "14/23", label: "Pilots requiring escalation threshold recalibration between weeks 8–10. Budget for this adjustment in every pilot plan" }
      },
      {
        heading: "Phase 4 — Measurement and Handoff (Weeks 12–14)",
        content: "Post-pilot measurement follows the same protocol as baseline capture: same metrics, same definitions, same 4-week window. Do not compress the measurement window because the pilot went well — the stabilisation period matters. Systems often show strong week 9–10 performance that regresses slightly in weeks 11–12 as edge cases accumulate. The 4-week measurement window captures this regression and produces a more honest outcome figure.\n\nDecision gate: At week 14, the measurement data supports one of three decisions. (1) Full deployment — outcomes within 15% of projection across primary metrics. (2) Extended pilot — outcomes directionally positive but below threshold; recalibrate and extend 4 weeks. (3) Redesign — fundamental scoping assumption was incorrect; return to diagnostic phase for the affected process segment.\n\nOf our 23 pilots: 17 proceeded to full deployment. 4 went through extended pilot before deployment. 2 required redesign — in both cases, the root cause was a systems integration constraint identified too late in the diagnostic phase. Both were eventually deployed successfully after redesign.",
        callout: { number: "17 / 4 / 2", label: "Pilot outcomes across 23 deployments: full deployment / extended pilot / redesign required" }
      }
    ]
  },
  {
    id: 2,
    category: "MEASUREMENT METHODOLOGY",
    categoryColor: "#10B981",
    title: "Baseline Capture and Measurement Methodology for Operational Deployments",
    provenance: "Measurement framework refined across N=20+ deployments. Incorporates corrections from 6 baseline failures between 2022–2023.",
    readTime: "10 MIN READ",
    date: "FEB 2025",
    dataReliability: "Deployment measurement",
    dataWindow: "2022–2025",
    deploymentRef: "All deployment categories",
    methodologyNote: "Baseline methodology verified against post-deployment actuals. Corrections documented where initial baselines produced uninterpretable results.",
    openingParagraph: "In 2022, we published an AR deployment outcome showing a 71% reduction in manual follow-up hours. A client asked us to verify the figure. When we reconstructed the measurement, we found the pre-deployment baseline had been captured during a holiday-adjacent fortnight when collections volume was 34% below normal. The real reduction was 52%. We corrected the figure, documented the methodology failure, and rebuilt the baseline framework from scratch. Everything in this document reflects that rebuild.",
    pullQuote: "\"A deployment that produces unmeasurable outcomes is operationally equivalent to a deployment that produced no outcomes. The measurement is not a formality — it is the deliverable.\"",
    sections: [
      {
        heading: "Defining the Measurement Unit",
        content: "Before capturing any numbers, define the unit of measurement with precision. This sounds obvious — it is not. In a 2023 customer support deployment, we tracked 'tickets resolved per day' as the primary metric. Post-deployment, we found the system had reclassified certain query types, which reduced the denominator. The apparent resolution rate improvement was partially definitional, not operational. We had measured two different things and called them the same metric.",
        callout: { number: "34%", label: "Below-normal volume during a baseline period that produced an overstated outcome figure — caught and corrected at client verification" }
      }
    ]
  },
  {
    id: 3,
    category: "VENDOR EVALUATION",
    categoryColor: "#F59E0B",
    title: "Agentic Systems Vendor Evaluation: A Structured Scorecard for Operations Leaders",
    provenance: "Scorecard developed from analysis of 8 competitive evaluations and post-deployment retrospectives across GreyShacks and comparable deployments",
    readTime: "9 MIN READ",
    date: "JAN 2025",
    dataReliability: "Framework-based",
    dataWindow: "2023–2025",
    deploymentRef: "Cross-category",
    methodologyNote: "Scoring weights derived from correlation analysis between evaluation criteria and post-deployment outcome quality across observed deployments.",
    openingParagraph: "Most vendor evaluations for operational automation fail at the same point: they score on features, not on deployment methodology. A system that can theoretically integrate with 200 platforms but has no structured measurement framework will produce operationally unmeasurable outcomes.",
    pullQuote: "\"Ask any vendor this question: how do you define the baseline, and who captures it? If they cannot answer in three sentences, their measurement framework does not exist.\"",
    sections: [
      {
        heading: "The Five Evaluation Dimensions",
        content: "Weight each dimension as shown. The weights are not arbitrary — they reflect correlation between dimension scores and post-deployment outcome quality across observed deployments.",
        callout: { number: "30%", label: "Weight assigned to Deployment Methodology — the single highest-weighted dimension" }
      }
    ]
  },
  {
    id: 4,
    category: "GOVERNANCE FRAMEWORK",
    categoryColor: "#8B5CF6",
    title: "Governance and Observability in Agentic Systems: What Operations Leaders Must Monitor Post-Deployment",
    provenance: "Governance framework derived from post-deployment monitoring observations across N=18 production deployments",
    readTime: "11 MIN READ",
    date: "JAN 2025",
    dataReliability: "Production monitoring data",
    dataWindow: "2022–2025",
    deploymentRef: "All production deployments",
    methodologyNote: "Governance requirements derived from failure mode analysis.",
    openingParagraph: "In a 2023 logistics deployment, an agentic system had been operating in production for 11 weeks when it began generating duplicate shipment exception alerts for a subset of courier partners.",
    pullQuote: "\"Agentic systems require governance frameworks proportionate to their operational autonomy.\"",
    sections: [
      {
        heading: "The Four Governance Layers",
        content: "Every production agentic system requires governance across four layers. Each layer addresses a different failure mode.",
        callout: { number: "9 days", label: "Time to detection for a duplicate alert generation error in a production deployment" }
      }
    ]
  }
];

const styles = `
  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .fw-root {
    background: #060A0F;
    color: #D0D8E4;
    min-height: 100vh;
    padding-top: 100px;
  }

  .fw-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

  .fw-header { padding: 60px 0 48px; border-bottom: 1px solid #0F1923; }
  .fw-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 52px); color: #F0F4F8; line-height: 1.15; margin-bottom: 16px; font-weight: 600; }
  
  .fw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1px; background: #0A0F15; margin-top: 1px; }
  .fw-card { background: #070C12; padding: 32px 28px; cursor: pointer; transition: background 0.2s; display: flex; flex-direction: column; gap: 14px; }
  .fw-card:hover { background: #0A1018; }
  .fw-card-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #D0D8E4; line-height: 1.4; font-weight: 600; }

  .fw-detail { display: grid; grid-template-columns: 1fr 300px; gap: 60px; padding: 60px 0; }
  @media (max-width: 900px) { .fw-detail { grid-template-columns: 1fr; } }

  .fw-article { line-height: 1.8; color: #8A9AA8; }
  .fw-h1 { font-family: 'Playfair Display', serif; font-size: 36px; color: #EEF2F6; margin-bottom: 24px; }
  .fw-section-h { font-family: 'Playfair Display', serif; font-size: 22px; color: #C0CCD8; margin: 40px 0 16px; }
`;

export default function FrameworksPage() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id');
  const [selectedId, setSelectedId] = useState<number | null>(initialId ? parseInt(initialId) : null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedFw = frameworks.find(f => f.id === selectedId);

  const navLinks = [
    { name: "Field Intelligence", href: "/intelligence" },
    { name: "Frameworks", href: "/intelligence/frameworks" },
    { name: "Deployment Library", href: "/deployments" }
  ];

  return (
    <div className="fw-root font-sans">
      <style>{styles}</style>
      <div className="noise" />
      
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="intelligence"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="fw-container">
        {selectedFw ? (
          <div>
            <button 
              onClick={() => setSelectedId(null)}
              className="text-[#3B82F6] text-xs font-mono uppercase tracking-widest mb-8 hover:underline"
            >
              ← Back to Frameworks
            </button>
            
            <div className="fw-detail">
              <article className="fw-article">
                <div className="text-[10px] font-mono tracking-widest mb-4" style={{ color: selectedFw.categoryColor }}>
                  {selectedFw.category}
                </div>
                <h1 className="fw-h1">{selectedFw.title}</h1>
                <p className="italic text-sm mb-12">{selectedFw.provenance}</p>
                
                <p className="text-lg mb-12">{selectedFw.openingParagraph}</p>
                
                <div className="border-l-2 border-[#1A3A5A] pl-8 py-4 mb-12 italic text-xl font-headline">
                  {selectedFw.pullQuote}
                </div>

                {selectedFw.sections.map((sec, i) => (
                  <div key={i}>
                    <h2 className="fw-section-h">{sec.heading}</h2>
                    <p className="mb-8">{sec.content}</p>
                    {sec.callout && (
                      <div className="bg-[#060B10] border-l-4 border-[#3B82F6] p-6 mb-12 flex gap-8 items-start">
                        <div className="text-3xl font-headline font-bold text-[#3B82F6]">{sec.callout.number}</div>
                        <div className="text-xs italic">{sec.callout.label}</div>
                      </div>
                    )}
                  </div>
                ))}
              </article>

              <aside className="space-y-8">
                <div className="bg-[#070C12] border border-white/5 p-6 rounded-lg space-y-6">
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Metadata</h3>
                  <div className="text-xs">
                    <div className="text-white/20 uppercase mb-1">Data Window</div>
                    <div className="font-bold">{selectedFw.dataWindow}</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-white/20 uppercase mb-1">Reliability</div>
                    <div className="font-bold text-[#3B82F6]">{selectedFw.dataReliability}</div>
                  </div>
                </div>

                <div className="bg-[#0047AB] p-8 rounded-lg text-center space-y-4">
                  <h4 className="font-headline text-lg">Discuss a Diagnostic</h4>
                  <p className="text-xs text-white/70">Validate these benchmarks against your baseline.</p>
                  <button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="w-full bg-white text-[#0047AB] font-bold text-xs py-3 rounded uppercase tracking-widest"
                  >
                    Schedule Now
                  </button>
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div>
            <header className="fw-header">
              <div className="text-[10px] font-mono tracking-widest text-[#3B82F6] uppercase mb-4">Institutional Library</div>
              <h1 className="fw-title">Practitioner Frameworks</h1>
              <p className="text-[#5A6A7A] max-w-2xl text-lg">
                Structured deployment guides, measurement methodologies, and governance frameworks derived from operational deployments across 16 industry contexts.
              </p>
            </header>

            <div className="fw-grid">
              {frameworks.map((fw) => (
                <div 
                  key={fw.id} 
                  className="fw-card"
                  onClick={() => { setSelectedId(fw.id); window.scrollTo(0,0); }}
                >
                  <div className="text-[9px] font-mono tracking-widest mb-2" style={{ color: fw.categoryColor }}>{fw.category}</div>
                  <h3 className="fw-card-title">{fw.title}</h3>
                  <p className="text-[11px] text-white/30 italic line-clamp-2">{fw.provenance}</p>
                  <div className="mt-auto pt-4 flex justify-between items-center text-[10px] font-mono text-white/20">
                    <span>{fw.readTime}</span>
                    <span className="text-[#3B82F6]">Read →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

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
