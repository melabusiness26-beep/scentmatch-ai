'use client';

import { useState } from 'react';
import { Perfume } from '@/lib/perfumes';
import { GIFT_FINDER_STYLES } from '@/lib/gift-finder-styles';
import { consolidateNotes, findSimilarPerfumesV2 } from '@/lib/similarity';
import GiftFinderResults from './GiftFinderResults';

type Gender = 'female' | 'male' | 'any';
type BudgetRange = 'under50' | '50to100' | 'over100';

interface QuizState {
  step: number;
  gender: Gender | null;
  budget: BudgetRange | null;
  style: string | null;
  favoriteSlug: string | null;
  results: Array<{ perfume: Perfume; explanation: string; cheaper?: Perfume }> | null;
}

export default function GiftFinder({ allPerfumes }: { allPerfumes: Perfume[] }) {
  const [state, setState] = useState<QuizState>({
    step: 1,
    gender: null,
    budget: null,
    style: null,
    favoriteSlug: null,
    results: null,
  });

  // Utility: Count style notes in perfume
  const countStyleNotes = (perfume: Perfume, styleNotes: string[]): number => {
    const allNotes = [
      ...(perfume.top_notes || []),
      ...(perfume.heart_notes || []),
      ...(perfume.base_notes || []),
    ];
    const consolidated = consolidateNotes(allNotes);
    const lowerStyleNotes = styleNotes.map((n) => n.toLowerCase());
    return consolidated.filter((note) => lowerStyleNotes.includes(note.toLowerCase())).length;
  };

  // Utility: Get style notes present in perfume
  const getStyleNotesInPerfume = (perfume: Perfume, styleNotes: string[]): string[] => {
    const allNotes = [
      ...(perfume.top_notes || []),
      ...(perfume.heart_notes || []),
      ...(perfume.base_notes || []),
    ];
    const normalizedStyleNotes = consolidateNotes(styleNotes).map((n) => n.toLowerCase());
    return allNotes
      .filter((note) => {
        const normalized = consolidateNotes([note])[0]?.toLowerCase() || '';
        return normalizedStyleNotes.includes(normalized);
      })
      .slice(0, 3);
  };

  // Get filtered pool based on gender & budget
  const getFilteredPool = (): Perfume[] => {
    return allPerfumes.filter((p) => {
      // Gender filter
      if (state.gender === 'female' && !['Women', 'Unisex'].includes(p.gender)) return false;
      if (state.gender === 'male' && !['Men', 'Unisex'].includes(p.gender)) return false;

      // Budget filter (only if budget selected)
      if (state.budget) {
        const priceStr = String(p.price_chf || '0');
        const price = parseFloat(priceStr);
        if (isNaN(price) || price === 0) return false; // No price → exclude
        if (state.budget === 'under50' && price >= 50) return false;
        if (state.budget === '50to100' && (price < 50 || price > 100)) return false;
        if (state.budget === 'over100' && price <= 100) return false;
      }

      return true;
    });
  };

  // Build explanation for a perfume based on style or favorite
  const buildExplanation = (perfume: Perfume, styleNotes?: string[]): string => {
    // Family label (German)
    const familyLabel: Record<string, string> = {
      clean: 'Frischer Duft',
      floral: 'Blumiger Duft',
      woody: 'Holziger Duft',
      gourmand: 'Warmer, süsser Duft',
    };
    const family = familyLabel[perfume.fragrance_family] || perfume.fragrance_family;

    // Build notes text (max 3 notes with "und" before last)
    let fullText = family;
    if (styleNotes && styleNotes.length > 0) {
      const notesToShow = styleNotes.slice(0, 3);
      if (notesToShow.length === 1) {
        fullText += ` mit ${notesToShow[0]}`;
      } else if (notesToShow.length === 2) {
        fullText += ` mit ${notesToShow[0]} und ${notesToShow[1]}`;
      } else {
        fullText += ` mit ${notesToShow.slice(0, -1).join(', ')} und ${notesToShow[notesToShow.length - 1]}`;
      }
    }

    // Add season text only if season exists
    if (perfume.season && perfume.season !== 'Ganzjährig') {
      const seasonWithAnd = perfume.season.replace(/\s*\/\s*/g, ' und ');
      fullText += `. Am schönsten im ${seasonWithAnd}.`;
    } else if (perfume.season === 'Ganzjährig') {
      fullText += '. Das ganze Jahr tragbar.';
    } else {
      fullText += '.';
    }

    return fullText;
  };

  const handleNext = (nextState: Partial<QuizState>) => {
    setState((prev) => ({ ...prev, ...nextState }));
  };

  const handleSubmit = () => {
    const pool = getFilteredPool();
    const selectedStyle = GIFT_FINDER_STYLES.find((s) => s.id === state.style);

    let candidates = pool;

    // If favorite is selected, filter by similarity
    if (state.favoriteSlug) {
      const favorite = allPerfumes.find((p) => p.slug === state.favoriteSlug);
      if (favorite) {
        const similarities = findSimilarPerfumesV2(favorite, pool, 100);
        candidates = similarities.map((s) => s.perfume);
      }
    }

    // Filter by style match: min 2 notes OR (1 note + family match)
    if (selectedStyle) {
      candidates = candidates.filter((p) => {
        const styleNoteCount = countStyleNotes(p, selectedStyle.notes);
        const hasFamilyBonus = selectedStyle.familyBonus?.includes(p.fragrance_family);
        return styleNoteCount >= 2 || (styleNoteCount === 1 && hasFamilyBonus);
      });
    }

    // Sort by style points (or similarity if favorite is set)
    candidates.sort((a, b) => {
      if (state.favoriteSlug) {
        return (b.scentmatch_score || 0) - (a.scentmatch_score || 0);
      }
      // Sort by style points
      const styleA = selectedStyle ? countStyleNotes(a, selectedStyle.notes) : 0;
      const styleB = selectedStyle ? countStyleNotes(b, selectedStyle.notes) : 0;
      const aFamilyBonus = selectedStyle?.familyBonus?.includes(a.fragrance_family) ? 2 : 0;
      const bFamilyBonus = selectedStyle?.familyBonus?.includes(b.fragrance_family) ? 2 : 0;
      const pointsA = styleA + aFamilyBonus;
      const pointsB = styleB + bFamilyBonus;
      if (pointsB !== pointsA) return pointsB - pointsA;
      return (b.scentmatch_score || 0) - (a.scentmatch_score || 0);
    });

    // Take top 3
    const topCandidates = candidates.slice(0, 3);

    // Add cheaper alternatives
    const results = topCandidates.map((perf) => {
      const styleNotes = selectedStyle ? getStyleNotesInPerfume(perf, selectedStyle.notes) : [];
      const targetPriceStr = String(perf.price_chf || '0');
      const targetPrice = parseFloat(targetPriceStr);
      const cheaper = pool.find(
        (p) => {
          const pPriceStr = String(p.price_chf || '0');
          const pPrice = parseFloat(pPriceStr);
          return p.id !== perf.id && pPrice <= targetPrice * 0.7 && pPrice > 0;
        }
      );
      return {
        perfume: perf,
        explanation: buildExplanation(perf, styleNotes),
        cheaper,
      };
    });

    setState((prev) => ({ ...prev, results, step: 5 }));
  };

  const goBack = () => {
    if (state.step > 1) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const reset = () => {
    setState({
      step: 1,
      gender: null,
      budget: null,
      style: null,
      favoriteSlug: null,
      results: null,
    });
  };

  if (state.results) {
    return (
      <GiftFinderResults
        results={state.results}
        onReset={reset}
        allPerfumes={allPerfumes}
      />
    );
  }

  return (
    <div className="gift-finder">
      {/* Progress bar */}
      <div className="quiz-progress">
        <div className="progress-bar" style={{ width: `${(state.step / 4) * 100}%` }} />
      </div>

      {state.step > 1 && (
        <button className="btn-back" onClick={goBack} aria-label="Zurück">
          ← Zurück
        </button>
      )}

      {state.step === 1 && (
        <div className="quiz-step">
          <h2>Für wen suchst du einen Duft?</h2>
          <p className="step-description">Das hilft uns, die richtige Auswahl zu treffen.</p>
          <div className="quiz-options">
            <button
              className={`option-btn ${state.gender === 'female' ? 'active' : ''}`}
              onClick={() => handleNext({ gender: 'female', step: 2 })}
            >
              👩 Für eine Frau
            </button>
            <button
              className={`option-btn ${state.gender === 'male' ? 'active' : ''}`}
              onClick={() => handleNext({ gender: 'male', step: 2 })}
            >
              👨 Für einen Mann
            </button>
            <button
              className={`option-btn ${state.gender === 'any' ? 'active' : ''}`}
              onClick={() => handleNext({ gender: 'any', step: 2 })}
            >
              🎭 Egal
            </button>
          </div>
        </div>
      )}

      {state.step === 2 && (
        <div className="quiz-step">
          <h2>Budget?</h2>
          <p className="step-description">Wie viel möchtest du ausgeben?</p>
          <div className="quiz-options">
            <button
              className={`option-btn ${state.budget === 'under50' ? 'active' : ''}`}
              onClick={() => handleNext({ budget: 'under50', step: 3 })}
            >
              💰 Unter CHF 50
            </button>
            <button
              className={`option-btn ${state.budget === '50to100' ? 'active' : ''}`}
              onClick={() => handleNext({ budget: '50to100', step: 3 })}
            >
              💵 CHF 50–100
            </button>
            <button
              className={`option-btn ${state.budget === 'over100' ? 'active' : ''}`}
              onClick={() => handleNext({ budget: 'over100', step: 3 })}
            >
              💎 Über CHF 100
            </button>
          </div>
        </div>
      )}

      {state.step === 3 && (
        <div className="quiz-step">
          <h2>Welcher Duft-Typ ist es?</h2>
          <p className="step-description">Wähle die Richtung, die zu dieser Person passt.</p>
          <div className="quiz-options">
            {GIFT_FINDER_STYLES.map((s) => (
              <button
                key={s.id}
                className={`option-btn ${state.style === s.id ? 'active' : ''}`}
                onClick={() => handleNext({ style: s.id, step: 4 })}
              >
                <strong>{s.label}</strong>
                <span>{s.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {state.step === 4 && (
        <div className="quiz-step">
          <h2>Lieblingsduft? (optional)</h2>
          <p className="step-description">Falls die Person einen Duft mag, wähle ihn hier – wir zeigen ähnliche Alternativen.</p>
          <div className="quiz-datalist">
            <input
              list="perfume-list"
              type="text"
              placeholder="Name eingeben (z. B. Creed Aventus)"
              onChange={(e) => {
                const found = allPerfumes.find((p) => p.perfume_name === e.target.value);
                if (found) setState((prev) => ({ ...prev, favoriteSlug: found.slug }));
              }}
            />
            <datalist id="perfume-list">
              {allPerfumes.map((p) => (
                <option key={p.id} value={p.perfume_name} />
              ))}
            </datalist>
          </div>
          <div className="quiz-options">
            <button className="option-btn active" onClick={() => handleSubmit()}>
              → Empfehlungen anzeigen
            </button>
            <button className="option-btn" onClick={() => setState((prev) => ({ ...prev, favoriteSlug: null }))}>
              ← Keine Auswahl
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
