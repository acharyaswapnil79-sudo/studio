"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} activeSection="about" />
      
      <main className="pt-40 pb-24">
        <div className="container px-6 mx-auto">
          {/* Hero */}
          <div className="max-w-4xl mb-32">
            <h1 className="font-display text-5xl md:text-8xl text-[#F5F5F5] leading-[0.9] mb-8">
              Three Years of Operational Record.
            </h1>
            <p className="text-[#888] text-xl md:text-2xl leading-relaxed">
              GreyShacks is an agentic systems firm. We don't build demos. We build the production infrastructure that allows mid-market businesses to scale without linear headcount growth.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222] mb-40">
            {[
              { val: "30+", l: "Operational Deployments", s: "Across 14 operational environments since 2023" },
              { val: "$8M+", l: "Annualized Savings", s: "Verified median ROI across client base" },
              { val: "14 Wks", l: "Time to Maturity", s: "From diagnostic to full production stability" }
            ].map((s, i) => (
              <div key={i} className="bg-[#0A0A0A] p-12">
                <div className="text-4xl font-display text-[#4DFFB4] mb-4">{s.val}</div>
                <div className="text-[#F5F5F5] font-bold text-sm uppercase tracking-widest mb-2">{s.l}</div>
                <div className="text-[#888] text-sm leading-relaxed">{s.s}</div>
              </div>
            ))}
          </div>

          {/* Core Thesis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40">
            <div className="lg:col-span-4">
              <div className="sticky top-40">
                <div className="text-[11px] font-bold text-[#4DFFB4] uppercase tracking-[0.2em] mb-8">The Thesis</div>
                <h2 className="text-3xl text-[#F5F5F5] font-display leading-tight">Operating systems for the autonomous era.</h2>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <div className="p-12 border border-[#222] bg-[#111]">
                <p className="text-[#F5F5F5] text-xl leading-relaxed mb-8">
                  Most organizations end up with "AI-adjacent" tools that require more oversight than the manual processes they replaced.
                </p>
                <p className="text-[#888] text-lg leading-relaxed">
                  GreyShacks was built to close the gap between prototype and production. We design systems that run continuously, measure their own drift, and handle end-to-end cycles—from lead capture to financial close—with minimal intervention.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-[#F5F5F5] font-bold mb-4">Measurement-First</h4>
                  <p className="text-[#888] text-sm leading-relaxed">Every engagement starts with 4 weeks of baseline capture. If we can't measure the problem, we won't build the system.</p>
                </div>
                <div>
                  <h4 className="text-[#F5F5F5] font-bold mb-4">Governance Built-In</h4>
                  <p className="text-[#888] text-sm leading-relaxed">Full audit trails, decision logs, and anomaly detection are core components, not optional extras.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Closing */}
          <div className="border-t border-[#222] pt-24 text-center">
            <h2 className="text-3xl md:text-5xl text-[#F5F5F5] mb-12 font-display">Let's audit your latency.</h2>
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="px-12 py-5 bg-[#4DFFB4] text-[#0A0A0A] font-bold uppercase tracking-widest text-sm rounded-[2px] transition-transform hover:scale-[1.02]"
            >
              Start Diagnostic Assessment
            </button>
          </div>
        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}