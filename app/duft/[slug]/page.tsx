import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPerfumeBySlug,
  getAllPerfumeSlugs,
  getPerfumes,
  describePerfume,
  type Perfume
} from '@/lib/perfumes';
import { findSimilarPerfumesV2, findCheaperAlternativesV2 } from '@/lib/similarity';
import { noteHref } from '@/lib/notes-glossary';
import { getCuratedLink } from '@/lib/curated-links';
import { AffiliateButton } from '@/app/AffiliateButton';
import { AmazonButton } from '@/app/AmazonButton';
import { SocialShareButtons } from '@/app/SocialShareButtons';
import { PerfumeTile } from '@/app/PerfumeTile';
import { PerfumeVisual } from '@/app/components/PerfumeVisual';
import { Reveal } from '@/app/components/Reveal';
import { StickyBuyBar } from '@/app/components/StickyBuyBar';
import { computeAccords } from '@/lib/accords';

// Kurzes Geschlechts-Label + Symbol für die Badge (passend zu den Duft-Kacheln).
const genderBadge: Record<string, string> = {
  Women: 'Weiblich',
  Men: 'Männlich',
  Unisex: 'Unisex'
};
const genderSymbol: Record<string, string> = {
  Women: '♀',
  Men: '♂',
  Unisex: '⚥'
};

// Detailseiten werden stündlich neu generiert (frische Daten, schnelle Auslieferung).
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

const familyLabels: Record<string, string> = {
  clean: 'Clean / Frisch',
  gourmand: 'Gourmand / Süss',
  woody: 'Woody / Holzig',
  floral: 'Floral / Blumig'
};

function familyLabel(code: string | null): string {
  if (!code) return 'Duftfamilie offen';
  return familyLabels[code] || code;
}

// Kürzt einen Text auf sinnvolle Meta-Description-Länge (an der Wortgrenze).
function metaTrim(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trim()}…`;
}

// Erzeugt alle Duftseiten beim Build vor (gut für SEO und Tempo).
export async function generateStaticParams() {
  const slugs = await getAllPerfumeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  if (!perfume) {
    return { title: 'Duft nicht gefunden' };
  }

  const brand = perfume.brands?.name ? ` von ${perfume.brands.name}` : '';
  // Haupttitel ohne „| Auressa" – die Marke haengt das globale Titel-Template
  // (%s | Auressa) automatisch an. So entsteht kein doppeltes „| Auressa".
  const title = `${perfume.perfume_name}${brand} – Duftprofil & Bewertung`;
  // Abwechslungsreiche Beschreibung aus echten Duftdaten (statt gleicher Schablone
  // auf hunderten Seiten) – gut gegen „dünnen/doppelten Inhalt".
  const description = metaTrim(perfume.description || describePerfume(perfume));

  return {
    title,
    description,
    alternates: { canonical: `/duft/${slug}` },
    openGraph: {
      title: `${title} | Auressa`,
      description,
      type: 'article',
      url: `${SITE_URL}/duft/${slug}`
    }
  };
}

// Kurze Stimmung je Duftfamilie – eine Zeile unter dem Namen.
const familyMood: Record<string, string> = {
  clean: 'Klar, frisch und unkompliziert – wie frische Wäsche und Morgenluft.',
  gourmand: 'Warm, süss und verführerisch – ein Duft zum Anlehnen.',
  woody: 'Ruhig, edel und selbstbewusst – mit Tiefe und Wärme.',
  floral: 'Blumig, elegant und zeitlos – weich und strahlend.'
};

// Haltbarkeit/Sillage (0–10) als 5 Punkte – auf einen Blick lesbar.
function Meter({ label, value, hint }: { label: string; value: number | null; hint: string }) {
  if (value == null) return null;
  const filled = Math.max(0, Math.min(5, Math.round(value / 2)));
  return (
    <div className="dp-fact">
      <span className="dp-fact-label">{label}</span>
      <span className="dp-meter" aria-label={`${label}: ${value} von 10`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={i < filled ? 'on' : ''} style={{ animationDelay: `${i * 90}ms` }} />
        ))}
      </span>
      <span className="dp-fact-hint">{hint}</span>
    </div>
  );
}

function longevityHint(v: number): string {
  if (v >= 8) return 'den ganzen Tag';
  if (v >= 6) return 'mehrere Stunden';
  if (v >= 4) return 'einige Stunden';
  return 'eher kurz';
}

function sillageHint(v: number): string {
  if (v >= 8) return 'füllt den Raum';
  if (v >= 6) return 'gut wahrnehmbar';
  if (v >= 4) return 'ausgewogen';
  return 'hautnah';
}

const seasonIcon: Record<string, string> = {
  'Frühling': '🌸',
  Sommer: '☀️',
  Herbst: '🍂',
  Winter: '❄️',
  'Ganzjährig': '🗓️'
};

function seasonDisplay(season: string): string {
  const icons = season
    .split(/[\/,]/)
    .map((s) => seasonIcon[s.trim()])
    .filter(Boolean)
    .join(' ');
  return icons ? `${icons} ${season}` : season;
}

const LAYERS: { key: 'top_notes' | 'heart_notes' | 'base_notes'; title: string; time: string }[] = [
  { key: 'top_notes', title: 'Kopfnoten', time: 'die ersten Minuten' },
  { key: 'heart_notes', title: 'Herznoten', time: 'nach ca. 30 Minuten' },
  { key: 'base_notes', title: 'Basisnoten', time: 'bleibt stundenlang' }
];

function jsonLd(perfume: Perfume) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: perfume.perfume_name,
    brand: perfume.brands?.name
      ? { '@type': 'Brand', name: perfume.brands.name }
      : undefined,
    category: familyLabel(perfume.fragrance_family),
    description:
      perfume.description ||
      `${perfume.perfume_name} – Duftprofil auf Auressa.`,
    image: perfume.image_url || undefined,
    // Redaktionelle Einschätzung von Auressa (kein vorgetäuschtes Nutzer-Rating).
    review: perfume.scentmatch_score
      ? {
          '@type': 'Review',
          author: { '@type': 'Organization', name: 'Auressa' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: (perfume.scentmatch_score / 20).toFixed(1),
            bestRating: '5'
          }
        }
      : undefined,
    offers:
      perfume.price_chf != null
        ? {
            '@type': 'Offer',
            price: perfume.price_chf,
            priceCurrency: 'CHF',
            url: `${SITE_URL}/duft/${perfume.slug}`
          }
        : undefined
  };
}

type Faq = { q: string; a: string };

// Baut FAQ-Einträge ausschließlich aus echten, vorhandenen Feldern – keine erfundenen Werte.
function buildFaqs(perfume: Perfume): Faq[] {
  const name = perfume.perfume_name;
  const faqs: Faq[] = [];
  if (perfume.longevity != null) {
    faqs.push({
      q: `Wie lange hält ${name}?`,
      a: `In unserer Einschätzung erreicht ${name} eine Haltbarkeit von ${perfume.longevity}/10.`
    });
  }
  if (perfume.sillage != null) {
    faqs.push({
      q: `Wie stark ist die Sillage von ${name}?`,
      a: `Die Sillage (Projektion) von ${name} liegt bei ${perfume.sillage}/10.`
    });
  }
  if (perfume.season) {
    faqs.push({
      q: `Für welche Jahreszeit eignet sich ${name}?`,
      a: `${name} passt besonders gut in die Saison ${perfume.season}.`
    });
  }
  if (perfume.occasion) {
    faqs.push({
      q: `Zu welchem Anlass passt ${name}?`,
      a: `${name} eignet sich besonders für Anlässe wie ${perfume.occasion}.`
    });
  }
  if (perfume.price_chf != null) {
    faqs.push({
      q: `Was kostet ${name}?`,
      a: `Der Richtpreis liegt bei ca. CHF ${perfume.price_chf}. Preise können je nach Shop abweichen.`
    });
  }
  return faqs;
}

function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function breadcrumbJsonLd(perfume: Perfume) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Düfte', item: `${SITE_URL}/duefte` },
      {
        '@type': 'ListItem',
        position: 3,
        name: perfume.perfume_name,
        item: `${SITE_URL}/duft/${perfume.slug}`
      }
    ]
  };
}

export default async function PerfumeDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  if (!perfume) notFound();

  const brandName = perfume.brands?.name || 'Marke offen';
  const hasNotes =
    (perfume.top_notes && perfume.top_notes.length > 0) ||
    (perfume.heart_notes && perfume.heart_notes.length > 0) ||
    (perfume.base_notes && perfume.base_notes.length > 0);

  // Ähnliche Düfte aus dem gesamten Katalog ermitteln (gleiche Familie,
  // geteilte Noten, ähnliche Intensität). Nur Treffer mit echter Ähnlichkeit zeigen.
  const pool = (await getPerfumes(2000)).filter((p) => p.slug);

  // Kuratierter Querverweis (z. B. Luxus <-> günstigere Alternative) mit eigenem Wortlaut.
  const curated = getCuratedLink(slug);
  const curatedPartner = curated ? pool.find((p) => p.slug === curated.partnerSlug) : undefined;
  const curatedSlug = curatedPartner?.slug;

  const cheaper = findCheaperAlternativesV2(perfume, pool, 3).filter(
    (c) => c.perfume.slug !== curatedSlug
  );
  const cheaperIds = new Set(cheaper.map((c) => c.perfume.id));
  // In den allgemeinen "ähnlich"-Vorschlägen die guenstigen Alternativen nicht doppelt zeigen.
  // Zuerst großzügig holen und filtern, DANN auf 4 kürzen – sonst würde das Kürzen auf 4
  // vor dem Filtern den Abschnitt oft fälschlich leeren (die günstigen Alternativen riechen
  // per Definition ähnlich und belegen sonst die Top-Plätze).
  const similar = findSimilarPerfumesV2(perfume, pool)
    .filter(
      (s) => !cheaperIds.has(s.perfume.id) && s.perfume.slug !== curatedSlug
    )
    .slice(0, 4);

  const faqs = buildFaqs(perfume);

  const accords = computeAccords(perfume);
  const description = perfume.description || describePerfume(perfume);
  const occasions = (perfume.occasion || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  return (
    <main className="dp">
      <noscript>
        <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      <div className="container">
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation">
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/duefte">Düfte</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span className="breadcrumb-current" aria-current="page">{perfume.perfume_name}</span>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className={`dp-hero dp-hero-${perfume.fragrance_family || 'none'}`}>
          <div className="dp-hero-visual">
            <PerfumeVisual perfume={perfume} size="hero" />
          </div>

          <div className="dp-hero-info">
            {perfume.brands?.slug ? (
              <Link href={`/marke/${perfume.brands.slug}`} className="dp-brand">{brandName}</Link>
            ) : (
              <p className="dp-brand">{brandName}</p>
            )}
            <h1 className="dp-title">{perfume.perfume_name}</h1>

            <div className="dp-chips">
              {perfume.fragrance_family && (
                <span className={`chip chip-family chip-${perfume.fragrance_family}`}>{familyLabel(perfume.fragrance_family)}</span>
              )}
              {perfume.gender && (
                <span className="chip">{genderSymbol[perfume.gender] || ''} {genderBadge[perfume.gender] || perfume.gender}</span>
              )}
              {perfume.concentration && <span className="chip">{perfume.concentration}</span>}
            </div>

            {perfume.fragrance_family && familyMood[perfume.fragrance_family] && (
              <p className="dp-mood">{familyMood[perfume.fragrance_family]}</p>
            )}

            <div className="dp-buy">
              <div className="dp-price">
                {perfume.price_chf != null ? (
                  <>
                    <span className="dp-price-label">Richtpreis</span>
                    <span className="dp-price-value">ca. CHF {perfume.price_chf}</span>
                    <span className="dp-price-note">kann je nach Shop und Grösse abweichen</span>
                  </>
                ) : (
                  <span className="dp-price-label">Preis noch offen</span>
                )}
              </div>
              {perfume.scentmatch_score != null && (
                <div
                  className="dp-score"
                  title="Redaktionelle Auressa-Einschätzung (0–100)"
                  style={{ ['--p' as string]: perfume.scentmatch_score } as React.CSSProperties}
                >
                  <span className="dp-score-num">{perfume.scentmatch_score}</span>
                  <span className="dp-score-label">Score</span>
                </div>
              )}
            </div>

            <div className="dp-actions" id="dp-actions">
              <AffiliateButton perfume={perfume} />
              <AmazonButton perfume={perfume} />
            </div>

            <div className="dp-share">
              <SocialShareButtons perfume={perfume} url={`${SITE_URL}/duft/${slug}`} />
            </div>
          </div>
        </section>

        {/* ── STECKBRIEF ───────────────────────────────────────── */}
        <Reveal as="section" className="dp-facts">
          <Meter label="Haltbarkeit" value={perfume.longevity} hint={perfume.longevity != null ? longevityHint(perfume.longevity) : ''} />
          <Meter label="Sillage" value={perfume.sillage} hint={perfume.sillage != null ? sillageHint(perfume.sillage) : ''} />
          {perfume.season && (
            <div className="dp-fact">
              <span className="dp-fact-label">Saison</span>
              <span className="dp-fact-value">{seasonDisplay(perfume.season)}</span>
            </div>
          )}
          {occasions.length > 0 && (
            <div className="dp-fact">
              <span className="dp-fact-label">Anlass</span>
              <span className="dp-fact-value">{occasions.join(' · ')}</span>
            </div>
          )}
        </Reveal>

        {/* ── DUFTCHARAKTER + PYRAMIDE ─────────────────────────── */}
        <div className="dp-grid">
          {accords.length > 0 && (
            <Reveal as="section" className="dp-card dp-accords">
              <p className="dp-kicker">Duftcharakter</p>
              <h2>So riecht {perfume.perfume_name}</h2>
              <ul className="accord-list">
                {accords.map((a, i) => (
                  <li key={a.code}>
                    <span className="accord-label">{a.label}</span>
                    <span className="accord-track">
                      <span
                        className="accord-bar"
                        style={{ width: `${a.value}%`, background: a.color, transitionDelay: `${150 + i * 120}ms` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="dp-footnote">Von Auressa aus den Duftnoten berechnet.</p>
            </Reveal>
          )}

          {hasNotes && (
            <Reveal as="section" className="dp-card dp-pyramid">
              <p className="dp-kicker">Duftpyramide</p>
              <h2>Wie sich der Duft entfaltet</h2>
              <ol className="pyr">
                {LAYERS.map(({ key, title, time }) => {
                  const notes = perfume[key];
                  if (!notes || notes.length === 0) return null;
                  return (
                    <li className={`pyr-layer pyr-${key}`} key={key}>
                      <div className="pyr-head">
                        <strong>{title}</strong>
                        <span>{time}</span>
                      </div>
                      <div className="pyr-notes">
                        {notes.map((note) => (
                          <Link className="note-chip" href={noteHref(note)} key={note}>{note}</Link>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          )}
        </div>

        {/* ── BESCHREIBUNG ─────────────────────────────────────── */}
        <Reveal as="section" className="dp-card dp-story">
          <p className="dp-kicker">Über den Duft</p>
          <p className="dp-story-text">{description}</p>
          {perfume.bottle_description && <p className="dp-story-text dp-story-bottle">{perfume.bottle_description}</p>}
          {perfume.scent_dna && perfume.scent_dna.length > 0 && (
            <div className="dp-dna">
              <span className="dp-fact-label">Erinnert an</span>
              <div className="dp-chips">
                {perfume.scent_dna.map((d) => <span className="chip" key={d}>{d}</span>)}
              </div>
            </div>
          )}
        </Reveal>

        {/* ── KURATIERTER QUERVERWEIS ──────────────────────────── */}
        {curated && curatedPartner && (
          <Reveal as="section" className="dp-section">
            <h2>{curated.heading}</h2>
            <p className="small">{curated.text}</p>
            <div className="perfume-list">
              <PerfumeTile perfume={curatedPartner} />
            </div>
          </Reveal>
        )}

        {/* ── GÜNSTIGE ALTERNATIVEN (DUPES) ────────────────────── */}
        {cheaper.length > 0 && (
          <Reveal as="section" className="dp-section">
            <p className="dp-kicker">Gleicher Stil, kleinerer Preis</p>
            <h2>Günstige Alternativen zu {perfume.perfume_name}</h2>
            <div className="dupe-list">
              {cheaper.map(({ perfume: c, level, sharedNotes }) => {
                const saving =
                  perfume.price_chf != null && c.price_chf != null ? perfume.price_chf - c.price_chf : null;
                const savingPct =
                  saving != null && perfume.price_chf ? Math.round((saving / perfume.price_chf) * 100) : null;
                const shared = [...(sharedNotes.top || []), ...(sharedNotes.heart || []), ...(sharedNotes.base || [])]
                  .filter(Boolean)
                  .slice(0, 4);
                return (
                  <article className="dupe-card" key={c.id}>
                    <div className="dupe-visual">
                      <PerfumeVisual perfume={c} />
                    </div>
                    <div className="dupe-body">
                      <span className="dupe-level">{level}</span>
                      <p className="tile-brand">{c.brands?.name || 'Marke offen'}</p>
                      <h3 className="tile-name">{c.perfume_name}</h3>
                      <div className="dupe-prices">
                        {c.price_chf != null && <span className="dupe-price">ca. CHF {c.price_chf}</span>}
                        {saving != null && saving > 0 && (
                          <span className="dupe-saving">
                            du sparst ~CHF {saving}
                            {savingPct ? ` (${savingPct} %)` : ''}
                          </span>
                        )}
                      </div>
                      {shared.length > 0 && (
                        <div className="dupe-shared">
                          <span>Gemeinsam:</span>
                          {shared.map((n) => <span className="note-chip note-chip-sm" key={n}>{n}</span>)}
                        </div>
                      )}
                      <div className="dupe-cta">
                        {c.slug && <Link className="button secondary" href={`/duft/${c.slug}`}>Duftprofil</Link>}
                        <AffiliateButton perfume={c} showNote={false} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="dp-footnote">Ähnlich bedeutet nicht identisch – Haltbarkeit und Ausstrahlung können abweichen.</p>
          </Reveal>
        )}

        {/* ── RIECHT ÄHNLICH WIE ───────────────────────────────── */}
        {similar.length > 0 && (
          <Reveal as="section" className="dp-section">
            <p className="dp-kicker">Entdecke mehr</p>
            <h2>Riecht ähnlich wie {perfume.perfume_name}</h2>
            <div className="perfume-list">
              {similar.map(({ perfume: s }) => (
                <PerfumeTile perfume={s} key={s.id} />
              ))}
            </div>
          </Reveal>
        )}

        {/* ── FAQ ──────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <Reveal as="section" className="dp-card dp-faq">
            <p className="dp-kicker">Gut zu wissen</p>
            <h2>Häufige Fragen</h2>
            {faqs.map((f, i) => (
              <details className="faq-acc" key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Reveal>
        )}

        {/* ── QUIZ-CTA ─────────────────────────────────────────── */}
        <Reveal as="section" className="dp-quiz">
          <h2>Passt {perfume.perfume_name} zu dir?</h2>
          <p>Mach das Duft-Quiz und finde in 2 Minuten heraus, welche Düfte wirklich zu dir passen.</p>
          <Link className="button dp-quiz-button" href="/#quiz">Quiz starten</Link>
        </Reveal>
      </div>

      {/* ── FIXIERTE KAUF-LEISTE (nur Handy) ─────────────────── */}
      <StickyBuyBar targetId="dp-actions">
        <div className="dp-sticky-info">
          <span className="dp-sticky-name">{perfume.perfume_name}</span>
          {perfume.price_chf != null && <span className="dp-sticky-price">ca. CHF {perfume.price_chf}</span>}
        </div>
        <AffiliateButton perfume={perfume} showNote={false} label="Ansehen →" />
      </StickyBuyBar>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(perfume)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(perfume)) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
      )}
    </main>
  );
}
