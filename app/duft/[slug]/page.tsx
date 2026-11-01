import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPerfumeBySlug,
  getAllPerfumeSlugs,
  getPerfumes,
  getPerfumeBackground,
  getPerfumeExtras,
  getAlternativeLinks,
  isWithinPriceCap,
  describePerfume,
  concentrationLabel,
  type Perfume
} from '@/lib/perfumes';
import { findSimilarPerfumesV2, findCheaperAlternativesV2 } from '@/lib/similarity';
import { noteHref, noteImage } from '@/lib/notes-glossary';
import { getCuratedLink } from '@/lib/curated-links';
import { AffiliateButton } from '@/app/AffiliateButton';
import { AmazonButton } from '@/app/AmazonButton';
import { FavoriteButton } from '@/app/FavoriteButton';
import { SocialShareButtons } from '@/app/SocialShareButtons';
import { PerfumeTile } from '@/app/PerfumeTile';
import { PerfumeVisual } from '@/app/components/PerfumeVisual';
import { Reveal } from '@/app/components/Reveal';
import { StickyBuyBar } from '@/app/components/StickyBuyBar';
import { computeAccords } from '@/lib/accords';
import { computeAuressaScore } from '@/lib/score';
import { fitAdvice, perfumeTagline } from '@/lib/perfume-text';
import { baseName, findVersions, versionLabel, compareVersion, findCounterpart } from '@/lib/versions';
import { pairsFor } from '@/lib/version-compare';
import { wearTips } from '@/lib/wear';
import { perfumeSeasons, seasonPicks } from '@/lib/season-fit';
import { SeasonFit } from '@/app/components/SeasonFit';
import { bestValueSize, pricePer100ml, splitSimilar } from '@/lib/perfume-extras';

// Vergleichsschlüssel für Namen aus dem Chat-Import („Tres Nuit" ↔ „Très Nuit").
function nameKey(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '');
}

// Passt ein Name aus „Alternative zu" / „Ähnliche Düfte" zu diesem Katalog-Duft?
// „Light Blue" passt zu allen Versionen, „Light Blue Eau de Toilette" (oder „… EdT") nur zur EdT.
function namesMatch(p: Perfume, name: string, brand?: string | null): boolean {
  const n = nameKey(name);
  const conc = concentrationLabel(p.concentration);
  const nameOk =
    n === nameKey(p.perfume_name) ||
    (conc != null && (n === nameKey(`${p.perfume_name} ${conc}`) || n === nameKey(`${p.perfume_name} ${p.concentration}`)));
  return nameOk && (!brand || nameKey(p.brands?.name || '') === nameKey(brand));
}

function chf(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

// Kurzes Geschlechts-Label + Symbol für die Badge (passend zu den Duft-Kacheln).
const genderBadge: Record<string, string> = {
  Women: 'Damen',
  Men: 'Herren',
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
  // Gibt es mehrere Versionen (z. B. EdT und EdP), kommt die Version in den Titel,
  // damit die Seiten bei Google unterscheidbar sind.
  const hasVersions = findVersions(perfume, await getPerfumes(2000)).length > 0;
  const version = hasVersions ? versionLabel(perfume) : '';
  const nameWithVersion =
    version && !perfume.perfume_name.toLowerCase().includes(version.toLowerCase())
      ? `${perfume.perfume_name} ${version}`
      : perfume.perfume_name;
  // Haupttitel ohne „| Auressa" – die Marke haengt das globale Titel-Template
  // (%s | Auressa) automatisch an. So entsteht kein doppeltes „| Auressa".
  // Google zeigt ca. 60 Zeichen: Zusatz nur, solange der Titel (inkl. „ | Auressa") kurz genug bleibt.
  const core = `${nameWithVersion}${brand}`;
  // Eingestellte Düfte: Wer danach sucht, will meist wissen, was er stattdessen kaufen kann.
  const title = perfume.discontinued
    ? core.length + ' – Alternativen | Auressa'.length <= 62
      ? `${core} – Alternativen`
      : core
    : core.length + ' – Duftprofil & Bewertung | Auressa'.length <= 62
      ? `${core} – Duftprofil & Bewertung`
      : core.length + ' – Duftnoten & Preis | Auressa'.length <= 62
        ? `${core} – Duftnoten & Preis`
        : core.length + ' | Auressa'.length <= 62
          ? core
          : core.replace('Eau de Toilette', 'EdT').replace('Eau de Parfum', 'EdP');
  // Abwechslungsreiche Beschreibung aus echten Duftdaten (statt gleicher Schablone
  // auf hunderten Seiten) – gut gegen „dünnen/doppelten Inhalt".
  // Gespeicherte Duftrichtung (Parfumo) hat Vorrang vor der Berechnung aus den Noten.
  if (!perfume.description) {
    const stored = (await getPerfumeExtras(perfume.id)).accords;
    if (stored?.length) perfume.accords = stored;
  }
  const description = metaTrim(perfume.description || describePerfume(perfume));

  return {
    title,
    description,
    alternates: { canonical: `/duft/${slug}` },
    openGraph: { locale: 'de_CH', siteName: 'Auressa',
      title: `${title} | Auressa`,
      description,
      type: 'article',
      url: `${SITE_URL}/duft/${slug}`
    }
  };
}

// Haltbarkeit/Sillage (0–10) als 5 Punkte – auf einen Blick lesbar.
function Meter({ label, value, hint, help }: { label: string; value: number | null; hint: string; help?: string }) {
  if (value == null) return null;
  const filled = Math.max(0, Math.min(5, Math.round(value / 2)));
  return (
    <div className="dp-fact">
      <span className="dp-fact-label">{label}</span>
      <span className="dp-meter" role="img" aria-label={`${label}: ${value} von 10`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={i < filled ? 'on' : ''} style={{ animationDelay: `${i * 90}ms` }} />
        ))}
      </span>
      <span className="dp-fact-hint">{hint}</span>
      {help && <span className="dp-fact-help">{help}</span>}
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
  // „Füllt den Raum“ nur bei sehr starker Ausstrahlung – 8/10 ist deutlich, aber nicht raumfüllend.
  if (v >= 9) return 'füllt den Raum';
  if (v >= 8) return 'stark wahrnehmbar';
  if (v >= 6) return 'gut wahrnehmbar';
  if (v >= 4) return 'ausgewogen';
  return 'hautnah';
}


function seasonDisplay(season: string): string {
  // Bewusst ohne Emojis (ruhiger, edler Auftritt).
  return season;
}

const LAYERS: { key: 'top_notes' | 'heart_notes' | 'base_notes'; title: string; time: string }[] = [
  { key: 'top_notes', title: 'Kopfnoten', time: 'die ersten Minuten' },
  { key: 'heart_notes', title: 'Herznoten', time: 'nach ca. 30 Minuten' },
  { key: 'base_notes', title: 'Basisnoten', time: 'bleibt stundenlang' }
];

function schemaName(p: Perfume): string {
  const name = p.perfume_name || '';
  const conc = concentrationLabel(p.concentration);
  return conc && !name.toLowerCase().includes(conc.toLowerCase()) ? `${name} ${conc}` : name;
}

function jsonLd(perfume: Perfume) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    // Mit Konzentration, damit EdT und EdP für Google unterscheidbar sind.
    name: schemaName(perfume),
    brand: perfume.brands?.name
      ? { '@type': 'Brand', name: perfume.brands.name }
      : undefined,
    category: familyLabel(perfume.fragrance_family),
    description: metaTrim(perfume.description || describePerfume(perfume), 300),
    image: perfume.image_url || `${SITE_URL}/duft/${perfume.slug}/opengraph-image`,
    // Berechneter Auressa-Score (lib/score.ts) – kein vorgetäuschtes Nutzer-Rating.
    // Gleiche Skala wie auf der Seite (0–100), damit die Angabe für Google übereinstimmt.
    review: {
      '@type': 'Review',
      author: { '@type': 'Organization', name: 'Auressa' },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(computeAuressaScore(perfume).total),
        bestRating: '100',
        worstRating: '0'
      }
    }
    // Kein „offers": Auressa verkauft (noch) nicht selbst. Ein Angebot mit Preis würde
    // Google einen Shop vortäuschen. Beim Start eines eigenen Shops hier ergänzen.
  };
}

// Name ohne Versions-Zusatz für Überschriften („Light Blue Eau Intense" → „Light Blue").
function baseTitle(name: string, label: string): string {
  return name.toLowerCase().endsWith(` ${label.toLowerCase()}`) ? name.slice(0, -label.length - 1) : name;
}

type Faq = { q: string; a: string };

function splitList(value: string): string[] {
  return value.split(/\s*[,/&]\s*|\s+und\s+/).map((v) => v.trim()).filter(Boolean);
}

function joinAnd(items: string[]): string {
  return items.length > 1 ? `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}` : items[0] || '';
}

// „Sommer" → „im Sommer", „Frühling, Sommer" → „im Frühling und im Sommer".
function seasonAnswer(name: string, season: string): string {
  const list = splitList(season);
  if (list.some((s) => s.toLowerCase().startsWith('ganzj'))) return `${name} passt das ganze Jahr.`;
  return `${name} passt besonders gut ${joinAnd(list.map((s) => `im ${s}`))}.`;
}

const OCCASION_IN: Record<string, string> = {
  alltag: 'im Alltag',
  'büro': 'im Büro',
  date: 'bei einem Date',
  abend: 'am Abend'
};

function occasionAnswer(name: string, occasion: string): string {
  const list = splitList(occasion);
  const phrases = list.map((o) => OCCASION_IN[o.toLowerCase()]);
  if (phrases.every(Boolean)) return `${name} passt besonders gut ${joinAnd(phrases as string[])}.`;
  return `${name} passt besonders gut zu ${list.length > 1 ? 'diesen Anlässen' : 'diesem Anlass'}: ${joinAnd(list)}.`;
}

// Baut FAQ-Einträge ausschliesslich aus echten, vorhandenen Feldern – keine erfundenen Werte.
// name: bei mehreren Versionen mit Version (z. B. „Light Blue Eau de Parfum“), damit klar ist, welche gemeint ist.
function buildFaqs(perfume: Perfume, name: string = perfume.perfume_name): Faq[] {
  const faqs: Faq[] = [];
  if (perfume.longevity != null) {
    faqs.push({
      q: `Wie lange hält ${name}?`,
      a: `Laut den Bewertungen der Duft-Community hält ${name} ${longevityHint(perfume.longevity)} (Haltbarkeit ${perfume.longevity}/10).`
    });
  }
  if (perfume.sillage != null) {
    faqs.push({
      q: `Wie stark ist die Ausstrahlung von ${name}?`,
      a: `Die Ausstrahlung (Sillage) von ${name} liegt laut den Bewertungen der Duft-Community bei ${perfume.sillage}/10, also ${sillageHint(perfume.sillage)}.`
    });
  }
  if (perfume.season) {
    faqs.push({
      q: `Für welche Jahreszeit eignet sich ${name}?`,
      a: seasonAnswer(name, perfume.season)
    });
  }
  if (perfume.occasion) {
    faqs.push({
      q: `Zu welchem Anlass passt ${name}?`,
      a: occasionAnswer(name, perfume.occasion)
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

  // Andere Versionen desselben Duftes stehen im Versionen-Vergleich – nicht
  // zusätzlich als „ähnlich" oder „günstige Alternative".
  const versions = findVersions(perfume, pool);
  const versionIds = new Set(versions.map((v) => v.id));
  const counterpart = findCounterpart(perfume, pool);
  // Das Gegenstück (und seine Versionen) hat einen eigenen Hinweis oben. Vorschläge
  // nur fürs passende Geschlecht – wie im Quiz: Damen → Damen + Unisex, Herren → Herren + Unisex.
  const counterpartIds = new Set(
    counterpart ? [counterpart.id, ...findVersions(counterpart, pool).map((v) => v.id)] : []
  );
  const genderFits = (p: Perfume) =>
    perfume.gender === 'Unisex' || !perfume.gender || p.gender === perfume.gender || p.gender === 'Unisex';
  const altPool = pool.filter((p) => !versionIds.has(p.id) && !counterpartIds.has(p.id) && genderFits(p));
  const seasons = perfumeSeasons(perfume.season);
  const picks = seasonPicks(perfume, pool, versionIds);
  const tips = wearTips(perfume);

  // Geprüfte Dupes: Düfte im Katalog, die als bekannte Alternative zu DIESEM Duft
  // eingetragen sind (Feld „Alternative zu" beim Dupe). Nur empfehlbare (bis CHF 180, erhältlich).
  const dupeLinks = (await getAlternativeLinks()).filter((link) =>
    link.alternative_to.some((a) => namesMatch(perfume, a.name, a.brand))
  );
  const knownDupes = dupeLinks
    .map((link) => {
      const match = pool.find((p) => p.slug === link.slug);
      const entry = link.alternative_to.find((a) => namesMatch(perfume, a.name, a.brand));
      return match && match.id !== perfume.id && !versionIds.has(match.id) && isWithinPriceCap(match)
        ? { perfume: match, note: entry?.note || null }
        : null;
    })
    .filter((d): d is { perfume: Perfume; note: string | null } => d != null);
  const knownDupeIds = new Set(knownDupes.map((d) => d.perfume.id));
  const isDiscontinued = Boolean(perfume.discontinued);

  const cheaper = isDiscontinued
    ? []
    : findCheaperAlternativesV2(perfume, altPool, 3).filter(
        (c) => c.perfume.slug !== curatedSlug && !knownDupeIds.has(c.perfume.id)
      );
  const cheaperIds = new Set(cheaper.map((c) => c.perfume.id));
  // In den allgemeinen "ähnlich"-Vorschlägen die guenstigen Alternativen nicht doppelt zeigen.
  // Zuerst grosszügig holen und filtern, DANN auf 4 kürzen – sonst würde das Kürzen auf 4
  // vor dem Filtern den Abschnitt oft fälschlich leeren (die günstigen Alternativen riechen
  // per Definition ähnlich und belegen sonst die Top-Plätze).
  const similar = findSimilarPerfumesV2(perfume, altPool)
    .filter(
      (s) => !cheaperIds.has(s.perfume.id) && !knownDupeIds.has(s.perfume.id) && s.perfume.slug !== curatedSlug
    )
    // Pro Duft nur eine Version zeigen (nicht viermal Boss Bottled in EdT, EdP, Parfum …).
    .filter((s, i, list) => {
      const key = (x: Perfume) => `${nameKey(x.brands?.name || '')}|${baseName(x.perfume_name)}`;
      return list.findIndex((o) => key(o.perfume) === key(s.perfume)) === i;
    })
    .slice(0, 4);

  const ownLabel = versionLabel(perfume);
  const faqName =
    versions.length > 0 && ownLabel && !perfume.perfume_name.toLowerCase().includes(ownLabel.toLowerCase())
      ? `${perfume.perfume_name} ${ownLabel}`
      : perfume.perfume_name;
  const faqs = buildFaqs(perfume, faqName);

  // Zusatzangaben zuerst laden: Ist die Duftrichtung (laut Parfumo) gespeichert,
  // nutzen Balken, Kurzbeschreibung, „Passt zu dir" und Text diese statt der Berechnung.
  const extras = await getPerfumeExtras(perfume.id);
  const accordsStored = Boolean(extras.accords?.length);
  if (accordsStored) perfume.accords = extras.accords;
  const accords = computeAccords(perfume);
  const score = computeAuressaScore(perfume);
  const fit = fitAdvice(perfume);
  const noteImageMap: Record<string, string> = {};
  for (const note of [...(perfume.top_notes || []), ...(perfume.heart_notes || []), ...(perfume.base_notes || [])]) {
    const img = noteImage(note);
    if (img) noteImageMap[note] = img;
  }
  const background = await getPerfumeBackground(perfume.id);
  const facts = (background.good_to_know || '')
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean)
    // Bis zu 5 Fakten – mehr würde den Kasten auf dem Handy zu lang machen.
    .slice(0, 5);
  // Katalog-Duft zu einem Namen (+ Marke) aus dem Import – für einen Link, falls vorhanden.
  const findInCatalog = (name: string, brand?: string | null) =>
    pool.find((p) => p.id !== perfume.id && namesMatch(p, name, brand));
  const alternatives = (extras.alternative_to || []).map((a) => ({ ...a, match: findInCatalog(a.name, a.brand) }));
  const knownSimilar = (extras.similar_perfumes || []).map((entry) => {
    const { name, brand } = splitSimilar(entry);
    return { name, brand, match: findInCatalog(name, brand) };
  });
  const sizes = extras.sizes || [];
  const bestSize = bestValueSize(sizes);
  const otherVersions = versions.filter((v) => v.id !== perfume.id).map(versionLabel);
  const description =
    perfume.description ||
    describePerfume(
      { ...perfume, ...background },
      otherVersions.length
        ? { versions: { name: baseTitle(perfume.perfume_name, versionLabel(perfume)), labels: otherVersions } }
        : {}
    );
  // Steckbrief „Auf einen Blick" – nur Angaben, die wirklich erfasst sind.
  const profile = [
    ['Marke', perfume.brands?.name ? `${perfume.brands.name}${perfume.brands.country ? ` (${perfume.brands.country})` : ''}` : null],
    ['Duftfamilie', perfume.fragrance_family ? familyLabel(perfume.fragrance_family) : null],
    ['Konzentration', concentrationLabel(perfume.concentration)],
    ['Flakon', perfume.volume_ml ? `${perfume.volume_ml} ml` : null],
    ['Erschienen', background.release_year ? String(background.release_year) : null],
    ['Parfümeur', background.perfumer || null]
  ].filter((row): row is [string, string] => Boolean(row[1]));
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
          <div className="dp-hero-visual" style={{ position: 'relative' }}>
            <PerfumeVisual perfume={perfume} size="hero" noteImages={noteImageMap} />
            {/* Merken direkt auf der Duft-Seite (vorher nur auf den Kacheln möglich) */}
            <FavoriteButton slug={perfume.slug} />
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
                <span className="chip">{genderBadge[perfume.gender] || perfume.gender}</span>
              )}
              {versions.length <= 1 && concentrationLabel(perfume.concentration) && (
                <span className="chip">{concentrationLabel(perfume.concentration)}</span>
              )}
            </div>

            {versions.length > 1 && (
              <nav className="dp-versions" aria-label="Versionen dieses Duftes">
                <span className="dp-versions-label">Version</span>
                <div className="dp-versions-list">
                  {versions.map((v) =>
                    v.id === perfume.id ? (
                      <span key={v.id} className="dp-version is-active" aria-current="page">
                        {versionLabel(v)}
                      </span>
                    ) : (
                      <Link key={v.id} href={`/duft/${v.slug}`} className="dp-version">
                        {versionLabel(v)}
                      </Link>
                    )
                  )}
                </div>
              </nav>
            )}

            {perfumeTagline(perfume) && <p className="dp-mood">{perfumeTagline(perfume)}</p>}

            {counterpart && (
              <Link href={`/duft/${counterpart.slug}`} className="dp-counterpart">
                <span>
                  Das Gegenstück für {counterpart.gender === 'Men' ? 'Herren' : 'Damen'}: <strong>{counterpart.perfume_name}</strong>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            )}

            <div className="dp-buy">
              <div className="dp-price">
                {isDiscontinued ? (
                  <>
                    <span className="dp-price-label">Status</span>
                    <span className="dp-price-value">Nicht mehr erhältlich</span>
                    <span className="dp-price-note">wird nicht mehr hergestellt</span>
                  </>
                ) : perfume.price_chf != null ? (
                  <>
                    <span className="dp-price-label">Richtpreis</span>
                    <span className="dp-price-value">ca. CHF {perfume.price_chf}</span>
                    <span className="dp-price-note">
                      {perfume.volume_ml ? `für ${perfume.volume_ml} ml · kann je nach Shop abweichen` : 'kann je nach Shop und Grösse abweichen'}
                    </span>
                  </>
                ) : (
                  <span className="dp-price-label">Preis noch offen</span>
                )}
              </div>
              <div
                className="dp-score"
                title="Auressa-Score: aus Preis-Leistung, Haltbarkeit, Vielseitigkeit und Ausstrahlung berechnet"
                style={{ ['--p' as string]: score.total } as React.CSSProperties}
              >
                <span className="dp-score-num">{score.total}</span>
                <span className="dp-score-label">Score</span>
              </div>
            </div>

            <details className="dp-score-details">
              <summary>Wie entsteht der Auressa-Score?</summary>
              <ul>
                {score.parts.map((part) => (
                  <li key={part.key}>
                    <span className="sd-label">
                      {part.label} <small>{part.weight} %</small>
                    </span>
                    <span className="sd-track">
                      <span className="sd-bar" style={{ width: `${(part.points / part.weight) * 100}%` }} />
                    </span>
                    <span className="sd-points">{Math.round(part.points)}</span>
                    <span className="sd-hint">{part.hint}</span>
                  </li>
                ))}
              </ul>
              <p>
                Berechnet aus den Duftdaten – je günstiger, langlebiger und vielseitiger ein Duft, desto höher der Score.
                {score.estimated ? ' Einzelne Werte fehlen noch und sind geschätzt.' : ''}
              </p>
            </details>

            {/* Mit eigenem Partner-Shop-Link: der zuerst. Sonst Amazon (Partnerprogramm) als
                Hauptknopf und die allgemeine Online-Suche dezent darunter. */}
            {isDiscontinued ? (
              <div className="dp-discontinued" role="note">
                <p>
                  <strong>{perfume.perfume_name} wird nicht mehr hergestellt.</strong> Restbestände gibt es manchmal noch
                  bei Wiederverkäufern – oft zu hohen Preisen und ohne Garantie für Echtheit und Frische.
                </p>
                {(knownDupes.length > 0 || similar.length > 0) && (
                  <a className="button" href="#ersatz">
                    Das kannst du heute stattdessen kaufen ↓
                  </a>
                )}
              </div>
            ) : perfume.affiliate_url && /^https:\/\//i.test(perfume.affiliate_url) ? (
              <div className="dp-actions" id="dp-actions">
                <AffiliateButton perfume={perfume} />
                <AmazonButton perfume={perfume} />
              </div>
            ) : (
              <div className="dp-actions dp-actions-amazon-first" id="dp-actions">
                <AmazonButton perfume={perfume} />
                <AffiliateButton perfume={perfume} />
              </div>
            )}

            <div className="dp-share">
              <SocialShareButtons perfume={perfume} url={`${SITE_URL}/duft/${slug}`} />
            </div>
          </div>
        </section>

        {/* ── STECKBRIEF ───────────────────────────────────────── */}
        <Reveal as="section" className="dp-facts">
          <Meter label="Haltbarkeit" value={perfume.longevity} hint={perfume.longevity != null ? longevityHint(perfume.longevity) : ''} />
          <Meter
            label="Ausstrahlung"
            value={perfume.sillage}
            hint={perfume.sillage != null ? sillageHint(perfume.sillage) : ''}
            help="Wie stark man den Duft in deiner Nähe riecht (Fachwort: Sillage)."
          />
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

        <SeasonFit seasons={seasons} picks={picks} />

        {/* ── STATTDESSEN / BEKANNTE DUPES ──────────────────────── */}
        {(knownDupes.length > 0 || (isDiscontinued && similar.length > 0)) && (
          <Reveal as="section" className="dp-section dp-dupes">
            <span id="ersatz" className="dp-anchor" aria-hidden="true" />
            <p className="dp-kicker">{isDiscontinued ? 'Heute erhältlich' : 'Original vs. Dupe'}</p>
            <h2>
              {isDiscontinued
                ? `Das kannst du statt ${perfume.perfume_name} kaufen`
                : `Bekannte Dupes von ${perfume.perfume_name}`}
            </h2>
            {knownDupes.length > 0 && (
              <div className="dupe-list">
                {knownDupes.map(({ perfume: d, note }) => {
                  // Bei verschiedenen Flaschengrössen fair pro 100 ml vergleichen.
                  const per100 = (x: Perfume) =>
                    x.price_chf != null && x.volume_ml ? Math.round((x.price_chf / x.volume_ml) * 100) : null;
                  const dPer100 = per100(d);
                  const oPer100 = per100(perfume);
                  const comparePer100 =
                    !isDiscontinued && dPer100 != null && oPer100 != null && d.volume_ml !== perfume.volume_ml && dPer100 < oPer100;
                  const saving =
                    !isDiscontinued && !comparePer100 && d.volume_ml === perfume.volume_ml && perfume.price_chf != null && d.price_chf != null
                      ? Math.round((perfume.price_chf - d.price_chf) * 100) / 100
                      : null;
                  return (
                    <article className="dupe-card" key={d.id}>
                      <div className="dupe-visual">
                        <PerfumeVisual perfume={d} />
                      </div>
                      <div className="dupe-body">
                        <span className="dupe-level">Bekannte Alternative</span>
                        <p className="tile-brand">{d.brands?.name || 'Marke offen'}</p>
                        <h3 className="tile-name">{d.perfume_name}</h3>
                        <div className="dupe-prices">
                          {d.price_chf != null && (
                            <span className="dupe-price">
                              ca. CHF {chf(d.price_chf)}
                              {d.volume_ml ? ` · ${d.volume_ml} ml` : ''}
                            </span>
                          )}
                          {comparePer100 && (
                            <span className="dupe-saving">
                              pro 100 ml ~CHF {dPer100} statt ~CHF {oPer100}
                            </span>
                          )}
                          {saving != null && saving > 0 && <span className="dupe-saving">du sparst ~CHF {chf(saving)}</span>}
                        </div>
                        {note && <p className="small dupe-note">{note}</p>}
                        <div className="dupe-cta">
                          {d.slug && <Link className="button secondary" href={`/duft/${d.slug}`}>Duftprofil</Link>}
                          <AffiliateButton perfume={d} showNote={false} />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
            {isDiscontinued && similar.length > 0 && (
              <>
                {knownDupes.length > 0 && <p className="small dp-known-sub">Weitere Düfte in eine ähnliche Richtung:</p>}
                <div className="perfume-list">
                  {similar.map(({ perfume: s }) => (
                    <PerfumeTile perfume={s} key={s.id} />
                  ))}
                </div>
              </>
            )}
            <p className="dp-footnote">
              Ähnlich bedeutet nicht identisch – kein Duft riecht genau gleich wie ein anderer. Teste am besten eine Probe.
            </p>
          </Reveal>
        )}

        {/* ── BEKANNTE ALTERNATIVE ZU … ────────────────────────── */}
        {alternatives.length > 0 && (
          <Reveal as="section" className="dp-alt">
            <p className="dp-kicker">Günstige Alternative</p>
            {alternatives.map((a) => (
              <div className="dp-alt-item" key={`${a.name}-${a.brand || ''}`}>
                <h2>
                  {perfume.perfume_name} gilt als bekannte Alternative zu{' '}
                  {a.match?.slug ? <Link href={`/duft/${a.match.slug}`}>{a.name}</Link> : a.name}
                  {a.brand ? ` von ${a.brand}` : ''}
                </h2>
                {perfume.price_chf != null && a.price_chf != null && a.price_chf > perfume.price_chf && (
                  <p className="dp-alt-price">
                    ca. CHF {chf(perfume.price_chf)} <span>statt ca. CHF {chf(a.price_chf)}</span>
                  </p>
                )}
                {a.note && <p className="dp-alt-note">{a.note}</p>}
              </div>
            ))}
            <p className="dp-alt-foot">Riecht ähnlich, ist aber nicht identisch – Haltbarkeit und Ausstrahlung können abweichen.</p>
          </Reveal>
        )}

        {/* ── VERSIONEN IM VERGLEICH ───────────────────────────── */}
        {versions.length > 1 && (
          <Reveal as="section" className="dp-card dp-compare">
            <p className="dp-kicker">Versionen im Vergleich</p>
            <h2>Welche Version von {baseTitle(perfume.perfume_name, versionLabel(perfume))} passt zu dir?</h2>
            <div className="dp-compare-scroll">
              <table className="dp-compare-table">
                <thead>
                  <tr>
                    <th scope="col">Version</th>
                    {versions.some((v) => v.longevity != null) && <th scope="col">Haltbarkeit</th>}
                    {versions.some((v) => v.sillage != null) && <th scope="col">Ausstrahlung</th>}
                    <th scope="col">Richtpreis</th>
                  </tr>
                </thead>
                <tbody>
                  {versions.map((v) => (
                    <tr key={v.id} className={v.id === perfume.id ? 'is-current' : ''}>
                      <th scope="row">
                        {v.id === perfume.id ? (
                          <>
                            {versionLabel(v)} <small>diese Seite</small>
                          </>
                        ) : (
                          <Link href={`/duft/${v.slug}`}>{versionLabel(v)}</Link>
                        )}
                      </th>
                      {/* Spalte nur, wenn mindestens eine Version einen getesteten Wert hat; fehlende Werte ehrlich als „noch offen". */}
                      {versions.some((o) => o.longevity != null) && (
                        <td>{v.longevity != null ? `${v.longevity}/10` : <span className="dp-compare-open">noch offen</span>}</td>
                      )}
                      {versions.some((o) => o.sillage != null) && (
                        <td>{v.sillage != null ? `${v.sillage}/10` : <span className="dp-compare-open">noch offen</span>}</td>
                      )}
                      <td>
                        {v.price_chf != null ? `CHF ${v.price_chf}` : '–'}
                        {v.price_chf != null && v.volume_ml ? <small className="dp-compare-ml">{v.volume_ml} ml</small> : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="dp-compare-notes">
              {versions
                .filter((v) => v.id !== perfume.id)
                .map((v) => (
                  <li key={v.id}>
                    <strong>{versionLabel(v)}:</strong> {compareVersion(perfume, v)}.
                  </li>
                ))}
            </ul>
            {/* Ausführliche Vergleichsseiten (automatisch aus den Versionen) */}
            {pairsFor(perfume, pool).length > 0 && (
              <ul className="dp-compare-more">
                {pairsFor(perfume, pool).map((pr) => (
                  <li key={pr.slug}>
                    <Link href={`/unterschied/${pr.slug}`}>
                      Ausführlicher Vergleich: {versionLabel(pr.a)} vs. {versionLabel(pr.b)} →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        )}

        {/* ── GRÖSSEN & PREISE ─────────────────────────────────── */}
        {sizes.length >= 2 && (
          <Reveal as="section" className="dp-card dp-sizes">
            <p className="dp-kicker">Grössen &amp; Preise</p>
            <h2>Welche Grösse lohnt sich?</h2>
            <div className="dp-compare-scroll">
              <table className="dp-compare-table">
                <thead>
                  <tr>
                    <th scope="col">Grösse</th>
                    <th scope="col">Richtpreis</th>
                    <th scope="col">Pro 100 ml</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s) => (
                    <tr key={s.ml} className={bestSize?.ml === s.ml ? 'is-current' : ''}>
                      <th scope="row">
                        {s.ml} ml
                        {bestSize?.ml === s.ml && <span className="dp-size-best">Bester Preis</span>}
                      </th>
                      <td>ca. CHF {chf(s.price_chf)}</td>
                      <td>CHF {pricePer100ml(s).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="dp-footnote">Richtpreise zum Zeitpunkt der Recherche – im Shop können sie abweichen.</p>
          </Reveal>
        )}

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
              <p className="dp-footnote">
                {accordsStored
                  ? 'Duftrichtung laut Parfumo-Community, nach Stärke geordnet.'
                  : 'Von Auressa aus den Duftnoten berechnet.'}
              </p>
              {profile.length > 0 && (
                <>
                  <p className="dp-kicker dp-profile-kicker">Auf einen Blick</p>
                  <dl className="dp-profile">
                    {profile.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
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
                        {notes.map((note) => {
                          const img = noteImage(note);
                          return (
                            <Link className={`note-chip${img ? ' has-photo' : ''}`} href={noteHref(note)} key={note}>
                              {img && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={img} alt="" loading="lazy" />
                              )}
                              {note}
                            </Link>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          )}
        </div>

        {/* ── PASST ER ZU DIR? ─────────────────────────────────── */}
        {(fit.fits.length > 0 || fit.notFits.length > 0) && (
          <Reveal as="section" className="dp-card dp-fit">
            <p className="dp-kicker">Ehrliche Einschätzung</p>
            <h2>Passt {perfume.perfume_name} zu dir?</h2>
            <div className="fit-cols">
              {fit.fits.length > 0 && (
                <div className="fit-col fit-yes">
                  <h3>Ja, wenn …</h3>
                  <ul>
                    {fit.fits.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              )}
              {fit.notFits.length > 0 && (
                <div className="fit-col fit-no">
                  <h3>Eher nicht, wenn …</h3>
                  <ul>
                    {fit.notFits.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* ── SO TRÄGST DU IHN ─────────────────────────────────── */}
        {tips.length > 0 && (
          <Reveal as="section" className="dp-card dp-wear">
            <p className="dp-kicker">So trägst du ihn</p>
            <ul>
              {tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* ── BESCHREIBUNG ─────────────────────────────────────── */}
        <Reveal as="section" className="dp-card dp-story">
          <p className="dp-kicker">Über den Duft</p>
          {description
            .split(/\n\s*\n/)
            .map((para) => para.trim())
            .filter(Boolean)
            .map((para, i) => (
              <p className="dp-story-text" key={i}>
                {para}
              </p>
            ))}
          {perfume.bottle_description && <p className="dp-story-text dp-story-bottle">{perfume.bottle_description}</p>}
          {facts.length > 0 && (
            <aside className="dp-know" aria-label="Gut zu wissen">
              <p className="dp-know-title">Gut zu wissen</p>
              <ul>
                {facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </aside>
          )}
          {perfume.scent_dna && perfume.scent_dna.length > 0 && (
            <div className="dp-dna">
              <span className="dp-fact-label">Erinnert an</span>
              <div className="dp-chips">
                {perfume.scent_dna.map((d) => <span className="chip" key={d}>{d}</span>)}
              </div>
            </div>
          )}
        </Reveal>

        {/* ── DER FLAKON ───────────────────────────────────────── */}
        {(extras.flacon_description || extras.flacon_designer) && (
          <Reveal as="section" className="dp-card dp-flacon">
            <p className="dp-kicker">Der Flakon</p>
            {/* Ohne Beschreibung keine Überschrift „So sieht … aus" – sonst stünde darunter nur der Designer. */}
            <h2>{extras.flacon_description ? `So sieht ${perfume.perfume_name} aus` : `Wer den Flakon gestaltet hat`}</h2>
            {extras.flacon_description && <p className="dp-story-text">{extras.flacon_description}</p>}
            {extras.flacon_designer && (
              <p className="dp-flacon-designer">
                <span className="dp-fact-label">Design</span> {extras.flacon_designer}
              </p>
            )}
          </Reveal>
        )}

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
        {((!isDiscontinued && similar.length > 0) || knownSimilar.length > 0) && (
          <Reveal as="section" className="dp-section">
            <p className="dp-kicker">Entdecke mehr</p>
            <h2>Riecht ähnlich wie {perfume.perfume_name}</h2>
            {knownSimilar.length > 0 && (
              <div className="dp-known">
                <p className="small">Diese Düfte werden in der Duft-Community oft als ähnlich genannt:</p>
                <div className="dp-chips">
                  {knownSimilar.map(({ name, brand, match }) =>
                    match?.slug ? (
                      <Link className="note-chip" href={`/duft/${match.slug}`} key={`${name}-${brand || ''}`}>
                        {name}
                        {brand ? <span className="dp-known-brand"> · {brand}</span> : null}
                      </Link>
                    ) : (
                      <span className="note-chip" key={`${name}-${brand || ''}`}>
                        {name}
                        {brand ? <span className="dp-known-brand"> · {brand}</span> : null}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
            {!isDiscontinued && similar.length > 0 && (
              <>
                {knownSimilar.length > 0 && <p className="small dp-known-sub">Ähnliche Düfte aus unserem Katalog:</p>}
                <div className="perfume-list">
                  {similar.map(({ perfume: s }) => (
                    <PerfumeTile perfume={s} key={s.id} />
                  ))}
                </div>
              </>
            )}
          </Reveal>
        )}

        {/* ── FAQ ──────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <Reveal as="section" className="dp-card dp-faq">
            <p className="dp-kicker">Fragen &amp; Antworten</p>
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
          <h2>Noch unsicher, welcher Duft zu dir passt?</h2>
          <p>Mach das Duft-Quiz und finde in wenigen Minuten heraus, welche Düfte wirklich zu dir passen.</p>
          <Link className="button dp-quiz-button" href="/quiz">Quiz starten</Link>
        </Reveal>
      </div>

      {/* ── FIXIERTE KAUF-LEISTE (nur Handy) ─────────────────── */}
      {!isDiscontinued && (
      <StickyBuyBar targetId="dp-actions">
        <div className="dp-sticky-info">
          <span className="dp-sticky-name">{perfume.perfume_name}</span>
          {perfume.price_chf != null && <span className="dp-sticky-price">ca. CHF {perfume.price_chf}</span>}
        </div>
        <AffiliateButton perfume={perfume} showNote={false} label="Ansehen →" />
      </StickyBuyBar>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(perfume)).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(perfume)).replace(/</g, "\\u003c") }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)).replace(/</g, "\\u003c") }}
        />
      )}
    </main>
  );
}
