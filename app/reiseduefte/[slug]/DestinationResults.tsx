'use client';

import { useState } from 'react';
import Link from 'next/link';
import { matchesGender, type Perfume, type QuizAnswers } from '@/lib/perfumes';
import { PerfumeCover, familyDisplay } from '@/app/PerfumeTile';
import { AffiliateButton } from '@/app/AffiliateButton';

// Geschlechts-Filter für die Ergebnisliste.
const GENDERS: [string, QuizAnswers['gender']][] = [
  ['Für alle', ''],
  ['Damen', 'women'],
  ['Herren', 'men']
];

type DestInfo = { emoji: string; name: string; slug: string; result: string };
type Item = { perfume: Perfume; reason: string };

export default function DestinationResults({ items, dest }: { items: Item[]; dest: DestInfo }) {
  const [gender, setGender] = useState<QuizAnswers['gender']>('');
  const [shareMsg, setShareMsg] = useState('');

  const filtered = items.filter((it) => matchesGender(it.perfume, gender)).slice(0, 9);
  const top = filtered[0];
  const rest = filtered.slice(1);

  // Reiseziel teilen: nutzt das native Teilen-Menü (Handy) oder kopiert den Link.
  async function share() {
    const url = typeof window !== 'undefined' ? window.location.href : `/reiseduefte/${dest.slug}`;
    const title = `Auressa · Reise-Düfte für ${dest.name}`;
    const text = `${dest.emoji} Welcher Duft passt zu ${dest.name}? Gefunden mit Auressa:`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // Teilen abgebrochen – kein Fehler nötig.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareMsg('Link kopiert! 📋 Du kannst ihn jetzt einfügen.');
    } catch {
      setShareMsg(url);
    }
    setTimeout(() => setShareMsg(''), 4000);
  }

  function meta(p: Perfume): string {
    return [familyDisplay[p.fragrance_family || ''] || 'Duftfamilie offen', p.season, p.occasion]
      .filter(Boolean)
      .join(' · ');
  }

  return (
    <section className="section" id="ergebnis">
      <p className="eyebrow">{dest.emoji} {dest.name}</p>
      <h2>Diese Düfte passen zu {dest.name}</h2>
      <p className="small">{dest.result}</p>

      <div className="mood-genders">
        {GENDERS.map(([label, code]) => (
          <button
            key={label}
            type="button"
            className={`mood-chip${gender === code ? ' active' : ''}`}
            onClick={() => setGender(code)}
          >
            {label}
          </button>
        ))}
      </div>

      {top ? (
        <>
          {/* Hervorgehobener Top-Treffer – mit Begründung und Kauf-Knopf */}
          <div className="mood-top">
            <PerfumeCover perfume={top.perfume} large />
            <div className="mood-top-info">
              <p className="small">Dein Top-Treffer für {dest.name}</p>
              <h3>{top.perfume.perfume_name}</h3>
              <p className="small">{top.perfume.brands?.name || 'Marke offen'} · {meta(top.perfume)}</p>
              <span className="score-pill">Auressa-Score {top.perfume.scentmatch_score ?? 80}</span>
              <p className="mood-reason">{top.reason}</p>
              <div className="tile-actions">
                {top.perfume.slug && (
                  <Link className="button secondary" href={`/duft/${top.perfume.slug}`}>Duftprofil</Link>
                )}
                <AffiliateButton perfume={top.perfume} label="Jetzt ansehen →" showNote={false} />
              </div>
            </div>
          </div>

          {/* Weitere passende Düfte – je mit Bild, Begründung und Kauf-Knopf */}
          {rest.length > 0 && (
            <div className="perfume-list mood-results">
              {rest.map(({ perfume: p, reason }) => (
                <div className="tile mood-result-card" key={p.id}>
                  <PerfumeCover perfume={p} />
                  <h3>{p.perfume_name}</h3>
                  <p className="small">{p.brands?.name || 'Marke offen'} · {familyDisplay[p.fragrance_family || ''] || 'Duftfamilie offen'}</p>
                  <span className="score-pill">Score {p.scentmatch_score ?? 80}</span>
                  <p className="mood-reason small">{reason}</p>
                  <div className="tile-actions">
                    {p.slug && (
                      <Link className="button secondary" href={`/duft/${p.slug}`}>Duftprofil</Link>
                    )}
                    <AffiliateButton perfume={p} label="Jetzt ansehen →" showNote={false} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="small">Für diese Auswahl gerade keine Treffer – probier „Für alle".</p>
      )}

      <div className="cta">
        <button type="button" className="button" onClick={share}>🔗 Dieses Reiseziel teilen</button>
        <Link className="button secondary" href="/reiseduefte">Andere Reiseziele</Link>
        <Link className="button secondary" href="/#quiz">Noch genauer? Mach das Quiz</Link>
      </div>
      {shareMsg && <p className="small share-msg">{shareMsg}</p>}
    </section>
  );
}
