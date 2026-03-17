/**
 * @fileOverview Operational Intelligence Data Layer
 * Strict typing for evidence-based insights and frameworks.
 */

export const RELIABILITY_LEVELS = [
  'Pilot observation',
  'Deployment measurement',
  'Benchmark estimate',
  'Field-validated',
  'Production monitoring data'
] as const;

export type ReliabilityLevel = typeof RELIABILITY_LEVELS[number];

export const CATEGORIES = [
  'All',
  'Deployment Observations',
  'Measurement & Benchmarks',
  'Failure Analysis',
  'System Design & Architecture',
  'Practitioner Framework'
] as const;

export type Category = typeof CATEGORIES[number];

export interface Insight {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  summary: string;
  readingTime: string;
  date: string;
  reliability: ReliabilityLevel;
  provenance: string;
}

export const INSIGHTS: Insight[] = [
  {
    id: 'placeholder-item',
    title: 'Operational Logic Drift in Mature Agentic Deployments',
    category: 'Failure Analysis',
    summary: 'An analysis of how system rules become misaligned with evolving business processes over a 6-12 month production window, and the governance patterns required to detect it.',
    readingTime: '8 min read',
    date: 'Mar 2025',
    reliability: 'Production monitoring data',
    provenance: 'Observations across N=18 production environments'
  }
];
