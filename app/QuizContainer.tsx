'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getPerfumes,
  rankPerfumes,
  perfumeHasTheme,
  NOTE_THEMES,
  getScoreBreakdown,
  concentrationLabel,
  type Perfume,
  type QuizAnswers,
  type RankedPerfume,
  type ScoreBreakdown
} from '@/lib/perfumes';
import { quizQuestions as newQuizQuestions, type QuizQuestion, type QuestionKind } from '@/lib/quizQuestions';
import { PerfumeTile, familyDisplay, PerfumeCover } from '@/app/PerfumeTile';
import { AffiliateButton } from '@/app/AffiliateButton';

const fallbackQuestions: QuizQuestion[] = newQuizQuestions;
const FAMILY_ORDER = ['clean', 'gourmand', 'woody', 'floral'] as const;

const profileText: Record<string, { title: string; text: string }> = {
  clean: { title: 'Frisch & Klar', text: 'Du liebst frische, saubere Düfte. Deine Signatur wirkt gepflegt, leicht und modern.' },
  gourmand: { title: 'Warm & Sinnlich', text: 'Du passt zu warmen, weichen und leicht süssen Düften. Deine Duftsignatur wirkt gemütlich und sinnlich.' },
  woody: { title: 'Holzig & Elegant', text: 'Du magst elegante, holzige und würzige Düfte. Deine Signatur wirkt hochwertig und selbstbewusst.' },
  floral: { title: 'Blumig & Romantisch', text: 'Du passt zu blumigen, fruchtigen und zarten Düften. Deine Signatur wirkt charmant und weich.' }
};

const genderLabels: Record<string, string> = { women: 'Damen', men: 'Herren', unisex: 'Unisex' };
const emptyFamily = { clean: 0, gourmand: 0, woody: 0, floral: 0 };

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
  longevityPref: QuizAnswers['longevity'];
  sweetnessPref: QuizAnswers['sweetness'];
  pricePref: QuizAnswers['pricePref'];
};

function getQuestionCount(questions: QuizQuestion[]): number {
  return questions.length;
}

function getFamilyQuestionCount(questions: QuizQuestion[]): number {
  return questions.filter(q => q.kind === 'family').length;
}

export default function QuizContainer() {
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
  const [longevityPref, setLongevityPref] = useState<QuizAnswers['longevity']>('');
  const [sweetnessPref, setSweetnessPref] = useState<QuizAnswers['sweetness']>('');
  const [pricePref, setPricePref] = useState<QuizAnswers['pricePref']>('');
  const [history, setHistory] = useState<QuizSnapshot[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [shareMsg, setShareMsg] = useState('');
  const [revealScore, setRevealScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>(fallbackQuestions);

  useEffect(() => {
    async function loadData() {
      const perfumeData = await getPerfumes(2000);
      if (perfumeData.length > 0) setPerfumes(perfumeData);
      setLoaded(true);
    }
    loadData();

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
      setLongevityPref((sp.get('lo') || '') as QuizAnswers['longevity']);
      setSweetnessPref((sp.get('sw') || '') as QuizAnswers['sweetness']);
      setPricePref((sp.get('pp') || '') as QuizAnswers['pricePref']);
      setStep(questions.length - 1);
      setShowResult(true);
    }
  }, []);

  const answers: QuizAnswers = { gender: genderPref, family, occasion, season, sillage, budgetMax, lovedNote, dislikedNote, anchorId, longevity: longevityPref, sweetness: sweetnessPref, pricePref };
  const winner = Object.entries(family).sort((a, b) => b[1] - a[1])[0]?.[0] || 'clean';

  const ranked: RankedPerfume[] = showResult ? rankPerfumes(perfumes, answers) : [];
  const topPick = showResult ? ranked[0] : undefined;
  const top3 = ranked.slice(0, 3);

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
      const eased = 1 - Math.pow(1 - t, 3);
      setRevealScore(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showResult, topPick?.perfume.id, topPick?.score]);

  function pushHistory() {
    setHistory(h => [
      ...h,
      { step, family: { ...family }, genderPref, occasion, season, sillage, budgetMax, lovedNote, dislikedNote, anchorId, longevityPref, sweetnessPref, pricePref }
    ]);
  }

  function answer(kind: QuestionKind, code: string) {
    pushHistory();
    if (kind === 'gender') setGenderPref(code as QuizAnswers['gender']);
    else if (kind === 'family') setFamily(prev => ({ ...prev, [code]: (prev[code] || 0) + 1 }));
    else if (kind === 'occasion') setOccasion(code as QuizAnswers['occasion']);
    else if (kind === 'season') setSeason(code as QuizAnswers['season']);
    else if (kind === 'sillage') setSillage(code as QuizAnswers['sillage']);
    else if (kind === 'budget') {
      setBudgetMax(code === '80' ? 80 : code === '150' ? 150 : null);
      // „Premium (über CHF 150)": kein Budget-Limit, aber hochwertigere Düfte bekommen einen Bonus.
      setPricePref(code === 'premium' ? 'original' : '');
    }
    else if (kind === 'lovedNote') setLovedNote(code);
    else if (kind === 'dislikedNote') setDislikedNote(code);
    else if (kind === 'longevity') setLongevityPref(code as QuizAnswers['longevity']);

    advanceStep();
  }

  function advanceAnchor() {
    pushHistory();
    advanceStep();
  }

  function skipQuestion() {
    pushHistory();
    advanceStep();
  }

  function advanceStep() {
    if (step + 1 >= questions.length) setShowResult(true);
    else setStep(step + 1);
  }

  function isOptionalQuestion(): boolean {
    return questions[step]?.kind === 'anchor' ||
           questions[step]?.a.some(a => a[1] === '');
  }

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
    setLongevityPref(prev.longevityPref);
    setSweetnessPref(prev.sweetnessPref);
    setPricePref(prev.pricePref);
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
    setLongevityPref('');
    setSweetnessPref('');
    setPricePref('');
    setHistory([]);
    setShowResult(false);
    setShareMsg('');
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }

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
    if (longevityPref) p.set('lo', longevityPref);
    if (sweetnessPref) p.set('sw', sweetnessPref);
    if (pricePref) p.set('pp', pricePref);
    return `${window.location.origin}/quiz?${p.toString()}`;
  }

  async function shareResult() {
    const url = buildShareUrl();
    const title = `Mein Auressa-Duftprofil: ${profileText[winner].title}`;
    const text = topPick
      ? `Mein Top-Match ist ${topPick.perfume.perfume_name}. Finde mit dem Auressa-Quiz deinen:`
      : 'Finde mit dem Auressa-Quiz deinen Signature-Duft:';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // ignored
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
    <div className="container">
      <section className="section card quiz">
        <p className="eyebrow">Duft-Quiz</p>
        {!showResult ? (
          <>
            <p className="small">Frage {step + 1} von {questions.length}</p>
            <div className="scorebar quiz-progress"><span style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
            <div className="quiz-step" key={step}>
              <div className="question">{questions[step].q}</div>
              {questions[step].hint && <p className="small quiz-hint">{questions[step].hint}</p>}
              {questions[step].kind === 'anchor' ? (
                <div className="answers">
                  <select className="search" value={anchorId} onChange={e => setAnchorId(e.target.value)}>
                    <option value="">– Duft auswählen –</option>
                    {[...perfumes]
                      .sort((a, b) =>
                        (a.perfume_name || '').localeCompare(b.perfume_name || '', 'de', { sensitivity: 'base' })
                      )
                      .map((p, _i, all) => {
                        // Gleicher Name + Marke mehrfach (z. B. EdT und EdP) → Konzentration anzeigen.
                        const twin = all.some(o => o.id !== p.id && o.perfume_name === p.perfume_name && o.brands?.name === p.brands?.name);
                        return (
                          <option value={p.id} key={p.id}>
                            {p.perfume_name}{twin && concentrationLabel(p.concentration) ? ` (${concentrationLabel(p.concentration)})` : ''}{p.brands?.name ? ` · ${p.brands.name}` : ''}
                          </option>
                        );
                      })}
                  </select>
                  <p className="small">Optional – du kannst diese Frage auch einfach überspringen.</p>
                  <button className="answer" onClick={advanceAnchor}>{anchorId ? 'Weiter' : 'Überspringen'}</button>
                </div>
              ) : questions[step].kind === 'family' ? (
                <div className="family-picker">
                  {questions[step].a.map(([label, code, emoji]) => (
                    <button
                      key={code}
                      className="family-card"
                      onClick={() => answer(questions[step].kind, code)}
                      data-family={code}
                    >
                      {emoji && <span className="family-emoji">{emoji}</span>}
                      <span className="family-label">{label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="answers">
                  {questions[step].a.map(([label, code, emoji]) => (
                    <button
                      className="answer"
                      key={label}
                      onClick={() => answer(questions[step].kind, code)}
                    >
                      {emoji && <span className="answer-emoji">{emoji}</span>}
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="quiz-controls">
              {history.length > 0 && (
                <button className="quiz-back" onClick={goBack}>← Zurück</button>
              )}
              {isOptionalQuestion() && questions[step]?.kind !== 'anchor' && (
                <button className="quiz-skip" onClick={skipQuestion}>⊘ Überspringen</button>
              )}
            </div>
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
              const breakdown = getScoreBreakdown(p, answers);

              // Finde günstige Alternative (für Top-1 nur)
              let cheaperAlt: Perfume | undefined;
              if (i === 0 && p.price_chf && ranked.length > 1) {
                cheaperAlt = ranked.slice(1).find(alt =>
                  alt.perfume.price_chf &&
                  alt.perfume.price_chf < p.price_chf * 0.8 &&
                  alt.perfume.fragrance_family === p.fragrance_family
                )?.perfume;
              }

              return (
                <div className={`top-pick ${i === 0 ? 'top-pick-winner' : ''}`} key={p.id}>
                  <p className="small">{recLabel}</p>

                  {i === 0 && (
                    <div className="top-pick-cover">
                      <PerfumeCover perfume={p} large={true} />
                    </div>
                  )}

                  {i === 0 ? (
                    <div className="match-score-big">
                      <span className="match-score-num">{revealScore}</span>
                      <span className="match-score-pct">% Match</span>
                    </div>
                  ) : (
                    <span className="match-badge">{r.score}% Match</span>
                  )}
                  <h3>{p.perfume_name}{p.brands?.name ? ` · ${p.brands.name}` : ''}</h3>
                  <p className="small">{meta}</p>
                  {p.price_chf && <p className="top-pick-price">CHF {p.price_chf.toFixed(0)}</p>}
                  {/* Why this perfume */}
                  <div className="why-section">
                    <p className="small"><strong>Warum dieser Duft:</strong></p>
                    <ul className="why-list">
                      {(() => {
                        const reasons: string[] = [];
                        const topFamilyKey = Object.keys(family).sort((a, b) => family[b as keyof typeof family] - family[a as keyof typeof family])[0];
                        const familyName = profileText[topFamilyKey as keyof typeof profileText]?.title || 'deine Wahl';
                        if (breakdown.family > 0) reasons.push(`Passt zu deinem Duftprofil „${familyName}“`);
                        // Nur echte Volltreffer als Begründung nennen (keine Teil- oder Neutralpunkte).
                        if (answers.lovedNote && breakdown.lovedNote >= 20) reasons.push('Deine Lieblingsnote ist enthalten');
                        if (answers.budgetMax && breakdown.budget >= 15) reasons.push(`Im Budget bis CHF ${answers.budgetMax}`);
                        const occasionLabel: Record<string, string> = { daily: 'den Alltag & das Büro', date: 'Dates', evening: 'den Abend & zum Ausgehen' };
                        if (answers.occasion && occasionLabel[answers.occasion] && breakdown.occasion >= 13) reasons.push(`Passt für ${occasionLabel[answers.occasion]}`);
                        const seasonLabel: Record<string, string> = { 'Frühling': 'den Frühling', Sommer: 'den Sommer', 'Herbst/Winter': 'Herbst & Winter', 'Ganzjährig': 'das ganze Jahr' };
                        if (answers.season && seasonLabel[answers.season] && breakdown.season >= 10) reasons.push(`Passt für ${seasonLabel[answers.season]}`);
                        return reasons.map((reason, idx) => <li key={idx}>{reason}</li>);
                      })()}
                    </ul>
                  </div>

                  {/* Score Breakdown */}
                  {/* Punkte nur auf Wunsch – die Ergebnisseite bleibt so übersichtlich. */}
                  <details className="score-breakdown">
                    <summary className="small"><strong>Wie wurde gerechnet?</strong></summary>
                    <div className="breakdown-list">
                      {breakdown.family > 0 && (
                        <div className="breakdown-factor family">
                          <div className="factor-header">
                            <span className="factor-icon">👃</span>
                            <span className="factor-label">Duftfamilie</span>
                            <span className="factor-points">{Math.round(breakdown.family)}/30</span>
                          </div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(breakdown.family / 30) * 100}%` }} /></div>
                        </div>
                      )}
                      {breakdown.lovedNote > 0 && (
                        <div className="breakdown-factor lovedNote">
                          <div className="factor-header">
                            <span className="factor-icon">🎵</span>
                            <span className="factor-label">Lieblingsnote</span>
                            <span className="factor-points">{Math.round(breakdown.lovedNote)}/20</span>
                          </div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(breakdown.lovedNote / 20) * 100}%` }} /></div>
                        </div>
                      )}
                      {breakdown.budget > 0 && (
                        <div className="breakdown-factor budget">
                          <div className="factor-header">
                            <span className="factor-icon">💰</span>
                            <span className="factor-label">Budget</span>
                            <span className="factor-points">{Math.round(breakdown.budget)}/15</span>
                          </div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(breakdown.budget / 15) * 100}%` }} /></div>
                        </div>
                      )}
                      {breakdown.occasion > 0 && (
                        <div className="breakdown-factor occasion">
                          <div className="factor-header">
                            <span className="factor-icon">🎭</span>
                            <span className="factor-label">Anlass</span>
                            <span className="factor-points">{Math.round(breakdown.occasion)}/13</span>
                          </div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(breakdown.occasion / 13) * 100}%` }} /></div>
                        </div>
                      )}
                      {breakdown.season > 0 && (
                        <div className="breakdown-factor season">
                          <div className="factor-header">
                            <span className="factor-icon">🌍</span>
                            <span className="factor-label">Saison</span>
                            <span className="factor-points">{Math.round(breakdown.season)}/12</span>
                          </div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(breakdown.season / 12) * 100}%` }} /></div>
                        </div>
                      )}
                      {breakdown.sillage > 0 && (
                        <div className="breakdown-factor sillage">
                          <div className="factor-header">
                            <span className="factor-icon">✨</span>
                            <span className="factor-label">Intensität</span>
                            <span className="factor-points">{Math.round(breakdown.sillage)}/10</span>
                          </div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(breakdown.sillage / 10) * 100}%` }} /></div>
                        </div>
                      )}
                      {breakdown.longevity > 0 && (
                        <div className="breakdown-factor longevity">
                          <div className="factor-header">
                            <span className="factor-icon">⏱️</span>
                            <span className="factor-label">Haltbarkeit</span>
                            <span className="factor-points">{Math.round(breakdown.longevity)}/8</span>
                          </div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(breakdown.longevity / 8) * 100}%` }} /></div>
                        </div>
                      )}
                    </div>
                  </details>

                  <div className={`cta ${i === 0 ? 'cta-winner' : ''}`}>
                    {p.slug && (
                      <Link className={i === 0 ? 'button' : 'button secondary'} href={`/duft/${p.slug}`}>Duftprofil ansehen</Link>
                    )}
                    <AffiliateButton perfume={p} showNote={false} />
                  </div>

                  {cheaperAlt && (
                    <div className="cheaper-alternative">
                      <p className="small"><strong>💡 Günstigere Alternative:</strong></p>
                      <p className="smaller"><strong>{cheaperAlt.perfume_name}</strong> · {cheaperAlt.brands?.name}</p>
                      <p className="smaller" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>CHF {cheaperAlt.price_chf?.toFixed(0)} (statt CHF {p.price_chf?.toFixed(0)})</p>
                      {cheaperAlt.slug && (
                        <Link className="button-mini" href={`/duft/${cheaperAlt.slug}`}>Jetzt ansehen →</Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {top3.length === 0 && (
              <div className="top-pick">
                <p className="lead">
                  Für diese Kombination haben wir gerade keinen passenden Treffer gefunden.
                  Versuch es mit etwas offeneren Angaben – oder{' '}
                  <Link href="/duefte">stöber im ganzen Duftkatalog</Link>.
                </p>
              </div>
            )}

            <p className="small" style={{ marginTop: 16 }}>Dein Duftprofil-Mix, so oft hast du welche Richtung gewählt:</p>
            {Object.entries(family).map(([key, value]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <div className="small">{profileText[key].title}: {value}</div>
                <div className="scorebar bar-reveal"><span style={{ width: `${Math.min(100, (value / getFamilyQuestionCount(questions)) * 100)}%` }} /></div>
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

            {/* Newsletter steht im Footer jeder Seite – hier keine zweite Kopie. */}
          </div>
        )}
      </section>
    </div>
  );
}
