'use client';

import Link from 'next/link';

export const metadata = {
  title: 'Newsletter bestätigt | Auressa',
  description: 'Dein Newsletter-Abo ist bestätigt! Schau rein in unsere Duft-Empfehlungen.',
};

export default function NewsletterConfirmedPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFFBF7 0%, #F9F3EA 100%)',
      padding: '1.5rem',
    }}>
      <div style={{
        maxWidth: '600px',
        textAlign: 'center',
        background: 'white',
        padding: 'clamp(2rem, 8vw, 3.5rem)',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(212, 175, 55, 0.15)',
      }}>
        {/* Emoji */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1.5rem',
          animation: 'bounce 0.6s ease-in-out',
        }}>
          ✨
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 5vw, 36px)',
          fontWeight: 700,
          color: '#1F1410',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Bestätigt! 🎉
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: 'clamp(16px, 3vw, 18px)',
          color: '#6B5344',
          lineHeight: 1.7,
          marginBottom: '2rem',
          fontWeight: 500,
        }}>
          Dein Newsletter-Abo ist nun aktiviert. Wir senden dir schon bald personalisierte Duft-Empfehlungen basierend auf deinen Vorlieben.
        </p>

        {/* Content */}
        <div style={{
          background: 'rgba(212, 175, 55, 0.08)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left',
        }}>
          <h2 style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#D4AF37',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.8rem',
          }}>
            Was kommt als nächstes?
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {['Willkommens-Email mit deinen Top 3 Duft-Empfehlungen', 'Wöchentliche Newsletter mit neuen Düften', 'Personalisierte Angebote basierend auf deinen Vorlieben'].map((item, i) => (
              <li key={i} style={{
                color: '#6B5344',
                marginBottom: '0.6rem',
                fontSize: '0.95rem',
                display: 'flex',
                gap: '0.8rem',
              }}>
                <span style={{ color: '#D4AF37', fontWeight: 700 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link
          href="/duefte"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #D4AF37 0%, #E5C158 100%)',
            color: '#1F1410',
            fontWeight: 700,
            padding: '0.9rem 2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '1rem',
            letterSpacing: '0.02em',
            boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer',
            marginTop: '0.5rem',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            (e.target as HTMLElement).style.boxShadow = '0 12px 32px rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3)';
          }}
        >
          Düfte entdecken →
        </Link>

        {/* Footer */}
        <p style={{
          fontSize: '0.85rem',
          color: '#9A8780',
          marginTop: '1.5rem',
          borderTop: '1px solid rgba(212, 175, 55, 0.1)',
          paddingTop: '1.5rem',
        }}>
          Bei Fragen oder Problemen{' '}
          <a href="mailto:melanieviele@hotmail.ch" style={{
            color: '#D4AF37',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            kontaktiere uns
          </a>
          .
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </main>
  );
}
