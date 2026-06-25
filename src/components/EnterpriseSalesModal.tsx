"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, MessageSquare, ShieldCheck, Clock, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface EnterpriseSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOOLS = [
  "Gmail + Google Workspace",
  "Microsoft 365",
  "Slack",
  "Notion",
  "Salesforce",
  "WhatsApp Business",
  "Custom internal tools"
];

const REQUIREMENTS = [
  "SSO / SAML Authentication",
  "Advanced Security & Compliance",
  "Custom Integrations",
  "Dedicated Support / SLAs",
  "On-premise or Private Cloud Deployment",
  "Data Residency Requirements"
];

export function EnterpriseSalesModal({ isOpen, onClose }: EnterpriseSalesModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pt-4 first:pt-0">
      <div className="w-8 h-8 rounded-lg bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#0445a4]" />
      </div>
      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/40">{title}</h3>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[#0A0A0A] border border-white/5 rounded-none md:rounded-[40px] shadow-2xl overflow-hidden h-full md:h-auto md:max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-[#555] hover:text-white transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <ScrollArea className="h-full max-h-[100vh] md:max-h-[90vh]">
              <div className="p-8 md:p-16">
                {isSubmitted ? (
                  <div className="py-24 text-center space-y-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-[#0445a4]/10 border border-[#0445a4]/30 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-12 h-12 text-[#0445a4]" />
                    </motion.div>
                    <div className="space-y-4">
                      <h3 className="text-4xl font-bold text-white tracking-tight leading-tight">Inquiry Received.</h3>
                      <p className="text-[#888] max-w-md mx-auto leading-relaxed text-lg">
                        Our Enterprise Architecture team is reviewing your requirements. We will reach out within 24 hours to schedule a technical briefing.
                      </p>
                    </div>
                    <Button 
                      onClick={onClose}
                      className="bg-white text-black hover:bg-[#0445a4] hover:text-white rounded-full px-12 py-8 font-bold uppercase tracking-widest text-xs transition-all"
                    >
                      Close Window
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-16">
                      <div className="w-14 h-14 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center mb-8">
                        <MessageSquare className="w-7 h-7 text-[#0445a4]" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6">Talk to Enterprise Sales</h2>
                      <p className="text-[#888] text-lg leading-relaxed max-w-xl">
                        This form helps us understand your needs so we can prepare properly for our meeting and make the best use of your time. Please share as much detail as you’re comfortable with.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                      {/* 1. Contact Information */}
                      <div className="space-y-8">
                        <SectionHeader icon={Users} title="1. Contact Information" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Full Name</Label>
                            <Input required placeholder="Alex Rivera" className="bg-white/5 border-white/10 h-14 rounded-xl text-white focus:border-[#0445a4]" />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Work Email</Label>
                            <Input required type="email" placeholder="name@company.com" className="bg-white/5 border-white/10 h-14 rounded-xl text-white focus:border-[#0445a4]" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Phone Number</Label>
                          <Input required type="tel" placeholder="+1 (555) 000-0000" className="bg-white/5 border-white/10 h-14 rounded-xl text-white focus:border-[#0445a4]" />
                        </div>
                      </div>

                      {/* 2. Company Information */}
                      <div className="space-y-8">
                        <SectionHeader icon={Building2} title="2. Company Information" />
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Company Name</Label>
                          <Input required placeholder="Enterprise Corp" className="bg-white/5 border-white/10 h-14 rounded-xl text-white focus:border-[#0445a4]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Company Size</Label>
                            <Select required>
                              <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-xl text-white">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#111] border-white/10 text-white">
                                <SelectItem value="50-200">50 – 200 employees</SelectItem>
                                <SelectItem value="201-1000">201 – 1000 employees</SelectItem>
                                <SelectItem value="1001-5000">1001 – 5000 employees</SelectItem>
                                <SelectItem value="5000+">5000+ employees</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Industry</Label>
                            <Select required>
                              <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-xl text-white">
                                <SelectValue placeholder="Select sector" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#111] border-white/10 text-white">
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="Healthcare">Healthcare</SelectItem>
                                <SelectItem value="Consulting">Consulting</SelectItem>
                                <SelectItem value="E-commerce">E-commerce</SelectItem>
                                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* 3. Usage & Requirements */}
                      <div className="space-y-8">
                        <SectionHeader icon={ShieldCheck} title="3. Usage & Requirements" />
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Estimated Number of Users</Label>
                          <Input required type="number" placeholder="e.g. 250" className="bg-white/5 border-white/10 h-14 rounded-xl text-white focus:border-[#0445a4]" />
                        </div>
                        
                        <div className="space-y-4">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Primary Current Tools</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {TOOLS.map((tool) => (
                              <div key={tool} className="flex items-center space-x-3 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-[#0445a4]/30 transition-colors group cursor-pointer">
                                <Checkbox id={tool} className="border-white/20 data-[state=checked]:bg-[#0445a4]" />
                                <label htmlFor={tool} className="text-sm text-white/70 group-hover:text-white cursor-pointer select-none">{tool}</label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 pt-4">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Core Use Case / Main Challenge</Label>
                          <Textarea 
                            required 
                            placeholder="What are you trying to solve? (e.g., losing context across tools, slow decision making, scattered knowledge, manual approvals, etc.)" 
                            className="bg-white/5 border-white/10 rounded-xl min-h-[120px] text-white focus:border-[#0445a4]"
                          />
                        </div>

                        <div className="space-y-4 pt-4">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Key Requirements</Label>
                          <div className="space-y-3">
                            {REQUIREMENTS.map((req) => (
                              <div key={req} className="flex items-center space-x-3">
                                <Checkbox id={req} className="border-white/20 data-[state=checked]:bg-[#0445a4]" />
                                <label htmlFor={req} className="text-sm text-white/60 cursor-pointer select-none">{req}</label>
                              </div>
                            ))}
                            <div className="flex flex-col space-y-2 pt-2">
                              <label className="text-[10px] font-bold text-white/20 uppercase">Other (please specify)</label>
                              <Input className="bg-white/5 border-white/10 h-12 rounded-lg text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4. Timeline & Next Steps */}
                      <div className="space-y-8">
                        <SectionHeader icon={Clock} title="4. Timeline & Next Steps" />
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">When are you looking to implement?</Label>
                          <Select required>
                            <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-xl text-white">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#111] border-white/10 text-white">
                              <SelectItem value="1month">Within 1 month</SelectItem>
                              <SelectItem value="3months">1 – 3 months</SelectItem>
                              <SelectItem value="6months">3 – 6 months</SelectItem>
                              <SelectItem value="exploring">Just exploring / Not urgent yet</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Additional Information (Optional)</Label>
                          <Textarea 
                            placeholder="Anything else we should know before our meeting?" 
                            className="bg-white/5 border-white/10 rounded-xl min-h-[100px] text-white focus:border-[#0445a4]"
                          />
                        </div>
                      </div>

                      <div className="pt-8">
                        <Button 
                          disabled={loading}
                          type="submit"
                          className="w-full bg-[#0445a4] hover:bg-[#0445a4]/90 text-white py-10 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs shadow-2xl shadow-[#0445a4]/20 transition-all group"
                        >
                          {loading ? "Transmitting..." : "Submit Inquiry"}
                          <Send className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Button>
                        <p className="text-center text-[10px] text-[#444] uppercase tracking-widest mt-6">
                          Institutional Privacy Policy Applies · 256-bit Encrypted Transmission
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}