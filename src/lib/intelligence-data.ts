export type ReliabilityLevel =
  | 'Pilot observation'
  | 'Deployment measurement'
  | 'Benchmark estimate'
  | 'Field-validated'
  | 'Production monitoring data';

export interface InsightSection {
  heading: string;
  content: string;
  callout?: {
    number: string;
    label: string;
  };
}

export interface ChartData {
  label: string;
  before: string;
  after: string;
  impact: string;
  percentage?: number;
}

export interface Insight {
  id: string;
  type: 'insight' | 'framework';
  category:
    | 'Deployment Observations'
    | 'Measurement & Benchmarks'
    | 'Failure Analysis'
    | 'System Design & Architecture'
    | 'Practitioner Framework';
  title: string;
  provenance: string;
  summary: string;
  readingTime: string;
  date: string;
  dataWindow: string;
  reliability: ReliabilityLevel;
  openingParagraph: string;
  pullQuote?: string;
  sections: InsightSection[];
  charts?: ChartData[];
  diagram?: string[];
  deploymentRef?: {
    id: string;
    title: string;
  };
  methodologyNote?: string;
}

export const CATEGORIES = [
  { name: 'All', color: '#888' },
  { name: 'Deployment Observations', color: '#2F5B8A' },
  { name: 'Measurement & Benchmarks', color: '#2E6B4A' },
  { name: 'Failure Analysis', color: '#7A2E2E' },
  { name: 'System Design & Architecture', color: '#5A3A7A' },
  { name: 'Practitioner Framework', color: '#3B82F6' }
];

export const INSIGHTS: Insight[] = [

  {
    id: 'operational-pilot-framework',
    type: 'framework',
    category: 'Practitioner Framework',
    title: 'The Operational Pilot Framework: Scope, Baseline, Deploy, Measure',
    provenance: 'Refined across N=23 operational pilots — manufacturing, finance, real estate, logistics, and healthcare contexts',
    readingTime: '5 min read',
    date: 'FEB 2025',
    dataWindow: '2022–2025',
    reliability: 'Field-validated',
    summary: 'A structured methodology for piloting agentic systems without disrupting core operations; emphasises rigorous baselining and staged calibration.',
    openingParagraph:
      'Of the 23 operational pilots we have run since 2022, 17 produced outcomes within 15% of projection. The six that missed projections shared a single structural failure: the baseline was either poorly defined, captured over too short a window, or compromised by a concurrent process change that the scoping team did not detect.',
    pullQuote:
      'The most common pilot failure is not a technology failure. It is a measurement failure that was baked in during the first two weeks of scoping.',
    sections: [
      {
        heading: 'Phase 1 — Operational Diagnostic (Weeks 1–3)',
        content:
          'Before a single line of system logic is written, spend three weeks understanding the process at operator level — not management level. Management describes what the process should do. Operators describe what it actually does. These are rarely the same.\n\nIn a 2023 AR operations diagnostic at a mid-market manufacturer, management described a 5-step collections process. When we mapped it at operator level, it had 14 steps — 9 of which were undocumented workarounds for system gaps. A pilot scoped against the 5-step description would have failed to cover 60% of the actual workload.\n\nDiagnostic outputs required before proceeding:\n(1) A process map at operator level with step count, average duration per step, and weekly volume.\n(2) A manual hour distribution showing where time goes across the week — not estimated, but logged. Ask operators to track their own time for 5 working days using a simple hour log.\n(3) A systems inventory: every tool, spreadsheet, email thread, or messaging app involved in the process.\n(4) Exception catalogue: the top 5–8 exceptions that break the standard flow, their frequency, and how they are currently handled.',
        callout: {
          number: '14',
          label:
            'Undocumented process steps discovered in a 5-step process — visible only at operator level, not management level.'
        }
      },
      {
        heading: 'Phase 2 — Baseline Capture (Weeks 3–6)',
        content:
          'Baseline capture is the most technically boring and operationally critical phase of any deployment. It determines whether your post-deployment numbers mean anything.\n\nCapture baseline over a minimum of 4 consecutive working weeks. If the process has known seasonal variation — collections during quarter-end, support volume during festival season, admissions during application cycles — baseline must include a representative sample of that variation or results will be uninterpretable.\n\nWhat to measure:\n(1) Primary throughput metric — volume of units processed per week (invoices, leads, tickets, applications).\n(2) Manual hours per week spent on the process — captured by operator time log, not estimated by managers.\n(3) Error rate — define what constitutes an error for this process specifically, then count them.\n(4) Cycle time — end-to-end elapsed time from trigger to completion for the process unit.\n(5) Exception rate — what percentage of process units require non-standard handling.\n\nCommon baseline errors we have made and corrected: Capturing only 2 weeks of baseline is insufficient — variance is too high for a 2-week window to be statistically meaningful. Using manager estimates instead of operator time logs overstates productive time by 20–35% on average in our deployment data. Failing to define \"error\" before capturing baseline means the pre and post measurements end up counting different things.',
        callout: {
          number: '4 weeks',
          label:
            'Minimum baseline capture window. Below this, variance is too high for post-deployment comparisons to be statistically meaningful.'
        }
      },
      {
        heading: 'Phase 3 — Pilot Deployment (Weeks 6–12)',
        content:
          'Scope the pilot to one process segment, one team, or one geography. The pilot proves the system works and calibrates the logic against real operational data — it is not a full deployment.\n\nWeek 6–7: System configuration and integration setup. Connect to live data sources. Do not use test data — pilots run on test environments consistently underperform live environments because the data quality differences are significant.\n\nWeek 8: Parallel run. System operates alongside the existing process. Operators continue doing their work manually. System outputs are checked against manual outputs. Discrepancies are logged and investigated.\n\nWeek 9–10: Transition. System takes primary ownership of defined process segments. Manual fallback remains available. Operators log exceptions daily.\n\nWeek 11–12: Measurement. Compare against baseline using the same metrics, same definitions, same time-of-week capture windows.\n\nCritical calibration event: In 14 of 23 pilots, the escalation threshold required recalibration between weeks 8 and 10. The initial threshold was set based on historical data — but live operational data always has patterns that historical data obscures. Build threshold review into the pilot schedule explicitly, not as an ad hoc response.',
        callout: {
          number: '14 of 23',
          label:
            'Pilots requiring escalation threshold recalibration between weeks 8–10; budget for this adjustment in every pilot plan.'
        }
      },
      {
        heading: 'Phase 4 — Measurement and Handoff (Weeks 12–14)',
        content:
          'Post-pilot measurement follows the same protocol as baseline capture: same metrics, same definitions, same 4-week window. Do not compress the measurement window because the pilot went well — the stabilisation period matters. Systems often show strong week 9–10 performance that regresses slightly in weeks 11–12 as edge cases accumulate. The 4-week measurement window captures this regression and produces a more honest outcome figure.\n\nDecision gate: At week 14, the measurement data supports one of three decisions:\n(1) Full deployment — outcomes within 15% of projection across primary metrics.\n(2) Extended pilot — outcomes directionally positive but below threshold; recalibrate and extend 4 weeks.\n(3) Redesign — fundamental scoping assumption was incorrect; return to diagnostic phase for the affected process segment.\n\nOf our 23 pilots: 17 proceeded to full deployment. 4 went through extended pilot before deployment. 2 required redesign — in both cases, the root cause was a systems integration constraint identified too late in the diagnostic phase. Both were eventually deployed successfully after redesign.',
        callout: {
          number: '17 / 4 / 2',
          label:
            'Pilot outcomes across 23 deployments: full deployment / extended pilot / redesign required.'
        }
      },
      {
        heading: 'What We Got Wrong — Honest Retrospective',
        content:
          'Discovery phase underestimated phone channel complexity in 4 deployments. Phone-based processes have dramatically more variation than digital processes and require more exception logic than initial scoping typically accounts for. We now run a separate phone channel technical assessment as a mandatory diagnostic step.\n\nParallel run period was too short in 3 early deployments. We ran 3-day parallel runs before transitioning. This is insufficient. The minimum parallel run period should be 5 working days — enough to encounter the week\'s natural variation in process inputs. Short parallel runs miss the edge cases that only appear on specific days: end-of-month for AR, Monday morning for support, Friday afternoon for logistics.\n\nOperator adoption was assumed, not managed, in 2 deployments. Systems that perform well technically can still underperform operationally if operators find workarounds more comfortable than system-managed processes. Structured operator onboarding — not just training — is a deployment variable, not an afterthought.'
      }
    ],
    diagram: [
      'Phase 1 — Operational Diagnostic (Weeks 1–3)',
      'Phase 2 — Baseline Capture (Weeks 3–6)',
      'Phase 3 — Pilot Deployment (Weeks 6–12)',
      'Phase 4 — Measurement and Handoff (Weeks 12–14)'
    ],
    methodologyNote:
      'Build explicit threshold review and operator onboarding steps into every pilot plan. Use operator-level mapping and 4-week baseline windows to avoid measurement bias.'
  },

  {
    id: 'baseline-capture-measurement-methodology',
    type: 'framework',
    category: 'Practitioner Framework',
    title: 'Baseline Capture and Measurement Methodology for Operational Deployments',
    provenance: 'Refined across N=20+ deployments. Incorporates corrections from 6 baseline failures between 2022–2023.',
    readingTime: '4 min read',
    date: 'FEB 2025',
    dataWindow: '2022–2025',
    reliability: 'Deployment measurement',
  
    summary:
      'A rigorous framework for capturing operational baselines and measuring post-deployment outcomes with defensible methodology.',
  
    openingParagraph:
      'In 2022, we published an AR deployment outcome showing a 71% reduction in manual follow-up hours. A client asked us to verify the figure. When we reconstructed the measurement, we found the pre-deployment baseline had been captured during a holiday-adjacent fortnight when collections volume was 34% below normal. The real reduction was 52%. We corrected the figure, documented the methodology failure, and rebuilt the baseline framework from scratch. Everything in this document reflects that rebuild.',
  
    pullQuote:
      'A deployment that produces unmeasurable outcomes is operationally equivalent to a deployment that produced no outcomes. The measurement is not a formality — it is the deliverable.',
  
    sections: [
      {
        heading: 'Defining the Measurement Unit',
        content:
          'Before capturing any numbers, define the unit of measurement with precision. In a 2023 customer support deployment, we tracked "tickets resolved per day" as the primary metric. Post-deployment we discovered the system had reclassified certain query types, reducing the denominator. The apparent improvement was partly definitional rather than operational.\n\nFor every metric document:\n(1) What counts as a unit — define inclusion and exclusion criteria explicitly.\n(2) When the unit is counted — at creation, completion, or escalation.\n(3) Who counts it — system log, operator record, or manager report.\n(4) What constitutes an exception to the standard counting method and how it is handled.\n\nExample: In AR operations a "manual follow-up action" is defined as a documented outbound contact attempt (call, email, or message) made by a finance team member regarding an overdue invoice — excluding system-generated contacts.',
        callout: {
          number: '34%',
          label:
            'Below-normal collections volume during a baseline period that produced an overstated outcome figure — discovered during client verification.'
        }
      },
  
      {
        heading: 'Baseline Window Design',
        content:
          'Standard baseline window: four consecutive working weeks. This is the minimum required for stable measurement.\n\nProcesses with cyclical variation require full-cycle measurement. Monthly close processes require two complete close cycles. Seasonal retail operations must avoid measuring peak and non-peak periods against each other because volume differences can dwarf automation impact.\n\nRecruitment pipelines must baseline during active hiring cycles rather than hiring freezes to avoid misleading throughput comparisons.'
        ,
        callout: {
          number: '40–80%',
          label:
            'Observed volume difference between peak and normal retail periods — large enough to invalidate cross-period comparisons.'
        }
      },
  
      {
        heading: 'The Five Metrics Every Operational Deployment Should Track',
        content:
          'Across more than 20 deployments, five metrics have consistently proven meaningful and comparable across operational environments.\n\n(1) Manual hours per week on the process — captured using operator time logs rather than manager estimates.\n(2) Cycle time — elapsed time from process trigger to completion. Track the 50th and 90th percentiles rather than averages.\n(3) Error rate — based on the exact definition established during scoping.\n(4) Exception rate — percentage of units requiring non-standard handling.\n(5) Throughput volume — total units processed per week, used to normalise other metrics when operational volume changes.'
        ,
        callout: {
          number: '22%',
          label:
            'Average overestimation of productive time when managers estimate operator hours versus operator time logs in our deployment data.'
        }
      },
  
      {
        heading: 'Post-Deployment Measurement Protocol',
        content:
          'Measurement begins only after the system has stabilised. Stability is defined as two consecutive weeks with no threshold recalibrations, no integration errors requiring manual intervention, and operator exception logs showing less than 5% system-handling failures.\n\nMeasurement window: four weeks using the same methodology as baseline capture — identical metrics, definitions, and reporting formats.\n\nVolume normalisation: if measurement-period volume differs from baseline by more than 15%, convert hour-based metrics to per-unit rates before comparing outcomes. This ensures that automation efficiency is evaluated independently of workload fluctuations.'
      }
    ],
  
    diagram: [
      'Metric Definition',
      'Baseline Measurement Window',
      'Pilot Deployment',
      'Operational Stabilisation',
      'Post-Deployment Measurement'
    ],
  
    methodologyNote:
      'Baseline and measurement windows must use identical definitions, counting protocols, and observation periods. Without this consistency, operational outcomes cannot be defended or compared.'
  }
  

];
