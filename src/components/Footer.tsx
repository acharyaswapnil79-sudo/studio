"use client"

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onOpenIntake: () => void;
}

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-20 pb-12 px-6 md:px-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          {/* Column 1 — Brand */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="font-sans font-bold text-[20px] text-white tracking-tighter block">
              GreyShacks
            </Link>
            <div className="space-y-3 max-w-[280px]">
              <p className="text-[13px] md:text-[14px] text-[#555] font-medium leading-tight">
                The Operational Memory Layer for modern teams.
              </p>
              <p className="text-[11px] md:text-[12px] text-[#444] leading-relaxed uppercase tracking-wider font-bold">
                Serving globally · Remote-first
              </p>
            </div>
          </div>

          {/* Column 2 — Platform */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-[10px] font-bold text-[#333] uppercase tracking-[0.25em]">Platform</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/#product" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Legals */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-[10px] font-bold text-[#333] uppercase tracking-[0.25em]">Legals</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-[#444] font-medium tracking-wide">
            © 2026 GREYSHACKS. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[11px] text-[#333] italic font-medium tracking-tight text-center md:text-right">
            Self-serve operational intelligence. Built for scale.
          </div>
        </div>
      </div>
    </footer>
  );
}
