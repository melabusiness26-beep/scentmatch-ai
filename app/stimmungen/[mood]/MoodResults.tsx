'use client';

import { useState } from 'react';
import Link from 'next/link';
import { matchesGender, type Perfume, type QuizAnswers } from '@/lib/perfumes';
import { PerfumeTile } from '@/app/PerfumeTile';

// Geschlechts-Filter für die Ergebnisliste.
const GENDERS: [string, QuizAnswers['gender']][] = [
  ['Für alle', ''],
  ['Damen', 'women'],
  ['Herren', 'men']
];

type MoodInfo = { emoji: string; title: string; result: string; code: string };

export default function MoodResults({ perfumes, mood }: { perfumes: Perfume[]; mood: MoodInfo }) {
  const [gender, setGender] = useState<QuizAnswers['gender']>('');
  const [shareMsg, setShareMsg] = useState('');

  const results = perfumes.filter((p) => matchesGender(p, gender)).slice(0, 9);

  // Stimmung teilen: nutzt das native Teilen-Menü (Handy) oder kopiert den Link.
  async function share() {
    const url = typeof window !== 'undefined' ? window.location.href : `/stimmungen/${mood.code}`;
    const title = `Auressa · Düfte für „${mood.title}"`;
    const text = `${mood.emoji} Düfte für die Stimmung „${mood.title}" – gefunden mit Auressa:`;
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

  return (
    <section className="section" id="ergebnis">
      <p className="eyebrow">{mood.emoji} {mood.title}</p>
      <h2>Diese Düfte passen zu deiner Stimmung</h2>
      <p className="small">{mood.result}</p>

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

      {results.length > 0 ? (
        <div className="perfume-list">
          {results.map((p) => (
            <PerfumeTile perfume={p} key={p.id} />
          ))}
        </div>
      ) : (
        <p className="small">Für diese Auswahl gerade keine Treffer – probier „Für alle".</p>
      )}

      <div className="cta">
        <button type="button" className="button" onClick={share}>🔗 Diese Stimmung teilen</button>
        <Link className="button secondary" href="/#quiz">Noch genauer? Mach das Quiz</Link>
        <Link className="button secondary" href="/duefte">Alle Düfte ansehen</Link>
      </div>
      {shareMsg && <p className="small share-msg">{shareMsg}</p>}
    </section>
  );
}
