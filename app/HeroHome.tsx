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
      background: 'linear-gradient(135deg, #F5F1E8 0%, #FAF7F2 100%)',
      padding: 'clamp(2rem, 8vw, 5rem) 1.25rem',
      minHeight: 'auto',
      display: 'flex',
      alignItems: 'center',
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
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Subtle Background Gradient */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
      }}>
        {/* Left: Text & CTA */}
        <div>
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
            fontSize: 'clamp(40px, 7vw, 56px)',
            fontWeight: 700,
            color: '#1F1410',
            margin: '0 0 1.2rem 0',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.35s both' : 'none',
          }}>
            Finde deinen Signature-Duft
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            color: '#6B5344',
            lineHeight: 1.7,
            margin: '0 0 2rem 0',
            animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.5s both' : 'none',
          }}>
            Mit Quiz, Duft-Scanner und unserer intelligenten Match-Engine. Kostenlos, ohne Newsletter-Pflicht.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.65s both' : 'none',
          }}>
            <a href="/#quiz" style={{
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
              boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
              border: 'none',
              cursor: 'pointer',
            }} onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(212,175,55,0.35)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,175,55,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              🎯 Quiz starten
            </a>

            <a href="#scanner-coming-soon" style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#D4AF37',
              fontWeight: 700,
              padding: 'clamp(12px, 2.5vw, 15px) clamp(24px, 5vw, 32px)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: 'clamp(14px, 2vw, 16px)',
              letterSpacing: '0.05em',
              border: '2px solid #D4AF37',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
              📷 Scanner (Coming)
            </a>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: isLoaded ? 'slideInRight 0.9s ease-out 0.4s both' : 'none',
          position: 'relative',
          minHeight: '400px',
        }}>
          {/* Image Container with subtle shadow */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '350px',
            aspectRatio: '1 / 1.3',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(31,20,16,0.12)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}>
            {/* Placeholder with gradient - in production would be actual image */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #E8D4B8 0%, #D4AF37 50%, #C9A227 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
            }}>
              🧴
            </div>
          </div>
        </div>
      </div>

      {/* Hidden target for scanner button */}
      <div id="scanner-coming-soon" style={{ display: 'none' }} />
    </section>
  );
}
