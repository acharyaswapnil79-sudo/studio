"use client"

import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let seed = 42;
      const particleCount = 180;

      for (let i = 0; i < particleCount; i++) {
        const x = seededRandom(seed++) * canvas.width;
        const y = seededRandom(seed++) * canvas.height;
        const radius = 0.4 + seededRandom(seed++) * 1.0; 
        const opacity = 0.08 + seededRandom(seed++) * 0.34; 

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === canvas.parentElement) {
          canvas.width = window.innerWidth;
          canvas.height = (entry.target as HTMLElement).offsetHeight;
          drawParticles();
        }
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    // Initial draw
    canvas.width = window.innerWidth;
    canvas.height = parent?.offsetHeight || 800;
    drawParticles();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};
