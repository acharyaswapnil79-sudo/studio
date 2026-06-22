
"use client"

import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Activity, Database, Bot, ArrowRight, Loader2, BarChart3, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#0445a4] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-[#0A0A0A] min-h-screen selection:bg-[#0445a4]/30">
      <Navbar onOpenIntake={() => {}} activeSection="dashboard" />
      
      <main className="pt-32 pb-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold tracking-[0.3em] text-[#0445a4] uppercase mb-4 block"
            >
              Institutional Intelligence Platform
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
            >
              Operational Command
            </motion.h1>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div className="text-sm font-medium text-white/60">
              System Status: <span className="text-white font-bold uppercase tracking-widest text-xs">Production Stable</span>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Active Agents", val: "4", icon: Bot, trend: "+1 this month" },
            { label: "Data Quality", val: "94.2%", icon: Database, trend: "Baseline verified" },
            { label: "Manual Reduction", val: "68%", icon: Activity, trend: "Avg vs baseline" },
            { label: "Audit Readiness", val: "A+", icon: Loader2, trend: "All logs synced" }
          ].map((stat, i) => (
            <Card key={i} className="bg-[#111] border-white/5 rounded-2xl hover:border-[#0445a4]/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-5 h-5 text-[#0445a4]" />
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.trend}</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.val}</div>
                <div className="text-xs font-medium text-white/40 uppercase tracking-wider">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Action Area */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="bg-[#111] border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-[#0445a4]" />
                  Active Workflow Orchestration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {[
                    { t: "Invoice Approval Chain", s: "Processing 14 records", status: "Autonomous", color: "text-[#0445a4]" },
                    { t: "Lead Enrichment Pipeline", s: "Enriching source: Meta", status: "Autonomous", color: "text-[#0445a4]" },
                    { t: "Vendor Exception Routing", s: "2 exceptions flagged for review", status: "Action Required", color: "text-amber-500" },
                    { t: "Inventory Reconciliation", s: "Synced 4 minutes ago", status: "Stable", color: "text-emerald-500" }
                  ].map((wf, i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white group-hover:text-[#0445a4] transition-colors">{wf.t}</div>
                        <div className="text-xs text-white/40">{wf.s}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest", wf.color)}>{wf.status}</span>
                        <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-white transition-all group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="bg-[#111] border-white/5 rounded-2xl p-8">
                  <BarChart3 className="w-8 h-8 text-[#0445a4] mb-6" />
                  <h3 className="text-lg font-bold text-white mb-2">Performance Monitoring</h3>
                  <p className="text-sm text-[#888] leading-relaxed mb-6">Real-time delta analysis against your 4-week established baseline.</p>
                  <Button variant="outline" className="w-full rounded-full border-white/10 text-xs font-bold uppercase tracking-widest">View Full Metrics</Button>
               </Card>
               <Card className="bg-[#111] border-white/5 rounded-2xl p-8">
                  <Clock className="w-8 h-8 text-[#0445a4] mb-6" />
                  <h3 className="text-lg font-bold text-white mb-2">Audit History</h3>
                  <p className="text-sm text-[#888] leading-relaxed mb-6">Immutable logs of every decision made by the autonomous layer.</p>
                  <Button variant="outline" className="w-full rounded-full border-white/10 text-xs font-bold uppercase tracking-widest">Export Logs (JSON)</Button>
               </Card>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
             <Card className="bg-[#111] border-white/5 rounded-3xl p-8 border-l-4 border-l-[#0445a4]">
                <h3 className="text-xs font-bold text-[#0445a4] uppercase tracking-[0.2em] mb-4">Account Metadata</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Authenticated Email</div>
                    <div className="text-sm font-medium text-white">{user.email}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Session ID</div>
                    <div className="text-[10px] font-mono text-white/60 truncate">{user.uid}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Security Tier</div>
                    <div className="inline-flex items-center gap-2 bg-[#0445a4]/10 border border-[#0445a4]/20 px-3 py-1 rounded-full text-[10px] font-bold text-[#0445a4] uppercase tracking-widest">
                      Institutional Admin
                    </div>
                  </div>
                </div>
             </Card>

             <Card className="bg-[#0D0D0D] border border-amber-500/20 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                   <AlertTriangle className="w-5 h-5 text-amber-500" />
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest">Action Items</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-white/80 leading-relaxed mb-3">One vendor invoice failed reconciliation due to rate card mismatch.</p>
                    <button className="text-[10px] font-bold text-[#0445a4] uppercase tracking-widest hover:underline">Manual Overide</button>
                  </div>
                </div>
             </Card>
          </div>
        </div>
      </main>

      <Footer onOpenIntake={() => {}} />
    </div>
  );
}
