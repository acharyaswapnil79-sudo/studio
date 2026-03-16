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
  status: 'Pilot Complete' | 'Full Deployment' | 'Production — ongoing' | 'In Deployment';
  teamSize: string;
  hasMethodology: boolean;
  clientContext: string;
  operationalProblem: string;
  timeline: string;
  kpis: KPI[];
  scopeLimitation: string;
  businessImpact: string;
  
  // Case Study Template Fields
  summary?: string;
  pilotDuration?: string;
  measurementWindow?: string;
  detailedContext?: string[];
  detailedProblem?: string[];
  problemSignificance?: string;
  beforeFlow?: string[];
  afterFlow?: string[];
  timelinePhases?: { phase: string; description: string }[];
  measurementFramework?: string[];
  whatStayedHuman?: string[];
  whatWeLearned?: string;
  systemsIntegrated?: string[];
  relatedDeploymentIds?: string[];
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
    businessImpact: 'Receivables reports became available four days earlier each month.',
    summary: 'Deploying an agentic system to manage invoice tracking, follow-up sequencing, and escalation logic for a mid-market industrial manufacturer.',
    pilotDuration: '6 weeks',
    measurementWindow: '12 weeks',
    detailedContext: [
      'Mid-sized industrial components manufacturer operating domestic sales across three billing entities.',
      'Annual revenue approximately ₹85 Cr.',
      'Finance team of six responsible for receivables management and month-end close.',
    ],
    detailedProblem: [
      'Collections follow-up was managed in a shared spreadsheet updated manually every two to three days.',
      'No structured escalation logic existed beyond a weekly review meeting.',
      'Two finance staff members spent most of their time on follow-up calls and reconciliation work.',
      'Overdue invoices represented approximately 18% of monthly receivables.'
    ],
    problemSignificance: 'Delayed collections created unpredictable cash flow visibility for the finance leadership team.',
    beforeFlow: [
      'Invoice issued',
      'Manual spreadsheet entry',
      'Weekly review meeting',
      'Follow-up calls',
      'Manual escalation'
    ],
    afterFlow: [
      'Invoice issued',
      'System captures invoice record',
      'Payment tracking initiated',
      'Handled by the system follow-up sequence',
      'Threshold breach',
      'Human escalation with context'
    ],
    timelinePhases: [
      { phase: 'Pilot', description: '6 weeks covering a single billing entity.' },
      { phase: 'Calibration', description: 'Weeks 7–8 used to refine escalation thresholds.' },
      { phase: 'Full Deployment', description: 'Week 9 across all billing entities.' },
      { phase: 'Measurement Window', description: '12 weeks post deployment.' }
    ],
    measurementFramework: [
      'Baseline metrics were recorded over a four-week observation period prior to deployment.',
      'The same metrics were tracked weekly during the pilot using system logs and finance team time tracking.',
      'No retrospective adjustments were made to baseline figures.'
    ],
    whatStayedHuman: [
      'Credit risk decisions',
      'Payment term negotiations',
      'Complex dispute resolution'
    ],
    whatWeLearned: 'During the pilot we observed that escalation thresholds required recalibration after week three due to seasonal order spikes. Threshold logic was adjusted in week four, which delayed projected results by approximately two weeks.',
    systemsIntegrated: ['Zoho CRM', 'Tally billing software'],
    relatedDeploymentIds: ['retail-cust-query', 'log-shipment', 're-leads']
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
    businessImpact: 'Sales representatives spent more time engaging qualified prospects.',
    summary: 'Implementing an operational intelligence core to handle lead enrichment, qualification, and routing.',
    pilotDuration: '5 weeks',
    measurementWindow: '10 weeks',
    systemsIntegrated: ['Salesforce', 'WhatsApp Business API'],
    relatedDeploymentIds: ['hosp-lead', 'mfg-ar']
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
    businessImpact: 'Support capacity shifted toward complex customer cases.',
    summary: 'Deploying an agentic workflow to resolve Tier-1 customer inquiries end-to-end.',
    pilotDuration: '4 weeks',
    measurementWindow: '8 weeks',
    systemsIntegrated: ['Zendesk', 'Shopify Plus'],
    relatedDeploymentIds: ['saas-triage', 'log-shipment']
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
    businessImpact: 'Leadership reporting became available four days earlier.',
    summary: 'Orchestrating financial close data pipelines to reduce manual reconciliation time.',
    pilotDuration: '2 cycles',
    measurementWindow: '3 cycles',
    systemsIntegrated: ['NetSuite', 'Excel'],
    relatedDeploymentIds: ['mfg-ar', 'retail-inv']
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
    businessImpact: 'Reduction in customer-reported shipment delays.',
    summary: 'Automating the detection and triage of logistics exceptions across global carrier feeds.',
    pilotDuration: '6 weeks',
    measurementWindow: '12 weeks',
    systemsIntegrated: ['AfterShip', 'Internal Logistics Portal'],
    relatedDeploymentIds: ['log-invoice', 'retail-cust-query']
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
    businessImpact: 'Higher clinic utilization and patient satisfaction.',
    summary: 'An agentic system for multi-clinic appointment management and follow-up.',
    pilotDuration: '4 weeks',
    measurementWindow: '8 weeks',
    systemsIntegrated: ['Practo', 'Google Calendar API'],
    relatedDeploymentIds: ['health-claims', 'retail-cust-query']
  },
  {
    id: 'edu-admissions',
    title: 'Student Admissions Operations',
    industry: 'Education',
    function: 'Sales Operations',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Private K–12 school group operating four schools. Admissions team of 6.',
    operationalProblem: 'Applications arrived across four channels with no unified queue. Average time to first contact was 2-3 days.',
    timeline: 'Pilot: 5 weeks (web + WhatsApp). Week 8 Full Deployment.',
    kpis: [
      { label: 'Application to first contact', before: '2–3 days', after: 'under 3 hours', impact: '95% reduction' },
      { label: 'Doc completion rate', before: '61%', after: '78%', impact: '28% improvement' }
    ],
    scopeLimitation: 'Education portal API integration was not implemented. Scholarship eligibility decisions remained human managed.',
    businessImpact: 'Counsellors redirected 33% of their time from triage to family consultations.',
    summary: 'Centralizing admissions inquiries and handling document verification end-to-end.',
    pilotDuration: '5 weeks',
    measurementWindow: '8 weeks',
    whatStayedHuman: ['Interview scheduling', 'Scholarship decisions', 'Final admissions'],
    whatWeLearned: 'WhatsApp conversations initially lacked structure. Standardized documentation prompts were introduced in week 3.',
    systemsIntegrated: ['WhatsApp Business API', 'Custom CRM'],
    relatedDeploymentIds: ['re-leads', 'hosp-lead']
  },
  {
    id: 'ins-renewals',
    title: 'Policy Renewal Operations',
    industry: 'Insurance',
    function: 'Finance Operations',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Insurance intermediary managing ~4,200 active policies.',
    operationalProblem: 'Renewals tracked manually in spreadsheets. Lapse rate averaged 23%.',
    timeline: 'Pilot: 6 weeks. Full Deployment: Week 10.',
    kpis: [
      { label: 'Policy lapse rate', before: '23%', after: '17%', impact: '26% improvement' },
      { label: 'Confirmation lead time', before: '<48 hrs', after: '9 days', impact: 'Better visibility' }
    ],
    scopeLimitations: 'Claims-linked renewals remained manual. Health policies excluded from pilot.',
    businessImpact: 'Team time on renewals reduced from 70% to 38% of capacity.',
    summary: 'Automating the renewal notification and confirmation cycle for motor policies.',
    pilotDuration: '6 weeks',
    measurementWindow: '12 weeks',
    whatStayedHuman: ['Policy endorsements', 'Claims-related renewals', 'Client negotiations'],
    whatWeLearned: 'Older policyholders responded poorly to WhatsApp. SMS + phone escalation introduced week 11.',
    systemsIntegrated: ['Microsoft Dynamics', 'BulkSMS Gateway']
  },
  {
    id: 'auto-leads',
    title: 'Lead-to-Showroom Operations',
    industry: 'Hospitality',
    function: 'Sales Operations',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Multi-brand dealership group with three showrooms and 18 sales executives.',
    operationalProblem: 'Digital leads required manual CRM import and assignment. Average time was 4-5 hours.',
    timeline: 'Pilot: 4 weeks. Week 7 Full Deployment.',
    kpis: [
      { label: 'Lead-to-assignment', before: '4–5 hours', after: '25 minutes', impact: '90% reduction' },
      { label: 'Uncontacted leads >24h', before: '18%', after: '4%', impact: 'Major recovery' }
    ],
    scopeLimitation: 'Dealer CRM API rate limits forced batch processing. Walk-ins stayed manual.',
    businessImpact: 'Admin workload per sales executive reduced from 2 hours to 30 minutes daily.',
    summary: 'Agentic lead capture and intelligent assignment based on consultant availability.',
    pilotDuration: '4 weeks',
    measurementWindow: '10 weeks',
    whatStayedHuman: ['Test drive scheduling', 'Financing discussions', 'Negotiation'],
    whatWeLearned: 'OEM lead data formats varied across brands, requiring custom parsing.',
    systemsIntegrated: ['Salesforce', 'Meta Lead Forms']
  },
  {
    id: 'agri-dist',
    title: 'Order & Inventory Operations',
    industry: 'Logistics',
    function: 'Procurement',
    status: 'In Deployment',
    teamSize: '20–100',
    hasMethodology: true,
    clientContext: 'Regional agricultural distributor serving 180 retail partners.',
    operationalProblem: 'Orders manually transcribed into ERP. Inventory visibility updated only once daily.',
    timeline: 'Pilot: 5 weeks (WhatsApp). Phone orders week 14.',
    kpis: [
      { label: 'Transcription errors', before: '2–3/week', after: '0–1/week', impact: 'Error reduction' },
      { label: 'Out-of-stock orders', before: '11%', after: '4%', impact: '63% improvement' }
    ],
    scopeLimitation: 'Phone channel integration delayed due to IVR complexity.',
    businessImpact: 'Operations time on order entry reduced from 65% to 32%.',
    summary: 'Near real-time inventory sync and automated order transcription core.',
    pilotDuration: '5 weeks',
    measurementWindow: '10 weeks',
    whatStayedHuman: ['Credit decisions', 'Bulk order negotiations'],
    whatWeLearned: 'Approximately one-third of retail partners lacked digital ordering capability.',
    systemsIntegrated: ['SAP ERP', 'WhatsApp Business API']
  },
  {
    id: 'media-ops',
    title: 'Advertiser Operations',
    industry: 'Technology Services',
    function: 'Reporting',
    status: 'Production — ongoing',
    teamSize: 'Under 20',
    hasMethodology: true,
    clientContext: 'Regional digital media company running 35–55 campaigns monthly.',
    operationalProblem: 'Creative collection and reporting managed manually across emails.',
    timeline: 'Pilot: 6 weeks. Week 11 Full Deployment.',
    kpis: [
      { label: 'Creative compliance', before: '54%', after: '79%', impact: 'Consistency gain' },
      { label: 'Report prep time', before: '2–3 hours', after: '25–40 min', impact: '75% reduction' }
    ],
    scopeLimitation: 'Programmatic ad operations excluded.',
    businessImpact: 'Campaign delays from creative submission reduced from 22% to 9%.',
    summary: 'Handling advertiser creative intake and campaign reporting end-to-end.',
    pilotDuration: '6 weeks',
    measurementWindow: '8 weeks',
    whatStayedHuman: ['Campaign strategy', 'Advertiser negotiation'],
    whatWeLearned: 'Two analytics platforms lacked API access, forcing manual data import via agents.',
    systemsIntegrated: ['Google Ad Manager', 'Email Scrapers']
  }
  // ... more deployments can be added following this pattern
];
