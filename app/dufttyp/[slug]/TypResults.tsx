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

type TypInfo = { emoji: string; title: string; code: string };
type Item = { perfume: Perfume; reason: string };

export default function TypResults({ items, typ }: { items: Item[]; typ: TypInfo }) {
  const [gender, setGender] = useState<QuizAnswers['gender']>('');
  const [shareMsg, setShareMsg] = useState('');

  const filtered = items.filter((it) => matchesGender(it.perfume, gender)).slice(0, 9);
  const top = filtered[0];
  const rest = filtered.slice(1);

  // Ergebnis teilen: nutzt das native Teilen-Menü (Handy) oder kopiert den Link.
  async function share() {
    const url = typeof window !== 'undefined' ? window.location.href : `/dufttyp/${typ.code}`;
    const title = `Mein Dufttyp: ${typ.title} | Auressa`;
    const text = `${typ.emoji} Mein Dufttyp ist „${typ.title}" – welcher bist du? Mach den Test bei Auressa:`;
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
    <section className="section" id="duefte">
      <p className="eyebrow">Deine Empfehlungen</p>
      <h2>Diese Düfte passen zu deinem Typ</h2>
      <p className="small">
        Ausgewählt nach den Noten und dem Charakter, die typisch für „{typ.title}" sind.
      </p>

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
          {/* Hervorgehobener Top-Treffer – persönlich, mit Begründung und Kauf-Knopf */}
          <div className="mood-top">
            <PerfumeCover perfume={top.perfume} large />
            <div className="mood-top-info">
              <p className="small">Der Signatur-Duft für deinen Typ</p>
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
        <button type="button" className="button" onClick={share}>🔗 Mein Ergebnis teilen</button>
        <Link className="button secondary" href="/dufttyp">Test (nochmal) machen</Link>
        <Link className="button secondary" href="/#quiz">Noch genauer? Mach das Duft-Quiz</Link>
      </div>
      {shareMsg && <p className="small share-msg">{shareMsg}</p>}
    </section>
  );
}
