'use client';

export default function ThreeWaysSection() {
  return (
    <section style={{
      background: '#FFFFFF',
      padding: 'clamp(3rem, 8vw, 5rem) 1.25rem',
      borderBottom: '1px solid rgba(212,175,55,0.1)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Heading */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
        }}>
          <p style={{
            fontSize: 'clamp(11px, 2vw, 13px)',
            color: '#D4AF37',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            marginBottom: '1rem',
            margin: '0 0 1rem 0',
          }}>
            3 WEGE ZUR ENTDECKUNG
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 700,
            color: '#1F1410',
            margin: '0 0 1rem 0',
            letterSpacing: '-0.02em',
          }}>
            Wähle deinen Weg
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            color: '#6B5344',
            marginBottom: 0,
            lineHeight: 1.6,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Je nachdem, wie du deinen Duft am liebsten entdeckst – schnell, emotional oder explorativ.
          </p>
        </div>

        {/* 3-Wege Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
        }}>
          {/* Card 1: Scanner */}
          <div style={{
            background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
            padding: 'clamp(2rem, 4vw, 2.5rem)',
            borderRadius: '12px',
            border: '1px solid rgba(14, 165, 233, 0.2)',
            textAlign: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
            }}>📷</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 700,
              color: '#0EA5E9',
              margin: '0 0 0.5rem 0',
            }}>
              Duft-Scanner
            </h3>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#0c4a6e',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Fotografiere einen Duft → wir identifizieren ihn und finden ähnliche
            </p>
          </div>

          {/* Card 2: Quiz */}
          <div style={{
            background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
            padding: 'clamp(2rem, 4vw, 2.5rem)',
            borderRadius: '12px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            textAlign: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
            }}>🎯</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 700,
              color: '#DC2626',
              margin: '0 0 0.5rem 0',
            }}>
              Duft-Quiz
            </h3>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#7f1d1d',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Beantworte 12 Fragen → wir berechnen deinen perfekten Match
            </p>
          </div>

          {/* Card 3: Datenbank */}
          <div style={{
            background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 100%)',
            padding: 'clamp(2rem, 4vw, 2.5rem)',
            borderRadius: '12px',
            border: '1px solid rgba(146, 64, 14, 0.2)',
            textAlign: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
            }}>🔍</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 700,
              color: '#92400E',
              margin: '0 0 0.5rem 0',
            }}>
              Datenbank durchsuchen
            </h3>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#451a03',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Durchstöbere 160+ Düfte, filtere nach Familie, Saison und mehr
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
