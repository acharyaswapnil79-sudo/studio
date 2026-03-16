
"use client"

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import Link from 'next/link';

// All 16 frameworks provided in the prompt
const frameworks = [
  {
    id: 1,
    category: "PRACTITIONER FRAMEWORK",
    categoryColor: "#3B82F6",
    title: "The Operational Pilot Framework: Scope, Baseline, Deploy, Measure",
    provenance: "Framework refined across N=23 operational pilots — manufacturing, finance, real estate, logistics, and healthcare contexts",
    readTime: "12 MIN READ",
    date: "FEB 2025",
    dataReliability: "Field-validated",
    dataWindow: "2022–2025",
    deploymentRef: "All deployment categories",
    methodologyNote: "All phases derived from live pilot observation. Timelines reflect median durations across the deployment cohort.",
    openingParagraph: "Of the 23 operational pilots we have run since 2022, 17 produced outcomes within 15% of projection. The six that missed projections shared a single structural failure: the baseline was either poorly defined, captured over too short a window, or compromised by a concurrent process change that the scoping team did not detect. This framework exists because we got those six wrong before we got the pattern right.",
    pullQuote: "\"The most common pilot failure is not a technology failure. It is a measurement failure that was baked in during the first two weeks of scoping.\"",
    sections: [
      {
        heading: "Phase 1 — Operational Diagnostic (Weeks 1–3)",
        content: "Before a single line of system logic is written, spend three weeks understanding the process at operator level — not management level. Management describes what the process should do. Operators describe what it actually does. These are rarely the same.\n\nIn a 2023 AR operations diagnostic at a mid-market manufacturer, management described a 5-step collections process. When we mapped it at operator level, it had 14 steps — 9 of which were undocumented workarounds for system gaps. A pilot scoped against the 5-step description would have failed to cover 60% of the actual workload.\n\nDiagnostic outputs required before proceeding: (1) A process map at operator level with step count, average duration per step, and weekly volume. (2) A manual hour distribution showing where time goes across the week — not estimated, but logged. Ask operators to track their own time for 5 working days using a simple hour log. (3) A systems inventory: every tool, spreadsheet, email thread, or messaging app involved in the process. (4) Exception catalogue: the top 5–8 exceptions that break the standard flow, their frequency, and how they are currently handled.",
        callout: { number: "14", label: "Undocumented process steps discovered in a 5-step process — visible only at operator level, not management level" }
      },
      {
        heading: "Phase 2 — Baseline Capture (Weeks 3–6)",
        content: "Baseline capture is the most technically boring and operationally critical phase of any deployment. It determines whether your post-deployment numbers mean anything.\n\nCapture baseline over a minimum of 4 consecutive working weeks. If the process has known seasonal variation — collections during quarter-end, support volume during festival season, admissions during application cycles — baseline must include a representative sample of that variation or results will be uninterpretable.\n\nWhat to measure: (1) Primary throughput metric — volume of units processed per week (invoices, leads, tickets, applications). (2) Manual hours per week spent on the process — captured by operator time log, not estimated by managers. (3) Error rate — define what constitutes an error for this process specifically, then count them. (4) Cycle time — end-to-end elapsed time from trigger to completion for the process unit. (5) Exception rate — what percentage of process units require non-standard handling.\n\nCommon baseline errors we have made and corrected: Capturing only 2 weeks of baseline is insufficient — variance is too high for a 2-week window to be statistically meaningful. Using manager estimates instead of operator time logs overstates productive time by 20–35% on average in our deployment data. Failing to define 'error' before capturing baseline means the pre and post measurements end up counting different things.",
        callout: { number: "4 weeks", label: "Minimum baseline capture window. Below this, variance is too high for post-deployment comparisons to be statistically meaningful" }
      },
      {
        heading: "Phase 3 — Pilot Deployment (Weeks 6–12)",
        content: "Scope the pilot to one process segment, one team, or one geography. The pilot proves the system works and calibrates the logic against real operational data — it is not a full deployment.\n\nWeek 6–7: System configuration and integration setup. Connect to live data sources. Do not use test data — pilots run on test environments consistently underperform live environments because the data quality differences are significant. Week 8: Parallel run. System operates alongside the existing process. Operators continue doing their work manually. System outputs are checked against manual outputs. Discrepancies are logged and investigated. Week 9–10: Transition. System takes primary ownership of defined process segments. Manual fallback remains available. Operators log exceptions daily. Week 11–12: Measurement. Compare against baseline using the same metrics, same definitions, same time-of-week capture windows.\n\nCritical calibration event: In 14 of 23 pilots, the escalation threshold required recalibration between weeks 8 and 10. The initial threshold was set based on historical data — but live operational data always has patterns that historical data obscures. Build threshold review into the pilot schedule explicitly, not as an ad hoc response.",
        callout: { number: "14/23", label: "Pilots requiring escalation threshold recalibration between weeks 8–10. Budget for this adjustment in every pilot plan" }
      },
      {
        heading: "Phase 4 — Measurement and Handoff (Weeks 12–14)",
        content: "Post-pilot measurement follows the same protocol as baseline capture: same metrics, same definitions, same 4-week window. Do not compress the measurement window because the pilot went well — the stabilisation period matters. Systems often show strong week 9–10 performance that regresses slightly in weeks 11–12 as edge cases accumulate. The 4-week measurement window captures this regression and produces a more honest outcome figure.\n\nDecision gate: At week 14, the measurement data supports one of three decisions. (1) Full deployment — outcomes within 15% of projection across primary metrics. (2) Extended pilot — outcomes directionally positive but below threshold; recalibrate and extend 4 weeks. (3) Redesign — fundamental scoping assumption was incorrect; return to diagnostic phase for the affected process segment.\n\nOf our 23 pilots: 17 proceeded to full deployment. 4 went through extended pilot before deployment. 2 required redesign — in both cases, the root cause was a systems integration constraint identified too late in the diagnostic phase. Both were eventually deployed successfully after redesign.",
        callout: { number: "17 / 4 / 2", label: "Pilot outcomes across 23 deployments: full deployment / extended pilot / redesign required" }
      },
      {
        heading: "What We Got Wrong — Honest Retrospective",
        content: "Discovery phase underestimated phone channel complexity in 4 deployments. Phone-based processes have dramatically more variation than digital processes and require more exception logic than initial scoping typically accounts for. We now run a separate phone channel technical assessment as a mandatory diagnostic step.\n\nParallel run period was too short in 3 early deployments. We ran 3-day parallel runs before transitioning. This is insufficient. The minimum parallel run period should be 5 working days — enough to encounter the week's natural variation in process inputs. Short parallel runs miss the edge cases that only appear on specific days (end-of-month for AR, Monday morning for support, Friday afternoon for logistics).\n\nOperator adoption was assumed, not managed, in 2 deployments. Systems that perform well technically can still underperform operationally if operators find workarounds more comfortable than system-managed processes. Structured operator onboarding — not just training — is a deployment variable, not an afterthought."
      }
    ]
  },
  {
    id: 2,
    category: "MEASUREMENT METHODOLOGY",
    categoryColor: "#10B981",
    title: "Baseline Capture and Measurement Methodology for Operational Deployments",
    provenance: "Measurement framework refined across N=20+ deployments. Incorporates corrections from 6 baseline failures between 2022–2023.",
    readTime: "10 MIN READ",
    date: "FEB 2025",
    dataReliability: "Deployment measurement",
    dataWindow: "2022–2025",
    deploymentRef: "All deployment categories",
    methodologyNote: "Baseline methodology verified against post-deployment actuals. Corrections documented where initial baselines produced uninterpretable results.",
    openingParagraph: "In 2022, we published an AR deployment outcome showing a 71% reduction in manual follow-up hours. A client asked us to verify the figure. When we reconstructed the measurement, we found the pre-deployment baseline had been captured during a holiday-adjacent fortnight when collections volume was 34% below normal. The real reduction was 52%. We corrected the figure, documented the methodology failure, and rebuilt the baseline framework from scratch. Everything in this document reflects that rebuild.",
    pullQuote: "\"A deployment that produces unmeasurable outcomes is operationally equivalent to a deployment that produced no outcomes. The measurement is not a formality — it is the deliverable.\"",
    sections: [
      {
        heading: "Defining the Measurement Unit",
        content: "Before capturing any numbers, define the unit of measurement with precision. This sounds obvious — it is not. In a 2023 customer support deployment, we tracked 'tickets resolved per day' as the primary metric. Post-deployment, we found the system had reclassified certain query types, which reduced the denominator. The apparent resolution rate improvement was partially definitional, not operational. We had measured two different things and called them the same metric.\n\nFor every metric, document: (1) What counts as a unit — define inclusion and exclusion criteria explicitly. (2) When the unit is counted — at creation, completion, or escalation? (3) Who counts it — system log, operator record, or manager report? (4) What constitutes an exception to the standard counting method — and how exceptions are handled in the count.\n\nFor AR operations: a 'manual follow-up action' is defined as a documented outbound contact attempt (call, email, or message) made by a finance team member to an invoice holder regarding an overdue payment — excluding system-generated contacts. The exclusion clause is as important as the inclusion clause.",
        callout: { number: "34%", label: "Below-normal volume during a baseline period that produced an overstated outcome figure — caught and corrected at client verification" }
      },
      {
        heading: "Baseline Window Design",
        content: "Standard baseline window: 4 consecutive working weeks. This is the minimum. For processes with strong cyclical patterns — monthly close cycles, quarterly renewals, academic admission seasons — the baseline must include a full cycle or the comparison will be structurally invalid.\n\nFor monthly close processes: baseline must cover 2 complete close cycles, not 4 rolling weeks. A 4-week baseline starting on the 15th of a month captures one full close and one partial. Results from this baseline cannot be compared cleanly to post-deployment data that starts on the 1st of a month.\n\nFor seasonal retail operations: do not baseline during a promotional period and measure during standard operations, or vice versa. The volume difference (typically 40–80% higher during peak periods in the deployments we have measured) dwarfs any automation impact and makes the comparison meaningless.\n\nFor recruitment processes: baseline during an active hiring cycle, not during a freeze period. A baseline of 20 applications per week measured against a post-deployment period with 80 applications per week will produce misleading throughput figures even if the system performs exactly as designed.",
        callout: { number: "40–80%", label: "Volume differential between peak and standard periods in retail operations — large enough to invalidate cross-period metric comparisons" }
      },
      {
        heading: "The Five Metrics Every Operational Deployment Should Track",
        content: "Across all 20+ deployments, five metrics have proven consistently measurable, consistently meaningful to clients, and consistently comparable pre/post. Every deployment should track all five.\n\n(1) Manual hours per week on the process — the single most important metric. Use operator time logs, not manager estimates. Average discrepancy between manager estimates and operator logs: 22% overestimation of productive time in our 2022–2024 baseline data. (2) Cycle time — elapsed time from process trigger to process completion. Measure at the 50th and 90th percentile, not the average. Averages are distorted by extreme outliers. (3) Error rate — use the exact definition established at scoping. Track both error occurrence rate and error detection lag (how long after an error occurs before it is identified). (4) Exception rate — what percentage of process units require non-standard handling. This is a system health metric: if exception rate rises post-deployment, the system's logic coverage is insufficient. (5) Throughput volume — units processed per week. Required to normalise other metrics when volume changes between baseline and measurement periods.",
        callout: { number: "22%", label: "Average overestimation of productive time when managers estimate operator hours vs operator self-reporting in time logs" }
      },
      {
        heading: "Post-Deployment Measurement Protocol",
        content: "The measurement window begins after the system has reached operational stability — defined as two consecutive weeks with no threshold recalibrations, no integration errors requiring manual intervention, and operator exception log showing < 5% of process units flagged as system-handling failures.\n\nMeasurement window: 4 weeks, same protocol as baseline. Same time of day for counts. Same operator reporting format. Same exception classification criteria.\n\nStabilisation is not optional. In two early deployments, we began measurement in week 2 post-deployment — before the system had stabilised. Both showed performance well below eventual steady-state. We published conservative numbers based on unstabilised measurement, which undersold the deployment outcome. The lesson: waiting for stability produces more accurate numbers in both directions — they are not always higher, but they are always more defensible.\n\nNormalisation for volume changes: If volume in the measurement period differs from baseline by more than 15%, normalise all hour-based metrics to per-unit rates before comparing. A system handling 600 leads/week with 4 manual hours looks worse than one handling 300 leads/week with 3 manual hours — but at per-unit rates (0.4 minutes vs 0.6 minutes per lead), the automated deployment is clearly superior."
      }
    ]
  },
  {
    id: 3,
    category: "VENDOR EVALUATION",
    categoryColor: "#F59E0B",
    title: "Agentic Systems Vendor Evaluation: A Structured Scorecard for Operations Leaders",
    provenance: "Scorecard developed from analysis of 8 competitive evaluations and post-deployment retrospectives across GreyShacks and comparable deployments",
    readTime: "9 MIN READ",
    date: "JAN 2025",
    dataReliability: "Framework-based",
    dataWindow: "2023–2025",
    deploymentRef: "Cross-category",
    methodologyNote: "Scoring weights derived from correlation analysis between evaluation criteria and post-deployment outcome quality across observed deployments.",
    openingParagraph: "Most vendor evaluations for operational automation fail at the same point: they score on features, not on deployment methodology. A system that can theoretically integrate with 200 platforms but has no structured measurement framework will produce operationally unmeasurable outcomes. You will not know if it worked. In 8 competitive evaluations we have observed or participated in, the vendors that scored highest on feature matrices delivered below-median outcomes. The vendors that scored highest on methodology transparency delivered above-median outcomes. This scorecard reflects that pattern.",
    pullQuote: "\"Ask any vendor this question: how do you define the baseline, and who captures it? If they cannot answer in three sentences, their measurement framework does not exist.\"",
    sections: [
      {
        heading: "The Five Evaluation Dimensions",
        content: "Weight each dimension as shown. The weights are not arbitrary — they reflect correlation between dimension scores and post-deployment outcome quality across observed deployments.\n\nDeployment Methodology (30% weight): Does the vendor have a documented, reproducible pilot methodology? Can they describe their baseline capture approach with specificity — how long, what metrics, how captured? Do they have a defined decision gate after the pilot before full deployment?\n\nMeasurement Transparency (25% weight): Do they publish what they measure and how? Are their outcome claims attached to measurement windows and sample sizes? Do they distinguish between pilot-period observations and steady-state results? Will they share methodology documents?\n\nIntegration Depth (20% weight): Not integration count — integration depth. Can they connect to your specific CRM, ERP, or billing system at the data layer, not just the surface layer? Have they integrated with your stack specifically, or are they proposing to do it for the first time?\n\nGovernance Capabilities (15% weight): What audit logging does the system produce? Can you reconstruct any system decision after the fact? What alerting exists for anomalous system behaviour? Who has override authority and how is it exercised?\n\nCommercial Structure (10% weight): Is the pricing model aligned with deployment outcomes or with software licenses? Flat platform fees disconnected from operational value create misaligned incentives.",
        callout: { number: "30%", label: "Weight assigned to Deployment Methodology — the single highest-weighted dimension, reflecting its correlation with post-deployment outcome quality" }
      },
      {
        heading: "The Deployment Methodology Assessment",
        content: "Ask every vendor the following six questions. Score each on a 1–5 scale. Minimum acceptable score: 4 on questions 1, 2, and 3.\n\n(1) Describe your pilot methodology. What phases does it have, and how long does each take? (Score 5 if: structured phases, documented timelines, references real deployments. Score 1 if: 'we move fast and iterate'.)\n\n(2) How do you capture the pre-deployment baseline? Who captures it, over what period, using what method? (Score 5 if: operator time logs, minimum 4-week window, metric definitions provided in advance. Score 1 if: 'we use industry benchmarks'.)\n\n(3) What is your decision gate at the end of the pilot? What criteria determine whether you proceed to full deployment? (Score 5 if: named metrics, named thresholds, documented process for an inconclusive pilot. Score 1 if: 'we assess qualitatively'.)\n\n(4) Can you share the measurement methodology from a recent comparable deployment? (Score 5 if: methodology document provided within 48 hours. Score 3 if: verbal description only. Score 1 if: 'that's confidential'.)\n\n(5) What was the last deployment that underperformed projections, and why? (Score 5 if: specific answer with honest root cause. Score 1 if: 'all our deployments succeed'.)\n\n(6) Who owns the measurement during the pilot — your team or ours? (Score 5 if: shared ownership with defined responsibilities. Score 1 if: vendor owns measurement exclusively.)",
        callout: { number: "Q5", label: "The most revealing vendor evaluation question: what was your last deployment that underperformed, and why? Vendors who answer specifically have real deployment experience." }
      },
      {
        heading: "Integration Depth — What to Actually Verify",
        content: "Vendor integration claims require technical verification, not commercial trust. Ask the vendor to demonstrate — not describe — the integration with your specific system, in a sandbox environment, before signing.\n\nFor CRM integrations: ask them to demonstrate a live read of your lead object, a write to a custom field, and a trigger from a status change event. These three operations cover 80% of what operational systems need from a CRM. If they cannot demonstrate all three on your specific CRM version, the integration is not production-ready.\n\nFor ERP and accounting integrations: ask specifically about batch vs real-time sync. Most mid-market ERP systems — including Tally, SAP B1, and many Zoho Books configurations — operate on batch API models with 15-minute to 4-hour sync windows. A vendor who claims 'real-time ERP integration' without acknowledging this constraint either does not understand your stack or is overstating capability.\n\nFor document processing: ask for a live demonstration on a sample of your actual documents, not the vendor's prepared demo documents. Document intelligence performance varies significantly with document format, scan quality, and field complexity. A vendor demo on clean, standardised documents will outperform real-world performance on your actual document population by a meaningful margin."
      },
      {
        heading: "Commercial Structure — Alignment Indicators",
        content: "Pricing structures that align vendor incentives with client outcomes: (1) Outcome-linked components — pricing tied to measured process improvement, not just system uptime. (2) Pilot pricing — a defined, lower-cost pilot engagement before full deployment commitment. (3) Expansion-based pricing — per-process or per-volume pricing that scales with actual usage rather than a large upfront platform fee.\n\nPricing structures that misalign incentives: (1) Large upfront license fees before pilot — vendor is paid regardless of whether the system works. (2) Seats-based pricing — creates incentives to limit system usage to avoid cost increases. (3) Implementation fees that are disproportionately large relative to ongoing operational value — vendor profit centre is in deployment, not in operational performance.\n\nReference check protocol: Ask for two client references. Specify that you want to speak with the operations manager who worked with the system day-to-day, not the executive who signed the contract. Ask those references: 'What did the system not do well?' and 'How long did it take to reach the outcome that was projected at scoping?' These two questions reveal more than any reference call question about satisfaction."
      }
    ]
  },
  {
    id: 4,
    category: "GOVERNANCE FRAMEWORK",
    categoryColor: "#8B5CF6",
    title: "Governance and Observability in Agentic Systems: What Operations Leaders Must Monitor Post-Deployment",
    provenance: "Governance framework derived from post-deployment monitoring observations across N=18 production deployments",
    readTime: "11 MIN READ",
    date: "JAN 2025",
    dataReliability: "Production monitoring data",
    dataWindow: "2022–2025",
    deploymentRef: "All production deployments",
    methodologyNote: "Governance requirements derived from failure mode analysis. Each requirement corresponds to at least one observed production failure in our deployment base.",
    openingParagraph: "In a 2023 logistics deployment, an agentic system had been operating in production for 11 weeks when it began generating duplicate shipment exception alerts for a subset of courier partners. The duplication went undetected for 9 days because no monitoring threshold had been set for alert volume. By the time it was identified, 140 duplicate notifications had been sent to clients — causing significant confusion and two escalated complaints. The system itself was functioning as designed. The governance framework around it was not.",
    pullQuote: "\"Agentic systems require governance frameworks proportionate to their operational autonomy. The more the system acts without human review, the more instrumented the monitoring must be.\"",
    sections: [
      {
        heading: "The Four Governance Layers",
        content: "Every production agentic system requires governance across four layers. Each layer addresses a different failure mode. Missing any one layer creates a blind spot that will, eventually, produce an operational incident.\n\nLayer 1 — Action Logging: Every action the system takes must be logged with: timestamp, action type, input data, decision logic applied, output, and any exceptions encountered. This log must be queryable — operations leadership should be able to reconstruct any system decision within 5 minutes of receiving a query. In 3 of 18 production deployments, we encountered client audit requests that required action reconstruction. Systems without queryable logs required manual reconstruction from email threads and operator memory — a process that took 2–4 days and produced incomplete records.\n\nLayer 2 — Volume Monitoring: Set alert thresholds for abnormal volume in both directions. A system processing 200 invoices per day should alert if daily volume drops below 120 or rises above 280 — both conditions indicate something abnormal. Volume collapse indicates a system failure or integration disconnect. Volume spike indicates either a genuine business event or a runaway process that is generating outputs incorrectly.\n\nLayer 3 — Exception Rate Monitoring: Track the percentage of process units that the system routes to human handling. If the exception rate rises above the pilot-period baseline by more than 20%, the system's logic coverage is degrading — either because process inputs have changed, upstream data quality has deteriorated, or the system's rules no longer match the current operational reality.\n\nLayer 4 — Outcome Quality Sampling: Weekly manual review of a random sample of system outputs. Sample size: minimum 50 units or 5% of weekly volume, whichever is larger. Review is not checking whether the system followed its rules — it is checking whether the rules are still correct for the process.",
        callout: { number: "9 days", label: "Time to detection for a duplicate alert generation error in a production deployment — caused by absence of volume monitoring thresholds" }
      },
      {
        heading: "Escalation Architecture",
        content: "The escalation path from system to human must be explicit, documented, and tested. Implicit escalation — where operators 'know' to intervene in certain situations — fails under three conditions: operator turnover, process volume spikes, and novel exception types not anticipated during deployment.\n\nFour-tier escalation model used across our production deployments: Tier 0 — System handles autonomously, no notification. Tier 1 — System handles, operator notified asynchronously (daily summary). Tier 2 — System flags for operator review within 4 hours, operator decision required before proceeding. Tier 3 — System pauses processing on the unit, immediate human review required.\n\nEscalation tier assignment criteria must be documented and version-controlled. In 5 of 18 production deployments, escalation tier criteria were modified post-deployment without formal documentation — creating situations where different operators applied different criteria for the same exception type. This produces inconsistent outputs and unmeasurable exception handling quality.\n\nTest your escalation path quarterly: deliberately trigger a Tier 3 exception and measure time to human review. In 3 production deployments, the quarterly test revealed that the designated reviewer had changed roles and the escalation notification was going to an unmanned inbox.",
        callout: { number: "5/18", label: "Production deployments where escalation criteria were modified without formal documentation — leading to inconsistent exception handling across operators" }
      },
      {
        heading: "Quarterly Review Protocol",
        content: "Every production agentic system should undergo a structured quarterly review. This is not a technical review — it is an operational review that asks whether the system's logic still correctly reflects the current operational reality.\n\nQuarterly review agenda: (1) Exception rate trend — is the exception rate stable, rising, or falling? What explains the trend? (2) Logic coverage audit — have any new process variations emerged since deployment that the system's logic does not handle? (3) Integration health — are all data connections operating within expected latency and completeness parameters? (4) Outcome quality sample review — what did the weekly sampling reveal over the past quarter? (5) Human override analysis — how many times did operators manually override system decisions? What pattern explains the overrides?\n\nLogic drift is the most common and least-visible governance failure in mature deployments. After 6–12 months in production, a system's rules become misaligned with the current process because the process has evolved while the rules have not. The system continues to operate, continues to process volume, and continues to produce outputs — but a growing proportion of those outputs are subtly incorrect in ways that are not visible without deliberate inspection.",
        callout: { number: "6–12 months", label: "Typical onset window for logic drift in production agentic systems — when rules become misaligned with evolved operational reality without governance intervention" }
      }
    ]
  },
  {
    id: 5,
    category: "SALES OPERATIONS",
    categoryColor: "#3B82F6",
    title: "Sales Operations Transformation: Designing Agentic Systems for Revenue-Critical Workflows",
    provenance: "Observations across N=9 sales operations deployments in real estate, hospitality, NBFC, automotive, and SaaS contexts",
    readTime: "8 MIN READ",
    date: "MAR 2025",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2025",
    deploymentRef: "Intelligent Lead Operations, Autonomous Sales Follow-Up",
    methodologyNote: "Lead response and conversion data measured using system logs cross-referenced against CRM stage progression records. Conversion figures reflect qualified lead progression, not closed revenue.",
    openingParagraph: "Sales operations is the most politically sensitive area of an agentic deployment. Every other operational function — finance, HR, logistics, compliance — consists of process workers who are broadly willing to have repetitive work handled by a system. Sales teams are different. Sales representatives have income tied to process control. A lead that the system misqualifies or misroutes is not an operational error — it is a commission dispute. Understanding this dynamic determines whether a sales operations deployment succeeds or fails.",
    pullQuote: "\"The first question every sales leader asks is: will this replace my team? The honest answer is: it replaces the parts of their day that keep them from selling.\"",
    sections: [
      {
        heading: "Where Sales Teams Actually Lose Time",
        content: "Pre-deployment time mapping across 9 sales operations contexts produced a consistent pattern that most sales leaders find surprising when they see it for the first time. The highest manual hour concentration in a sales team is not in selling — it is in lead administration.\n\nIn a 2023 real estate deployment, pre-deployment time mapping showed: 38% of sales representative time on lead review, deduplication, and priority sorting. 22% on lead follow-up scheduling and manual outreach logging. 18% on CRM data entry and update. 11% on internal coordination (handoffs, reassignments, status updates). Only 11% on active client conversations, site visits, and negotiation.\n\nThis pattern — where less than 15% of a sales team's time is spent on activities that directly generate revenue — appears across all 9 deployments with variation between 9% and 19%. The causes are structural, not behavioural: the tools and processes that support sales work are optimised for data capture, not for sales activity.\n\nAgentic systems in sales operations address the 81–91% — not the selling itself.",
        callout: { number: "11%", label: "Percentage of sales representative time spent on direct revenue-generating activities in a 2023 real estate pre-deployment time mapping — the remaining 89% was administrative" }
      },
      {
        heading: "Lead Response Time — The Data Every Sales Leader Should Know",
        content: "Across 6 of the 9 deployments where we tracked lead response time and downstream qualification rate, the relationship is consistent and significant: leads contacted within 10 minutes of capture qualify at 3.2× the rate of leads contacted after 60 minutes. This figure aligns closely with published research from InsideSales (now XANT) and Drift, though our deployment data shows a somewhat lower multiplier — likely reflecting the specific industries and lead quality characteristics of our client base.\n\nFor context: in 3 of the 6 deployments, pre-deployment median lead response time was between 2 and 5 hours. This places the typical unassisted lead response in the lowest-converting segment of the response time distribution. A sales team responding at median response time is operating at a fraction of its potential qualification rate — not because of skill, but because of process latency.\n\nPost-deployment response time across the 6 measured contexts: median 8 minutes (range: 4–14 minutes). Qualification rate improvement: median +38% (range: +22% to +61%). The variation in outcome reflects differences in lead source quality, qualification criteria stringency, and CRM integration completeness — not system performance differences.",
        callout: { number: "3.2×", label: "Qualification rate multiplier for leads contacted within 10 minutes vs leads contacted after 60 minutes — observed across N=6 sales operations deployments" }
      },
      {
        heading: "What the System Handles vs What Stays Human",
        content: "The boundary between system-managed and human-managed activity is the most consequential design decision in a sales operations deployment. Draw it incorrectly and you either create a system that is too passive to produce measurable outcomes, or one that generates outputs that sales representatives override constantly — creating double-work rather than efficiency.\n\nSystem-managed (appropriate for agentic handling): Lead capture from all channels into unified queue. Deduplication against existing CRM records. Basic data enrichment (company size, industry, geography) from internal and commercial data sources. Intent scoring against defined qualification criteria. Initial routing to the appropriate representative or team. First automated contact for leads below the human-escalation threshold. Follow-up scheduling reminders for representative-managed leads.\n\nHuman-managed (should not be systemised in most deployment contexts): First meaningful conversation with a prospect. Qualification decisions requiring contextual judgment beyond defined criteria. Any communication involving pricing, terms, or negotiation. Reassignment decisions when the routed representative has a prior relationship with the prospect. Decisions about whether to pursue an out-of-profile lead that the system would disqualify.\n\nThe most common scoping error in sales operations deployments: system manages the first contact attempt for all leads, including high-value or referral leads that represent a different relationship context. Referral leads in particular have a pre-existing trust relationship that automated first contact undermines."
      }
    ]
  },
  {
    id: 6,
    category: "FINANCE OPERATIONS",
    categoryColor: "#10B981",
    title: "The CFO's Deployment Guide: Agentic Systems Across the Finance Function",
    provenance: "Analysis across N=11 finance operations deployments covering AR, financial close, reporting, and compliance monitoring contexts",
    readTime: "13 MIN READ",
    date: "MAR 2025",
    dataReliability: "Deployment measurement",
    dataWindow: "2022–2025",
    deploymentRef: "AR Operations, Financial Close & Reporting, Compliance Monitoring",
    methodologyNote: "Manual hour data from operator time logs. Cycle time data from system timestamps cross-referenced with manual process records. Cost recovery figures are projections using fully-burdened staff cost rates provided by clients.",
    openingParagraph: "Finance functions in mid-market companies carry a structural inefficiency that most CFOs can describe but few have quantified: they are run by people who are overqualified for most of what they do. A finance manager with 8 years of experience and deep business judgment spends 3.5 hours of every working day on data entry, reconciliation, and follow-up — tasks that require accuracy and persistence, not judgment. Agentic systems do not make finance teams smarter. They give finance teams their time back to use the intelligence they already have.",
    pullQuote: "\"In every finance deployment we have run, the most enthusiastic adopters have been the most experienced team members — because they understand most clearly what they are giving up when they get their time back.\"",
    sections: [
      {
        heading: "The Finance Function Manual Work Distribution",
        content: "Pre-deployment time mapping across 11 finance operations engagements produced the following manual work distribution. These figures represent median values across the cohort — individual client distributions varied, but the relative ordering of manual work concentration was consistent.\n\nAccounts Receivable and Collections: 31% of total finance function manual hours. Primary drivers: invoice follow-up calls and emails, payment tracking spreadsheet updates, reconciliation between billing system and bank records, dispute documentation and escalation.\n\nMonth-End Close and Consolidation: 26% of total finance function manual hours. Primary drivers: data extraction from multiple source systems, cross-system reconciliation, consolidation into reporting spreadsheets, version management across review cycles.\n\nReporting and Analysis Preparation: 18% of total finance function manual hours. Primary drivers: data aggregation for management reports, formatting and version control, manual data quality checks before distribution.\n\nVendor and Payment Operations: 14% of total finance function manual hours. Primary drivers: invoice matching, payment instruction preparation, vendor query handling.\n\nCompliance and Audit Support: 11% of total finance function manual hours. Primary drivers: document retrieval for audit requests, reconciliation reconstruction, compliance deadline tracking.\n\nThe implication: 89% of finance function manual hours are concentrated in processes that are high-volume, rule-based, and data-intensive — the three characteristics that make a process suitable for agentic system management.",
        callout: { number: "89%", label: "Percentage of finance function manual hours in processes that are high-volume, rule-based, and data-intensive — the defining characteristics of agentic deployment suitability" }
      },
      {
        heading: "Accounts Receivable — Deployment Architecture",
        content: "AR is the highest-ROI entry point for finance function automation in the mid-market. The reason is commercial, not operational: every day of improvement in the collections cycle has a direct, calculable cash flow impact. A business with ₹5 Cr monthly AR and a 47-day collection cycle carries approximately ₹7.8 Cr in outstanding receivables at any point. Reducing the collection cycle by 16 days — the median improvement across our AR deployments — reduces the receivables float by approximately ₹2.6 Cr. The cash flow value of this improvement is immediate and ongoing.\n\nAR system architecture for mid-market deployment: (1) Invoice event trigger — system picks up new invoices from billing system on issuance. No manual initiation. (2) Payment tracking — system monitors bank/payment gateway records and matches against open invoices. Matched invoices are closed automatically. (3) Follow-up sequencing — unmatched invoices past due date enter a defined sequence: Day +3 reminder, Day +7 escalation, Day +14 senior escalation with human notification, Day +21 formal notice trigger. Each step is system-executed and logged. (4) Reconciliation — system maintains real-time match status across billing, bank, and AR ledger. Discrepancies are flagged for human review with context pre-loaded.\n\nWhat drives the range of outcomes (50–85% manual hour reduction across our AR deployments): primary variable is invoice volume and complexity. High-volume, standard invoice environments (manufacturing, distribution) show 75–85% reductions. Low-volume, complex invoice environments (professional services, custom projects) show 50–65% reductions because exception handling is proportionally higher.",
        callout: { number: "₹2.6 Cr", label: "Estimated receivables float reduction from 16-day collection cycle improvement at ₹5 Cr monthly AR — the direct cash flow case for AR automation" }
      },
      {
        heading: "Month-End Close — Where Time Goes and How to Recover It",
        content: "The median month-end close cycle in our 11 finance deployments was 9.2 working days pre-deployment. The primary time driver was not the close itself — it was the data preparation that precedes it. Data extraction from multiple systems, format standardisation, and initial reconciliation consumed an average of 3.8 of those 9.2 days in the deployments we measured.\n\nSystem intervention points for close cycle compression: (1) Automated data ingestion — system pulls data from all source systems on a defined schedule. For most mid-market finance stacks, this means nightly pulls from billing, payments, expense, and payroll systems, with a daily reconciliation against opening balances. (2) Automated reconciliation — system performs rule-based reconciliation across the pulled data and flags discrepancies for human review. The human finance manager reviews exceptions, not the entire dataset. (3) Anomaly detection — system flags transactions that fall outside defined parameters (unexpected large debits, entries from unfamiliar vendors, timing mismatches). These are presented with context, not just highlighted.\n\nPost-deployment close cycle outcomes across 6 measured finance close deployments: median close cycle reduced to 5.1 working days (range: 4–6.5 days). Manual reconciliation hours reduced by 54% (range: 44–68%). Note: the deployments at the lower end of the range involved Tally as a source system — Tally's API batch processing constraints introduce a data freshness lag that limits how much close preparation can be automated without manual data exports.",
        callout: { number: "3.8 days", label: "Average data preparation time before the actual close process begins — the primary target for close cycle compression in our finance deployments" }
      },
      {
        heading: "The CFO Integration Checklist",
        content: "Before approving a finance operations deployment, CFOs should verify the following. Each item corresponds to a failure mode observed in our deployment base.\n\nData source inventory: Are all source systems identified, and does the vendor understand their API characteristics? Specifically: is Tally in the stack? (batch API, no real-time sync). Is there a legacy ERP with restricted API access? Are there manual export-only systems that will require human intervention in the data pipeline?\n\nAudit trail requirement: Does the system log every action, every decision, and every input with timestamps? Can these logs be exported in a format your auditor can read? In one 2023 deployment, the system's audit logs were only accessible through the vendor's portal — not exportable. This created a dependency on vendor system availability for audit support.\n\nSeparation of duties: Does the system architecture respect your existing approval thresholds? No system should execute payment instructions without human authorisation above defined value thresholds. This is not a preference — it is a control requirement.\n\nRecovery procedure: If the system experiences an outage, what is the manual fallback? The answer should be a documented, tested procedure — not 'we call the vendor'."
      }
    ]
  },
  {
    id: 7,
    category: "HEALTHCARE OPERATIONS",
    categoryColor: "#EF4444",
    title: "Administrative Efficiency in Healthcare Settings: An Agentic Systems Framework",
    provenance: "Observations across N=4 healthcare administrative deployments covering appointment scheduling, claims pre-processing, and patient communication workflows",
    readTime: "7 MIN READ",
    date: "DEC 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2025",
    deploymentRef: "Healthcare — Appointment Scheduling, Healthcare — Claims Processing",
    methodologyNote: "No-show rates measured from appointment records. Claims rejection data from billing system reports. All patient data is fully anonymised. No clinical data was accessed or processed.",
    openingParagraph: "Healthcare administrative operations carry a cost that is poorly tracked and consistently underestimated: the cost of a patient who did not show up, a claim that was rejected and required resubmission, or an appointment slot that was double-booked. In a 320-appointment-per-week facility, a 22% no-show rate represents 70 empty appointment slots per week — at an average revenue per appointment of ₹800–1,500, this is a recoverable loss of ₹56,000–₹105,000 per week. No-shows are not patient behaviour problems. They are operational problems with operational solutions.",
    pullQuote: "\"Healthcare administrators do not fail because they lack skills. They fail because they are given communication and tracking responsibilities at a volume that no manual system can handle reliably.\"",
    sections: [
      {
        heading: "The No-Show Problem — Root Cause Analysis",
        content: "Across 3 of 4 healthcare deployments, we conducted structured no-show root cause analysis before deploying reminder and confirmation systems. The findings were consistent and, in each case, surprised the clinical leadership team.\n\nPrimary no-show cause: Patient did not receive a reminder at an effective time (43% of no-shows in sampled analysis). Secondary cause: Patient forgot the appointment despite receiving a reminder — indicating reminder timing was ineffective (29%). Tertiary cause: Appointment was no longer needed but patient did not cancel (18%). Other causes (genuine emergency, transport issues, etc.): 10%.\n\nThe operational implication: 72% of no-shows are attributable to communication timing and frequency gaps — not to patient unwillingness to attend. This is an administrative solvable problem, not a patient behaviour problem.\n\nEffective reminder protocol derived from our deployment data: Reminder 1 at 72 hours before appointment (confirmation request). Reminder 2 at 24 hours (attendance confirmation, with easy cancellation link). Reminder 3 at 2 hours (attendance confirmation for high-value or procedure appointments only). This three-touch protocol — consistently applied — reduced no-show rates from a median of 22% to 14% across our healthcare deployments. The 8 percentage point reduction represents approximately 26 recovered appointment slots per week in a 320-appointment facility.",
        callout: { number: "72%", label: "Percentage of no-shows attributable to communication timing and frequency gaps — an administratively solvable problem, not a patient behaviour problem" }
      },
      {
        heading: "Claims Pre-Processing — The ₹ Case for Automation",
        content: "Insurance claim rejection in healthcare is a double cost: the direct revenue delay and the resubmission labour. In our 2024 claims processing deployment, pre-deployment analysis found a 14% first-submission rejection rate. Each rejected claim required an average of 47 minutes of billing team time to identify the error, correct the documentation, and resubmit. At a billing team fully-burdened cost of ₹450/hour, the per-rejection cost was approximately ₹350 in labour alone — before accounting for the 30–45 day revenue delay on the resubmitted claim.\n\nFor a facility processing 400 claims per month, a 14% rejection rate means 56 rejected claims per month. Labour cost: ₹19,600/month. Revenue delay impact (assuming 8% of monthly revenue delayed by 35 days at a cost-of-capital rate of 12% per annum): approximately ₹4,200/month in implicit financing cost. Total monthly cost of a 14% rejection rate: approximately ₹23,800/month.\n\nPost-deployment rejection rate: 8%. Monthly savings from 6-percentage-point reduction: approximately ₹10,200/month in labour plus approximately ₹1,800/month in implicit financing cost. Annual savings: approximately ₹1.44 Lakhs. This is before any accounting for clinical staff time recovered from administrative support and before the improvement in cash flow predictability that comes from lower rejection rates.",
        callout: { number: "₹23,800/month", label: "Total monthly cost of a 14% claim rejection rate in a 400-claim facility — labour cost plus implicit financing cost from revenue delays" }
      },
      {
        heading: "What Healthcare Administrators Should Not Automate",
        content: "The boundary between administrative automation and clinical communication is the most important design constraint in a healthcare deployment. Cross this boundary and you create both a patient experience risk and a regulatory risk.\n\nAdministrative communications appropriate for system management: appointment reminders and confirmations, documentation request follow-ups, billing and payment communications, appointment availability notifications, post-visit satisfaction surveys.\n\nCommunications that must remain human-managed: any communication that requires interpretation of clinical information, any communication responding to patient-reported symptoms or concerns, any communication regarding diagnosis, treatment plan, or medication, any communication with a patient who has flagged distress or dissatisfaction in a prior interaction, any communication regarding a procedure requiring informed consent.\n\nA design principle that prevents boundary violations: if the communication content depends on information that only a clinician should interpret, the system flags it for human composition — it does not generate the communication. The system manages scheduling, reminders, and administrative follow-ups. All clinical communication remains with the clinical team."
      }
    ]
  },
  {
    id: 8,
    category: "REAL ESTATE OPERATIONS",
    categoryColor: "#F59E0B",
    title: "Lead Operations Design Framework for Real Estate Sales Teams",
    provenance: "Observations from N=5 real estate and property sector deployments across residential development, commercial brokerage, and property management contexts",
    readTime: "9 MIN READ",
    date: "DEC 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2025",
    deploymentRef: "Real Estate — Intelligent Lead Operations, Real Estate — Broker Communication",
    methodologyNote: "Lead response time measured from CRM record creation timestamp to first system or human contact log. Qualification rate measured as leads meeting client-defined criteria per week. Conversion to site visit not tracked in all deployments.",
    openingParagraph: "Real estate sales operations have a structural inefficiency that does not appear in most CRM dashboards: the gap between when a lead is generated and when it is meaningfully engaged. In a market where developers spend ₹800–2,500 per digital lead and close rates on qualified leads average 3–8%, the difference between a 4-hour response and a 10-minute response is not a customer service metric — it is a cost of acquisition metric. A lead that costs ₹1,200 to generate and converts at 5% when contacted in 10 minutes converts at 1.6% when contacted in 4 hours. The same lead, the same marketing spend, four different outcomes depending entirely on operational response time.",
    pullQuote: "\"Real estate developers treat lead response time as a sales KPI. It is more accurately a marketing efficiency metric — it determines the effective cost per qualified prospect from your acquisition spend.\"",
    sections: [
      {
        heading: "Lead Channel Architecture — The Multi-Source Problem",
        content: "The fundamental operational challenge in real estate lead management is not volume — it is fragmentation. A developer with 5 active digital channels, a broker network, walk-in traffic, and a reference programme is managing 8 distinct lead sources, each with different data formats, different timing characteristics, and different intent signals.\n\nIn a 2023 deployment for a residential developer with active projects in 2 cities, pre-deployment lead source audit found: portal leads (MagicBricks, 99acres, Housing): arriving as email alerts with inconsistent field formats. Meta/Google campaign leads: arriving via webhook with good field structure but no enrichment. Broker leads: arriving via WhatsApp with no structured format. Walk-in leads: entered manually by reception staff with inconsistent field completion. Referral leads: communicated informally via broker WhatsApp groups.\n\nThe operational consequence of this fragmentation: each lead source required a different handling procedure, creating 8 parallel manual processes that a sales team of 11 managed simultaneously. The median time for a portal lead to reach a sales representative's CRM queue was 3.8 hours — not because the team was slow, but because the manual consolidation process had no slack capacity.\n\nSystem intervention: unified ingestion layer that normalises all lead sources into a single structured queue within 8 minutes of lead generation. This single intervention — before any qualification logic is applied — reduced the 3.8-hour portal lead lag to 11 minutes.",
        callout: { number: "3.8 hours", label: "Median time for a portal-sourced lead to reach a sales representative's CRM queue in a pre-deployment real estate sales operation — caused by manual consolidation, not team capacity" }
      },
      {
        heading: "Qualification Criteria Design — The Most Important Scoping Conversation",
        content: "The qualification criteria that determine which leads route to human representatives and which enter automated nurture sequences are the most consequential design decision in a real estate lead operations deployment. Criteria that are too broad route low-intent leads to sales representatives and waste their time. Criteria that are too narrow route high-intent leads to automated sequences and lose them.\n\nCriteria design process: Start with the sales team's informal mental model. Ask senior sales representatives: 'When you look at a lead in your queue, what are the first three things you check to decide if it is worth calling?' This reveals the actual qualification logic being applied — which is often different from the formal qualification criteria documented by marketing or management.\n\nIn one 2024 deployment, the marketing team's formal qualification criteria were: property type match, geography within specified project catchment, and budget range overlap. The senior sales team's actual criteria were: recency of enquiry (within 24 hours weighted heavily), contact information completeness (phone number confirmed), and source quality (direct enquiry vs portal aggregator). The formal criteria and actual criteria had only partial overlap. We built the system to match the actual criteria.\n\nCriteria review protocol: Every 8 weeks during the first year of production, review a sample of 40 leads that the system classified in each category (qualified to rep, entered nurture, disqualified). The sales team reviews the sample and identifies any systematic misclassification. This iterative calibration is ongoing — lead quality profiles from marketing channels shift over time and qualification criteria must reflect current channel mix.",
        callout: { number: "Every 8 weeks", label: "Recommended qualification criteria review interval during the first year of production — lead quality profiles shift as marketing channel mix evolves" }
      },
      {
        heading: "Broker Operations — The Underdeployed Opportunity",
        content: "Most real estate operational automation deployments focus exclusively on direct digital leads. Broker-originated leads represent 30–60% of sales volume for most Indian residential developers — and broker operations are almost entirely unautomated.\n\nBroker communication failures observed across deployments: Developers send project updates to broker networks inconsistently — often triggered by individual sales manager initiative rather than a systematic process. Brokers present stale inventory and pricing to clients because they have not received updates, leading to prospect disappointment and broker relationship damage. Broker enquiries about unit availability, pricing, and project status are handled manually by internal sales staff, consuming significant time.\n\nSystem intervention points for broker operations: (1) Scheduled inventory and pricing update distribution — every Monday morning, system sends structured update to all active broker contacts with current availability, pricing, and any project milestones. Preparation time for this update: 30–45 minutes of human review and approval. Without system: 3–4 hours of manual compilation and individual communication. (2) Broker enquiry auto-response — standard enquiries about availability and pricing are handled by the system within minutes. Non-standard enquiries (negotiation, custom requests, dispute) route to a human sales manager with full context pre-loaded. (3) Broker engagement tracking — system records which brokers are actively sending qualified referrals, enabling targeted relationship management investment."
      }
    ]
  },
  {
    id: 9,
    category: "PROCUREMENT OPERATIONS",
    categoryColor: "#8B5CF6",
    title: "Procurement & Vendor Operations System Design: From PO Chaos to Structured Visibility",
    provenance: "Observations across N=5 procurement operations deployments in manufacturing, distribution, and retail contexts",
    readTime: "8 MIN READ",
    date: "NOV 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2025",
    deploymentRef: "Manufacturing — Procurement Order Tracking, Pharmaceutical Distribution",
    methodologyNote: "Delay identification lead time measured from system timestamp of vendor confirmation to first human awareness of delay. Manual follow-up hours from operator time logs.",
    openingParagraph: "Procurement operations in mid-market manufacturing and distribution companies are managed the same way they have been managed for 30 years: by experienced coordinators who know their supplier base personally and manage relationships through informal communication. This works well when the supplier base is small and the coordinator is available. It fails systematically when supplier count exceeds 25–30, when coordinator turnover occurs, or when order volume spikes beyond what one or two people can track manually. In a 40-supplier operation, a coordinator managing 80 active purchase orders simultaneously is operating beyond the reliable cognitive tracking capacity of any individual.",
    pullQuote: "\"Procurement coordinators do not miss delivery delays because they are inattentive. They miss them because tracking 80 active purchase orders across 40 suppliers by phone and email is a structural information management problem, not a human performance problem.\"",
    sections: [
      {
        heading: "The Cost of Reactive Procurement Visibility",
        content: "In three of five procurement deployments, we conducted a cost-of-delay analysis before deploying tracking systems. The consistent finding: delivery delays were identified an average of 2.1 working days after the delay had already occurred — after the expected delivery date had passed and stock levels had already been impacted.\n\nIn a 2023 deployment for a components manufacturer with 18 active suppliers and 55 average concurrent POs: pre-deployment delay identification lag was 2.3 days. Of the 14 delays observed during the 4-week baseline period, 11 caused downstream production scheduling disruptions. Average cost of a production scheduling disruption (overtime, expedited freight, or alternative sourcing premium): ₹28,000–₹45,000 per incident. Extrapolated annual cost of reactive delay identification: ₹14.5–23.4 Lakhs.\n\nPost-deployment: the system monitored supplier confirmation and shipment status daily, surfacing at-risk orders 1–2 days before the scheduled delivery date based on supplier response patterns and shipment tracking data. Delay identification lead time: from 2.3 days post-occurrence to 1.5 days pre-occurrence — a 3.8-day shift in the identification window. Production scheduling disruptions in the 10-week measurement period: 3 (vs 14 in the equivalent pre-deployment baseline period). Not all of the reduction is attributable to the system — some reflects improved supplier communication prompted by the structured follow-up cadence.",
        callout: { number: "3.8 days", label: "Shift in delay identification window — from 2.3 days after delay occurrence to 1.5 days before — enabling proactive scheduling adjustment" }
      },
      {
        heading: "System Architecture for Procurement Operations",
        content: "PO tracking system components and design principles:\n\nPO creation trigger: System records every new PO at creation, capturing supplier, line items, delivery date commitment, and value. No manual system entry by coordinators — PO data pulled directly from ERP on creation event.\n\nConfirmation tracking: System sends structured confirmation request to supplier within 4 hours of PO creation. Unconfirmed POs after 24 hours trigger an escalation alert to the procurement coordinator. The coordinator's job shifts from chasing all POs to handling the subset that require attention.\n\nAt-risk identification: System flags POs where supplier confirmation pattern suggests delivery risk. Risk indicators: supplier has not confirmed within 24 hours; supplier has confirmed but not provided shipment notification by day 3 before expected delivery; supplier has a delivery failure history on similar order types (tracked from prior PO records).\n\nReceipt matching: On delivery, system matches received items against PO line items. Discrepancies (quantity, specification, or documentation gaps) are flagged immediately for coordinator review with full PO context.\n\nWhat the system does not determine: supplier selection, commercial negotiations, credit terms, and relationship management for strategic suppliers. These require relationship context and commercial judgment that should remain human-managed.",
        callout: { number: "24 hours", label: "Unconfirmed PO escalation threshold — shifts coordinator attention from universal follow-up to targeted intervention on the subset of suppliers requiring it" }
      },
      {
        heading: "Supplier Adoption — The Variable That Determines System Value",
        content: "The procurement system's value is directly proportional to the percentage of the supplier base that engages with structured communication. In our deployments, this is the primary variable that explains outcome differences across contexts.\n\nSupplier adoption rates observed: Tier-1 suppliers (high-volume, strategic partners): 87–94% adoption within 4 weeks. Mid-tier suppliers (regular but not strategic): 62–74% adoption within 4 weeks. Small/informal suppliers (regional, informal business practices): 28–42% adoption, plateauing without active support.\n\nFor the non-adopting segment: the system cannot track what suppliers do not report. For small and informal suppliers, the system maintains manual follow-up reminders for the procurement coordinator — ensuring these suppliers are not forgotten while the coordinator's attention is focused on system-managed tier-1 and mid-tier POs.\n\nSupplier onboarding investment: structured adoption outreach to tier-1 and mid-tier suppliers in the first 2 weeks of deployment significantly improves adoption rates. In one deployment, a 2-hour onboarding session for the top 15 suppliers (by PO volume) achieved 91% adoption within 10 days. The informal segment typically requires ongoing coordinator relationship management — the system cannot substitute for this."
      }
    ]
  },
  {
    id: 10,
    category: "CUSTOMER OPERATIONS",
    categoryColor: "#EF4444",
    title: "Customer Operations Deflection Architecture: Designing Tier-1 Resolution Systems",
    provenance: "Observations across N=6 customer operations deployments in retail, SaaS, telecom, and e-commerce contexts",
    readTime: "10 MIN READ",
    date: "NOV 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2025",
    deploymentRef: "Retail — Customer Query Resolution, SaaS — Customer Support Triage",
    methodologyNote: "Deflection rate measured as percentage of inbound queries resolved without human agent involvement. Response time from ticket creation timestamp to first response log. CSAT not tracked in all deployments — noted where unavailable.",
    openingParagraph: "Customer support operations have an economics problem that becomes visible at scale: the cost per contact for human-handled queries is essentially fixed at ₹35–90 per interaction in the mid-market contexts we have worked in, while the value of the query being resolved varies enormously. A tier-1 query — order status, return policy, payment confirmation — generates the same cost as a complex escalation but delivers far less value from the agent's perspective. The agents who are best at complex, high-judgment customer interactions spend the majority of their time on queries that do not require their skills. This is the operational problem that deflection architecture is designed to solve.",
    pullQuote: "\"Deflection is not about reducing service quality. It is about delivering appropriate responses at appropriate speeds — and reserving human judgment for the interactions that actually require it.\"",
    sections: [
      {
        heading: "Query Classification — The Foundation of Deflection Architecture",
        content: "Deflection systems fail when query classification is inaccurate. Misclassifying a complex query as tier-1 and routing it to automated resolution produces a worse customer experience than no system at all. The classification logic is therefore the highest-priority design component in any customer operations deployment.\n\nQuery classification framework used across our deployments, tiered by resolution complexity:\n\nTier 1A — Fully automatable: query is answerable from structured data the system can access. Examples: order status, delivery tracking, payment confirmation, return window eligibility check, standard policy questions. Deflection target: 100%. System should resolve without routing to human agent.\n\nTier 1B — Template-guided automation: query requires a structured response with minor personalisation. Examples: standard refund initiation, appointment rescheduling, account detail update requests. Deflection target: 85–95%. Small percentage route to human review before sending.\n\nTier 2 — Human with context: query requires judgment, relationship context, or policy exception consideration. Examples: partial refunds, complex delivery issues, billing disputes, loyalty exception requests. Deflection target: 0% — route to human with full context pre-loaded.\n\nTier 3 — Immediate human escalation: query involves distress, safety concern, legal implication, or regulatory sensitivity. Examples: complaints about product injury, fraud or account security concerns, legal notices. Deflection target: 0% — immediate human escalation, high-priority flag.",
        callout: { number: "Tier 1A", label: "Fully automatable queries — answerable from structured data. Deflection target 100%. Classification accuracy in this tier determines system credibility with customers." }
      },
      {
        heading: "The Deflection Rate Reality — What Our Data Shows",
        content: "Published industry figures for customer support deflection rates range from 60–80%. Our deployment data shows a consistently lower range: 44–63% for initial deployments, improving to 52–71% after 90 days of classification refinement.\n\nWhy our figures are lower than industry benchmarks: (1) We measure deflection rate against total inbound volume, including tier-2 and tier-3 queries that should never be deflected. Some industry benchmarks measure deflection rate only against queries that the system attempted to handle — a different and more flattering denominator. (2) Our deployments operate in markets (India, primarily) where customer communication tends toward more complex, narrative-format queries than the structured query formats common in US/EU benchmarks. Narrative queries are significantly harder to classify accurately. (3) We do not count a query as deflected unless it is confirmed resolved — not just acknowledged. A system that sends an automated acknowledgement and requires a human follow-up is not a deflection; it is a two-step human interaction.\n\nThe practical implication: plan for a 50–65% deflection rate target in year 1. Design agent capacity accordingly — the system handles majority but not overwhelming majority of volume. Agents remain engaged with a meaningful portion of queries, which supports skill maintenance for the complex cases.",
        callout: { number: "52–71%", label: "Deflection rate range after 90-day classification refinement across 6 customer operations deployments — lower than industry benchmarks for methodologically honest reasons" }
      },
      {
        heading: "Peak Volume Management — The Strategic Case for Deflection",
        content: "The business case for customer operations deflection changes significantly during peak volume periods. In standard operations, a team of 9 handling 600 tickets per week operates with reasonable slack. During a peak week of 1,050 tickets — a 75% volume increase — the same team is overwhelmed, response times deteriorate, and agent quality degrades under pressure.\n\nDeflection systems do not scale with volume — they handle the same proportion of tier-1 queries regardless of total volume. This means in a peak week of 1,050 tickets, a 58% deflection rate handles approximately 609 queries automatically, leaving 441 for human agents — 100 more than standard operations but manageable without a dramatic service quality impact.\n\nWithout deflection, the same 1,050-ticket peak week requires the human team to handle 1,050 queries — a 75% load increase with no capacity addition. Response times in our pre-deployment data during equivalent peak periods averaged 8–10 hours vs 2–3 hours in standard weeks. Post-deployment peak period response times in measured deployments: 45–75 minutes for tier-1 (system-handled), 2.5–4 hours for tier-2 (human-handled). The human team's response time on complex queries actually improves during peak periods because they are no longer processing tier-1 volume."
      }
    ]
  },
  {
    id: 11,
    category: "TALENT ACQUISITION",
    categoryColor: "#3B82F6",
    title: "HR and Talent Acquisition System Design: From Intake to Qualified Shortlist",
    provenance: "Observations from N=5 talent acquisition and HR operations deployments across manufacturing, IT services, hospitality, and professional services contexts",
    readTime: "7 MIN READ",
    date: "OCT 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2025",
    deploymentRef: "Candidate Screening & Scheduling",
    methodologyNote: "Screening time measured from application receipt to shortlist delivery. Data entry hours from operator logs. Qualified candidate rate measured against client-defined criteria — not offer or joining rate.",
    openingParagraph: "Recruitment teams in mid-market companies operate under a process contradiction that creates both inefficiency and poor candidate experience simultaneously: the early stages of recruitment — which determine 90% of who gets interviewed — are given the least time and attention because they are considered administrative rather than strategic. The result is that applications are reviewed inconsistently, strong candidates are lost to slow follow-up, and recruiters spend most of their time doing exactly the work that makes them least effective — form processing rather than candidate assessment.",
    pullQuote: "\"Recruitment processes that take 3 days to acknowledge an application are not failing because of inadequate technology. They are failing because the administrative overhead of high-volume intake has consumed the recruiter's available time.\"",
    sections: [
      {
        heading: "The Application Intake Problem",
        content: "Application intake — the process from application receipt through to a structured shortlist ready for human review — is the highest-burden, lowest-judgment component of any recruitment process. In 5 deployments, pre-deployment time mapping of application intake showed a consistent pattern: recruiters were spending 55–70% of their weekly hours on intake administration.\n\nBreakdown of intake administrative hours in a 2024 professional services deployment: (1) Application download and consolidation from job portals and email: 1.8 hours/day. (2) Duplicate removal and prior-applicant check: 0.7 hours/day. (3) Basic eligibility screening (qualification, experience years): 1.4 hours/day. (4) Data entry into ATS: 1.2 hours/day. (5) Acknowledgement communications to applicants: 0.6 hours/day. Total: 5.7 hours/day on intake for a recruiter working an 8-hour day.\n\nOf this 5.7 hours, the only component that requires recruiter judgment is eligibility screening — and even that, for initial screening, is rule-based: does the candidate have a degree in the required field and 3+ years of experience? This is a query, not an assessment. The remaining 4.3 hours of intake work are pure administrative processing.",
        callout: { number: "5.7 hrs/day", label: "Recruiter time spent on application intake administration in a pre-deployment professional services context — leaving only 2.3 hours for judgment-intensive recruitment work" }
      },
      {
        heading: "System Design for Talent Acquisition",
        content: "Recruitment system architecture for mid-market deployment:\n\nApplication capture: System collects applications from all sources (portal API integrations, email parser for portal email alerts, direct web form submissions) into a unified queue. Each application is normalised into a structured record within 15 minutes of receipt.\n\nDuplicate and prior applicant detection: System checks each application against the existing candidate database before any human review. Duplicates are flagged and merged. Prior applicants within the cooldown period defined by client policy are filtered.\n\nInitial eligibility filter: System applies rule-based criteria — minimum qualification level, minimum experience years, location (where relevant), notice period (where a constraint). Applications meeting all criteria proceed to the shortlist queue. Applications failing on objective criteria receive a system-generated acknowledgement and are archived.\n\nEnrichment: For applications proceeding to shortlist, system enriches the candidate record with professional profile data where publicly available, and flags any notable credentials or career signals specified in the role brief.\n\nOutput: Recruiter receives a structured shortlist — typically 15–25% of applications — with each candidate record complete, enriched, and ranked by criteria score. Recruiter time is now directed entirely to assessment of pre-qualified candidates.\n\nWhat does not change: the recruiter's judgment on who to interview. The system delivers a qualified shortlist. The human assessment of which candidates within that shortlist warrant interview, and all subsequent candidate interactions, remain human-managed.",
        callout: { number: "15–25%", label: "Percentage of applications that typically proceed to the human recruiter's shortlist after system-managed intake processing — the pool requiring actual judgment-based assessment" }
      },
      {
        heading: "Candidate Experience — The Often-Missed Benefit",
        content: "The operational efficiency case for recruitment system deployment is well-understood. The candidate experience case is less often measured, but in two deployments where we tracked candidate response rates, it was quantitatively significant.\n\nIn a 2024 hospitality deployment: pre-deployment, application acknowledgement occurred within 2.1 working days on average. Post-deployment acknowledgement: within 25 minutes. Interview scheduling in pre-deployment: average 3.8 days from shortlist to confirmed interview. Post-deployment: 1.1 days.\n\nCandidate withdrawal rate (applications that lapsed before interview because the candidate accepted another offer): pre-deployment 18%, post-deployment 9%. In a competitive hiring market for mid-level hospitality roles, a 9-percentage-point reduction in candidate withdrawal from shortlist to interview represents a meaningful improvement in the quality of the interview pool — because the candidates who withdraw first are typically those with the most options.\n\nThe implication for organisations that use speed of response as an employer brand signal: system-managed intake that acknowledges applications within 30 minutes creates a candidate experience signal that most hiring managers cannot achieve manually."
      }
    ]
  },
  {
    id: 12,
    category: "LOGISTICS OPERATIONS",
    categoryColor: "#10B981",
    title: "Exception Management in Logistics Operations: Designing Systems for Reactive-to-Proactive Transition",
    provenance: "Observations from N=4 logistics and supply chain operations deployments covering last-mile delivery, vendor invoice reconciliation, and shipment tracking contexts",
    readTime: "8 MIN READ",
    date: "OCT 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2025",
    deploymentRef: "Logistics — Shipment Exception Handling, Logistics — Vendor Invoice Reconciliation",
    methodologyNote: "Exception identification lead time measured from system detection timestamp vs human-reported identification timestamp in pre-deployment period. Return rate baseline unavailable in 2 of 4 deployments.",
    openingParagraph: "Logistics operations are characterised by a decision asymmetry that most logistics managers understand intuitively but rarely quantify: the cost of early exception identification is low (a 15-minute system alert), while the cost of late exception identification is high (a missed delivery window, an expedited re-shipment, a client SLA breach). The gap between these two costs — available to operations teams that have real-time exception visibility vs those that do not — is the financial case for logistics exception management systems.",
    pullQuote: "\"A logistics operation that identifies delivery exceptions after they have already occurred is not managing logistics. It is managing the aftermath of logistics.\"",
    sections: [
      {
        heading: "Exception Classification in Logistics",
        content: "Logistics exception management begins with a clear taxonomy of exception types. In the absence of a taxonomy, systems flag everything as exceptions — creating alert fatigue that makes the system less useful than no system at all.\n\nException taxonomy used across our logistics deployments, tiered by resolution urgency:\n\nTier 1 — Delivery execution exceptions (resolution required within 2 hours): Failed delivery attempt, address mismatch identified at dispatch, consignee unavailable after 2 attempts, vehicle breakdown or route disruption. These directly impact delivery outcomes and require immediate operational response.\n\nTier 2 — Administrative exceptions (resolution required within 24 hours): Invoice discrepancy, documentation gap (missing customs documents for interstate), weight/volume mismatch between booking and actual. These impact billing and compliance but do not affect immediate delivery.\n\nTier 3 — Monitoring flags (information only, no immediate action required): Shipments tracking 12+ hours behind expected timeline without a specific cause identified, repeat exception pattern for a specific courier partner or route, volume spike beyond capacity planning threshold.\n\nA well-designed exception management system generates tier-1 alerts immediately, batches tier-2 alerts into daily summaries, and surfaces tier-3 flags in weekly operational reviews. Most pre-deployment logistics operations treat all three tiers as equivalent-urgency phone calls — creating the noise that causes important exceptions to be missed.",
        callout: { number: "Tier 1", label: "Delivery execution exceptions requiring resolution within 2 hours — the tier where late identification has immediate, unrecoverable revenue impact" }
      },
      {
        heading: "The Multi-Courier Portal Problem",
        content: "The most common logistics operations pain point across our deployment diagnostics: managing shipment status across multiple courier partner portals. In a typical last-mile coordinator's day: check DHL portal, check BlueDart portal, check Delhivery portal, check DTDC portal, cross-reference against dispatch records, identify exceptions, initiate resolution. This sequence — repeated 2–3 times per day for a 2,200-shipment-per-week operation — consumes 16–20 coordinator hours per week.\n\nThe consolidation system resolves this by pulling status data from each courier API or portal on a defined schedule (every 30–60 minutes for tier-1 exception types) and surfacing the exception view in a single interface. Coordinators monitor one screen, not four portals.\n\nCaveat from deployment data: courier API reliability varies significantly. In our 2023 logistics deployment, one of four courier partners had an API uptime of 78% over the 10-week measurement period — meaning 22% of the time, status data for that carrier was unavailable from the system and required manual portal check. This is a structural constraint of the courier's systems, not the exception management system. Future deployments should assess courier API reliability as part of the diagnostic phase.",
        callout: { number: "16–20 hrs/week", label: "Coordinator hours consumed by manual multi-portal status monitoring in a 2,200-shipment-per-week operation — the baseline being replaced by a unified monitoring system" }
      },
      {
        heading: "Vendor Invoice Reconciliation — The Hidden Logistics Cost",
        content: "Logistics vendor invoice reconciliation is consistently underestimated as a source of cost leakage. In a mid-market distribution business processing 900 vendor invoices per month, our 2023 deployment diagnostic found: 8.3% of invoices contained discrepancies — rate differences, quantity mismatches, or unapproved surcharges. Of these, 61% were being paid without dispute because the manual reconciliation process did not catch them before payment. Estimated annual cost of uninvestigated invoice discrepancies: ₹8.4–12.6 Lakhs.\n\nSystem design for invoice reconciliation: Purchase order to invoice matching on issue (auto-match for exact matches, flag for discrepancies). Rate card validation (system checks invoiced rates against contracted rate card for each vendor). Surcharge audit (system flags line items not in the contracted service scope). Dispute initiation (auto-generated dispute notification for vendor with discrepancy detail, reducing manual dispute preparation time from 45 minutes to under 5 minutes per case).\n\nPost-deployment reconciliation outcomes: auto-match rate for exact-match invoices: 71%. Discrepancy catch rate: 94% (vs estimated 39% manual catch rate pre-deployment). Invoice cycle from receipt to approval or dispute: 8–12 days (pre) to 3–4 days (post). Estimated annual savings from discrepancy recovery: ₹4.8–7.2 Lakhs — approximately 57% of the pre-deployment leakage."
      }
    ]
  },
  {
    id: 13,
    category: "COMPLIANCE OPERATIONS",
    categoryColor: "#8B5CF6",
    title: "Compliance Monitoring Architecture: Building Systems That Catch Obligations Before They Become Breaches",
    provenance: "Observations from N=4 compliance and regulatory operations deployments in financial services, healthcare administration, and professional services contexts",
    readTime: "11 MIN READ",
    date: "SEP 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2025",
    deploymentRef: "Finance — Compliance Monitoring",
    methodologyNote: "Obligation tracking coverage measured as percentage of tracked obligations with advance alerts configured. Missed submission incidents tracked from compliance team records. System does not assess regulatory risk — it tracks administrative obligations.",
    openingParagraph: "Compliance failures in mid-market organisations are almost never caused by wilful non-compliance or regulatory misunderstanding. They are caused by administrative failures: an obligation that was tracked in a shared calendar that nobody checked, a deadline that was remembered by an individual who left the organisation, a filing that was prepared but not submitted because the approval chain broke down. These are not compliance failures — they are calendar management and workflow failures that produce compliance consequences. Agentic systems address the administrative layer; regulatory knowledge and judgment remain human responsibilities.",
    pullQuote: "\"The compliance function in a mid-market business is typically understaffed, over-reliant on individual knowledge, and managing obligations with tools designed for personal task management. This is a structural risk, not a capability gap.\"",
    sections: [
      {
        heading: "The Compliance Obligation Inventory — Where It Goes Wrong",
        content: "In all four compliance deployments, the first diagnostic step was an obligation inventory audit — a structured mapping of every regulatory, statutory, and contractual obligation the organisation was tracking. The result of this audit was, in every case, a surprise to the compliance or finance leadership.\n\nIn a 2023 financial services intermediary deployment: the compliance officer believed the organisation was tracking 34 regulatory obligations. The obligation audit identified 67. The additional 33 obligations were not unknown — they were being managed informally by different individuals across the organisation without the compliance officer's visibility. Three of these obligations had missed filing deadlines in the prior 18 months.\n\nObligation inventory audit methodology: (1) Regulatory requirement review — identify every applicable statute, regulation, or licence condition. (2) Contractual obligation review — every client contract, vendor agreement, and SLA contains obligations. These are rarely tracked systematically. (3) Internal policy obligation review — board-approved policies often create internal compliance deadlines. (4) Knowledge holder interviews — ask each team: what compliance activities do you manage? The answers will include obligations that are not in any central register.\n\nThe system can only track obligations that are in the inventory. An incomplete inventory produces a false sense of compliance coverage.",
        callout: { number: "67 vs 34", label: "Obligations identified in compliance audit vs obligations believed to be tracked by the compliance officer — a 97% gap in visibility, with 3 prior missed deadlines" }
      },
      {
        heading: "Alert Architecture — The Advance Warning System",
        content: "The compliance monitoring system's primary value is in the advance warning window it creates. A compliance deadline that is tracked 5 days before is a crisis. A compliance deadline that is tracked 45 days before is a planning item.\n\nAlert timing protocol used across our deployments:\n\nFor annual or biennial regulatory filings: Alert at 90 days, 60 days, 30 days, 14 days, 7 days, 3 days. Each alert goes to the designated obligation owner and a designated backup. The 30-day alert triggers a preparation task creation if preparation time for the filing typically exceeds 5 working days.\n\nFor monthly filings: Alert at 15 days, 7 days, 3 days, 1 day. Monthly filings should have completion confirmation required — system marks obligation as complete only when a confirmation action is recorded.\n\nFor event-triggered obligations (e.g., obligations that activate when a specific business event occurs, such as a threshold crossing): System monitors the trigger condition and generates the obligation record and first alert automatically when the trigger fires. Event-triggered obligations are the most commonly missed category — they do not appear on calendars because they have no fixed date.\n\nEscalation for non-acknowledged alerts: if an alert is not acknowledged within 24 hours, the system escalates to a secondary designee. If not acknowledged within 48 hours, escalates to the compliance officer or CFO, depending on obligation type.",
        callout: { number: "90 days", label: "First alert for annual regulatory filings — creating a planning window rather than a crisis management window for preparation and approval" }
      },
      {
        heading: "What the System Cannot Do — The Human Judgment Layer",
        content: "Compliance monitoring systems are obligation tracking systems, not compliance intelligence systems. This distinction is critical and must be communicated clearly to every compliance stakeholder before deployment.\n\nThe system tracks: that a filing is due on a specific date, that a preparation process should have started, that a confirmation of filing has or has not been received, that a specific obligation has been acknowledged by the designated owner.\n\nThe system does not assess: whether the content of the filing is accurate, whether a change in business activity has created a new regulatory obligation not yet in the inventory, whether an obligation has been superseded by a regulatory change, whether a planned business action will trigger additional obligations.\n\nIn two deployments, compliance officers initially interpreted the system's comprehensive obligation tracking as regulatory coverage — as if having a system meant they were compliant. This is a governance risk. The system reduces the probability of missing an obligation deadline. It does not ensure that obligations are correctly fulfilled or that the obligation inventory is complete.\n\nRecommended communication to compliance stakeholders at deployment: the system is a tracker, not an advisor. The compliance knowledge, the filing content review, the regulatory interpretation — all of this remains human work. The system ensures you know what is due and when. What you file is your responsibility."
      }
    ]
  },
  {
    id: 14,
    category: "CONTRACT INTELLIGENCE",
    categoryColor: "#F59E0B",
    title: "Contract Intelligence Deployment: From Document Repositories to Active Obligation Management",
    provenance: "Framework developed across N=3 contract and document intelligence deployments in professional services, legal, and corporate contexts, plus observations from 2 related document operations deployments",
    readTime: "9 MIN READ",
    date: "AUG 2024",
    dataReliability: "Framework-based with deployment observations",
    dataWindow: "2023–2025",
    deploymentRef: "Legal Services — Matter Intake, Professional Services — Proposal Generation",
    methodologyNote: "Renewal identification lead time measured from system flag timestamp. Missed obligation incidents from client records. Contract volumes are illustrative of mid-market deployment context.",
    openingParagraph: "Most mid-market businesses have a contract management problem that they do not know they have. They believe they manage their contracts because they have executed documents in a shared folder. What they are actually doing is archiving contracts — storing them in a way that provides retrieval, but not visibility. The distinction matters because contracts contain obligations, and obligations have deadlines. A contract repository that requires human initiative to check for upcoming renewals and obligations will miss renewals and obligations — not because of carelessness, but because initiative-dependent processes fail under operational load.",
    pullQuote: "\"The average mid-market business has 80–200 active contracts containing obligations that are not tracked anywhere. Every one of those contracts has a renewal date, and some have termination clauses that activate automatically if not acted upon.\"",
    sections: [
      {
        heading: "The Contract Obligation Audit — What You Will Find",
        content: "Before any technology deployment, a contract obligation audit is required. The audit answer three questions: How many active contracts does the organisation have? What obligations do they contain? Which obligations are being actively tracked?\n\nAudit findings across our three contract intelligence deployments: Actual active contract count was 1.4–2.1× the count believed by management. The additional contracts were typically vendor agreements, software licenses, and infrastructure contracts managed by functional teams without central visibility.\n\nObligation categories found across contract populations: Renewal deadlines (present in 94% of contracts). Notice periods for termination (present in 87% — often 30–90 day advance notice requirements). Performance obligation milestones (present in 43% of client contracts). Audit rights and data access obligations (present in 31% of vendor contracts). Auto-renewal clauses (present in 68% of software and service contracts — these activate automatically and create unexpected commitments).\n\nAuto-renewal clauses represent the highest-value tracking target in most contract portfolios. A software vendor with a ₹8 Lakh annual license that auto-renews with a 45-day cancellation notice period will renew automatically every year unless a human monitors the deadline. In a portfolio of 60 software contracts, the probability that at least one auto-renews unexpectedly in any given year — without a systematic tracking process — is very high.",
        callout: { number: "68%", label: "Percentage of software and service contracts containing auto-renewal clauses in our contract audit data — the most common source of unexpected renewal commitments" }
      },
      {
        heading: "Document Intelligence — What the System Can and Cannot Extract",
        content: "Contract intelligence systems use document processing to extract structured obligation data from unstructured contract text. Understanding the accuracy and limitations of this extraction is essential for setting expectations about system reliability.\n\nWhat current document intelligence handles reliably: dates (renewal dates, effective dates, expiry dates, notice period deadlines) with 90–95% accuracy on well-formatted contracts. Party names and standard counterparty fields with 90%+ accuracy. Defined term values (contract value, notice periods expressed in days, payment terms) with 85–92% accuracy.\n\nWhat requires human review: obligations expressed in conditional language ('if X event occurs, then Y obligation activates'). Cross-referenced obligations ('as per Schedule 2, clause 4.3'). Obligations that depend on regulatory definitions or external standards. Any clause where ambiguity in the contract text creates interpretive uncertainty.\n\nPractical implication for deployment: the system produces an extracted obligation record for human review — not a legally authoritative obligation register. Every extracted record should be reviewed by a human with contract knowledge before being accepted as the tracking record. The system reduces the effort of extraction; it does not eliminate the need for human review.",
        callout: { number: "90–95%", label: "Extraction accuracy for dates in well-formatted contracts — the most reliable extraction category. Complex conditional obligations require human review regardless of system capability." }
      },
      {
        heading: "Building the Active Obligation Register",
        content: "The active obligation register is the operational output of a contract intelligence deployment. It is not a document repository — it is a structured, monitored list of upcoming obligations with designated owners and advance alert timelines.\n\nObligation register design: Each obligation record contains the contract reference, obligation type, key date, notice period if applicable, designated owner, preparation lead time, and status (upcoming, in preparation, completed, escalated).\n\nPriority ranking for initial population: Start with the highest-value contracts and any contracts with auto-renewal clauses. For a portfolio of 150 contracts, full extraction and review of all contracts may take 3–5 weeks. In the interim, prioritise by: (1) contracts with renewal or expiry dates within 6 months, (2) contracts with auto-renewal clauses, (3) contracts above a defined value threshold.\n\nOngoing maintenance: the register is only as good as its completeness. Every new contract executed should generate a system record with obligation extraction. This requires a contract intake process — a defined handoff point where newly signed contracts enter the system within 5 working days of execution. In 2 of 3 deployments, the contract intake process was the weakest operational link — newly signed contracts were not consistently entered because no one owned the intake step."
      }
    ]
  },
  {
    id: 15,
    category: "MANUFACTURING QUALITY",
    categoryColor: "#EF4444",
    title: "Quality Reporting Operations in Manufacturing: From Shift-End Transcription to Real-Time Visibility",
    provenance: "Observations from N=3 manufacturing quality operations deployments in food processing, components manufacturing, and pharmaceutical packaging contexts",
    readTime: "7 MIN READ",
    date: "JUL 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2023–2024",
    deploymentRef: "Food & Beverage Manufacturing — Quality Reporting",
    methodologyNote: "Transcription time measured from shift end to data availability in reporting system. Non-conformance identification lag measured from production event timestamp to quality team notification.",
    openingParagraph: "Quality operations in manufacturing facilities share a structural inefficiency that creates a paradox: the closer you are to the production process, the later you receive quality data about it. A production floor generates quality events in real time — defects, variations, non-conformances — but the data from those events typically reaches quality management through a process that is 8–24 hours delayed by manual transcription, shift handover, and report compilation. A quality issue that occurs at 2pm on a Tuesday afternoon is reviewed in a quality report at the Thursday morning meeting. The batch affected has been processed, packaged, and possibly shipped.",
    pullQuote: "\"Quality reports that arrive after the production batch has shipped are historical documents. The operational value of quality data is inversely proportional to the time it takes to reach decision-makers.\"",
    sections: [
      {
        heading: "The Data Transcription Bottleneck",
        content: "In all three manufacturing quality deployments, the primary manual work burden was the end-of-shift transcription of paper-based quality check records into the digital quality management system. This transcription typically occurred at shift end — creating a built-in 4–8 hour lag between quality event occurrence and data availability.\n\nIn our 2023 food processing deployment: 6 quality check stations, 2 shifts per day, 5 check points per station per shift = 60 data entry actions per day, each requiring an average of 3.2 minutes for paper record retrieval, data entry, and verification. Total transcription time: approximately 3.2 hours per day across the QA team.\n\nAdditional costs of paper-based recording: Transcription errors averaging 1.8 data entry mistakes per 60 entries — causing occasional data quality investigations that consumed 30–45 minutes of QA manager time to resolve. Paper records susceptible to loss or damage in production environments — 3 incomplete records per month on average, requiring reconstruction from operator memory. Historical data not searchable — trend identification across weeks or batches required manual data collation.\n\nSystem intervention: digital check forms deployed at each quality check station (ruggedised tablets in appropriate IP-rated enclosures where required). Data captured at point of check, transmitted immediately to QA system. Transcription time eliminated. Data available in real time.",
        callout: { number: "3.2 hrs/day", label: "QA team time spent on end-of-shift paper record transcription in a 6-station food processing facility — eliminated by point-of-check digital capture" }
      },
      {
        heading: "Non-Conformance Response — The Time-to-Detection Problem",
        content: "The highest operational value of real-time quality data is not in reporting — it is in non-conformance response time. A non-conformance detected at point of occurrence allows containment within the affected production batch. A non-conformance detected 8 hours later may require recall or destruction of multiple batches.\n\nIn a 2024 components manufacturing deployment, pre-deployment non-conformance identification lag (time from production event to QA notification): median 6.2 hours. Of 22 non-conformance events in the 4-week baseline period, 14 were identified after the affected batch had proceeded to the next production stage. Rework or scrap cost on these 14 events: ₹3.4 Lakhs.\n\nPost-deployment: system flagged non-conformance at point of detection. Non-conformance identification lag: median 8 minutes. Of 18 non-conformance events in the 10-week measurement period (annualised rate similar to baseline), 16 were contained within the affected stage before progression. Rework or scrap cost in the measurement period: ₹0.42 Lakhs (annualised: approximately ₹2.2 Lakhs saved vs baseline). The system does not reduce non-conformance occurrence — it reduces the cost of each non-conformance by enabling faster containment.",
        callout: { number: "6.2 hrs → 8 min", label: "Non-conformance identification lag improvement — the primary operational value driver in quality systems is not reporting efficiency but containment speed" }
      },
      {
        heading: "Management Reporting — What Real-Time Data Enables",
        content: "Real-time quality data changes the nature of quality management reporting. Instead of a weekly review of the prior week's events — where decisions have limited operational impact because production has moved on — management receives a current-state quality dashboard with production-relevant decisions still available.\n\nQuality management reporting structure recommended for manufacturing deployments:\n\nShift-level view (available at shift close, 15-minute data freshness): Non-conformances by type and station, check compliance rate, batch quality status. Primary audience: production supervisors and QA team leads.\n\nDaily summary (auto-generated at 7am): Trend vs previous 5 production days, anomaly flags (any metric more than 1.5 standard deviations from rolling average), pending corrective actions. Primary audience: QA manager and production manager.\n\nWeekly management report (auto-generated Monday morning): Weekly KPI summary vs target, top non-conformance root causes, corrective action status, comparison against prior 4 weeks. Primary audience: operations director and quality director.\n\nThe shift from manual weekly report compilation (3–4 hours per report in pre-deployment context) to auto-generated reports is a meaningful capacity recovery for QA managers — but it is not the primary value. The primary value is that weekly reports now reflect current performance rather than historical performance, and trend patterns that previously took 3–4 weeks to appear in management data appear within 3–4 days."
      }
    ]
  },
  {
    id: 16,
    category: "FINANCIAL CONSOLIDATION",
    categoryColor: "#10B981",
    title: "Multi-Entity Financial Consolidation: Designing Systems for Complex Finance Architectures",
    provenance: "Framework developed across N=4 multi-entity financial consolidation deployments in professional services, retail group, manufacturing group, and holding company contexts",
    readTime: "12 MIN READ",
    date: "JUN 2024",
    dataReliability: "Deployment measurement",
    dataWindow: "2022–2025",
    deploymentRef: "Finance — Financial Close & Reporting",
    methodologyNote: "Close cycle measured in working days from period end to consolidated report sign-off. Reconciliation hours from finance team time logs. Tally API constraints noted where applicable.",
    openingParagraph: "Multi-entity financial consolidation is the operational problem that becomes exponentially harder with each additional entity added to the group. A single-entity business manages one set of books. A three-entity group manages three sets of books plus an intercompany elimination process. A five-entity group manages five sets of books, intercompany eliminations across multiple pairs of entities, currency conversions if entities operate in different currencies, and a consolidation process that requires all entity closes to complete before group reporting can begin. The manual coordination burden of this cascade is why finance teams in growing groups consistently report the close cycle as their most significant operational constraint.",
    pullQuote: "\"Every time a business adds an entity to its group structure, it does not add one-entity-worth of close complexity — it adds the complexity of that entity plus all the intercompany relationships it creates with every existing entity.\"",
    sections: [
      {
        heading: "The Multi-Entity Close Cascade — Why It Takes So Long",
        content: "To understand where time is lost in multi-entity consolidation, map the close cascade dependency chain. Each step must complete before the next can start — and manual execution of each step introduces delays.\n\nTypical cascade for a 4-entity group close:\n\nDay 1–3: Each entity completes individual close and provides trial balance to group finance. Dependency: all entities must complete before group consolidation can begin. In manual environments, the slowest entity determines the group start date.\n\nDay 3–5: Group finance performs intercompany transaction identification and matching. Manual process involves cross-referencing each entity's intercompany accounts against the corresponding entry in the counter-entity's books. For a 4-entity group, there are up to 6 intercompany relationship pairs, each requiring individual reconciliation.\n\nDay 5–7: Intercompany elimination entries prepared and posted. For each intercompany balance that does not match exactly, a finance manager must identify the source of the discrepancy and determine whether it is a timing difference, a recording error, or an intercompany policy gap.\n\nDay 7–9: Consolidated trial balance prepared and reviewed. Any issues discovered here require reversion to the entity level for correction and re-submission — restarting the cascade for the affected entity.\n\nIn the 4 multi-entity deployments we have worked with: pre-deployment median close cycle ranged from 10 to 14 working days. The primary delay driver in all four cases was the intercompany matching process — specifically the manual identification of mismatches and investigation of their causes.",
        callout: { number: "6 pairs", label: "Intercompany relationship pairs requiring individual reconciliation in a 4-entity group — each additional entity adds N-1 new pairs, creating exponential complexity" }
      },
      {
        heading: "System Intervention Points — Where Automation Changes the Cascade",
        content: "Agentic system intervention in multi-entity consolidation does not eliminate the cascade — the sequential dependency structure is a financial reporting requirement, not an operational choice. The system reduces the duration of each step by eliminating manual data handling within each step.\n\nStep 1 — Entity data ingestion: System pulls trial balance data from each entity's accounting system on a scheduled basis (typically nightly from day 1 of close period). As each entity completes its close, the system receives the completed trial balance automatically — no manual data extraction or submission by entity finance teams.\n\nStep 2 — Intercompany matching: System cross-references intercompany accounts across all entity pairs automatically, identifying exact matches (auto-cleared) and mismatches (flagged for human investigation with counterparty detail pre-loaded). In our 2023 holding company deployment, auto-match rate for intercompany transactions was 74% — reducing the human investigation workload to the 26% requiring resolution.\n\nStep 3 — Elimination entry preparation: For matched intercompany transactions, the system prepares elimination journal entries for human review and approval. For mismatches under investigation, entries are held until resolution.\n\nStep 4 — Consolidated trial balance: Once all entity closes and intercompany resolutions are complete, system generates consolidated trial balance automatically.\n\nPost-deployment close cycle across 4 deployments: median 5.8 working days (range: 4.5–7 days). The range reflects variation in entity accounting system compatibility — deployments with Tally as a source system consistently showed longer cycles due to batch API constraints.",
        callout: { number: "74%", label: "Intercompany transaction auto-match rate in a 2023 holding company deployment — reducing the human investigation workload to the 26% requiring judgment" }
      },
      {
        heading: "The Tally Constraint — An Honest Assessment",
        content: "Tally is the dominant accounting system in the Indian mid-market. It is present in at least one entity in 3 of our 4 multi-entity consolidation deployments. Its API constraints are a genuine operational consideration that must be addressed honestly in deployment planning.\n\nTally's primary API limitation for consolidation automation: it does not support real-time API reads. Data extraction requires either a scheduled export via TDL (Tally Definition Language) scripts or a manual export triggered by a user. Most Tally API implementations operate on a polling model — the system checks for new data on a schedule, typically 1–4 hours.\n\nThe operational consequence: in a multi-entity close where one entity uses Tally, the system cannot pull the Tally entity's trial balance on demand — it must wait for the next scheduled poll or a manual export trigger. This creates a dependency on the Tally entity completing its close before the next scheduled pull.\n\nMitigation strategies used across our deployments: (1) Schedule Tally exports at entity close completion — entity finance manager triggers a manual export when individual close is complete. System picks up the export in the next poll cycle. Effective but requires a manual step. (2) TDL script-based automated export — custom TDL script runs at a defined time (typically 11pm) and exports the trial balance to a monitored file location. System picks up the export automatically. More reliable than manual trigger but requires TDL customisation.\n\nFor deployments where Tally entities are in the critical path of the close cascade, disclose this constraint explicitly at scoping and design the workflow accordingly.",
        callout: { number: "1–4 hours", label: "Tally API poll interval in most integration implementations — a data freshness constraint that must be designed around in multi-entity consolidation deployments" }
      },
      {
        heading: "Governance in Multi-Entity Consolidation — The Audit Trail Requirement",
        content: "Multi-entity consolidation systems must produce an audit trail that satisfies both internal governance and external audit requirements. This is more specific than the general governance framework — consolidation audit trails must trace from consolidated figures back to entity-level source entries.\n\nRequired audit trail components: (1) Entity-level trial balance provenance — for each line in the consolidated trial balance, the system must be able to identify which entity balances contributed to it and in what amounts. (2) Intercompany elimination log — every elimination entry must reference the source intercompany transactions on both sides of the elimination. (3) Adjustment register — every consolidation adjustment (currency conversion, policy alignment, reclassification) must be documented with the reason, the approver, and the amount. (4) Version control — the system must maintain a record of every version of the consolidated trial balance, with timestamps and the identity of the approver who signed off each version.\n\nIn a 2024 deployment for a retail group with a statutory audit requirement: the statutory auditor's team requested the consolidation working papers for the prior two years within 48 hours of audit commencement. Pre-deployment, this would have required 3–4 days to reconstruct from email threads, shared drive versions, and individual team member records. Post-deployment: audit package was extracted from system logs in 2.5 hours. The time saving was incidental — the more significant outcome was that the audit package was complete, version-controlled, and fully traceable. The auditors did not raise any documentation queries for the current-year consolidation."
      }
    ]
  }
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&family=IBM+Plex+Mono:wght@300;400&display=swap');
  
  .noise-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .framework-root {
    background: #060A0F;
    color: #D0D8E4;
    font-family: 'IBM Plex Sans', sans-serif;
    min-height: 100vh;
    position: relative;
  }

  .fw-container { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  .library-header { padding: 60px 0 48px; border-bottom: 1px solid #0F1923; }
  .lib-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.15em; color: #3B82F6; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .lib-eyebrow::before { content: ''; display: inline-block; width: 20px; height: 1px; background: #3B82F6; }
  .lib-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 52px); color: #F0F4F8; line-height: 1.15; margin-bottom: 16px; font-weight: 600; }
  .lib-sub { font-size: 15px; color: #5A6A7A; max-width: 600px; line-height: 1.7; }
  .lib-meta { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #2A3A4A; margin-top: 20px; letter-spacing: 0.05em; }

  .fw-filter-bar { display: flex; gap: 8px; flex-wrap: wrap; padding: 20px 0; border-bottom: 1px solid #0D1620; }
  .fw-filter-pill { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 12px; border-radius: 2px; cursor: pointer; border: 1px solid #0F1923; background: transparent; color: #3A4A5A; transition: all 0.2s; }
  .fw-filter-pill:hover { border-color: #1E3048; color: #5A7A9A; }
  .fw-filter-pill.active { background: #0D1E30; border-color: #1A3A5A; color: #7AABCC; }

  .fw-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #0A0F15; margin: 0; padding-top: 1px; }
  @media (max-width: 900px) { .fw-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 580px) { .fw-grid { grid-template-columns: 1fr; } }

  .fw-card { background: #070C12; padding: 32px 28px; cursor: pointer; transition: background 0.2s; position: relative; display: flex; flex-direction: column; gap: 14px; }
  .fw-card:hover { background: #0A1018; }
  .card-num { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #1A2A3A; letter-spacing: 0.05em; margin-bottom: 4px; }
  .card-cat { font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; }
  .card-ttl { font-family: 'Playfair Display', serif; font-size: 17px; color: #D0D8E4; line-height: 1.4; font-weight: 600; flex: 1; }
  .fw-card:hover .card-ttl { color: #E8EEF4; }
  .card-prov { font-family: 'IBM Plex Sans', sans-serif; font-style: italic; font-size: 11px; color: #2A3A4A; line-height: 1.5; }
  .card-m { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid #0A1018; }
  .card-rt { font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #2A3A4A; letter-spacing: 0.06em; }
  .card-c { font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #1E4A6A; letter-spacing: 0.06em; transition: color 0.2s; }
  .fw-card:hover .card-c { color: #3B82F6; }

  .fw-detail-wrap { display: grid; grid-template-columns: 1fr 280px; gap: 0; min-height: 100vh; align-items: start; }
  @media (max-width: 900px) { .fw-detail-wrap { grid-template-columns: 1fr; } .fw-sidebar { display: none; } }

  .fw-back-bar { padding: 20px 0; border-bottom: 1px solid #0A1018; margin-bottom: 0; }
  .fw-back-btn { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #2A4A6A; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color 0.2s; padding: 0; }
  .fw-back-btn:hover { color: #3B82F6; }
  .fw-back-btn::before { content: '←'; font-size: 14px; }

  .fw-article { padding: 52px 60px 80px 0; border-right: 1px solid #0A1018; }
  @media (max-width: 900px) { .fw-article { padding: 40px 0 60px; border-right: none; } }

  .fw-art-eb { font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border: 1px solid; display: inline-block; margin-bottom: 28px; }
  .fw-art-h1 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px); color: #EEF2F6; line-height: 1.2; font-weight: 700; margin-bottom: 20px; }
  .fw-art-prov { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #3B82F6; letter-spacing: 0.03em; line-height: 1.5; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 8px; }
  .fw-art-prov::before { content: '◎'; flex-shrink: 0; margin-top: 1px; }
  .fw-art-m { display: flex; gap: 28px; margin-bottom: 40px; padding-bottom: 32px; border-bottom: 1px solid #0A1018; }
  .fw-art-m-i { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #2A3A4A; letter-spacing: 0.06em; display: flex; align-items: center; gap: 6px; }
  .fw-art-m-i::before { content: '○'; font-size: 7px; }

  .fw-opening { font-size: 16px; color: #8A9AA8; line-height: 1.75; margin-bottom: 36px; font-weight: 300; }
  .fw-pullquote { border-left: 2px solid #1A3A5A; padding: 20px 0 20px 24px; margin: 36px 0; }
  .fw-pullquote p { font-family: 'Playfair Display', serif; font-style: italic; font-size: 17px; color: #6A8AA0; line-height: 1.6; }
  .fw-sec-h { font-family: 'Playfair Display', serif; font-size: 20px; color: #C0CCD8; margin: 44px 0 16px; font-weight: 600; padding-top: 44px; border-top: 1px solid #080E14; }
  .fw-sec-h:first-of-type { margin-top: 0; padding-top: 0; border-top: none; }
  .fw-sec-b { font-size: 14.5px; color: #6A7A88; line-height: 1.8; white-space: pre-line; }
  .fw-callout { background: #060B10; border: 1px solid #0F1D2A; border-left: 3px solid #1A3A5A; padding: 20px 24px; margin: 28px 0; border-radius: 0 4px 4px 0; display: flex; gap: 20px; align-items: flex-start; }
  .fw-callout-n { font-family: 'Playfair Display', serif; font-size: 32px; color: #2A5A7A; line-height: 1; flex-shrink: 0; font-weight: 700; min-width: 80px; }
  .fw-callout-l { font-size: 12px; color: #3A4A5A; line-height: 1.6; padding-top: 4px; font-style: italic; }
  .fw-caveat { font-size: 12px; color: #2A3A4A; line-height: 1.6; font-style: italic; margin-top: 32px; padding: 16px 20px; border: 1px solid #080E14; }

  .fw-sidebar { padding: 52px 0 80px 40px; position: sticky; top: 0; }
  .fw-sidebar-p { background: #060B10; border: 1px solid #0A1018; padding: 24px; margin-bottom: 16px; }
  .fw-sidebar-l { font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: #2A3A4A; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #080E14; }
  .fw-sidebar-r { display: flex; flex-direction: column; gap: 3px; margin-bottom: 14px; }
  .fw-sidebar-r:last-child { margin-bottom: 0; }
  .fw-sidebar-k { font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #1A2A3A; }
  .fw-sidebar-v { font-size: 12px; color: #5A7A8A; line-height: 1.4; }
  .fw-sidebar-v.accent { color: #3B82F6; cursor: pointer; }
  .fw-cta-p { background: #0D1E30; border: 1px solid #1A3A5A; padding: 24px; }
  .fw-cta-ttl { font-family: 'Playfair Display', serif; font-size: 16px; color: #C0CCD8; margin-bottom: 10px; line-height: 1.4; }
  .fw-cta-b { font-size: 12px; color: #4A6A7A; line-height: 1.6; margin-bottom: 16px; }
  .fw-cta-btn { display: block; width: 100%; background: #0A2A4A; border: 1px solid #1A4A6A; color: #7AABCC; padding: 10px; text-align: center; font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s; }
  .fw-cta-btn:hover { background: #102A40; color: #9ABBCC; }
`;

export default function FrameworkLibraryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060A0F]" />}>
      <FrameworkLibraryContent />
    </Suspense>
  );
}

function FrameworkLibraryContent() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setSelected(parseInt(id));
    }
  }, [searchParams]);

  const filters = ["All", "Practitioner Guides", "Deployment Observations", "Measurement", "Governance", "Industry"];
  const industryCategories = ["SALES OPERATIONS", "FINANCE OPERATIONS", "HEALTHCARE OPERATIONS", "REAL ESTATE OPERATIONS", "PROCUREMENT OPERATIONS", "CUSTOMER OPERATIONS", "TALENT ACQUISITION", "LOGISTICS OPERATIONS", "COMPLIANCE OPERATIONS", "CONTRACT INTELLIGENCE", "MANUFACTURING QUALITY", "FINANCIAL CONSOLIDATION"];

  const filtered = filter === "All" ? frameworks
    : filter === "Industry" ? frameworks.filter(f => industryCategories.includes(f.category))
    : filter === "Practitioner Guides" ? frameworks.filter(f => ["PRACTITIONER FRAMEWORK", "VENDOR EVALUATION"].includes(f.category))
    : filter === "Deployment Observations" ? frameworks.filter(f => industryCategories.includes(f.category))
    : filter === "Measurement" ? frameworks.filter(f => f.category === "MEASUREMENT METHODOLOGY")
    : filter === "Governance" ? frameworks.filter(f => f.category === "GOVERNANCE FRAMEWORK")
    : frameworks;

  const fw = frameworks.find(f => f.id === selected);

  const navLinks = [
    { name: "Field Intelligence", href: "/intelligence" },
    { name: "Frameworks", href: "/intelligence/frameworks" },
    { name: "Deployment Library", href: "/deployments" }
  ];

  return (
    <div className="framework-root">
      <style>{styles}</style>
      <div className="noise-overlay" />
      
      <Navbar 
        isScrolled={true}
        navLinks={navLinks}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="intelligence"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-24">
        {selected && fw ? (
          <div>
            <div style={{ background: "#060A0F", borderBottom: "1px solid #0A1018" }}>
              <div className="fw-container">
                <div className="fw-back-bar">
                  <button className="fw-back-btn" onClick={() => setSelected(null)}>
                    Practitioner Frameworks
                  </button>
                </div>
              </div>
            </div>
            <div className="fw-container">
              <div className="fw-detail-wrap">
                <div className="fw-article">
                  <div
                    className="fw-art-eb"
                    style={{ color: fw.categoryColor, borderColor: fw.categoryColor + "33" }}
                  >
                    {fw.category}
                  </div>
                  <h1 className="fw-art-h1">{fw.title}</h1>
                  <div className="fw-art-prov">{fw.provenance}</div>
                  <div className="fw-art-m">
                    <div className="fw-art-m-i">{fw.readTime}</div>
                    <div className="fw-art-m-i">{fw.date}</div>
                    <div className="fw-art-m-i">GREYHACKS</div>
                  </div>

                  <p className="fw-opening">{fw.openingParagraph}</p>

                  <div className="fw-pullquote">
                    <p>{fw.pullQuote}</p>
                  </div>

                  {fw.sections.map((sec, i) => (
                    <div key={i}>
                      <h2 className="fw-sec-h">{sec.heading}</h2>
                      <p className="fw-sec-b">{sec.content}</p>
                      {sec.callout && (
                        <div className="fw-callout">
                          <div className="fw-callout-n">{sec.callout.number}</div>
                          <div className="fw-callout-l">{sec.callout.label}</div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="fw-caveat" style={{ marginTop: 48 }}>
                    Methodology note: {fw.methodologyNote}
                  </div>
                </div>

                <div className="fw-sidebar">
                  <div className="fw-sidebar-p">
                    <div className="fw-sidebar-l">Publication Metadata</div>
                    <div className="fw-sidebar-r">
                      <span className="fw-sidebar-k">Data Window</span>
                      <span className="fw-sidebar-v">{fw.dataWindow}</span>
                    </div>
                    <div className="fw-sidebar-r">
                      <span className="fw-sidebar-k">Deployment Reference</span>
                      <Link href="/deployments" className="fw-sidebar-v accent">{fw.deploymentRef}</Link>
                    </div>
                    <div className="fw-sidebar-r">
                      <span className="fw-sidebar-k">Data Reliability</span>
                      <span className="fw-sidebar-v" style={{ color: "#3B82F6", display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 10 }}>◎</span> {fw.dataReliability}
                      </span>
                    </div>
                    <div className="fw-sidebar-r" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #080E14" }}>
                      <span className="fw-sidebar-k" style={{ marginBottom: 8 }}>Methodology Note</span>
                      <span className="methodology-note" style={{ fontSize: '11px', fontStyle: 'italic', color: '#2A3A4A' }}>{fw.methodologyNote}</span>
                    </div>
                  </div>

                  <div className="fw-cta-p">
                    <div className="fw-cta-ttl">Discuss these findings with an operator</div>
                    <div className="fw-cta-b">
                      We can run an operational diagnostic on your processes to validate these observations against your baseline.
                    </div>
                    <button onClick={() => setIsIntakeOpen(true)} className="fw-cta-btn">Schedule Diagnostic</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fw-container">
            <div className="library-header">
              <div className="lib-eyebrow">GreyShacks Intelligence — Practitioner Frameworks</div>
              <h1 className="lib-title">Field Frameworks</h1>
              <p className="lib-sub">
                Structured deployment guides, measurement methodologies, and governance frameworks derived from operational deployments across 16 industry contexts.
              </p>
              <div className="lib-meta">
                16 FRAMEWORKS  ·  GROUNDED IN 35+ DEPLOYMENTS  ·  UPDATED QUARTERLY
              </div>
            </div>

            <div className="fw-filter-bar">
              {filters.map(f => (
                <button
                  key={f}
                  className={`fw-filter-pill ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="fw-grid">
              {filtered.map((fw, i) => (
                <div
                  key={fw.id}
                  className="fw-card"
                  onClick={() => { setSelected(fw.id); window.scrollTo(0, 0); }}
                >
                  <div className="card-num">0{String(i + 1).padStart(1, "0")}</div>
                  <div
                    className="card-cat"
                    style={{ color: fw.categoryColor + "99" }}
                  >
                    {fw.category}
                  </div>
                  <div className="card-ttl">{fw.title}</div>
                  <div className="card-prov">{fw.provenance}</div>
                  <div className="card-m">
                    <span className="card-rt">{fw.readTime}</span>
                    <span className="card-c">Read →</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: "60px 0", borderTop: "1px solid #0A1018", marginTop: 1,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#8A9AA8", textAlign: "center" }}>
                If you are evaluating whether agentic systems are appropriate for your operations
              </div>
              <div style={{ fontSize: 13, color: "#2A3A4A", textAlign: "center", maxWidth: 520, lineHeight: 1.7 }}>
                We begin with a structured operational diagnostic to identify whether a system is the right intervention. If the diagnostic supports a pilot, we scope one. If it doesn't, we say so.
              </div>
              <button 
                onClick={() => setIsIntakeOpen(true)}
                style={{
                  marginTop: 8, background: "#0A2A4A", border: "1px solid #1A4A6A",
                  color: "#7AABCC", padding: "12px 32px",
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                  letterSpacing: "0.1em", cursor: "pointer"
                }}
              >
                SCOPE A PILOT
              </button>
            </div>
          </div>
        )}
      </main>

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="intelligence"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <IntakeFormModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </div>
  );
}
