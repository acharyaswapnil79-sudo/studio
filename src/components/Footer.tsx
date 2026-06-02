"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FooterProps {
  onOpenIntake: () => void;
}

export function Footer({ onOpenIntake }: FooterProps) {
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
                Operational Intelligence for Mid-Market Operations
              </p>
              <p className="text-[11px] md:text-[12px] text-[#444] leading-relaxed uppercase tracking-wider font-bold">
                Serving APAC · MENA · NAMER
              </p>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] font-bold text-[#333] uppercase tracking-[0.25em]">Product</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/capabilities" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/deployments" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/capabilities#integrations" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-bold text-[#333] uppercase tracking-[0.25em]">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  About
                </Link>
              </li>
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

          {/* Column 4 — Action */}
          <div className="md:col-span-3 space-y-6 pt-4 md:pt-0">
            <p className="text-[12px] text-[#555] font-bold uppercase tracking-widest">Ready to start?</p>
            <Button
              onClick={onOpenIntake}
              className="w-full bg-[#0445a4] text-white font-bold text-[12px] md:text-[13px] uppercase tracking-[0.15em] py-7 rounded-full hover:bg-[#0445a4]/90 transition-all shadow-xl shadow-[#0445a4]/10"
            >
              Request a Diagnostic
            </Button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-[#444] font-medium tracking-wide">
            © 2026 GREYSHACKS. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[11px] text-[#333] italic font-medium tracking-tight text-center md:text-right">
            No generic AI solutions. Only deployment-backed systems.
          </div>
        </div>
      </div>
    </footer>
  );
}
