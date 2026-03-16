export type ReliabilityLevel = 'Pilot observation' | 'Deployment measurement' | 'Benchmark estimate';

export interface Insight {
  id: string;
  category: 'Deployment Observations' | 'Measurement & Benchmarks' | 'Failure Analysis' | 'System Design & Architecture' | 'Practitioner Guides' | 'Operational Strategy';
  title: string;
  provenance: string;
  summary: string;
  readingTime: string;
  date: string;
  dataWindow: string;
  deploymentRef?: {
    id: string;
    title: string;
  };
  reliability: ReliabilityLevel;
  content: string[];
}

export const CATEGORIES = [
  { name: 'All', color: '#888' },
  { name: 'Deployment Observations', color: '#2F5B8A' },
  { name: 'Measurement & Benchmarks', color: '#2E6B4A' },
  { name: 'Failure Analysis', color: '#7A2E2E' },
  { name: 'System Design & Architecture', color: '#5A3A7A' },
  { name: 'Practitioner Guides', color: '#6B6B2E' },
  { name: 'Operational Strategy', color: '#2E4B6B' }
];

export const INSIGHTS: Insight[] = [
  {
    id: 'ar-ops-observations',
    category: 'Deployment Observations',
    title: 'Accounts Receivable: Observed Friction in Mid-Market Industrial Billing',
    provenance: 'Observations across 14 manufacturing billing cycles',
    summary: 'Analysis of common escalation bottlenecks and the performance of agentic follow-up sequences in high-volume AR operations.',
    readingTime: '7 min read',
    date: 'Mar 2025',
    dataWindow: '2023–2025',
    deploymentRef: { id: 'mfg-ar', title: 'AR Operations' },
    reliability: 'Deployment measurement',
    content: [
      'In high-volume industrial billing environments, we observed that 62% of collections delays are caused by clerical oversight rather than credit risk.',
      'Agentic systems deployed in these environments handled 85% of initial follow-ups without human intervention.',
      'A critical learning from this dataset is the requirement for threshold-based escalation logic that accounts for seasonal spikes in order volume.'
    ]
  },
  {
    id: 'lead-qualification-benchmarks',
    category: 'Measurement & Benchmarks',
    title: 'Lead Operations Benchmarks: Response Time vs. Qualified Conversion',
    provenance: 'Cross-industry dataset including Real Estate and Education',
    summary: 'Quantifying the correlation between agentic triage speed and sales pipeline coverage across 1,200 weekly inbound leads.',
    readingTime: '5 min read',
    date: 'Feb 2025',
    dataWindow: '2024',
    deploymentRef: { id: 're-leads', title: 'Intelligent Lead Operations' },
    reliability: 'Deployment measurement',
    content: [
      'The median response time for manual triage across our observed baseline was 4.2 hours.',
      'Deploying agentic triage reduced this to under 10 minutes, resulting in a 42% increase in qualified leads successfully reaching sales reps.',
      'Data indicates that the "first contact" advantage decays significantly after the 30-minute mark.'
    ]
  },
  {
    id: 'failure-modes-thresholds',
    category: 'Failure Analysis',
    title: 'Failure Mode Analysis: Why Static Thresholds Fail in Dynamic Operations',
    provenance: 'Post-pilot retrospective across 3 failed threshold calibrations',
    summary: 'Detailed analysis of why hard-coded operational rules fail during seasonal surges and the transition to adaptive system logic.',
    readingTime: '9 min read',
    date: 'Jan 2025',
    dataWindow: '2023–2024',
    reliability: 'Pilot observation',
    content: [
      'Static thresholds failed to account for a 30% surge in document intake during Q4 reporting periods.',
      'Systems initially flagged 18% false positives due to rigid rule definitions.',
      'The resolution involved implementing adaptive logic that calibrates against a 7-day rolling operational average.'
    ]
  },
  {
    id: 'agentic-governance-framework',
    category: 'System Design & Architecture',
    title: 'Governance Patterns for Agentic Operational Cores',
    provenance: 'Framework derived from enterprise deployment requirements',
    summary: 'A practitioner architectural overview of how to build human-in-the-loop audit trails for autonomous systems.',
    readingTime: '12 min read',
    date: 'Dec 2024',
    dataWindow: '2024',
    reliability: 'Benchmark estimate',
    content: [
      'Every system decision must be logged with structured metadata including decision context and confidence scores.',
      'Human-in-the-loop (HITL) triggers should be based on risk-weighted thresholds rather than task completion.',
      'Audit readiness is a primary architectural requirement for agentic systems in regulated industries.'
    ]
  }
];
