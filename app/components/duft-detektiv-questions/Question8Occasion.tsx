'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question8Occasion({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string; description: string }> = [
    { value: 'daily', label: 'Alltag – frisch und unkompliziert', description: 'Täglich tragbar, zuverlässig' },
    { value: 'office', label: 'Büro – professionell und dezent', description: 'Im Job angemessen' },
    { value: 'evening', label: 'Abend – verführerisch und stark', description: 'Ausgehen, Dinner, Party' },
    { value: 'special', label: 'Besonderer Anlass – unvergesslich', description: 'Hochzeitsgast, Festlich' },
    { value: 'unknown', label: 'Ich weiss es nicht', description: 'Diese Info wird übersprungen' },
  ];

  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: '#2a1d12',
        marginBottom: '2.5rem', lineHeight: 1.3,
      }}>
        Zu welcher Gelegenheit wurde er getragen?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleAnswer('occasion', option.value)}
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              border: answers.occasion === option.value ? '2px solid #b08b4f' : '1px solid #e8dcc8',
              backgroundColor: answers.occasion === option.value ? 'rgba(176, 139, 79, 0.08)' : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (answers.occasion !== option.value) {
                e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.occasion !== option.value) {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
            }}
          >
            <div style={{ fontWeight: 600, color: '#2a1d12', marginBottom: '0.25rem' }}>
              {option.label}
            </div>
            <div style={{ fontSize: '13px', color: '#6b5a4e' }}>
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
