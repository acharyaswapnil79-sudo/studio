"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface DiagnosticCTAProps {
  onOpenIntake: () => void;
}

export function DiagnosticCTA({ onOpenIntake }: DiagnosticCTAProps) {
  return (
    <section className="bg-[#111] border-y border-[#1E1E1E] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-medium tracking-[0.12em] text-[#E8FF47] uppercase mb-6 block"
        >
          START HERE
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[32px] md:text-[40px] font-bold text-[#F5F5F5] tracking-tight leading-[1.1] mb-6 max-w-[580px] mx-auto"
        >
          Your operations have a measurement problem. We can fix that.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[17px] text-[#888888] leading-relaxed max-w-[640px] mx-auto mb-10"
        >
          A diagnostic isn't a sales call. It's a structured 2-week process that tells you — with data — exactly where your biggest ROI opportunities are.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            onClick={onOpenIntake}
            className="bg-[#E8FF47] text-[#0A0A0A] hover:bg-[#E8FF47]/90 px-10 py-6 text-sm font-semibold tracking-wider uppercase rounded-[6px]"
          >
            Request an Operational Diagnostic
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <p className="mt-6 text-[13px] italic text-[#555555]">
            No retainer. No lock-in. Results or we don't proceed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
