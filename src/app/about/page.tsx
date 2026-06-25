"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen selection:bg-[#0445a4]/30">
      <Navbar onOpenIntake={() => {}} activeSection="about" />
      
      <main className="pt-[160px] pb-0">
        <div className="container px-6 mx-auto">
          {/* Institutional Hero */}
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-medium tracking-[0.12em] text-[#0445a4] uppercase mb-6 block"
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
                GreyShacks was founded with a single belief: that operations teams are systematically underserved. They're too large for manual processes, and too lean to absorb complex enterprise implementations. We built the software layer to fill that gap.
              </p>
              
              <p className="text-[17px] text-[#888888] leading-[1.7]">
                Every system we deploy is production-grade — running in live environments, measured against real baselines, and governed by audit-ready frameworks. We don't ship prototypes. We ship institutional memory.
              </p>
              
              <p className="text-[17px] text-[#888888] leading-[1.7]">
                Today, GreyShacks provides the intelligent backbone for teams across finance, logistics, real estate, and professional services. The work speaks. The outcomes are measurable.
              </p>
            </motion.div>
          </div>

          {/* Stats Grid Refined */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
            {[
              { val: "190+", l: "Automated Workflows", s: "Across 14 operational environments since 2023" },
              { val: "60 Sec", l: "Time to Connect", s: "From first login to full system synchronization" }
            ].map((s, i) => (
              <div key={i} className="bg-[#0A0A0A] p-12">
                <div className="text-4xl font-bold text-[#0445a4] mb-4">{s.val}</div>
                <div className="text-[#F5F5F5] font-bold text-xs uppercase tracking-widest mb-2">{s.l}</div>
                <div className="text-[#888] text-sm leading-relaxed">{s.s}</div>
              </div>
            ))}
          </div>

          {/* Operating Principles Section */}
          <section className="mt-40">
            <div className="max-w-4xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-medium tracking-[0.12em] text-[#0445a4] uppercase mb-6 block"
              >
                OUR CORE PRINCIPLES
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[32px] md:text-[40px] font-bold text-[#F5F5F5] tracking-tight leading-[1.2] mb-16"
              >
                Built on transparency and performance.
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                {[
                  { n: "01", t: "Measurement as Standard", d: "We define success metrics within the software. If it can't be baselined, it isn't production-grade." },
                  { n: "02", t: "User-First Autonomy", d: "The system assists, learns, and executes — but you retain ultimate control and visibility over every decision." },
                  { n: "03", t: "Governance by Default", d: "Every action has a full audit trail, exception handling, and a rollback plan. Compliance is built in." },
                  { n: "04", t: "Honesty in Performance", d: "If a process isn't ready for automation, the system flags the data gaps. We don't deploy to fail." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="text-[32px] font-bold text-[#0445a4] opacity-30 leading-none shrink-0">
                      {item.n}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-[18px] font-semibold text-[#F5F5F5] leading-tight">
                        {item.t}
                      </h3>
                      <p className="text-[15px] text-[#888888] leading-relaxed">
                        {item.d}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <DiagnosticCTA />
      </main>

      <Footer onOpenIntake={() => {}} />
    </div>
  );
}
