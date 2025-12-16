'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Criar partículas com cores variadas
    const particleCount = 80;
    const particles: Particle[] = [];
    const colors = [
      'rgba(0, 217, 255',  // cyan
      'rgba(178, 0, 255',  // purple
      'rgba(255, 215, 0',  // gold
      'rgba(0, 255, 136'   // green
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Animar partículas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Atualizar posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Desenhar partícula com glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        );
        gradient.addColorStop(0, `${particle.color}, ${particle.opacity})`);
        gradient.addColorStop(0.5, `${particle.color}, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `${particle.color}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Desenhar linhas entre partículas próximas
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const lineOpacity = 0.15 * (1 - distance / 120);
            ctx.strokeStyle = `rgba(0, 217, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Grid pattern animado */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.6,
        }}
      />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />

      {/* Scan lines */}
      <div className="fixed inset-0 pointer-events-none z-0 scanlines opacity-30" />

      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%)',
            top: '10%',
            left: '20%',
            animationDuration: '8s',
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(178, 0, 255, 0.4) 0%, transparent 70%)',
            bottom: '15%',
            right: '15%',
            animationDuration: '10s',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl opacity-15 animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
            top: '50%',
            right: '30%',
            animationDuration: '12s',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Glow spots */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#00d9ff]/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#b200ff]/10 rounded-full blur-[100px] pointer-events-none z-0" />
    </>
  );
}
