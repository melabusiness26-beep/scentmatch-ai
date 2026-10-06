'use client';

import { useState } from 'react';
import { DetektivAnswers, storage } from '@/lib/duft-detektiv-storage';

interface SaveShareButtonsProps {
  answers: DetektivAnswers;
  resultIds: string[];
}

export default function SaveShareButtons({ answers, resultIds }: SaveShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const shareUrl = storage.generateShareUrl(answers);
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: 'rgba(176, 139, 79, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(176, 139, 79, 0.2)',
    }}>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: '#2a1d12',
        margin: '0 0 0.5rem 0',
      }}>
        Weitere Optionen
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <a
          href="/meine-duefte"
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#b08b4f',
            color: '#1a1410',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c99a5b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#b08b4f';
          }}
        >
          Meine gesammelten Düfte ansehen
        </a>

        <button
          onClick={handleShare}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid #b08b4f',
            backgroundColor: 'transparent',
            color: '#b08b4f',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(176, 139, 79, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {copied ? '✓ Link kopiert!' : 'Suche teilen'}
        </button>
      </div>

      <p style={{
        fontSize: '12px',
        color: '#6b5a4e',
        margin: '0.5rem 0 0 0',
      }}>
        Speichert oder teile deine Suchergebnisse mit Freunden.
      </p>
    </div>
  );
}
