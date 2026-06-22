"use client"

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, Chrome, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error: any) {
      toast({
        title: "Google Sign-In Failed",
        description: error.message || "Could not authenticate with Google.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen selection:bg-[#0445a4]/30">
      <Navbar onOpenIntake={() => {}} />
      
      <main className="pt-32 md:pt-48 pb-24 px-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="bg-[#111] border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
            <CardHeader className="p-8 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0445a4]/10 border border-[#0445a4]/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#0445a4]" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight text-white">Institutional Login</CardTitle>
              <CardDescription className="text-[#888] text-sm leading-relaxed mt-2">
                Access the GreyShacks Operational Intelligence Platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6">
              <form onSubmit={handleEmailLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Work Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/40 border-white/10 rounded-xl pl-11 py-6 text-white focus:border-[#0445a4] transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/40 border-white/10 rounded-xl pl-11 py-6 text-white focus:border-[#0445a4] transition-all"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#0445a4] hover:bg-[#0445a4]/90 text-white rounded-xl py-6 font-bold uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#0445a4]/20"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Identity"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#111] px-4 text-white/20 font-bold tracking-widest">Or continue with</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full border-white/10 bg-transparent hover:bg-white/5 text-white rounded-xl py-6 font-bold uppercase tracking-widest text-xs"
              >
                {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Chrome className="w-4 h-4 mr-2" /> Google SSO</>}
              </Button>
            </CardContent>
            <CardFooter className="p-8 bg-black/20 flex flex-col space-y-4">
              <p className="text-center text-xs text-[#888]">
                Don't have access?{" "}
                <Link href="/signup" className="text-[#0445a4] font-bold hover:underline">
                  Request Pilot Entry
                </Link>
              </p>
              <Link href="/" className="text-center text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors flex items-center justify-center group">
                Back to Site <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer onOpenIntake={() => {}} />
    </div>
  );
}
