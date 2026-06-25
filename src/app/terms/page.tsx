"use client"

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCTA } from '@/components/ProductCTA';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-body text-white selection:bg-[#0445a4]/30">
      <Navbar 
        activeSection=""
        onOpenIntake={() => {}}
      />

      <main className="pt-32 pb-0 px-6 md:px-10">
        <div className="max-w-[800px] mx-auto mb-24">
          <h1 className="font-headline font-semibold text-4xl md:text-5xl mb-4 text-[#F5F5F5]">Terms of Use</h1>
          <p className="text-[#606060] text-sm mb-12 uppercase tracking-widest font-bold">Last updated: June 2026</p>
          
          <div className="space-y-12 text-[#A0A0A0] text-lg leading-relaxed">
            <p>
              These Terms of Use ("Terms") govern your access to and use of the website greyshacks.com (the "Site"), operated by GreyShacks.
            </p>
            <p>
              By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
            </p>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Use of the Site</h2>
              <p>
                The Site is provided for informational and educational purposes. You may use the Site only for lawful purposes and in accordance with these Terms.
              </p>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Site in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the Site or related systems</li>
                <li>Interfere with or disrupt the security or performance of the Site</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Intellectual Property</h2>
              <p>
                All content on the Site, including text, graphics, logos, images, and software, is the property of GreyShacks or its licensors and is protected by intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from any content on the Site without prior written permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">No Warranty</h2>
              <p>
                The information and materials on the Site are provided "as is" without any warranties of any kind, either express or implied. GreyShacks does not guarantee the accuracy, completeness, or reliability of any content on the Site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, GreyShacks shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Links to Third-Party Websites</h2>
              <p>
                The Site may contain links to third-party websites. We are not responsible for the content, privacy practices, or security of such websites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. The updated version will be posted on this page with a new "Last updated" date. Your continued use of the Site after any changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Contact</h2>
              <p>
                For any enquiry related to these terms, contact us at: hello@greyshacks.com
              </p>
            </section>
          </div>
        </div>

        <ProductCTA />
      </main>

      <Footer onOpenIntake={() => {}} />
    </div>
  );
}
