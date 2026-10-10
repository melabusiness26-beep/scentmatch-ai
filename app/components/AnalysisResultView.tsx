'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';
import ScanCorrectionBanner from './ScanCorrectionBanner';

interface AnalysisResultViewProps {
  analysis: ImageAnalysisResult['data'];
  similarPerfumes: Perfume[];
  onNewSearch: () => void;
  dbMatch?: Perfume | null;
  uploadedImage?: string | null;
}

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = {
  dark: '#2a1d12',
  gold: '#d4af37',
  goldLight: '#e8c84a',
  goldMuted: '#b08b4f',
  cream: '#f9f6f1',
  creamDark: '#f0ebe1',
  sand: '#e8dcc8',
  text: '#3d2e22',
  textMuted: '#7a6a5e',
  textLight: '#9a8a7e',
  journeyBg: '#fdf7e8',
  heroBg: '#1a1108',
} as const;

type TabId = 'profil' | 'noten' | 'analyse' | 'kaufen';

const TAB_CONFIG: { id: TabId; label: string; icon: string }[] = [
  { id: 'profil',  label: 'Profil',   icon: '📋' },
  { id: 'noten',   label: 'Noten',    icon: '🌸' },
  { id: 'analyse', label: 'Analyse',  icon: '📊' },
  { id: 'kaufen',  label: 'Kaufen',   icon: '🛍️' },
];

// Wandelt KI-String-Werte ("moderate", "medium", "high" etc.) in Zahlen um
function normalizeNumericValue(val: number | string | undefined): number | undefined {
  if (val === undefined || val === null) return undefined;
  if (typeof val === 'number') return val > 0 ? val : undefined;
  const strMap: Record<string, number> = {
    very_low: 2, low: 3, moderate: 5, medium: 6, high: 8, very_high: 9,
    light: 3, medium_light: 5, strong: 8, very_strong: 9,
    poor: 2, average: 5, good: 7, excellent: 9,
  };
  const n = parseFloat(String(val));
  if (!isNaN(n)) return n > 0 ? n : undefined;
  return strMap[String(val).toLowerCase().replace(/[\s-]/g, '_')] ?? undefined;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div style={{ marginBottom: '1.4rem', marginTop: 0 }}>
    <h2 style={{
      fontSize: '0.72rem',
      color: C.goldMuted,
      marginBottom: subtitle ? '0.2rem' : 0,
      marginTop: 0,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      fontWeight: '700',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
    }}>
      <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: C.gold, flexShrink: 0 }} />
      {children}
    </h2>
    {subtitle && (
      <p style={{ fontSize: '0.82rem', color: C.textLight, margin: 0, paddingLeft: '2rem' }}>{subtitle}</p>
    )}
  </div>
);

// Big Performance Bar with large right-side number
const BarRow = ({ label, value, max = 10, suffix = '/10' }: { label: string; value?: number | string; max?: number; suffix?: string }) => {
  const num = normalizeNumericValue(value);
  if (!num) return null;
  const pct = Math.min(100, (num / max) * 100);
  return (
    <div style={{ marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.82rem', fontWeight: '600', color: C.textMuted, marginBottom: '0.5rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ height: '8px', backgroundColor: C.sand, borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${C.goldMuted}, ${C.gold})`,
            borderRadius: '6px',
            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />
        </div>
      </div>
      <div style={{
        flexShrink: 0,
        fontSize: '1.6rem',
        fontWeight: '800',
        color: C.gold,
        fontFamily: "'Playfair Display', serif",
        lineHeight: 1,
        minWidth: '3.5rem',
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {num.toFixed(1)}
        <span style={{ fontSize: '0.65rem', fontWeight: '500', color: C.goldMuted, verticalAlign: 'super' }}>{suffix}</span>
      </div>
    </div>
  );
};

// Fact Pill für horizontale Zeilen
const FactPill = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    color: C.text,
    fontSize: '0.88rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  }}>
    {children}
  </span>
);

const NoteList = ({ notes }: { notes: string[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
    {notes.length > 0
      ? notes.map((n, i) => (
          <span key={i} style={{ fontSize: '0.84rem', color: C.text, display: 'flex', alignItems: 'flex-start', gap: '0.4rem', lineHeight: '1.4', overflowWrap: 'break-word' }}>
            <span style={{ flexShrink: 0, color: C.gold, fontWeight: '700', fontSize: '0.9rem' }}>·</span>
            <span>{n}</span>
          </span>
        ))
      : <span style={{ fontSize: '0.82rem', color: C.textLight, fontStyle: 'italic' }}>Keine Daten</span>
    }
  </div>
);

// Sternebewertung
const StarRating = ({ rating }: { rating: number }) => {
  const stars = Math.round(rating / 2);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.75rem', marginBottom: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{
          fontSize: '1.4rem',
          color: s <= stars ? C.gold : 'rgba(212,175,55,0.2)',
          filter: s <= stars ? 'drop-shadow(0 0 4px rgba(212,175,55,0.5))' : 'none',
        }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: '0.78rem', color: 'rgba(212,175,55,0.5)', marginLeft: '0.4rem' }}>
        {rating.toFixed(1)}/10
      </span>
    </div>
  );
};

// Intensitäts-Badge
const intensityMap: Record<string, { label: string; emoji: string; color: string }> = {
  very_light: { label: 'Sehr leicht', emoji: '🌬️', color: '#a8d8ea' },
  light:       { label: 'Leicht',      emoji: '💨', color: '#b8e0d2' },
  medium:      { label: 'Mittel',      emoji: '🌿', color: '#d4af37' },
  strong:      { label: 'Intensiv',    emoji: '🔥', color: '#c97d4e' },
  very_strong: { label: 'Sehr stark',  emoji: '💥', color: '#9e3030' },
};

// Scroll-Fortschrittsbalken
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999 }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: `linear-gradient(90deg, ${C.goldMuted}, ${C.gold}, ${C.goldLight})`,
        transition: 'width 0.1s linear',
        boxShadow: `0 0 8px rgba(212,175,55,0.6)`,
      }} />
    </div>
  );
};

// ─── Confidence Ring ──────────────────────────────────────────────────────────
interface ConfidenceRingProps {
  confidence: 'high' | 'medium' | 'low';
  dbMatch: boolean;
}

const ConfidenceRing = ({ confidence, dbMatch }: ConfidenceRingProps) => {
  if (dbMatch) return null;

  const config = {
    high:   { pct: 92, color: '#4caf50', label: 'Hohe Konfidenz',    sublabel: '~92% sicher' },
    medium: { pct: 68, color: '#ff9800', label: 'Mittlere Konfidenz', sublabel: '~68% sicher' },
    low:    { pct: 35, color: '#f44336', label: 'Niedrige Konfidenz', sublabel: '~35% sicher' },
  }[confidence];

  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (config.pct / 100) * circ;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(8px)',
      padding: '0.35rem 0.7rem 0.35rem 0.4rem',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.15)',
    }}>
      <svg width="44" height="44" style={{ flexShrink: 0 }}>
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
        <circle
          cx="22" cy="22" r={r}
          fill="none"
          stroke={config.color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          style={{ filter: `drop-shadow(0 0 4px ${config.color}80)` }}
        />
        <text x="22" y="26" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="white" fontFamily="Inter, sans-serif">
          {config.pct}%
        </text>
      </svg>
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'rgba(255,255,255,0.9)', lineHeight: 1.2 }}>{config.label}</div>
        <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)' }}>{config.sublabel}</div>
      </div>
    </div>
  );
};

// ─── Instagram Share Card Generator ──────────────────────────────────────────
interface ScanShareImageButtonProps {
  name: string;
  brand: string;
  family?: string;
  topNotes?: string[];
  confidence: 'high' | 'medium' | 'low';
  dbMatch: boolean;
  uploadedImage?: string | null;
}

const ScanShareImageButton = ({ name, brand, family, topNotes, confidence, dbMatch, uploadedImage }: ScanShareImageButtonProps) => {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const generate = async () => {
    setGenerating(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) { setGenerating(false); return; }

    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#1a1108');
    grad.addColorStop(0.5, '#2a1d12');
    grad.addColorStop(1, '#3a2518');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.save();
    for (let i = 0; i < 120; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1080, Math.random() * 1080, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${Math.random() * 0.08 + 0.02})`;
      ctx.fill();
    }
    ctx.restore();

    if (uploadedImage) {
      try {
        const img = new window.Image();
        await new Promise<void>((res, rej) => {
          img.onload = () => res();
          img.onerror = () => rej();
          img.src = uploadedImage;
        });
        ctx.save();
        ctx.globalAlpha = 0.18;
        const s = Math.max(1080 / img.width, 560 / img.height);
        const dw = img.width * s, dh = img.height * s;
        ctx.drawImage(img, (1080 - dw) / 2, 0, dw, dh);
        const fadeGrad = ctx.createLinearGradient(0, 300, 0, 560);
        fadeGrad.addColorStop(0, 'rgba(26,17,8,0)');
        fadeGrad.addColorStop(1, 'rgba(26,17,8,1)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = fadeGrad;
        ctx.fillRect(0, 0, 1080, 560);
        ctx.restore();
      } catch { /* skip */ }
    }

    ctx.save();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(28, 28, 1024, 1024);
    ctx.strokeStyle = 'rgba(212,175,55,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, 1008, 1008);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = 'rgba(212,175,55,0.8)';
    ctx.font = '500 28px Inter, Arial, sans-serif';
    (ctx as any).letterSpacing = '8px';
    ctx.textAlign = 'center';
    ctx.fillText('AURESSA', 540, 90);
    ctx.fillStyle = 'rgba(212,175,55,0.35)';
    ctx.font = '400 15px Inter, Arial, sans-serif';
    (ctx as any).letterSpacing = '4px';
    ctx.fillText('DUFT-SCANNER', 540, 118);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(200, 140); ctx.lineTo(880, 140);
    ctx.strokeStyle = 'rgba(212,175,55,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    const badgeText = dbMatch ? '✓ VERIFIZIERT' : confidence === 'high' ? '✓ ERKANNT' : confidence === 'medium' ? 'GESCHÄTZT' : 'NIEDRIGE KONFIDENZ';
    const badgeColor = dbMatch ? '#d4af37' : confidence === 'high' ? '#4caf50' : confidence === 'medium' ? '#ff9800' : '#f44336';
    const badgeX = 540;
    ctx.save();
    ctx.font = '700 20px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    const badgeWidth = ctx.measureText(badgeText).width + 48;
    ctx.fillStyle = `${badgeColor}22`;
    const bx = badgeX - badgeWidth / 2;
    ctx.beginPath();
    (ctx as any).roundRect(bx, 160, badgeWidth, 42, 21);
    ctx.fill();
    ctx.strokeStyle = badgeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = badgeColor;
    ctx.fillText(badgeText, badgeX, 187);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#f9f6f1';
    ctx.textAlign = 'center';
    const nameFontSize = name.length > 20 ? 72 : name.length > 14 ? 86 : 96;
    ctx.font = `700 ${nameFontSize}px 'Georgia', serif`;
    const nameWords = name.split(' ');
    if (nameWords.length > 1 && name.length > 14) {
      const mid = Math.ceil(nameWords.length / 2);
      const line1 = nameWords.slice(0, mid).join(' ');
      const line2 = nameWords.slice(mid).join(' ');
      ctx.fillText(line1, 540, 360);
      ctx.fillText(line2, 540, 360 + nameFontSize + 8);
    } else {
      ctx.fillText(name, 540, 370);
    }
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#d4af37';
    ctx.font = '600 42px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    const brandY = name.split(' ').length > 2 ? 560 : 490;
    ctx.fillText(brand, 540, brandY);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(340, brandY + 30); ctx.lineTo(740, brandY + 30);
    ctx.strokeStyle = 'rgba(212,175,55,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    const infoY = brandY + 80;
    if (family) {
      ctx.save();
      ctx.fillStyle = 'rgba(212,175,55,0.7)';
      ctx.font = '500 24px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(family.toUpperCase(), 540, infoY);
      ctx.restore();
    }

    if (topNotes && topNotes.length > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(249,246,241,0.55)';
      ctx.font = '400 22px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      const notesStr = topNotes.slice(0, 4).join('  ·  ');
      ctx.fillText(notesStr, 540, infoY + (family ? 46 : 0));
      ctx.restore();
    }

    ctx.save();
    ctx.fillStyle = 'rgba(212,175,55,0.55)';
    ctx.font = '400 22px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('auressa.ch/duft-scanner', 540, 990);
    ctx.restore();

    try {
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `auressa-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
        a.click();
        URL.revokeObjectURL(url);
        setDone(true);
        setTimeout(() => setDone(false), 4000);
      }
    } catch { /* ignore */ }
    setGenerating(false);
  };

  return (
    <button
      onClick={generate}
      disabled={generating}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.5rem 1.1rem', borderRadius: '8px',
        backgroundColor: done ? C.gold : 'transparent',
        border: `1px solid ${done ? C.gold : '#e040fb'}`,
        color: done ? C.dark : '#e040fb',
        fontWeight: '600', fontSize: '0.82rem', cursor: generating ? 'wait' : 'pointer',
        fontFamily: "'Inter', sans-serif",
        transition: 'all 0.2s ease',
        opacity: generating ? 0.7 : 1,
      }}
    >
      {generating ? '⏳ Erstelle...' : done ? '✓ Gespeichert!' : '📸 Bild für Instagram'}
    </button>
  );
};

// ─── Teilen-Button ────────────────────────────────────────────────────────────
const ShareButton = ({ name, brand, family, topNotes, confidence, dbMatch, uploadedImage }: {
  name: string; brand: string; family?: string; topNotes?: string[];
  confidence: 'high' | 'medium' | 'low'; dbMatch: boolean; uploadedImage?: string | null;
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Ich habe gerade "${name}" von ${brand} mit Auressa entdeckt – dem KI-Parfümberater! 🌸`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://auressa.ch';
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* Fallback */ }
  };

  return (
    <div style={{ display: 'contents' }}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.5rem 1.1rem', borderRadius: '8px',
          backgroundColor: '#25D366', color: '#fff',
          fontWeight: '600', fontSize: '0.82rem', textDecoration: 'none',
          border: 'none', cursor: 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        WhatsApp
      </a>
      <ScanShareImageButton
        name={name}
        brand={brand}
        family={family}
        topNotes={topNotes}
        confidence={confidence}
        dbMatch={dbMatch}
        uploadedImage={uploadedImage}
      />
      <button
        onClick={copyLink}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.5rem 1.1rem', borderRadius: '8px',
          backgroundColor: copied ? C.gold : 'transparent',
          border: `1px solid ${copied ? C.gold : C.sand}`,
          color: copied ? C.dark : C.textMuted,
          fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          transition: 'all 0.2s ease',
        }}
      >
        {copied ? '✓ Kopiert!' : '🔗 Link kopieren'}
      </button>
    </div>
  );
};

// ─── Sticky Buy Bar ───────────────────────────────────────────────────────────
const StickyBuyBar = ({ name, brand, buyUrl, price }: { name: string; brand: string; buyUrl: string; price?: number | null }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 300,
      background: 'linear-gradient(to top, rgba(26,17,8,0.98), rgba(26,17,8,0.95))',
      backdropFilter: 'blur(12px)',
      borderTop: `1px solid rgba(212,175,55,0.25)`,
      padding: '0.75rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.72rem', color: 'rgba(212,175,55,0.6)', fontWeight: '600', letterSpacing: '0.04em' }}>{brand}</div>
        <div style={{ fontSize: '0.9rem', color: C.cream, fontWeight: '700', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
      </div>
      {price && (
        <div style={{ flexShrink: 0, fontSize: '1.1rem', fontWeight: '800', color: C.gold }}>CHF {price}</div>
      )}
      <a
        href={buyUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        style={{
          flexShrink: 0,
          backgroundColor: C.gold,
          color: C.dark,
          fontWeight: '700',
          fontSize: '0.88rem',
          padding: '0.65rem 1.4rem',
          borderRadius: '10px',
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
          letterSpacing: '0.02em',
        }}
      >
        Kaufen →
      </a>
    </div>
  );
};

// ─── Sticky Tab Bar ───────────────────────────────────────────────────────────
const StickyTabBar = ({
  activeTab,
  setActiveTab,
  tabContentRef,
}: {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  tabContentRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      gap: 0,
      marginBottom: '2rem',
      background: C.cream,
      borderBottom: `2px solid ${C.sand}`,
      borderRadius: '12px 12px 0 0',
      overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(42,29,18,0.10)',
    }}>
      {TAB_CONFIG.map(({ id, label, icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              setTimeout(() => {
                tabContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 10);
            }}
            style={{
              flex: 1,
              padding: '0.9rem 0.3rem 0.75rem',
              border: 'none',
              borderBottom: isActive ? `3px solid ${C.gold}` : '3px solid transparent',
              background: isActive ? `linear-gradient(180deg, #fff 0%, ${C.cream} 100%)` : 'transparent',
              color: isActive ? C.dark : C.textMuted,
              fontWeight: isActive ? '700' : '500',
              fontSize: '0.78rem',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.02em',
              transition: 'all 0.15s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = C.creamDark;
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{icon}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ─── Duftpyramide (visuelle Pyramidenform) ────────────────────────────────────
const PyramidLayer = ({
  label,
  emoji,
  notes,
  tier,
}: {
  label: string;
  emoji: string;
  notes: string[];
  tier: 'top' | 'heart' | 'base';
}) => {
  const tierConfig = {
    top:   { bg: `linear-gradient(135deg, #2a1d12, #3d2e22)`, color: C.goldLight, width: '62%',  border: `2px solid rgba(212,175,55,0.8)` },
    heart: { bg: `linear-gradient(135deg, #3a2518, #4d3826)`, color: C.gold,      width: '80%',  border: `2px solid rgba(212,175,55,0.55)` },
    base:  { bg: `linear-gradient(135deg, #4d3826, #5e4534)`, color: C.goldMuted, width: '100%', border: `2px solid rgba(176,139,79,0.4)` },
  }[tier];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '4px' }}>
      <div style={{
        width: tierConfig.width,
        background: tierConfig.bg,
        border: tierConfig.border,
        borderRadius: tier === 'top' ? '12px 12px 4px 4px' : tier === 'base' ? '4px 4px 12px 12px' : '4px',
        padding: '1rem 1.25rem 1rem',
        color: C.cream,
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
          <span style={{ fontSize: '0.68rem', fontWeight: '800', color: tierConfig.color, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
        </div>
        {notes.length > 0
          ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {notes.map((n, i) => (
                <span key={i} style={{
                  backgroundColor: 'rgba(212,175,55,0.15)',
                  border: `1px solid rgba(212,175,55,0.3)`,
                  color: 'rgba(249,246,241,0.9)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                }}>
                  {n}
                </span>
              ))}
            </div>
          : <span style={{ fontSize: '0.8rem', color: 'rgba(249,246,241,0.4)', fontStyle: 'italic' }}>Keine Daten</span>
        }
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AnalysisResultView({ analysis, similarPerfumes, onNewSearch, dbMatch, uploadedImage }: AnalysisResultViewProps) {
  const [currentAnalysis, setCurrentAnalysis] = useState(analysis);
  const [activeTab, setActiveTab] = useState<TabId>('profil');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const tabContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentAnalysis) return null;

  const displayName = dbMatch?.perfume_name || currentAnalysis.perfumeName;
  const displayBrand = dbMatch?.brands?.name || currentAnalysis.brandName;

  const displayNotes = dbMatch
    ? {
        top: (dbMatch.top_notes && dbMatch.top_notes.length > 0) ? dbMatch.top_notes : currentAnalysis.notes.top,
        heart: (dbMatch.heart_notes && dbMatch.heart_notes.length > 0) ? dbMatch.heart_notes : currentAnalysis.notes.heart,
        base: (dbMatch.base_notes && dbMatch.base_notes.length > 0) ? dbMatch.base_notes : currentAnalysis.notes.base,
      }
    : currentAnalysis.notes;

  const displayDescription = dbMatch?.description || currentAnalysis.poeticDescription || currentAnalysis.generalDescription;
  const displayImage = dbMatch?.image_url || null;
  const heroImage = displayImage || uploadedImage || null;

  const dbGender = dbMatch?.gender;
  const displayGender = dbGender === 'Women' ? 'Damen' : dbGender === 'Men' ? 'Herren' : dbGender === 'Unisex' ? 'Unisex' : null;
  const genderLabel = displayGender || (currentAnalysis.gender === 'woman' ? 'Damen' : currentAnalysis.gender === 'man' ? 'Herren' : 'Unisex');

  const buyUrl = dbMatch?.affiliate_url || `https://www.notino.ch/suche/?q=${encodeURIComponent(`${displayBrand} ${displayName}`)}`;
  const flaconiUrl = `https://www.flaconi.ch/suche/?q=${encodeURIComponent(`${displayBrand} ${displayName}`)}`;

  const confidenceLabel = dbMatch ? 'In Auressa-DB gefunden' : currentAnalysis.confidence === 'high' ? 'Hohe Konfidenz' : currentAnalysis.confidence === 'medium' ? 'Mittlere Konfidenz' : 'Niedrige Konfidenz';
  const intensityInfo = currentAnalysis.intensity ? intensityMap[currentAnalysis.intensity] : null;

  const hasDevelopment = currentAnalysis.development &&
    (currentAnalysis.development.opening || currentAnalysis.development.middleGame || currentAnalysis.development.drydown);

  // Fact Pills data
  const factPills = [
    currentAnalysis.concentration,
    currentAnalysis.family,
    genderLabel,
    currentAnalysis.year ? String(currentAnalysis.year) : null,
    intensityInfo ? intensityInfo.label : null,
  ].filter(Boolean) as string[];

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 0 6rem' }}>

      {/* ── STICKY BUY BAR ────────────────────────────────────────────────── */}
      <StickyBuyBar name={displayName} brand={displayBrand} buyUrl={buyUrl} price={dbMatch?.price_chf ?? null} />

      {/* ── SCROLL-FORTSCHRITTSBALKEN ──────────────────────────────────────── */}
      <ScrollProgressBar />

      {/* ── KORREKTUR-BANNER ──────────────────────────────────────────────── */}
      <div style={{ padding: '0 1rem' }}>
        <ScanCorrectionBanner
          analysis={currentAnalysis}
          onCorrected={(updated) => setCurrentAnalysis(updated)}
        />
      </div>

      {/* ── KONFIDENZ-WARNUNG ──────────────────────────────────────────────── */}
      {!dbMatch && (currentAnalysis.confidence === 'low' || currentAnalysis.confidence === 'medium') && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
          backgroundColor: currentAnalysis.confidence === 'low' ? '#fff8e6' : '#fffbf0',
          border: `1px solid ${currentAnalysis.confidence === 'low' ? '#f5c842' : '#e8d875'}`,
          borderLeft: `4px solid ${currentAnalysis.confidence === 'low' ? '#d4a017' : '#c9b848'}`,
          borderRadius: '10px',
          padding: '0.9rem 1.1rem',
          margin: '0 1rem 1.25rem',
          fontSize: '0.85rem',
          color: '#6b5205',
          lineHeight: 1.55,
        }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.05rem' }}>
            {currentAnalysis.confidence === 'low' ? '⚠️' : 'ℹ️'}
          </span>
          <div>
            <strong style={{ display: 'block', marginBottom: '0.2rem', color: '#5a4200' }}>
              {currentAnalysis.confidence === 'low' ? 'Niedrige KI-Konfidenz' : 'Mittlere KI-Konfidenz'}
            </strong>
            {currentAnalysis.confidence === 'low'
              ? 'Das Bild war schwer zu erkennen – das Ergebnis könnte ungenau sein. Versuche ein klareres Foto direkt vom Flakon aufzunehmen.'
              : 'Die KI ist sich nicht ganz sicher. Ist das der richtige Duft? Falls nicht, kannst du das Ergebnis unten korrigieren.'}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — vollbild, Foto als dramatischer Hintergrund
      ════════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: heroImage ? 'transparent' : `linear-gradient(160deg, #1a1108 0%, ${C.dark} 55%, #3a2518 100%)`,
        color: C.cream,
        marginBottom: 0,
        overflow: 'hidden',
        minHeight: heroImage ? '420px' : '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        {/* Vollbild-Hintergrundbild */}
        {heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt={`${displayName} von ${displayBrand}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: uploadedImage && !displayImage ? 0.6 : 0.85,
              }}
            />
            {/* Starkes dunkles Overlay - oben leicht, unten sehr dunkel */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(26,17,8,0.25) 0%, rgba(26,17,8,0.55) 40%, rgba(26,17,8,0.88) 75%, rgba(26,17,8,0.97) 100%)',
            }} />
          </>
        )}

        {/* Wenn kein Bild: dezente Gold-Textur */}
        {!heroImage && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(212,175,55,0.05) 0%, transparent 50%)`,
          }} />
        )}

        {/* Confidence Badge - oben links */}
        <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 10 }}>
          {dbMatch ? (
            <span style={{
              backgroundColor: C.gold,
              color: C.dark,
              padding: '0.3rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: '700',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 12px rgba(212,175,55,0.4)',
            }}>
              ✓ {confidenceLabel}
            </span>
          ) : (
            <ConfidenceRing confidence={currentAnalysis.confidence as 'high' | 'medium' | 'low'} dbMatch={false} />
          )}
        </div>

        {/* Scan-Label oben rechts wenn hochgeladen */}
        {uploadedImage && !displayImage && (
          <div style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10,
            backgroundColor: 'rgba(42,29,18,0.75)', backdropFilter: 'blur(4px)',
            color: 'rgba(212,175,55,0.9)', fontSize: '0.68rem', fontWeight: '700',
            letterSpacing: '0.05em', padding: '0.25rem 0.65rem', borderRadius: '10px',
            border: '1px solid rgba(212,175,55,0.3)',
          }}>
            📸 Dein Scan
          </div>
        )}

        {/* Hero-Content unten */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          padding: '0 1.5rem 2.5rem',
          textAlign: 'center',
        }}>
          {/* KI vs DB-Label */}
          <p style={{ fontSize: '0.68rem', color: 'rgba(212,175,55,0.5)', marginBottom: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {dbMatch ? '✓ Verifizierte Daten' : '🤖 KI-Erkennung'}
          </p>

          {/* RIESIGER NAME */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 9vw, 4.5rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            margin: '0 0 0.4rem',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: C.cream,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            {displayName}
          </h1>

          {/* MARKE in Gold */}
          <p style={{
            fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
            color: C.gold,
            marginBottom: '0.5rem',
            fontWeight: '600',
            letterSpacing: '0.04em',
            textShadow: '0 1px 8px rgba(0,0,0,0.4)',
          }}>
            {displayBrand}
          </p>

          {/* Sternebewertung */}
          {dbMatch && currentAnalysis.rating && currentAnalysis.rating > 0 && (
            <StarRating rating={currentAnalysis.rating} />
          )}

          {/* Beschreibung in kursiv */}
          {displayDescription && (
            <p style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
              lineHeight: 1.8,
              color: 'rgba(249,246,241,0.82)',
              maxWidth: '520px',
              margin: '0.85rem auto 0',
              fontStyle: 'italic',
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}>
              {displayDescription}
            </p>
          )}

          {/* Hero Buy CTA + Teilen */}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={buyUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.75rem 1.75rem',
                backgroundColor: C.gold, color: C.dark,
                fontWeight: '700', fontSize: '0.95rem',
                borderRadius: '12px', textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(212,175,55,0.45)',
                letterSpacing: '0.02em',
              }}
            >
              🛍️ Jetzt kaufen{dbMatch?.price_chf ? ` · CHF ${dbMatch.price_chf}` : ''}
            </a>
            <ShareButton
              name={displayName}
              brand={displayBrand}
              family={currentAnalysis.family}
              topNotes={displayNotes.top}
              confidence={currentAnalysis.confidence as 'high' | 'medium' | 'low'}
              dbMatch={!!dbMatch}
              uploadedImage={uploadedImage}
            />
          </div>
        </div>
      </section>

      {/* ── FACT PILLS – horizontale Zeile unter dem Hero ──────────────────── */}
      {factPills.length > 0 && (
        <div style={{
          backgroundColor: C.creamDark,
          borderBottom: `1px solid ${C.sand}`,
          padding: '0.85rem 1.5rem',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            whiteSpace: 'nowrap',
            minWidth: 'max-content',
          }}>
            {factPills.map((pill, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span style={{ color: C.goldMuted, margin: '0 0.65rem', fontSize: '0.75rem', fontWeight: '300' }}>·</span>
                )}
                <FactPill>{pill}</FactPill>
              </span>
            ))}
            {(currentAnalysis.year || currentAnalysis.concentration) && dbMatch?.price_chf && (
              <>
                <span style={{ color: C.goldMuted, margin: '0 0.65rem', fontSize: '0.75rem', fontWeight: '300' }}>·</span>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: C.gold }}>CHF {dbMatch.price_chf}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── TABS + CONTENT ─────────────────────────────────────────────────── */}
      <div style={{ padding: '0 0' }}>
        <StickyTabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabContentRef={tabContentRef}
        />

        <div ref={tabContentRef} style={{ padding: '0 1rem' }}>

          {/* ══════════════════════════════════════════════════════════════════
              TAB: PROFIL
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'profil' && (
            <>
              {/* ── 1. PERFEKTE MOMENT & PERSÖNLICHKEIT — emotionaler Einstieg ── */}
              {(currentAnalysis.perfectMoment || currentAnalysis.personalityType || currentAnalysis.mood) && (
                <section style={{ marginBottom: '2rem' }}>
                  <div style={{
                    background: `linear-gradient(160deg, #2a1d12, #1a1108)`,
                    borderRadius: '16px',
                    padding: '1.75rem 2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* Dekoratives Muster */}
                    <div style={{
                      position: 'absolute', top: 0, right: 0,
                      width: '120px', height: '120px',
                      background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }} />
                    {currentAnalysis.mood && (
                      <div style={{ fontSize: '0.65rem', color: 'rgba(212,175,55,0.6)', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                        ✦ Stimmung
                      </div>
                    )}
                    {currentAnalysis.mood && (
                      <p style={{
                        fontSize: 'clamp(1.2rem, 4vw, 1.55rem)',
                        fontFamily: "'Playfair Display', serif",
                        color: C.cream,
                        margin: '0 0 1rem',
                        fontStyle: 'italic',
                        lineHeight: 1.4,
                      }}>
                        „{currentAnalysis.mood}"
                      </p>
                    )}
                    {currentAnalysis.perfectMoment && (
                      <p style={{
                        fontSize: '0.93rem',
                        color: 'rgba(249,246,241,0.78)',
                        lineHeight: 1.75,
                        margin: currentAnalysis.personalityType ? '0 0 1rem' : 0,
                        borderTop: currentAnalysis.mood ? `1px solid rgba(212,175,55,0.2)` : 'none',
                        paddingTop: currentAnalysis.mood ? '1rem' : 0,
                      }}>
                        {currentAnalysis.perfectMoment}
                      </p>
                    )}
                    {currentAnalysis.personalityType && (
                      <p style={{
                        fontSize: '0.88rem',
                        color: 'rgba(212,175,55,0.7)',
                        lineHeight: 1.65,
                        margin: 0,
                        borderTop: (currentAnalysis.mood || currentAnalysis.perfectMoment) ? `1px solid rgba(212,175,55,0.15)` : 'none',
                        paddingTop: (currentAnalysis.mood || currentAnalysis.perfectMoment) ? '0.9rem' : 0,
                        fontStyle: 'italic',
                      }}>
                        {currentAnalysis.personalityType}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {/* ── 2. CHARAKTER-TAGS — schnell scanbar ─────────────────────── */}
              {currentAnalysis.characterTags && currentAnalysis.characterTags.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                  <SectionHeading>Charakter-Tags</SectionHeading>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {currentAnalysis.characterTags.map((tag, i) => {
                      const tagSlug = tag.toLowerCase().replace(/[äöü]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue' }[c] || c)).replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      return (
                        <Link key={i} href={`/tag/${tagSlug}`} style={{
                          backgroundColor: i === 0 ? C.gold : 'transparent',
                          border: `1.5px solid ${i === 0 ? C.gold : 'rgba(212,175,55,0.4)'}`,
                          color: i === 0 ? C.dark : C.goldMuted,
                          padding: '0.35rem 0.9rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: i === 0 ? '700' : '600',
                          textDecoration: 'none',
                          display: 'inline-block',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212,175,55,0.2)';
                          (e.currentTarget as HTMLElement).style.color = C.dark;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = i === 0 ? C.gold : 'transparent';
                          (e.currentTarget as HTMLElement).style.color = i === 0 ? C.dark : C.goldMuted;
                        }}
                        >
                          #{tag}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ── 3. WANN TRAGEN ──────────────────────────────────────────── */}
              {(currentAnalysis.seasonRecommendation || (currentAnalysis.occasionList?.length ?? 0) > 0) && (
                <section style={{ marginBottom: '2rem' }}>
                  <SectionHeading>Wann tragen?</SectionHeading>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                    {currentAnalysis.seasonRecommendation && (
                      <div style={{
                        backgroundColor: C.cream, border: `1px solid ${C.sand}`, borderRadius: '12px',
                        padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                      }}>
                        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🍂</span>
                        <div>
                          <div style={{ fontSize: '0.65rem', fontWeight: '700', color: C.goldMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Saison</div>
                          <p style={{ fontSize: '0.9rem', color: C.dark, margin: 0, fontWeight: '500', lineHeight: 1.4 }}>{currentAnalysis.seasonRecommendation}</p>
                        </div>
                      </div>
                    )}
                    {currentAnalysis.occasionList && currentAnalysis.occasionList.length > 0 && (
                      <div style={{
                        backgroundColor: C.cream, border: `1px solid ${C.sand}`, borderRadius: '12px',
                        padding: '1rem 1.25rem',
                      }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: '700', color: C.goldMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>🎯 Anlässe</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {currentAnalysis.occasionList.map((o, i) => (
                            <span key={i} style={{
                              backgroundColor: C.creamDark, color: C.text, border: `1px solid ${C.sand}`,
                              padding: '0.2rem 0.65rem', borderRadius: '14px', fontSize: '0.8rem', fontWeight: '500',
                            }}>{o}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ── 4. STECKBRIEF ──────────────────────────────────────────── */}
              <section style={{ marginBottom: '2rem' }}>
                <SectionHeading>Steckbrief</SectionHeading>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.55rem' }}>
                  {[
                    currentAnalysis.concentration && { icon: '🧴', label: 'Konzentration', value: currentAnalysis.concentration, estimated: !dbMatch },
                    currentAnalysis.family && { icon: '🌸', label: 'Duftfamilie', value: currentAnalysis.family, estimated: !dbMatch },
                    { icon: '👥', label: 'Geschlecht', value: genderLabel, estimated: !dbMatch },
                    currentAnalysis.origin && { icon: '🌍', label: 'Herkunft', value: currentAnalysis.origin, estimated: !dbMatch },
                    currentAnalysis.year && { icon: '📅', label: 'Jahr', value: String(currentAnalysis.year), estimated: !dbMatch },
                    currentAnalysis.parfumeur && { icon: '👃', label: 'Parfümeur', value: currentAnalysis.parfumeur, estimated: !dbMatch },
                    dbMatch?.price_chf && { icon: '💰', label: 'Preis (CH)', value: `CHF ${dbMatch.price_chf}`, estimated: false },
                    intensityInfo && { icon: intensityInfo.emoji, label: 'Intensität', value: intensityInfo.label, estimated: !dbMatch },
                  ].filter(Boolean).map((item) => {
                    const it = item as { icon: string; label: string; value: string; estimated: boolean };
                    return (
                      <div key={it.label} style={{
                        backgroundColor: C.cream,
                        border: `1px solid ${it.estimated ? 'rgba(212,175,55,0.25)' : C.sand}`,
                        borderRadius: '10px',
                        padding: '0.8rem 0.95rem',
                        display: 'flex', flexDirection: 'column', gap: '0.25rem',
                      }}>
                        <div style={{ fontSize: '0.62rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {it.icon} {it.label}
                          {it.estimated && <span style={{ marginLeft: '0.25rem', opacity: 0.7 }}>~</span>}
                        </div>
                        <div style={{ fontSize: '0.87rem', color: C.dark, fontWeight: '600', lineHeight: 1.3 }}>{it.value}</div>
                      </div>
                    );
                  })}
                </div>
                {!dbMatch && (
                  <p style={{ fontSize: '0.72rem', color: C.textLight, margin: '0.6rem 0 0', fontStyle: 'italic' }}>
                    ~ = KI-Schätzung
                  </p>
                )}
              </section>
            </>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB: NOTEN
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'noten' && (
            <>
              {/* ── VISUELLE DUFTPYRAMIDE ──────────────────────────────────── */}
              <section style={{ marginBottom: '2.75rem' }}>
                <SectionHeading>Duftpyramide</SectionHeading>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <PyramidLayer label="Kopfnoten" emoji="✨" notes={displayNotes.top} tier="top" />
                  <PyramidLayer label="Herznoten" emoji="🌸" notes={displayNotes.heart} tier="heart" />
                  <PyramidLayer label="Basisnoten" emoji="🌿" notes={displayNotes.base} tier="base" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.85rem' }}>
                  {[
                    { label: 'Kopf', sub: '0–30 Min.' },
                    { label: 'Herz', sub: '30 Min.–2h' },
                    { label: 'Basis', sub: '2h+' },
                  ].map((l) => (
                    <div key={l.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: '700', color: C.goldMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l.label}</div>
                      <div style={{ fontSize: '0.6rem', color: C.textLight }}>{l.sub}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── ENTWICKLUNG AUF DER HAUT ───────────────────────────────── */}
              {hasDevelopment && (
                <section style={{ marginBottom: '2.75rem' }}>
                  <SectionHeading>Entwicklung auf der Haut</SectionHeading>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
                    {[
                      { key: 'opening',    icon: '🌅', label: 'Kopfnote', subtitle: 'erste Minuten', text: currentAnalysis.development?.opening },
                      { key: 'middleGame', icon: '🌸', label: 'Herznote', subtitle: 'nach 30 Min.', text: currentAnalysis.development?.middleGame },
                      { key: 'drydown',    icon: '🌙', label: 'Basis',    subtitle: 'nach Stunden', text: currentAnalysis.development?.drydown },
                    ].filter(s => s.text).map((stage, i, arr) => (
                      <div key={stage.key} style={{
                        position: 'relative',
                        backgroundColor: i % 2 === 0 ? C.cream : C.creamDark,
                        padding: '1.25rem 1.5rem',
                        borderTop: `3px solid ${C.gold}`,
                        borderBottom: `1px solid ${C.sand}`,
                        borderLeft: i === 0 ? `1px solid ${C.sand}` : 'none',
                        borderRight: `1px solid ${C.sand}`,
                        borderRadius: i === 0 ? '10px 0 0 10px' : i === arr.length - 1 ? '0 10px 10px 0' : '0',
                      }}>
                        {i < arr.length - 1 && (
                          <div style={{
                            position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', zIndex: 1,
                            width: '20px', height: '20px', backgroundColor: C.gold, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.65rem', color: C.dark, fontWeight: '700',
                            boxShadow: `0 0 0 3px ${C.cream}`,
                          }}>→</div>
                        )}
                        <div style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{stage.icon}</div>
                        <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.15rem' }}>{stage.label}</div>
                        <div style={{ fontSize: '0.67rem', color: C.textLight, marginBottom: '0.5rem' }}>{stage.subtitle}</div>
                        <p style={{ fontSize: '0.88rem', color: C.text, margin: 0, lineHeight: 1.65 }}>{stage.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── DUFTREISE ──────────────────────────────────────────────── */}
              {currentAnalysis.duftJourney && Object.values(currentAnalysis.duftJourney).some(v => v) && (
                <section style={{ marginBottom: '2.75rem' }}>
                  <SectionHeading>Duftreise durch den Tag</SectionHeading>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
                    {[
                      { key: 'morgen', icon: '🌅', label: 'Morgen', text: currentAnalysis.duftJourney.morgen },
                      { key: 'mittag', icon: '☀️', label: 'Mittag', text: currentAnalysis.duftJourney.mittag },
                      { key: 'abend', icon: '🌆', label: 'Abend', text: currentAnalysis.duftJourney.abend },
                      { key: 'nacht', icon: '🌙', label: 'Nacht', text: currentAnalysis.duftJourney.nacht },
                    ].filter(t => t.text).map(({ key, icon, label, text }) => (
                      <div key={key} style={{
                        backgroundColor: C.journeyBg,
                        borderRadius: '10px',
                        padding: '1.1rem',
                        border: `1px solid #f0e0a0`,
                        borderLeft: `3px solid ${C.gold}`,
                      }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: C.goldMuted, marginBottom: '0.5rem' }}>{icon} {label}</div>
                        <p style={{ fontSize: '0.88rem', color: C.text, margin: 0, lineHeight: 1.6 }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB: ANALYSE
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'analyse' && (
            <>
              {/* ── BEWERTUNGEN mit großen Zahlen ──────────────────────────── */}
              <section style={{ marginBottom: '2.75rem' }}>
                <SectionHeading>Bewertungen & Duft-DNA</SectionHeading>
                {!dbMatch && (
                  <p style={{ fontSize: '0.78rem', color: '#a08040', marginBottom: '1.25rem', fontStyle: 'italic' }}>
                    🤖 Diese Werte sind KI-Schätzungen und können von der Realität abweichen.
                  </p>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {(currentAnalysis.longevity || currentAnalysis.sillage || currentAnalysis.projection || currentAnalysis.uniqueness || currentAnalysis.priceValue) && (
                    <div style={{ backgroundColor: C.cream, border: `1px solid ${C.sand}`, borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
                      <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>Performance</div>
                      <BarRow label="Haltbarkeit" value={currentAnalysis.longevity} />
                      <BarRow label="Sillage" value={currentAnalysis.sillage} />
                      <BarRow label="Projektion" value={currentAnalysis.projection} />
                      <BarRow label="Einzigartigkeit" value={currentAnalysis.uniqueness} />
                      <BarRow label="Preis-Leistung" value={currentAnalysis.priceValue} />
                    </div>
                  )}
                  {currentAnalysis.duftDNA && Object.values(currentAnalysis.duftDNA).some(v => v !== undefined) && (
                    <div style={{ backgroundColor: C.cream, border: `1px solid ${C.sand}`, borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
                      <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>Duft-DNA</div>
                      <BarRow label="Blumig" value={currentAnalysis.duftDNA.blumig} max={100} suffix="%" />
                      <BarRow label="Frisch" value={currentAnalysis.duftDNA.frisch} max={100} suffix="%" />
                      <BarRow label="Süss" value={currentAnalysis.duftDNA.süss} max={100} suffix="%" />
                      <BarRow label="Holzig" value={currentAnalysis.duftDNA.holzig} max={100} suffix="%" />
                      <BarRow label="Würzig" value={currentAnalysis.duftDNA.würzig} max={100} suffix="%" />
                    </div>
                  )}
                </div>
              </section>

              {/* ── VERGLEICH MIT BEKANNTEN DÜFTEN ─────────────────────────── */}
              {currentAnalysis.comparisonPerfumes && currentAnalysis.comparisonPerfumes.length > 0 && (
                <section style={{ marginBottom: '2.75rem' }}>
                  <SectionHeading>Ähnelt bekannten Düften</SectionHeading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {currentAnalysis.comparisonPerfumes.map((comp, i) => (
                      <div key={i} style={{
                        display: 'flex', gap: '1rem',
                        backgroundColor: C.cream, border: `1px solid ${C.sand}`,
                        borderRadius: '10px', padding: '1rem 1.25rem', alignItems: 'flex-start',
                      }}>
                        <div style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', backgroundColor: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: '700', color: C.dark }}>
                          {i + 1}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.93rem', fontWeight: '700', color: C.dark, marginBottom: '0.25rem' }}>{comp.name}</div>
                          <div style={{ fontSize: '0.85rem', color: C.textMuted, lineHeight: 1.5 }}>{comp.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── GESCHICHTE & FUN FACTS ─────────────────────────────────── */}
              {(currentAnalysis.history || (currentAnalysis.funFacts && currentAnalysis.funFacts.length > 0) || (currentAnalysis.famouswearers && currentAnalysis.famouswearers.length > 0)) && (
                <section style={{ marginBottom: '2.75rem' }}>
                  <SectionHeading>Geschichte & Wissenswertes</SectionHeading>
                  <div style={{ backgroundColor: C.cream, border: `1px solid ${C.sand}`, borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
                    {currentAnalysis.history && (
                      <div style={{ marginBottom: currentAnalysis.funFacts?.length ? '1.5rem' : 0 }}>
                        <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>📖 Geschichte</div>
                        <p style={{ fontSize: '0.93rem', color: C.textMuted, lineHeight: 1.75, margin: 0 }}>{currentAnalysis.history}</p>
                      </div>
                    )}
                    {currentAnalysis.famouswearers && currentAnalysis.famouswearers.length > 0 && (
                      <div style={{ marginBottom: currentAnalysis.funFacts?.length ? '1.5rem' : 0 }}>
                        <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>⭐ Bekannte Fans</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                          {currentAnalysis.famouswearers.map((w, i) => (
                            <span key={i} style={{ backgroundColor: C.creamDark, color: C.text, border: `1px solid ${C.sand}`, padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>{w}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {currentAnalysis.funFacts && currentAnalysis.funFacts.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>💡 Interessantes</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                          {currentAnalysis.funFacts.map((fact, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                              <span style={{ flexShrink: 0, color: C.gold, fontWeight: '700', marginTop: '0.1rem' }}>·</span>
                              <span style={{ fontSize: '0.93rem', color: C.textMuted, lineHeight: 1.65 }}>{fact}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB: KAUFEN
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'kaufen' && (
            <>
              {/* ── PREIS ──────────────────────────────────────────────────── */}
              {(dbMatch?.price_chf || currentAnalysis.estimatedPrice) && (
                <div style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                  padding: '1.75rem',
                  background: `linear-gradient(135deg, #fdf7e8, #fef9ee)`,
                  borderRadius: '14px',
                  border: `1px solid #f0e0a0`,
                }}>
                  {dbMatch?.price_chf ? (
                    <>
                      <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Preis</div>
                      <div style={{ fontSize: '2.4rem', fontWeight: '800', color: C.dark, fontFamily: "'Playfair Display', serif" }}>
                        CHF {dbMatch.price_chf}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>KI-Preisschätzung 🤖</div>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: C.dark, fontFamily: "'Playfair Display', serif" }}>
                        {currentAnalysis.estimatedPrice}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: C.textLight, marginTop: '0.35rem' }}>
                        Geschätzter Schweizer Marktpreis – Preise können variieren.
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── AFFILIATE BUTTONS – groß mit mehr Luft ─────────────────── */}
              <section style={{ marginBottom: '2.75rem' }}>
                <SectionHeading>Duft kaufen</SectionHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href={buyUrl} target="_blank" rel="sponsored noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.4rem 1.75rem', borderRadius: '14px',
                    backgroundColor: C.gold, color: C.dark,
                    fontWeight: '700', fontSize: '1.05rem', textDecoration: 'none',
                    boxShadow: '0 6px 24px rgba(212,175,55,0.35)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '0.15rem' }}>Empfohlen</div>
                      <div>🛍️ Bei Notino kaufen</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.7 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: '500' }}>notino.ch</span>
                      <span>→</span>
                    </div>
                  </a>
                  <a href={flaconiUrl} target="_blank" rel="sponsored noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.4rem 1.75rem', borderRadius: '14px',
                    backgroundColor: 'transparent', border: `2px solid ${C.gold}`,
                    color: C.dark, fontWeight: '700', fontSize: '1.05rem', textDecoration: 'none',
                    transition: 'background 0.15s ease',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.goldMuted, marginBottom: '0.15rem' }}>Alternative</div>
                      <div>🔍 Bei Flaconi ansehen</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: C.goldMuted }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: '500' }}>flaconi.ch</span>
                      <span>→</span>
                    </div>
                  </a>
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.72rem', color: C.textLight, marginTop: '1rem' }}>
                  * Affiliate-Links – du zahlst nichts extra, wir erhalten eine kleine Provision.
                </p>
              </section>

              {/* Ähnliche Düfte: unter den Tabs, immer sichtbar */}

              {/* ── KI-EMPFEHLUNGEN ───────────────────────────────────────── */}
              {currentAnalysis.similarPerfumes && currentAnalysis.similarPerfumes.length > 0 && (
                <section style={{ marginBottom: '2.75rem' }}>
                  <SectionHeading>Weitere Empfehlungen (KI)</SectionHeading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {currentAnalysis.similarPerfumes.map((perf, i) => (
                      <div key={i} style={{
                        display: 'flex', gap: '1rem',
                        backgroundColor: C.cream, border: `1px solid ${C.sand}`,
                        borderRadius: '10px', padding: '0.9rem 1.1rem', alignItems: 'flex-start',
                      }}>
                        <div style={{ flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.gold, marginTop: '0.5rem' }} />
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: C.dark, marginBottom: '0.2rem' }}>{perf.name}</div>
                          <div style={{ fontSize: '0.82rem', color: C.textMuted, lineHeight: 1.5 }}>{perf.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

        </div>{/* end padding wrapper */}
      </div>

      {/* ── ÄHNLICHE DÜFTE – immer sichtbar, unter den Tabs ──────────────────── */}
      {similarPerfumes.length > 0 && (() => {
        const seen = new Set<string>();
        const unique = similarPerfumes.filter(p => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        }).slice(0, 8);

        return (
          <section style={{ marginBottom: '2.5rem', padding: '0 0' }}>
            <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
              <SectionHeading>Das könnte dir auch gefallen</SectionHeading>
            </div>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              paddingBottom: '0.75rem',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}>
              {unique.map((perfume) => (
                <Link
                  key={perfume.id}
                  href={`/duft/${perfume.slug}`}
                  style={{
                    display: 'block',
                    flexShrink: 0,
                    width: '130px',
                    padding: '0.85rem',
                    backgroundColor: C.cream,
                    borderRadius: '12px',
                    border: `1px solid ${C.sand}`,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 6px 20px rgba(212,175,55,0.22)`;
                    e.currentTarget.style.borderColor = C.gold;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = C.sand;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {perfume.image_url ? (
                    <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.6rem', backgroundColor: C.creamDark }}>
                      <Image
                        src={perfume.image_url}
                        alt={perfume.perfume_name}
                        width={130}
                        height={130}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '8px', backgroundColor: C.creamDark, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                      🌸
                    </div>
                  )}
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: C.dark, marginBottom: '0.15rem', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>{perfume.perfume_name}</div>
                  <div style={{ fontSize: '0.68rem', color: C.goldMuted, fontWeight: '600', marginBottom: '0.25rem' }}>{perfume.brands?.name}</div>
                  {perfume.price_chf && (
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: C.gold }}>CHF {perfume.price_chf}</div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: `1px solid ${C.sand}`, margin: '0 1rem' }}>
        <button
          onClick={onNewSearch}
          style={{
            padding: '14px 40px', borderRadius: '10px',
            border: `2px solid ${C.gold}`, backgroundColor: C.gold,
            color: C.dark, fontSize: '1rem', fontWeight: '700',
            cursor: 'pointer', fontFamily: "'Inter', sans-serif",
            boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(212,175,55,0.45)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(212,175,55,0.3)';
          }}
        >
          🔍 Neuen Duft analysieren
        </button>
        <p style={{ fontSize: '0.82rem', color: C.textLight, marginTop: '0.65rem' }}>
          Ein anderes Parfüm fotografieren?
        </p>
      </div>

      {/* ── BACK TO TOP ──────────────────────────────────────────────────────── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: '5.5rem', right: '1.25rem',
            width: '44px', height: '44px', borderRadius: '50%',
            backgroundColor: C.gold, border: 'none', color: C.dark,
            fontSize: '1.1rem', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(212,175,55,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 200, fontWeight: '700', transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          title="Nach oben"
        >
          ↑
        </button>
      )}

    </div>
  );
}
