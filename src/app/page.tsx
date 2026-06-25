
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCTA } from '@/components/ProductCTA';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Sparkles, 
  Database,
  Network,
  Plug,
  ArrowRight,
  Zap,
  ShieldCheck,
  Search,
  History,
  Link as LinkIcon
} from 'lucide-react';
import { useUser } from '@/firebase';

export default function GreyShacksHome() {
  const { user } = useUser();

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] selection:bg-[#0445a4]/30 overflow-x-hidden">
      <Navbar onOpenIntake={() => {}} />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-40 md:pt-64 pb-20 px-6">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0445a4]/10 blur-[120px] rounded-full opacity-50" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#021d3a]/20 blur-[100px] rounded-full opacity-30" />
          </div>

          <div className="container relative z-10 max-w-6xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-[#0445a4] mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0445a4] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Built for operations teams</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[48px] md:text-[96px] font-bold text-white tracking-tighter leading-[0.9] mb-10"
              >
                Your Operational <br />
                <span className="text-white/40 italic">Memory Layer.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[18px] md:text-[22px] text-[#888888] leading-relaxed max-w-2xl mx-auto mb-12"
              >
                GreyShacks remembers everything across systems — and turns it into action. One intelligent system for your entire operations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {!user ? (
                  <Link href="/signup">
                    <Button className="bg-[#0445a4] text-white hover:bg-[#0445a4]/90 rounded-full px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all shadow-2xl shadow-[#0445a4]/20 group">
                      Start Free
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/signup">
                    <Button className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-8 text-sm font-bold uppercase tracking-widest transition-all shadow-2xl group">
                      Enter Console
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMMAND CENTER SECTION */}
        <section className="py-24 md:py-48 bg-[#0A0A0A] border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-[#0445a4]"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Unified Command</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[36px] md:text-[64px] font-bold text-white tracking-tight leading-[1] mb-6"
                >
                  Query your company. <br />
                  Act in real-time.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[17px] md:text-[21px] text-[#888888] leading-relaxed max-w-[580px]"
                >
                  No more chasing data across tabs. GreyShacks provides a single, high-fidelity interface to manage every workflow in your stack.
                </motion.p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative w-full aspect-square rounded-[40px] overflow-hidden shadow-2xl border border-white/5 bg-[#111]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0445a4]/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div className="w-full bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
                      <div className="space-y-2">
                        <div className="h-2 w-1/3 bg-white/10 rounded" />
                        <div className="h-2 w-full bg-white/5 rounded" />
                      </div>
                      <div className="relative">
                        <div className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center">
                          <span className="text-white/20 text-xs font-mono">"Find all overdue invoices from Q4..."</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-20 bg-white/5 rounded-xl border border-white/5" />
                        <div className="h-20 bg-white/5 rounded-xl border border-white/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="product" className="py-24 md:py-40 border-t border-white/5 bg-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0445a4] uppercase mb-6 block">FEATURES</span>
              <h2 className="text-[36px] md:text-[72px] font-bold text-white tracking-tight leading-[1] mb-8">
                The Operating System <br /> for Modern Teams.
              </h2>
              <p className="text-[18px] md:text-[22px] text-[#888888] leading-relaxed max-w-[600px]">
                Four integrated capabilities designed to eliminate operational fragmentation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1: Persistent Memory */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8 bg-[#111] border border-white/5 p-10 rounded-[32px] hover:border-[#0445a4]/30 transition-all group flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center group-hover:bg-[#0445a4] transition-colors shrink-0">
                  <History className="w-6 h-6 text-[#0445a4] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-4">Persistent Memory</h3>
                  <p className="text-[15px] text-[#888] leading-relaxed">
                    Automatically captures and organizes context from emails, documents, sheets, and chats so your team never loses information.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <Link href="/about" className="text-[#0445a4] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>

              {/* Feature 2: Ontology & Knowledge Graph */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-8 bg-[#111] border border-white/5 p-10 rounded-[32px] hover:border-[#0445a4]/30 transition-all group flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center group-hover:bg-[#0445a4] transition-colors shrink-0">
                  <Network className="w-6 h-6 text-[#0445a4] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-4">Ontology & Knowledge Graph</h3>
                  <p className="text-[15px] text-[#888] leading-relaxed">
                    Builds a living map of your customers, processes, and decisions that gets smarter over time.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <Link href="/about" className="text-[#0445a4] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>

              {/* Feature 3: Universal Connectors */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8 bg-[#111] border border-white/5 p-10 rounded-[32px] hover:border-[#0445a4]/30 transition-all group flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center group-hover:bg-[#0445a4] transition-colors shrink-0">
                  <LinkIcon className="w-6 h-6 text-[#0445a4] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-4">Universal Connectors</h3>
                  <p className="text-[15px] text-[#888] leading-relaxed">
                    Securely connects to Gmail, Google Workspace, WhatsApp Business, CRMs, ERPs, Finance tools — read and act across all your tools.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <Link href="/about" className="text-[#0445a4] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>

              {/* Feature 4: Query */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-8 bg-[#111] border border-white/5 p-10 rounded-[32px] hover:border-[#0445a4]/30 transition-all group flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center group-hover:bg-[#0445a4] transition-colors shrink-0">
                  <Search className="w-6 h-6 text-[#0445a4] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-4">Query</h3>
                  <p className="text-[15px] text-[#888] leading-relaxed">
                    Ask questions in natural language and trigger real actions across your operations.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <Link href="/about" className="text-[#0445a4] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-24 md:py-48 border-t border-white/5 bg-[#0A0A0A]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0445a4] uppercase mb-6 block">WORKFLOW</span>
              <h2 className="text-[36px] md:text-[64px] font-bold text-white tracking-tight leading-[1]">Connect your stack. <br className="hidden md:block" /> See your company.</h2>
            </motion.div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24 mb-32">
              <div className="hidden md:block absolute top-12 left-0 right-0 h-px border-t border-dashed border-white/10 z-0" />
              
              {[
                { 
                  n: "01", 
                  t: "Connect (MCP)", 
                  d: "Integrate your existing tools via MCP in minutes. Data starts flowing into your private memory layer immediately.", 
                  icon: Plug
                },
                { 
                  n: "02", 
                  t: "Map (Ontology)", 
                  d: "GreyShacks automatically maps the entities and relationships across your disparate data sources.", 
                  icon: Network
                },
                { 
                  n: "03", 
                  t: "Execute (Action)", 
                  d: "Use the command center to query, automate, and resolve operational bottlenecks in real-time.", 
                  icon: Zap
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10"
                >
                  <div className="text-[64px] font-bold text-[#0445a4]/20 leading-none mb-8 tracking-tighter">
                    {step.n}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.t}</h3>
                  <p className="text-[15px] md:text-[17px] text-[#888888] leading-relaxed">{step.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ProductCTA />
      </main>

      <Footer onOpenIntake={() => {}} />
    </div>
  );
}
