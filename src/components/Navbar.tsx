"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavbarProps {
  onOpenIntake: () => void;
  activeSection: string;
}

export function Navbar({ onOpenIntake, activeSection }: NavbarProps) {
  const navLinks = [
    { name: "Command Center", href: "/" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Library", href: "/deployments" },
    { name: "Intelligence", href: "/intelligence" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-6 py-4">
      <div className="flex items-center justify-between w-full max-w-7xl h-14 px-6 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#222] rounded-[4px]">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-display font-bold text-lg tracking-tighter text-[#F5F5F5]">
            GreyShacks
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] font-medium text-[#888] hover:text-[#4DFFB4] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenIntake}
          className="text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-[2px] hover:bg-[#4DFFB4] transition-all"
        >
          Request Diagnostic
        </button>
      </div>
    </nav>
  );
}