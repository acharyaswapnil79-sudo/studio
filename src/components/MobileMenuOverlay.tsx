"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  activeSection: string;
  onOpenIntake: () => void;
}

export function MobileMenuOverlay({ isOpen, onClose, navLinks, activeSection, onOpenIntake }: MobileMenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col p-6"
        >
          <div className="flex justify-between items-center mb-16">
            <span className="text-[18px] font-semibold tracking-tighter text-[#F5F5F5] font-display">
              GreyShacks
            </span>
            <button 
              onClick={onClose}
              className="p-4 -mr-4 text-[#888888] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close mobile menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <div className="flex flex-col gap-10 mb-12">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-[28px] md:text-[32px] font-semibold font-display tracking-tight inline-block py-2",
                    activeSection === link.name.toLowerCase() ? "text-[#E8FF47]" : "text-[#F5F5F5]"
                  )}
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-auto"
          >
            <Button 
              onClick={() => {
                onClose();
                onOpenIntake();
              }}
              className="w-full h-16 bg-[#E8FF47] text-[#0A0A0A] font-semibold text-lg rounded-[8px]"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
