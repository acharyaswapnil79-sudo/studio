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
  status: 'Pilot Complete' | 'Full Deployment' | 'Production — ongoing' | 'In Deployment' | 'Production';
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
    function: 'Reporting Operations',
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
    scopeLimitation: 'Claims-linked renewals remained manual. Health policies excluded from pilot.',
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
    function: 'Reporting Operations',
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
  },
  {
    id: "b2b-account-renewal-operations",
    industry: "Telecommunications",
    function: "Renewal Operations",
    title: "B2B Account Renewal Operations",
    status: "Production",
    teamSize: "20–100",
    summary: "Contract renewal monitoring moved identification from 30–60 days before expiry to 120–150 days.",
    clientContext: "Regional telecommunications provider managing approximately 280 enterprise accounts across leased line and PBX services.",
    operationalProblem: "Renewals were tracked manually in spreadsheets, limiting upsell preparation and creating last-minute contract renewals.",
    timeline: "Pilot: 8 weeks. Full deployment: Week 10. Measurement window: 12 weeks.",
    kpis: [
      { label: "Renewal identification lead time", before: "30–60 days", after: "120–150 days", impact: "Earlier contract engagement" },
      { label: "Account manager admin workload", before: "~40%", after: "~14%", impact: "Recovered account management capacity" },
      { label: "Renewal lapse rate", before: "11%", after: "~7%", impact: "Projected improvement" }
    ],
    scopeLimitation: "Public sector contracts were excluded due to procurement compliance processes.",
    businessImpact: "Account managers shifted capacity from administrative monitoring to strategic client discussions.",
    whatStayedHuman: ["Contract negotiation", "Pricing", "SLA changes"],
    whatWeLearned: "Enterprise renewal cycles require earlier engagement triggers than initially assumed.",
    hasMethodology: true
  },
  {
    id: "subcontractor-coordination-operations",
    industry: "Construction",
    function: "Vendor Coordination",
    title: "Subcontractor Coordination Operations",
    status: "Production",
    teamSize: "20–100",
    summary: "Supervisor coordination time reduced from ~3.5 hours to ~1.2 hours daily.",
    clientContext: "Construction contractor managing 4–6 concurrent projects with approximately 35–50 subcontractors.",
    operationalProblem: "Subcontractor scheduling and updates were managed through phone calls and WhatsApp groups without structured tracking.",
    timeline: "Pilot: 5 weeks. Full deployment: Week 12. Measurement window: 10 weeks.",
    kpis: [
      { label: "Delay identification lead time", before: "Reactive", after: "1–2 days before delay", impact: "Earlier intervention" },
      { label: "Supervisor coordination time", before: "~3.5 hrs/day", after: "~1.2 hrs/day", impact: "Recovered site supervision capacity" },
      { label: "Invoice verification cycle", before: "8–12 days", after: "4–6 days", impact: "Faster subcontractor payment" }
    ],
    scopeLimitation: "38% of subcontractors continued informal communication channels.",
    businessImpact: "Supervisors gained time for quality inspection and project oversight.",
    whatStayedHuman: ["Subcontractor selection", "Dispute resolution"],
    whatWeLearned: "Morning coordination requests significantly increased subcontractor response rates.",
    hasMethodology: true
  },
  {
    id: "loan-application-preprocessing",
    industry: "NBFC",
    function: "Finance Operations",
    title: "Loan Application Pre-Processing",
    status: "Production",
    teamSize: "Under 20",
    summary: "Incomplete loan files reaching credit teams reduced from ~34% to ~12%.",
    clientContext: "NBFC processing 180–260 SME loan applications monthly.",
    operationalProblem: "Manual document checks delayed credit review and caused incomplete applications to reach underwriting teams.",
    timeline: "Pilot: 6 weeks. Full deployment: Week 9. Measurement window: 12 weeks.",
    kpis: [
      { label: "Application to credit review time", before: "3–5 days", after: "1–2 days", impact: "Faster underwriting start" },
      { label: "Incomplete applications", before: "~34%", after: "~12%", impact: "Reduced rework" },
      { label: "Processing admin workload", before: "~50%", after: "~18%", impact: "Recovered analyst time" }
    ],
    scopeLimitation: "Credit decisions and sanctioning remained outside system scope.",
    businessImpact: "Credit teams received cleaner application files and reduced review delays.",
    whatStayedHuman: ["Credit risk analysis", "Loan approval decisions"],
    whatWeLearned: "Applications submitted by DSAs had significantly higher document gaps.",
    hasMethodology: true
  },
  {
    id: "pharmaceutical-order-fulfilment",
    industry: "Pharmaceutical Distribution",
    function: "Order Operations",
    title: "Pharmaceutical Order Fulfilment Operations",
    status: "Production",
    teamSize: "20–100",
    summary: "Order entry time reduced from 4–7 minutes to under 1 minute.",
    clientContext: "Pharmaceutical distributor serving approximately 320 pharmacy and hospital clients.",
    operationalProblem: "Manual SAP order entry and short-expiry stock monitoring slowed fulfilment operations.",
    timeline: "Pilot: 4 weeks. Full deployment: Week 6.",
    kpis: [
      { label: "Order entry time", before: "4–7 minutes", after: "<1 minute", impact: "Faster order processing" },
      { label: "Returns processing cycle", before: "5–8 days", after: "3–4 days", impact: "Improved returns handling" },
      { label: "Order accuracy errors", before: "3–5/week", after: "1–2/week", impact: "Higher fulfilment accuracy" }
    ],
    scopeLimitation: "Phone order channel integration was delayed due to telephony constraints.",
    businessImpact: "Operations teams recovered time for stock planning and supplier coordination.",
    whatStayedHuman: ["Pricing decisions", "Regulatory compliance verification"],
    whatWeLearned: "Legacy telephony dependencies must be evaluated during discovery.",
    hasMethodology: true
  },
  {
    id: "group-booking-operations",
    industry: "Travel",
    function: "Operations",
    title: "Group Booking Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Group booking proposal delivery reduced from 4–6 days to 2–3 days.",
    clientContext: "Travel management company handling corporate and group travel bookings.",
    operationalProblem: "Supplier coordination across hotels and transport providers was performed manually through email threads.",
    timeline: "Pilot: 5 weeks. Full deployment: Week 8.",
    kpis: [
      { label: "Proposal delivery time", before: "4–6 days", after: "2–3 days", impact: "Faster client response" },
      { label: "Supplier follow-up workload", before: "~50%", after: "~22%", impact: "Reduced coordination effort" },
      { label: "Quote errors", before: "~15%", after: "~5%", impact: "Improved proposal accuracy" }
    ],
    scopeLimitation: "Airline booking remained manual.",
    businessImpact: "Operations team handled higher booking volumes during peak periods.",
    whatStayedHuman: ["Client negotiation", "Itinerary design"],
    whatWeLearned: "Smaller suppliers lacked standardized quote formats.",
    hasMethodology: true
  },
  {
    id: "field-service-scheduling",
    industry: "Energy",
    function: "Scheduling Operations",
    title: "Field Service Scheduling Operations",
    status: "Production",
    teamSize: "20–100",
    summary: "Same-day service cancellations reduced from ~17% to ~9%.",
    clientContext: "Solar installation and maintenance company managing 22 technicians.",
    operationalProblem: "Manual scheduling created uneven technician workloads and appointment delays.",
    timeline: "Pilot: 6 weeks. Full deployment: Week 9.",
    kpis: [
      { label: "Same-day cancellation rate", before: "~17%", after: "~9%", impact: "Improved reliability" },
      { label: "Scheduling admin workload", before: "~70%", after: "~38%", impact: "Reduced coordination" },
      { label: "Technician visits per day", before: "3.1", after: "3.6", impact: "Improved utilisation" }
    ],
    scopeLimitation: "Commercial service scheduling excluded.",
    businessImpact: "Technician workloads became more evenly distributed.",
    whatStayedHuman: ["Technical diagnostics", "Repair decisions"],
    whatWeLearned: "Technician skill routing was necessary for scheduling accuracy.",
    hasMethodology: true
  },
  {
    id: "quality-reporting-operations",
    industry: "Food Manufacturing",
    function: "Reporting Operations",
    title: "Quality Reporting Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Quality reporting time reduced from 45–60 minutes per shift to under 8 minutes.",
    clientContext: "Food manufacturing company operating two production lines.",
    operationalProblem: "Quality inspection reports were manually transcribed from paper logs.",
    timeline: "Pilot: 4 weeks. Full deployment: Week 10.",
    kpis: [
      { label: "Data transcription time", before: "45–60 mins", after: "<8 mins", impact: "Faster reporting" },
      { label: "Non-conformance detection", before: "3–5 days", after: "Same shift", impact: "Earlier issue detection" },
      { label: "Report availability", before: "3–4 days delay", after: "Within 6 hours", impact: "Near real-time reporting" }
    ],
    scopeLimitation: "Two inspection stages remained paper-based.",
    businessImpact: "Management gained faster operational visibility.",
    whatStayedHuman: ["Root cause analysis", "Production adjustments"],
    whatWeLearned: "Industrial device requirements must be evaluated earlier.",
    hasMethodology: true
  },
  {
    id: "legal-matter-intake-operations",
    industry: "Legal Services",
    function: "Document Operations",
    title: "Matter Intake and Document Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Legal matter intake reduced from 3–4 hours to under 75 minutes.",
    clientContext: "Law firm with 18 lawyers handling approximately 40–65 new matters monthly.",
    operationalProblem: "Manual conflict checks and document preparation slowed new case intake.",
    timeline: "Pilot: 5 weeks. Full deployment: Week 8.",
    kpis: [
      { label: "Matter intake processing", before: "3–4 hours", after: "45–75 mins", impact: "Faster onboarding" },
      { label: "Document assembly time", before: "1.5–2.5 hrs", after: "20–40 mins", impact: "Reduced admin workload" },
      { label: "Conflict checks", before: "Manual", after: "Systematic", impact: "Improved compliance" }
    ],
    scopeLimitation: "Litigation intake workflows excluded.",
    businessImpact: "Lawyers spent more time advising clients.",
    whatStayedHuman: ["Legal advice", "Negotiation"],
    whatWeLearned: "Conflict rule logic required multiple calibration cycles.",
    hasMethodology: true
  },
  {
    id: "visa-application-processing",
    industry: "Immigration Services",
    function: "Operations",
    title: "Visa Application Processing Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Administrative workload for visa case managers reduced from ~60% to ~28%.",
    clientContext: "Immigration consultancy managing 280–360 visa applications monthly.",
    operationalProblem: "Manual document tracking and follow-ups delayed visa application submissions.",
    timeline: "Pilot: 5 weeks. Full deployment: Week 11.",
    kpis: [
      { label: "Administrative workload", before: "~60%", after: "~28%", impact: "Recovered case management time" },
      { label: "Incomplete submissions", before: "~19%", after: "~9%", impact: "Improved application readiness" },
      { label: "Client updates", before: "Ad hoc", after: "Weekly updates", impact: "Improved transparency" }
    ],
    scopeLimitation: "PR visa cases excluded.",
    businessImpact: "Case managers focused more on strategic client counselling.",
    whatStayedHuman: ["Immigration strategy", "Policy interpretation"],
    whatWeLearned: "Visa policy changes require ongoing rule maintenance.",
    hasMethodology: true
  },
  {
    id: "education-admissions-operations",
    industry: "Education",
    function: "Admissions Operations",
    title: "Student Admissions Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Application response time reduced from 2–3 days to under 3 hours.",
    clientContext: "Private K–12 school group operating four campuses with 1,800–2,200 applications annually.",
    operationalProblem: "Admissions applications arrived across web forms, WhatsApp and portals without a unified review queue.",
    timeline: "Pilot: 5 weeks. Full deployment: Week 8. Measurement window: 8 weeks.",
    kpis: [
      { label: "Application response time", before: "2–3 days", after: "<3 hours", impact: "Faster applicant engagement" },
      { label: "Documentation completion rate", before: "61%", after: "78%", impact: "Reduced admission rework" },
      { label: "Counsellor triage workload", before: "~55%", after: "~22%", impact: "Recovered counselling time" }
    ],
    scopeLimitation: "Portal applications required manual import.",
    businessImpact: "Admissions counsellors spent more time speaking with parents rather than sorting applications.",
    whatStayedHuman: ["Interviews", "scholarship decisions", "final admission offers"],
    whatWeLearned: "Structured WhatsApp response templates significantly improved documentation completion.",
    hasMethodology: true
  },
  {
    id: "insurance-policy-renewal",
    industry: "Insurance",
    function: "Renewal Operations",
    title: "Policy Renewal Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Projected policy lapse rate reduced from 23% to ~17%.",
    clientContext: "Insurance intermediary managing 4,200 motor and health insurance policies.",
    operationalProblem: "Renewals tracked manually using spreadsheets with inconsistent reminder scheduling.",
    timeline: "Pilot: 6 weeks. Full deployment: Week 10.",
    kpis: [
      { label: "Policy lapse rate", before: "23%", after: "~17%", impact: "Projected improvement" },
      { label: "Manual follow-up calls", before: "3–5 per renewal", after: "1–2 per renewal", impact: "Reduced call workload" },
      { label: "Renewal lead time", before: "48 hours", after: "~9 days", impact: "Earlier engagement" }
    ],
    scopeLimitation: "Claims-linked renewals handled manually.",
    businessImpact: "Renewal teams handled more policies with the same staff.",
    whatStayedHuman: ["Policy endorsements", "claims dispute handling"],
    whatWeLearned: "Older policyholders preferred SMS communication over WhatsApp.",
    hasMethodology: true
  },
  {
    id: "automotive-lead-showroom",
    industry: "Automotive",
    function: "Sales Operations",
    title: "Lead-to-Showroom Operations",
    status: "Production",
    teamSize: "20–100",
    summary: "Lead assignment time reduced from 4–5 hours to under 25 minutes.",
    clientContext: "Automotive dealership group operating three showrooms with 600–800 leads monthly.",
    operationalProblem: "OEM portal leads required manual CRM import and assignment to sales executives.",
    timeline: "Pilot: 4 weeks. Full deployment: Week 7.",
    kpis: [
      { label: "Lead assignment time", before: "4–5 hours", after: "<25 minutes", impact: "Faster sales engagement" },
      { label: "Uncontacted leads >24h", before: "18%", after: "~4%", impact: "Reduced lead loss" },
      { label: "Sales admin workload", before: "~2 hours/day", after: "~30 minutes/day", impact: "Recovered selling time" }
    ],
    scopeLimitation: "Walk-in leads excluded.",
    businessImpact: "Sales executives spent more time on test drives and negotiations.",
    whatStayedHuman: ["Financing discussion", "trade-in valuation", "closing"],
    whatWeLearned: "OEM lead formats varied significantly across brands.",
    hasMethodology: true
  },
  {
    id: "agriculture-distribution-orders",
    industry: "Agriculture",
    function: "Order Operations",
    title: "Order and Inventory Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Order transcription errors reduced from 2–3 weekly to 0–1 weekly.",
    clientContext: "Agricultural distributor supplying 180 retailers across three districts.",
    operationalProblem: "Orders received via phone and WhatsApp were manually entered into Tally.",
    timeline: "Pilot: 5 weeks. Full deployment: Week 7.",
    kpis: [
      { label: "Order transcription errors", before: "2–3/week", after: "0–1/week", impact: "Improved fulfilment accuracy" },
      { label: "Out-of-stock order rate", before: "11%", after: "~4%", impact: "Better inventory visibility" },
      { label: "Operations admin workload", before: "~65%", after: "~32%", impact: "Recovered planning time" }
    ],
    scopeLimitation: "Phone orders excluded initially.",
    businessImpact: "Operations staff shifted focus to supplier coordination and planning.",
    whatStayedHuman: ["Credit decisions", "pricing negotiation"],
    whatWeLearned: "Digital adoption plateaued at ~68% of retail partners.",
    hasMethodology: true
  },
  {
    id: "media-advertiser-operations",
    industry: "Media",
    function: "Reporting Operations",
    title: "Advertiser Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Campaign report preparation reduced from 2–3 hours to ~30 minutes.",
    clientContext: "Regional digital media publisher managing 35–55 campaigns monthly.",
    operationalProblem: "Campaign booking, reporting and billing coordination was handled through email threads.",
    timeline: "Pilot: 6 weeks. Full deployment: Week 11.",
    kpis: [
      { label: "Report preparation time", before: "2–3 hours", after: "25–40 minutes", impact: "Faster reporting" },
      { label: "Creative submission compliance", before: "54%", after: "79%", impact: "Improved campaign readiness" },
      { label: "Invoice follow-up workload", before: "~6 hrs/week", after: "~1.5 hrs/week", impact: "Reduced admin time" }
    ],
    scopeLimitation: "Programmatic advertising excluded.",
    businessImpact: "Operations teams reduced end-of-month reporting workload.",
    whatStayedHuman: ["Campaign strategy", "advertiser relationships"],
    whatWeLearned: "Some analytics platforms lacked API access.",
    hasMethodology: true
  },
  {
    id: "telecom-account-renewals",
    industry: "Telecommunications",
    function: "Renewal Operations",
    title: "B2B Account Renewal Operations",
    status: "Production",
    teamSize: "20–100",
    summary: "Renewal identification lead time increased from 60 days to 150 days.",
    clientContext: "Regional telecom provider managing 280 enterprise clients.",
    operationalProblem: "Renewals tracked manually, preventing structured upsell discussions.",
    timeline: "Pilot: 8 weeks. Full deployment: Week 10.",
    kpis: [
      { label: "Renewal identification lead time", before: "30–60 days", after: "120–150 days", impact: "Earlier engagement" },
      { label: "Admin workload", before: "~40%", after: "~14%", impact: "Recovered account management time" },
      { label: "Renewal lapse rate", before: "11%", after: "~7%", impact: "Projected improvement" }
    ],
    scopeLimitation: "Government contracts excluded.",
    businessImpact: "Account managers increased upsell engagement earlier in the contract cycle.",
    whatStayedHuman: ["Contract negotiation", "pricing"],
    whatWeLearned: "Renewal engagement must start earlier than industry norms.",
    hasMethodology: true
  },
  {
    id: "construction-coordination",
    industry: "Construction",
    function: "Vendor Coordination",
    title: "Subcontractor Coordination Operations",
    status: "Production",
    teamSize: "20–100",
    summary: "Supervisor coordination time reduced from ~3.5 hours/day to ~1.2 hours.",
    clientContext: "Construction contractor managing 4–6 concurrent projects.",
    operationalProblem: "Subcontractor scheduling and updates managed through calls and WhatsApp groups.",
    timeline: "Pilot: 5 weeks. Full deployment: Week 12.",
    kpis: [
      { label: "Delay detection", before: "Reactive", after: "1–2 days earlier", impact: "Earlier issue resolution" },
      { label: "Supervisor coordination time", before: "3.5 hrs/day", after: "1.2 hrs/day", impact: "Recovered oversight time" },
      { label: "Invoice verification", before: "8–12 days", after: "4–6 days", impact: "Faster payment cycle" }
    ],
    scopeLimitation: "38% subcontractors remained outside structured system.",
    businessImpact: "Site supervisors gained time for quality inspection.",
    whatStayedHuman: ["Subcontractor negotiation", "dispute resolution"],
    whatWeLearned: "Morning update requests increased subcontractor response rates.",
    hasMethodology: true
  },
  {
    id: "nbfc-loan-processing",
    industry: "Finance",
    function: "Finance Operations",
    title: "Loan Application Pre-Processing",
    status: "Production",
    teamSize: "Under 20",
    summary: "Incomplete loan files reduced from 34% to ~12%.",
    clientContext: "NBFC processing 180–260 SME loan applications monthly.",
    operationalProblem: "Manual document verification delayed credit underwriting.",
    timeline: "Pilot: 6 weeks. Full deployment: Week 9.",
    kpis: [
      { label: "Application review time", before: "3–5 days", after: "1–2 days", impact: "Faster underwriting" },
      { label: "Incomplete applications", before: "34%", after: "12%", impact: "Reduced credit rework" },
      { label: "Admin workload", before: "50%", after: "18%", impact: "Recovered analyst time" }
    ],
    scopeLimitation: "Credit decisions excluded.",
    businessImpact: "Credit teams received cleaner application files.",
    whatStayedHuman: ["Loan approval decisions"],
    whatWeLearned: "DSA applications had higher document gaps.",
    hasMethodology: true
  },
  {
    id: "pharma-order-fulfilment",
    industry: "Pharmaceutical",
    function: "Order Operations",
    title: "Pharmaceutical Order Fulfilment Operations",
    status: "Production",
    teamSize: "20–100",
    summary: "Order entry time reduced from 4–7 minutes to under 1 minute.",
    clientContext: "Pharmaceutical distributor serving 320 pharmacies.",
    operationalProblem: "Manual SAP order entry slowed fulfilment.",
    timeline: "Pilot: 4 weeks. Full deployment: Week 6.",
    kpis: [
      { label: "Order entry time", before: "4–7 min", after: "<1 min", impact: "Faster processing" },
      { label: "Returns cycle", before: "5–8 days", after: "3–4 days", impact: "Improved resolution" },
      { label: "Order errors", before: "3–5/week", after: "1–2/week", impact: "Improved accuracy" }
    ],
    scopeLimitation: "Phone orders excluded.",
    businessImpact: "Operations teams recovered planning time.",
    whatStayedHuman: ["Pricing and compliance verification"],
    whatWeLearned: "Legacy telephony slowed system integration.",
    hasMethodology: true
  },
  {
    id: "travel-group-booking",
    industry: "Travel",
    function: "Operations",
    title: "Group Booking Operations",
    status: "Production",
    teamSize: "Under 20",
    summary: "Proposal preparation reduced from 4–6 days to 2–3 days.",
    clientContext: "Corporate travel agency handling group travel bookings.",
    operationalProblem: "Supplier coordination handled manually through email.",
    timeline: "Pilot: 5 weeks. Full deployment: Week 8.",
    kpis: [
      { label: "Proposal preparation", before: "4–6 days", after: "2–3 days", impact: "Faster response" },
      { label: "Supplier coordination workload", before: "~50%", after: "~22%", impact: "Reduced admin time" },
      { label: "Quote errors", before: "15%", after: "5%", impact: "Improved proposal accuracy" }
    ],
    scopeLimitation: "Airline ticketing excluded.",
    businessImpact: "Operations team handled more group enquiries.",
    whatStayedHuman: ["Client negotiation", "itinerary design"],
    whatWeLearned: "Small suppliers lacked standardized quote formats.",
    hasMethodology: true
  }
];
