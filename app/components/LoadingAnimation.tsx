'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  'Parfüm wird erkannt …',
  'Duftnoten werden analysiert …',
  'Profil wird erstellt …',
];

export default function LoadingAnimation() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar läuft in ~8s durch (optimistic — Haiku ist schnell)
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

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % STEPS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '380px',
      padding: '2rem 1.5rem',
      gap: '2rem',
    }}>

      {/* Flakon-Icon mit Puls */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Pulsringe */}
        <div style={{
          position: 'absolute',
          width: '90px', height: '90px',
          borderRadius: '50%',
          border: '1.5px solid rgba(212,175,55,0.25)',
          animation: 'pulse 2s ease-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '70px', height: '70px',
          borderRadius: '50%',
          border: '1.5px solid rgba(212,175,55,0.4)',
          animation: 'pulse 2s ease-out 0.6s infinite',
        }} />
        {/* Icon */}
        <div style={{
          width: '52px', height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
          border: '1.5px solid rgba(212,175,55,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem',
        }}>
          🔍
        </div>
      </div>

      {/* Headline */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: "'Playfair Display', serif",
          color: '#2a1d12',
          margin: '0 0 0.4rem',
          fontWeight: 700,
        }}>
          Die KI analysiert deinen Duft
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#9a8a7e',
          margin: 0,
          minHeight: '20px',
          transition: 'opacity 0.4s ease',
        }}>
          {STEPS[step]}
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: '280px' }}>
        <div style={{
          height: '3px',
          background: 'rgba(212,175,55,0.15)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #b08b4f, #d4af37)',
            borderRadius: '2px',
            transition: 'width 0.1s linear',
          }} />
        </div>
        <p style={{
          fontSize: '12px',
          color: '#b0a098',
          textAlign: 'center',
          marginTop: '0.6rem',
        }}>
          Dauert meist 5–10 Sekunden …
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
