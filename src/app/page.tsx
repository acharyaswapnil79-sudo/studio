"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { cn } from '@/lib/utils';

export default function GreyShacksLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ["Command Center", "Capabilities", "Case Studies", "Insights"];

  return (
    <div className="relative min-h-screen font-body overflow-x-hidden">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main>
        <HeroSection />
        <MetricsBar />
      </main>

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
      />
    </div>
  );
}

function Navbar({ isScrolled, navLinks, mobileMenuOpen, setMobileMenuOpen }: any) {
  return (
    <motion.nav
      initial={{ top: 24 }}
      animate={{ 
        top: isScrolled ? 12 : 24,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed left-0 right-0 z-50 flex justify-center w-full px-4 md:px-8"
    >
      <div className={cn(
        "flex items-center justify-between w-full max-w-[1240px] px-6 md:px-8 transition-all duration-300 rounded-[14px] h-[68px] overflow-visible",
        isScrolled ? "bg-[rgba(15,15,15,0.72)] backdrop-blur-[12px] saturate-[180%] border-b border-[rgba(255,255,255,0.07)] border-l border-[rgba(255,255,255,0.04)] border-r border-[rgba(255,255,255,0.04)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent border-transparent"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 bg-[#161616] border border-white/10 rounded-[7px]">
            <span className="font-bold text-[15px] text-white">G</span>
          </div>
          <span className="font-headline font-bold text-lg text-white">GreyShacks</span>
        </div>

        {/* Navigation Links - Visible on Tablet (768px+) and Desktop */}
        <div className="hidden md:flex items-center gap-[22px] lg:gap-[34px] mx-4">
          {navLinks.map((link: string) => (
            <div key={link} className="relative group py-2">
              <button className="text-[13px] lg:text-[13.5px] text-[#888888] tracking-wider hover:text-white transition-colors duration-[0.18s] whitespace-nowrap">
                {link}
              </button>
              <motion.div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-white opacity-0 group-hover:opacity-100 w-5"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </div>
          ))}
        </div>

        {/* CTA - Visible on Tablet (768px+) and Desktop */}
        <div className="hidden md:block shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="bg-[#0047AB] text-white font-semibold text-[13.5px] px-5 py-2.5 rounded-[7px] shadow-[0_4px_16px_rgba(0,71,171,0.25)] hover:shadow-[0_6px_28px_rgba(0,71,171,0.45)] whitespace-nowrap"
          >
            Apply for Pilot
          </motion.button>
        </div>

        {/* Mobile controls - Only below 768px */}
        <div className="flex md:hidden items-center gap-4">
          <button className="bg-[#0047AB] text-white font-semibold text-[12px] px-4 py-2 rounded-[7px] shadow-lg whitespace-nowrap">
            Apply
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col justify-center gap-[5px] w-[32px] h-[32px] items-end"
          >
            <motion.div 
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
            <motion.div 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
            <motion.div 
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenuOverlay({ isOpen, onClose, navLinks }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="fixed inset-0 z-[200] bg-[rgba(8,8,8,0.97)] backdrop-blur-[20px] flex flex-col items-center justify-center"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-white/70"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          
          <div className="flex flex-col items-center w-full px-8">
            {navLinks.map((link: string, i: number) => (
              <motion.button
                key={link}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.06 + i * 0.08 }}
                className="w-full text-center py-[18px] border-b border-white/5 font-headline font-medium text-[28px] text-white/80 hover:text-white transition-colors"
                onClick={onClose}
              >
                {link}
              </motion.button>
            ))}
            
            <motion.button
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.38 }}
              className="mt-8 w-full max-w-[280px] bg-[#0047AB] text-white font-bold text-[14.5px] py-3.5 rounded-[7px] shadow-xl"
            >
              Apply for Pilot
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden box-border px-5 md:px-8 pt-[72px] md:pt-[88px] lg:pt-[96px] pb-[48px] md:pb-[56px] lg:pb-[64px]">
      <ParticleBackground />
      
      <div className="relative z-10 w-full max-w-[860px] flex flex-col items-center text-center">
        {/* Eyebrow Tag - Visible on all breakpoints */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-[7px] bg-[rgba(0,71,171,0.09)] border border-[rgba(0,71,171,0.2)] px-3.5 py-1.5 rounded-full mb-[26px]"
        >
          <div className="w-[6px] h-[6px] rounded-full bg-[#0047AB] shadow-[0_0_8px_rgba(0,71,171,0.9)] animate-dot-pulse" />
          <span className="text-[11px] font-medium tracking-[0.13em] uppercase text-white/60">
            Agentic Systems for Mid-Market Operations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75, ease: [0.2, 0.9, 0.2, 1] }}
          className="font-headline font-semibold text-white mb-5 max-w-[820px]"
          style={{ 
            fontSize: "clamp(40px, 7.2vw, 62px)",
            lineHeight: 1.08,
            letterSpacing: "-0.022em"
          }}
        >
          The Architecture of<br />Autonomous Operations
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.75, ease: [0.2, 0.9, 0.2, 1] }}
          className="text-[#A0A0A0] text-[15px] md:text-[16px] lg:text-[17px] leading-[1.7] max-w-[560px] md:max-w-[600px] mb-[34px]"
        >
          GreyShacks designs intelligent systems that eliminate manual workflows, driving enterprise efficiency through agentic operational cores.
        </motion.p>

        {/* CTA Buttons - Side by side on 768px+ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.75, ease: [0.2, 0.9, 0.2, 1] }}
          className="flex flex-col md:flex-row gap-[11px] w-full md:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            className="flex items-center justify-center gap-2 bg-[#0047AB] text-white font-bold text-[14.5px] px-[30px] py-[14px] rounded-[7px] shadow-[0_8px_28px_rgba(0,71,171,0.32)] md:min-w-[180px] whitespace-nowrap"
          >
            Apply for Pilot
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6.5H12M12 6.5L7.5 2M12 6.5L7.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.25)" }}
            className="bg-transparent border border-white/14 text-white/82 font-semibold text-[14.5px] px-[30px] py-[14px] rounded-[7px] transition-colors md:min-w-[180px] whitespace-nowrap"
          >
            Explore Capabilities
          </motion.button>
        </motion.div>

        {/* Trusted Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.75, ease: [0.2, 0.9, 0.2, 1] }}
          className="mt-[52px] w-full border-t border-white/5 pt-[28px]"
        >
          <span className="block text-[10.5px] font-medium tracking-[0.15em] text-white/30 uppercase mb-[18px]">
            TRUSTED BY LEADING ENTERPRISES
          </span>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-x-[12px] gap-y-[14px]">
            {["Microsoft", "IBM", "Siemens", "BCG", "Salesforce"].map((logo) => (
              <div 
                key={logo} 
                className="bg-white/4 border border-white/8 px-3.5 md:px-4 py-[7px] rounded-[5px] shrink-0"
              >
                <span className="text-[12px] font-bold text-white/55 tracking-[0.06em]">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    { value: "+120", label: "Workflows Automated" },
    { value: "$8M+", label: "Annual Client Savings" },
    { value: "3–6 Mo.", label: "Average ROI Period" }
  ];

  return (
    <section className="bg-[#0D0D0D] border-t border-white/5 py-[38px] px-8 md:px-10">
      <div 
        ref={ref}
        className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/6"
      >
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="flex flex-col items-center text-center py-5 md:py-2.5 px-6"
          >
            <span className="font-headline font-bold text-white" style={{ fontSize: "clamp(34px, 5vw, 48px)" }}>
              {metric.value}
            </span>
            <span className="text-[#A0A0A0] text-[13px] mt-2 leading-[1.4]">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
