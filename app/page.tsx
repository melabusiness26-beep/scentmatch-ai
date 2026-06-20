'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getPerfumes, type Perfume } from '@/lib/perfumes';

type QuizQuestion = {
  q: string;
  kind: 'gender' | 'family';
  a: [string, string][];
};

const questions: QuizQuestion[] = [
  {
    q: 'Für wen suchst du einen Duft?',
    kind: 'gender',
    a: [
      ['Für Damen', 'women'],
      ['Für Herren', 'men'],
      ['Egal / Unisex', 'unisex']
    ]
  },
  {
    q: 'Welcher Moment fühlt sich am meisten nach dir an?',
    kind: 'family',
    a: [
      ['Frisch geduscht, weißes Hemd, offene Fenster', 'clean'],
      ['Kerzenlicht, Vanille, warme Decke', 'gourmand'],
      ['Dunkle Bar, Holz, Leder, ruhiger Luxus', 'woody'],
      ['Blumenmarkt, Rosé, weiches Kleid', 'floral']
    ]
  },
  {
    q: 'Wie möchtest du wirken?',
    kind: 'family',
    a: [
      ['Klar, frisch und gepflegt', 'clean'],
      ['Warm, weich und nahbar', 'gourmand'],
      ['Elegant, teuer und selbstbewusst', 'woody'],
      ['Romantisch, feminin und charmant', 'floral']
    ]
  },
  {
    q: 'Welche Duftnote zieht dich an?',
    kind: 'family',
    a: [
      ['Moschus, Tee, Zitrus', 'clean'],
      ['Vanille, Amber, Karamell', 'gourmand'],
      ['Sandelholz, Pfeffer, Oud', 'woody'],
      ['Rose, Jasmin, Pfirsich', 'floral']
    ]
  },
  {
    q: 'Wann trägst du deinen Duft am liebsten?',
    kind: 'family',
    a: [
      ['Tagsüber, im Alltag & Büro', 'clean'],
      ['Gemütlich zu Hause & zum Kuscheln', 'gourmand'],
      ['Abends beim Ausgehen', 'woody'],
      ['Bei einem romantischen Date', 'floral']
    ]
  }
];

const familyQuestionCount = questions.filter(q => q.kind === 'family').length;

const profileText: Record<string, { title: string; text: string }> = {
  clean: { title: 'The Clean Slate', text: 'Du liebst frische, saubere Düfte. Deine Signatur wirkt gepflegt, leicht und modern.' },
  gourmand: { title: 'The Soft Cashmere Vibe', text: 'Du passt zu warmen, weichen und leicht süßen Düften. Deine Duftsignatur wirkt gemütlich und sinnlich.' },
  woody: { title: 'Midnight Tailoring', text: 'Du brauchst elegante, holzige und würzige Düfte. Deine Signatur wirkt hochwertig und selbstbewusst.' },
  floral: { title: 'The Blooming Romance', text: 'Du passt zu blumigen, fruchtigen und femininen Düften. Deine Signatur wirkt charmant und weich.' }
};

const genderLabels: Record<string, string> = { women: 'Damen', men: 'Herren', unisex: 'Unisex' };

// Fallback, falls die Datenbank (noch) nicht erreichbar ist. Ohne slug -> kein Link.
const starterPerfumes: Perfume[] = [
  { id: '1', perfume_name: 'Beach Walk Style', slug: null, gender: 'Unisex', fragrance_family: 'clean', price_chf: 95, longevity: 6, sillage: 5, scentmatch_score: 91, season: 'Sommer', occasion: 'Alltag', description: null, image_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '2', perfume_name: 'Vanilla Cashmere Style', slug: null, gender: 'Women', fragrance_family: 'gourmand', price_chf: 79, longevity: 8, sillage: 7, scentmatch_score: 94, season: 'Herbst/Winter', occasion: 'Date', description: null, image_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '3', perfume_name: 'Dark Wood Style', slug: null, gender: 'Unisex', fragrance_family: 'woody', price_chf: 120, longevity: 9, sillage: 8, scentmatch_score: 92, season: 'Winter', occasion: 'Abend', description: null, image_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '4', perfume_name: 'Blooming Rose Style', slug: null, gender: 'Women', fragrance_family: 'floral', price_chf: 68, longevity: 7, sillage: 6, scentmatch_score: 90, season: 'Frühling', occasion: 'Alltag', description: null, image_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } }
];

function PerfumeTile({ perfume }: { perfume: Perfume }) {
  const content = (
    <>
      <h3>{perfume.perfume_name}</h3>
      <p className="small">{perfume.brands?.name || 'Marke offen'} · {perfume.fragrance_family || 'Duftfamilie offen'}</p>
      <p className="small">Saison: {perfume.season || 'offen'}<br />Anlass: {perfume.occasion || 'offen'}<br />Score: {perfume.scentmatch_score || 80}/100</p>
    </>
  );

  if (perfume.slug) {
    return (
      <Link className="tile tile-link" href={`/duft/${perfume.slug}`}>
        {content}
      </Link>
    );
  }
  return <div className="tile">{content}</div>;
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ clean: 0, gourmand: 0, woody: 0, floral: 0 });
  const [genderPref, setGenderPref] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [perfumes, setPerfumes] = useState<Perfume[]>(starterPerfumes);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function loadPerfumes() {
      const data = await getPerfumes(60);
      if (data.length > 0) setPerfumes(data);
    }
    loadPerfumes();
  }, []);

  const winner = useMemo(
    () => Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'clean',
    [scores]
  );

  // Ergebnisse: nach Geschlecht filtern und (nach dem Quiz) das Sieger-Profil nach oben holen.
  const recommended = useMemo(() => {
    const matchesGender = (p: Perfume) => {
      if (genderPref === 'women') return p.gender === 'Women' || p.gender === 'Unisex';
      if (genderPref === 'men') return p.gender === 'Men' || p.gender === 'Unisex';
      return true;
    };
    const matchesQuery = (p: Perfume) =>
      !query ||
      `${p.perfume_name} ${p.fragrance_family} ${p.brands?.name}`.toLowerCase().includes(query.toLowerCase());

    return perfumes
      .filter(p => matchesGender(p) && matchesQuery(p))
      .sort((a, b) => {
        if (showResult) {
          const aw = a.fragrance_family === winner ? 1 : 0;
          const bw = b.fragrance_family === winner ? 1 : 0;
          if (aw !== bw) return bw - aw;
        }
        return (b.scentmatch_score || 0) - (a.scentmatch_score || 0);
      });
  }, [perfumes, genderPref, query, showResult, winner]);

  const topPick = showResult ? recommended[0] : undefined;

  function answer(kind: QuizQuestion['kind'], code: string) {
    if (kind === 'gender') setGenderPref(code);
    else setScores(prev => ({ ...prev, [code]: (prev[code] || 0) + 1 }));

    if (step + 1 >= questions.length) setShowResult(true);
    else setStep(step + 1);
  }

  function restartQuiz() {
    setStep(0);
    setScores({ clean: 0, gourmand: 0, woody: 0, floral: 0 });
    setGenderPref('');
    setShowResult(false);
  }

  return (
    <main>
      <div className="container">
        <nav className="nav">
          <div className="logo">ScentMatch AI</div>
          <div className="badge">Signature-Duft finden · kostenloser Prototyp</div>
        </nav>

        <section className="hero">
          <div>
            <h1>Finde deinen Signature-Duft in 3 Minuten.</h1>
            <p className="lead">ScentMatch verbindet ein elegantes Duft-Quiz mit einer intelligenten Empfehlungslogik. Noch ohne bezahlte KI-API, aber bereits mit echter Duftlogik und Supabase-Anbindung.</p>
            <div className="cta">
              <a className="button" href="#quiz">Quiz starten</a>
              <a className="button secondary" href="#database">Düfte ansehen</a>
            </div>
          </div>
          <div className="card perfume-card">
            <div className="bottle">✦</div>
            <div>
              <h2>Premium statt Zufall</h2>
              <p className="small">Keine blinde TikTok-Empfehlung. ScentMatch prüft Geschlecht, Duftfamilie, Anlass, Saison, Haltbarkeit und Stil.</p>
            </div>
          </div>
        </section>

        <section className="section grid">
          <div className="tile"><h3>Clean</h3><p className="small">Frisch, sauber, weißer Moschus.</p></div>
          <div className="tile"><h3>Gourmand</h3><p className="small">Vanille, Amber, weiche Süße.</p></div>
          <div className="tile"><h3>Woody</h3><p className="small">Holz, Leder, edle Tiefe.</p></div>
          <div className="tile"><h3>Floral</h3><p className="small">Rose, Jasmin, feminine Eleganz.</p></div>
        </section>

        <section id="quiz" className="section card quiz">
          {!showResult ? (
            <>
              <p className="small">Frage {step + 1} von {questions.length}</p>
              <div className="question">{questions[step].q}</div>
              <div className="answers">
                {questions[step].a.map(([label, code]) => (
                  <button className="answer" key={label} onClick={() => answer(questions[step].kind, code)}>{label}</button>
                ))}
              </div>
            </>
          ) : (
            <div className="result">
              <p className="small">Dein Duftprofil{genderPref ? ` · ${genderLabels[genderPref]}` : ''}</p>
              <h2>{profileText[winner].title}</h2>
              <p className="lead">{profileText[winner].text}</p>

              {topPick && (
                <div className="top-pick">
                  <p className="small">Dein Top-Match</p>
                  <h3>{topPick.perfume_name} · {topPick.brands?.name || 'Marke offen'}</h3>
                  {topPick.slug && (
                    <Link className="button" href={`/duft/${topPick.slug}`}>Duftprofil ansehen</Link>
                  )}
                </div>
              )}

              {Object.entries(scores).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <div className="small">{profileText[key].title}: {value}</div>
                  <div className="scorebar"><span style={{ width: `${(value / familyQuestionCount) * 100}%` }} /></div>
                </div>
              ))}
              <button onClick={restartQuiz}>Quiz neu starten</button>
            </div>
          )}
        </section>

        <section id="database" className="section">
          <h2>Duftdatenbank</h2>
          <p className="small">
            {showResult
              ? `Passend zu deinem Profil${genderPref ? ` (${genderLabels[genderPref]})` : ''} – beste Treffer zuerst. Klicke einen Duft für das volle Profil.`
              : 'Klicke auf einen Duft, um sein vollständiges Profil zu sehen. Mach das Quiz oben, um passende Empfehlungen zu erhalten.'}
          </p>
          <input className="search" placeholder="Suche nach Duft, Marke oder Duftfamilie…" value={query} onChange={e => setQuery(e.target.value)} />
          <div className="perfume-list">
            {recommended.map(p => (
              <PerfumeTile perfume={p} key={p.id} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
