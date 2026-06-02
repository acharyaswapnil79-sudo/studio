"use client"

import React from 'react';
import Link from 'next/link';
import { Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  onOpenIntake: () => void;
}

export function Footer({ onOpenIntake }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] pt-[60px] pb-[40px] px-6">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Column 1 — Brand */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-2">
              <Link href="/" className="font-sans font-bold text-[18px] text-[#F5F5F5] tracking-tighter">
                GreyShacks
              </Link>
              <p className="text-[14px] text-[#555555] leading-tight font-sans">
                Operational Intelligence for Mid-Market Operations
              </p>
            </div>
            
            <p className="text-[14px] text-[#444444] leading-relaxed max-w-[280px] font-sans">
              Headquartered in India. Serving APAC, MENA, and NAMER.
            </p>
            
            <div className="flex gap-6">
              <a 
                href="https://linkedin.com/company/greyshacks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#444444] hover:text-[#F5F5F5] transition-colors p-2 -ml-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-[24px] h-[24px]" />
              </a>
              <a 
                href="https://instagram.com/greyshacks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#444444] hover:text-[#F5F5F5] transition-colors p-2"
                aria-label="Instagram"
              >
                <Instagram className="w-[24px] h-[24px]" />
              </a>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[12px] font-bold text-[#888888] uppercase tracking-widest font-sans">Product</h4>
            <ul className="space-y-4 font-sans">
              <li>
                <Link href="/capabilities" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="/about#how-we-work" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/deployments" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/capabilities#integrations" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-[12px] font-bold text-[#888888] uppercase tracking-widest font-sans">Company</h4>
            <ul className="space-y-4 font-sans">
              <li>
                <Link href="/about" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  About
                </Link>
              </li>
              <li>
                <Link href="/intelligence" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  Field Intelligence
                </Link>
              </li>
              <li>
                <Link href="/deployments" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  Deployment Library
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors inline-block py-1">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Action */}
          <div className="md:col-span-3 space-y-4 font-sans pt-4 md:pt-0">
            <p className="text-[12px] text-[#888888] font-medium">Ready to start?</p>
            <Button
              onClick={onOpenIntake}
              className="w-full bg-[#E8FF47] text-[#0A0A0A] font-bold text-[13px] uppercase tracking-widest py-6 rounded-[6px] min-h-[48px]"
            >
              Request a Diagnostic
            </Button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[12px] text-[#444444] font-sans">
            © 2026 GreyShacks. All rights reserved.
          </div>
          <div className="text-[12px] text-[#333333] italic font-sans text-center md:text-right">
            No generic AI solutions. Only deployment-backed systems.
          </div>
        </div>
      </div>
    </footer>
  );
}
