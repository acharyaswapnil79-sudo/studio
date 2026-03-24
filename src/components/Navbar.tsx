"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  isScrolled: boolean;
  navLinks: NavLink[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  handleNavClick: (e: React.MouseEvent, href: string) => void;
  onOpenIntake: () => void;
}

export function Navbar({ isScrolled, navLinks, mobileMenuOpen, setMobileMenuOpen, activeSection, handleNavClick, onOpenIntake }: NavbarProps) {
  return (
    <motion.nav
      initial={{ top: 24 }}
      animate={{ 
        top: isScrolled ? 12 : 24,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed left-0 right-0 z-50 flex justify-center w-full px-4 md:px-8"
    >
      <div className={cn(
        "flex items-center justify-between w-full max-w-[1240px] px-6 md:px-8 transition-all duration-300 rounded-[14px] h-[68px] overflow-visible",
        isScrolled ? "bg-[rgba(15,15,15,0.72)] backdrop-blur-[12px] saturate-[180%] border-b border-[rgba(255,255,255,0.07)] border-l border-[rgba(255,255,255,0.04)] border-r border-[rgba(255,255,255,0.04)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent border-transparent"
      )}>
        <div className="flex items-center shrink-0">
          <Link href="/" className="font-headline font-bold text-lg text-white">GreyShacks</Link>
        </div>

        <div className="hidden md:flex items-center gap-[22px] lg:gap-[34px] mx-4">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group py-2">
              {link.href.startsWith('/#') || link.href.startsWith('#') ? (
                <a 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-label={`Scroll to ${link.name} section`}
                  className={cn(
                    "text-[13px] lg:text-[13.5px] tracking-wider transition-colors duration-[0.18s] whitespace-nowrap",
                    activeSection === link.href.replace('/#', '').replace('#', '') ? "text-white" : "text-[#888888] hover:text-white"
                  )}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "text-[13px] lg:text-[13.5px] tracking-wider transition-colors duration-[0.18s] whitespace-nowrap",
                    (activeSection === link.href.replace('/', '') || (activeSection === 'intelligence' && link.href.includes('intelligence'))) ? "text-white" : "text-[#888888] hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              )}
              <motion.div 
                className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-white w-5 transition-opacity",
                  (activeSection === link.href.replace('/#', '').replace('#', '') || activeSection === link.href.replace('/', '') || (activeSection === 'intelligence' && link.href.includes('intelligence'))) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (activeSection === link.href.replace('/#', '').replace('#', '') || activeSection === link.href.replace('/', '') || (activeSection === 'intelligence' && link.href.includes('intelligence'))) ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </div>
          ))}
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col justify-center gap-[5px] w-[32px] h-[32px] items-end"
            aria-label="Toggle mobile menu"
          >
            <motion.div 
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
            <motion.div 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
            <motion.div 
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-white/75 rounded-full" 
            />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}