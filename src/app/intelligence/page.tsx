"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { DiagnosticCTA } from '@/components/DiagnosticCTA';
import { Footer } from '@/components/Footer';
import { INSIGHTS, CATEGORY_NAMES, Category, Insight } from '@/lib/intelligence-data';
import { Clock, ArrowRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function OperationalIntelligencePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredInsights = INSIGHTS.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const navLinks = [
    { name: "Command Center", href: "/#hero" },
    { name: "Operational Impact", href: "/#operational-impact" },
    { name: "About", href: "/about" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Engagement", href: "/#engagement-model" },
    { name: "Deployment Library", href: "/deployments" },
    { name: "Field Intelligence", href: "/intelligence" }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#0445a4]/30 font-sans">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="intelligence"
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-0 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <header className="mb-16 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#0445a4]/10 border border-[#0445a4]/20 px-3 py-1 rounded-full mb-6"
            >
              <div className="w-1 h-1 rounded-full bg-[#0445a4] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0445a4]">Updated Quarterly</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
            >
              Operational Intelligence
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#A0A0A0] text-xl md:text-2xl leading-relaxed font-light"
            >
              Rigorous deployment observations, measurement data, and practitioner analysis from agentic systems operating inside mid-market businesses.
            </motion.p>
          </header>

          {/* Category Filter Bar */}
          <div className="sticky top-24 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-y border-white/5 mb-16">
            <div className="relative max-w-full">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
              
              <div className="overflow-x-auto scrollbar-hide py-4 px-6">
                <div className="flex gap-10 whitespace-nowrap min-w-max">
                  {CATEGORY_NAMES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "text-[11px] font-mono uppercase tracking-[0.25em] transition-all relative py-2",
                        activeCategory === category ? "text-white" : "text-white/30 hover:text-white"
                      )}
                    >
                      {category}
                      {activeCategory === category && (
                        <motion.div 
                          layoutId="category-indicator"
                          className="absolute bottom-0 left-0 right-0 h-px bg-[#0445a4]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Insight Grid */}
          <section id="grid" className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
              <AnimatePresence mode="popLayout">
                {filteredInsights.map((item) => (
                  <InsightCard 
                    key={item.id} 
                    item={item} 
                    onClick={() => router.push(`/intelligence/framework/${item.id}`)}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {filteredInsights.length === 0 && (
              <div className="py-24 text-center text-white/20 font-mono text-xs uppercase tracking-widest">
                No publications found in this category.
              </div>
            )}
          </section>
        </div>

        <DiagnosticCTA onOpenIntake={() => setIsIntakeOpen(true)} />
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="intelligence"
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <IntakeFormModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </div>
  );
}

function InsightCard({ item, onClick }: { item: Insight; onClick: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-[#0A0A0A] p-10 flex flex-col h-full hover:bg-[#0D0D0D] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-8">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#0445a4] font-bold border border-[#0445a4]/20 px-2 py-0.5 rounded">
          {item.category}
        </div>
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{item.date}</div>
      </div>
      
      <h3 className="font-headline text-2xl font-bold mb-2 leading-snug text-white/90 group-hover:text-white transition-colors">
        {item.title}
      </h3>

      <div className="text-[10px] text-[#606060] font-medium mb-6 uppercase tracking-widest">
        By Swapnil Acharya, Founder — GreyShacks
      </div>
      
      <div className="flex items-center gap-2 text-[10px] font-mono text-[#0445a4] mb-6 uppercase tracking-widest">
        <Info className="w-3 h-3" />
        {item.provenance}
      </div>
      
      <p className="text-[#808080] text-sm leading-relaxed mb-10 flex-1 font-light">
        {item.summary}
      </p>

      <div className="pt-8 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {item.readingTime}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-white/40 group-hover:text-[#0445a4] transition-colors">
          READ ANALYSIS
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}