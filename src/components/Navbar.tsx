
"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { MobileMenuOverlay } from './MobileMenuOverlay';

interface NavbarProps {
  onOpenIntake: () => void;
  activeSection?: string;
}

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Capabilities", href: "/capabilities" }
];

export function Navbar({ onOpenIntake, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] h-20 md:h-24 flex items-center transition-all duration-500 px-6",
          isScrolled 
            ? "bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/5" 
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Wordmark */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group relative z-10"
          >
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-black group-hover:bg-[#0445a4] transition-all duration-300" />
            </div>
            <span className="text-[18px] md:text-[20px] font-bold tracking-tighter text-[#F5F5F5] font-display">
              GreyShacks
            </span>
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-semibold tracking-wide transition-all hover:text-[#0445a4]",
                  activeSection === link.name.toLowerCase() 
                    ? "text-[#F5F5F5]" 
                    : "text-white/40 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="hidden md:block">
              <Button 
                onClick={onOpenIntake}
                className="bg-transparent border border-white/20 text-white hover:bg-[#0445a4] hover:border-[#0445a4] rounded-full px-8 py-2.5 h-11 text-[13px] font-bold tracking-wide transition-all shadow-xl"
              >
                Get started
              </Button>
            </div>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#888888]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenuOverlay 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection || ""}
        onOpenIntake={onOpenIntake}
      />
    </>
  );
}
