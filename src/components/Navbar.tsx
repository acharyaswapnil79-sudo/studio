
"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavbarProps {
  onOpenIntake: () => void;
  activeSection?: string;
  navLinks?: { name: string; href: string }[];
}

const defaultNavLinks = [
  { name: "About", href: "/about" },
  { name: "Capabilities", href: "/capabilities" },
  { name: "Approach", href: "/approach" },
  { name: "Practitioner Framework", href: "/intelligence" }
];

export function Navbar({ onOpenIntake, activeSection, navLinks: customNavLinks }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const auth = useAuth();

  const links = customNavLinks || defaultNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[12px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap",
                  activeSection === link.name.toLowerCase() 
                    ? "text-[#F5F5F5]" 
                    : "text-white/30 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right CTA / User Menu */}
          <div className="flex items-center gap-4 relative z-10">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="hidden lg:block">
                   <Button variant="outline" size="sm" className="rounded-full border-white/10 text-white/60 hover:text-white hover:bg-white/5">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Platform
                   </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none focus:ring-0">
                      <Avatar className="w-9 h-9 border border-white/10 hover:border-[#0445a4]/50 transition-colors">
                        <AvatarFallback className="bg-[#111] text-[#0445a4] text-xs font-bold">
                          {user.email?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-[#111] border-white/5 text-white">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-bold leading-none text-white/40 uppercase tracking-widest">Active Account</p>
                        <p className="text-sm font-medium leading-none text-white/90 truncate">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem asChild className="focus:bg-[#0445a4]/10 focus:text-white cursor-pointer">
                      <Link href="/dashboard" className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Intelligence Platform</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem onClick={handleLogout} className="focus:bg-red-500/10 focus:text-red-500 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="link" className="text-white/60 hover:text-white text-[11px] font-bold uppercase tracking-widest no-underline">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    className="bg-[#0445a4] text-white hover:bg-[#0445a4]/90 rounded-full px-8 py-2.5 h-11 text-[11px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-[#0445a4]/20"
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            )}
            
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
        navLinks={links}
        activeSection={activeSection || ""}
        onOpenIntake={onOpenIntake}
      />
    </>
  );
}
