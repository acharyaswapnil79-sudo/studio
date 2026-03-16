export type ReliabilityLevel = 'Pilot observation' | 'Deployment measurement' | 'Benchmark estimate' | 'Field-validated' | 'Production monitoring data';

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
  category: 'Deployment Observations' | 'Measurement & Benchmarks' | 'Failure Analysis' | 'System Design & Architecture' | 'Practitioner Framework' | 'Measurement Methodology' | 'Vendor Evaluation' | 'Governance Framework' | 'Sales Operations' | 'Finance Operations' | 'Healthcare Operations' | 'Real Estate Operations' | 'Procurement Operations' | 'Customer Operations' | 'Talent Acquisition' | 'Logistics Operations' | 'Compliance Operations' | 'Contract Intelligence' | 'Manufacturing Quality' | 'Financial Consolidation';
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
  { name: 'Practitioner Frameworks', color: '#3B82F6' }
];

export const INSIGHTS: Insight[] = [
  {
    id: 'accounts-receivable-friction',
    type: 'insight',
    category: 'Deployment Observations',
    title: 'Accounts Receivable: Observed Friction in Mid-Market Industrial Billing',
    provenance: 'Observations across 14 manufacturing billing cycles',
    summary: 'Analysis of common escalation bottlenecks and the performance of agentic follow-up sequences in high-volume AR operations.',
    readingTime: '7 min read',
    date: 'Mar 2025',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    openingParagraph: 'In high-volume industrial billing environments, we observed that 62% of collections delays are caused by clerical oversight rather than credit risk. Agentic systems deployed in these environments handled 85% of initial follow-ups without human intervention.',
    pullQuote: 'Most AR friction comes from invoice visibility gaps, not customer unwillingness to pay.',
    sections: [
      {
        heading: 'Manual Follow-up Bottlenecks',
        content: 'Pre-deployment data showed that finance teams spent average 42 hours per week on manual follow-ups. The primary bottleneck was not the call itself, but the data gathering required before the call.'
      }
    ],
    charts: [
      { label: 'Manual AR Follow-Up Hours', before: '42 hrs/week', after: '11 hrs/week', impact: '74% reduction' }
    ],
    diagram: ['Invoice Generated', 'Payment Monitoring', 'Automated Follow-Up Sequence', 'Escalation Threshold', 'Human Review'],
    deploymentRef: { id: 'mfg-ar', title: 'AR Operations' }
  },
  {
    id: 'lead-response-time-benchmarks',
    type: 'insight',
    category: 'Measurement & Benchmarks',
    title: 'Lead Operations Benchmarks: Response Time vs Qualified Conversion',
    provenance: 'Cross-industry dataset (Real Estate + Education)',
    summary: 'Quantifying the correlation between agentic triage speed and sales pipeline coverage across 1,200 weekly inbound leads.',
    readingTime: '5 min read',
    date: 'Feb 2025',
    dataWindow: '2024',
    reliability: 'Deployment measurement',
    openingParagraph: 'Leads contacted within 10 minutes convert 3.2× more often than those contacted after 60 minutes. Our dataset covers 1,200 inbound leads per week across real estate and education sectors.',
    pullQuote: 'Speed to lead is the single most significant predictor of qualification outcome in digital channels.',
    sections: [
      {
        heading: 'The Qualification Decay Curve',
        content: 'Data indicates that the "first contact" advantage decays significantly after the 30-minute mark. Response latency is directly correlated with prospect "no-show" rates.'
      }
    ],
    charts: [
      { label: '<10 min Response', before: 'Baseline', after: '18% Qual Rate', impact: '3.2x vs 60min' },
      { label: '10–30 min Response', before: 'Baseline', after: '12% Qual Rate', impact: '2.1x vs 60min' }
    ],
    diagram: ['Lead Capture', 'Intent Scoring', 'Qualification Routing', 'Sales Rep Engagement'],
    deploymentRef: { id: 're-leads', title: 'Intelligent Lead Operations' }
  },
  {
    id: 'agentic-governance-patterns',
    type: 'insight',
    category: 'System Design & Architecture',
    title: 'Governance Patterns for Agentic Operational Cores',
    provenance: 'Framework derived from enterprise deployment requirements',
    summary: 'A practitioner architectural overview of how to build human-in-the-loop audit trails for autonomous systems.',
    readingTime: '12 min read',
    date: 'Dec 2024',
    dataWindow: '2024',
    reliability: 'Benchmark estimate',
    openingParagraph: 'Every system decision must be logged with structured metadata including decision context and confidence scores. Human-in-the-loop (HITL) triggers should be based on risk-weighted thresholds rather than task completion.',
    pullQuote: 'Agentic systems require governance frameworks proportionate to their operational autonomy.',
    sections: [
      {
        heading: 'Layer 1: Action Logging',
        content: 'Every discrete action taken by the agent must be immutable and timestamped. This forms the basis of the audit trail.'
      },
      {
        heading: 'Layer 2: Volume Monitoring',
        content: 'Set alert thresholds for abnormal volume in both directions to detect integration disconnects or runaway processes.'
      }
    ],
    diagram: ['Operational Inputs', 'Agentic Decision Engine', 'Audit Log', 'Escalation Engine', 'Human Oversight']
  },
  {
    id: 'failure-mode-analysis-thresholds',
    type: 'insight',
    category: 'Failure Analysis',
    title: 'Failure Mode Analysis: Why Static Thresholds Fail in Dynamic Operations',
    provenance: 'Retrospective across 3 failed deployments',
    summary: 'Detailed analysis of why hard-coded operational rules fail during seasonal surges and the transition to adaptive system logic.',
    readingTime: '9 min read',
    date: 'Jan 2025',
    dataWindow: '2023–2024',
    reliability: 'Pilot observation',
    openingParagraph: 'Static thresholds failed to account for a 30% surge in document intake during Q4 reporting periods. Systems initially flagged 18% false positives due to rigid rule definitions.',
    sections: [
      {
        heading: 'Adaptive Logic Improvements',
        content: 'The resolution involved implementing adaptive logic that calibrates against a 7-day rolling operational average rather than fixed values.'
      }
    ],
    charts: [
      { label: 'Static Thresholds', before: 'Baseline', after: '22% Exception Rate', impact: 'Inefficient' },
      { label: 'Adaptive Thresholds', before: 'Baseline', after: '7% Exception Rate', impact: '68% Improvement' }
    ]
  },
  {
    id: 'operational-pilot-framework',
    type: 'framework',
    category: 'Practitioner Framework',
    title: 'The Operational Pilot Framework: Scope, Baseline, Deploy, Measure',
    provenance: 'Refined across N=23 operational pilots',
    readingTime: '12 min read',
    date: 'FEB 2025',
    dataWindow: '2022–2025',
    reliability: 'Field-validated',
    summary: 'A structured methodology for piloting agentic systems without disrupting core operations.',
    openingParagraph: 'Of the 23 operational pilots we have run since 2022, 17 produced outcomes within 15% of projection. The six that missed projections shared a single structural failure: the baseline was either poorly defined or compromised by a concurrent process change.',
    pullQuote: "The most common pilot failure is not a technology failure. It is a measurement failure that was baked in during the first two weeks of scoping.",
    sections: [
      {
        heading: 'Phase 1 — Operational Diagnostic (Weeks 1–3)',
        content: 'Before a single line of system logic is written, spend three weeks understanding the process at operator level. Management describes what the process should do; operators describe what it actually does.',
        callout: { number: '14', label: 'Undocumented process steps discovered in a 5-step process — visible only at operator level.' }
      },
      {
        heading: 'Phase 2 — Baseline Capture (Weeks 3–6)',
        content: 'Capture baseline over a minimum of 4 consecutive working weeks. If the process has known seasonal variation, the baseline must include a representative sample.'
      },
      {
        heading: 'Phase 3 — Pilot Deployment (Weeks 6–12)',
        content: 'Scope the pilot to one process segment. Week 8: Parallel run where system outputs are checked against manual outputs.',
        callout: { number: '14/23', label: 'Pilots requiring escalation threshold recalibration between weeks 8–10.' }
      }
    ]
  },
  {
    id: 'baseline-capture-methodology',
    type: 'framework',
    category: 'Measurement Methodology',
    title: 'Baseline Capture and Measurement Methodology for Operational Deployments',
    provenance: 'Refined across N=20+ deployments',
    readingTime: '10 min read',
    date: 'FEB 2025',
    dataWindow: '2022–2025',
    reliability: 'Deployment measurement',
    summary: 'Standard protocol for establishing the "Before" state in operational transformations.',
    openingParagraph: 'In 2022, a corrected reduction figure of 52% (vs initially reported 71%) led us to rebuild the baseline framework from scratch. This document reflects that rebuild.',
    pullQuote: "A deployment that produces unmeasurable outcomes is operationally equivalent to a deployment that produced no outcomes.",
    sections: [
      {
        heading: 'Defining the Measurement Unit',
        content: 'Before capturing any numbers, define the unit of measurement with precision. Document what counts as a unit, when it is counted, and who counts it.',
        callout: { number: '34%', label: 'Below-normal volume during a holiday period that produced an overstated initial outcome figure.' }
      }
    ]
  },
  {
    id: 'vendor-evaluation-scorecard',
    type: 'framework',
    category: 'Vendor Evaluation',
    title: 'Agentic Systems Vendor Evaluation: A Structured Scorecard for Operations Leaders',
    provenance: 'Developed from analysis of 8 competitive evaluations',
    readingTime: '9 min read',
    date: 'JAN 2025',
    dataWindow: '2023–2025',
    reliability: 'Framework-based',
    summary: 'A weight-based framework for evaluating agentic technology vendors.',
    openingParagraph: 'Most vendor evaluations fail because they score on features, not on deployment methodology. Vendors that score highest on feature matrices often deliver below-median outcomes.',
    pullQuote: "Ask any vendor: how do you define the baseline, and who captures it? If they cannot answer in three sentences, their measurement framework does not exist.",
    sections: [
      {
        heading: 'The Five Evaluation Dimensions',
        content: 'Deployment Methodology (30%), Measurement Transparency (25%), Integration Depth (20%), Governance Capabilities (15%), Commercial Structure (10%).',
        callout: { number: '30%', label: 'Weight assigned to Deployment Methodology — the single highest-weighted dimension.' }
      }
    ]
  },
  {
    id: 'governance-observability-architecture',
    type: 'framework',
    category: 'Governance Framework',
    title: 'Governance and Observability in Agentic Systems: What Operations Leaders Must Monitor',
    provenance: 'Derived from N=18 production deployments',
    readingTime: '11 min read',
    date: 'JAN 2025',
    dataWindow: '2022–2025',
    reliability: 'Production monitoring data',
    summary: 'Post-deployment monitoring and escalation framework for autonomous systems.',
    openingParagraph: 'In a 2023 logistics deployment, a 9-day undetected error generated 140 duplicate notifications because no volume threshold had been set.',
    pullQuote: "Agentic systems require governance frameworks proportionate to their operational autonomy.",
    sections: [
      {
        heading: 'The Four Governance Layers',
        content: 'Action Logging, Volume Monitoring, Exception Rate Monitoring, and Outcome Quality Sampling.',
        callout: { number: '9 days', label: 'Time to detection for a duplicate alert error in a production deployment.' }
      }
    ]
  },
  {
    id: 'sales-ops-transformation',
    type: 'framework',
    category: 'Sales Operations',
    title: 'Sales Operations Transformation: Designing Agentic Systems for Revenue workflows',
    provenance: 'Observations across N=9 sales ops deployments',
    readingTime: '8 min read',
    date: 'MAR 2025',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    summary: 'Framework for eliminating administrative load from sales teams.',
    openingParagraph: 'Sales representatives have income tied to process control. A lead misqualified by a system is not an error — it is a commission dispute.',
    sections: [
      {
        heading: 'Where Sales Teams Lose Time',
        content: 'Pre-deployment mapping showed only 11% of sales rep time was spent on direct revenue-generating activities.',
        callout: { number: '11%', label: 'Percentage of sales rep time spent on client conversations in a 2023 pre-deployment mapping.' }
      }
    ]
  },
  {
    id: 'cfo-deployment-guide',
    type: 'framework',
    category: 'Finance Operations',
    title: "The CFO's Deployment Guide: Agentic Systems Across the Finance Function",
    provenance: 'Analysis across N=11 finance ops deployments',
    readingTime: '13 min read',
    date: 'MAR 2025',
    dataWindow: '2022–2025',
    reliability: 'Deployment measurement',
    summary: 'Strategic guide for automating finance processes while maintaining audit readiness.',
    openingParagraph: 'Mid-market finance functions are run by people who are overqualified for most of what they do — spending hours on data entry and follow-up.',
    sections: [
      {
        heading: 'The Finance Manual Work Distribution',
        content: 'Accounts Receivable (31%), Month-End Close (26%), Reporting (18%), Vendor Ops (14%), Compliance (11%).',
        callout: { number: '89%', label: 'Percentage of finance manual hours in processes suitable for agentic management.' }
      }
    ]
  },
  {
    id: 'healthcare-administrative-systems',
    type: 'framework',
    category: 'Healthcare Operations',
    title: 'Administrative Efficiency in Healthcare Settings: An Agentic Systems Framework',
    provenance: 'Observations across N=4 healthcare deployments',
    readingTime: '7 min read',
    date: 'DEC 2024',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    summary: 'Operationalizing patient communication and claims processing.',
    openingParagraph: 'No-shows are not patient behaviour problems. They are operational problems with operational solutions.',
    sections: [
      {
        heading: 'The No-Show Problem',
        content: '72% of no-shows are attributable to communication timing and frequency gaps.',
        callout: { number: '72%', label: 'Percentage of no-shows solvable via administrative protocol adjustments.' }
      }
    ]
  },
  {
    id: 'real-estate-lead-design',
    type: 'framework',
    category: 'Real Estate Operations',
    title: 'Lead Operations Design Framework for Real Estate Sales Teams',
    provenance: 'Observations from N=5 real estate deployments',
    readingTime: '9 min read',
    date: 'DEC 2024',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    summary: 'Architecture for unifying fragmented lead sources in the property sector.',
    openingParagraph: 'In real estate, lead response time is a marketing efficiency metric — it determines the effective cost per prospect.',
    sections: [
      {
        heading: 'The Multi-Source Problem',
        content: 'Portals, webhooks, WhatsApp, and walk-ins create fragmented queues. A unified ingestion layer is the first requirement.',
        callout: { number: '3.8 hours', label: 'Median time for a portal lead to reach a rep in pre-deployment context.' }
      }
    ]
  },
  {
    id: 'procurement-vendor-ops-architecture',
    type: 'framework',
    category: 'Procurement Operations',
    title: 'Procurement & Vendor Operations System Design: PO Chaos to Visibility',
    provenance: 'Observations across N=5 procurement deployments',
    readingTime: '8 min read',
    date: 'NOV 2024',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    summary: 'Building proactive tracking for Purchase Order management.',
    openingParagraph: 'Tracking 80 active purchase orders across 40 suppliers is an information management problem, not a human performance problem.',
    sections: [
      {
        heading: 'The Cost of Reactive Visibility',
        content: 'Delays are typically identified 2.1 days after they occur. Proactive tracking can shift this window to 1.5 days before the event.',
        callout: { number: '3.8 days', label: 'Total shift in the delay identification window enabled by proactive monitoring.' }
      }
    ]
  },
  {
    id: 'customer-support-deflection',
    type: 'framework',
    category: 'Customer Operations',
    title: 'Customer Operations Deflection Architecture: Designing Tier-1 Resolution',
    provenance: 'Observations across N=6 customer ops deployments',
    readingTime: '10 min read',
    date: 'NOV 2024',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    summary: 'Technical framework for Tier-1 support automation.',
    openingParagraph: 'Deflection is not about reducing service quality. It is about reserving human judgment for interactions that require it.',
    sections: [
      {
        heading: 'The Deflection Reality',
        content: 'Methodologically honest deflection rates range from 52–71% after 90 days of refinement.',
        callout: { number: '52–71%', label: 'Measured deflection rate range for confirmed resolutions across N=6 deployments.' }
      }
    ]
  },
  {
    id: 'talent-acquisition-intake',
    type: 'framework',
    category: 'Talent Acquisition',
    title: 'HR and Talent Acquisition System Design: Intake to Qualified Shortlist',
    provenance: 'Observations from N=5 talent acquisition deployments',
    readingTime: '7 min read',
    date: 'OCT 2024',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    summary: 'Standardizing candidate screening and scheduling pipelines.',
    openingParagraph: 'Recruiters spend 55–70% of their weekly hours on intake administration rather than assessment.',
    sections: [
      {
        heading: 'The Intake Problem',
        content: 'Normalising applications from all sources into a single structured record within 15 minutes removes the triage burden.',
        callout: { number: '5.7 hrs/day', label: 'Average recruiter time spent on administration in pre-deployment contexts.' }
      }
    ]
  },
  {
    id: 'logistics-exception-management',
    type: 'framework',
    category: 'Logistics Operations',
    title: 'Exception Management in Logistics: Reactive-to-Proactive Transition',
    provenance: 'Observations from N=4 logistics deployments',
    readingTime: '8 min read',
    date: 'OCT 2024',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    summary: 'Real-time exception tracking across multi-carrier environments.',
    openingParagraph: 'Logistics operations that identify exceptions after they occur are managing the aftermath of logistics, not logistics itself.',
    sections: [
      {
        heading: 'The Multi-Portal Problem',
        content: 'Coordinators often check 4+ portals manually. A unified monitoring system replaces 16–20 hours of manual work per week.',
        callout: { number: '16–20 hrs', label: 'Weekly coordinator hours consumed by manual status monitoring pre-deployment.' }
      }
    ]
  },
  {
    id: 'compliance-monitoring-architecture',
    type: 'framework',
    category: 'Compliance Operations',
    title: 'Compliance Monitoring Architecture: Catching Obligations Early',
    provenance: 'Observations from N=4 compliance deployments',
    readingTime: '11 min read',
    date: 'SEP 2024',
    dataWindow: '2023–2025',
    reliability: 'Deployment measurement',
    summary: 'Administrative tracking systems for regulatory and contractual obligations.',
    openingParagraph: 'Compliance failures are almost never caused by misunderstanding; they are caused by administrative workflow failures.',
    sections: [
      {
        heading: 'The Obligation Inventory',
        content: 'Audits often reveal that organisations track only about 50% of their actual regulatory and contractual obligations.',
        callout: { number: '67 vs 34', label: 'Obligations identified in audit vs those believed to be tracked by management.' }
      }
    ]
  },
  {
    id: 'contract-intelligence-deployment',
    type: 'framework',
    category: 'Contract Intelligence',
    title: 'Contract Intelligence Deployment: Repositories to Obligation Management',
    provenance: 'Framework developed across N=3 contract intelligence deployments',
    readingTime: '9 min read',
    date: 'AUG 2024',
    dataWindow: '2023–2025',
    reliability: 'Framework-based',
    summary: 'Activating document data for lifecycle and renewal management.',
    openingParagraph: 'Contract repositories that require human initiative to check for renewals will, eventually, miss a deadline.',
    sections: [
      {
        heading: 'Auto-Renewal Risks',
        content: '68% of software and service contracts contain auto-renewal clauses that activate without human monitoring.',
        callout: { number: '68%', label: 'Percentage of contracts with auto-renewal clauses in our audit data.' }
      }
    ]
  },
  {
    id: 'manufacturing-quality-reporting',
    type: 'framework',
    category: 'Manufacturing Quality',
    title: 'Quality Reporting Operations in Manufacturing: Shift-End to Real-Time',
    provenance: 'Observations from N=3 manufacturing quality deployments',
    readingTime: '7 min read',
    date: 'JUL 2024',
    dataWindow: '2023–2024',
    reliability: 'Deployment measurement',
    summary: 'Eliminating the 24-hour lag in production quality visibility.',
    openingParagraph: 'Quality reports that arrive after the production batch has shipped are historical documents, not operational tools.',
    sections: [
      {
        heading: 'The Transcription Bottleneck',
        content: 'Point-of-check digital capture eliminates 3.2 hours per day of manual shift-end paper transcription.',
        callout: { number: '6.2 hrs → 8 min', label: 'Improvement in non-conformance identification lag after deployment.' }
      }
    ]
  },
  {
    id: 'multi-entity-consolidation',
    type: 'framework',
    category: 'Financial Consolidation',
    title: 'Multi-Entity Financial Consolidation: Designing for Complex Architectures',
    provenance: 'Framework developed across N=4 multi-entity deployments',
    readingTime: '12 min read',
    date: 'JUN 2024',
    dataWindow: '2022–2025',
    reliability: 'Deployment measurement',
    summary: 'Compressing the close cycle for groups with complex intercompany relationships.',
    openingParagraph: 'Every time a business adds an entity, it adds exponential intercompany matching complexity.',
    sections: [
      {
        heading: 'The Tally Constraint',
        content: 'Tally integration requires honest accounting for polling intervals and manual export triggers.',
        callout: { number: '74%', label: 'Auto-match rate for intercompany transactions in a 2023 deployment.' }
      }
    ]
  }
];
