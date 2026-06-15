"use client"

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  posterUrl?: string;
  videoUrl?: string;
  className?: string;
  label?: string;
}

export function VideoPlayer({ posterUrl, videoUrl, className, label }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Placeholder poster for demo
  const fallbackPoster = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

  return (
    <div className={cn("relative group aspect-video bg-[#111] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl", className)}>
      {/* Visual Placeholder for Video */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${posterUrl || fallbackPoster})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Media Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 rounded-full bg-[#0445a4] text-white flex items-center justify-center shadow-2xl shadow-[#0445a4]/40 z-10"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </motion.button>
        
        {label && (
          <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
            {label}
          </span>
        )}
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMuted(!isMuted)} className="text-white/60 hover:text-white transition-colors">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#0445a4] w-1/3" />
            </div>
          </div>
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
            00:04 / 00:10
          </span>
        </div>
      </div>
    </div>
  );
}
