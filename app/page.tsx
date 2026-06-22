'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import {
  getPerfumes,
  rankPerfumes,
  buyUrl,
  NOTE_THEMES,
  type Perfume,
  type QuizAnswers,
  type RankedPerfume
} from '@/lib/perfumes';

type QuestionKind = 'gender' | 'anchor' | 'family' | 'occasion' | 'season' | 'sillage' | 'budget' | 'lovedNote' | 'dislikedNote';
type QuizQuestion = { q: string; hint?: string; kind: QuestionKind; a: [string, string][] };

const questions: QuizQuestion[] = [
  {
    q: 'Für wen suchst du einen Duft?',
    hint: 'So zeigen wir dir nur Düfte, die wirklich passen.',
    kind: 'gender',
    a: [
      ['Für Damen', 'women'],
      ['Für Herren', 'men'],
      ['Egal / Unisex', 'unisex']
    ]
  },
  {
    q: 'Kennst du schon einen Duft, den du liebst? (optional)',
    hint: 'Verrätst du uns einen Lieblingsduft, finden wir gezielt ähnlich riechende Düfte für dich.',
    kind: 'anchor',
    a: []
  },
  {
    q: 'Welcher Moment fühlt sich am meisten nach dir an?',
    hint: 'Wähl aus dem Bauch heraus – es gibt kein richtig oder falsch.',
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
    hint: 'Stell dir vor, du riechst kurz daran – was gefällt dir am meisten?',
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
    hint: 'Dein Duft ist ein erster Eindruck – welcher soll es sein?',
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
    hint: 'Diese Note gewichten wir bei deinem Match besonders stark.',
    kind: 'lovedNote',
    a: NOTE_THEMES.map(t => [t.label, t.code] as [string, string])
  },
  {
    q: 'Gibt es eine Note, die gar nicht geht?',
    hint: 'Düfte mit dieser Note rutschen in deinem Ranking nach unten.',
    kind: 'dislikedNote',
    a: [['Keine – ich bin offen', ''], ...NOTE_THEMES.map(t => [t.label, t.code] as [string, string])]
  },
  {
    q: 'Wofür suchst du den Duft hauptsächlich?',
    hint: 'So treffen wir den Charakter und die Intensität besser.',
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
    hint: 'Viele Düfte entfalten sich je nach Wetter ganz anders.',
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
    hint: 'Sillage = wie weit dein Duft im Raum wahrnehmbar ist.',
    kind: 'sillage',
    a: [
      ['Dezent – nah an der Haut', 'low'],
      ['Ausgewogen', 'medium'],
      ['Sehr präsent – man riecht mich', 'high']
    ]
  },
  {
    q: 'Was ist dein Budget?',
    hint: 'Wir zeigen dir die besten Treffer in deinem Rahmen – ohne dich einzuschränken.',
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

// Reihenfolge der Duftfamilien für das kompakte Kodieren im Teilen-Link.
const FAMILY_ORDER = ['clean', 'gourmand', 'woody', 'floral'] as const;

const profileText: Record<string, { title: string; text: string }> = {
  clean: { title: 'The Clean Slate', text: 'Du liebst frische, saubere Düfte. Deine Signatur wirkt gepflegt, leicht und modern.' },
  gourmand: { title: 'The Soft Cashmere Vibe', text: 'Du passt zu warmen, weichen und leicht süßen Düften. Deine Duftsignatur wirkt gemütlich und sinnlich.' },
  woody: { title: 'Midnight Tailoring', text: 'Du brauchst elegante, holzige und würzige Düfte. Deine Signatur wirkt hochwertig und selbstbewusst.' },
  floral: { title: 'The Blooming Romance', text: 'Du passt zu blumigen, fruchtigen und femininen Düften. Deine Signatur wirkt charmant und weich.' }
};

const genderLabels: Record<string, string> = { women: 'Damen', men: 'Herren', unisex: 'Unisex' };

// Deutsche Suchbegriffe je gespeichertem Geschlecht (Werte sind englisch gespeichert).
const genderSearchTerms: Record<string, string> = {
  Women: 'damen frauen women weiblich',
  Men: 'herren männer men männlich',
  Unisex: 'unisex'
};

// Anklickbare Familien-Kacheln (filtern die Duftdatenbank).
const FAMILY_TILES: { code: string; label: string; desc: string }[] = [
  { code: 'clean', label: 'Clean', desc: 'Frisch, sauber, weißer Moschus.' },
  { code: 'gourmand', label: 'Gourmand', desc: 'Vanille, Amber, weiche Süße.' },
  { code: 'woody', label: 'Woody', desc: 'Holz, Leder, edle Tiefe.' },
  { code: 'floral', label: 'Floral', desc: 'Rose, Jasmin, feminine Eleganz.' }
];
const familyDisplay: Record<string, string> = { clean: 'Clean', gourmand: 'Gourmand', woody: 'Woody', floral: 'Floral' };

// Aktuelle Jahreszeit -> Anzeige, passende Saison-Werte und Ratgeber-Link.
const SEASON_LABEL: Record<string, string> = { Sommer: 'Sommer', Frühling: 'Frühling', 'Herbst/Winter': 'Herbst & Winter' };
const SEASON_MATCH: Record<string, string[]> = { Sommer: ['Sommer'], Frühling: ['Frühling'], 'Herbst/Winter': ['Herbst/Winter', 'Winter'] };
const SEASON_GUIDE: Record<string, string> = { Sommer: '/ratgeber/die-besten-sommerduefte', 'Herbst/Winter': '/ratgeber/die-besten-winterduefte' };

const emptyFamily = { clean: 0, gourmand: 0, woody: 0, floral: 0 };

// Momentaufnahme des Quiz-Zustands – ermöglicht den „Zurück"-Knopf.
type QuizSnapshot = {
  step: number;
  family: Record<string, number>;
  genderPref: QuizAnswers['gender'];
  occasion: QuizAnswers['occasion'];
  season: QuizAnswers['season'];
  sillage: QuizAnswers['sillage'];
  budgetMax: number | null;
  lovedNote: string;
  dislikedNote: string;
  anchorId: string;
};

// Fallback, falls die Datenbank (noch) nicht erreichbar ist. Ohne slug -> kein Link.
const starterPerfumes: Perfume[] = [
  { id: '1', perfume_name: 'Beach Walk Style', slug: null, gender: 'Unisex', fragrance_family: 'clean', price_chf: 95, longevity: 6, sillage: 5, scentmatch_score: 91, season: 'Sommer', occasion: 'Alltag', description: null, image_url: null, affiliate_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '2', perfume_name: 'Vanilla Cashmere Style', slug: null, gender: 'Women', fragrance_family: 'gourmand', price_chf: 79, longevity: 8, sillage: 7, scentmatch_score: 94, season: 'Herbst/Winter', occasion: 'Date', description: null, image_url: null, affiliate_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '3', perfume_name: 'Dark Wood Style', slug: null, gender: 'Unisex', fragrance_family: 'woody', price_chf: 120, longevity: 9, sillage: 8, scentmatch_score: 92, season: 'Winter', occasion: 'Abend', description: null, image_url: null, affiliate_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } },
  { id: '4', perfume_name: 'Blooming Rose Style', slug: null, gender: 'Women', fragrance_family: 'floral', price_chf: 68, longevity: 7, sillage: 6, scentmatch_score: 90, season: 'Frühling', occasion: 'Alltag', description: null, image_url: null, affiliate_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'ScentMatch Pick' } }
];

function PerfumeCover({ perfume, large }: { perfume: Perfume; large?: boolean }) {
  const fam = perfume.fragrance_family || '';
  const className = `cover${large ? ' cover-large' : ''} cover-${fam}`;
  if (perfume.image_url) {
    return <div className={className} style={{ backgroundImage: `url(${perfume.image_url})` }} />;
  }
  return (
    <div className={className}>
      <span className="cover-glyph">✦</span>
    </div>
  );
}

function PerfumeTile({ perfume, matchPercent }: { perfume: Perfume; matchPercent?: number }) {
  const content = (
    <>
      <PerfumeCover perfume={perfume} />
      {matchPercent != null && <div className="match-badge">{matchPercent}% Match</div>}
      <h3>{perfume.perfume_name}</h3>
      <p className="small">{perfume.brands?.name || 'Marke offen'} · {familyDisplay[perfume.fragrance_family || ''] || 'Duftfamilie offen'}</p>
      <div className="tile-meta">
        <span className="score-pill">Score {perfume.scentmatch_score ?? 80}</span>
        <span className="small">{perfume.season || 'Ganzjährig'} · {perfume.occasion || 'flexibel'}</span>
      </div>
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
  const [familyFilter, setFamilyFilter] = useState('');
  const [currentSeason, setCurrentSeason] = useState('');
  const [history, setHistory] = useState<QuizSnapshot[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [perfumes, setPerfumes] = useState<Perfume[]>(starterPerfumes);
  const [query, setQuery] = useState('');
  const [shareMsg, setShareMsg] = useState('');

  useEffect(() => {
    async function loadPerfumes() {
      const data = await getPerfumes(500);
      if (data.length > 0) setPerfumes(data);
    }
    loadPerfumes();

    // Aktuelle Jahreszeit bestimmen (im Browser, damit es immer aktuell ist).
    const m = new Date().getMonth();
    if (m >= 5 && m <= 7) setCurrentSeason('Sommer');
    else if (m >= 2 && m <= 4) setCurrentSeason('Frühling');
    else setCurrentSeason('Herbst/Winter');

    // Geteilten Ergebnis-Link auslesen: Liegen Quiz-Antworten in der URL,
    // stellen wir das Ergebnis direkt wieder her (ohne erneutes Quiz).
    const sp = new URLSearchParams(window.location.search);
    if (sp.has('f')) {
      setGenderPref((sp.get('g') || '') as QuizAnswers['gender']);
      const fam = (sp.get('f') || '').split('-').map(n => parseInt(n, 10) || 0);
      setFamily({ clean: fam[0] || 0, gourmand: fam[1] || 0, woody: fam[2] || 0, floral: fam[3] || 0 });
      setOccasion((sp.get('o') || '') as QuizAnswers['occasion']);
      setSeason((sp.get('s') || '') as QuizAnswers['season']);
      setSillage((sp.get('si') || '') as QuizAnswers['sillage']);
      const b = sp.get('b');
      setBudgetMax(b ? parseInt(b, 10) : null);
      setLovedNote(sp.get('l') || '');
      setDislikedNote(sp.get('d') || '');
      setAnchorId(sp.get('a') || '');
      setStep(questions.length - 1);
      setShowResult(true);
    }
  }, []);

  const answers: QuizAnswers = { gender: genderPref, family, occasion, season, sillage, budgetMax, lovedNote, dislikedNote, anchorId };
  const winner = Object.entries(family).sort((a, b) => b[1] - a[1])[0]?.[0] || 'clean';

  const ranked: RankedPerfume[] = showResult
    ? rankPerfumes(perfumes, answers)
    : [...perfumes]
        .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0))
        .map(p => ({ perfume: p, score: 0 }));

  const visible = ranked.filter(({ perfume: p }) => {
    if (familyFilter && p.fragrance_family !== familyFilter) return false;
    if (!query) return true;
    const notes = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].join(' ');
    const genderTerms = p.gender ? genderSearchTerms[p.gender] || p.gender : '';
    // Synonyme: "Schokolade" findet auch Kakao/Praline.
    const synonyms = /kakao|schokolade|praline/i.test(notes) ? ' schokolade kakao praline' : '';
    const haystack = `${p.perfume_name} ${p.fragrance_family} ${p.brands?.name || ''} ${genderTerms} ${p.season || ''} ${p.occasion || ''} ${notes}${synonyms}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  function selectFamily(code: string) {
    setFamilyFilter(prev => (prev === code ? '' : code));
    if (typeof document !== 'undefined') {
      document.getElementById('database')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const seasonLabel = SEASON_LABEL[currentSeason] || '';
  const seasonMatch = SEASON_MATCH[currentSeason] || [];
  const seasonGuide = SEASON_GUIDE[currentSeason];
  const seasonalPerfumes = currentSeason
    ? [...perfumes]
        .filter(p => p.season && seasonMatch.includes(p.season))
        .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0))
        .slice(0, 9)
    : [];

  const topPick = showResult ? visible[0] : undefined;

  // Aktuellen Zustand sichern, bevor wir eine Frage weitergehen (für „Zurück").
  function pushHistory() {
    setHistory(h => [
      ...h,
      { step, family: { ...family }, genderPref, occasion, season, sillage, budgetMax, lovedNote, dislikedNote, anchorId }
    ]);
  }

  function answer(kind: QuestionKind, code: string) {
    pushHistory();
    if (kind === 'gender') setGenderPref(code as QuizAnswers['gender']);
    else if (kind === 'family') setFamily(prev => ({ ...prev, [code]: (prev[code] || 0) + 1 }));
    else if (kind === 'occasion') setOccasion(code as QuizAnswers['occasion']);
    else if (kind === 'season') setSeason(code as QuizAnswers['season']);
    else if (kind === 'sillage') setSillage(code as QuizAnswers['sillage']);
    else if (kind === 'budget') setBudgetMax(code === '80' ? 80 : code === '150' ? 150 : null);
    else if (kind === 'lovedNote') setLovedNote(code);
    else if (kind === 'dislikedNote') setDislikedNote(code);

    advanceStep();
  }

  // Anker-Frage (Dropdown) per Knopf weitergehen – Auswahl ist bereits gesetzt.
  function advanceAnchor() {
    pushHistory();
    advanceStep();
  }

  function advanceStep() {
    if (step + 1 >= questions.length) setShowResult(true);
    else setStep(step + 1);
  }

  // Einen Schritt zurück und die letzte Antwort wiederherstellen.
  function goBack() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setStep(prev.step);
    setFamily(prev.family);
    setGenderPref(prev.genderPref);
    setOccasion(prev.occasion);
    setSeason(prev.season);
    setSillage(prev.sillage);
    setBudgetMax(prev.budgetMax);
    setLovedNote(prev.lovedNote);
    setDislikedNote(prev.dislikedNote);
    setAnchorId(prev.anchorId);
    setShowResult(false);
    setHistory(history.slice(0, -1));
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
    setHistory([]);
    setShowResult(false);
    setShareMsg('');
    // Geteilte Antworten aus der URL entfernen, damit ein Neustart sauber ist.
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState(null, '', window.location.pathname + '#quiz');
    }
  }

  // Baut den teilbaren Link aus den aktuellen Quiz-Antworten.
  function buildShareUrl(): string {
    const p = new URLSearchParams();
    if (genderPref) p.set('g', genderPref);
    p.set('f', FAMILY_ORDER.map(k => family[k] || 0).join('-'));
    if (occasion) p.set('o', occasion);
    if (season) p.set('s', season);
    if (sillage) p.set('si', sillage);
    if (budgetMax != null) p.set('b', String(budgetMax));
    if (lovedNote) p.set('l', lovedNote);
    if (dislikedNote) p.set('d', dislikedNote);
    if (anchorId) p.set('a', anchorId);
    return `${window.location.origin}${window.location.pathname}?${p.toString()}#quiz`;
  }

  // Ergebnis teilen: nutzt das native Teilen-Menü (Handy) oder kopiert den Link.
  async function shareResult() {
    const url = buildShareUrl();
    const title = `Mein ScentMatch-Duftprofil: ${profileText[winner].title}`;
    const text = topPick
      ? `Mein Top-Match ist ${topPick.perfume.perfume_name}. Finde mit dem kostenlosen ScentMatch-Quiz deinen:`
      : 'Finde mit dem kostenlosen ScentMatch-Quiz deinen Signature-Duft:';
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
    setTimeout(() => setShareMsg(''), 5000);
  }

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="hero-stage">
          <div className="hero">
            <div>
              <p className="eyebrow">Dein Signature-Duft · kuratiert in der Schweiz</p>
              <h1>Finde deinen Signature-Duft in 3 Minuten.</h1>
              <p className="lead">ScentMatch verbindet ein elegantes Duft-Quiz mit einer intelligenten Match-Engine: Jeder Duft wird gegen deine Antworten zu Geschlecht, Duftrichtung, Anlass, Saison, Intensität und Budget bewertet.</p>
              <div className="cta">
                <a className="button" href="#quiz">Quiz starten</a>
                <a className="button secondary" href="#database">Düfte ansehen</a>
                <Link className="button secondary" href="/ratgeber">Ratgeber lesen</Link>
              </div>
              <p className="hero-trust"><span className="stars">★★★★★</span> Über 160 kuratierte Düfte · von Bestsellern bis zu seltenen Nischenperlen</p>
            </div>
            <div className="card perfume-card">
              <div className="bottle">✦</div>
              <div className="hero-stats">
                <div className="hero-stat"><strong>160+</strong><span>kuratierte Düfte</span></div>
                <div className="hero-stat"><strong>30+</strong><span>Marken weltweit</span></div>
                <div className="hero-stat"><strong>%</strong><span>echter Match-Score statt Zufall</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="warum" className="section">
          <p className="eyebrow">Warum ScentMatch?</p>
          <h2>Duft finden, das sich nicht nach Glücksspiel anfühlt</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">✦</div>
              <h3>Echter Match-Score</h3>
              <p className="small">Jeder Duft wird gegen deine Antworten berechnet – kein Zufall, keine blinde TikTok-Empfehlung.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">❖</div>
              <h3>Günstige Alternativen</h3>
              <p className="small">Zu teuren Düften zeigen wir automatisch ähnlich riechende, günstigere Varianten.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">✿</div>
              <h3>Kuratiert & ehrlich</h3>
              <p className="small">Sorgfältig ausgewählte Düfte – von Bestsellern bis zu seltenen Nischenperlen.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">♡</div>
              <h3>Schnell & persönlich</h3>
              <p className="small">Dein Ergebnis in unter 3 Minuten – abgestimmt auf deinen Geschmack, Anlass und Budget.</p>
            </div>
          </div>
        </section>

        {seasonalPerfumes.length > 0 && (
          <section className="section">
            <p className="eyebrow">Saison-Empfehlung</p>
            <h2>Passend zur Jahreszeit · {seasonLabel}</h2>
            <p className="small">Gerade ist {seasonLabel} – diese Düfte passen jetzt besonders gut.</p>
            <div className="perfume-list">
              {seasonalPerfumes.map(p => (
                <PerfumeTile perfume={p} key={p.id} />
              ))}
            </div>
            {seasonGuide && (
              <div className="cta">
                <Link className="button secondary" href={seasonGuide}>Mehr {seasonLabel}-Düfte im Ratgeber</Link>
              </div>
            )}
          </section>
        )}

        <section className="section">
          <p className="eyebrow">Duftrichtungen</p>
          <h2>Entdecke nach Stil</h2>
          <div className="grid">
            {FAMILY_TILES.map(t => (
              <button
                key={t.code}
                type="button"
                className={`tile tile-family${familyFilter === t.code ? ' tile-active' : ''}`}
                onClick={() => selectFamily(t.code)}
              >
                <h3>{t.label}</h3>
                <p className="small">{t.desc}</p>
              </button>
            ))}
          </div>
        </section>

        <section id="quiz" className="section card quiz">
          <p className="eyebrow">Duft-Quiz</p>
          {!showResult ? (
            <>
              <p className="small">Frage {step + 1} von {questions.length}</p>
              <div className="scorebar quiz-progress"><span style={{ width: `${(step / questions.length) * 100}%` }} /></div>
              <div className="question">{questions[step].q}</div>
              {questions[step].hint && <p className="small quiz-hint">{questions[step].hint}</p>}
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
                  <button className="answer" onClick={advanceAnchor}>{anchorId ? 'Weiter' : 'Überspringen'}</button>
                </div>
              ) : (
                <div className="answers">
                  {questions[step].a.map(([label, code]) => (
                    <button className="answer" key={label} onClick={() => answer(questions[step].kind, code)}>{label}</button>
                  ))}
                </div>
              )}
              {history.length > 0 && (
                <button className="quiz-back" onClick={goBack}>← Zurück</button>
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
                  <div className="cta">
                    {topPick.perfume.slug && (
                      <Link className="button secondary" href={`/duft/${topPick.perfume.slug}`}>Duftprofil ansehen</Link>
                    )}
                    <a className="button buy-button" href={buyUrl(topPick.perfume)} target="_blank" rel="sponsored nofollow noopener noreferrer">Jetzt ansehen →</a>
                  </div>
                </div>
              )}

              {Object.entries(family).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <div className="small">{profileText[key].title}: {value}</div>
                  <div className="scorebar"><span style={{ width: `${(value / familyQuestionCount) * 100}%` }} /></div>
                </div>
              ))}

              <div className="share-box">
                <p className="small">Möchtest du dein Ergebnis speichern oder einer Freundin schicken?</p>
                <div className="cta">
                  <button type="button" className="button" onClick={shareResult}>🔗 Ergebnis teilen / speichern</button>
                  <button type="button" className="secondary" onClick={restartQuiz}>Quiz neu starten</button>
                </div>
                {shareMsg && <p className="small share-msg">{shareMsg}</p>}
              </div>
            </div>
          )}
        </section>

        <section id="database" className="section">
          <p className="eyebrow">Die Kollektion</p>
          <h2>Duftdatenbank</h2>
          <p className="small">
            {showResult
              ? `Sortiert nach Match-Score für dein Profil${genderPref ? ` (${genderLabels[genderPref]})` : ''}. Klicke einen Duft für das volle Profil.`
              : 'Klicke auf einen Duft, um sein vollständiges Profil zu sehen. Mach das Quiz oben für deinen persönlichen Match-Score.'}
          </p>
          <input className="search" placeholder="Suche nach Duft, Marke, Note (z. B. Schokolade), Geschlecht oder Anlass…" value={query} onChange={e => setQuery(e.target.value)} />
          {familyFilter && (
            <p className="small filter-chip-row">
              Gefiltert nach <span className="filter-chip">{familyDisplay[familyFilter]}</span>
              <button type="button" className="link-button filter-reset" onClick={() => setFamilyFilter('')}>Filter entfernen</button>
            </p>
          )}
          <div className="perfume-list">
            {visible.length === 0 ? (
              <p className="small">Keine Düfte gefunden. Versuch einen anderen Suchbegriff oder entferne den Filter.</p>
            ) : (
              visible.map(({ perfume: p, score }) => (
                <PerfumeTile perfume={p} matchPercent={showResult ? score : undefined} key={p.id} />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
