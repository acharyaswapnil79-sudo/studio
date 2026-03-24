
"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  activeSection: string;
  handleNavClick: (e: React.MouseEvent, href: string) => void;
  onOpenIntake: () => void;
}

export function MobileMenuOverlay({ isOpen, onClose, navLinks, activeSection, handleNavClick, onOpenIntake }: MobileMenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="fixed inset-0 z-[200] bg-[rgba(8,8,8,0.97)] backdrop-blur-[20px] flex flex-col items-center justify-center"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-white/70"
            aria-label="Close mobile menu"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center w-full px-8">
            {navLinks.map((link, i) => (
              <React.Fragment key={link.href}>
                {link.href.startsWith('/#') || link.href.startsWith('#') ? (
                  <motion.a
                    href={link.href}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.06 + i * 0.08 }}
                    className={cn(
                      "w-full text-center py-[18px] border-b border-white/5 font-headline font-medium text-[28px] transition-colors",
                      activeSection === link.href.replace('/#', '').replace('#', '') ? "text-white" : "text-white/80 hover:text-white"
                    )}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      onClose();
                    }}
                  >
                    {link.name}
                  </motion.a>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "w-full text-center py-[18px] border-b border-white/5 font-headline font-medium text-[28px] transition-colors",
                      (activeSection === link.href.replace('/', '') || (activeSection === 'intelligence' && link.href.includes('intelligence'))) ? "text-white" : "text-white/80 hover:text-white"
                    )}
                    onClick={onClose}
                  >
                    <motion.span
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.06 + i * 0.08 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                )}
              </React.Fragment>
            ))}
            
            <motion.button
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.46 }}
              onClick={() => {
                onOpenIntake();
                onClose();
              }}
              className="mt-8 w-full max-w-[280px] bg-[#0047AB] text-white font-bold text-[14.5px] py-3.5 rounded-[7px] shadow-xl"
            >
              Request an Operational Diagnostic
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
