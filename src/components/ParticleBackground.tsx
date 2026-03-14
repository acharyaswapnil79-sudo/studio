"use client"

import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      // The canvas should only be as tall as the hero section
      const hero = canvas.parentElement;
      if (hero) {
        canvas.height = hero.offsetHeight;
      }
      drawParticles();
    };

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const drawParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let seed = 42;
      const particleCount = 180;

      for (let i = 0; i < particleCount; i++) {
        const x = seededRandom(seed++) * canvas.width;
        const y = seededRandom(seed++) * canvas.height;
        const radius = 0.4 + seededRandom(seed++) * 1.0; // 0.4px to 1.4px
        const opacity = 0.08 + seededRandom(seed++) * 0.34; // 0.08 to 0.42

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
