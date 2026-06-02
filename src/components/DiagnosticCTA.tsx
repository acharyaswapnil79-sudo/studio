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
    <section className="bg-[#0A0A0A] py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold tracking-[0.25em] text-[#0445a4] uppercase mb-8 block"
        >
          START HERE
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[36px] md:text-[48px] font-bold text-[#F5F5F5] tracking-tight leading-[1.1] mb-8 max-w-[700px] mx-auto"
        >
          Your operations have a measurement problem. We can fix that.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[17px] md:text-[19px] text-[#888888] leading-relaxed max-w-[640px] mx-auto mb-12"
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
            className="bg-[#0445a4] text-white hover:bg-[#0445a4]/90 px-10 py-7 text-sm font-bold tracking-wider uppercase rounded-[4px] w-full sm:w-auto min-h-[60px] group"
          >
            Request an Operational Diagnostic
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <p className="mt-8 text-[12px] italic text-[#444444] tracking-wide">
            No retainer. No lock-in. Results or we don't proceed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
