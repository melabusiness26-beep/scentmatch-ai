import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ backgroundColor: '#faf7f2', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(145deg, #241912 0%, #4a3020 50%, #7a5535 100%)',
        padding: 'clamp(3rem, 10vw, 6rem) 1.25rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: '580px', margin: '0 auto' }}>
          {/* Flakon-Emoji als visueller Anker */}
          <div style={{ fontSize: 'clamp(3rem,10vw,5rem)', lineHeight: 1, marginBottom: '1rem' }}
               aria-hidden="true">🫙</div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.7)',
            marginBottom: '0.5rem',
          }}>
            404
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 700,
            color: '#f5e6d0',
            margin: '0 0 1rem',
            lineHeight: 1.2,
          }}>
            Dieser Duft ist verzogen.
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(245,230,208,0.7)',
            maxWidth: '420px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}>
            Die gesuchte Seite existiert nicht mehr oder wurde verschoben.
            Kein Problem — hier findest du trotzdem deinen perfekten Match.
          </p>

          {/* Schnell-Links */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/quiz" style={{
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.7rem 1.4rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}>
              Quiz starten
            </Link>
            <Link href="/duefte" style={{
              background: 'transparent',
              color: '#f5e6d0',
              fontWeight: 600,
              padding: '0.7rem 1.4rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              border: '1px solid rgba(245,230,208,0.3)',
            }}>
              Alle Düfte
            </Link>
          </div>
        </div>
      </section>

      {/* Schnell-Navigation */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.25rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#2a1d12',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          Wohin möchtest du?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { href: '/quiz',          icon: '🎯', label: 'Duft-Quiz',       sub: 'In 2 Minuten zum Match' },
            { href: '/duft-detektiv',  icon: '🔍', label: 'Duft-Detektiv',   sub: 'Duft identifizieren' },
            { href: '/ratgeber',       icon: '📖', label: 'Ratgeber',         sub: '50+ Duft-Artikel' },
            { href: '/marke',          icon: '✦',  label: 'Marken',           sub: 'Alle Marken A–Z' },
            { href: '/dupes',          icon: '💸', label: 'Dupes',            sub: 'Günstige Alternativen' },
            { href: '/geschenk-finder',icon: '🎁', label: 'Geschenk-Finder',  sub: 'Das perfekte Duft-Geschenk' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="guide-tile"
              style={{ padding: '1.1rem 1.25rem' }}
            >
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{item.icon}</span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#2a1d12',
              }}>{item.label}</span>
              <span style={{ fontSize: '0.78rem', color: '#8c7060' }}>{item.sub}</span>
            </Link>
          ))}
        </div>

        {/* Zurück-Link */}
        <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.85rem', color: '#8c7060' }}>
          Oder geh einfach{' '}
          <Link href="/" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>
            zur Startseite →
          </Link>
        </p>
      </div>
    </main>
  );
}
