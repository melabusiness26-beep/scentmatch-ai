'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import { getPerfumes, rankByMood, MOODS, type Mood, type Perfume, type QuizAnswers } from '@/lib/perfumes';
import { PerfumeTile } from '@/app/PerfumeTile';

// Geschlechts-Filter für die Ergebnisliste.
const GENDERS: [string, QuizAnswers['gender']][] = [
  ['Für alle', ''],
  ['Damen', 'women'],
  ['Herren', 'men']
];

export default function StimmungenClient() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [mood, setMood] = useState<Mood | null>(null);
  const [gender, setGender] = useState<QuizAnswers['gender']>('');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ganzen Katalog laden, damit die Stimmung aus allen Düften wählen kann.
    getPerfumes(2000).then((data) => {
      setPerfumes(data);
      setLoaded(true);
    });
  }, []);

  function chooseMood(m: Mood) {
    setMood(m);
    // Sanft zu den Ergebnissen scrollen (nur im Browser).
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const results = mood ? rankByMood(perfumes, mood, gender) : [];

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Duft nach Stimmung</p>
          <h1>Wie fühlst du dich heute?</h1>
          <p className="lead">
            Wähl deine Stimmung – Auressa zeigt dir sofort Düfte, die genau dazu passen.
            Kein Quiz, kein Fachwissen nötig.
          </p>

          <div className="grid mood-grid">
            {MOODS.map((m) => (
              <button
                key={m.code}
                type="button"
                className={`tile-family mood-card${mood?.code === m.code ? ' tile-active' : ''}`}
                onClick={() => chooseMood(m)}
              >
                <span className="mood-emoji" aria-hidden="true">{m.emoji}</span>
                <span className="mood-title">{m.title}</span>
                <span className="small">{m.subtitle}</span>
              </button>
            ))}
          </div>
        </section>

        {mood && (
          <section className="section" id="ergebnis" ref={resultRef}>
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

            {!loaded ? (
              <p className="small">Düfte werden geladen …</p>
            ) : results.length > 0 ? (
              <div className="perfume-list">
                {results.map((p) => (
                  <PerfumeTile perfume={p} key={p.id} />
                ))}
              </div>
            ) : (
              <p className="small">Gerade keine passenden Düfte gefunden – probier eine andere Stimmung.</p>
            )}

            <div className="cta">
              <Link className="button" href="/#quiz">Noch genauer? Mach das Quiz</Link>
              <Link className="button secondary" href="/duefte">Alle Düfte ansehen</Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
