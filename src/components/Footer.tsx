"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenIntake: () => void;
}

export function Footer({ onOpenIntake }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="font-display font-bold text-2xl text-[#F5F5F5]">GreyShacks</Link>
            <p className="text-[#888] text-sm leading-relaxed max-w-xs">
              Eliminating manual operational latency through production-grade agentic systems. Headquartered in India, serving APAC, MENA, and NAMER.
            </p>
            <div className="text-[11px] font-bold text-[#F5F5F5]/60 uppercase tracking-widest">
              No fluff. No buzzwords.
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[#F5F5F5] text-xs font-bold uppercase tracking-widest">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="text-[#888] hover:text-[#4DFFB4] transition-colors">Command Center</Link></li>
              <li><Link href="/capabilities" className="text-[#888] hover:text-[#4DFFB4] transition-colors">Capabilities</Link></li>
              <li><Link href="/deployments" className="text-[#888] hover:text-[#4DFFB4] transition-colors">Library</Link></li>
              <li><Link href="/intelligence" className="text-[#888] hover:text-[#4DFFB4] transition-colors">Intelligence</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[#F5F5F5] text-xs font-bold uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/privacy" className="text-[#888] hover:text-[#4DFFB4] transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-[#888] hover:text-[#4DFFB4] transition-colors">Terms</Link></li>
              <li><Link href="/about" className="text-[#888] hover:text-[#4DFFB4] transition-colors">About Firm</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 bg-[#111] border border-[#222] p-8 rounded-[4px] flex flex-col justify-between">
            <div className="space-y-2">
              <h4 className="text-[#F5F5F5] font-bold">Scope an Operational Diagnostic</h4>
              <p className="text-[#888] text-sm leading-relaxed">
                Short, measured deployments on your data. No long-term commitment.
              </p>
            </div>
            <button
              onClick={onOpenIntake}
              className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-[#4DFFB4] text-[#0A0A0A] font-bold text-[13px] uppercase tracking-widest rounded-[2px] transition-transform active:scale-[0.98]"
            >
              Start Diagnostic Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-12 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] text-[#444] font-medium uppercase tracking-widest">
          <div>© 2026 GreyShacks. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="https://linkedin.com/company/greyshacks" target="_blank" className="hover:text-[#4DFFB4] transition-colors">LinkedIn</a>
            <a href="https://instagram.com/greyshacks" target="_blank" className="hover:text-[#4DFFB4] transition-colors">Instagram</a>
          </div>
          <div className="text-[#888]">Built for teams — not demos.</div>
        </div>
      </div>
    </footer>
  );
}