'use client';

import React, { ReactElement } from 'react';
import { QuizState } from '@/lib/quiz-types';

interface QuizResultsProps {
  quizState: QuizState;
  onReset: () => void;
}

export default function QuizResults({
  quizState,
  onReset,
}: QuizResultsProps): ReactElement {
  return (
    <div className="quiz-results">
      <h2>Deine Top-Matches 🎉</h2>

      <div className="results-summary">
        <p>
          Basierend auf deine Antworten haben wir die perfekten Düfte für
          dich gefunden.
        </p>
      </div>

      <div className="results-grid">
        <div className="placeholder">
          <p>
            Hier werden deine Top 10 Duft-Matches angezeigt.
          </p>
          <p className="small">
            (Integration mit Match Engine in Phase 2.2)
          </p>
        </div>
      </div>

      <button
        className="button button-primary"
        onClick={onReset}
      >
        Nochmal Quiz machen
      </button>
    </div>
  );
}
