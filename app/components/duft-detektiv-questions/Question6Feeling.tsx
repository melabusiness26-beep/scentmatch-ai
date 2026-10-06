'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question6Feeling({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string; description: string }> = [
    { value: 'fresh', label: 'Frisch', description: 'Zitrus, Meer, Grün' },
    { value: 'warm', label: 'Warm', description: 'Vanille, Schokolade, Karamel' },
    { value: 'woody', label: 'Holzig', description: 'Sandelholz, Zeder, Vetiver' },
    { value: 'floral', label: 'Blumig', description: 'Rose, Jasmin, Pfingstrose' },
    { value: 'oriental', label: 'Orientalisch', description: 'Oud, Amber, Moschus' },
    { value: 'spicy', label: 'Würzig', description: 'Pfeffer, Ingwer, Zimt' },
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
        Welches Gefühl vermittelt dieser Duft?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleAnswer('feeling', option.value)}
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              border: answers.feeling === option.value ? '2px solid #b08b4f' : '1px solid #e8dcc8',
              backgroundColor: answers.feeling === option.value ? 'rgba(176, 139, 79, 0.08)' : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (answers.feeling !== option.value) {
                e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.feeling !== option.value) {
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
