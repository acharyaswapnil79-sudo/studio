"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FooterProps {
  onOpenIntake: () => void;
}

export function Footer({ onOpenIntake }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-[100px] pb-[60px] px-6 md:px-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          {/* Column 1 — Brand */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="font-sans font-bold text-[20px] text-[#F5F5F5] tracking-tighter block">
              GreyShacks
            </Link>
            <div className="space-y-4 max-w-[300px]">
              <p className="text-[14px] text-[#666666] leading-tight font-sans">
                Operational Intelligence for Mid-Market Operations
              </p>
              <p className="text-[13px] text-[#444444] leading-relaxed font-sans">
                Headquartered in India. Serving APAC, MENA, and NAMER.
              </p>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[11px] font-bold text-[#444444] uppercase tracking-[0.2em] font-sans">Product</h4>
            <ul className="space-y-4 font-sans">
              <li>
                <Link href="/capabilities" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="/about#how-we-work" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/deployments" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/capabilities#integrations" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[11px] font-bold text-[#444444] uppercase tracking-[0.2em] font-sans">Company</h4>
            <ul className="space-y-4 font-sans">
              <li>
                <Link href="/about" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Action */}
          <div className="md:col-span-3 space-y-6 pt-4 md:pt-0">
            <p className="text-[13px] text-[#666666] font-medium">Ready to start?</p>
            <Button
              onClick={onOpenIntake}
              className="w-full bg-[#0445a4] text-white font-bold text-[13px] uppercase tracking-[0.1em] py-7 rounded-[4px] min-h-[56px] hover:bg-[#0445a4]/90 transition-all"
            >
              Request a Diagnostic
            </Button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <div className="text-[12px] text-[#333333] font-sans">
            © 2026 GreyShacks. All rights reserved.
          </div>
          <div className="text-[12px] text-[#222222] italic font-sans text-center md:text-right">
            No generic AI solutions. Only deployment-backed systems.
          </div>
        </div>
      </div>
    </footer>
  );
}
