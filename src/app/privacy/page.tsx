
"use client"

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MobileMenuOverlay } from '@/components/MobileMenuOverlay';
import { IntakeFormModal } from '@/components/IntakeFormModal';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
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
          <h1 className="font-headline font-semibold text-4xl md:text-5xl mb-4">Privacy Policy</h1>
          <p className="text-[#606060] text-sm mb-12">Last updated: March 2026</p>
          
          <div className="space-y-12 text-[#A0A0A0] text-lg leading-relaxed">
            <p>
              GreyShacks ("we", "our", "us") operates greyshacks.com. This policy describes how we collect, use, and protect information submitted through this website.
            </p>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">Information We Collect</h2>
              <p>
                We collect information you submit through our contact and enquiry forms, including your name, company name, email address, and details of your operational enquiry. We do not collect information through cookies beyond standard site analytics.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">How We Use Your Information</h2>
              <p>
                Information submitted through our forms is used solely to respond to your enquiry and to determine whether an engagement is appropriate. We do not sell, share, or distribute your information to third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">Data Retention</h2>
              <p>
                Enquiry data is retained for a period of 24 months from the date of submission unless you request earlier deletion.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl">Contact</h2>
              <p>
                To request deletion of your data or with any privacy enquiry, contact us at: hello@greyshacks.com
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
