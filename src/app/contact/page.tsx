
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Footer } from '@/components/Footer';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
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
    { name: "Field Intelligence", href: "/intelligence" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-body text-white selection:bg-blue-900/30">
      <Navbar 
        isScrolled={isScrolled} 
        navLinks={navLinks} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection="contact"
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="mb-16 max-w-3xl">
            <h1 className="font-headline font-semibold text-4xl md:text-6xl mb-6 leading-tight">
              Get In Touch
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed">
              We respond to all operational enquiries within 48 hours. If you are evaluating agentic systems for a specific workflow, include a brief description of the process and your team size.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            <a href="mailto:hello@greyshacks.com" className="bg-[#111111] border border-white/5 p-8 rounded-xl hover:border-[#0047AB]/30 transition-all group">
              <Mail className="w-6 h-6 text-[#0047AB] mb-6 group-hover:scale-110 transition-transform" />
              <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-2">Email</div>
              <div className="text-white font-bold text-lg">hello@greyshacks.com</div>
            </a>
            <a href="https://linkedin.com/company/greyshacks" target="_blank" rel="noopener noreferrer" className="bg-[#111111] border border-white/5 p-8 rounded-xl hover:border-[#0047AB]/30 transition-all group">
              <Linkedin className="w-6 h-6 text-[#0047AB] mb-6 group-hover:scale-110 transition-transform" />
              <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-2">LinkedIn</div>
              <div className="text-white font-bold text-lg">linkedin.com/company/greyshacks</div>
            </a>
            <div className="bg-[#111111] border border-white/5 p-8 rounded-xl">
              <MapPin className="w-6 h-6 text-[#0047AB] mb-6" />
              <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-2">Location</div>
              <div className="text-white font-bold text-lg mb-1">Bhubaneswar, India</div>
              <div className="text-white/40 text-xs font-medium">Serving: APAC · MENA · NAMER</div>
            </div>
          </div>

          <div className="max-w-2xl bg-[#111111] border border-white/5 p-8 md:p-12 rounded-xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Company Name</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Work Email</label>
                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Your Operational Challenge</label>
                <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-[#0047AB] text-white font-bold text-sm py-4 rounded-lg shadow-lg hover:bg-[#0047AB]/90 transition-all flex items-center justify-center gap-2">
                Send Enquiry
                <Send className="w-4 h-4" />
              </button>
              <p className="text-[#606060] text-[11px] text-center pt-2">
                We typically respond within 48 hours. All enquiries are reviewed by the founding team.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection="contact"
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
