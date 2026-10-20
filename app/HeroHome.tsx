'use client';

import { useEffect, useState } from 'react';

export default function HeroHome() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1F1410 0%, #2D231A 100%)',
      padding: 'clamp(3rem, 12vw, 8rem) 1.25rem',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Luxury Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(212,175,55,0.08) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Animated Background Accent */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: isLoaded ? 'float 20s ease-in-out infinite' : 'none',
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 8px 24px rgba(212,175,55,0.2); }
          50% { box-shadow: 0 12px 32px rgba(212,175,55,0.35); }
        }
      `}</style>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        width: '100%',
      }}>
        {/* Eyebrow */}
        <div style={{
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none',
        }}>
          <p style={{
            fontSize: 'clamp(11px, 2vw, 13px)',
            color: '#D4AF37',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '2rem',
            margin: '0 0 2rem 0',
          }}>
            ✨ Dein perfekter Duft wartet
          </p>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(44px, 9vw, 72px)',
          fontWeight: 700,
          color: '#FAF7F2',
          margin: '0 0 1.5rem 0',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none',
          maxWidth: '900px',
        }}>
          Finde deinen <br />Signature–Duft
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 20px)',
          color: '#E8D4B8',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          margin: '0 0 2.5rem 0',
          maxWidth: '600px',
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none',
        }}>
          Mit Quiz, Duft-Scanner und unserer intelligenten Match-Engine. Kostenlos, ohne Newsletter-Pflicht.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.8s both' : 'none',
        }}>
          <a href="/#quiz" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #D4AF37 0%, #E5C158 100%)',
            color: '#1F1410',
            fontWeight: 700,
            padding: 'clamp(13px, 2.5vw, 16px) clamp(32px, 5vw, 48px)',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: 'clamp(15px, 2vw, 17px)',
            letterSpacing: '0.05em',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 12px 40px rgba(212,175,55,0.25)',
            border: 'none',
            cursor: 'pointer',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(212,175,55,0.4)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.25)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            🎯 Quiz starten
          </a>

          <a href="#scanner-coming-soon" style={{
            display: 'inline-block',
            background: 'rgba(212,175,55,0.1)',
            color: '#D4AF37',
            fontWeight: 700,
            padding: 'clamp(13px, 2.5vw, 16px) clamp(32px, 5vw, 48px)',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: 'clamp(15px, 2vw, 17px)',
            letterSpacing: '0.05em',
            border: '2px solid #D4AF37',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212,175,55,0.2)';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,175,55,0.2)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            📷 Scanner (Coming)
          </a>
        </div>

        {/* Stats Row */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(212,175,55,0.2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 1s both' : 'none',
        }}>
          <div>
            <div style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 700,
              color: '#D4AF37',
              lineHeight: 1,
            }}>400+</div>
            <div style={{
              fontSize: 'clamp(13px, 2vw, 14px)',
              color: '#E8D4B8',
              marginTop: '0.5rem',
            }}>kuratierte Düfte</div>
          </div>
          <div>
            <div style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 700,
              color: '#D4AF37',
              lineHeight: 1,
            }}>200+</div>
            <div style={{
              fontSize: 'clamp(13px, 2vw, 14px)',
              color: '#E8D4B8',
              marginTop: '0.5rem',
            }}>Marken weltweit</div>
          </div>
          <div>
            <div style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 700,
              color: '#D4AF37',
              lineHeight: 1,
            }}>0–100</div>
            <div style={{
              fontSize: 'clamp(13px, 2vw, 14px)',
              color: '#E8D4B8',
              marginTop: '0.5rem',
            }}>echter Match-Score</div>
          </div>
        </div>
      </div>

      {/* Hidden target for scanner button */}
      <div id="scanner-coming-soon" style={{ display: 'none' }} />
    </section>
  );
}
