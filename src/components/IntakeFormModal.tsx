"use client"
import { useFirestore } from "@/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, ArrowLeft, Sparkles, ShieldCheck, BarChart3, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface IntakeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4 | 5;

const INDUSTRIES = ["Manufacturing", "Real Estate", "Logistics", "Healthcare", "Professional Services", "Other"];
const COUNTRIES = ["India", "United States", "Germany", "France", "Spain", "Ireland", "UK", "UAE", "Singapore", "Australia", "Canada", "Other"];
const SIZES = ["10–50 employees", "50–200 employees", "200–1000 employees", "1000+"];
const PROCESSES = ["Lead operations", "Sales follow-up", "Hiring & screening", "Accounts receivable", "Financial reporting", "Procurement", "Customer support", "Document management", "Compliance", "Other"];
const TIME_SPENT = ["Under 10 hours", "10–40 hours", "40–100 hours", "100+ hours"];
const BUDGET_STATUS = ["Allocated", "Planned", "Exploring"];
const IMPACT_AREAS = ["Revenue growth", "Cost reduction", "Speed", "Error reduction", "Compliance"];

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
      case 'Germany': case 'France': case 'Spain': case 'Ireland': case 'UK': return 'EUR';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const pilotRequestsRef = collection(firestore, 'pilot_requests');
    const newDocRef = doc(pilotRequestsRef);
    const payload = {
      ...formData,
      id: newDocRef.id,
      currency,
      submissionTimestamp: new Date().toISOString(),
      createdAt: serverTimestamp(),
      status: "new"
    };

    setDoc(newDocRef, payload)
      .then(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: newDocRef.path,
          operation: 'create',
          requestResourceData: payload
        }));
      });
  };

  const currentStepValid = () => {
    if (step === 1) return Boolean(formData.companyName && formData.industry && formData.country && formData.companySize);
    if (step === 2) return Boolean(formData.operationalProcess && formData.weeklyTimeSpent);
    if (step === 3) return Boolean(formData.companyRevenueRange && formData.estimatedBudgetRange);
    if (step === 4) return Boolean(formData.budgetStatus && formData.approverRole && formData.impactArea);
    return Boolean(formData.fullName && formData.businessEmail && formData.roleTitle && formData.confirmationOfPilotInterest);
  };

  const InputLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em] mb-2 block">{children}</label>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.98, y: 10 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 bg-[#0A0A0A] border border-white/10 flex flex-col shadow-2xl overflow-hidden",
              isMobile ? "w-full h-full rounded-none" : "w-full max-w-[640px] max-h-[90vh] rounded-2xl"
            )}
          >
            {/* Modal Header */}
            <header className="px-8 py-8 border-b border-white/5 flex items-center justify-between bg-[#0A0A0A]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#0445a4]" />
                </div>
                <div>
                  <h2 className="text-lg text-white font-bold tracking-tight">Operational Diagnostic</h2>
                  <p className="text-[11px] text-[#555] font-medium uppercase tracking-widest mt-0.5">Window {step} of 5</p>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full text-[#555] hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full space-y-8 py-12">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 rounded-full bg-[#0445a4]/10 border border-[#0445a4]/30 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[#0445a4]" />
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="text-3xl text-white font-bold tracking-tight">Assessment Recorded.</h3>
                    <p className="text-[#888] max-w-sm mx-auto leading-relaxed">
                      Our institutional review team will analyze your operational metadata. Expect a structured diagnostic proposal within 48 hours.
                    </p>
                  </div>
                  <button onClick={onClose} className="bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#0445a4] hover:text-white transition-all shadow-xl">
                    Return to Command Center
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Step Progress */}
                  <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(step / 5) * 100}%` }}
                      className="absolute left-0 top-0 h-full bg-[#0445a4] shadow-[0_0_15px_rgba(4,69,164,0.5)]"
                    />
                  </div>

                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                      <div className="space-y-2">
                        <h3 className="text-2xl text-white font-bold tracking-tight">Organization Profile</h3>
                        <p className="text-sm text-[#666]">Provide the foundational context for your diagnostic.</p>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <InputLabel>Official Company Name</InputLabel>
                          <input
                            type="text"
                            placeholder="e.g. Acme Corp"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-[#333] focus:outline-none focus:border-[#0445a4] focus:bg-[#0445a4]/5 transition-all"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <InputLabel>Primary Industry</InputLabel>
                            <select
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4] appearance-none"
                              value={formData.industry}
                              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            >
                              <option value="" disabled className="bg-[#0A0A0A]">Select sector</option>
                              {INDUSTRIES.map(i => <option key={i} className="bg-[#0A0A0A]">{i}</option>)}
                            </select>
                          </div>
                          <div>
                            <InputLabel>Region of Operation</InputLabel>
                            <select
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4] appearance-none"
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            >
                              <option value="" disabled className="bg-[#0A0A0A]">Select country</option>
                              {COUNTRIES.map(c => <option key={c} className="bg-[#0A0A0A]">{c}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <InputLabel>Approximate Team Size</InputLabel>
                          <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4] appearance-none"
                            value={formData.companySize}
                            onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                          >
                            <option value="" disabled className="bg-[#0A0A0A]">Headcount range</option>
                            {SIZES.map(s => <option key={s} className="bg-[#0A0A0A]">{s}</option>)}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                      <div className="space-y-2">
                        <h3 className="text-2xl text-white font-bold tracking-tight">Operational Bottleneck</h3>
                        <p className="text-sm text-[#666]">Identify the high-friction workflow for the initial pilot.</p>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <InputLabel>Target Critical Process</InputLabel>
                          <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4] appearance-none"
                            value={formData.operationalProcess}
                            onChange={(e) => setFormData({ ...formData, operationalProcess: e.target.value })}
                          >
                            <option value="" disabled className="bg-[#0A0A0A]">Select workflow</option>
                            {PROCESSES.map(p => <option key={p} className="bg-[#0A0A0A]">{p}</option>)}
                          </select>
                        </div>
                        <div>
                          <InputLabel>Estimated Weekly Manual Latency</InputLabel>
                          <div className="grid grid-cols-1 gap-3">
                            {TIME_SPENT.map(t => (
                              <button
                                key={t}
                                onClick={() => setFormData({ ...formData, weeklyTimeSpent: t })}
                                className={cn(
                                  "w-full text-left px-6 py-4 rounded-xl border transition-all text-sm font-medium",
                                  formData.weeklyTimeSpent === t 
                                    ? "bg-[#0445a4]/10 border-[#0445a4] text-white" 
                                    : "bg-white/5 border-white/10 text-[#888] hover:border-white/20"
                                )}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                      <div className="space-y-2">
                        <h3 className="text-2xl text-white font-bold tracking-tight">Economic Scale</h3>
                        <p className="text-sm text-[#666]">Financial context used to calculate potential ROI deltas.</p>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <InputLabel>Annual Revenue Range ({currency})</InputLabel>
                          <input
                            type="text"
                            placeholder="Estimated annual revenue"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4]"
                            value={formData.companyRevenueRange}
                            onChange={(e) => setFormData({ ...formData, companyRevenueRange: e.target.value })}
                          />
                        </div>
                        <div>
                          <InputLabel>Estimated Solution Budget ({currency})</InputLabel>
                          <input
                            type="text"
                            placeholder="Target budget for this initiative"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4]"
                            value={formData.estimatedBudgetRange}
                            onChange={(e) => setFormData({ ...formData, estimatedBudgetRange: e.target.value })}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                      <div className="space-y-2">
                        <h3 className="text-2xl text-white font-bold tracking-tight">Decision Parameters</h3>
                        <p className="text-sm text-[#666]">Who authorizes this deployment and what is the primary objective?</p>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <InputLabel>Budget Status</InputLabel>
                          <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4] appearance-none"
                            value={formData.budgetStatus}
                            onChange={(e) => setFormData({ ...formData, budgetStatus: e.target.value })}
                          >
                            <option value="" disabled className="bg-[#0A0A0A]">Select status</option>
                            {BUDGET_STATUS.map(s => <option key={s} className="bg-[#0A0A0A]">{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <InputLabel>Internal Approver Role</InputLabel>
                          <input
                            type="text"
                            placeholder="e.g. CFO, COO, Head of Ops"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4]"
                            value={formData.approverRole}
                            onChange={(e) => setFormData({ ...formData, approverRole: e.target.value })}
                          />
                        </div>
                        <div>
                          <InputLabel>Primary Impact Objective</InputLabel>
                          <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4] appearance-none"
                            value={formData.impactArea}
                            onChange={(e) => setFormData({ ...formData, impactArea: e.target.value })}
                          >
                            <option value="" disabled className="bg-[#0A0A0A]">Desired outcome</option>
                            {IMPACT_AREAS.map(i => <option key={i} className="bg-[#0A0A0A]">{i}</option>)}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                      <div className="space-y-2">
                        <h3 className="text-2xl text-white font-bold tracking-tight">Contact Verification</h3>
                        <p className="text-sm text-[#666]">Complete your assessment to receive the diagnostic brief.</p>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <InputLabel>Full Name</InputLabel>
                            <input
                              type="text"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4]"
                              value={formData.fullName}
                              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            />
                          </div>
                          <div>
                            <InputLabel>Professional Role</InputLabel>
                            <input
                              type="text"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4]"
                              value={formData.roleTitle}
                              onChange={(e) => setFormData({...formData, roleTitle: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <InputLabel>Business Email Address</InputLabel>
                          <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0445a4]"
                            value={formData.businessEmail}
                            onChange={(e) => setFormData({...formData, businessEmail: e.target.value})}
                          />
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0445a4]/5 border border-[#0445a4]/20 flex items-start gap-4">
                          <div className="pt-1">
                            <input 
                              type="checkbox" 
                              id="confirm"
                              className="w-5 h-5 accent-[#0445a4] cursor-pointer"
                              checked={formData.confirmationOfPilotInterest}
                              onChange={(e) => setFormData({...formData, confirmationOfPilotInterest: e.target.checked})}
                            />
                          </div>
                          <label htmlFor="confirm" className="text-sm text-[#888] leading-relaxed cursor-pointer select-none">
                            I confirm this is a production-level enquiry for evaluation of agentic systems. GreyShacks will handle this data under institutional confidentiality.
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!isSubmitted && (
              <footer className="px-8 py-8 border-t border-white/5 bg-[#0A0A0A] flex items-center justify-between">
                <div className="flex gap-4">
                  {step > 1 && (
                    <button onClick={prevStep} className="flex items-center gap-2 text-xs font-bold text-[#555] uppercase tracking-widest hover:text-white transition-colors py-3 px-4">
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
                        "flex items-center gap-2 px-10 py-4 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all shadow-lg",
                        currentStepValid() ? "bg-white text-black hover:bg-[#0445a4] hover:text-white" : "bg-white/5 text-[#333] cursor-not-allowed border border-white/5"
                      )}
                    >
                      Next Window <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!currentStepValid() || isSubmitting}
                      className={cn(
                        "flex items-center gap-2 px-10 py-4 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all shadow-xl",
                        currentStepValid() && !isSubmitting ? "bg-[#0445a4] text-white shadow-[#0445a4]/20" : "bg-white/5 text-[#333] cursor-not-allowed border border-white/5"
                      )}
                    >
                      {isSubmitting ? "Recording..." : "Finalize Assessment"}
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
