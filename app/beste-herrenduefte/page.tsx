import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/app/Breadcrumb';
import { AffiliateButton } from '@/app/AffiliateButton';
import { getPerfumes, type Perfume } from '@/lib/perfumes';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Die besten Herrendüfte – Parfum-Empfehlungen',
  description:
    'Die besten Herren-Parfums im Überblick: Von frisch-aquatisch bis dunkel-holzig. Mit Duftprofil, Noten, Preisen und günstigen Alternativen.',
  alternates: { canonical: `${SITE_URL}/beste-herrenduefte` },
  openGraph: {
    title: 'Die besten Herrendüfte | Auressa',
    description: 'Unsere Top-Empfehlungen für Herren-Parfums – mit Duftprofil, Noten und Preisen.',
    type: 'website',
    url: `${SITE_URL}/beste-herrenduefte`,
  },
};

const FAMILY_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  floral:   { bg: '#fce8f0', color: '#8b1a4a', label: 'Blumig' },
  woody:    { bg: '#f0e8d8', color: '#5c3d1a', label: 'Holzig' },
  clean:    { bg: '#e8f4fc', color: '#1a4a6b', label: 'Frisch' },
  gourmand: { bg: '#fef3e2', color: '#7a4a0a', label: 'Gourmand' },
};

function FamilyBadge({ family }: { family: string | null }) {
  if (!family) return null;
  const cfg = FAMILY_COLORS[family] || { bg: '#f0f0f0', color: '#555', label: family };
  return (
    <span style={{
      display: 'inline-block',
      background: cfg.bg,
      color: cfg.color,
      fontSize: '0.7rem',
      fontWeight: 700,
      padding: '0.15rem 0.5rem',
      borderRadius: '20px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    }}>{cfg.label}</span>
  );
}

function RankCard({ p, rank }: { p: Perfume; rank: number }) {
  const brandName = p.brands?.name ?? '';
  return (
    <div className="tile" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{
        flexShrink: 0,
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        background: rank <= 3 ? 'linear-gradient(135deg, #c8a227, #d4af37)' : '#f0e8d8',
        color: rank <= 3 ? '#2a1d12' : '#8c7060',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1rem',
      }}>
        {rank}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div>
            {brandName && (
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#8c7060', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {p.brands?.slug ? (
                  <Link href={`/marke/${p.brands.slug}`} style={{ color: '#8c7060', textDecoration: 'none' }}>
                    {brandName}
                  </Link>
                ) : brandName}
              </p>
            )}
            <h3 style={{ margin: '0.1rem 0 0', fontSize: '1rem', lineHeight: 1.3, color: '#2a1d12' }}>
              {p.perfume_name}
            </h3>
          </div>
          <FamilyBadge family={p.fragrance_family} />
        </div>

        {p.price_chf != null && (
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#6b5344', fontWeight: 600 }}>
            ca. CHF {p.price_chf}
          </p>
        )}

        {p.top_notes && p.top_notes.length > 0 && (
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#8c7060', fontStyle: 'italic' }}>
            {p.top_notes.slice(0, 4).join(' · ')}
          </p>
        )}

        {p.scentmatch_score != null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: '4px', background: '#e8e0d4', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${p.scentmatch_score}%`, height: '100%', background: 'linear-gradient(90deg,#c8a227,#d4af37)', borderRadius: '2px' }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: '#8c7060', whiteSpace: 'nowrap' }}>
              {p.scentmatch_score}/100
            </span>
          </div>
        )}

        <div className="cta" style={{ paddingTop: '0.25rem' }}>
          {p.slug && (
            <Link className="button secondary" href={`/duft/${p.slug}`} style={{ fontSize: '0.82rem' }}>
              Duftprofil
            </Link>
          )}
          <AffiliateButton perfume={p} showNote={false} />
        </div>
      </div>
    </div>
  );
}

export default async function BesteHerrenduefte() {
  const all = await getPerfumes(2000);

  const top = all
    .filter((p) => (p.gender === 'Men' || p.gender === 'Unisex') && p.scentmatch_score != null)
    .sort((a, b) => {
      const scoreDiff = (b.scentmatch_score ?? 0) - (a.scentmatch_score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      return (a.price_chf ?? 9999) - (b.price_chf ?? 9999);
    })
    .slice(0, 15);

  if (top.length === 0) notFound();

  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Die besten Herrendüfte',
    description: 'Top-Herrendüfte nach Auressa-Score: Duftprofil, Noten und Preise im Überblick.',
    url: `${SITE_URL}/beste-herrenduefte`,
    numberOfItems: top.length,
    itemListElement: top.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${p.brands?.name ?? ''} ${p.perfume_name}`.trim(),
      url: p.slug ? `${SITE_URL}/duft/${p.slug}` : `${SITE_URL}/beste-herrenduefte`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Beste Herrendüfte', item: `${SITE_URL}/beste-herrenduefte` },
    ],
  };

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Die besten Herrendüfte', href: '/beste-herrenduefte' }]} />

      <section style={{
        background: 'linear-gradient(145deg, #12181e 0%, #1e2d3d 50%, #2d4157 100%)',
        padding: 'clamp(2.5rem, 8vw, 4.5rem) 1.25rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,160,220,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.8)',
            marginBottom: '0.6rem',
          }}>
            Top-Liste · Herren
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 700,
            color: '#f5e6d0',
            margin: '0 0 1rem',
            lineHeight: 1.15,
          }}>
            Die {top.length} besten Herrendüfte
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(245,230,208,0.75)',
            maxWidth: '480px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}>
            Top-Parfums für Herren — von frisch-aquatisch bis dunkel-holzig.
            Bewertet nach Langlebigkeit, Sillage und Preis-Leistung.
          </p>
          <Link href="/quiz" style={{
            display: 'inline-block',
            background: '#d4af37',
            color: '#2a1d12',
            fontWeight: 700,
            padding: '0.7rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}>
            Persönlichen Match finden →
          </Link>
        </div>
      </section>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.25rem' }}>
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation" style={{ marginBottom: '2rem' }}>
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span className="breadcrumb-current" aria-current="page">Beste Herrendüfte</span>
        </nav>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#2a1d12',
            marginBottom: '0.75rem',
          }}>
            Wie wählen wir aus?
          </h2>
          <p style={{ color: '#6b5344', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Die Rangliste basiert auf dem <strong>Auressa-Score</strong> — einem Qualitätswert,
            der Langlebigkeit, Sillage, Vielseitigkeit und Preis-Leistung vereint.
            Herren- und Unisex-Düfte werden gemeinsam bewertet. Für deinen persönlichen
            Top-Duft empfehlen wir das{' '}
            <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>
              Duft-Quiz
            </Link>.
          </p>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {top.map((p, i) => (
            <RankCard key={p.id} p={p} rank={i + 1} />
          ))}
        </div>

        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#faf7f2',
          marginTop: '3rem',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Noch nicht sicher?
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#faf7f2', marginBottom: '0.75rem' }}>
            Finde deinen perfekten Duft
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.7)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Unser Quiz berücksichtigt deinen Stil, deine Lieblingsmomente und dein Budget.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/quiz" style={{
              background: '#d4af37', color: '#2a1d12', fontWeight: 700,
              padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem',
            }}>Quiz starten</Link>
            <Link href="/beste-damenduefte" style={{
              background: 'transparent', color: '#faf7f2', fontWeight: 600,
              padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem',
              border: '1px solid rgba(250,247,242,0.3)',
            }}>Beste Damendüfte</Link>
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </main>
  );
}
