
// ==============================
// RELIABILITY
// ==============================

export const RELIABILITY_LEVELS = [
  'Pilot observation',
  'Deployment measurement',
  'Benchmark estimate',
  'Field-validated',
  'Production monitoring data'
] as const;

export type ReliabilityLevel = typeof RELIABILITY_LEVELS[number];

// ==============================
// CATEGORIES
// ==============================

export const CATEGORY_NAMES = [
  'All',
  'Deployment Observations',
  'Measurement & Benchmarks',
  'Failure Analysis',
  'System Design & Architecture',
  'Practitioner Framework'
] as const;

export type Category = typeof CATEGORY_NAMES[number];

// ==============================
// SECTION TYPE
// ==============================

export interface InsightSection {
  heading: string;
  content: string;
  callout?: {
    number: string;
    label: string;
  };
}

// ==============================
// MAIN INSIGHT TYPE
// ==============================

export interface Insight {
  id: string;
  type: 'insight' | 'framework';

  title: string;
  category: Exclude<Category, 'All'>;

  summary: string;
  readingTime: string;
  date: string;
  dataWindow: string;

  reliability: ReliabilityLevel;
  provenance: string;

  openingParagraph: string;
  pullQuote?: string;

  sections: InsightSection[];
}

// ==============================
// DATA (Field Intelligence Content)
// ==============================

export const INSIGHTS: Insight[] = [
    {
      id: 'framework-12',
      type: 'framework',
      category: 'Practitioner Framework',
      title: 'Exception Management in Logistics Operations: Designing Systems for the Reactive-to-Proactive Transition',
      provenance: 'Observations from N=4 logistics and supply chain operations deployments — last-mile delivery, vendor invoice reconciliation, and shipment tracking contexts',
      readingTime: '8 min read',
      date: 'MAR 2026',
      dataWindow: '2023–2025',
      reliability: 'Field-validated',
      summary: 'A structured approach to classifying, routing, and resolving logistics exceptions — reducing coordinator overhead and recovering invoice discrepancy costs through systematic exception management.',
      openingParagraph: 'Logistics operations are characterised by a decision asymmetry that most logistics managers understand intuitively but rarely quantify: the cost of early exception identification is low (a 15-minute system alert), while the cost of late exception identification is high (a missed delivery window, an expedited re-shipment, a client SLA breach). The gap between these two costs is the financial case for logistics exception management systems.',
      pullQuote: 'A logistics operation that identifies delivery exceptions after they have already occurred is not managing logistics. It is managing the aftermath of logistics.',
      sections: [
        {
          heading: 'Exception Classification in Logistics',
          content: 'Exceptions fall into three tiers with distinct urgency and resolution windows. Tier 1 covers delivery execution exceptions — failed attempts, address mismatches, vehicle breakdowns — requiring resolution within 2 hours. Tier 2 covers administrative exceptions such as invoice discrepancies and documentation gaps, with a 24-hour resolution window. Tier 3 consists of monitoring flags — shipments tracking behind timeline, repeat exception patterns, or volume spikes — surfaced in weekly reviews. A well-designed system generates Tier 1 alerts immediately, batches Tier 2 into daily summaries, and surfaces Tier 3 in weekly operational reviews.',
          callout: {
            number: 'Tier 1',
            label: 'Delivery execution exceptions requiring resolution within 2 hours — the tier where late identification has immediate, unrecoverable revenue impact'
          }
        },
        {
          heading: 'The Multi-Courier Portal Problem',
          content: 'In a typical last-mile coordinator\'s day, manual status checks across four courier portals — cross-referenced against dispatch records — consumed 16–20 coordinator hours per week in a 2,200-shipment-per-week operation. Consolidation systems resolve this by pulling status data from each courier API on a defined schedule (every 30–60 minutes for Tier 1 exception types) and surfacing exceptions in a single interface.',
          callout: {
            number: '16–20 hrs',
            label: 'Coordinator hours consumed per week by manual multi-portal status monitoring in a 2,200-shipment-per-week operation'
          }
        }
      ]
    },
    {
      id: 'framework-13',
      type: 'framework',
      category: 'System Design & Architecture',
      title: 'Compliance Monitoring Architecture: Building Systems That Catch Obligations Before They Become Breaches',
      provenance: 'Observations from N=4 compliance and regulatory operations deployments — financial services, healthcare administration, and professional services contexts',
      readingTime: '11 min read',
      date: 'MAR 2026',
      dataWindow: '2023–2025',
      reliability: 'Field-validated',
      summary: 'A compliance monitoring architecture that addresses the root cause of mid-market compliance failures — not regulatory misunderstanding, but obligation inventory gaps and workflow breakdown.',
      openingParagraph: 'Compliance failures in mid-market organisations are almost never caused by wilful non-compliance or regulatory misunderstanding. They are caused by administrative failures: an obligation tracked in a shared calendar that nobody checked, a deadline remembered by an individual who left the organisation, a filing prepared but not submitted because the approval chain broke down.',
      pullQuote: 'The compliance function in a mid-market business is typically understaffed, over-reliant on individual knowledge, and managing obligations with tools designed for personal task management.',
      sections: [
        {
          heading: 'The Compliance Obligation Inventory',
          content: 'Across all four compliance deployments, the first diagnostic step — an obligation inventory audit — produced results that surprised compliance and finance leadership in every case. In a 2023 financial services intermediary deployment, the compliance officer believed the organisation was tracking 34 regulatory obligations. The audit identified 67.',
          callout: {
            number: '67 vs 34',
            label: 'Obligations identified in compliance audit versus obligations believed to be tracked by the compliance officer — a 97% visibility gap.'
          }
        }
      ]
    },
    {
      id: 'framework-14',
      type: 'framework',
      category: 'Deployment Observations',
      title: 'Contract Intelligence Deployment: From Document Repositories to Active Obligation Management',
      provenance: 'Framework developed across N=3 contract and document intelligence deployments — professional services, legal, and corporate contexts',
      readingTime: '9 min read',
      date: 'FEB 2026',
      dataWindow: '2023–2025',
      reliability: 'Field-validated',
      summary: 'A deployment framework for converting static contract repositories into active obligation registers — covering audit methodology and document intelligence accuracy boundaries.',
      openingParagraph: 'Most mid-market businesses have a contract management problem that they do not know they have. They believe they manage their contracts because they have executed documents in a shared folder. What they are actually doing is archiving contracts — storing them in a way that provides retrieval, but not visibility.',
      pullQuote: 'The average mid-market business has 80–200 active contracts containing obligations that are not tracked anywhere.',
      sections: [
        {
          heading: 'The Contract Obligation Audit',
          content: 'Across three contract intelligence deployments, actual active contract count was 1.4–2.1× the count believed by management. The additional contracts were typically vendor agreements, software licences, and infrastructure contracts managed by functional teams without central visibility.',
          callout: {
            number: '68%',
            label: 'Percentage of software and service contracts containing auto-renewal clauses — the most common source of unexpected renewal commitments'
          }
        }
      ]
    },
    {
      id: 'framework-15',
      type: 'framework',
      category: 'Measurement & Benchmarks',
      title: 'Quality Reporting Operations in Manufacturing: From Shift-End Transcription to Real-Time Visibility',
      provenance: 'Observations from N=3 manufacturing quality operations deployments — food processing, components manufacturing, and pharmaceutical packaging contexts',
      readingTime: '7 min read',
      date: 'FEB 2026',
      dataWindow: '2023–2025',
      reliability: 'Field-validated',
      summary: 'A framework for eliminating the transcription bottleneck in manufacturing quality operations — replacing paper-based shift-end data entry with point-of-check digital capture.',
      openingParagraph: 'Quality operations in manufacturing facilities share a structural inefficiency that creates a paradox: the closer you are to the production process, the later you receive quality data about it.',
      pullQuote: 'Quality reports that arrive after the production batch has shipped are historical documents.',
      sections: [
        {
          heading: 'The Data Transcription Bottleneck',
          content: 'In all three manufacturing quality deployments, the primary manual work burden was end-of-shift transcription of paper-based quality check records into the digital quality management system.',
          callout: {
            number: '3.2 hrs/day',
            label: 'QA team time spent on end-of-shift paper record transcription in a 6-station food processing facility.'
          }
        }
      ]
    },
    {
      id: 'framework-01',
      type: 'framework',
      category: 'Practitioner Framework',
      title: 'The Operational Pilot Framework: Scope, Baseline, Deploy, Measure',
      provenance: 'Refined across N=23 operational pilots — manufacturing, finance, real estate, logistics, and healthcare contexts',
      readingTime: '12 min read',
      date: 'JAN 2026',
      dataWindow: '2022–2025',
      reliability: 'Field-validated',
      summary: 'A four-phase framework for running operational pilots that produce defensible outcomes — covering diagnostic mapping, baseline capture, and measurement protocols.',
      openingParagraph: 'Of the 23 operational pilots we have run since 2022, 17 produced outcomes within 15% of projection. The six that missed projections shared a single structural failure: the baseline was either poorly defined or captured over too short a window.',
      pullQuote: 'Management describes what the process should do. Operators describe what it actually does. These are rarely the same.',
      sections: [
        {
          heading: 'Phase 1 — Operational Diagnostic',
          content: 'Before a single line of system logic is written, spend three weeks understanding the process at operator level — not management level.',
          callout: {
            number: '14 steps',
            label: 'Undocumented process steps discovered in a management-described 5-step process.'
          }
        }
      ]
    },
    {
      id: 'framework-02',
      type: 'framework',
      category: 'Measurement & Benchmarks',
      title: 'Baseline Capture and Measurement Methodology for Operational Deployments',
      provenance: 'Refined across N=20+ deployments. Incorporates corrections from 6 baseline failures between 2022–2023.',
      readingTime: '10 min read',
      date: 'JAN 2026',
      dataWindow: '2022–2025',
      reliability: 'Field-validated',
      summary: 'A rebuilt measurement methodology developed after a published outcome figure was found to be overstated — covering metric definition and baseline window design.',
      openingParagraph: 'In 2022, we published an AR deployment outcome showing a 71% reduction in manual follow-up hours. When we reconstructed the measurement, we found the pre-deployment baseline was non-representative. The real reduction was 52%.',
      pullQuote: 'A deployment that produces unmeasurable outcomes is operationally equivalent to a deployment that produced no outcomes.',
      sections: [
        {
          heading: 'Baseline Window Design',
          content: 'The standard baseline window is 4 consecutive working weeks — the minimum. For cyclical processes, the baseline must include a full cycle.',
          callout: {
            number: '4 weeks',
            label: 'Minimum baseline capture window — below this, variance is too high for post-deployment comparisons.'
          }
        }
      ]
    },
    {
      id: 'framework-03',
      type: 'framework',
      category: 'Practitioner Framework',
      title: 'Agentic Systems Vendor Evaluation: A Structured Scorecard for Operations Leaders',
      provenance: 'Developed from analysis of 8 competitive evaluations and post-deployment retrospectives',
      readingTime: '9 min read',
      date: 'DEC 2025',
      dataWindow: '2022–2025',
      reliability: 'Field-validated',
      summary: 'A weighted scorecard for evaluating agentic systems vendors — prioritising deployment methodology and measurement transparency over feature count.',
      openingParagraph: 'Most vendor evaluations for operational automation fail at the same point: they score on features, not on deployment methodology.',
      pullQuote: 'Ask any vendor this question: how do you define the baseline, and who captures it?',
      sections: [
        {
          heading: 'Evaluation Dimensions',
          content: 'Deployment Methodology carries 30% weight — the highest — covering whether the vendor has a documented, reproducible pilot methodology.',
          callout: {
            number: '30%',
            label: 'Weight assigned to Deployment Methodology — the single highest-weighted dimension.'
          }
        }
      ]
    },
    {
      id: 'framework-04',
      type: 'framework',
      category: 'System Design & Architecture',
      title: 'Governance and Observability in Agentic Systems: What Operations Leaders Must Monitor Post-Deployment',
      provenance: 'Derived from post-deployment monitoring observations across N=18 production deployments',
      readingTime: '11 min read',
      date: 'DEC 2025',
      dataWindow: '2022–2025',
      reliability: 'Field-validated',
      summary: 'A four-layer governance architecture for production agentic systems — covering action logging, volume monitoring, and exception tracking.',
      openingParagraph: 'In a 2023 logistics deployment, an agentic system began generating duplicate alerts. By the time it was identified, 140 duplicate notifications had been sent to clients. The system was functioning as designed; the governance was not.',
      pullQuote: 'Agentic systems require governance frameworks proportionate to their operational autonomy.',
      sections: [
        {
          heading: 'Action Logging',
          content: 'Every action the system takes must be logged with timestamp, input data, and decision logic applied. The log must be queryable.',
          callout: {
            number: '9 days',
            label: 'Time to detection for a duplicate alert generation error in a production deployment.'
          }
        }
      ]
    },
    {
      id: 'framework-05',
      type: 'framework',
      category: 'Practitioner Framework',
      title: 'Sales Operations Transformation: Designing Agentic Systems for Revenue-Critical Workflows',
      provenance: 'Observations across N=9 sales operations deployments — real estate, hospitality, NBFC, automotive, and SaaS contexts',
      readingTime: '8 min read',
      date: 'NOV 2025',
      dataWindow: '2022–2025',
      reliability: 'Field-validated',
      summary: 'A framework for deploying agentic systems in sales operations — addressing lead response times and the boundary between system and human handling.',
      openingParagraph: 'Sales operations is the most politically sensitive area of an agentic deployment. Sales representatives have income tied to process control.',
      pullQuote: 'The first question every sales leader asks is: will this replace my team?',
      sections: [
        {
          heading: 'Lead Response Time',
          content: 'Leads contacted within 10 minutes of capture qualify at 3.2× the rate of leads contacted after 60 minutes.',
          callout: {
            number: '3.2×',
            label: 'Qualification rate multiplier for leads contacted within 10 minutes vs 60 minutes.'
          }
        }
      ]
    },
    {
      id: 'framework-06',
      type: 'framework',
      category: 'Practitioner Framework',
      title: 'The CFO\'s Deployment Guide: Agentic Systems Across the Finance Function',
      provenance: 'Analysis across N=11 finance operations deployments — AR, financial close, reporting, and compliance monitoring contexts',
      readingTime: '13 min read',
      date: 'NOV 2025',
      dataWindow: '2022–2025',
      reliability: 'Field-validated',
      summary: 'A CFO-level framework covering manual work distribution in finance and the financial case for AR and close-cycle automation.',
      openingParagraph: 'Finance functions are often run by people who are overqualified for most of what they do. High-judgment managers spend hours on data entry.',
      pullQuote: 'Agentic systems do not make finance teams smarter. They give teams their time back.',
      sections: [
        {
          heading: 'Manual Work Distribution',
          content: '89% of finance function manual hours are concentrated in processes that are high-volume, rule-based, and data-intensive.',
          callout: {
            number: '89%',
            label: 'Percentage of finance function manual hours in processes suitable for agentic deployment.'
          }
        }
      ]
    },
    {
      id: 'framework-07',
      type: 'framework',
      category: 'Deployment Observations',
      title: 'Administrative Efficiency in Healthcare Settings: An Agentic Systems Framework',
      provenance: 'Observations across N=4 healthcare administrative deployments — appointment scheduling, claims pre-processing, and patient communications',
      readingTime: '7 min read',
      date: 'OCT 2025',
      dataWindow: '2023–2025',
      reliability: 'Field-validated',
      summary: 'A framework for deploying agentic systems in healthcare administrative operations — covering no-show rates and claims pre-processing.',
      openingParagraph: 'Healthcare administrative operations carry a cost that is poorly tracked: the cost of a patient who did not show up or a rejected claim.',
      pullQuote: 'No-shows are not patient behaviour problems. They are operational problems with operational solutions.',
      sections: [
        {
          heading: 'The No-Show Problem',
          content: '72% of no-shows are attributable to communication timing and frequency gaps, not patient unwillingness.',
          callout: {
            number: '72%',
            label: 'Percentage of no-shows attributable to administrative communication gaps.'
          }
        }
      ]
    },
    {
      id: 'framework-08',
      type: 'framework',
      category: 'Deployment Observations',
      title: 'Lead Operations Design Framework for Real Estate Sales Teams',
      provenance: 'Observations from N=5 real estate and property sector deployments',
      readingTime: '9 min read',
      date: 'OCT 2025',
      dataWindow: '2023–2025',
      reliability: 'Field-validated',
      summary: 'A lead operations framework for real estate sales teams — addressing multi-source fragmentation and qualification criteria design.',
      openingParagraph: 'In a market where digital leads cost ₹800–2,500, the difference between a 4-hour and a 10-minute response is a cost of acquisition metric.',
      pullQuote: 'Real estate developers treat lead response time as a sales KPI. It is more accurately a marketing efficiency metric.',
      sections: [
        {
          heading: 'The Multi-Source Problem',
          content: 'Fragmentation across portals, brokers, and walk-ins creates parallel manual processes that slow down response time.',
          callout: {
            number: '3.8 hours',
            label: 'Median time for a portal lead to reach a CRM queue in a pre-deployment real estate operation.'
          }
        }
      ]
    },
    {
      id: 'framework-09',
      type: 'framework',
      category: 'Deployment Observations',
      title: 'Procurement and Vendor Operations System Design: From PO Chaos to Structured Visibility',
      provenance: 'Observations across N=5 procurement operations deployments — manufacturing, distribution, and retail contexts',
      readingTime: '8 min read',
      date: 'SEP 2025',
      dataWindow: '2023–2025',
      reliability: 'Field-validated',
      summary: 'A procurement operations framework covering delay identification, PO tracking, and supplier adoption variables.',
      openingParagraph: 'Procurement operations in mid-market companies are often managed through informal communication. This fails when supplier counts exceed 30.',
      pullQuote: 'Tracking 80 active purchase orders by phone and email is a structural information management problem.',
      sections: [
        {
          heading: 'Reactive Visibility',
          content: 'Delivery delays were identified an average of 2.1 working days after the delay had already occurred pre-deployment.',
          callout: {
            number: '3.8 days',
            label: 'Shift in delay identification window — from 2.3 days after to 1.5 days before expected delivery.'
          }
        }
      ]
    },
    {
      id: 'framework-10',
      type: 'framework',
      category: 'System Design & Architecture',
      title: 'Customer Operations Deflection Architecture: Designing Tier-1 Resolution Systems',
      provenance: 'Observations across N=6 customer operations deployments — retail, SaaS, telecom, and e-commerce contexts',
      readingTime: '10 min read',
      date: 'SEP 2025',
      dataWindow: '2022–2025',
      reliability: 'Field-validated',
      summary: 'A deflection architecture framework for customer operations — covering query classification and deflection benchmarks.',
      openingParagraph: 'Customer support operations have an economics problem: the cost per contact for human-handled queries is essentially fixed.',
      pullQuote: 'Deflection is not about reducing service quality. It is about delivering appropriate responses at appropriate speeds.',
      sections: [
        {
          heading: 'Deflection Rate Reality',
          content: 'Deployment data shows a deflection range of 44–63% initially, improving to 52–71% after classification refinement.',
          callout: {
            number: '52–71%',
            label: 'Deflection rate range after 90-day classification refinement.'
          }
        }
      ]
    },
    {
      id: 'framework-11',
      type: 'framework',
      category: 'Deployment Observations',
      title: 'HR and Talent Acquisition System Design: From Intake to Qualified Shortlist',
      provenance: 'Observations from N=5 talent acquisition and HR operations deployments',
      readingTime: '7 min read',
      date: 'AUG 2025',
      dataWindow: '2023–2025',
      reliability: 'Field-validated',
      summary: 'A talent acquisition system design framework covering intake administration and candidate experience improvements.',
      openingParagraph: 'The early stages of recruitment determine 90% of who gets interviewed, yet they are given the least attention because they are considered administrative.',
      pullQuote: 'Recruiters spend most of their time form processing rather than candidate assessment.',
      sections: [
        {
          heading: 'Intake Administration',
          content: 'Recruiters were spending 55–70% of weekly hours on intake administration pre-deployment.',
          callout: {
            number: '5.7 hrs/day',
            label: 'Recruiter time spent on application intake administration pre-deployment.'
          }
        }
      ]
    }
];
