"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Footer } from '@/components/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        activeSection="about"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="mb-16 max-w-4xl">
            <h1 className="font-headline font-semibold text-4xl md:text-6xl mb-8 leading-tight">
              About GreyShacks
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-24">
              {/* SECTION A */}
              <section>
                <h2 className="font-headline text-2xl md:text-3xl font-bold mb-8 text-white">What We Are Building</h2>
                <div className="space-y-6 text-[#A0A0A0] text-lg leading-relaxed">
                  <p>
                    GreyShacks is an agentic systems firm. We design and deploy autonomous operational systems for mid-market businesses — systems that handle end-to-end business processes with minimal to zero human intervention across sales, finance, HR, and operations.
                  </p>
                  <p>
                    We are not a software vendor. We are not an RPA firm. We are not building chatbots or demos. We build production-grade operational infrastructure — systems that run continuously, measure their own performance, and produce audit-ready records of every action taken.
                  </p>
                  <p>
                    GreyShacks has operated since 2023. Our methodology has been refined across 30+ operational deployments spanning manufacturing, real estate, logistics, financial services, and healthcare. Every engagement we take on begins with a structured diagnostic and is governed by a measurement framework built on real operational baselines — not assumptions.
                  </p>
                </div>
              </section>

              {/* SECTION B */}
              <section>
                <h2 className="font-headline text-2xl md:text-3xl font-bold mb-8 text-white">The Founder</h2>
                <div className="bg-[#111111] border border-white/5 p-8 md:p-12 rounded-xl shadow-xl">
                  <h3 className="text-white font-bold text-2xl mb-1">Swapnil Acharya</h3>
                  <p className="text-[#0047AB] font-mono text-xs uppercase tracking-widest mb-8">Founder, GreyShacks</p>
                  
                  <div className="space-y-6 text-[#A0A0A0] leading-relaxed">
                    <p>
                      Swapnil Acharya founded GreyShacks to solve a problem he observed consistently across mid-market operations: the gap between what enterprise AI promises and what actually ships into production.
                    </p>
                    <p>
                      Most organisations pursuing AI automation end up with demos, disconnected tools, or systems that require more oversight than the manual process they replaced. GreyShacks was built to close that gap — with a methodology that starts with operational diagnosis, runs through time-boxed pilots with weekly measurement, and scales only when the numbers support it.
                    </p>
                    <p>
                      Before GreyShacks, Swapnil worked at the intersection of business operations and technology systems, observing how process failures inside growing businesses compound over time — and how rarely the organisations affected have the internal capacity to diagnose and fix them at the system level. That observation is the foundation of every engagement GreyShacks takes on.
                    </p>
                    <p className="italic pt-4">He is based in Bhubaneswar, India.</p>
                  </div>
                </div>
              </section>

              {/* SECTION C */}
              <section>
                <h2 className="font-headline text-2xl md:text-3xl font-bold mb-8 text-white">How We Think About This Work</h2>
                <div className="space-y-8">
                  {[
                    { n: "1", text: "Operational problems are measurement problems first. Most automation fails because organisations try to fix a process they have never properly measured. We capture the baseline before we build anything." },
                    { n: "2", text: "Honest outcomes are a competitive advantage. The agentic AI space is full of inflated claims. We publish conservative figures, disclose our methodology, and stand behind every number we put on this site." },
                    { n: "3", text: "A system that requires constant human intervention is not a system. It is a more complicated version of the problem. We design for minimal human intervention by default — and we measure how often exceptions occur." },
                    { n: "4", text: "We work with organisations where efficiency directly impacts revenue. Not every business is a fit. We do not take engagements where we cannot define a measurable success criterion before the pilot begins." }
                  ].map((item) => (
                    <div key={item.n} className="flex gap-6 items-start">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-[#0047AB]/10 border border-[#0047AB]/20 flex items-center justify-center text-[#0047AB] font-bold">
                        {item.n}
                      </div>
                      <p className="text-[#A0A0A0] text-lg leading-relaxed pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION D */}
              <section className="pt-12 border-t border-white/5">
                <div className="max-w-2xl space-y-8">
                  <p className="text-[#A0A0A0] text-lg leading-relaxed">
                    We take a small number of engagements each quarter. Every engagement begins with a structured operational diagnostic — typically 2–3 weeks — before any system is scoped or built. If the diagnostic does not surface a high-confidence opportunity, we will tell you, and we will not proceed to a paid engagement.
                  </p>
                  <p className="text-white text-lg font-bold">
                    If you are evaluating agentic systems for your operations, start with the diagnostic.
                  </p>
                  <button 
                    onClick={() => setIsIntakeOpen(true)}
                    className="bg-[#0047AB] text-white font-bold text-sm px-10 py-4 rounded-lg shadow-xl flex items-center justify-center gap-2"
                  >
                    Request an Operational Diagnostic
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="about"
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