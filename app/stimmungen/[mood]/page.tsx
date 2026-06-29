import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import { getPerfumes, rankByMood, moodNoteProfile, getMood, MOODS } from '@/lib/perfumes';
import MoodResults from './MoodResults';

// Stündlich neu generieren – frische Daten, schnelle Auslieferung (wie die Duftseiten).
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

// Alle Stimmungs-Seiten beim Build vorerzeugen (gut für SEO und Tempo).
export async function generateStaticParams() {
  return MOODS.map((m) => ({ mood: m.code }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ mood: string }>;
}): Promise<Metadata> {
  const { mood: code } = await params;
  const mood = getMood(code);
  if (!mood) return { title: 'Stimmung nicht gefunden – Auressa' };

  const title = `Duft für „${mood.title}" – passende Parfums | Auressa`;
  const description = mood.intro;

  return {
    title,
    description,
    alternates: { canonical: `/stimmungen/${code}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/stimmungen/${code}`
    }
  };
}

export default async function MoodPage({ params }: { params: Promise<{ mood: string }> }) {
  const { mood: code } = await params;
  const mood = getMood(code);
  if (!mood) notFound();

  const perfumes = await getPerfumes(2000);
  const ranked = rankByMood(perfumes, mood, '', 30);
  const dna = moodNoteProfile(ranked.slice(0, 12));
  const others = MOODS.filter((m) => m.code !== code);

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section
          className="section card mood-hero"
          style={{ background: `linear-gradient(160deg, ${mood.tone}33, rgba(255,255,255,.55))` }}
        >
          <p className="eyebrow">Duft nach Stimmung</p>
          <h1><span aria-hidden="true">{mood.emoji}</span> {mood.title}</h1>
          <p className="lead">{mood.intro}</p>

          {dna.length > 0 && (
            <div className="mood-dna">
              <p className="small mood-dna-title">Typische Duft-DNA dieser Stimmung</p>
              {dna.map((d) => (
                <div className="mood-dna-row" key={d.code}>
                  <span className="small mood-dna-label">{d.label}</span>
                  <div className="scorebar"><span style={{ width: `${d.pct}%`, background: mood.tone }} /></div>
                </div>
              ))}
            </div>
          )}
        </section>

        <MoodResults
          perfumes={ranked}
          mood={{ emoji: mood.emoji, title: mood.title, result: mood.result, code: mood.code }}
        />

        <section className="section">
          <p className="eyebrow">Andere Stimmungen</p>
          <h2>Wie wäre es hiermit?</h2>
          <div className="grid mood-grid">
            {others.map((m) => (
              <Link
                key={m.code}
                href={`/stimmungen/${m.code}`}
                className="tile-family mood-card"
                style={{ background: `linear-gradient(160deg, ${m.tone}26, rgba(255,255,255,.55))` }}
              >
                <span className="mood-emoji" aria-hidden="true">{m.emoji}</span>
                <span className="mood-title">{m.title}</span>
                <span className="small">{m.subtitle}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
