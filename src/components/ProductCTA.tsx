
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProductCTA() {
  return (
    <section className="bg-[#0A0A0A] py-24 md:py-40 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] text-[#0445a4] uppercase mb-8 block"
        >
          GET STARTED
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[32px] md:text-[56px] font-bold text-white tracking-tight leading-[1.1] mb-8 max-w-[760px] mx-auto"
        >
          Every system. One memory. Complete control.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[17px] md:text-[20px] text-[#888888] leading-relaxed max-w-[680px] mx-auto mb-12"
        >
          Join the forward-thinking operations teams using GreyShacks to eliminate fragmentation and build real operational intelligence.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/signup">
            <Button 
              className="bg-[#0445a4] text-white hover:bg-[#0445a4]/90 px-12 py-8 text-sm font-bold tracking-wider uppercase rounded-full w-full sm:w-auto shadow-2xl shadow-[#0445a4]/20 group transition-all duration-500 hover:scale-105"
            >
              START
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Button>
          </Link>
          
          <p className="mt-10 text-[11px] md:text-[12px] italic text-[#444] tracking-wide">
            Free forever for small teams. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
