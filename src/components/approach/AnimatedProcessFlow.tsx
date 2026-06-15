'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedProcessFlow() {
  const phases = [
    { 
      number: "01", 
      title: "Operational Diagnostic", 
      items: ["Baseline Data", "Process Mapping", "Opportunity ID"] 
    },
    { 
      number: "02", 
      title: "Focused Pilot", 
      items: ["Live Deployment", "Weekly Measurement", "Governance Setup"] 
    },
    { 
      number: "03", 
      title: "Production Deployment", 
      items: ["Autonomous Execution", "Continuous Monitoring", "Full Audit Trail"] 
    }
  ];

  return (
    <div className="bg-[#111] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#0445a4]/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h3 className="text-2xl font-bold tracking-tight text-white">Live Process Continuity</h3>
          <p className="text-sm text-[#888] mt-2 max-w-xl">
            How real automation journeys progress with data, measurement & governance flowing through
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative">
          {phases.map((phase, index) => (
            <React.Fragment key={index}>
              {/* Phase Card */}
              <div className="flex-1 w-full bg-black/40 border border-white/5 rounded-2xl p-8 relative z-10 hover:border-[#0445a4]/30 transition-all group">
                <div className="text-[#0445a4] text-xs font-bold font-mono tracking-widest mb-2 uppercase">{phase.number}</div>
                <h4 className="font-bold text-white text-lg mb-6 tracking-tight">{phase.title}</h4>
                
                <div className="space-y-4">
                  {phase.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[#AAAAAA]">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated Flow Connector */}
              {index < phases.length - 1 && (
                <div className="hidden lg:flex flex-col items-center justify-center w-16 relative">
                  {/* Moving Dots Animation */}
                  <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-1 w-8 bg-emerald-500 rounded-full"
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Flow Labels */}
                  <div className="absolute -bottom-10 text-[9px] font-bold uppercase tracking-[0.1em] text-center text-[#444] w-32 whitespace-nowrap">
                    {index === 0 && "Data + Insights"}
                    {index === 1 && "Measurement + Gov"}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-[#666] max-w-2xl mx-auto leading-relaxed">
            Real automation succeeds when <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">data</span>, 
            <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]"> measurement</span>, and 
            <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]"> governance</span> move together across every phase.
          </p>
        </div>
      </div>
    </div>
  );
}