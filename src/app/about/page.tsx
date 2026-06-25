
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCTA } from '@/components/ProductCTA';
import { cn } from '@/lib/utils';
import { History, Network, ShieldCheck, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen selection:bg-[#0445a4]/30">
      <Navbar onOpenIntake={() => {}} activeSection="about" />
      
      <main className="pt-[160px] pb-0">
        <div className="container px-6 mx-auto">
          {/* Founder-Led Hero */}
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold tracking-[0.3em] text-[#0445a4] uppercase mb-6 block"
            >
              OUR MISSION
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[40px] md:text-[64px] font-bold text-[#F5F5F5] tracking-tighter leading-[1] max-w-[800px]"
            >
              We believe the future of operations is not more tools, but one intelligent layer.
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 space-y-8 max-w-[640px]"
            >
              <p className="text-[18px] md:text-[20px] text-[#AAAAAA] leading-relaxed">
                GreyShacks was started because we saw a systemic gap in how modern operations teams work. 
                They are stuck in a trap: too large to rely on manual spreadsheets, but too lean to 
                absorb the slow, expensive complexity of enterprise software.
              </p>
              
              <p className="text-[18px] text-[#888888] leading-relaxed">
                The core problem isn't a lack of tools—it's the loss of operational context. Information 
                is fragmented across emails, docs, sheets, and chats. When people move or tools change, 
                institutional memory disappears. We built the software layer to fill that gap.
              </p>
            </motion.div>
          </div>

          {/* The Problem Section */}
          <section className="mt-40 border-t border-white/5 pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">The Information Debt.</h2>
                <p className="text-[#888] text-lg leading-relaxed">
                  Every manual process in your company creates hidden "Information Debt." It’s the context 
                  trapped in a single person's head or buried in a thread from three months ago. This debt 
                  slows down decisions, creates errors, and makes scaling impossible.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">The Intelligent Layer.</h2>
                <p className="text-[#888] text-lg leading-relaxed">
                  We are building an operational memory and intelligence layer that compounds over time. 
                  By connecting your existing tools and organizing your context into a dynamic ontology, 
                  GreyShacks creates a shared brain for your team—one that remembers everything and acts intelligently.
                </p>
              </div>
            </div>
          </section>

          {/* Core Product Principles */}
          <section className="mt-40">
            <div className="max-w-4xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-bold tracking-[0.3em] text-[#0445a4] uppercase mb-6 block"
              >
                OUR PRINCIPLES
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[32px] md:text-[48px] font-bold text-[#F5F5F5] tracking-tighter leading-[1.1] mb-16"
              >
                Built for performance, <br />
                <span className="text-white/40 italic">guided by transparency.</span>
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                {[
                  { 
                    icon: Zap, 
                    t: "Measurement as Standard", 
                    d: "Intelligence must be measurable. Every interaction within GreyShacks is benchmarked against real operational baselines." 
                  },
                  { 
                    icon: ShieldCheck, 
                    t: "User-First Autonomy", 
                    d: "The system assists and executes, but you retain ultimate control. We believe in high-fidelity governance by default." 
                  },
                  { 
                    icon: Network, 
                    t: "Compounding Intelligence", 
                    d: "As your team uses the platform, the memory layer deepens. Patterns, relationships, and decisions build a dynamic ontology that gets smarter daily." 
                  },
                  { 
                    icon: History, 
                    t: "Honesty in Logic", 
                    d: "We are transparent about how decisions are made. Every action has a full audit trail and an isolatable context architecture." 
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#0445a4]/5 border border-[#0445a4]/10 flex items-center justify-center group-hover:bg-[#0445a4]/10 transition-colors">
                      <item.icon className="w-5 h-5 text-[#0445a4]" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-[18px] font-bold text-[#F5F5F5] leading-tight">
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

          {/* Moving Forward */}
          <section className="mt-40 border-t border-white/5 py-32">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8">Moving Forward.</h2>
              <div className="space-y-8 text-[#AAAAAA] text-lg leading-relaxed">
                <p>
                  Operations shouldn't be about tab-switching and data-chasing. It should be about 
                  clarity and execution. 
                </p>
                <p>
                  We are focused on expanding our universal connectors and refining our ontology 
                  engine. As more teams join the GreyShacks platform, the underlying patterns of 
                  operational intelligence grow stronger, creating a more capable system for everyone.
                </p>
                <p className="text-white font-semibold">
                  We are building the intelligent backbone for the next generation of operations.
                </p>
              </div>
            </div>
          </section>
        </div>

        <ProductCTA />
      </main>

      <Footer onOpenIntake={() => {}} />
    </div>
  );
}
