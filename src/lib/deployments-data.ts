export interface KPI {
  label: string;
  before: string;
  after: string;
  impact: string;
}

export interface Deployment {
  id: string;
  title: string;
  industry: string;
  function: string;
  status: 'Pilot Complete' | 'Full Deployment' | 'Production — ongoing';
  teamSize: string;
  hasMethodology: boolean;
  clientContext: string;
  operationalProblem: string;
  timeline: string;
  kpis: KPI[];
  scopeLimitation: string;
  businessImpact: string;
}

export const DEPLOYMENTS: Deployment[] = [
  {
    id: 'mfg-ar',
    title: 'Accounts Receivable Operations',
    industry: 'Manufacturing',
    function: 'Finance Operations',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Mid-sized industrial components manufacturer. ₹85 Cr annual revenue. Finance team of 6.',
    operationalProblem: 'Collections follow-up tracked in spreadsheets with no escalation logic.',
    timeline: 'Pilot: 6 weeks. Full Deployment: Week 9.',
    kpis: [
      { label: 'Collection cycle', before: '47 days', after: '31 days', impact: '34% reduction' },
      { label: 'Manual follow-up hours', before: '28 hrs/week', after: '10–12 hrs/week', impact: '~63% reduction' }
    ],
    scopeLimitation: 'Cross-border billing was outside deployment scope.',
    businessImpact: 'Receivables reports became available four days earlier each month.'
  },
  {
    id: 're-leads',
    title: 'Intelligent Lead Operations',
    industry: 'Real Estate',
    function: 'Sales Operations',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Residential real estate developer. Sales team of 11. 400–600 inbound leads weekly.',
    operationalProblem: 'Leads from multiple channels required manual triage.',
    timeline: 'Pilot: 5 weeks. Full Deployment: Week 8.',
    kpis: [
      { label: 'Lead response time', before: '3–4 hours', after: 'under 10 min', impact: '~95% improvement' },
      { label: 'Qualified leads to sales', before: 'Baseline', after: '+42%', impact: 'Significant uplift' }
    ],
    scopeLimitation: 'Walk-in leads remained manually handled.',
    businessImpact: 'Sales representatives spent more time engaging qualified prospects.'
  },
  {
    id: 'retail-cust-query',
    title: 'Customer Query Resolution',
    industry: 'Retail',
    function: 'Customer Operations',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Retail and e-commerce brand. Support team of 9. 600–900 weekly tickets.',
    operationalProblem: 'Support backlog during peak periods caused response delays.',
    timeline: 'Pilot: 4 weeks. Full Deployment: Week 7.',
    kpis: [
      { label: 'Tier-1 Auto-resolution', before: '0%', after: '58%', impact: 'Major capacity shift' },
      { label: 'Peak Response Time', before: '8–10 hours', after: 'under 1 hour', impact: '90% reduction' }
    ],
    scopeLimitation: 'Fraud claims and payment disputes remained manual.',
    businessImpact: 'Support capacity shifted toward complex customer cases.'
  },
  {
    id: 'finance-close',
    title: 'Financial Close and Reporting',
    industry: 'Finance',
    function: 'Reporting',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Professional services organization. Finance team of 4.',
    operationalProblem: 'Monthly close required manual reconciliation across spreadsheets.',
    timeline: 'Pilot: 2 close cycles.',
    kpis: [
      { label: 'Close cycle duration', before: '9 days', after: '5 days', impact: '44% faster' },
      { label: 'Manual recon hours', before: '22 hrs', after: '10 hrs', impact: '54% reduction' }
    ],
    scopeLimitation: 'Tax reporting remained manual.',
    businessImpact: 'Leadership reporting became available four days earlier.'
  },
  {
    id: 'log-shipment',
    title: 'Shipment Exception Handling',
    industry: 'Logistics',
    function: 'Logistics',
    status: 'Production — ongoing',
    teamSize: '20–100',
    hasMethodology: false,
    clientContext: 'Third-party logistics coordinator. Operations team of 14. 2200 shipments weekly.',
    operationalProblem: 'Manual monitoring of shipment exceptions was slow and error-prone.',
    timeline: 'Pilot: 6 weeks.',
    kpis: [
      { label: 'Detection time', before: '6–9 hours', after: 'under 45 min', impact: '90% faster' },
      { label: 'Manual monitoring', before: '18 hrs/week', after: '3 hrs/week', impact: '83% reduction' }
    ],
    scopeLimitation: 'One courier partner added after pilot.',
    businessImpact: 'Reduction in customer-reported shipment delays.'
  },
  {
    id: 'health-sched',
    title: 'Appointment Scheduling',
    industry: 'Healthcare',
    function: 'Customer Operations',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Specialty healthcare provider. 3 clinics. 320–380 weekly appointments.',
    operationalProblem: 'High no-show rates and admin burden for rescheduling.',
    timeline: 'Pilot: 4 weeks.',
    kpis: [
      { label: 'No-show rate', before: '22%', after: '14%', impact: '36% reduction' },
      { label: 'Admin workload', before: '60%', after: '35%', impact: 'Significant time back' }
    ],
    scopeLimitation: 'Phone scheduling remained manual.',
    businessImpact: 'Higher clinic utilization and patient satisfaction.'
  },
  {
    id: 'saas-triage',
    title: 'Customer Support Triage',
    industry: 'Technology Services',
    function: 'Customer Operations',
    status: 'Full Deployment',
    teamSize: '20–100',
    hasMethodology: true,
    clientContext: 'Growth-stage SaaS provider. Global user base.',
    operationalProblem: 'Manual triaging of technical vs billing queries was slow.',
    timeline: 'Pilot: 5 weeks.',
    kpis: [
      { label: 'Triage Accuracy', before: '78%', after: '94%', impact: 'Higher precision' },
      { label: 'Mean Time to Assign', before: '45 min', after: '2 min', impact: '95% reduction' }
    ],
    scopeLimitation: 'Enterprise custom-tier accounts bypassed auto-triage.',
    businessImpact: 'Technical resources focused exclusively on engineering tickets.'
  },
  {
    id: 'log-invoice',
    title: 'Vendor Invoice Reconciliation',
    industry: 'Logistics',
    function: 'Procurement',
    status: 'Pilot Complete',
    teamSize: '20–100',
    hasMethodology: true,
    clientContext: 'Regional freight forwarder. ₹120 Cr annual logistics spend.',
    operationalProblem: 'High variance between quoted vendor rates and final invoices.',
    timeline: 'Pilot: 8 weeks.',
    kpis: [
      { label: 'Variance Detection', before: '12 days', after: 'real-time', impact: 'Instant visibility' },
      { label: 'Overcharge recovery', before: 'Baseline', after: '+18%', impact: 'Significant ROI' }
    ],
    scopeLimitation: 'Fuel surcharge variances required manual review.',
    businessImpact: 'Strengthened vendor negotiation leverage.'
  },
  {
    id: 'hosp-lead',
    title: 'Lead Qualification',
    industry: 'Hospitality',
    function: 'Sales Operations',
    status: 'Full Deployment',
    teamSize: 'Under 20',
    hasMethodology: false,
    clientContext: 'Luxury hotel group. Events and corporate bookings division.',
    operationalProblem: 'Low-quality event inquiries were overwhelming sales coordinators.',
    timeline: 'Pilot: 6 weeks.',
    kpis: [
      { label: 'Lead Scoring Speed', before: '24 hours', after: 'instant', impact: 'Real-time triage' },
      { label: 'Sales Meeting Rate', before: '12%', after: '26%', impact: 'Doubled conversion' }
    ],
    scopeLimitation: 'Walk-in wedding inquiries remained manual.',
    businessImpact: 'Coordinators prioritized high-value corporate contracts.'
  },
  {
    id: 'mfg-po',
    title: 'Procurement Order Tracking',
    industry: 'Manufacturing',
    function: 'Procurement',
    status: 'Full Deployment',
    teamSize: '100+',
    hasMethodology: true,
    clientContext: 'Automotive components tier-1 supplier. 400+ active vendors.',
    operationalProblem: 'No real-time visibility into PO delivery status across vendors.',
    timeline: 'Pilot: 8 weeks.',
    kpis: [
      { label: 'Tracking visibility', before: '15%', after: '92%', impact: 'Full transparency' },
      { label: 'Manual follow-ups', before: '40 hrs/week', after: '5 hrs/week', impact: '87% reduction' }
    ],
    scopeLimitation: 'International ocean freight excluded from pilot.',
    businessImpact: 'Reduced line-stoppage risk due to material shortages.'
  },
  {
    id: 'retail-inv',
    title: 'Inventory Reporting',
    industry: 'Retail',
    function: 'Reporting',
    status: 'Full Deployment',
    teamSize: '20–100',
    hasMethodology: true,
    clientContext: 'Multi-store apparel retailer. 14 locations.',
    operationalProblem: 'Inventory stock-outs occurring due to 48-hour reporting lag.',
    timeline: 'Pilot: 4 weeks.',
    kpis: [
      { label: 'Data Latency', before: '48 hours', after: '2 hours', impact: 'Near real-time' },
      { label: 'Stock-out incidence', before: '14%', after: '4%', impact: '71% improvement' }
    ],
    scopeLimitation: 'Warehouse-to-store transit inventory was estimated.',
    businessImpact: 'Increased sales through better cross-store stock visibility.'
  },
  {
    id: 'finance-comp',
    title: 'Compliance Monitoring',
    industry: 'Finance',
    function: 'Compliance',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Regional fintech lender. High volume of small business loans.',
    operationalProblem: 'Manual audit of loan documentation for regulatory compliance.',
    timeline: 'Pilot: 12 weeks.',
    kpis: [
      { label: 'Audit Coverage', before: '10% sample', after: '100% census', impact: 'Zero gaps' },
      { label: 'Review time per file', before: '35 min', after: '4 min', impact: '88% faster' }
    ],
    scopeLimitation: 'Physical document archives not digitized.',
    businessImpact: 'Passed regulatory audit with zero major findings.'
  },
  {
    id: 're-broker',
    title: 'Broker Communication Workflow',
    industry: 'Real Estate',
    function: 'Sales Operations',
    status: 'Full Deployment',
    teamSize: '20–100',
    hasMethodology: false,
    clientContext: 'Commercial real estate brokerage. 80+ active agents.',
    operationalProblem: 'Delayed broker commissions due to manual document verification.',
    timeline: 'Pilot: 6 weeks.',
    kpis: [
      { label: 'Processing time', before: '14 days', after: '3 days', impact: '78% faster' },
      { label: 'Agent inquiries', before: '25/week', after: 'under 5/week', impact: 'Significant noise reduction' }
    ],
    scopeLimitation: 'Referral fees from external brokers remained manual.',
    businessImpact: 'Higher agent retention and faster capital recycling.'
  },
  {
    id: 'health-claims',
    title: 'Claims Processing Review',
    industry: 'Healthcare',
    function: 'Finance Operations',
    status: 'Production — ongoing',
    teamSize: '100+',
    hasMethodology: true,
    clientContext: 'Private health insurance administrator. 15,000+ monthly claims.',
    operationalProblem: 'High rejection rate due to minor data entry errors by providers.',
    timeline: 'Pilot: 10 weeks.',
    kpis: [
      { label: 'First-pass acceptance', before: '68%', after: '91%', impact: 'Major throughput gain' },
      { label: 'Manual claim review', before: '100%', after: '22%', impact: '78% system handling' }
    ],
    scopeLimitation: 'Dental claims handled on a legacy system excluded.',
    businessImpact: 'Reduced operational overhead and faster provider payments.'
  },
  {
    id: 'ps-proposal',
    title: 'Proposal Generation Workflow',
    industry: 'Professional Services',
    function: 'Sales Operations',
    status: 'Full Deployment',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Specialized structural engineering firm. 200+ bids annually.',
    operationalProblem: 'Engineers spending 8–10 hours drafting standard proposals.',
    timeline: 'Pilot: 4 weeks.',
    kpis: [
      { label: 'Drafting time', before: '9 hours', after: '1.5 hours', impact: '83% reduction' },
      { label: 'Bid throughput', before: 'Baseline', after: '+35%', impact: 'Higher pipeline capacity' }
    ],
    scopeLimitation: 'Complex public sector tenders remained manual.',
    businessImpact: 'Senior engineers regained 25+ hours monthly for billable work.'
  }
];
