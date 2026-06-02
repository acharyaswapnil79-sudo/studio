"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { MobileMenuOverlay } from './MobileMenuOverlay';

interface NavbarProps {
  onOpenIntake: () => void;
  activeSection?: string;
}

const navLinks = [
  { name: "What We Do", href: "/capabilities" },
  { name: "How It Works", href: "/about#how-we-work" },
  { name: "Results", href: "/deployments" },
  { name: "Integrations", href: "/capabilities#integrations" },
  { name: "About", href: "/about" }
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
          "fixed top-0 left-0 right-0 z-[100] h-16 flex items-center transition-all duration-300",
          isScrolled 
            ? "bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#1A1A1A]" 
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Wordmark */}
          <Link 
            href="/" 
            className="text-[18px] font-semibold tracking-tighter text-[#F5F5F5] font-display"
          >
            GreyShacks
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[14px] font-normal transition-colors",
                  activeSection === link.name.toLowerCase() 
                    ? "text-[#F5F5F5]" 
                    : "text-[#888888] hover:text-[#F5F5F5]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button 
                onClick={onOpenIntake}
                className="bg-[#E8FF47] text-[#0A0A0A] font-semibold text-[14px] py-2.5 px-6"
              >
                Get Started
              </Button>
            </div>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-[#888888]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
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
