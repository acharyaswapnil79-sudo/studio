
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
    <div className="bg-[#0A0A0A] min-h-screen selection:bg-[#E8FF47]/30">
      <Navbar onOpenIntake={() => setIsIntakeOpen(true)} activeSection="about" />
      
      <main className="pt-[160px] pb-24">
        <div className="container px-6 mx-auto">
          {/* Institutional Hero */}
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-medium tracking-[0.12em] text-[#E8FF47] uppercase mb-6 block"
            >
              ABOUT GREYSHACKS
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[40px] md:text-[48px] font-bold text-[#F5F5F5] tracking-[-0.025em] leading-[1.1] max-w-[720px]"
            >
              We started because operations teams deserved better than consultants and spreadsheets.
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 space-y-8 max-w-[640px]"
            >
              <p className="text-[17px] text-[#888888] leading-[1.7]">
                GreyShacks was founded in 2023 with a single belief: that mid-market operations teams are systematically underserved. They're too large for manual processes, and too lean to absorb a 12-month enterprise implementation. We built the gap layer.
              </p>
              
              <p className="text-[17px] text-[#888888] leading-[1.7]">
                Every system we deploy is production-grade — running in live environments, measured against real baselines, and governed by audit-ready frameworks. We don't ship prototypes. We don't sell outcomes we can't measure.
              </p>
              
              <p className="text-[17px] text-[#888888] leading-[1.7]">
                Three years in, we've automated over 190 workflows, tracked $8M+ in savings, and deployed across finance, logistics, real estate, and professional services. The work speaks. The numbers are public.
              </p>
            </motion.div>
          </div>

          {/* Stats Grid Refined */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {[
              { val: "30+", l: "Operational Deployments", s: "Across 14 operational environments since 2023" },
              { val: "$8M+", l: "Annualized Savings", s: "Verified median ROI across client base" },
              { val: "14 Wks", l: "Time to Maturity", s: "From diagnostic to full production stability" }
            ].map((s, i) => (
              <div key={i} className="bg-[#0A0A0A] p-12">
                <div className="text-4xl font-bold text-[#E8FF47] mb-4">{s.val}</div>
                <div className="text-[#F5F5F5] font-bold text-xs uppercase tracking-widest mb-2">{s.l}</div>
                <div className="text-[#888] text-sm leading-relaxed">{s.s}</div>
              </div>
            ))}
          </div>

          {/* Engagement CTA */}
          <div className="mt-40 border-t border-[#222] pt-24 text-center">
            <h2 className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] mb-12 tracking-tight">Let's audit your latency.</h2>
            <button
              onClick={() => setIsIntakeOpen(true)}
              className="px-12 py-5 bg-[#E8FF47] text-[#0A0A0A] font-bold uppercase tracking-widest text-[13px] rounded-[2px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
