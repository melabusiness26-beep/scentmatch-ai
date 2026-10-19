'use client';

import React, { useEffect, useState, ReactElement } from 'react';
import { QuizState } from '@/lib/quiz-types';
import type { MatchScore } from '@/lib/match-engine';

interface QuizResultsProps {
  quizState: QuizState;
  onReset: () => void;
}

export default function QuizResults({
  quizState,
  onReset,
}: QuizResultsProps): ReactElement {
  const [matches, setMatches] = useState<MatchScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/quiz/matches', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quizState),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }

        const data = (await response.json()) as MatchScore[];
        setMatches(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unknown error occurred'
        );
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [quizState]);

  return (
    <div className="quiz-results">
      <h2>Deine Top-Matches 🎉</h2>

      <div className="results-summary">
        <p>
          Basierend auf deine Antworten haben wir die perfekten
          Düfte für dich gefunden.
        </p>
      </div>

      <div className="results-grid">
        {loading && (
          <div className="placeholder">
            <p>⏳ Berechne deine Matches...</p>
          </div>
        )}

        {error && (
          <div className="placeholder error">
            <p>⚠️ Fehler beim Laden:</p>
            <p className="small">{error}</p>
          </div>
        )}

        {!loading && matches.length > 0 && (
          <div className="matches-list">
            {matches.slice(0, 10).map((match, idx) => (
              <div
                key={match.perfumeId}
                className="match-item"
              >
                <div className="match-rank">#{idx + 1}</div>
                <div className="match-info">
                  <h3>{match.perfumeName}</h3>
                  <p className="match-score">
                    Score: {Math.round(match.totalScore)}/100
                  </p>
                </div>
                <button className="button button-primary small">
                  Ansehen
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && matches.length === 0 && !error && (
          <div className="placeholder">
            <p>
              😢 Keine Matches gefunden.
            </p>
            <p className="small">
              Versuche, deine Kriterien anzupassen.
            </p>
          </div>
        )}
      </div>

      <button
        className="button button-secondary"
        onClick={onReset}
      >
        Nochmal Quiz machen
      </button>
    </div>
  );
}
