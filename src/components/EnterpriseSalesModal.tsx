"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface EnterpriseSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
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
            className="relative w-full max-w-2xl bg-[#111] border border-white/5 rounded-[32px] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-[#555] hover:text-white transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-[#0445a4]/10 border border-[#0445a4]/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-[#0445a4]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-white tracking-tight">Request Received</h3>
                    <p className="text-[#888] max-w-md mx-auto leading-relaxed">
                      Our enterprise solutions team is reviewing your requirements. We will reach out within 24 hours to schedule a brief technical overview.
                    </p>
                  </div>
                  <Button 
                    onClick={onClose}
                    className="bg-white text-black hover:bg-[#0445a4] hover:text-white rounded-full px-10 py-6"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center mb-6">
                      <MessageSquare className="w-6 h-6 text-[#0445a4]" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Talk to Enterprise Sales</h2>
                    <p className="text-[#888] leading-relaxed">
                      This form helps us understand your needs so we can prepare properly for our meeting and make the best use of your time.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-[#444]">Work Email</Label>
                        <Input required type="email" placeholder="name@company.com" className="bg-black/40 border-white/10 h-14 rounded-xl text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-[#444]">Company Size</Label>
                        <Select required>
                          <SelectTrigger className="bg-black/40 border-white/10 h-14 rounded-xl text-white">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#111] border-white/10 text-white">
                            <SelectItem value="50-200">50 - 200 employees</SelectItem>
                            <SelectItem value="200-1000">200 - 1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-[#444]">Estimated Users</Label>
                        <Input required type="number" placeholder="e.g. 50" className="bg-black/40 border-white/10 h-14 rounded-xl text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-[#444]">Primary Current Tool</Label>
                        <Input required placeholder="e.g. Salesforce, SAP" className="bg-black/40 border-white/10 h-14 rounded-xl text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-[#444]">Core Use Case</Label>
                      <Textarea 
                        required 
                        placeholder="Describe the operational workflows you want to automate..." 
                        className="bg-black/40 border-white/10 rounded-xl min-h-[120px] text-white"
                      />
                    </div>

                    <Button 
                      disabled={loading}
                      type="submit"
                      className="w-full bg-[#0445a4] hover:bg-[#0445a4]/90 text-white py-8 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-2xl shadow-[#0445a4]/20 transition-all group"
                    >
                      {loading ? "Sending..." : "Submit Inquiry"}
                      <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
