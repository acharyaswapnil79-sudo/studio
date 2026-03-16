"use client"

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenIntake: () => void;
}

const steps = [
  {
    title: 'Baseline capture',
    description: 'We map your current operational workflows, capture KPI baselines, and measure existing processes for 1–4 weeks (time, error rate, headcount cost).'
  },
  {
    title: 'Pilot deployment',
    description: 'A production-safe, scoped pilot on your highest-priority process. We measure weekly against the baseline and share results transparently.'
  },
  {
    title: 'Annualization',
    description: 'We convert observed pilot delta to annualized savings using conservative multipliers, providing clear ROI projections based on realized data.'
  },
  {
    title: 'Audit',
    description: 'Every system decision is logged with context and timestamp. Anonymized logs and sample exports are available under NDA for full transparency.'
  }
];

export function MethodologyModal({ isOpen, onClose, onOpenIntake }: MethodologyModalProps) {
  const isMobile = useIsMobile();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKey);
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 md:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-[10px]"
          />
          
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.96 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "relative z-10 bg-[#0A0A0A] border border-white/5 flex flex-col shadow-2xl overflow-hidden",
              isMobile 
                ? "w-full h-[90vh] mt-auto rounded-t-[16px]" 
                : "w-[90%] max-w-[720px] max-h-[80vh] rounded-xl"
            )}
          >
            {/* Header */}
            <header className="sticky top-0 z-20 bg-[#0A0A0A] border-b border-white/5 px-6 py-5 md:px-8 md:py-6 flex items-center justify-between">
              <h2 className="font-headline text-xl md:text-2xl text-white">Measurement Methodology</h2>
              <button 
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 modal-scroll-area">
              <div className="max-w-[600px] mx-auto space-y-10">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 md:gap-6">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-[#0047AB] flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-white font-bold text-base md:text-lg">{step.title}</h3>
                      <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="sticky bottom-0 z-20 bg-[#0A0A0A] border-t border-white/5 p-6 md:px-8 md:py-6 text-center">
              <button
                onClick={() => {
                  onClose();
                  onOpenIntake();
                }}
                className="w-full bg-[#0047AB] text-white font-bold text-sm md:text-base py-3.5 rounded-lg transition-transform active:scale-[0.98] hover:bg-[#0047AB]/90"
              >
                Request anonymized logs / methodology
              </button>
              <p className="mt-3 text-[#A0A0A0] text-xs">Standard NDA required for document access</p>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
