
"use client"

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
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
        activeSection=""
        handleNavClick={() => {}}
        onOpenIntake={() => setIsIntakeOpen(true)}
      />

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-headline font-semibold text-4xl md:text-5xl mb-4">Terms of Use</h1>
          <p className="text-[#606060] text-sm mb-12">Last updated: March 2026</p>
          
          <div className="space-y-12 text-[#A0A0A0] text-lg leading-relaxed">
            <p>
              These terms govern your use of greyshacks.com, operated by GreyShacks.
            </p>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">Use of This Site</h2>
              <p>
                This site is provided for informational purposes. The content on this site — including deployment frameworks, measurement methodologies, and outcome benchmarks — represents the intellectual property of GreyShacks and may not be reproduced or distributed without written permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">No Warranty</h2>
              <p>
                The information on this site is provided in good faith. GreyShacks makes no representations or warranties as to the accuracy, completeness, or applicability of any content to your specific operational situation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">Outcome Figures</h2>
              <p>
                Outcome figures published on this site are derived from pilot-phase operational data and represent conservative medians of observed ranges. They are not guarantees of results. Full methodology is available on request.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">Governing Law</h2>
              <p>
                These terms are governed by the laws of India.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">Contact</h2>
              <p>
                For any terms-related enquiry: hello@greyshacks.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer onOpenIntake={() => setIsIntakeOpen(true)} />

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navLinks={navLinks} 
        activeSection=""
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
