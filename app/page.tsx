import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPerfumes, getPerfumeCount, isWithinPriceCap, MAX_PRICE_CHF, type Perfume } from '@/lib/perfumes';
import { findCheaperAlternativesV2 } from '@/lib/similarity';
import { computeAuressaScore } from '@/lib/score';
import { guides } from '@/lib/guides';
import { PerfumeTile } from '@/app/PerfumeTile';
import { PerfumeVisual } from '@/app/components/PerfumeVisual';
import { Reveal } from '@/app/components/Reveal';
import { GiftBanner } from '@/app/GiftBanner';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL }
};

// Startseite immer frisch (neue Düfte erscheinen sofort).
export const revalidate = 0;

const FEATURED_GUIDE_SLUGS = [
  'parfum-trends-2026',
  'guenstige-alternativen-zu-teuren-dueften',
  'parfum-und-hauttyp-was-passt-zu-meiner-haut'
];

const FAMILIES: { code: string; label: string; desc: string }[] = [
  { code: 'clean', label: 'Frisch', desc: 'Zitrus, Meer, saubere Wäsche' },
  { code: 'floral', label: 'Blumig', desc: 'Rose, Jasmin, Pfingstrose' },
  { code: 'gourmand', label: 'Süss', desc: 'Vanille, Karamell, Tonka' },
  { code: 'woody', label: 'Holzig', desc: 'Sandelholz, Zeder, Vetiver' }
];

// Dekorative Flakons für die Duftrichtungs-Kacheln (keine echten Produkte).
function decoFlacon(family: string): Perfume {
  return {
    id: `deco-${family}`,
    slug: `deco-${family}`,
    perfume_name: 'Auressa',
    brands: { name: 'Auressa' },
    fragrance_family: family,
    concentration: null,
    gender: null,
    price_chf: null,
    longevity: null,
    sillage: null,
    scentmatch_score: null,
    season: null,
    occasion: null,
    description: null,
    image_url: null,
    affiliate_url: null,
    top_notes: null,
    heart_notes: null,
    base_notes: null
  };
}

// Aktuelle Jahreszeit in der Schweiz.
function currentSeason(): { label: string; match: string[] } {
  const month = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich' })).getMonth() + 1;
  if (month >= 3 && month <= 5) return { label: 'Frühling', match: ['Frühling'] };
  if (month >= 6 && month <= 8) return { label: 'Sommer', match: ['Sommer'] };
  if (month >= 9 && month <= 11) return { label: 'Herbst', match: ['Herbst'] };
  return { label: 'Winter', match: ['Winter'] };
}

function byScore(a: Perfume, b: Perfume): number {
  return computeAuressaScore(b).total - computeAuressaScore(a).total;
}

const WAYS = [
  {
    href: '/quiz',
    title: 'Duft-Quiz',
    text: 'Ein paar kurze Fragen zu Geschmack, Anlass und Budget – du bekommst deinen persönlichen Match.',
    meta: 'ca. 2 Minuten',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg>
    )
  },
  {
    href: '/dupes',
    title: 'Dupe-Finder',
    text: 'Gib deinen teuren Lieblingsduft ein und finde ähnlich riechende Alternativen bis CHF 180.',
    meta: 'spart oft über 50 %',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h11l-3-3M17 17H6l3 3" /></svg>
    )
  },
  {
    href: '/stimmungen',
    title: 'Nach Stimmung',
    text: 'Verwöhnen, runterkommen, strahlen? Wähl ein Gefühl – wir zeigen dir passende Düfte.',
    meta: 'ohne Fragen',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c2 4 6 5 6 10a6 6 0 0 1-12 0c0-5 4-6 6-10z" /></svg>
    )
  }
];

export default async function Page() {
  let perfumes: Perfume[] = [];
  let catalogCount = 0;
  try {
    [perfumes, catalogCount] = await Promise.all([getPerfumes(2000), getPerfumeCount()]);
  } catch (error) {
    console.error('Startseite: Düfte konnten nicht geladen werden', error);
  }

  const recommendable = perfumes.filter((p) => p.slug && isWithinPriceCap(p));
  const popular = [...recommendable].sort(byScore).slice(0, 8);

  const season = currentSeason();
  const seasonal = recommendable
    .filter((p) => p.season && (season.match.some((s) => p.season!.includes(s)) || /ganzj/i.test(p.season)))
    .sort(byScore)
    .slice(0, 4);

  // Bestes Dupe-Beispiel: teurer Duft mit einer klar günstigeren, ähnlichen Alternative.
  let dupe: { original: Perfume; alt: Perfume; saving: number; pct: number } | null = null;
  for (const original of [...perfumes].filter((p) => p.slug && p.price_chf).sort((a, b) => b.price_chf! - a.price_chf!)) {
    const [best] = findCheaperAlternativesV2(original, perfumes, 1);
    if (best && best.perfume.price_chf != null && original.price_chf != null) {
      const saving = original.price_chf - best.perfume.price_chf;
      dupe = { original, alt: best.perfume, saving, pct: Math.round((saving / original.price_chf) * 100) };
      break;
    }
  }

  const familyCount = (code: string) => perfumes.filter((p) => p.fragrance_family === code).length;
  const featuredGuides = FEATURED_GUIDE_SLUGS.map((slug) => guides.find((g) => g.slug === slug)).filter(
    (g): g is (typeof guides)[number] => Boolean(g)
  );

  return (
    <main className="hm">
      <GiftBanner />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hm-hero">
        <div className="hm-hero-inner">
          <div className="hm-hero-text">
            <p className="hm-eyebrow">Duftberatung aus der Schweiz</p>
            <h1>
              Finde deinen Duft. <em>Ohne zu viel zu bezahlen.</em>
            </h1>
            <p className="hm-lead">
              Persönliche Empfehlungen für Düfte bis CHF {MAX_PRICE_CHF} – mit Quiz, Dupe-Finder und ehrlichen Vergleichen.
            </p>
            <div className="hm-hero-cta">
              <Link href="/quiz" className="hm-btn hm-btn-gold">Quiz starten</Link>
              <Link href="/dupes" className="hm-btn hm-btn-ghost">Günstige Alternative finden</Link>
            </div>
            <ul className="hm-trust">
              {catalogCount > 0 && <li>{catalogCount} {catalogCount === 1 ? 'Duft' : 'Düfte'} im Katalog</li>}
              <li>alle Empfehlungen bis CHF {MAX_PRICE_CHF}</li>
              <li>ohne Konto</li>
            </ul>
          </div>
          <div className="hm-hero-visual">
            <div className="hm-hero-photo">
              <Image
                src="/hero-auressa-main.png"
                alt="Goldener Auressa-Flakon im Sonnenlicht"
                fill
                priority
                sizes="(max-width: 860px) 100vw, 46vw"
                style={{ objectFit: 'cover', objectPosition: '35% 55%' }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="hm-wrap">
        {/* ── DREI WEGE ───────────────────────────────────────── */}
        <Reveal as="section" className="hm-section">
          <p className="dp-kicker">So einfach geht&apos;s</p>
          <h2 className="hm-h2">Drei Wege zu deinem Duft</h2>
          <div className="hm-ways">
            {WAYS.map((w, i) => (
              <Link href={w.href} className="hm-way" key={w.href} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="hm-way-icon">{w.icon}</span>
                <span className="hm-way-meta">{w.meta}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <span className="hm-way-go">Los geht&apos;s →</span>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* ── BELIEBT ─────────────────────────────────────────── */}
        {popular.length > 0 && (
          <Reveal as="section" className="hm-section">
            <div className="hm-head">
              <div>
                <p className="dp-kicker">Top bewertet</p>
                <h2 className="hm-h2">Beliebt bei Auressa</h2>
              </div>
              <Link href="/duefte" className="hm-more">Alle Düfte →</Link>
            </div>
            <div className="hm-scroller">
              {popular.map((p) => (
                <div className="hm-scroller-item" key={p.id}>
                  <PerfumeTile perfume={p} />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ── DUPE-BEISPIEL ───────────────────────────────────── */}
        <Reveal as="section" className="hm-section hm-dupe">
          <div className="hm-dupe-text">
            <p className="dp-kicker">Dupe-Finder</p>
            <h2 className="hm-h2">Gleicher Stil. Kleinerer Preis.</h2>
            <p>
              Viele teure Lieblingsdüfte haben ähnlich riechende Alternativen, die nur einen Bruchteil kosten. Wir zeigen
              dir ehrlich, wie ähnlich sie wirklich sind.
            </p>
            <Link href="/dupes" className="hm-btn hm-btn-dark">Dupe-Finder starten</Link>
          </div>
          {dupe && (
            <div className="hm-dupe-card">
              <Link href={`/duft/${dupe.original.slug}`} className="hm-dupe-side">
                <PerfumeVisual perfume={dupe.original} />
                <span className="tile-brand">{dupe.original.brands?.name}</span>
                <strong>{dupe.original.perfume_name}</strong>
                <span className="hm-dupe-price is-old">CHF {dupe.original.price_chf}</span>
              </Link>
              <div className="hm-dupe-arrow">
                <span>−{dupe.pct} %</span>
              </div>
              <Link href={`/duft/${dupe.alt.slug}`} className="hm-dupe-side">
                <PerfumeVisual perfume={dupe.alt} />
                <span className="tile-brand">{dupe.alt.brands?.name}</span>
                <strong>{dupe.alt.perfume_name}</strong>
                <span className="hm-dupe-price">CHF {dupe.alt.price_chf}</span>
              </Link>
            </div>
          )}
        </Reveal>

        {/* ── DUFTRICHTUNGEN ──────────────────────────────────── */}
        <Reveal as="section" className="hm-section">
          <p className="dp-kicker">Duftrichtungen</p>
          <h2 className="hm-h2">Was magst du?</h2>
          <div className="hm-families">
            {FAMILIES.map((f) => {
              const n = familyCount(f.code);
              return (
                <Link href={`/duefte?family=${f.code}`} className={`hm-family hm-family-${f.code}`} key={f.code}>
                  <span className="hm-family-flacon"><PerfumeVisual perfume={decoFlacon(f.code)} /></span>
                  <span className="hm-family-text">
                    <strong>{f.label}</strong>
                    <span>{f.desc}</span>
                    {n > 0 && <small>{n} {n === 1 ? 'Duft' : 'Düfte'}</small>}
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>

        {/* ── SAISON ──────────────────────────────────────────── */}
        {seasonal.length > 0 && (
          <Reveal as="section" className="hm-section">
            <div className="hm-head">
              <div>
                <p className="dp-kicker">Jetzt passend</p>
                <h2 className="hm-h2">Düfte für den {season.label}</h2>
              </div>
              <Link href="/saisonal" className="hm-more">Mehr →</Link>
            </div>
            <div className="perfume-list">
              {seasonal.map((p) => <PerfumeTile perfume={p} key={p.id} />)}
            </div>
          </Reveal>
        )}

        {/* ── RATGEBER ────────────────────────────────────────── */}
        {featuredGuides.length > 0 && (
          <Reveal as="section" className="hm-section">
            <div className="hm-head">
              <div>
                <p className="dp-kicker">Ratgeber</p>
                <h2 className="hm-h2">Wissen, das hilft</h2>
              </div>
              <Link href="/ratgeber" className="hm-more">Alle {guides.length} Artikel →</Link>
            </div>
            <div className="hm-guides">
              {featuredGuides.map((g) => (
                <Link href={`/ratgeber/${g.slug}`} className="hm-guide" key={g.slug}>
                  <h3>{g.title}</h3>
                  <p>{g.description}</p>
                  <span>Weiterlesen →</span>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
