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
  const [storyBusy, setStoryBusy] = useState(false);
  const [storyMsg, setStoryMsg] = useState('');
  const origin = (() => {
    try {
      return new URL(url).origin;
    } catch {
      return '';
    }
  })();
  const imageBase = perfume.slug ? `/api/duft-bild/${perfume.slug}` : null;

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

  // Story-Bild (9:16) erzeugen und teilen – auf dem Handy direkt ins Teilen-Menü
  // (Instagram, WhatsApp, TikTok …), sonst wird es heruntergeladen.
  async function shareStory() {
    if (!imageBase || storyBusy) return;
    setStoryBusy(true);
    try {
      const res = await fetch(`${imageBase}?format=story`);
      if (!res.ok) throw new Error('Bild fehlt');
      const blob = await res.blob();
      const fileName = `auressa-${perfume.slug}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });
      const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
      if (nav.share && nav.canShare?.({ files: [file] })) {
        try {
          await nav.share({ files: [file], title, text: `${text} ${url}` });
        } catch {
          // Abgebrochen – kein Problem.
        }
      } else {
        const href = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = href;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(href), 5000);
        setStoryMsg('Bild gespeichert – du kannst es jetzt in deiner Story posten.');
        setTimeout(() => setStoryMsg(''), 6000);
      }
    } catch {
      setStoryMsg('Das Bild konnte gerade nicht erstellt werden. Bitte nochmals versuchen.');
      setTimeout(() => setStoryMsg(''), 6000);
    } finally {
      setStoryBusy(false);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  // Pinterest bekommt ein eigenes Hochformat-Bild (2:3) – das wirkt dort viel besser.
  const pinMedia = imageBase && origin ? `&media=${encodeURIComponent(`${origin}${imageBase}?format=pin`)}` : '';
  const encodedText = encodeURIComponent(`${text} ${url}`);

  return (
    <div className="share">
      {canNativeShare ? (
        <>
          <button type="button" className="share-main" onClick={nativeShare}>
            <ShareIcon /> Duft teilen
          </button>
          <a
            className="share-pill"
            href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}${pinMedia}&description=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pinterest
          </a>
        </>
      ) : (
        <>
          <span className="share-label">Teilen:</span>
          <a className="share-pill" href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a
            className="share-pill"
            href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}${pinMedia}&description=${encodeURIComponent(text)}`}
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
      {imageBase && (
        <button type="button" className="share-pill share-story" onClick={shareStory} disabled={storyBusy}>
          {storyBusy ? 'Bild wird erstellt …' : '📸 Als Story'}
        </button>
      )}
      <button type="button" className="share-pill share-copy" onClick={copyLink} aria-live="polite">
        {copied ? '✓ Link kopiert' : 'Link kopieren'}
      </button>
      {storyMsg && (
        <p className="share-story-msg" role="status">
          {storyMsg}
        </p>
      )}
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
