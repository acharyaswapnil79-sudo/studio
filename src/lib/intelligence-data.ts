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
// DATA (DUMMY - ONE CARD)
// ==============================

export const INSIGHTS: Insight[] = [
  {
    id: 'dummy-framework-1',
    type: 'framework',

    category: 'Deployment Observations',

    title: 'Baseline Capture Framework for Operational Systems',

    provenance:
      'Refined across N=12 deployments in finance, logistics, and customer operations',

    readingTime: '5 min read',
    date: 'JAN 2025',
    dataWindow: '2023–2025',

    reliability: 'Field-validated',

    summary:
      'A structured methodology for capturing accurate operational baselines before system deployment.',

    openingParagraph:
      'Most operational failures are not caused by bad systems, but by bad baselines. If the starting point is wrong, every improvement number becomes meaningless.',

    pullQuote:
      'A deployment without a defensible baseline is operationally equivalent to a guess.',

    sections: [
      {
        heading: 'Why Baselines Fail',
        content:
          'In multiple deployments, baseline measurements were taken over short or non-representative time windows. This led to inflated or misleading outcome metrics after deployment.',
        callout: {
          number: '34%',
          label:
            'Variance observed when baseline captured during non-representative period'
        }
      },
      {
        heading: 'Correct Baseline Method',
        content:
          'Capture baseline over a minimum of 4 weeks. Use operator-level time logs instead of manager estimates. Ensure measurement definitions remain identical pre and post deployment.'
      }
    ]
  }
];
