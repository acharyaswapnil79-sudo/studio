"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenIntake: () => void;
}

export function Footer({ onOpenIntake }: FooterProps) {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6 md:px-10 font-body">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Left - Brand + Positioning */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <Link href="/" className="font-headline font-bold text-2xl text-white">GreyShacks</Link>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#0047AB]">
                Operational Intelligence for Agentic Systems
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-sm">
                We design and deploy production-grade agentic systems across finance, logistics, sales, and operations — with measurable outcomes and audit-ready governance.
              </p>
              <p className="text-[#A0A0A0] text-[11px] leading-relaxed max-w-sm">
                Headquartered in India. Serving mid-market businesses across APAC, MENA, and NAMER.
              </p>
            </div>
            <div className="text-[#A0A0A0] text-xs font-medium">
              No fluff. No buzzwords.
            </div>
          </div>

          {/* Middle - Navigation */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">Explore</h4>
              <ul className="space-y-4">
                <li><Link href="/#hero" className="text-[#606060] hover:text-white transition-colors text-sm">Command Center</Link></li>
                <li><Link href="/#operational-impact" className="text-[#606060] hover:text-white transition-colors text-sm">Operational Impact</Link></li>
                <li><Link href="/capabilities" className="text-[#606060] hover:text-white transition-colors text-sm">Capabilities</Link></li>
                <li><Link href="/deployments" className="text-[#606060] hover:text-white transition-colors text-sm">Deployment Library</Link></li>
                <li><Link href="/intelligence" className="text-[#606060] hover:text-white transition-colors text-sm">Field Intelligence</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-[#606060] hover:text-white transition-colors text-sm">About</Link></li>
                <li><Link href="/intelligence" className="text-[#606060] hover:text-white transition-colors text-sm">Frameworks</Link></li>
                <li><Link href="/deployments" className="text-[#606060] hover:text-white transition-colors text-sm">Case Studies</Link></li>
                <li><Link href="/intelligence" className="text-[#606060] hover:text-white transition-colors text-sm">Measurement Methodology</Link></li>
              </ul>
            </div>
          </div>

          {/* Right - Action */}
          <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-8 rounded-xl space-y-6">
            <div className="space-y-2">
              <h4 className="text-white font-bold text-lg">Start a Pilot</h4>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">
                Short, measured deployments on your data. No long-term commitment.
              </p>
            </div>
            <button
              onClick={onOpenIntake}
              className="w-full bg-[#0047AB] text-white font-bold text-sm py-4 rounded-lg shadow-lg hover:bg-[#0047AB]/90 transition-all flex items-center justify-center gap-2"
            >
              Request an Operational Diagnostic
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[#404040] text-[11px]">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span>&copy; 2026 GreyShacks. All rights reserved.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="text-[#606060]">Built for operational teams — not demos.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-white">
          No generic AI solutions. Only deployment-backed systems.
        </div>
      </div>
    </footer>
  );
}