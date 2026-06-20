'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getPerfumes, type Perfume } from '@/lib/perfumes';

const questions = [
  {
    q: 'Welcher Moment fühlt sich am meisten nach dir an?',
    a: [
      ['Frisch geduscht, weißes Hemd, offene Fenster', 'clean'],
      ['Kerzenlicht, Vanille, warme Decke', 'gourmand'],
      ['Dunkle Bar, Holz, Leder, ruhiger Luxus', 'woody'],
      ['Blumenmarkt, Rosé, weiches Kleid', 'floral']
    ]
  },
  {
    q: 'Wie möchtest du wirken?',
    a: [
      ['Klar, frisch und gepflegt', 'clean'],
      ['Warm, weich und nahbar', 'gourmand'],
      ['Elegant, teuer und selbstbewusst', 'woody'],
      ['Romantisch, feminin und charmant', 'floral']
    ]
  },
  {
    q: 'Welche Duftnote zieht dich an?',
    a: [
      ['Moschus, Tee, Zitrus', 'clean'],
      ['Vanille, Amber, Karamell', 'gourmand'],
      ['Sandelholz, Pfeffer, Oud', 'woody'],
      ['Rose, Jasmin, Pfirsich', 'floral']
    ]
  }
];

const profileText: Record<string, { title: string; text: string }> = {
  clean: { title: 'The Clean Slate', text: 'Du liebst frische, saubere Düfte. Deine Signatur wirkt gepflegt, leicht und modern.' },
  gourmand: { title: 'The Soft Cashmere Vibe', text: 'Du passt zu warmen, weichen und leicht süßen Düften. Deine Duftsignatur wirkt gemütlich und sinnlich.' },
  woody: { title: 'Midnight Tailoring', text: 'Du brauchst elegante, holzige und würzige Düfte. Deine Signatur wirkt hochwertig und selbstbewusst.' },
  floral: { title: 'The Blooming Romance', text: 'Du passt zu blumigen, fruchtigen und femininen Düften. Deine Signatur wirkt charmant und weich.' }
};

// Fallback, falls die Datenbank (noch) nicht erreichbar ist. Diese Beispiele haben
// keinen slug und verlinken daher nicht auf eine Detailseite.
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
  const [showResult, setShowResult] = useState(false);
  const [perfumes, setPerfumes] = useState<Perfume[]>(starterPerfumes);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function loadPerfumes() {
      const data = await getPerfumes(12);
      if (data.length > 0) setPerfumes(data);
    }
    loadPerfumes();
  }, []);

  const winner = useMemo(() => Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'clean', [scores]);
  const recommended = perfumes
    .filter(p => !query || `${p.perfume_name} ${p.fragrance_family} ${p.brands?.name}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0));

  function answer(type: string) {
    setScores(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
    if (step + 1 >= questions.length) setShowResult(true);
    else setStep(step + 1);
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
              <p className="small">Keine blinde TikTok-Empfehlung. ScentMatch prüft Duftfamilie, Anlass, Saison, Haltbarkeit und Stil.</p>
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
                {questions[step].a.map(([text, type]) => (
                  <button className="answer" key={text} onClick={() => answer(type)}>{text}</button>
                ))}
              </div>
            </>
          ) : (
            <div className="result">
              <p className="small">Dein Duftprofil</p>
              <h2>{profileText[winner].title}</h2>
              <p className="lead">{profileText[winner].text}</p>
              {Object.entries(scores).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <div className="small">{profileText[key].title}: {value}</div>
                  <div className="scorebar"><span style={{ width: `${(value / questions.length) * 100}%` }} /></div>
                </div>
              ))}
              <button onClick={() => { setStep(0); setScores({ clean:0, gourmand:0, woody:0, floral:0 }); setShowResult(false); }}>Quiz neu starten</button>
            </div>
          )}
        </section>

        <section id="database" className="section">
          <h2>Duftdatenbank</h2>
          <p className="small">Klicke auf einen Duft, um sein vollständiges Profil zu sehen. Sobald deine Supabase-Tabelle Düfte enthält, erscheinen sie hier automatisch.</p>
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
