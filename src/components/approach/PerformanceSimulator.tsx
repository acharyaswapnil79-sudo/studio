
'use client';

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Metrics {
  timePerTask: number;
  errorRate: number;
  monthlyHours: number;
  costPerProcess: number;
}

export function PerformanceSimulator() {
  const [baseline, setBaseline] = useState<Metrics>({
    timePerTask: 45,
    errorRate: 12,
    monthlyHours: 320,
    costPerProcess: 85,
  });

  const calculatePilotResults = (baseline: Metrics) => {
    const improvements = {
      timePerTask: 0.68,
      errorRate: 0.79,
      monthlyHours: 0.71,
      costPerProcess: 0.58,
    };

    return {
      timePerTask: Math.round(baseline.timePerTask * (1 - improvements.timePerTask)),
      errorRate: Math.round(baseline.errorRate * (1 - improvements.errorRate) * 10) / 10,
      monthlyHours: Math.round(baseline.monthlyHours * (1 - improvements.monthlyHours)),
      costPerProcess: Math.round(baseline.costPerProcess * (1 - improvements.costPerProcess)),
    };
  };

  const pilot = calculatePilotResults(baseline);

  const hoursSaved = baseline.monthlyHours - pilot.monthlyHours;
  const costSaved = Math.round(hoursSaved * (baseline.costPerProcess / baseline.timePerTask) * 0.6);
  const paybackMonths = Math.max(1, Math.round((costSaved * 0.3) / (costSaved * 0.08)));

  const data = {
    labels: ['Time/Task (min)', 'Error Rate (%)', 'Monthly Hours', 'Cost/Proc ($)'],
    datasets: [
      {
        label: 'Baseline',
        data: [baseline.timePerTask, baseline.errorRate, baseline.monthlyHours, baseline.costPerProcess],
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
      },
      {
        label: 'After Pilot',
        data: [pilot.timePerTask, pilot.errorRate, pilot.monthlyHours, pilot.costPerProcess],
        backgroundColor: '#0445a4',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { 
          color: '#888', 
          font: { size: 11, weight: 'bold' as const },
          usePointStyle: true,
          boxWidth: 6
        },
      },
      tooltip: {
        backgroundColor: '#111',
        titleColor: '#fff',
        selectionColor: '#0445a4',
        bodyColor: '#888',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false
      }
    },
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { color: '#444', font: { size: 10 } } 
      },
      y: { 
        grid: { color: 'rgba(255, 255, 255, 0.05)' }, 
        ticks: { color: '#444', font: { size: 10 } } 
      },
    },
  };

  const handleInputChange = (field: keyof Metrics, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setBaseline(prev => ({ ...prev, [field]: numValue }));
    }
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0445a4]/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-10">
          <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Performance Simulator</h3>
          <p className="text-[#888] text-sm leading-relaxed max-w-md">
            Input your current operational metrics to see realistic projected outcomes based on GreyShacks deployment data.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Time / Task", field: "timePerTask" as const, suffix: "min" },
            { label: "Error Rate", field: "errorRate" as const, suffix: "%" },
            { label: "Monthly Hours", field: "monthlyHours" as const, suffix: "hrs" },
            { label: "Cost / Proc", field: "costPerProcess" as const, suffix: "$" },
          ].map((item) => (
            <div key={item.field} className="space-y-2.5">
              <label className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em] block">{item.label}</label>
              <div className="relative">
                <input
                  type="number"
                  value={baseline[item.field]}
                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm font-medium focus:border-[#0445a4] outline-none transition-all focus:bg-[#0445a4]/5"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20 uppercase pointer-events-none">{item.suffix}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10 bg-black/20 rounded-[24px] p-6 border border-white/5">
          <div className="h-[280px]">
            <Bar data={data} options={options} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 group hover:border-[#0445a4]/30 transition-all">
            <div className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em] mb-3">Hours Saved</div>
            <div className="text-4xl font-bold text-white tracking-tighter mb-1">{hoursSaved}</div>
            <div className="text-[11px] font-medium text-[#888]">Monthly capacity recovered</div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 group hover:border-[#0445a4]/30 transition-all">
            <div className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em] mb-3">Cost Reduction</div>
            <div className="text-4xl font-bold text-white tracking-tighter mb-1">${costSaved.toLocaleString()}</div>
            <div className="text-[11px] font-medium text-[#888]">Estimated monthly impact</div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 group hover:border-[#0445a4]/30 transition-all">
            <div className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em] mb-3">Payback Period</div>
            <div className="text-4xl font-bold text-[#0445a4] tracking-tighter mb-1">{paybackMonths} mos</div>
            <div className="text-[11px] font-medium text-[#888]">Typical ROI window</div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-[#444] uppercase tracking-[0.3em] font-bold">
            Aggregated deployment benchmarks (N=14). Results reflect conservative medians.
          </p>
        </div>
      </div>
    </div>
  );
}
