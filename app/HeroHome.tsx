'use client';

import { useEffect, useState } from 'react';

export default function HeroHome() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
    {/* Hintergrundbild früh laden – es ist das grösste Element beim Öffnen der Startseite. */}
    <link rel="preload" as="image" href="/hero-auressa-main.jpg" fetchPriority="high" />
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url(/hero-auressa-main.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <style>{`
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
      `}</style>

      {/* Dark Overlay for Text Readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(31,20,16,0.45) 0%, rgba(31,20,16,0.35) 50%, rgba(31,20,16,0.25) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '700px',
        padding: '2rem 1.25rem',
        textAlign: 'left',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontSize: 'clamp(11px, 2vw, 13px)',
          color: '#D4AF37',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          margin: '0 0 1.5rem 0',
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none',
        }}>
          ✨ Dein perfekter Duft wartet
        </p>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(44px, 8vw, 64px)',
          fontWeight: 700,
          color: '#FFFFFF',
          margin: '0 0 1.2rem 0',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.35s both' : 'none',
          textShadow: '0 4px 12px rgba(31,20,16,0.5)',
        }}>
          Finde deinen Signature-Duft
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 18px)',
          color: '#F5F1E8',
          lineHeight: 1.7,
          margin: '0 0 2.5rem 0',
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.5s both' : 'none',
          maxWidth: '500px',
        }}>
          Mit Duft-Quiz, Duft-Detektiv und geprüften Daten zu jedem Duft.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.65s both' : 'none',
        }}>
          <a href="/quiz" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #D4AF37 0%, #E5C158 100%)',
            color: '#1F1410',
            fontWeight: 700,
            padding: 'clamp(12px, 2.5vw, 15px) clamp(24px, 5vw, 32px)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: 'clamp(14px, 2vw, 16px)',
            letterSpacing: '0.05em',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 8px 24px rgba(212,175,55,0.3)',
            border: 'none',
            cursor: 'pointer',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(212,175,55,0.45)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,175,55,0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            🎯 Quiz starten
          </a>

          <a href="#scanner-coming-soon" style={{
            display: 'inline-block',
            background: 'rgba(245,241,232,0.15)',
            color: '#F5F1E8',
            fontWeight: 700,
            padding: 'clamp(12px, 2.5vw, 15px) clamp(24px, 5vw, 32px)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: 'clamp(14px, 2vw, 16px)',
            letterSpacing: '0.05em',
            border: '2px solid #F5F1E8',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(245,241,232,0.25)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(245,241,232,0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            📷 Scanner (bald)
          </a>
        </div>
      </div>

      {/* Hidden target for scanner button */}
      <div id="scanner-coming-soon" style={{ display: 'none' }} />
    </section>
    </>
  );
}
