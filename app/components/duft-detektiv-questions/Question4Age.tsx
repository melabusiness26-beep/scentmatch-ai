'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question4Age({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string; description: string }> = [
    { value: 'under25', label: 'Unter 20 – jung und trendy', description: 'Frisch, verspielt, modern' },
    { value: 'age_20_35', label: '20–35 – modern und aktiv', description: 'Ausgewogen, energisch, cool' },
    { value: 'age_35_50', label: '35–50 – reif und elegant', description: 'Kultiviert, selbstsicher, klassisch' },
    { value: 'over50', label: 'Über 50 – klassisch und zeitlos', description: 'Elegant, raffiniert, bewährt' },
    { value: 'unknown', label: 'Ich weiss es nicht', description: 'Diese Info wird übersprungen' },
  ];

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{
        fontSize: '20px',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: '#2a1d12',
        marginBottom: '1.5rem',
      }}>
        Wie alt ist die Person ungefähr?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleAnswer('age', option.value)}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: answers.age === option.value ? '2px solid #b08b4f' : '1px solid #e8dcc8',
              backgroundColor: answers.age === option.value ? 'rgba(176, 139, 79, 0.08)' : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (answers.age !== option.value) {
                e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.age !== option.value) {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
            }}
          >
            <div style={{ fontWeight: 600, color: '#2a1d12', marginBottom: '0.25rem' }}>
              {option.label}
            </div>
            <div style={{ fontSize: '12px', color: '#6b5a4e' }}>
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
