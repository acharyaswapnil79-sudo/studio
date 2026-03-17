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
      id: 'framework-12',
      type: 'framework',
  
      category: 'Practitioner Framework',
  
      title: 'Exception Management in Logistics Operations: Designing Systems for the Reactive-to-Proactive Transition',
  
      provenance:
        'Observations from N=4 logistics and supply chain operations deployments — last-mile delivery, vendor invoice reconciliation, and shipment tracking contexts',
  
      readingTime: '8 min read',
      date: 'JAN 2025',
      dataWindow: '2023–2025',
  
      reliability: 'Field-validated',
  
      summary:
        'A structured approach to classifying, routing, and resolving logistics exceptions — reducing coordinator overhead and recovering invoice discrepancy costs through systematic exception management.',
  
      openingParagraph:
        'Logistics operations are characterised by a decision asymmetry that most logistics managers understand intuitively but rarely quantify: the cost of early exception identification is low (a 15-minute system alert), while the cost of late exception identification is high (a missed delivery window, an expedited re-shipment, a client SLA breach). The gap between these two costs is the financial case for logistics exception management systems.',
  
      pullQuote:
        'A logistics operation that identifies delivery exceptions after they have already occurred is not managing logistics. It is managing the aftermath of logistics.',
  
      sections: [
        {
          heading: 'Exception Classification in Logistics',
          content:
            'Exceptions fall into three tiers with distinct urgency and resolution windows. Tier 1 covers delivery execution exceptions — failed attempts, address mismatches, vehicle breakdowns — requiring resolution within 2 hours. Tier 2 covers administrative exceptions such as invoice discrepancies and documentation gaps, with a 24-hour resolution window. Tier 3 consists of monitoring flags — shipments tracking behind timeline, repeat exception patterns, or volume spikes — surfaced in weekly reviews. A well-designed system generates Tier 1 alerts immediately, batches Tier 2 into daily summaries, and surfaces Tier 3 in weekly operational reviews. Most pre-deployment operations treat all three tiers as equivalent-urgency phone calls, creating the noise that causes important exceptions to be missed.',
          callout: {
            number: 'Tier 1',
            label:
              'Delivery execution exceptions requiring resolution within 2 hours — the tier where late identification has immediate, unrecoverable revenue impact'
          }
        },
        {
          heading: 'The Multi-Courier Portal Problem',
          content:
            'In a typical last-mile coordinator\'s day, manual status checks across four courier portals — cross-referenced against dispatch records — consumed 16–20 coordinator hours per week in a 2,200-shipment-per-week operation. Consolidation systems resolve this by pulling status data from each courier API on a defined schedule (every 30–60 minutes for Tier 1 exception types) and surfacing exceptions in a single interface. A structural caveat applies: courier API reliability varies significantly. In a 2023 deployment, one of four courier partners had API uptime of 78% over the 10-week measurement period, requiring manual portal checks for that carrier 22% of the time. Courier API reliability should be assessed as part of the diagnostic phase.',
          callout: {
            number: '16–20 hrs',
            label:
              'Coordinator hours consumed per week by manual multi-portal status monitoring in a 2,200-shipment-per-week operation'
          }
        },
        {
          heading: 'Vendor Invoice Reconciliation — The Hidden Logistics Cost',
          content:
            'In a mid-market distribution business processing 900 vendor invoices per month, a 2023 deployment diagnostic found 8.3% of invoices contained discrepancies — rate differences, quantity mismatches, or unapproved surcharges. Of these, 61% were being paid without dispute because the manual reconciliation process did not catch them before payment. Estimated annual cost of uninvestigated discrepancies: ₹8.4–12.6 Lakhs. The reconciliation system addressed this through PO-to-invoice matching, contracted rate card validation, surcharge auditing, and auto-generated dispute notifications that reduced manual dispute preparation from 45 minutes to under 5 minutes per case. Post-deployment auto-match rate reached 71% for exact-match invoices; discrepancy catch rate improved from an estimated 39% manually to 94%. Estimated annual savings from discrepancy recovery: ₹4.8–7.2 Lakhs.',
          callout: {
            number: '94%',
            label:
              'Post-deployment discrepancy catch rate, versus an estimated 39% manual catch rate pre-deployment'
          }
        }
      ]
    },
  
    {
      id: 'framework-13',
      type: 'framework',
  
      category: 'System Design & Architecture',
  
      title: 'Compliance Monitoring Architecture: Building Systems That Catch Obligations Before They Become Breaches',
  
      provenance:
        'Observations from N=4 compliance and regulatory operations deployments — financial services, healthcare administration, and professional services contexts',
  
      readingTime: '11 min read',
      date: 'JAN 2025',
      dataWindow: '2023–2025',
  
      reliability: 'Field-validated',
  
      summary:
        'A compliance monitoring architecture that addresses the root cause of mid-market compliance failures — not regulatory misunderstanding, but obligation inventory gaps and workflow breakdown — through structured alert design and escalation protocols.',
  
      openingParagraph:
        'Compliance failures in mid-market organisations are almost never caused by wilful non-compliance or regulatory misunderstanding. They are caused by administrative failures: an obligation tracked in a shared calendar that nobody checked, a deadline remembered by an individual who left the organisation, a filing prepared but not submitted because the approval chain broke down. These are not compliance failures — they are calendar management and workflow failures that produce compliance consequences.',
  
      pullQuote:
        'The compliance function in a mid-market business is typically understaffed, over-reliant on individual knowledge, and managing obligations with tools designed for personal task management. This is a structural risk, not a capability gap.',
  
      sections: [
        {
          heading: 'The Compliance Obligation Inventory — What You Will Find',
          content:
            'Across all four compliance deployments, the first diagnostic step — an obligation inventory audit — produced results that surprised compliance and finance leadership in every case. In a 2023 financial services intermediary deployment, the compliance officer believed the organisation was tracking 34 regulatory obligations. The audit identified 67. The additional 33 were being managed informally by different individuals without the compliance officer\'s visibility, and 3 had missed filing deadlines in the prior 18 months. The audit methodology covers four areas: regulatory requirement review (every applicable statute, regulation, or licence condition), contractual obligation review (client contracts, vendor agreements, and SLAs), internal policy obligation review (board-approved policies that create internal compliance deadlines), and knowledge holder interviews (asking each team what compliance activities they manage). The system can only track obligations that are in the inventory — an incomplete inventory produces a false sense of compliance coverage.',
          callout: {
            number: '67 vs 34',
            label:
              'Obligations identified in compliance audit versus obligations believed to be tracked by the compliance officer — a 97% visibility gap, with 3 prior missed deadlines'
          }
        },
        {
          heading: 'Alert Architecture — The Advance Warning System',
          content:
            'Alert timing protocols vary by obligation frequency. For annual or biennial regulatory filings, alerts are issued at 90, 60, 30, 14, 7, and 3 days, directed to both the obligation owner and a designated backup. The 30-day alert triggers a preparation task if typical preparation time exceeds 5 working days. For monthly filings, alerts are issued at 15, 7, 3, and 1 day, with completion confirmation required before the system marks an obligation closed. For event-triggered obligations — those activating when a specific business event occurs, such as a threshold crossing — the system monitors the trigger condition and generates the obligation record and first alert automatically. Event-triggered obligations are the most commonly missed category because they carry no fixed calendar date. Non-acknowledged alerts escalate to a secondary designee at 24 hours, and to the compliance officer or CFO at 48 hours.',
          callout: {
            number: '90 days',
            label:
              'First alert for annual regulatory filings — creating a planning window rather than a crisis management window for preparation and approval'
          }
        },
        {
          heading: 'What the System Cannot Do — The Human Judgment Layer',
          content:
            'The system tracks whether a filing is due, whether a preparation process has started, whether a confirmation has been received, and whether the obligation has been acknowledged by its owner. It does not assess the accuracy of filing content, identify new obligations created by changes in business activity, determine whether obligations have been superseded by regulatory change, or flag whether planned business actions will trigger additional obligations. In two deployments, compliance officers initially interpreted comprehensive obligation tracking as regulatory coverage — as if having a system meant being compliant. This is a governance risk. The system reduces the probability of missing a deadline. It does not ensure obligations are correctly fulfilled or that the inventory is complete. Recommended communication to compliance stakeholders at deployment: the system is a tracker, not an advisor. Filing content, regulatory interpretation, and completeness of the obligation register remain human responsibilities.',
        }
      ]
    },
  
    {
      id: 'framework-14',
      type: 'framework',
  
      category: 'Deployment Observations',
  
      title: 'Contract Intelligence Deployment: From Document Repositories to Active Obligation Management',
  
      provenance:
        'Framework developed across N=3 contract and document intelligence deployments — professional services, legal, and corporate contexts',
  
      readingTime: '9 min read',
      date: 'JAN 2025',
      dataWindow: '2023–2025',
  
      reliability: 'Field-validated',
  
      summary:
        'A deployment framework for converting static contract repositories into active obligation registers — covering audit methodology, document intelligence accuracy boundaries, and the intake process that determines long-term system reliability.',
  
      openingParagraph:
        'Most mid-market businesses have a contract management problem that they do not know they have. They believe they manage their contracts because they have executed documents in a shared folder. What they are actually doing is archiving contracts — storing them in a way that provides retrieval, but not visibility. The distinction matters because contracts contain obligations, and obligations have deadlines. A contract repository that requires human initiative to check for upcoming renewals and obligations will miss renewals and obligations — not because of carelessness, but because initiative-dependent processes fail under operational load.',
  
      pullQuote:
        'The average mid-market business has 80–200 active contracts containing obligations that are not tracked anywhere. Every one of those contracts has a renewal date, and some have termination clauses that activate automatically if not acted upon.',
  
      sections: [
        {
          heading: 'The Contract Obligation Audit — What You Will Find',
          content:
            'Across three contract intelligence deployments, actual active contract count was 1.4–2.1× the count believed by management. The additional contracts were typically vendor agreements, software licences, and infrastructure contracts managed by functional teams without central visibility. Obligation categories present across contract populations included: renewal deadlines (94% of contracts), notice periods for termination (87% — often 30–90 day advance requirements), performance obligation milestones (43% of client contracts), audit rights and data access obligations (31% of vendor contracts), and auto-renewal clauses (68% of software and service contracts). Auto-renewal clauses represent the highest-value tracking target. A software vendor with a ₹8 Lakh annual licence that auto-renews with a 45-day cancellation notice period will renew automatically every year unless a human monitors the deadline. In a portfolio of 60 software contracts, the probability that at least one auto-renews unexpectedly in any given year — without systematic tracking — is very high.',
          callout: {
            number: '68%',
            label:
              'Percentage of software and service contracts containing auto-renewal clauses — the most common source of unexpected renewal commitments'
          }
        },
        {
          heading: 'Document Intelligence — What the System Can and Cannot Extract',
          content:
            'Current document intelligence handles certain extraction categories reliably: dates (renewal, effective, expiry, notice period deadlines) at 90–95% accuracy on well-formatted contracts; party names and counterparty fields at 90%+; and defined term values such as contract value, notice periods, and payment terms at 85–92% accuracy. Categories that require human review regardless of system capability include: obligations expressed in conditional language ("if X event occurs, then Y obligation activates"), cross-referenced obligations pointing to schedules or annexures, obligations depending on regulatory definitions or external standards, and any clause where ambiguity in the contract text creates interpretive uncertainty. The practical implication is that the system produces an extracted obligation record for human review — not a legally authoritative obligation register. Every extracted record should be reviewed by a human with contract knowledge before being accepted as the tracking record.',
          callout: {
            number: '90–95%',
            label:
              'Extraction accuracy for dates in well-formatted contracts — the most reliable extraction category; complex conditional obligations require human review regardless of system capability'
          }
        },
        {
          heading: 'Building the Active Obligation Register',
          content:
            'For an initial portfolio of 150 contracts, full extraction and review may take 3–5 weeks. Prioritisation during this period should follow three criteria: contracts with renewal or expiry dates within 6 months, contracts with auto-renewal clauses, and contracts above a defined value threshold. Ongoing maintenance requires a contract intake process — a defined handoff point where newly signed contracts enter the system within 5 working days of execution. In 2 of 3 deployments, the contract intake process was the weakest operational link. Newly signed contracts were not consistently entered because no one owned the intake step. The intake responsibility must be assigned to a specific role, not left as a shared responsibility. Every new contract executed should generate a system record with obligation extraction as a condition of the handoff.',
        }
      ]
    },
  
    {
      id: 'framework-15',
      type: 'framework',
  
      category: 'Measurement & Benchmarks',
  
      title: 'Quality Reporting Operations in Manufacturing: From Shift-End Transcription to Real-Time Visibility',
  
      provenance:
        'Observations from N=3 manufacturing quality operations deployments — food processing, components manufacturing, and pharmaceutical packaging contexts',
  
      readingTime: '7 min read',
      date: 'JAN 2025',
      dataWindow: '2023–2025',
  
      reliability: 'Field-validated',
  
      summary:
        'A framework for eliminating the transcription bottleneck in manufacturing quality operations — replacing paper-based shift-end data entry with point-of-check digital capture to reduce non-conformance identification lag from hours to minutes.',
  
      openingParagraph:
        'Quality operations in manufacturing facilities share a structural inefficiency that creates a paradox: the closer you are to the production process, the later you receive quality data about it. A production floor generates quality events in real time — defects, variations, non-conformances — but the data from those events typically reaches quality management through a process that is 8–24 hours delayed by manual transcription, shift handover, and report compilation. A quality issue that occurs at 2pm on Tuesday afternoon is reviewed in a quality report at the Thursday morning meeting. The batch affected has been processed, packaged, and possibly shipped.',
  
      pullQuote:
        'Quality reports that arrive after the production batch has shipped are historical documents. The operational value of quality data is inversely proportional to the time it takes to reach decision-makers.',
  
      sections: [
        {
          heading: 'The Data Transcription Bottleneck',
          content:
            'In all three manufacturing quality deployments, the primary manual work burden was end-of-shift transcription of paper-based quality check records into the digital quality management system — creating a built-in 4–8 hour lag between quality event occurrence and data availability. In a 2023 food processing deployment with 6 quality check stations, 2 shifts per day, and 5 check points per station per shift, this produced 60 data entry actions per day at an average of 3.2 minutes each, totalling approximately 3.2 hours of QA team time daily. Additional costs included transcription errors averaging 1.8 mistakes per 60 entries, paper record loss or damage averaging 3 incomplete records per month, and historical data that was unsearchable without manual collation. The system intervention — digital check forms on ruggedised tablets at each quality check station — eliminated transcription entirely by capturing data at point of check and transmitting it immediately to the QA system.',
          callout: {
            number: '3.2 hrs/day',
            label:
              'QA team time spent on end-of-shift paper record transcription in a 6-station food processing facility — eliminated by point-of-check digital capture'
          }
        },
        {
          heading: 'Non-Conformance Response — The Time-to-Detection Problem',
          content:
            'The highest operational value of real-time quality data is not in reporting — it is in non-conformance response time. A non-conformance detected at point of occurrence allows containment within the affected production batch; one detected 8 hours later may require recall or destruction of multiple batches. In a 2024 components manufacturing deployment, pre-deployment non-conformance identification lag was a median of 6.2 hours. Of 22 non-conformance events in the 4-week baseline period, 14 were identified after the affected batch had proceeded to the next production stage, with rework or scrap costs on those 14 events totalling ₹3.4 Lakhs. Post-deployment, non-conformance identification lag reduced to a median of 8 minutes. Of 18 events in the 10-week measurement period, 16 were contained within the affected stage before progression. Rework and scrap cost in the measurement period: ₹0.42 Lakhs — an annualised saving versus baseline of approximately ₹2.2 Lakhs. The system does not reduce non-conformance occurrence; it reduces the cost of each non-conformance by enabling faster containment.',
          callout: {
            number: '6.2 hrs → 8 min',
            label:
              'Non-conformance identification lag improvement — containment speed, not reporting efficiency, is the primary operational value driver in quality systems'
          }
        },
        {
          heading: 'Management Reporting — What Real-Time Data Enables',
          content:
            'Real-time data capture enables a three-tier reporting structure. The shift-level view, available at shift close with 15-minute data freshness, covers non-conformances by type and station, check compliance rate, and batch quality status — primary audience: production supervisors and QA team leads. The daily summary, auto-generated at 7am, covers trend versus the prior 5 production days, anomaly flags for any metric more than 1.5 standard deviations from the rolling average, and pending corrective actions — primary audience: QA manager and production manager. The weekly management report, auto-generated each Monday morning, covers weekly KPI summary versus target, top non-conformance root causes, corrective action status, and comparison against the prior 4 weeks — primary audience: operations director and quality director. The shift from manual weekly report compilation (3–4 hours per report pre-deployment) to auto-generation is a meaningful capacity recovery. More significantly, trend patterns that previously took 3–4 weeks to appear in management data now appear within 3–4 days.',
          callout: {
            number: '3–4 weeks → 3–4 days',
            label:
              'Time for quality trend patterns to surface in management data — the reporting value of real-time capture beyond operational response speed'
          }
        }
      ]
    }
  ];
