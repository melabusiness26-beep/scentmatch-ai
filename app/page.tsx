'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import {
  getPerfumes,
  rankPerfumes,
  NOTE_THEMES,
  type Perfume,
  type QuizAnswers,
  type RankedPerfume
} from '@/lib/perfumes';
import { PerfumeTile, familyDisplay } from '@/app/PerfumeTile';
import { AffiliateButton } from '@/app/AffiliateButton';

type QuestionKind = 'gender' | 'anchor' | 'family' | 'occasion' | 'season' | 'sillage' | 'budget' | 'lovedNote' | 'dislikedNote';
type QuizQuestion = { q: string; hint?: string; kind: QuestionKind; a: [string, string][] };

const questions: QuizQuestion[] = [
  {
    q: 'Für wen suchen wir den perfekten Duft?',
    hint: 'So zeigen wir dir nur, was wirklich passt – kein Suchen im Heuhaufen.',
    kind: 'gender',
    a: [
      ['Für Damen', 'women'],
      ['Für Herren', 'men'],
      ['Egal – zeig mir alles', 'unisex']
    ]
  },
  {
    q: 'Gibt es einen Duft, den du jetzt schon liebst? (optional)',
    hint: 'Verrätst du uns deinen Liebling, finden wir gezielt Düfte, die ähnlich riechen – wie ein „mehr davon".',
    kind: 'anchor',
    a: []
  },
  {
    q: 'Stell dir deinen Lieblingsmoment vor – welcher ist es?',
    hint: 'Geh ganz nach Bauchgefühl. Es gibt kein Richtig oder Falsch.',
    kind: 'family',
    a: [
      ['Frisch geduscht, weißes Hemd, Fenster weit auf', 'clean'],
      ['Kerzenlicht, Vanille und eine warme Decke', 'gourmand'],
      ['Dunkle Bar, edles Holz, ein Hauch Leder', 'woody'],
      ['Blumenmarkt im Frühling, leichtes Kleid', 'floral']
    ]
  },
  {
    q: 'Woran würdest du am liebsten gerade schnuppern?',
    hint: 'Augen kurz zu – was zieht dich sofort an?',
    kind: 'family',
    a: [
      ['Etwas Frisches: Zitrus, Tee, sauberer Moschus', 'clean'],
      ['Etwas Süßes: Vanille, Karamell, Amber', 'gourmand'],
      ['Etwas Tiefes: Sandelholz, Pfeffer, Oud', 'woody'],
      ['Etwas Blumiges: Rose, Jasmin, Pfirsich', 'floral']
    ]
  },
  {
    q: 'Wie würden gute Freunde deinen Stil beschreiben?',
    hint: 'Dein Stil verrät oft, welcher Duft sich richtig „nach dir" anfühlt.',
    kind: 'family',
    a: [
      ['Natürlich, frisch und unkompliziert', 'clean'],
      ['Warmherzig, gemütlich und verspielt', 'gourmand'],
      ['Elegant, edel und zurückhaltend', 'woody'],
      ['Romantisch, lebhaft und feminin', 'floral']
    ]
  },
  {
    q: 'Eine Note, die dein Herz höher schlagen lässt?',
    hint: 'Diese Note gewichten wir bei deinem Match besonders stark.',
    kind: 'lovedNote',
    a: NOTE_THEMES.map(t => [t.label, t.code] as [string, string])
  },
  {
    q: 'Und etwas, das für dich gar nicht geht?',
    hint: 'Düfte mit dieser Note rutschen in deinem Ranking nach unten.',
    kind: 'dislikedNote',
    a: [['Keine – ich bin offen für alles', ''], ...NOTE_THEMES.map(t => [t.label, t.code] as [string, string])]
  },
  {
    q: 'Wann soll dein Duft am meisten glänzen?',
    hint: 'So treffen wir Charakter und Intensität noch besser.',
    kind: 'occasion',
    a: [
      ['Im Alltag & Büro', 'daily'],
      ['Bei Dates & zum Verlieben', 'date'],
      ['Abends & zum Ausgehen', 'evening'],
      ['Eigentlich überall', 'any']
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
    q: 'Wie sehr darf man dich riechen?',
    hint: 'Also: wie weit dein Duft im Raum wahrnehmbar sein soll.',
    kind: 'sillage',
    a: [
      ['Dezent – nur wer mir nah kommt', 'low'],
      ['Ausgewogen – angenehm präsent', 'medium'],
      ['Auffällig – ich hinterlasse Eindruck', 'high']
    ]
  },
  {
    q: 'Was darf dein neuer Liebling kosten?',
    hint: 'Wir zeigen dir die besten Treffer in deinem Rahmen – ohne dich einzuengen.',
    kind: 'budget',
    a: [
      ['Bis CHF 80', '80'],
      ['CHF 80–150', '150'],
      ['Premium – über CHF 150', 'premium'],
      ['Budget ist mir egal', 'any']
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

// Kurze, vorsichtig formulierte Begründung – nur aus vorhandenen Daten abgeleitet.
function buildQuizReason(p: Perfume, answers: QuizAnswers, winner: string): string {
  const reasons: string[] = [];
  if (p.fragrance_family && p.fragrance_family === winner) {
    reasons.push(`er deiner bevorzugten Duftrichtung entspricht (${familyDisplay[winner] || winner})`);
  }
  if (
    answers.season &&
    answers.season !== 'Ganzjährig' &&
    p.season &&
    (p.season === answers.season || p.season === 'Ganzjährig')
  ) {
    reasons.push(`er zu deiner Wunsch-Saison passt (${answers.season})`);
  }
  const occMap: Record<string, string[]> = { daily: ['Alltag', 'Büro'], date: ['Date'], evening: ['Abend'] };
  const wanted = answers.occasion ? occMap[answers.occasion] : undefined;
  if (wanted && p.occasion && wanted.includes(p.occasion)) {
    reasons.push(`er zu deinem Anlass passt (${p.occasion})`);
  }
  if (reasons.length === 0) {
    return `Könnte zu dir passen, wenn du ${familyDisplay[p.fragrance_family || ''] || 'solche'} Düfte magst.`;
  }
  return `Passt gut, weil ${reasons.join(' und ')}.`;
}

// Anklickbare Familien-Kacheln (führen zur gefilterten Duftdatenbank).
const FAMILY_TILES: { code: string; label: string; desc: string }[] = [
  { code: 'clean', label: 'Clean', desc: 'Frisch, sauber, weißer Moschus.' },
  { code: 'gourmand', label: 'Gourmand', desc: 'Vanille, Amber, weiche Süße.' },
  { code: 'woody', label: 'Woody', desc: 'Holz, Leder, edle Tiefe.' },
  { code: 'floral', label: 'Floral', desc: 'Rose, Jasmin, feminine Eleganz.' }
];

// Wählt eine ausgewogene Highlight-Auswahl: erst der bestbewertete Duft je
// Duftfamilie (für Abwechslung), dann mit den nächstbesten auffüllen.
function pickHighlights(list: Perfume[], count: number): Perfume[] {
  const sorted = [...list].sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0));
  const result: Perfume[] = [];
  const usedFamilies = new Set<string>();
  for (const p of sorted) {
    const fam = p.fragrance_family || '';
    if (!usedFamilies.has(fam)) {
      result.push(p);
      usedFamilies.add(fam);
    }
    if (result.length >= count) return result;
  }
  for (const p of sorted) {
    if (result.length >= count) break;
    if (!result.includes(p)) result.push(p);
  }
  return result.slice(0, count);
}

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
  { id: '1', perfume_name: 'Beach Walk Style', slug: null, gender: 'Unisex', fragrance_family: 'clean', price_chf: 95, longevity: 6, sillage: 5, scentmatch_score: 91, season: 'Sommer', occasion: 'Alltag', description: null, image_url: null, affiliate_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'Auressa Pick' } },
  { id: '2', perfume_name: 'Vanilla Cashmere Style', slug: null, gender: 'Women', fragrance_family: 'gourmand', price_chf: 79, longevity: 8, sillage: 7, scentmatch_score: 94, season: 'Herbst/Winter', occasion: 'Date', description: null, image_url: null, affiliate_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'Auressa Pick' } },
  { id: '3', perfume_name: 'Dark Wood Style', slug: null, gender: 'Unisex', fragrance_family: 'woody', price_chf: 120, longevity: 9, sillage: 8, scentmatch_score: 92, season: 'Winter', occasion: 'Abend', description: null, image_url: null, affiliate_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'Auressa Pick' } },
  { id: '4', perfume_name: 'Blooming Rose Style', slug: null, gender: 'Women', fragrance_family: 'floral', price_chf: 68, longevity: 7, sillage: 6, scentmatch_score: 90, season: 'Frühling', occasion: 'Alltag', description: null, image_url: null, affiliate_url: null, top_notes: null, heart_notes: null, base_notes: null, brands: { name: 'Auressa Pick' } }
];

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
  const [currentSeason, setCurrentSeason] = useState('');
  const [history, setHistory] = useState<QuizSnapshot[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [perfumes, setPerfumes] = useState<Perfume[]>(starterPerfumes);
  const [loaded, setLoaded] = useState(false);
  const [shareMsg, setShareMsg] = useState('');
  const [revealScore, setRevealScore] = useState(0);

  useEffect(() => {
    async function loadPerfumes() {
      const data = await getPerfumes(500);
      if (data.length > 0) setPerfumes(data);
      setLoaded(true);
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

  // Personalisierte Rangliste – nur nach dem Quiz.
  const ranked: RankedPerfume[] = showResult ? rankPerfumes(perfumes, answers) : [];
  const topPick = showResult ? ranked[0] : undefined;
  const top3 = ranked.slice(0, 3);
  const topMatches = ranked.slice(3, 12);

  // Wow-Moment: der Match-Score zählt beim Ergebnis von 0 hoch.
  useEffect(() => {
    if (!showResult || !topPick) {
      setRevealScore(0);
      return;
    }
    const target = topPick.score;
    const reduce = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setRevealScore(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setRevealScore(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showResult, topPick?.perfume.id, topPick?.score]);

  // Ausgewogene Highlight-Auswahl für die Startseite (vor dem Quiz).
  const highlights = pickHighlights(perfumes, 6);
  // Echte Katalog-Kennzahlen aus den geladenen Düften – keine erfundenen Werte.
  const catalogCount = loaded ? perfumes.length : null;
  const brandCount = loaded
    ? new Set(perfumes.map((p) => p.brands?.name).filter(Boolean)).size
    : null;

  const seasonLabel = SEASON_LABEL[currentSeason] || '';
  const seasonMatch = SEASON_MATCH[currentSeason] || [];
  const seasonGuide = SEASON_GUIDE[currentSeason];
  const seasonalPerfumes = currentSeason
    ? [...perfumes]
        .filter(p => p.season && seasonMatch.includes(p.season))
        .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0))
        .slice(0, 6)
    : [];

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
    const title = `Mein Auressa-Duftprofil: ${profileText[winner].title}`;
    const text = topPick
      ? `Mein Top-Match ist ${topPick.perfume.perfume_name}. Finde mit dem kostenlosen Auressa-Quiz deinen:`
      : 'Finde mit dem kostenlosen Auressa-Quiz deinen Signature-Duft:';
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
              <p className="lead">Auressa verbindet ein elegantes Duft-Quiz mit einer intelligenten Match-Engine: Jeder Duft wird gegen deine Antworten zu Geschlecht, Duftrichtung, Anlass, Saison, Intensität und Budget bewertet.</p>
              <div className="cta">
                <a className="button" href="#quiz">Quiz starten</a>
                <Link className="button secondary" href="/duefte">Alle Düfte ansehen</Link>
                <Link className="button secondary" href="/ratgeber">Ratgeber lesen</Link>
              </div>
              <p className="hero-trust">{catalogCount ? `${catalogCount} kuratierte Düfte` : 'Kuratierte Düfte'} – von Bestsellern bis zu besonderen Nischenperlen.</p>
            </div>
            <div className="card perfume-card">
              {/* Echtes Hero-Foto (lokal in /public). Zum Austauschen: public/hero-auressa.jpg ersetzen. */}
              <figure className="hero-media">
                <img
                  className="hero-media-img"
                  src="/hero-auressa.jpg"
                  alt="Goldener Parfum-Flakon in warmer Boutique-Atmosphäre – Auressa"
                  width={1600}
                  height={864}
                />
              </figure>
              <div className="hero-stats">
                <div className="hero-stat"><strong>{catalogCount ?? '…'}</strong><span>kuratierte Düfte</span></div>
                <div className="hero-stat"><strong>{brandCount ?? '…'}</strong><span>Marken weltweit</span></div>
                <div className="hero-stat"><strong>0–100</strong><span>echter Match-Score statt Zufall</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Schritt für Schritt</p>
          <h2>So funktioniert es</h2>
          <div className="steps-grid">
            <div className="why-card">
              <div className="why-icon">1</div>
              <h3>Quiz beantworten</h3>
              <p className="small">Ein paar Fragen zu Geschlecht, Duftrichtung, Anlass, Saison, Intensität und Budget.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">2</div>
              <h3>Match-Score berechnen</h3>
              <p className="small">Unsere Match-Engine bewertet jeden Duft gegen deine Antworten – von 0 bis 100, kein Zufall.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">3</div>
              <h3>Düfte &amp; günstige Alternativen entdecken</h3>
              <p className="small">Du bekommst deine Top-Treffer – inklusive günstigerer Alternativen zu teuren Düften.</p>
            </div>
          </div>
        </section>

        <section id="warum" className="section">
          <p className="eyebrow">Warum Auressa?</p>
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
              <Link
                key={t.code}
                className="tile tile-family"
                href={`/duefte?family=${t.code}`}
              >
                <h3>{t.label}</h3>
                <p className="small">{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Highlights</p>
          <h2>Unsere bestbewerteten Düfte</h2>
          <p className="small">Eine handverlesene Auswahl quer durch alle Duftrichtungen – sortiert nach Auressa-Score.</p>
          <div className="perfume-list">
            {highlights.map(p => (
              <PerfumeTile perfume={p} key={p.id} />
            ))}
          </div>
          <div className="cta">
            <Link className="button secondary" href="/duefte">Alle Düfte ansehen</Link>
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

              {top3.map((r, i) => {
                const p = r.perfume;
                const recLabel =
                  i === 0 ? 'Beste Empfehlung' : i === 1 ? 'Zweite Empfehlung' : 'Dritte Empfehlung';
                const meta = [familyDisplay[p.fragrance_family || ''] || 'Duftfamilie offen', p.season, p.occasion]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <div className="top-pick" key={p.id}>
                    <p className="small">{recLabel}</p>
                    {i === 0 ? (
                      <div className="match-score-big">
                        <span className="match-score-num">{revealScore}</span>
                        <span className="match-score-pct">% passend</span>
                      </div>
                    ) : (
                      <span className="match-badge">{r.score}% passend</span>
                    )}
                    <h3>{p.perfume_name} · {p.brands?.name || 'Marke offen'}</h3>
                    <p className="small">{meta}</p>
                    <p className="small">{buildQuizReason(p, answers, winner)}</p>
                    <div className="cta">
                      {p.slug && (
                        <Link className="button secondary" href={`/duft/${p.slug}`}>Duftprofil ansehen</Link>
                      )}
                      <AffiliateButton perfume={p} showNote={false} />
                    </div>
                  </div>
                );
              })}

              {Object.entries(family).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <div className="small">{profileText[key].title}: {value}</div>
                  <div className="scorebar bar-reveal"><span style={{ width: `${(value / familyQuestionCount) * 100}%` }} /></div>
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

        {showResult && topMatches.length > 0 && (
          <section id="ergebnisse" className="section">
            <p className="eyebrow">Weitere Treffer</p>
            <h2>Weitere passende Düfte{genderPref ? ` · ${genderLabels[genderPref]}` : ''}</h2>
            <p className="small">Sortiert nach Match-Score für dein Profil. Klicke einen Duft für sein volles Profil.</p>
            <div className="perfume-list">
              {topMatches.map(({ perfume: p, score }) => (
                <PerfumeTile perfume={p} matchPercent={score} key={p.id} />
              ))}
            </div>
            <div className="cta">
              <Link className="button secondary" href="/duefte">Alle Düfte durchstöbern</Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
