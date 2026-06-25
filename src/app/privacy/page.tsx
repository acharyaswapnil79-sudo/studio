"use client"

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCTA } from '@/components/ProductCTA';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-body text-white selection:bg-[#0445a4]/30">
      <Navbar 
        activeSection=""
        onOpenIntake={() => {}}
      />

      <main className="pt-32 pb-0 px-6 md:px-10">
        <div className="max-w-[800px] mx-auto mb-24">
          <h1 className="font-headline font-semibold text-4xl md:text-5xl mb-4 text-[#F5F5F5]">Privacy Policy</h1>
          <p className="text-[#606060] text-sm mb-12 uppercase tracking-widest font-bold">Last updated: June 2026</p>
          
          <div className="space-y-12 text-[#A0A0A0] text-lg leading-relaxed">
            <p>
              GreyShacks ("we", "our", or "us") operates the website greyshacks.com. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website or interact with us.
            </p>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit a contact or enquiry form</li>
                <li>Sign up for updates, demos, or early access</li>
                <li>Communicate with us via email or other channels</li>
              </ul>
              <p>The types of information we may collect include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, work email, phone number, and company name</li>
                <li>Details about your use case or operational challenges</li>
                <li>Any other information you choose to provide</li>
              </ul>
              <p>
                We may also automatically collect certain information through cookies and similar tracking technologies (such as IP address, browser type, pages visited, and time spent on the site) for analytics and improving user experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your enquiries and provide relevant information</li>
                <li>Improve our website, product, and user experience</li>
                <li>Send important updates about GreyShacks (only if you have opted in)</li>
                <li>Understand how visitors use our website to improve our offerings</li>
              </ul>
              <p>We do not sell or rent your personal information to third parties.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Data Sharing</h2>
              <p>
                We may share your information with trusted service providers (such as analytics tools or email service providers) who assist us in operating our website and communicating with you. These providers are bound by confidentiality obligations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Data Retention</h2>
              <p>
                We retain your information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Data Security</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Your Rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise these rights, please contact us at hello@greyshacks.com.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-white font-bold text-xl tracking-tight">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please reach out to us at: hello@greyshacks.com
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
