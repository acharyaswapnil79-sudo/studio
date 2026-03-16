"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface IntakeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IntakeFormModal({ isOpen, onClose }: IntakeFormModalProps) {
  const isMobile = useIsMobile();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    companySize: '',
    industry: '',
    useCase: '',
    ndaAcknowledged: false
  });

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

  const isEmailValid = (email: string) => {
    const commonPublicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    if (!email.includes('@')) return false;
    const domain = email.split('@')[1];
    return domain && !commonPublicDomains.includes(domain.toLowerCase());
  };

  const isFormValid = 
    formData.fullName && 
    isEmailValid(formData.email) && 
    formData.company && 
    formData.role && 
    formData.companySize && 
    formData.industry && 
    formData.useCase.length > 0 && 
    formData.ndaAcknowledged;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', { ...formData, request_type: 'methodology_access' });
      setIsSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-[10px]"
          />
          
          <motion.div
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
                : "w-[90%] max-w-[640px] max-h-[85vh] rounded-xl"
            )}
          >
            {/* Header */}
            <header className="sticky top-0 z-20 bg-[#0A0A0A] border-b border-white/5 px-6 py-5 md:px-8 md:py-6 flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="font-headline text-xl md:text-2xl text-white">Request Methodology Access</h2>
                {!isSubmitted && (
                  <p className="text-[#A0A0A0] text-xs md:text-sm">
                    Access to anonymized operational logs requires a mutual NDA.
                  </p>
                )}
              </div>
              <button 
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 modal-scroll-area">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-[#0047AB]/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#0047AB]" />
                  </div>
                  <h3 className="text-white text-2xl font-bold">Request Received</h3>
                  <p className="text-[#A0A0A0] max-w-sm">
                    Our team will review your request and respond within 1–2 business days.
                    If approved, NDA documentation and access instructions will be shared via email.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-white text-xs font-semibold uppercase tracking-wider">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB] transition-colors"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white text-xs font-semibold uppercase tracking-wider">Business Email</label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB] transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formData.email && !isEmailValid(formData.email) && (
                      <p className="text-xs text-blue-400">Please provide a valid business email domain.</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white text-xs font-semibold uppercase tracking-wider">Company Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Company name"
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB] transition-colors"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-white text-xs font-semibold uppercase tracking-wider">Role / Title</label>
                      <select
                        required
                        className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] transition-colors appearance-none"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option value="" disabled>Select role</option>
                        <option>Founder</option>
                        <option>CEO</option>
                        <option>COO</option>
                        <option>CTO</option>
                        <option>Head of Operations</option>
                        <option>Head of Finance</option>
                        <option>Operations Manager</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-white text-xs font-semibold uppercase tracking-wider">Company Size</label>
                      <select
                        required
                        className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] transition-colors appearance-none"
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      >
                        <option value="" disabled>Select size</option>
                        <option>1–10 employees</option>
                        <option>11–50</option>
                        <option>51–200</option>
                        <option>201–1000</option>
                        <option>1000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white text-xs font-semibold uppercase tracking-wider">Industry</label>
                    <select
                      required
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] transition-colors appearance-none"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    >
                      <option value="" disabled>Select industry</option>
                      <option>Manufacturing</option>
                      <option>Real Estate</option>
                      <option>Retail</option>
                      <option>Logistics</option>
                      <option>Healthcare</option>
                      <option>Financial Services</option>
                      <option>SaaS</option>
                      <option>Energy</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white text-xs font-semibold uppercase tracking-wider">Primary Use Case</label>
                    <textarea
                      required
                      maxLength={300}
                      placeholder="Briefly describe the operational process you are evaluating agentic systems for."
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB] transition-colors h-28 resize-none"
                      value={formData.useCase}
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    />
                    <div className="text-right text-[10px] text-white/30 uppercase tracking-tighter">
                      {formData.useCase.length}/300
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
                    <input
                      required
                      type="checkbox"
                      id="nda-check"
                      className="mt-1 accent-[#0047AB]"
                      checked={formData.ndaAcknowledged}
                      onChange={(e) => setFormData({ ...formData, ndaAcknowledged: e.target.checked })}
                    />
                    <label htmlFor="nda-check" className="text-[#A0A0A0] text-[13px] leading-relaxed cursor-pointer">
                      I acknowledge that access to anonymized logs and methodology documentation requires a mutual NDA.
                    </label>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            {!isSubmitted && (
              <footer className="sticky bottom-0 z-20 bg-[#0A0A0A] border-t border-white/5 p-6 md:px-8 md:py-6 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={cn(
                    "w-full font-bold text-sm md:text-base py-3.5 rounded-lg transition-all active:scale-[0.98]",
                    isFormValid 
                      ? "bg-[#0047AB] text-white shadow-[0_8px_20px_rgba(0,71,171,0.3)] hover:bg-[#0047AB]/90" 
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  )}
                >
                  Request Access
                </button>
                <p className="mt-3 text-[#A0A0A0] text-[10px] uppercase tracking-widest">
                  All shared operational logs are anonymized and sanitized
                </p>
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
