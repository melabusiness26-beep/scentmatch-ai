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
import NewsletterForm from '@/app/NewsletterForm';

interface DuftDetektivProps {
  allPerfumes: Perfume[];
}

export default function DuftDetektiv({ allPerfumes }: DuftDetektivProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const [answers, setAnswers] = useState<DetektivAnswers>({
    location: null,
    country: '',
    gender: null,
    age: null,
    timing: null,
    feeling: null,
    strength: null,
    occasion: null,
    price: null,
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
      resultIds.forEach(id => storage.addPerfume(id));
      setResults(matches);
      setShowResults(true);
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({
      location: null,
      country: '',
      gender: null,
      age: null,
      timing: null,
      feeling: null,
      strength: null,
      occasion: null,
      price: null,
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
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e8dcc8' }}>
          <NewsletterForm source="detektiv" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Thin Progress Bar at Top */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '2px',
        backgroundColor: 'rgba(232, 220, 200, 0.3)',
        overflow: 'hidden',
        marginBottom: '0',
      }}>
        <div
          style={{
            display: 'block',
            height: '100%',
            backgroundColor: '#b08b4f',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }} />
      </div>

      {/* Hero Section - only show on question 0 */}
      {currentQuestion === 0 && (
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          marginTop: '2rem',
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 7vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.1,
            color: '#2a1d12',
          }}>
            Duft-Detektiv
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 3vw, 18px)',
            color: '#6b5a4e',
            margin: '0 auto 2rem auto',
            maxWidth: '500px',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}>
            Beschreib mir den Duft – ich finde ihn für dich.
          </p>
        </div>
      )}

      {/* Progress Text */}
      <p style={{
        fontSize: '12px',
        color: '#6b5a4e',
        marginBottom: '2.5rem',
        textAlign: 'center',
        fontWeight: 500,
      }}>
        Frage {currentQuestion + 1} von {totalQuestions}
      </p>

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
        gap: '1.5rem',
        marginTop: '3rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          style={{
            padding: '0',
            borderRadius: '0',
            border: 'none',
            backgroundColor: 'transparent',
            color: currentQuestion === 0 ? '#b08b4f66' : '#2a1d12',
            fontSize: '13px',
            fontWeight: 500,
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            opacity: currentQuestion === 0 ? 0.4 : 1,
          }}
          onMouseEnter={(e) => {
            if (currentQuestion > 0) {
              e.currentTarget.style.opacity = '0.7';
            }
          }}
          onMouseLeave={(e) => {
            if (currentQuestion > 0) {
              e.currentTarget.style.opacity = '1';
            }
          }}
        >
          ← Zurück
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: currentQuestion === totalQuestions - 1 ? '16px 48px' : '14px 40px',
            borderRadius: '16px',
            border: 'none',
            backgroundColor: '#b08b4f',
            color: '#1a1410',
            fontSize: currentQuestion === totalQuestions - 1 ? '15px' : '14px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 12px rgba(176, 139, 79, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#d4a566';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(176, 139, 79, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#b08b4f';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(176, 139, 79, 0.2)';
          }}
        >
          {currentQuestion === totalQuestions - 1 ? 'Ergebnis zeigen' : 'Weiter →'}
        </button>
      </div>
    </div>
  );
}
