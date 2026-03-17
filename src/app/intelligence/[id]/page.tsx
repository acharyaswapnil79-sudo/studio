"use client"

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { INSIGHTS } from '@/lib/intelligence-data';
import { ArrowLeft } from 'lucide-react';

/**
 * Minimal dynamic route placeholder.
 * Framework detail logic will be added when content is provided.
 */
export default function IntelligenceDetailPlaceholder() {
  const params = useParams();
  const router = useRouter();
  const insight = INSIGHTS.find(i => i.id === params.id);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="font-headline text-3xl font-bold">Analysis Pending</h1>
        <p className="text-[#A0A0A0] text-sm leading-relaxed">
          The complete operational analysis for "{insight?.title || 'this publication'}" is being prepared for the institutional library.
        </p>
        <button 
          onClick={() => router.push('/intelligence')}
          className="inline-flex items-center gap-2 text-[#0047AB] font-mono text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Intelligence
        </button>
      </div>
    </div>
  );
}
