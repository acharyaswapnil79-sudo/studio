"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Download, ShieldCheck } from 'lucide-react';

interface FrameworkModalProps {
  isOpen: boolean;
  frameworkName: string;
  onClose: () => void;
}

export function FrameworkModal({ isOpen, frameworkName, onClose }: FrameworkModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const domain = email.split('@')[1];
    
    if (personalDomains.includes(domain)) {
      setError('Please use a business email address.');
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-[10px]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 bg-[#111] border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <div className="text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-[#0047AB]/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#0047AB]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-headline font-bold">Request Received</h3>
                    <p className="text-[#A0A0A0]">
                      The {frameworkName} has been sent to your business email.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-full bg-white/5 border border-white/10 py-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 text-[#0047AB] text-[10px] font-mono uppercase tracking-widest font-bold">
                      <ShieldCheck className="w-3 h-3" /> Professional Framework
                    </div>
                    <h3 className="text-2xl font-headline font-bold leading-tight">
                      Access the {frameworkName}
                    </h3>
                    <p className="text-[#A0A0A0] text-sm">
                      Enter your business details to receive the practitioner framework and deployment checklist.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <input 
                        required
                        type="text" 
                        placeholder="Full name"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#0047AB] focus:outline-none transition-colors"
                      />
                      <input 
                        required
                        type="email" 
                        placeholder="Business email"
                        className={`w-full bg-[#0A0A0A] border ${error ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-sm focus:border-[#0047AB] focus:outline-none transition-colors`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                      />
                      {error && <p className="text-red-500 text-[10px] font-mono">{error}</p>}
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          required
                          type="text" 
                          placeholder="Company"
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#0047AB] focus:outline-none transition-colors"
                        />
                        <input 
                          required
                          type="text" 
                          placeholder="Role"
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#0047AB] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#0047AB] text-white font-bold py-4 rounded-lg hover:bg-[#0047AB]/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Request Access
                    </button>
                  </form>

                  <p className="text-[10px] text-white/20 text-center font-mono uppercase tracking-widest">
                    Secure institutional access required
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
