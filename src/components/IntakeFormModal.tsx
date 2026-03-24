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

const INDUSTRIES = ["Manufacturing", "Real Estate", "Retail", "Logistics", "Food & Beverage", "SaaS", "Financial Services", "Healthcare", "Construction", "Other"];
const COUNTRIES = ["India", "United States", "Germany", "France", "Spain", "UAE", "Other"];
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
      case 'Spain': return 'EUR';
      case 'UAE': return 'AED';
      default: return 'USD';
    }
  }, [formData.country]);

  const revenueRanges = useMemo(() => {
    if (currency === 'INR') return ["Under ₹10 Cr", "₹10 Cr – ₹50 Cr", "₹50 Cr – ₹200 Cr", "₹200 Cr+"];
    if (currency === 'USD') return ["Under $5M", "$5M – $25M", "$25M – $100M", "$100M+"];
    if (currency === 'EUR') return ["Under €5M", "€5M – €25M", "€25M – €100M", "€100M+"];
    if (currency === 'AED') return ["Under 20M AED", "20M – 100M AED", "100M – 400M AED", "400M+ AED"];
    return ["Under $5M", "$5M – $25M", "$25M – $100M", "$100M+"];
  }, [currency]);

  const budgetRanges = useMemo(() => {
    if (currency === 'INR') return ["Under ₹2L", "₹2L – ₹5L", "₹5L – ₹15L", "₹15L+"];
    if (currency === 'USD') return ["Under $10K", "$10K – $30K", "$30K – $100K", "$100K+"];
    if (currency === 'EUR') return ["Under €10K", "€10K – €30K", "€30K – €100K", "€100K+"];
    if (currency === 'AED') return ["Under 40K AED", "40K – 120K AED", "120K – 400K AED", "400K+ AED"];
    return ["Under $10K", "$10K – $30K", "$30K – $100K", "$100K+"];
  }, [currency]);

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

  const isStep1Valid = Boolean(formData.companyName && formData.industry && formData.country && formData.companySize);
  const isStep2Valid = Boolean(formData.operationalProcess && formData.weeklyTimeSpent);
  const isStep3Valid = Boolean(formData.companyRevenueRange && formData.estimatedBudgetRange);
  const isStep4Valid = Boolean(formData.budgetStatus && formData.approverRole && formData.impactArea);
  const isStep5Valid = Boolean(formData.fullName && formData.businessEmail && formData.roleTitle && formData.confirmationOfPilotInterest);

  const currentStepValid = () => {
    if (step === 1) return isStep1Valid;
    if (step === 2) return isStep2Valid;
    if (step === 3) return isStep3Valid;
    if (step === 4) return isStep4Valid;
    return isStep5Valid;
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
                <div className="flex items-center gap-3">
                  {step > 1 && !isSubmitted && (
                    <button onClick={prevStep} className="p-1 hover:bg-white/5 rounded-full text-white/60">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  <h2 className="font-headline text-lg md:text-xl text-white">
                    {isSubmitted ? "Assessment Received" : `Step ${step} of 5 — Operational Assessment`}
                  </h2>
                </div>
                {!isSubmitted && (
                  <div className="w-full bg-white/5 h-1 rounded-full mt-2">
                    <motion.div
                      className="bg-[#0047AB] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(step / 5) * 100}%` }}
                    />
                  </div>
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
                  <h3 className="text-white text-2xl font-bold">Assessment Received</h3>
                  <p className="text-[#A0A0A0] max-w-sm">
                    Our team will review your responses and respond within 48 hours with next steps.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white">Tell us about your organization</h3>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Company Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Official organization name"
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB]"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-white text-xs font-semibold uppercase tracking-wider">Industry</label>
                            <select
                              required
                              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                              value={formData.industry}
                              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            >
                              <option value="" disabled>Select industry</option>
                              {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-white text-xs font-semibold uppercase tracking-wider">Country</label>
                            <select
                              required
                              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            >
                              <option value="" disabled>Select country</option>
                              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Company Size</label>
                          <select
                            required
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                            value={formData.companySize}
                            onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                          >
                            <option value="" disabled>Select size</option>
                            {SIZES.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white">Which operational process is slowing your team down most?</h3>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Critical Process</label>
                          <select
                            required
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                            value={formData.operationalProcess}
                            onChange={(e) => setFormData({ ...formData, operationalProcess: e.target.value })}
                          >
                            <option value="" disabled>Select process</option>
                            {PROCESSES.map(p => <option key={p}>{p}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Weekly Time Spent</label>
                          <select
                            required
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                            value={formData.weeklyTimeSpent}
                            onChange={(e) => setFormData({ ...formData, weeklyTimeSpent: e.target.value })}
                          >
                            <option value="" disabled>Select range</option>
                            {TIME_SPENT.map(t => <option key={t}>{t}</option>)}
                          </select>
                          <p className="text-[11px] text-[#A0A0A0]">This helps us estimate potential operational impact.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white">Operational context</h3>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Estimated Annual Revenue ({currency})</label>
                          <select
                            required
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                            value={formData.companyRevenueRange}
                            onChange={(e) => setFormData({ ...formData, companyRevenueRange: e.target.value })}
                          >
                            <option value="" disabled>Select range</option>
                            {revenueRanges.map(r => <option key={r}>{r}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Estimated Budget ({currency})</label>
                          <select
                            required
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                            value={formData.estimatedBudgetRange}
                            onChange={(e) => setFormData({ ...formData, estimatedBudgetRange: e.target.value })}
                          >
                            <option value="" disabled>Select range</option>
                            {budgetRanges.map(b => <option key={b}>{b}</option>)}
                          </select>
                          <p className="text-[11px] text-[#A0A0A0]">This helps us scope the pilot appropriately.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white">Decision process</h3>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Budget Status</label>
                          <select
                            required
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                            value={formData.budgetStatus}
                            onChange={(e) => setFormData({ ...formData, budgetStatus: e.target.value })}
                          >
                            <option value="" disabled>Select status</option>
                            {BUDGET_STATUS.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Approver Role</label>
                          <input
                            required
                            type="text"
                            placeholder="Who approves tech initiatives?"
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB]"
                            value={formData.approverRole}
                            onChange={(e) => setFormData({ ...formData, approverRole: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Critical Outcome</label>
                          <select
                            required
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047AB] appearance-none"
                            value={formData.impactArea}
                            onChange={(e) => setFormData({ ...formData, impactArea: e.target.value })}
                          >
                            <option value="" disabled>Select outcome</option>
                            {OUTCOMES.map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white">Where should we send the pilot assessment?</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-white text-xs font-semibold uppercase tracking-wider">Full Name</label>
                            <input
                              required
                              type="text"
                              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB]"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-white text-xs font-semibold uppercase tracking-wider">Business Email</label>
                            <input
                              required
                              type="email"
                              className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB]"
                              value={formData.businessEmail}
                              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">Role / Title</label>
                          <input
                            required
                            type="text"
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB]"
                            value={formData.roleTitle}
                            onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-white text-xs font-semibold uppercase tracking-wider">LinkedIn Profile (optional)</label>
                          <input
                            type="url"
                            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#0047AB]"
                            value={formData.linkedInProfile}
                            onChange={(e) => setFormData({ ...formData, linkedInProfile: e.target.value })}
                          />
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
                          <input
                            required
                            type="checkbox"
                            id="pilot-confirm"
                            className="mt-1 accent-[#0047AB]"
                            checked={formData.confirmationOfPilotInterest}
                            onChange={(e) => setFormData({ ...formData, confirmationOfPilotInterest: e.target.checked })}
                          />
                          <label htmlFor="pilot-confirm" className="text-[#A0A0A0] text-[13px] leading-relaxed cursor-pointer">
                            I confirm this request relates to evaluating a potential operational pilot.
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {!isSubmitted && (
              <footer className="sticky bottom-0 z-20 bg-[#0A0A0A] border-t border-white/5 p-6 md:px-8 md:py-6 flex items-center justify-between">
                <div className="text-[10px] text-white/30 uppercase tracking-widest hidden md:block">
                  Secure Enterprise Assessment
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  {step < 5 ? (
                    <button
                      onClick={nextStep}
                      disabled={!currentStepValid()}
                      className={cn(
                        "flex-1 md:flex-none flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-lg transition-all",
                        currentStepValid()
                          ? "bg-[#0047AB] text-white hover:bg-[#0047AB]/90"
                          : "bg-white/5 text-white/20 cursor-not-allowed"
                      )}
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!currentStepValid() || isSubmitting}
                      className={cn(
                        "flex-1 md:flex-none flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-lg transition-all",
                        currentStepValid() && !isSubmitting
                          ? "bg-[#0047AB] text-white hover:bg-[#0047AB]/90"
                          : "bg-white/5 text-white/20 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? "Submitting..." : "Request Access"}
                      {!isSubmitting && <ChevronRight className="w-4 h-4" />}
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
