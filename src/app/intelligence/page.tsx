"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { Footer } from '@/components/Footer';
import { FrameworkCard } from '@/components/intelligence/FrameworkCard';

const FRAMEWORKS = [
  {
    title: "Data Organization Readiness Assessment",
    description: "Evaluates whether your operational data is structured enough to support reliable agents.",
    bullets: [
      "Assess data consistency across systems",
      "Identify ownership and lineage gaps",
      "Highlight workflows blocked by fragmented data"
    ]
  },
  {
    title: "Operational Baseline Framework",
    description: "A structured approach to capture the current state of operations before any agent deployment.",
    bullets: [
      "Define clear metrics over a fixed period",
      "Capture volume, errors, and cost",
      "Create a defendable reference point for measurement"
    ]
  },
  {
    title: "Deep Agent Scope Definition Framework",
    description: "Clarifies what separates shallow automation from actual deep agents in operational environments.",
    bullets: [
      "Define decision-making boundaries",
      "Identify required system integrations",
      "Establish exception handling scope"
    ]
  },
  {
    title: "Exception Handling & Governance Model",
    description: "Designs how agents and humans should collaborate with proper control and visibility.",
    bullets: [
      "Classify exception types",
      "Set clear escalation thresholds",
      "Maintain full audit trails of actions"
    ]
  },
  {
    title: "Success Criteria & Measurement Framework",
    description: "Helps define what success looks like before building or deploying any agent.",
    bullets: [
      "Set primary and secondary metrics",
      "Define acceptable exception rates",
      "Create objective evaluation criteria"
    ]
  },
  {
    title: "Pilot-to-Production Decision Framework",
    description: "Provides clear criteria to decide whether to scale from pilot to full production.",
    bullets: [
      "Compare outcomes against baseline",
      "Assess internal ownership readiness",
      "Evaluate measurable ROI from pilot data"
    ]
  }
];

export default function PractitionerFrameworksPage() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#0445a4]/30 font-sans">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} activeSection="intelligence" />

      <main className="pt-32 pb-0">
        {/* Header Section */}
        <section className="max-w-[1240px] mx-auto px-6 pt-16 pb-12">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#0445a4] text-[11px] font-bold tracking-[0.2em] uppercase mb-4"
            >
              PRACTITIONER FRAMEWORKS
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]"
            >
              Practical frameworks.<br />Built from real deployments.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-xl text-[#888888] max-w-2xl leading-relaxed font-medium"
            >
              These are not theoretical models. They are structured approaches we use 
              during operational diagnostics and pilots — refined through repeated use 
              across different industries and workflows.
            </motion.p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="max-w-[1240px] mx-auto px-6 pb-24 border-b border-white/5">
          <div className="max-w-3xl text-[#AAAAAA] text-lg leading-relaxed space-y-6">
            <p>
              Most organizations struggle not because they lack tools, but because they 
              lack structure around how they define problems, measure baselines, and 
              decide what’s worth automating. These frameworks address that gap.
            </p>
            <p>
              Each one is designed to be used before significant build work begins. 
              They help teams move from vague ambitions to clear, defensible decisions.
            </p>
          </div>
        </section>

        {/* Framework Grid Section */}
        <section className="max-w-[1240px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {FRAMEWORKS.map((framework, index) => (
              <FrameworkCard 
                key={index}
                title={framework.title}
                description={framework.description}
                bullets={framework.bullets}
              />
            ))}
          </div>
        </section>

        <DiagnosticCTA onOpenIntake={() => setIsIntakeOpen(true)} />
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}
