"use client"

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { INSIGHTS, CATEGORIES } from '@/lib/intelligence-data';
import { Search, Filter, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

export default function IntelligenceLibrary() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredInsights = useMemo(() => {
    return INSIGHTS.filter(i => {
      const catName = activeCategory === 'Practitioner Frameworks' ? 'Practitioner Framework' : activeCategory;
      const categoryMatch = activeCategory === 'All' || i.category === catName || (activeCategory === 'Practitioner Frameworks' && i.type === 'framework');
      const searchMatch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          i.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const navLinks = [
    { name: "Command Center", href: "/#hero" },
    { name: "Operational Impact", href: "/#operational-impact" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Deployment Library", href: "/deployments" },
    { name: "Field Intelligence", href: "/intelligence" }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-sans text-white selection:bg-blue-900/30">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="intelligence"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Hero Section */}
          <section id="hero" className="mb-24">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-[#0047AB]/10 border border-[#0047AB]/20 px-3 py-1.5 rounded-full mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0047AB] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0047AB]">Updated Quarterly</span>
              </motion.div>
              
              <h1 className="font-headline font-bold text-5xl md:text-7xl mb-8 leading-tight">
                Field Intelligence
              </h1>
              
              <p className="text-[#A0A0A0] text-xl md:text-2xl leading-relaxed mb-10 max-w-3xl">
                Deployment observations, measurement data, and practitioner analysis from agentic systems operating inside real businesses.
              </p>

              <div className="bg-[#0F0F0F] border-l-2 border-[#0047AB] p-8 mb-12 max-w-3xl">
                <p className="text-white/80 text-lg leading-relaxed font-mono text-[11px] uppercase tracking-widest mb-2">Editorial Standard</p>
                <p className="text-white/80 text-lg leading-relaxed">
                  These publications are grounded in deployment observation, pilot measurement data, and structured operational analysis. Every piece references a specific operational context or measurement dataset.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#0047AB] text-white font-bold text-sm px-8 py-4 rounded-lg hover:bg-[#0047AB]/90 transition-colors"
                >
                  Browse the Library
                </button>
                <Link href="/intelligence/frameworks">
                  <button 
                    className="bg-transparent border border-white/10 text-white font-bold text-sm px-8 py-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    View Frameworks Library
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Category Navigation */}
          <section className="sticky top-24 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-y border-white/5 mb-16 overflow-hidden">
            <div className="relative max-w-full">
              <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none md:w-20" />
              <div className="absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none md:w-20" />
              
              <div className="overflow-x-auto scrollbar-hide py-4 px-10 md:px-20 scroll-smooth -webkit-overflow-scrolling-touch">
                <div className="flex gap-8">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`text-xs font-mono uppercase tracking-[0.2em] transition-all relative py-2 shrink-0 ${
                        activeCategory === cat.name ? "text-white" : "text-[#555] hover:text-white"
                      }`}
                    >
                      {cat.name}
                      {activeCategory === cat.name && (
                        <motion.div 
                          layoutId="activeCategory"
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: cat.color }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Search + Filter */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            <div className="lg:col-span-3 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text"
                placeholder="Search intelligence library"
                className="w-full bg-[#111] border border-white/5 rounded-lg pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#0047AB]/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 bg-[#111] border border-white/5 rounded-lg px-4">
              <Filter className="w-4 h-4 text-white/30" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Filters</span>
            </div>
          </section>

          {/* Featured Research */}
          <section className="mb-32 bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 space-y-8">
                <div className="text-[#0047AB] font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                  Featured Publication — Q1 2025
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight">
                  Operational Capacity Loss in Mid-Market Businesses
                </h2>
                <ul className="space-y-4 text-[#A0A0A0] text-lg">
                  <li className="flex gap-3">
                    <span className="text-[#0047AB]">•</span> Where operational capacity is lost
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#0047AB]">•</span> Common manual workflows
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#0047AB]">•</span> Automation benchmarks
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#0047AB]">•</span> Deployment ROI timelines
                  </li>
                </ul>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setIsIntakeOpen(true)} className="bg-[#0047AB] text-white font-bold text-sm px-8 py-4 rounded-lg">
                    Download Research Brief
                  </button>
                  <button onClick={() => setIsIntakeOpen(true)} className="text-white/60 font-bold text-sm hover:text-white underline decoration-[#0047AB]">
                    Request full dataset (NDA)
                  </button>
                </div>
              </div>
              <div className="bg-[#111] p-12 lg:p-16 flex flex-col justify-center border-l border-white/5">
                <div className="space-y-8">
                  {[
                    { label: "Finance Operations", value: 85 },
                    { label: "Lead Operations", value: 72 },
                    { label: "Customer Support", value: 64 },
                    { label: "Procurement", value: 58 },
                    { label: "Reporting", value: 45 }
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/40">
                        <span>{item.label}</span>
                        <span>{item.value}% Manual</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-[#0047AB]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-[10px] font-mono text-white/30 italic">
                  Manual hour distribution by operational function — pre-deployment observation data.
                </div>
              </div>
            </div>
          </section>

          {/* Intelligence Grid */}
          <section id="grid" className="mb-32">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h3 className="font-headline text-3xl font-bold mb-4">Latest Research</h3>
                <div className="text-sm text-[#A0A0A0]">Showing {filteredInsights.length} publications</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredInsights.map((insight) => (
                  <Link 
                    key={insight.id} 
                    href={`/intelligence/${insight.id}`}
                    className="group bg-[#111] border border-white/5 p-8 rounded-xl flex flex-col hover:border-[#0047AB]/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div 
                        className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-current rounded"
                        style={{ color: CATEGORIES.find(c => c.name === insight.category || (c.name === 'Practitioner Frameworks' && insight.type === 'framework'))?.color || '#3B82F6' }}
                      >
                        {insight.type === 'framework' ? 'Practitioner Framework' : insight.category}
                      </div>
                      <div className="text-[10px] font-mono text-white/30">{insight.date}</div>
                    </div>
                    
                    <h4 className="font-headline text-2xl font-bold mb-4 leading-tight group-hover:text-[#0047AB] transition-colors">
                      {insight.title}
                    </h4>
                    
                    <div className="text-[10px] font-mono text-[#0047AB] mb-4 flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      {insight.provenance}
                    </div>
                    
                    <p className="text-[#A0A0A0] text-sm leading-relaxed mb-8 flex-1">
                      {insight.summary}
                    </p>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                        <span>{insight.readingTime}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span>{insight.dataWindow}</span>
                      </div>
                      <span className="text-white hover:text-[#0047AB] transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Practitioner Frameworks CTA Block */}
          <section className="mb-32">
            <h3 className="font-headline text-3xl font-bold mb-12">Practitioner Frameworks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {INSIGHTS.filter(i => i.type === 'framework').slice(0, 5).map((f) => (
                <Link 
                  key={f.id}
                  href={`/intelligence/${f.id}`}
                  className="bg-[#111] border border-white/5 p-6 rounded-xl text-left hover:border-[#0047AB] transition-all group h-full flex flex-col"
                >
                  <ArrowRight className="w-5 h-5 text-[#0047AB] mb-6 group-hover:translate-x-1 transition-transform" />
                  <div className="text-sm font-bold leading-relaxed flex-1">{f.title}</div>
                  <div className="mt-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">Read Framework →</div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/intelligence/frameworks" className="inline-flex items-center gap-2 text-sm font-bold hover:text-[#0047AB] transition-colors">
                Browse all 16 frameworks <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Final Conversion */}
          <section className="text-center py-24 border-t border-white/5">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-headline text-4xl md:text-6xl font-bold leading-tight">
                Evaluating agentic systems in your operations?
              </h2>
              <p className="text-[#A0A0A0] text-xl leading-relaxed">
                We begin with a structured operational diagnostic (typically 2–3 weeks) to determine whether a system is the appropriate intervention.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setIsIntakeOpen(true)}
                  className="bg-[#0047AB] text-white font-bold text-sm px-10 py-4 rounded-lg shadow-xl"
                >
                  Discuss an Operational Diagnostic
                </button>
              </div>
              <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Diagnostic", val: "2–3 weeks" },
                  { label: "Pilot", val: "4–8 weeks" },
                  { label: "Safety", val: "Production safe" },
                  { label: "Evidence", val: "Measured baseline" }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                    <div className="text-sm font-bold">{stat.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-12 px-6 md:px-10 border-t border-white/5 text-center text-[#A0A0A0] text-sm">
        <div className="max-w-[1240px] mx-auto">
          &copy; 2023 GreyShacks. All research observations grounded in deployment data.
        </div>
      </footer>

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
