'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  { icon: '📸', text: 'Bild wird analysiert...' },
  { icon: '🧪', text: 'Duftnoten werden erkannt...' },
  { icon: '🔍', text: 'Parfüm wird identifiziert...' },
  { icon: '✨', text: 'Profil wird erstellt...' },
];

export default function LoadingAnimation() {
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEPS.length);
    }, 1400);
    return () => clearInterval(stepTimer);
  }, []);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    return () => clearInterval(dotTimer);
  }, []);

  const current = STEPS[stepIndex];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '420px',
      gap: '2.5rem',
      padding: '2rem',
    }}>

      {/* Animated perfume bottle */}
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        {/* Outer ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid rgba(212,175,55,0.15)',
          borderRadius: '50%',
          animation: 'scanRingOuter 2s linear infinite',
        }} />
        {/* Middle ring */}
        <div style={{
          position: 'absolute',
          inset: '8px',
          border: '2px solid rgba(212,175,55,0.3)',
          borderRadius: '50%',
          animation: 'scanRingMid 1.5s linear infinite reverse',
        }} />
        {/* Inner spinner */}
        <div style={{
          position: 'absolute',
          inset: '16px',
          border: '3px solid rgba(212,175,55,0.1)',
          borderTop: '3px solid #d4af37',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        {/* Center icon */}
        <div style={{
          position: 'absolute',
          inset: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.4rem',
          lineHeight: 1,
          transition: 'opacity 0.3s ease',
        }}>
          {current.icon}
        </div>
      </div>

      {/* Step text */}
      <div style={{ textAlign: 'center', maxWidth: '320px' }}>
        <h3 style={{
          fontSize: '20px',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: '#2a1d12',
          marginBottom: '0.6rem',
          minHeight: '28px',
          transition: 'opacity 0.3s ease',
        }}>
          KI analysiert deinen Duft{dots}
        </h3>
        <p style={{
          fontSize: '15px',
          color: '#7a6a5e',
          margin: 0,
          minHeight: '22px',
          transition: 'all 0.3s ease',
        }}>
          {current.text}
        </p>
      </div>

      {/* Progress steps */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            width: i === stepIndex ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            backgroundColor: i === stepIndex ? '#d4af37' : i < stepIndex ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.15)',
            transition: 'all 0.4s ease',
          }} />
        ))}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scanRingOuter {
          0% { transform: rotate(0deg) scale(1); opacity: 0.5; }
          50% { transform: rotate(180deg) scale(1.05); opacity: 1; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.5; }
        }
        @keyframes scanRingMid {
          0% { transform: rotate(0deg); opacity: 0.4; }
          50% { opacity: 0.9; }
          100% { transform: rotate(360deg); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
