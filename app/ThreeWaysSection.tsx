'use client';

import { useState } from 'react';

export default function ThreeWaysSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [
    {
      id: 'scanner',
      icon: '📷',
      title: 'Duft-Scanner',
      description: 'Fotografiere einen Duft → wir identifizieren ihn und finden ähnliche',
      gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
      borderColor: 'rgba(14, 165, 233, 0.3)',
      textColor: '#0EA5E9',
      darkTextColor: '#0c4a6e',
      accentColor: '#0EA5E9',
    },
    {
      id: 'quiz',
      icon: '🎯',
      title: 'Duft-Quiz',
      description: 'Beantworte 12 Fragen → wir berechnen deinen perfekten Match',
      gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      textColor: '#DC2626',
      darkTextColor: '#7f1d1d',
      accentColor: '#DC2626',
    },
    {
      id: 'database',
      icon: '🔍',
      title: 'Datenbank durchsuchen',
      description: 'Durchstöbere 400+ Düfte, filtere nach Familie, Saison und mehr',
      gradient: 'linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 100%)',
      borderColor: 'rgba(146, 64, 14, 0.3)',
      textColor: '#92400E',
      darkTextColor: '#451a03',
      accentColor: '#92400E',
    },
  ];

  return (
    <section style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
      padding: 'clamp(4rem, 10vw, 6rem) 1.25rem',
      borderBottom: '1px solid rgba(212,175,55,0.15)',
    }}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Heading */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vw, 4rem)',
        }}>
          <p style={{
            fontSize: 'clamp(11px, 2vw, 13px)',
            color: '#D4AF37',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '1rem',
            margin: '0 0 1rem 0',
          }}>
            3 WEGE ZUR ENTDECKUNG
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 700,
            color: '#1F1410',
            margin: '0 0 1.2rem 0',
            letterSpacing: '-0.02em',
          }}>
            Wähle deinen Weg
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 2.2vw, 17px)',
            color: '#6B5344',
            marginBottom: 0,
            lineHeight: 1.7,
            maxWidth: '650px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Je nachdem, wie du deinen Duft am liebsten entdeckst – schnell, emotional oder explorativ.
          </p>
        </div>

        {/* 3-Wege Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 4vw, 2.5rem)',
        }}>
          {cards.map((card, idx) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: card.gradient,
                padding: 'clamp(2.5rem, 5vw, 3rem)',
                borderRadius: '16px',
                border: `2px solid ${card.borderColor}`,
                textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: hoveredCard === card.id ? 'translateY(-12px)' : 'translateY(0)',
                boxShadow: hoveredCard === card.id
                  ? `0 20px 48px rgba(212,175,55,0.2)`
                  : '0 8px 24px rgba(0,0,0,0.06)',
                animation: `slideUp 0.6s ease-out ${idx * 0.15}s both`,
                cursor: 'pointer',
              }}>
              <div style={{
                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                marginBottom: '1.2rem',
                animation: hoveredCard === card.id ? 'iconBounce 0.6s ease-in-out infinite' : 'none',
                transition: 'transform 0.3s ease-out',
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(20px, 3.5vw, 26px)',
                fontWeight: 700,
                color: card.textColor,
                margin: '0 0 0.8rem 0',
                transition: 'all 0.3s ease-out',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: 'clamp(14px, 2vw, 16px)',
                color: card.darkTextColor,
                lineHeight: 1.7,
                margin: 0,
                transition: 'all 0.3s ease-out',
              }}>
                {card.description}
              </p>

              {/* Hover Accent Line */}
              <div style={{
                height: '3px',
                background: card.accentColor,
                marginTop: '1.5rem',
                borderRadius: '2px',
                transform: hoveredCard === card.id ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: 'center',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
