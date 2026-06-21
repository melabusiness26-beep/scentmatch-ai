'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getPerfumes,
  rankPerfumes,
  NOTE_THEMES,
  type Perfume,
  type QuizAnswers,
  type RankedPerfume
} from '@/lib/perfumes';

type QuestionKind = 'gender' | 'anchor' | 'family' | 'occasion' | 'season' | 'sillage' | 'budget' | 'lovedNote' | 'dislikedNote';
type QuizQuestion = { q: string; kind: QuestionKind; a: [string, string][] };

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
    q: 'Kennst du schon einen Duft, den du liebst? (optional)',
    kind: 'anchor',
    a: []
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
    q: 'Welche Duftnote liebst du besonders?',
    kind: 'lovedNote',
    a: NOTE_THEMES.map(t => [t.label, t.code] as [string, string])
  },
  {
    q: 'Gibt es eine Note, die gar nicht geht?',
    kind: 'dislikedNote',
    a: [['Keine – ich bin offen', ''], ...NOTE_THEMES.map(t => [t.label, t.code] as [string, string])]
  },
  {
    q: 'Wofür suchst du den Duft hauptsächlich?',
    kind: 'occasion',
    a: [
      ['Alltag & Büro', 'daily'],
      ['Für Dates', 'date'],
      ['Abends & zum Ausgehen', 'evening'],
      ['Für alles – ich bin flexibel', 'any']
    ]
  },
  {
    q: 'Für welche Jahreszeit suchst du ihn?',
    kind: 'season',
    a: [
      ['Frühling', 'Frühling'],
      ['Sommer', 'Sommer'],
      ['Herbst & Winter', 'Herbst/Winter'],
      ['Das ganze Jahr', 'Ganzjährig']
    ]
  },
  {
    q: 'Wie präsent darf dein Duft sein?',
    kind: 'sillage',
    a: [
      ['Dezent – nah an der Haut', 'low'],
      ['Ausgewogen', 'medium'],
      ['Sehr präsent – man riecht mich', 'high']
    ]
  },
  {
    q: 'Was ist dein Budget?',
    kind: 'budget',
    a: [
      ['Bis CHF 80', '80'],
      ['CHF 80–150', '150'],
      ['Premium – über CHF 150', 'premium'],
      ['Budget egal', 'any']
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

const emptyFamily = { clean: 0, gourmand: 0, woody: 0, floral: 0 };

// Fallback, falls die Datenbank (noch) nicht erreichbar ist. Ohne slug -> kein Link.
const starterPerfumes: Perfume[] = [
  { id: '1', perfume_name: 'Beach Walk Style', slug: null, gender: 'Unisex', fragrance_family: 'clean', price_chf: 95, longevity: 6, sillage: 5, scentmatch_score: 91, season: 'Sommer', occasion: 'Alltag', description: null, image_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '2', perfume_name: 'Vanilla Cashmere Style', slug: null, gender: 'Women', fragrance_family: 'gourmand', price_chf: 79, longevity: 8, sillage: 7, scentmatch_score: 94, season: 'Herbst/Winter', occasion: 'Date', description: null, image_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '3', perfume_name: 'Dark Wood Style', slug: null, gender: 'Unisex', fragrance_family: 'woody', price_chf: 120, longevity: 9, sillage: 8, scentmatch_score: 92, season: 'Winter', occasion: 'Abend', description: null, image_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '4', perfume_name: 'Blooming Rose Style', slug: null, gender: 'Women', fragrance_family: 'floral', price_chf: 68, longevity: 7, sillage: 6, scentmatch_score: 90, season: 'Frühling', occasion: 'Alltag', description: null, image_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } }
];

function PerfumeTile({ perfume, matchPercent }: { perfume: Perfume; matchPercent?: number }) {
  const content = (
    <>
      {matchPercent != null && <div className="match-badge">{matchPercent}% Match</div>}
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
  const [family, setFamily] = useState<Record<string, number>>({ ...emptyFamily });
  const [genderPref, setGenderPref] = useState<QuizAnswers['gender']>('');
  const [occasion, setOccasion] = useState<QuizAnswers['occasion']>('');
  const [season, setSeason] = useState<QuizAnswers['season']>('');
  const [sillage, setSillage] = useState<QuizAnswers['sillage']>('');
  const [budgetMax, setBudgetMax] = useState<number | null>(null);
  const [lovedNote, setLovedNote] = useState('');
  const [dislikedNote, setDislikedNote] = useState('');
  const [anchorId, setAnchorId] = useState('');
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

  const answers: QuizAnswers = { gender: genderPref, family, occasion, season, sillage, budgetMax, lovedNote, dislikedNote, anchorId };
  const winner = Object.entries(family).sort((a, b) => b[1] - a[1])[0]?.[0] || 'clean';

  const ranked: RankedPerfume[] = showResult
    ? rankPerfumes(perfumes, answers)
    : [...perfumes]
        .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0))
        .map(p => ({ perfume: p, score: 0 }));

  const visible = ranked.filter(({ perfume: p }) =>
    !query || `${p.perfume_name} ${p.fragrance_family} ${p.brands?.name}`.toLowerCase().includes(query.toLowerCase())
  );

  const topPick = showResult ? visible[0] : undefined;

  function answer(kind: QuestionKind, code: string) {
    if (kind === 'gender') setGenderPref(code as QuizAnswers['gender']);
    else if (kind === 'family') setFamily(prev => ({ ...prev, [code]: (prev[code] || 0) + 1 }));
    else if (kind === 'occasion') setOccasion(code as QuizAnswers['occasion']);
    else if (kind === 'season') setSeason(code as QuizAnswers['season']);
    else if (kind === 'sillage') setSillage(code as QuizAnswers['sillage']);
    else if (kind === 'budget') setBudgetMax(code === '80' ? 80 : code === '150' ? 150 : null);
    else if (kind === 'lovedNote') setLovedNote(code);
    else if (kind === 'dislikedNote') setDislikedNote(code);

    advance();
  }

  function advance() {
    if (step + 1 >= questions.length) setShowResult(true);
    else setStep(step + 1);
  }

  function restartQuiz() {
    setStep(0);
    setFamily({ ...emptyFamily });
    setGenderPref('');
    setOccasion('');
    setSeason('');
    setSillage('');
    setBudgetMax(null);
    setLovedNote('');
    setDislikedNote('');
    setAnchorId('');
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
            <p className="lead">ScentMatch verbindet ein elegantes Duft-Quiz mit einer intelligenten Match-Engine: Jeder Duft wird gegen deine Antworten zu Geschlecht, Duftrichtung, Anlass, Saison, Intensität und Budget bewertet.</p>
            <div className="cta">
              <a className="button" href="#quiz">Quiz starten</a>
              <a className="button secondary" href="#database">Düfte ansehen</a>
            </div>
          </div>
          <div className="card perfume-card">
            <div className="bottle">✦</div>
            <div>
              <h2>Premium statt Zufall</h2>
              <p className="small">Keine blinde TikTok-Empfehlung. ScentMatch errechnet pro Duft einen echten Match-Score in Prozent.</p>
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
              <div className="scorebar quiz-progress"><span style={{ width: `${(step / questions.length) * 100}%` }} /></div>
              <div className="question">{questions[step].q}</div>
              {questions[step].kind === 'anchor' ? (
                <div className="answers">
                  <select className="search" value={anchorId} onChange={e => setAnchorId(e.target.value)}>
                    <option value="">– Duft auswählen –</option>
                    {perfumes.map(p => (
                      <option value={p.id} key={p.id}>
                        {p.perfume_name}{p.brands?.name ? ` – ${p.brands.name}` : ''}
                      </option>
                    ))}
                  </select>
                  <p className="small">Optional – du kannst diese Frage auch einfach überspringen.</p>
                  <button className="answer" onClick={advance}>{anchorId ? 'Weiter' : 'Überspringen'}</button>
                </div>
              ) : (
                <div className="answers">
                  {questions[step].a.map(([label, code]) => (
                    <button className="answer" key={label} onClick={() => answer(questions[step].kind, code)}>{label}</button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="result">
              <p className="small">Dein Duftprofil{genderPref ? ` · ${genderLabels[genderPref]}` : ''}{anchorId ? ` · ähnlich zu ${perfumes.find(p => p.id === anchorId)?.perfume_name || ''}` : ''}</p>
              <h2>{profileText[winner].title}</h2>
              <p className="lead">{profileText[winner].text}</p>

              {topPick && (
                <div className="top-pick">
                  <p className="small">Dein Top-Match · {topPick.score}% passend</p>
                  <h3>{topPick.perfume.perfume_name} · {topPick.perfume.brands?.name || 'Marke offen'}</h3>
                  {topPick.perfume.slug && (
                    <Link className="button" href={`/duft/${topPick.perfume.slug}`}>Duftprofil ansehen</Link>
                  )}
                </div>
              )}

              {Object.entries(family).map(([key, value]) => (
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
              ? `Sortiert nach Match-Score für dein Profil${genderPref ? ` (${genderLabels[genderPref]})` : ''}. Klicke einen Duft für das volle Profil.`
              : 'Klicke auf einen Duft, um sein vollständiges Profil zu sehen. Mach das Quiz oben für deinen persönlichen Match-Score.'}
          </p>
          <input className="search" placeholder="Suche nach Duft, Marke oder Duftfamilie…" value={query} onChange={e => setQuery(e.target.value)} />
          <div className="perfume-list">
            {visible.map(({ perfume: p, score }) => (
              <PerfumeTile perfume={p} matchPercent={showResult ? score : undefined} key={p.id} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
