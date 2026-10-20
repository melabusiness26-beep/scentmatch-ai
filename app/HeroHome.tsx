'use client';

export default function HeroHome() {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
      padding: 'clamp(3rem, 10vw, 6rem) 1.25rem',
      borderBottom: '1px solid rgba(212,175,55,0.15)',
    }}>
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
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
      }}>
        {/* Left: Text & CTA */}
        <div>
          <p style={{
            fontSize: 'clamp(12px, 2vw, 14px)',
            color: '#D4AF37',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            marginBottom: '1rem',
            margin: '0 0 1rem 0',
          }}>
            ✨ Dein perfekter Duft wartet
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 7vw, 54px)',
            fontWeight: 700,
            color: '#1F1410',
            margin: '0 0 1.5rem 0',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            Finde deinen Signature-Duft
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            color: '#6B5344',
            lineHeight: 1.7,
            marginBottom: '2rem',
            margin: '0 0 2rem 0',
          }}>
            Mit Quiz, Duft-Scanner und unserer intelligenten Match-Engine. Kostenlos, ohne Newsletter-Pflicht.
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
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
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
              border: 'none',
              cursor: 'pointer',
            }} onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(212,175,55,0.3)';
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

        {/* Right: Visual Element (Illustration/Emoji) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '350px',
          fontSize: 'clamp(80px, 15vw, 200px)',
          opacity: 0.9,
        }}>
          🧴
        </div>
      </div>

      {/* Hidden target for scanner button */}
      <div id="scanner-coming-soon" style={{ display: 'none' }} />
    </section>
  );
}
