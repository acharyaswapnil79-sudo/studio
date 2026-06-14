"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { Footer } from '@/components/Footer';
import { INSIGHTS, Insight } from '@/lib/intelligence-data';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PractitionerFrameworksPage() {
  const router = useRouter();
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

        {/* Content Grid */}
        <section className="max-w-[1240px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            <AnimatePresence mode="popLayout">
              {INSIGHTS.map((item) => (
                <InsightCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => router.push(`/intelligence/framework/${item.id}`)}
                />
              ))}
            </AnimatePresence>
          </div>

          {INSIGHTS.length === 0 && (
            <div className="py-32 text-center text-white/20 font-bold text-xs uppercase tracking-widest">
              No publications found.
            </div>
          )}
        </section>

        <DiagnosticCTA onOpenIntake={() => setIsIntakeOpen(true)} />
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </div>
  );
}

function InsightCard({ item, onClick }: { item: Insight; onClick: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group bg-[#0A0A0A] p-10 flex flex-col h-full hover:bg-[#0D0D0D] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-10">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#0445a4]">
          {item.category}
        </div>
        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
          {item.date}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-4 leading-tight text-white/90 group-hover:text-white transition-colors">
        {item.title}
      </h3>
      
      <p className="text-[#888] text-[15px] leading-relaxed mb-12 flex-1 line-clamp-4">
        {item.summary}
      </p>

      <div className="pt-8 border-t border-white/5 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-[#0445a4] transition-colors">
        <span>View Framework</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.article>
  );
}
