"use client"

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { MethodologyModal } from '@/components/MethodologyModal';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Footer } from '@/components/Footer';
import { DEPLOYMENTS } from '@/lib/deployments-data';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Info, Filter, FileText, BarChart, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function DeploymentLibraryPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  // Initial states set to show all deployments
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [functionFilter, setFunctionFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [teamSizeFilter, setTeamSizeFilter] = useState<string>('all');
  const [methodologyOnly, setMethodologyOnly] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredDeployments = useMemo(() => {
    const filtered = DEPLOYMENTS.filter(d => {
      const industryMatch =
        industryFilter === 'all' ||
        (d.industry && d.industry.toLowerCase() === industryFilter.toLowerCase());

      const functionMatch =
        functionFilter === 'all' ||
        (d.function && d.function.toLowerCase() === functionFilter.toLowerCase());

      const stageMatch =
        stageFilter === 'all' ||
        (d.status && d.status.toLowerCase().includes(stageFilter.toLowerCase()));

      const teamSizeMatch =
        teamSizeFilter === 'all' ||
        (d.teamSize && d.teamSize === teamSizeFilter);

      const methodologyMatch =
        !methodologyOnly ||
        (d.hasMethodology === true);

      return (
        industryMatch &&
        functionMatch &&
        stageMatch &&
        teamSizeMatch &&
        methodologyMatch
      );
    });

    return filtered;
  }, [
    industryFilter,
    functionFilter,
    stageFilter,
    teamSizeFilter,
    methodologyOnly
  ]);

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
    <div className="relative min-h-screen bg-[#0A0A0A] font-body text-white selection:bg-blue-900/30">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="deployments"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-headline font-semibold text-4xl md:text-6xl mb-6 leading-tight">
              Deployment Library
            </h1>
            <div className="max-w-3xl space-y-6 text-[#A0A0A0] text-lg md:text-xl leading-relaxed">
              <p>
                Each deployment began with a structured diagnostic and a time-boxed pilot. Outcomes are measured against a defined baseline. Client identities remain anonymized. Deployment data is available under NDA.
              </p>
              <div className="bg-[#111] border-l-2 border-[#0047AB] p-6 rounded-r-lg">
                <p className="text-white text-base">
                  Not every deployment produced the outcomes projected at scoping. Where results differed from pilot expectations, we note it.
                </p>
              </div>
            </div>
          </div>

          {/* Benchmarks Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Avg Pilot Duration', value: '4–8 Weeks' },
              { label: 'Avg Manual Reduction', value: '50–85%' },
              { label: 'ROI Benchmark', value: '3–6 Months' },
              { label: 'Measurement Census', value: '100%' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#111] border border-white/5 p-4 rounded-lg">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <section className="sticky top-24 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/5 rounded-xl p-4 mb-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-white/40 shrink-0">
                <Filter className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Filter Library</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="bg-[#111] border-white/10 text-xs">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-white/10 text-white">
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Technology Services">Technology Services</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Automotive">Automotive</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Telecommunications">Telecommunications</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="NBFC">NBFC</SelectItem>
                    <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                    <SelectItem value="Food Manufacturing">Food Manufacturing</SelectItem>
                    <SelectItem value="Legal Services">Legal Services</SelectItem>
                    <SelectItem value="Immigration">Immigration</SelectItem>
                    <SelectItem value="Fitness & Wellness">Fitness & Wellness</SelectItem>
                    <SelectItem value="Event Management">Event Management</SelectItem>
                    <SelectItem value="Architecture & Engineering">Architecture & Engineering</SelectItem>
                    <SelectItem value="Textile">Textile</SelectItem>
                    <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                    <SelectItem value="Co-working">Co-working</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={functionFilter} onValueChange={setFunctionFilter}>
                  <SelectTrigger className="bg-[#111] border-white/10 text-xs">
                    <SelectValue placeholder="Function" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-white/10 text-white">
                    <SelectItem value="all">All Functions</SelectItem>
                    <SelectItem value="Sales Operations">Sales Operations</SelectItem>
                    <SelectItem value="Finance Operations">Finance Operations</SelectItem>
                    <SelectItem value="Customer Operations">Customer Operations</SelectItem>
                    <SelectItem value="Admissions Operations">Admissions Operations</SelectItem>
                    <SelectItem value="Renewal Operations">Renewal Operations</SelectItem>
                    <SelectItem value="Lead Operations">Lead Operations</SelectItem>
                    <SelectItem value="Order Operations">Order Operations</SelectItem>
                    <SelectItem value="Inventory Operations">Inventory Operations</SelectItem>
                    <SelectItem value="Reporting Operations">Reporting Operations</SelectItem>
                    <SelectItem value="Compliance Operations">Compliance Operations</SelectItem>
                    <SelectItem value="Vendor Coordination">Vendor Coordination</SelectItem>
                    <SelectItem value="Scheduling Operations">Scheduling Operations</SelectItem>
                    <SelectItem value="Document Operations">Document Operations</SelectItem>
                    <SelectItem value="Member Operations">Member Operations</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="bg-[#111] border-white/10 text-xs">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-white/10 text-white">
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="Pilot Complete">Pilot Complete</SelectItem>
                    <SelectItem value="In Deployment">In Deployment</SelectItem>
                    <SelectItem value="Production">Ongoing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={teamSizeFilter} onValueChange={setTeamSizeFilter}>
                  <SelectTrigger className="bg-[#111] border-white/10 text-xs">
                    <SelectValue placeholder="Team Size" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-white/10 text-white">
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="Under 20">Under 20</SelectItem>
                    <SelectItem value="20–100">20–100</SelectItem>
                    <SelectItem value="100+">100+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 shrink-0 border-l border-white/10 pl-4 h-10">
                <Checkbox 
                  id="methodology" 
                  checked={methodologyOnly}
                  onCheckedChange={(checked) => setMethodologyOnly(!!checked)}
                />
                <label htmlFor="methodology" className="text-xs font-medium text-white/60 cursor-pointer">
                  Full methodology available
                </label>
              </div>
            </div>
          </section>

          {/* Result Count */}
          <div className="mb-6 text-sm text-white/50">
            Showing {filteredDeployments.length} deployments
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDeployments.map((d) => (
                <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#111] border border-white/5 rounded-xl overflow-hidden flex flex-col hover:border-[#0047AB]/50 transition-all shadow-lg"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0047AB]">
                          {d.industry}
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{d.title}</h3>
                      </div>
                      <Badge variant="secondary" className="bg-white/5 text-[9px] border-none text-white/40">
                        {d.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 flex-1">
                      {d.summary 
                        ? d.summary 
                        : d.clientContext 
                          ? d.clientContext.split('.')[0] + '.' 
                          : 'Operational deployment improving efficiency and visibility across core workflows.'}
                    </p>

                    {d.kpis && d.kpis.length > 0 && (
                      <div className="bg-black/20 border border-white/5 rounded-lg p-4 space-y-4 mb-6">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 flex items-center gap-1">
                          <BarChart className="w-3 h-3" /> Key Outcome
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/40">{d.kpis[0].label}</span>
                          <span className="text-xs font-bold text-[#0047AB]">{d.kpis[0].impact}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium">{d.kpis[0].before}</div>
                          <ArrowRight className="w-3 h-3 text-white/20" />
                          <div className="text-sm font-bold text-white">{d.kpis[0].after}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/5 p-4 flex gap-2">
                    <button 
                      onClick={() => setIsIntakeOpen(true)}
                      className="flex-1 bg-[#0047AB] text-white text-[11px] font-bold py-2.5 rounded-md hover:bg-[#0047AB]/90 transition-colors"
                    >
                      Request Diagnostic
                    </button>
                    <Link 
                      href={`/deployments/${d.id}`}
                      className="flex-1 bg-white/5 text-center text-white/60 text-[11px] font-bold py-2.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Conversion Block */}
          <section className="mt-24 pt-24 border-t border-white/5 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-headline text-3xl md:text-5xl font-semibold leading-tight">
                If your team is managing a similar operational problem, we scope a diagnostic in 2–3 weeks.
              </h2>
              <p className="text-[#A0A0A0] text-lg md:text-xl">
                The diagnostic is production-safe and measured against your operational baseline.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setIsIntakeOpen(true)}
                  className="bg-[#0047AB] text-white font-bold text-sm px-10 py-4 rounded-lg shadow-xl flex items-center justify-center gap-2"
                >
                  Request an Operational Diagnostic
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsMethodologyOpen(true)}
                  className="bg-transparent border border-white/10 text-white font-bold text-sm px-10 py-4 rounded-lg hover:bg-white/5 transition-all"
                >
                  Request the Deployment Brief (NDA)
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="deployments"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <MethodologyModal 
        isOpen={isMethodologyOpen} 
        onClose={() => setIsMethodologyOpen(false)} 
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <IntakeFormModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </div>
  );
}