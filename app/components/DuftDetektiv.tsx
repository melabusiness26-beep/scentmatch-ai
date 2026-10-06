'use client';

import { useState, useEffect } from 'react';
import { Perfume } from '@/lib/perfumes';
import { DetektivAnswers, storage } from '@/lib/duft-detektiv-storage';
import { matchPerfumesDetektiv } from '@/lib/duft-detektiv-matcher';
import Question1Location from './duft-detektiv-questions/Question1Location';
import Question2Country from './duft-detektiv-questions/Question2Country';
import Question3Gender from './duft-detektiv-questions/Question3Gender';
import Question4Age from './duft-detektiv-questions/Question4Age';
import Question5Timing from './duft-detektiv-questions/Question5Timing';
import Question6Feeling from './duft-detektiv-questions/Question6Feeling';
import Question7Strength from './duft-detektiv-questions/Question7Strength';
import Question8Occasion from './duft-detektiv-questions/Question8Occasion';
import Question9Price from './duft-detektiv-questions/Question9Price';
import Question10Brand from './duft-detektiv-questions/Question10Brand';
import Question11Bottle from './duft-detektiv-questions/Question11Bottle';
import Question12Description from './duft-detektiv-questions/Question12Description';
import LoadingAnimation from './LoadingAnimation';
import ResultsView from './ResultsView';
import SaveShareButtons from './SaveShareButtons';

interface DuftDetektivProps {
  allPerfumes: Perfume[];
}

export default function DuftDetektiv({ allPerfumes }: DuftDetektivProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const [answers, setAnswers] = useState<DetektivAnswers>({
    location: 'unknown',
    country: '',
    gender: 'unknown',
    age: 'unknown',
    timing: 'unknown',
    feeling: 'fresh',
    strength: 'unknown',
    occasion: 'unknown',
    price: 'unknown',
    brand: '',
    bottle: '',
    description: '',
  });

  const totalQuestions = 12;
  const progress = (currentQuestion / totalQuestions) * 100;

  const handleAnswer = (key: keyof DetektivAnswers, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setLoading(true);

    setTimeout(() => {
      const matches = matchPerfumesDetektiv(answers, allPerfumes);
      const resultIds = matches.map(m => m.perfume.id);
      storage.saveSearch(answers, resultIds);
      setResults(matches);
      setShowResults(true);
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({
      location: 'unknown',
      country: '',
      gender: 'unknown',
      age: 'unknown',
      timing: 'unknown',
      feeling: 'fresh',
      strength: 'unknown',
      occasion: 'unknown',
      price: 'unknown',
      brand: '',
      bottle: '',
      description: '',
    });
    setShowResults(false);
    setResults([]);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (showResults) {
    return (
      <div>
        <ResultsView results={results} />
        <SaveShareButtons answers={answers} resultIds={results.map(r => r.perfume.id)} />
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            onClick={handleReset}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: '1px solid #e8dcc8',
              backgroundColor: 'transparent',
              color: '#2a1d12',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Neue Suche
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          height: '4px',
          backgroundColor: '#e8dcc8',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#b08b4f',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }} />
        </div>
        <p style={{
          fontSize: '12px',
          color: '#6b5a4e',
          marginTop: '0.5rem',
          textAlign: 'center',
        }}>
          Frage {currentQuestion + 1} von {totalQuestions}
        </p>
      </div>

      {/* Questions */}
      {currentQuestion === 0 && <Question1Location answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 1 && <Question2Country answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 2 && <Question3Gender answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 3 && <Question4Age answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 4 && <Question5Timing answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 5 && <Question6Feeling answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 6 && <Question7Strength answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 7 && <Question8Occasion answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 8 && <Question9Price answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 9 && <Question10Brand answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 10 && <Question11Bottle answers={answers} handleAnswer={handleAnswer} />}
      {currentQuestion === 11 && <Question12Description answers={answers} handleAnswer={handleAnswer} />}

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
        justifyContent: 'space-between',
      }}>
        <button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: '1px solid #e8dcc8',
            backgroundColor: currentQuestion === 0 ? 'rgba(232, 220, 200, 0.3)' : 'transparent',
            color: currentQuestion === 0 ? '#b08b4f99' : '#2a1d12',
            fontSize: '14px',
            fontWeight: 600,
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (currentQuestion > 0) {
              e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentQuestion > 0) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          Zurück
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#b08b4f',
            color: '#1a1410',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c99a5b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#b08b4f';
          }}
        >
          {currentQuestion === totalQuestions - 1 ? 'Ergebnis zeigen' : 'Weiter'}
        </button>
      </div>
    </div>
  );
}
