'use client';

import React, { useState, useEffect } from 'react';
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

const LiveAutomationDashboard = () => {
  const [stats, setStats] = useState({
    companiesPerHour: 47,
    totalDeployed: 1240,
    successfullyDeployed: 512,
    aiPowered: 591,
    blockedByData: 398,
    failedOrNonPerforming: 330,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newDeployments = Math.floor(Math.random() * 5) + 2;
        const newSuccess = Math.floor(newDeployments * 0.42);
        const newAI = Math.floor(newDeployments * 0.55);
        const newBlocked = Math.floor(newDeployments * 0.32);
        const newFailed = newDeployments - newSuccess;

        return {
          companiesPerHour: Math.max(38, Math.min(62, prev.companiesPerHour + (Math.random() > 0.5 ? 1 : -1))),
          totalDeployed: prev.totalDeployed + newDeployments,
          successfullyDeployed: prev.successfullyDeployed + newSuccess,
          aiPowered: prev.aiPowered + newAI,
          blockedByData: prev.blockedByData + newBlocked,
          failedOrNonPerforming: prev.failedOrNonPerforming + newFailed,
        };
      });
    }, 11000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: [
      'Automations Deployed',
      'Successfully Deployed',
      'AI-Powered Automations',
      'Blocked by Unstructured Data',
      'Non-Performing / Failed'
    ],
    datasets: [{
      label: 'Count',
      data: [
        stats.totalDeployed,
        stats.successfullyDeployed,
        stats.aiPowered,
        stats.blockedByData,
        stats.failedOrNonPerforming
      ],
      backgroundColor: ['#475569', '#10b981', '#0445a4', '#f59e0b', '#ef4444'],
      borderRadius: 6,
    }],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0A0A0A',
        titleColor: '#fff',
        bodyColor: '#888',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#444', font: { size: 10 } } },
      y: { grid: { display: false }, ticks: { color: '#F5F5F5', font: { size: 12, weight: 'bold' as const } } },
    },
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Global Automation Activity</h3>
          <p className="text-sm text-[#888]">Live simulation based on real mid-market deployment patterns</p>
        </div>
        <div className="text-left md:text-right bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
          <div className="text-3xl font-bold text-emerald-500 tabular-nums">{stats.companiesPerHour}</div>
          <div className="text-[10px] font-bold text-[#444] uppercase tracking-widest mt-1">Companies starting deployments / hr</div>
        </div>
      </div>

      <div className="h-[380px] mb-10 bg-black/20 rounded-2xl p-6 border border-white/5">
        <Bar data={data} options={options} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 group hover:border-emerald-500/30 transition-all">
          <div className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-2">Success Rate</div>
          <div className="text-3xl font-bold text-white tracking-tighter">
            {((stats.successfullyDeployed / stats.totalDeployed) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 group hover:border-amber-500/30 transition-all">
          <div className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-2">Blocked by Data</div>
          <div className="text-3xl font-bold text-white tracking-tighter">
            {((stats.blockedByData / stats.totalDeployed) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 group hover:border-red-500/30 transition-all">
          <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">Non-Performing</div>
          <div className="text-3xl font-bold text-white tracking-tighter">
            {((stats.failedOrNonPerforming / stats.totalDeployed) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 group hover:border-[#0445a4]/30 transition-all">
          <div className="text-[#0445a4] text-[10px] font-bold uppercase tracking-widest mb-2">AI-Powered</div>
          <div className="text-3xl font-bold text-white tracking-tighter">
            {((stats.aiPowered / stats.totalDeployed) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <p className="text-[10px] text-[#444] uppercase tracking-[0.2em] font-bold mt-10 text-center">
        Data issues remain the #1 blocker for successful automation. Numbers update live to simulate real-world activity.
      </p>
    </div>
  );
};

export default LiveAutomationDashboard;