"use client"
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface IntakeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4 | 5;

const INDUSTRIES = ["Manufacturing", "Real Estate", "Logistics", "Healthcare", "Professional Services", "Other"];
const COUNTRIES = ["India", "United States", "Germany", "France", "Spain", "Ireland", "UK", "UAE", "Singapore", "Australia", "Canada", "Other"];
const SIZES = ["10–50 employees", "50–200 employees", "200–1000 employees", "1000+"];
const PROCESSES = ["Lead operations", "Sales follow-up", "Hiring & candidate screening", "Accounts receivable", "Financial reporting", "Procurement & vendor coordination", "Customer query resolution", "Contract/document management", "Compliance tracking", "Other"];
const TIME_SPENT = ["Under 10 hours", "10–40 hours", "40–100 hours", "100+ hours"];
const BUDGET_STATUS = ["Budget already allocated", "Budget planned", "Exploring options"];
const OUTCOMES = ["Revenue growth", "Cost reduction", "Faster operations", "Error reduction", "Compliance", "Team productivity"];

export function IntakeFormModal({ isOpen, onClose }: IntakeFormModalProps) {
  const isMobile = useIsMobile();
  const firestore = useFirestore();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    country: '',
    companySize: '',
    operationalProcess: '',
    weeklyTimeSpent: '',
    companyRevenueRange: '',
    estimatedBudgetRange: '',
    budgetStatus: '',
    approverRole: '',
    impactArea: '',
    fullName: '',
    businessEmail: '',
    roleTitle: '',
    linkedInProfile: '',
    confirmationOfPilotInterest: false
  });

  const currency = useMemo(() => {
    switch (formData.country) {
      case 'India': return 'INR';
      case 'United States': return 'USD';
      case 'Germany':
      case 'France':
      case 'Spain':
      case 'Ireland':
      case 'UK': return 'EUR';
      case 'UAE': return 'AED';
      case 'Singapore': return 'SGD';
      case 'Australia': return 'AUD';
      case 'Canada': return 'CAD';
      default: return 'USD';
    }
  }, [formData.country]);

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

  const nextStep = () => setStep(s => Math.min(s + 1, 5) as Step);
  const prevStep = () => setStep(s => Math.max(s - 1, 1) as Step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const pilotRequestsRef = collection(firestore, 'pilot_requests');
      const newDocRef = doc(pilotRequestsRef);
      const payload = {
        ...formData,
        id: newDocRef.id,
        currency,
        createdAt: serverTimestamp(),
        status: "new"
      };

      await setDoc(newDocRef, payload);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting pilot request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepValid = () => {
    if (step === 1) return Boolean(formData.companyName && formData.industry && formData.country && formData.companySize);
    if (step === 2) return Boolean(formData.operationalProcess && formData.weeklyTimeSpent);
    if (step === 3) return Boolean(formData.companyRevenueRange && formData.estimatedBudgetRange);
    if (step === 4) return Boolean(formData.budgetStatus && formData.approverRole && formData.impactArea);
    return Boolean(formData.fullName && formData.businessEmail && formData.roleTitle && formData.confirmationOfPilotInterest);
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
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.98 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "relative z-10 bg-[#111] border border-[#222] flex flex-col shadow-2xl overflow-hidden",
              isMobile ? "w-full h-full rounded-none" : "w-full max-w-[600px] max-h-[90vh] rounded-[4px]"
            )}
          >
            {/* Header */}
            <header className="px-8 py-8 border-b border-[#222] flex items-center justify-between">
              <div>
                <h2 className="text-xl text-[#F5F5F5] font-display">Operational Assessment</h2>
                <div className="text-[11px] text-[#888] uppercase tracking-widest mt-1">Step {step} of 5 — diagnostic window</div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#1A1A1A] rounded-[2px] text-[#888] hover:text-[#F5F5F5] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#0A0A0A]">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full space-y-6">
                  <div className="w-12 h-12 rounded-full border border-[#0445a4] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[#0445a4]" />
                  </div>
                  <h3 className="text-2xl text-[#F5F5F5] font-display">Diagnostic Recorded.</h3>
                  <p className="text-[#888] max-w-sm leading-relaxed">
                    Our team will review your operational data and provide a diagnostic proposal within 48 hours.
                  </p>
                  <button onClick={onClose} className="bg-[#111] border border-[#222] text-[#F5F5F5] px-8 py-3 rounded-[2px] text-xs font-bold uppercase tracking-widest hover:border-[#0445a4]/30 transition-all">
                    Return to Commander
                  </button>
                </div>
              ) : (
                <div className="space-y-10">
                  {/* Step Progress Line */}
                  <div className="h-0.5 w-full bg-[#1A1A1A]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(step / 5) * 100}%` }}
                      className="h-full bg-[#0445a4] accent-glow"
                    />
                  </div>

                  {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                      <h3 className="text-3xl text-[#F5F5F5] font-display leading-[1.1]">Tell us about your organization.</h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[11px] text-[#888] uppercase tracking-widest">Company Name</label>
                          <input
                            type="text"
                            placeholder="Official name"
                            className="w-full bg-[#111] border border-[#222] rounded-[2px] px-4 py-4 text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#0445a4] transition-all"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] text-[#888] uppercase tracking-widest">Industry</label>
                            <select
                              className="w-full bg-[#111] border border-[#222] rounded-[2px] px-4 py-4 text-[#F5F5F5] focus:outline-none focus:border-[#0445a4] appearance-none"
                              value={formData.industry}
                              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            >
                              <option value="" disabled>Select sector</option>
                              {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] text-[#888] uppercase tracking-widest">Country</label>
                            <select
                              className="w-full bg-[#111] border border-[#222] rounded-[2px] px-4 py-4 text-[#F5F5F5] focus:outline-none focus:border-[#0445a4] appearance-none"
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            >
                              <option value="" disabled>Select region</option>
                              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                      <h3 className="text-3xl text-[#F5F5F5] font-display leading-[1.1]">Identify the primary bottleneck.</h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[11px] text-[#888] uppercase tracking-widest">Critical Process</label>
                          <select
                            className="w-full bg-[#111] border border-[#222] rounded-[2px] px-4 py-4 text-[#F5F5F5] focus:outline-none focus:border-[#0445a4] appearance-none"
                            value={formData.operationalProcess}
                            onChange={(e) => setFormData({ ...formData, operationalProcess: e.target.value })}
                          >
                            <option value="" disabled>Select workflow</option>
                            {PROCESSES.map(p => <option key={p}>{p}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] text-[#888] uppercase tracking-widest">Weekly Manual Latency</label>
                          <select
                            className="w-full bg-[#111] border border-[#222] rounded-[2px] px-4 py-4 text-[#F5F5F5] focus:outline-none focus:border-[#0445a4] appearance-none"
                            value={formData.weeklyTimeSpent}
                            onChange={(e) => setFormData({ ...formData, weeklyTimeSpent: e.target.value })}
                          >
                            <option value="" disabled>Hours spent per week</option>
                            {TIME_SPENT.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {step > 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                       <p className="text-[#888] italic text-sm">Step {step} content continuation... </p>
                       <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Contact information"
                          className="w-full bg-[#111] border border-[#222] rounded-[2px] px-4 py-4 text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#0445a4]"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                        <input
                          type="email"
                          placeholder="Professional email"
                          className="w-full bg-[#111] border border-[#222] rounded-[2px] px-4 py-4 text-[#F5F5F5] placeholder:text-[#444] focus:outline-none focus:border-[#0445a4]"
                          value={formData.businessEmail}
                          onChange={(e) => setFormData({...formData, businessEmail: e.target.value})}
                        />
                         <div className="flex items-center gap-3 pt-4">
                          <input 
                            type="checkbox" 
                            id="confirm"
                            className="accent-[#0445a4]"
                            checked={formData.confirmationOfPilotInterest}
                            onChange={(e) => setFormData({...formData, confirmationOfPilotInterest: e.target.checked})}
                          />
                          <label htmlFor="confirm" className="text-[12px] text-[#888]">I confirm this is a production-level enquiry.</label>
                        </div>
                       </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {!isSubmitted && (
              <footer className="px-8 py-8 border-t border-[#222] bg-[#111] flex items-center justify-between">
                <div className="flex gap-4">
                  {step > 1 && (
                    <button onClick={prevStep} className="flex items-center gap-2 text-xs font-bold text-[#888] uppercase tracking-widest hover:text-[#F5F5F5] transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                </div>
                <div className="flex gap-4">
                  {step < 5 ? (
                    <button
                      onClick={nextStep}
                      disabled={!currentStepValid()}
                      className={cn(
                        "flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-[2px] transition-all",
                        currentStepValid() ? "bg-[#F5F5F5] text-[#0A0A0A] hover:bg-[#0445a4] hover:text-white" : "bg-[#222] text-[#444] cursor-not-allowed"
                      )}
                    >
                      Next Window <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!currentStepValid() || isSubmitting}
                      className={cn(
                        "flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-[2px] transition-all",
                        currentStepValid() && !isSubmitting ? "bg-[#0445a4] text-white accent-glow" : "bg-[#222] text-[#444] cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? "Recording..." : "Finalize Diagnostic"}
                    </button>
                  )}
                </div>
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}