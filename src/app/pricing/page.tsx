"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { EnterpriseSalesModal } from '@/components/EnterpriseSalesModal';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isSalesOpen, setIsSalesOpen] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/ forever",
      description: "Perfect for individuals who want to experience GreyShacks",
      features: [
        "1 user",
        "Smart memory that remembers your recent work",
        "Connect Gmail and Google Drive",
        "Generous AI assistance for daily work",
        "Community support & resources",
        "Full access to core features"
      ],
      cta: "Get Started Free",
      href: "/signup",
      icon: Sparkles
    },
    {
      name: "Pro",
      price: billingCycle === 'annual' ? "$79" : "$99",
      period: "/ user / month",
      description: "For professionals and teams who want the full power of GreyShacks",
      recommended: true,
      features: [
        "Unlimited memory — never lose context",
        "Full Ontology — your team’s shared brain",
        "All connectors (Gmail, Drive, Sheets, WhatsApp Business)",
        "High usage of intelligent requests included",
        "Priority support with fast response times",
        "Early access to new features",
        "Advanced search & proactive insights"
      ],
      cta: "Start 14-day free trial",
      href: "/signup",
      icon: Zap
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For growing teams that need security, scale and dedicated support",
      features: [
        "Everything in Pro",
        "SSO, SAML & advanced security controls",
        "Dedicated account manager + SLAs",
        "Custom integrations and workflows",
        "Volume discounts available",
        "Onboarding support and team training"
      ],
      cta: "Talk to Sales",
      action: () => setIsSalesOpen(true),
      icon: ShieldCheck
    }
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen selection:bg-[#0445a4]/30">
      <Navbar onOpenIntake={() => {}} activeSection="pricing" />
      
      <main className="pt-32 md:pt-48 pb-24 px-6">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[40px] md:text-[72px] font-bold text-white tracking-tighter leading-[1] mb-8"
            >
              Simple, Transparent <br />
              <span className="text-white/40 italic">Pricing.</span>
            </motion.h1>
            
            {/* Billing Toggle */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-4"
            >
              <span className={cn("text-sm font-medium transition-colors", billingCycle === 'monthly' ? "text-white" : "text-[#444]")}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-14 h-7 rounded-full bg-white/5 border border-white/10 p-1 relative flex items-center"
              >
                <motion.div 
                  animate={{ x: billingCycle === 'annual' ? 28 : 0 }}
                  className="w-5 h-5 rounded-full bg-[#0445a4] shadow-lg shadow-[#0445a4]/40"
                />
              </button>
              <span className={cn("text-sm font-medium transition-colors", billingCycle === 'annual' ? "text-white" : "text-[#444]")}>Annual</span>
              <span className="ml-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                Save 20%
              </span>
            </motion.div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-24">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className={cn(
                  "relative bg-[#111] border rounded-[32px] p-10 flex flex-col h-full hover:border-white/20 transition-all duration-500",
                  plan.recommended ? "border-[#0445a4] shadow-2xl shadow-[#0445a4]/10 scale-105 z-10" : "border-white/5"
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0445a4] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full">
                    Recommended
                  </div>
                )}

                <div className="mb-10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <plan.icon className={cn("w-5 h-5", plan.recommended ? "text-[#0445a4]" : "text-[#555]")} />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">{plan.price}</span>
                    <span className="text-sm font-medium text-[#444] uppercase tracking-widest">{plan.period}</span>
                  </div>
                  <p className="text-sm text-[#666] leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-5 mb-12 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-[#0445a4]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#0445a4]" />
                      </div>
                      <span className="text-sm text-[#888] leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.action ? (
                  <Button 
                    onClick={plan.action}
                    variant="outline"
                    className="w-full py-7 bg-transparent border-white/10 hover:border-white/40 text-white rounded-2xl font-bold uppercase tracking-widest text-xs"
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Link href={plan.href}>
                    <Button className={cn(
                      "w-full py-7 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl transition-all group",
                      plan.recommended 
                        ? "bg-[#0445a4] text-white hover:bg-[#0445a4]/90 shadow-[#0445a4]/20" 
                        : "bg-white text-black hover:bg-[#0445a4] hover:text-white"
                    )}>
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center space-y-4">
            <p className="text-[11px] text-[#444] font-medium uppercase tracking-[0.25em]">
              Annual billing saves you 20%. Usage overages are billed transparently at published rates.
            </p>
          </div>
        </div>
      </main>

      <Footer onOpenIntake={() => {}} />
      <EnterpriseSalesModal isOpen={isSalesOpen} onClose={() => setIsSalesOpen(false)} />
    </div>
  );
}
