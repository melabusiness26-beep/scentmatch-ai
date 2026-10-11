'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  { text: 'Parfüm wird erkannt …', emoji: '👁️' },
  { text: 'Duftnoten werden analysiert …', emoji: '🌸' },
  { text: 'Duftprofil wird erstellt …', emoji: '✨' },
  { text: 'Ähnliche Düfte werden gesucht …', emoji: '🔍' },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaDecay: number;
  hue: number; // gold hue variation
  life: number;
  maxLife: number;
  sparkle: boolean;
  rotation: number;
  rotSpeed: number;
}

export default function LoadingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // Fade in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Progress bar ~8s optimistic
  useEffect(() => {
    const start = Date.now();
    const duration = 8000;
    const frame = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(95, (elapsed / duration) * 100);
      setProgress(p);
      if (p < 95) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, []);

  // Step cycling
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % STEPS.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Canvas gold dust animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const spawnParticle = (): Particle => {
      // Spawn from center-bottom area (like emanating from a bottle)
      const cx = W / 2;
      const cy = H * 0.72;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
      const speed = 0.3 + Math.random() * 1.4;
      const maxLife = 90 + Math.random() * 80;
      return {
        x: cx + (Math.random() - 0.5) * 30,
        y: cy + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.1,
        size: 1 + Math.random() * 3,
        alpha: 0,
        alphaDecay: 0.012 + Math.random() * 0.008,
        hue: 42 + (Math.random() - 0.5) * 16, // gold: 42°, range 34-50
        life: 0,
        maxLife,
        sparkle: Math.random() < 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
      };
    };

    const drawBottleSilhouette = () => {
      const cx = W / 2;
      const cy = H * 0.72;
      const bw = 28, bh = 44;
      const neckW = 9, neckH = 12;
      const capW = 13, capH = 6;

      ctx.save();
      ctx.globalAlpha = 0.12;

      // Body
      const grad = ctx.createLinearGradient(cx - bw / 2, cy - bh, cx + bw / 2, cy);
      grad.addColorStop(0, '#d4af37');
      grad.addColorStop(1, '#b08b4f');
      ctx.fillStyle = grad;
      (ctx as any).beginPath();
      (ctx as any).roundRect(cx - bw / 2, cy - bh, bw, bh, 5);
      ctx.fill();

      // Neck
      ctx.fillStyle = '#c8a030';
      (ctx as any).beginPath();
      (ctx as any).roundRect(cx - neckW / 2, cy - bh - neckH, neckW, neckH, 2);
      ctx.fill();

      // Cap
      ctx.fillStyle = '#d4af37';
      (ctx as any).beginPath();
      (ctx as any).roundRect(cx - capW / 2, cy - bh - neckH - capH, capW, capH, 3);
      ctx.fill();

      // Highlight
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#fff';
      (ctx as any).beginPath();
      (ctx as any).roundRect(cx - bw / 2 + 4, cy - bh + 6, 6, bh - 12, 3);
      ctx.fill();

      ctx.restore();
    };

    const drawPulseRings = (time: number) => {
      const cx = W / 2;
      const cy = H * 0.42;
      const speeds = [1, 0.7, 0.4];
      speeds.forEach((speed, i) => {
        const phase = ((time * speed * 0.0008) + i * 0.33) % 1;
        const radius = 30 + phase * 65;
        const alpha = (1 - phase) * 0.25;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = `hsl(42, 65%, 55%)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
    };

    const drawSparkle = (p: Particle) => {
      const alpha = p.alpha * (Math.sin((p.life / p.maxLife) * Math.PI));
      ctx.save();
      ctx.globalAlpha = alpha * 0.9;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const size = p.size * 1.4;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      grad.addColorStop(0, `hsl(${p.hue}, 80%, 85%)`);
      grad.addColorStop(0.5, `hsl(${p.hue}, 70%, 60%)`);
      grad.addColorStop(1, `hsla(${p.hue}, 60%, 40%, 0)`);
      ctx.fillStyle = grad;

      // 4-pointed star
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const outerR = size;
        const innerR = size * 0.25;
        if (i === 0) {
          ctx.moveTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
        } else {
          ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
        }
        const midAngle = angle + Math.PI / 4;
        ctx.lineTo(Math.cos(midAngle) * innerR, Math.sin(midAngle) * innerR);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawDust = (p: Particle) => {
      const lifeRatio = p.life / p.maxLife;
      const alpha = p.alpha * Math.sin(lifeRatio * Math.PI);
      ctx.save();
      ctx.globalAlpha = alpha;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      grad.addColorStop(0, `hsl(${p.hue}, 85%, 78%)`);
      grad.addColorStop(0.6, `hsl(${p.hue}, 70%, 55%)`);
      grad.addColorStop(1, `hsla(${p.hue}, 60%, 40%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let lastSpawn = 0;
    const spawnInterval = 55; // ms between spawns

    const animate = (time: number) => {
      ctx.clearRect(0, 0, W, H);

      // Background gradient
      const bg = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, W * 0.7);
      bg.addColorStop(0, 'rgba(212,175,55,0.04)');
      bg.addColorStop(1, 'rgba(250,247,242,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      drawPulseRings(time);
      drawBottleSilhouette();

      // Spawn new particles
      if (time - lastSpawn > spawnInterval) {
        if (particlesRef.current.length < 70) {
          particlesRef.current.push(spawnParticle());
          if (Math.random() < 0.3) particlesRef.current.push(spawnParticle());
        }
        lastSpawn = time;
      }

      // Update & draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.006; // slight upward drift
        p.vx *= 0.995;
        p.rotation += p.rotSpeed;

        // fade in then out
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.2) {
          p.alpha = Math.min(0.9, p.alpha + 0.06);
        } else {
          p.alpha = Math.max(0, p.alpha - p.alphaDecay);
        }

        if (p.sparkle) {
          drawSparkle(p);
        } else {
          drawDust(p);
        }
        return p.life < p.maxLife && p.alpha > 0;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const currentStep = STEPS[step];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '420px',
        padding: '2rem 1.5rem',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Canvas for gold dust */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Content on top of canvas */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', width: '100%' }}>

        {/* Central icon with rings — canvas handles background rings */}
        <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '64px', height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 100%)',
            border: '1.5px solid rgba(212,175,55,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: '0 0 24px rgba(212,175,55,0.2), inset 0 1px 1px rgba(255,255,255,0.4)',
          }}>
            <span style={{
              display: 'inline-block',
              animation: 'iconPop 0.35s ease',
              animationFillMode: 'both',
            }}>
              {currentStep.emoji}
            </span>
          </div>
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{
            fontSize: 'clamp(1.1rem, 4vw, 1.35rem)',
            fontFamily: "'Playfair Display', serif",
            color: '#2a1d12',
            margin: '0 0 0.5rem',
            fontWeight: 700,
          }}>
            KI analysiert deinen Duft
          </h3>

          <div style={{
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <p
              key={step}
              style={{
                fontSize: '14px',
                color: '#9a8a7e',
                margin: 0,
                animation: 'stepFadeIn 0.4s ease',
              }}
            >
              {currentStep.text}
            </p>
          </div>
        </div>

        {/* Gold dust label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.5,
        }}>
          <div style={{
            width: '20px', height: '1px',
            background: 'linear-gradient(90deg, transparent, #d4af37)',
          }} />
          <span style={{ fontSize: '11px', color: '#b08b4f', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            Auressa KI
          </span>
          <div style={{
            width: '20px', height: '1px',
            background: 'linear-gradient(90deg, #d4af37, transparent)',
          }} />
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', maxWidth: '260px' }}>
          <div style={{
            height: '2px',
            background: 'rgba(212,175,55,0.12)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #b08b4f, #d4af37, #e8c84a)',
              borderRadius: '2px',
              transition: 'width 0.15s linear',
              boxShadow: '0 0 6px rgba(212,175,55,0.5)',
            }} />
          </div>
          <p style={{
            fontSize: '11px',
            color: '#b0a098',
            textAlign: 'center',
            marginTop: '0.5rem',
            letterSpacing: '0.02em',
          }}>
            Dauert meist 5–10 Sekunden …
          </p>
        </div>
      </div>

      <style>{`
        @keyframes iconPop {
          0% { transform: scale(0.7) rotate(-8deg); opacity: 0; }
          70% { transform: scale(1.12) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes stepFadeIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
