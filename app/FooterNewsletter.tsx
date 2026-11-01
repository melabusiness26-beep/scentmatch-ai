'use client';

import NewsletterForm from '@/app/NewsletterForm';

export default function FooterNewsletter() {
  return (
    <div className="container footer-newsletter">
      <div style={{
        maxWidth: '640px',
        margin: 0,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: -20,
          right: -40,
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: 'clamp(11px, 2vw, 13px)',
            color: '#8A6D1A',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            margin: '0 0 12px 0',
          }}>
            Bleib informiert
          </p>

          <NewsletterForm
            source="footer"
            title="Duft-Tipps per E-Mail"
            text="Neue Düfte, Spar-Tipps und Empfehlungen – direkt in dein Postfach. Ab und zu, nie Spam."
          />
        </div>
      </div>
    </div>
  );
}
