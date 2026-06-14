
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
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-[10px] font-bold text-[#333] uppercase tracking-[0.25em]">Menu</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/capabilities" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[13px] text-[#666] hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
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
            No generic AI solutions. Only deployment-backed systems.
          </div>
        </div>
      </div>
    </footer>
  );
}
