'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question1Location({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string; description: string }> = [
    { value: 'person', label: 'Bei einer Person', description: 'Jemand trug ihn' },
    { value: 'store', label: 'In einer Parfümerie oder Laden', description: 'Beim Einkaufen entdeckt' },
    { value: 'holiday', label: 'Im Urlaub im Ausland', description: 'Während einer Reise' },
    { value: 'hotel', label: 'In einem Hotel oder Restaurant', description: 'Beim Besuch gerochen' },
    { value: 'online', label: 'Online entdeckt', description: 'Im Internet oder Social Media' },
    { value: 'unknown', label: 'Ich weiss es nicht', description: 'Diese Info wird übersprungen' },
  ];

  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: '#2a1d12',
        marginBottom: '2.5rem',
        lineHeight: 1.3,
      }}>
        Wo hast du diesen Duft zum ersten Mal gerochen?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => handleAnswer('location', option.value)}
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: index === options.length - 1 ? '12px' : '16px',
              border: answers.location === option.value
                ? '2px solid #b08b4f'
                : index === options.length - 1
                  ? '2px dashed #d4c4b8'
                  : '1px solid #e8dcc8',
              backgroundColor: answers.location === option.value
                ? 'rgba(176, 139, 79, 0.12)'
                : index === options.length - 1
                  ? 'rgba(232, 220, 200, 0.04)'
                  : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (answers.location !== option.value) {
                e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(176, 139, 79, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.location !== option.value) {
                e.currentTarget.style.backgroundColor = index === options.length - 1 ? 'rgba(232, 220, 200, 0.04)' : '#ffffff';
                e.currentTarget.style.borderColor = index === options.length - 1 ? '#d4c4b8' : '#e8dcc8';
              }
            }}
          >
            <div style={{ fontWeight: 600, color: '#2a1d12', marginBottom: '0.5rem', fontSize: '16px' }}>
              {option.label}
            </div>
            <div style={{ fontSize: '13px', color: '#6b5a4e', lineHeight: 1.4 }}>
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
