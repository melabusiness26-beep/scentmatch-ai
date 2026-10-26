'use client';

import { useEffect, useState } from 'react';
import { Perfume } from '@/lib/perfumes';

interface SocialShareButtonsProps {
  perfume: Perfume;
  url: string;
}

// Teilen: Auf dem Handy öffnet ein Knopf das eingebaute Teilen-Menü des
// Telefons (dort erscheinen WhatsApp, Instagram, Nachrichten usw. von selbst).
// Wo das nicht geht (meist am Computer), gibt es beschriftete Knöpfe.
export function SocialShareButtons({ perfume, url }: SocialShareButtonsProps) {
  const title = `${perfume.perfume_name}${perfume.brands?.name ? ` von ${perfume.brands.name}` : ''}`;
  const text = `Schau dir „${title}" auf Auressa an:`;
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  async function nativeShare() {
    try {
      await navigator.share({ title, text, url });
    } catch {
      // Abgebrochen – nichts zu tun.
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Link kopieren:', url);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${text} ${url}`);

  return (
    <div className="share">
      {canNativeShare ? (
        <button type="button" className="share-main" onClick={nativeShare}>
          <ShareIcon /> Duft teilen
        </button>
      ) : (
        <>
          <span className="share-label">Teilen:</span>
          <a className="share-pill" href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a
            className="share-pill"
            href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pinterest
          </a>
          <a className="share-pill" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </>
      )}
      <button type="button" className="share-pill share-copy" onClick={copyLink} aria-live="polite">
        {copied ? '✓ Link kopiert' : 'Link kopieren'}
      </button>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v13" />
    </svg>
  );
}
