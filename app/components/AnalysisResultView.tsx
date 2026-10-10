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

const TAB_LABELS: Record<TabId, string> = {
  profil:  'Profil',
  noten:   'Noten',
  analyse: 'Analyse',
  kaufen:  'Kaufen',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: '1.5rem',
    fontFamily: "'Playfair Display', serif",
    color: C.dark,
    marginBottom: '1.1rem',
    marginTop: 0,
    borderBottom: `2px solid ${C.sand}`,
    paddingBottom: '0.5rem',
  }}>
    {children}
  </h2>
);

const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    backgroundColor: C.cream,
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    border: `1px solid ${C.sand}`,
    ...style,
  }}>
    {children}
  </div>
);

const BarRow = ({ label, value, max = 10, suffix = '/10' }: { label: string; value?: number; max?: number; suffix?: string }) => {
  if (!value) return null;
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: C.text }}>{label}</span>
        <span style={{ fontSize: '0.85rem', color: C.textLight, fontVariantNumeric: 'tabular-nums' }}>
          {value}{suffix}
        </span>
      </div>
      <div style={{ height: '6px', backgroundColor: C.sand, borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${C.goldMuted}, ${C.gold})`, borderRadius: '4px', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
};

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    backgroundColor: C.creamDark,
    color: C.text,
    border: `1px solid ${C.sand}`,
    padding: '0.3rem 0.85rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
  }}>
    {children}
  </span>
);

const NoteList = ({ notes }: { notes: string[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.6rem' }}>
    {notes.length > 0
      ? notes.map((n, i) => (
          <span key={i} style={{ fontSize: '0.82rem', color: C.text, display: 'flex', alignItems: 'flex-start', gap: '0.3rem', lineHeight: '1.4', overflowWrap: 'break-word', hyphens: 'none' }}>
            <span style={{ flexShrink: 0, color: C.gold, fontWeight: '700' }}>·</span>
            <span>{n}</span>
          </span>
        ))
      : <span style={{ fontSize: '0.85rem', color: C.textLight, fontStyle: 'italic' }}>Keine Daten</span>
    }
  </div>
);

// Sternebewertung
const StarRating = ({ rating }: { rating: number }) => {
  const stars = Math.round(rating / 2); // 1–10 → 1–5 Sterne
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', marginTop: '0.75rem', marginBottom: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{
          fontSize: '1.3rem',
          color: s <= stars ? C.gold : 'rgba(212,175,55,0.25)',
          filter: s <= stars ? 'drop-shadow(0 0 4px rgba(212,175,55,0.5))' : 'none',
        }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: '0.78rem', color: 'rgba(212,175,55,0.6)', marginLeft: '0.4rem' }}>
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      zIndex: 9999,
      backgroundColor: 'transparent',
    }}>
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

// ─── Confidence Ring (verbesserte Confidence-Anzeige) ───────────────────────

interface ConfidenceRingProps {
  confidence: 'high' | 'medium' | 'low';
  dbMatch: boolean;
}

const ConfidenceRing = ({ confidence, dbMatch }: ConfidenceRingProps) => {
  if (dbMatch) return null; // DB-Match zeigt anderen Badge

  const config = {
    high:   { pct: 92, color: '#4caf50', label: 'Hohe Konfidenz',    sublabel: '~92% sicher' },
    medium: { pct: 68, color: '#ff9800', label: 'Mittlere Konfidenz', sublabel: '~68% sicher' },
    low:    { pct: 35, color: '#f44336', label: 'Niedrige Konfidenz', sublabel: '~35% sicher' },
  }[confidence];

  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (config.pct / 100) * circ;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
      <svg width="58" height="58" style={{ flexShrink: 0 }}>
        {/* Track */}
        <circle cx="29" cy="29" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
        {/* Progress */}
        <circle
          cx="29" cy="29" r={r}
          fill="none"
          stroke={config.color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          style={{ filter: `drop-shadow(0 0 4px ${config.color}80)` }}
        />
        <text x="29" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="Inter, sans-serif">
          {config.pct}%
        </text>
      </svg>
      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'rgba(255,255,255,0.9)' }}>{config.label}</div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)' }}>{config.sublabel}</div>
      </div>
    </div>
  );
};

// ─── Instagram Share Card Generator ─────────────────────────────────────────

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

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#1a1108');
    grad.addColorStop(0.5, '#2a1d12');
    grad.addColorStop(1, '#3a2518');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Subtle texture dots
    ctx.save();
    for (let i = 0; i < 120; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1080, Math.random() * 1080, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${Math.random() * 0.08 + 0.02})`;
      ctx.fill();
    }
    ctx.restore();

    // If uploaded image, draw it faded at top
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
        // Draw centered, cropped to square top portion
        const s = Math.max(1080 / img.width, 560 / img.height);
        const dw = img.width * s, dh = img.height * s;
        ctx.drawImage(img, (1080 - dw) / 2, 0, dw, dh);
        // Gradient overlay to fade out
        const fadeGrad = ctx.createLinearGradient(0, 300, 0, 560);
        fadeGrad.addColorStop(0, 'rgba(26,17,8,0)');
        fadeGrad.addColorStop(1, 'rgba(26,17,8,1)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = fadeGrad;
        ctx.fillRect(0, 0, 1080, 560);
        ctx.restore();
      } catch { /* skip image */ }
    }

    // Gold border frame
    ctx.save();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(28, 28, 1024, 1024);
    // Inner thin border
    ctx.strokeStyle = 'rgba(212,175,55,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, 1008, 1008);
    ctx.restore();

    // AURESSA wordmark top
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

    // Decorative gold line
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(200, 140); ctx.lineTo(880, 140);
    ctx.strokeStyle = 'rgba(212,175,55,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // Confidence badge
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

    // Perfume name — large
    ctx.save();
    ctx.fillStyle = '#f9f6f1';
    ctx.textAlign = 'center';
    const nameFontSize = name.length > 20 ? 72 : name.length > 14 ? 86 : 96;
    ctx.font = `700 ${nameFontSize}px 'Georgia', serif`;
    // Word wrap if needed
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

    // Brand name
    ctx.save();
    ctx.fillStyle = '#d4af37';
    ctx.font = '600 42px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    const brandY = name.split(' ').length > 2 ? 560 : 490;
    ctx.fillText(brand, 540, brandY);
    ctx.restore();

    // Divider
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(340, brandY + 30); ctx.lineTo(740, brandY + 30);
    ctx.strokeStyle = 'rgba(212,175,55,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // Family & notes
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

    // Bottom CTA
    ctx.save();
    ctx.fillStyle = 'rgba(212,175,55,0.55)';
    ctx.font = '400 22px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('auressa.ch/duft-scanner', 540, 990);
    ctx.restore();

    // Download
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

// ─── Teilen-Button ───────────────────────────────────────────────────────────
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
    } catch {
      // Fallback
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
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
  const tabs: TabId[] = ['profil', 'noten', 'analyse', 'kaufen'];

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      gap: 0,
      marginBottom: '1.75rem',
      background: C.cream,
      borderBottom: `2px solid ${C.sand}`,
      borderRadius: '12px 12px 0 0',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(42,29,18,0.08)',
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              // Scroll zum Tab-Inhalt
              setTimeout(() => {
                tabContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 10);
            }}
            style={{
              flex: 1,
              padding: '0.85rem 0.5rem',
              border: 'none',
              borderBottom: isActive ? `3px solid ${C.gold}` : '3px solid transparent',
              background: isActive ? `linear-gradient(180deg, #fff 0%, ${C.cream} 100%)` : 'transparent',
              color: isActive ? C.dark : C.textMuted,
              fontWeight: isActive ? '700' : '500',
              fontSize: '0.82rem',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.02em',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = C.creamDark;
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            {TAB_LABELS[tab]}
          </button>
        );
      })}
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

  // DB-Daten bevorzugen wenn verfügbar
  const displayName = dbMatch?.perfume_name || currentAnalysis.perfumeName;
  const displayBrand = dbMatch?.brands?.name || currentAnalysis.brandName;

  // Noten: DB bevorzugen (saubere kuratierte Daten), sonst KI-Analyse
  const displayNotes = dbMatch
    ? {
        top: (dbMatch.top_notes && dbMatch.top_notes.length > 0) ? dbMatch.top_notes : currentAnalysis.notes.top,
        heart: (dbMatch.heart_notes && dbMatch.heart_notes.length > 0) ? dbMatch.heart_notes : currentAnalysis.notes.heart,
        base: (dbMatch.base_notes && dbMatch.base_notes.length > 0) ? dbMatch.base_notes : currentAnalysis.notes.base,
      }
    : currentAnalysis.notes;

  // Beschreibungstext: DB bevorzugen
  const displayDescription = dbMatch?.description || currentAnalysis.poeticDescription || currentAnalysis.generalDescription;

  // Bild: DB bevorzugen, dann hochgeladenes Scan-Bild als Fallback
  const displayImage = dbMatch?.image_url || null;
  const heroImage = displayImage || uploadedImage || null;

  // Geschlecht: DB bevorzugen
  const dbGender = dbMatch?.gender;
  const displayGender = dbGender === 'Women' ? 'Damen' : dbGender === 'Men' ? 'Herren' : dbGender === 'Unisex' ? 'Unisex' : null;
  const genderLabel = displayGender || (currentAnalysis.gender === 'woman' ? 'Damen' : currentAnalysis.gender === 'man' ? 'Herren' : 'Unisex');

  // Preis & Affiliate
  const buyUrl = dbMatch?.affiliate_url || `https://www.notino.ch/suche/?q=${encodeURIComponent(`${displayBrand} ${displayName}`)}`;
  const flaconiUrl = `https://www.flaconi.ch/suche/?q=${encodeURIComponent(`${displayBrand} ${displayName}`)}`;

  const confidenceLabel = dbMatch ? 'In Auressa-DB gefunden' : currentAnalysis.confidence === 'high' ? 'Hohe Konfidenz' : currentAnalysis.confidence === 'medium' ? 'Mittlere Konfidenz' : 'Niedrige Konfidenz';

  // Intensität
  const intensityInfo = currentAnalysis.intensity ? intensityMap[currentAnalysis.intensity] : null;

  // Entwicklung (Opening → Middle → Drydown)
  const hasDevelopment = currentAnalysis.development &&
    (currentAnalysis.development.opening || currentAnalysis.development.middleGame || currentAnalysis.development.drydown);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>

      {/* ── SCROLL-FORTSCHRITTSBALKEN ────────────────────────────────────── */}
      <ScrollProgressBar />

      {/* ── KORREKTUR-BANNER ─────────────────────────────────────────────── */}
      <ScanCorrectionBanner
        analysis={currentAnalysis}
        onCorrected={(updated) => setCurrentAnalysis(updated)}
      />

      {/* ── KONFIDENZ-WARNUNG (nur wenn kein DB-Match + niedrige/mittlere KI-Konfidenz) ── */}
      {!dbMatch && (currentAnalysis.confidence === 'low' || currentAnalysis.confidence === 'medium') && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
          backgroundColor: currentAnalysis.confidence === 'low' ? '#fff8e6' : '#fffbf0',
          border: `1px solid ${currentAnalysis.confidence === 'low' ? '#f5c842' : '#e8d875'}`,
          borderLeft: `4px solid ${currentAnalysis.confidence === 'low' ? '#d4a017' : '#c9b848'}`,
          borderRadius: '10px',
          padding: '0.9rem 1.1rem',
          marginBottom: '1.25rem',
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

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(160deg, #1a1108 0%, ${C.dark} 55%, #3a2518 100%)`,
        color: C.cream,
        borderRadius: '16px',
        marginBottom: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(42,29,18,0.22)',
      }}>
        {/* Bild oben wenn vorhanden (DB-Bild oder hochgeladenes Scan-Bild) */}
        {heroImage && (
          <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage.startsWith('data:') ? heroImage : heroImage}
              alt={`${displayName} von ${displayBrand}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: uploadedImage && !displayImage ? 0.55 : 0.75 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #1a1108 100%)' }} />
            {/* Label wenn Scan-Bild (kein DB-Bild) */}
            {uploadedImage && !displayImage && (
              <div style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                backgroundColor: 'rgba(42,29,18,0.75)', backdropFilter: 'blur(4px)',
                color: 'rgba(212,175,55,0.9)', fontSize: '0.68rem', fontWeight: '700',
                letterSpacing: '0.05em', padding: '0.2rem 0.6rem', borderRadius: '10px',
                border: '1px solid rgba(212,175,55,0.3)',
              }}>
                📸 Dein Scan
              </div>
            )}
          </div>
        )}

        <div style={{ padding: heroImage ? '0 2rem 2.5rem' : '3rem 2rem 2.5rem', textAlign: 'center' }}>
          {/* Badge / Confidence Ring */}
          <div style={{ marginBottom: '1rem' }}>
            {dbMatch ? (
              <span style={{
                backgroundColor: C.gold,
                color: C.dark,
                padding: '0.28rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {confidenceLabel}
              </span>
            ) : (
              <ConfidenceRing confidence={currentAnalysis.confidence as 'high' | 'medium' | 'low'} dbMatch={false} />
            )}
          </div>

          {/* Name & Marke */}
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            margin: '0 0 0.3rem',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: C.cream,
          }}>
            {displayName}
          </h1>
          <p style={{ fontSize: '1.15rem', color: C.gold, marginBottom: '0.4rem', fontWeight: '600' }}>
            {displayBrand}
          </p>

          {/* Meta-Zeile: Jahr · Konzentration */}
          {(currentAnalysis.year || currentAnalysis.concentration) && (
            <p style={{ fontSize: '0.82rem', color: 'rgba(212,175,55,0.6)', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
              {[currentAnalysis.year && `seit ${currentAnalysis.year}`, currentAnalysis.concentration].filter(Boolean).join(' · ')}
            </p>
          )}

          <p style={{ fontSize: '0.75rem', color: 'rgba(212,175,55,0.55)', marginBottom: '1rem', letterSpacing: '0.03em' }}>
            {dbMatch ? '✓ Verifizierte Daten aus Auressa-Datenbank' : '🤖 KI-Erkennung – Angaben sind Schätzungen'}
          </p>

          {/* Sternebewertung — nur wenn DB-Match, sonst irreführend */}
          {dbMatch && currentAnalysis.rating && currentAnalysis.rating > 0 && (
            <StarRating rating={currentAnalysis.rating} />
          )}

          {/* Beschreibung — kürzer & besser lesbar */}
          {displayDescription && (
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'rgba(249,246,241,0.8)',
              maxWidth: '500px',
              margin: '0.75rem auto 0',
              fontStyle: 'italic',
            }}>
              {displayDescription}
            </p>
          )}

          {/* Teilen-Button im Hero */}
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
      </section>

      {/* ── STICKY TAB NAVIGATION ────────────────────────────────────────── */}
      <StickyTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabContentRef={tabContentRef}
      />

      {/* ── TAB CONTENT ──────────────────────────────────────────────────── */}
      <div ref={tabContentRef}>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB: PROFIL                                                      */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'profil' && (
          <>
            {/* ── STECKBRIEF ────────────────────────────────────────────── */}
            <section style={{ marginBottom: '2.5rem' }}>
              <SectionHeading>Steckbrief</SectionHeading>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
                {[
                  currentAnalysis.concentration && { icon: '🧴', label: 'Konzentration', value: currentAnalysis.concentration, estimated: !dbMatch },
                  currentAnalysis.family && { icon: '🌸', label: 'Duftfamilie', value: currentAnalysis.family, estimated: !dbMatch },
                  { icon: '👥', label: 'Geschlecht', value: genderLabel, estimated: !dbMatch },
                  currentAnalysis.origin && { icon: '🌍', label: 'Herkunft', value: currentAnalysis.origin, estimated: !dbMatch },
                  currentAnalysis.year && { icon: '📅', label: 'Jahr', value: String(currentAnalysis.year), estimated: !dbMatch },
                  currentAnalysis.parfumeur && { icon: '👃', label: 'Parfümeur', value: currentAnalysis.parfumeur, estimated: !dbMatch },
                  dbMatch?.price_chf && { icon: '💰', label: 'Preis (CH)', value: `CHF ${dbMatch.price_chf}`, estimated: false },
                  dbMatch?.season && { icon: '🍂', label: 'Saison', value: dbMatch.season, estimated: false },
                  currentAnalysis.bottleDescription && { icon: '🫙', label: 'Flakon', value: currentAnalysis.bottleDescription, estimated: false },
                  intensityInfo && { icon: intensityInfo.emoji, label: 'Intensität', value: intensityInfo.label, estimated: !dbMatch },
                ].filter(Boolean).map((item) => {
                  const it = item as { icon: string; label: string; value: string; estimated: boolean };
                  return (
                    <div key={it.label} style={{
                      backgroundColor: C.cream,
                      border: `1px solid ${it.estimated ? '#e0d0b0' : C.sand}`,
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      display: 'flex', flexDirection: 'column', gap: '0.25rem',
                      gridColumn: it.label === 'Flakon' ? 'span 2' : undefined,
                    }}>
                      <div style={{ fontSize: '0.7rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {it.icon} {it.label}
                        {it.estimated && (
                          <span style={{ marginLeft: '0.3rem', fontSize: '0.6rem', color: '#a08040', fontWeight: '600', letterSpacing: '0.02em', textTransform: 'none' }}>
                            (KI)
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: C.dark, fontWeight: '600' }}>{it.value}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── CHARAKTER & PERSÖNLICHKEIT ────────────────────────────── */}
            {(currentAnalysis.characterTags || currentAnalysis.personalityType || currentAnalysis.mood) && (
              <section style={{ marginBottom: '2.5rem' }}>
                <SectionHeading>Charakter & Persönlichkeit</SectionHeading>
                <div style={{
                  background: `linear-gradient(135deg, ${C.dark} 0%, #3a2518 100%)`,
                  color: C.cream,
                  padding: '1.75rem 2rem',
                  borderRadius: '14px',
                }}>
                  {currentAnalysis.personalityType && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.72rem', color: C.gold, fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Persönlichkeitstyp</div>
                      <p style={{ fontSize: '1rem', color: C.cream, margin: 0, lineHeight: 1.5 }}>{currentAnalysis.personalityType}</p>
                    </div>
                  )}
                  {currentAnalysis.mood && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.72rem', color: C.gold, fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Stimmung</div>
                      <p style={{ fontSize: '1rem', color: C.cream, margin: 0 }}>{currentAnalysis.mood}</p>
                    </div>
                  )}
                  {currentAnalysis.characterTags && currentAnalysis.characterTags.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.72rem', color: C.gold, fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Charakter-Tags</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {currentAnalysis.characterTags.map((tag, i) => {
                          const tagSlug = tag.toLowerCase().replace(/[äöü]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue' }[c] || c)).replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                          return (
                            <Link key={i} href={`/tag/${tagSlug}`} style={{
                              backgroundColor: 'rgba(212,175,55,0.18)',
                              border: `1px solid rgba(212,175,55,0.45)`,
                              color: C.gold,
                              padding: '0.28rem 0.8rem',
                              borderRadius: '20px',
                              fontSize: '0.82rem',
                              fontWeight: '500',
                              textDecoration: 'none',
                              display: 'inline-block',
                              transition: 'background 0.15s ease',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212,175,55,0.35)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212,175,55,0.18)'; }}
                            >
                              #{tag}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ── WANN TRAGEN ───────────────────────────────────────────── */}
            {(currentAnalysis.seasonRecommendation || currentAnalysis.occasionList?.length || currentAnalysis.climate?.length) && (
              <section style={{ marginBottom: '2.5rem' }}>
                <SectionHeading>Wann tragen?</SectionHeading>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                  {currentAnalysis.seasonRecommendation && (
                    <Card>
                      <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>🍂 Saison</div>
                      <p style={{ fontSize: '1rem', color: C.dark, margin: 0, fontWeight: '500' }}>{currentAnalysis.seasonRecommendation}</p>
                    </Card>
                  )}
                  {currentAnalysis.occasionList && currentAnalysis.occasionList.length > 0 && (
                    <Card>
                      <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>🎯 Anlässe</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {currentAnalysis.occasionList.map((o, i) => <Pill key={i}>{o}</Pill>)}
                      </div>
                    </Card>
                  )}
                  {currentAnalysis.climate && currentAnalysis.climate.length > 0 && (
                    <Card>
                      <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>🌡️ Klima</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {currentAnalysis.climate.map((c, i) => <Pill key={i}>{c}</Pill>)}
                      </div>
                    </Card>
                  )}
                </div>
              </section>
            )}

            {/* ── DER PERFEKTE MOMENT ───────────────────────────────────── */}
            {currentAnalysis.perfectMoment && (
              <section style={{ marginBottom: '2.5rem' }}>
                <SectionHeading>Der perfekte Moment</SectionHeading>
                <div style={{
                  background: `linear-gradient(135deg, #fdf7e8, #fef9ee)`,
                  border: `1px solid #f0e0a0`,
                  borderLeft: `4px solid ${C.gold}`,
                  borderRadius: '10px',
                  padding: '1.5rem 1.75rem',
                }}>
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: C.dark, margin: 0, fontStyle: 'italic' }}>
                    ✨ {currentAnalysis.perfectMoment}
                  </p>
                </div>
              </section>
            )}
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB: NOTEN                                                       */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'noten' && (
          <>
            {/* ── DUFTPYRAMIDE ──────────────────────────────────────────── */}
            <section style={{ marginBottom: '2.5rem' }}>
              <SectionHeading>Duftpyramide</SectionHeading>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.6rem' }}>
                {[
                  { label: 'Kopf', emoji: '✨', notes: displayNotes.top },
                  { label: 'Herz', emoji: '🌸', notes: displayNotes.heart },
                  { label: 'Basis', emoji: '🌿', notes: displayNotes.base },
                ].map(({ label, emoji, notes }) => (
                  <div key={label} style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${C.sand}`,
                    borderRadius: '12px',
                    padding: '0.85rem 0.5rem',
                    borderTop: `3px solid ${C.gold}`,
                    minWidth: 0,
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '1rem', lineHeight: 1 }}>{emoji}</div>
                      <div style={{ fontSize: '0.65rem', fontWeight: '700', color: C.gold, marginTop: '0.2rem' }}>{label}</div>
                    </div>
                    <NoteList notes={notes} />
                  </div>
                ))}
              </div>
            </section>

            {/* ── ENTWICKLUNG ───────────────────────────────────────────── */}
            {hasDevelopment && (
              <section style={{ marginBottom: '2.5rem' }}>
                <SectionHeading>Entwicklung auf der Haut</SectionHeading>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0' }}>
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
                          position: 'absolute',
                          right: '-10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 1,
                          width: '20px',
                          height: '20px',
                          backgroundColor: C.gold,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.65rem',
                          color: C.dark,
                          fontWeight: '700',
                          boxShadow: `0 0 0 3px ${C.cream}`,
                        }}>
                          →
                        </div>
                      )}
                      <div style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{stage.icon}</div>
                      <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.15rem' }}>
                        {stage.label}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: C.textLight, marginBottom: '0.5rem' }}>{stage.subtitle}</div>
                      <p style={{ fontSize: '0.88rem', color: C.text, margin: 0, lineHeight: 1.65 }}>{stage.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── DUFTREISE ─────────────────────────────────────────────── */}
            {currentAnalysis.duftJourney && Object.values(currentAnalysis.duftJourney).some(v => v) && (
              <section style={{ marginBottom: '2.5rem' }}>
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
                      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: C.goldMuted, marginBottom: '0.5rem' }}>
                        {icon} {label}
                      </div>
                      <p style={{ fontSize: '0.88rem', color: C.text, margin: 0, lineHeight: 1.6 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB: ANALYSE                                                     */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'analyse' && (
          <>
            {/* ── BEWERTUNGEN + DNA ─────────────────────────────────────── */}
            <section style={{ marginBottom: '2.5rem' }}>
              <SectionHeading>Bewertungen & Duft-DNA</SectionHeading>
              {!dbMatch && (
                <p style={{ fontSize: '0.78rem', color: '#a08040', marginBottom: '1rem', fontStyle: 'italic' }}>
                  🤖 Diese Werte sind KI-Schätzungen und können von der Realität abweichen.
                </p>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {(currentAnalysis.longevity || currentAnalysis.sillage || currentAnalysis.projection || currentAnalysis.uniqueness || currentAnalysis.priceValue) && (
                  <Card>
                    <div style={{ fontSize: '0.75rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Performance</div>
                    <BarRow label="Haltbarkeit" value={currentAnalysis.longevity} />
                    <BarRow label="Sillage" value={currentAnalysis.sillage} />
                    <BarRow label="Projektion" value={currentAnalysis.projection} />
                    <BarRow label="Einzigartigkeit" value={currentAnalysis.uniqueness} />
                    <BarRow label="Preis-Leistung" value={currentAnalysis.priceValue} />
                  </Card>
                )}
                {currentAnalysis.duftDNA && Object.values(currentAnalysis.duftDNA).some(v => v !== undefined) && (
                  <Card>
                    <div style={{ fontSize: '0.75rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Duft-DNA</div>
                    <BarRow label="Blumig" value={currentAnalysis.duftDNA.blumig} max={100} suffix="%" />
                    <BarRow label="Frisch" value={currentAnalysis.duftDNA.frisch} max={100} suffix="%" />
                    <BarRow label="Süss" value={currentAnalysis.duftDNA.süss} max={100} suffix="%" />
                    <BarRow label="Holzig" value={currentAnalysis.duftDNA.holzig} max={100} suffix="%" />
                    <BarRow label="Würzig" value={currentAnalysis.duftDNA.würzig} max={100} suffix="%" />
                  </Card>
                )}
              </div>
            </section>

            {/* ── VERGLEICH MIT BEKANNTEN DÜFTEN ────────────────────────── */}
            {currentAnalysis.comparisonPerfumes && currentAnalysis.comparisonPerfumes.length > 0 && (
              <section style={{ marginBottom: '2.5rem' }}>
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

            {/* ── FUN FACTS & GESCHICHTE ────────────────────────────────── */}
            {(currentAnalysis.history || (currentAnalysis.funFacts && currentAnalysis.funFacts.length > 0) || (currentAnalysis.famouswearers && currentAnalysis.famouswearers.length > 0)) && (
              <section style={{ marginBottom: '2.5rem' }}>
                <SectionHeading>Geschichte & Wissenswertes</SectionHeading>
                <Card>
                  {currentAnalysis.history && (
                    <div style={{ marginBottom: currentAnalysis.funFacts?.length ? '1.5rem' : 0 }}>
                      <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>📖 Geschichte</div>
                      <p style={{ fontSize: '0.93rem', color: C.textMuted, lineHeight: 1.75, margin: 0 }}>{currentAnalysis.history}</p>
                    </div>
                  )}
                  {currentAnalysis.famouswearers && currentAnalysis.famouswearers.length > 0 && (
                    <div style={{ marginBottom: currentAnalysis.funFacts?.length ? '1.5rem' : 0 }}>
                      <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>⭐ Bekannte Fans</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {currentAnalysis.famouswearers.map((w, i) => <Pill key={i}>{w}</Pill>)}
                      </div>
                    </div>
                  )}
                  {currentAnalysis.funFacts && currentAnalysis.funFacts.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>💡 Interessantes</div>
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
                </Card>
              </section>
            )}
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB: KAUFEN                                                      */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'kaufen' && (
          <>
            {/* ── AFFILIATE CTA (gross) ─────────────────────────────────── */}
            <section style={{ marginBottom: '2.5rem' }}>
              <SectionHeading>Duft kaufen</SectionHeading>

              {/* Preis: DB-Preis bevorzugen, sonst KI-Schätzung */}
              {(dbMatch?.price_chf || currentAnalysis.estimatedPrice) && (
                <div style={{
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  padding: '1.25rem',
                  background: `linear-gradient(135deg, #fdf7e8, #fef9ee)`,
                  borderRadius: '12px',
                  border: `1px solid #f0e0a0`,
                }}>
                  {dbMatch?.price_chf ? (
                    <>
                      <div style={{ fontSize: '0.75rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preis</div>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: C.dark, fontFamily: "'Playfair Display', serif" }}>
                        CHF {dbMatch.price_chf}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '0.75rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>KI-Preisschätzung 🤖</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: '800', color: C.dark, fontFamily: "'Playfair Display', serif" }}>
                        {currentAnalysis.estimatedPrice}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: C.textLight, marginTop: '0.3rem' }}>
                        Geschätzter Schweizer Marktpreis – Preise können variieren.
                      </div>
                    </>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a href={buyUrl} target="_blank" rel="sponsored noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.1rem 1.5rem', borderRadius: '12px',
                  backgroundColor: C.gold, color: C.dark,
                  fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
                }}>
                  <span>🛍️ Bei Notino kaufen</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.75 }}>→</span>
                </a>
                <a href={flaconiUrl} target="_blank" rel="sponsored noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.1rem 1.5rem', borderRadius: '12px',
                  backgroundColor: 'transparent', border: `2px solid ${C.gold}`,
                  color: C.dark, fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
                }}>
                  <span>🔍 Bei Flaconi ansehen</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.75 }}>→</span>
                </a>
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.72rem', color: C.textLight, marginTop: '1rem' }}>
                * Affiliate-Links – du zahlst nichts extra, wir erhalten eine kleine Provision.
              </p>
            </section>

            {/* ── ÄHNLICHE DÜFTE AUS AURESSA ────────────────────────────── */}
            {similarPerfumes.length > 0 && (
              <section style={{ marginBottom: '2.5rem' }}>
                <SectionHeading>Ähnliche Düfte aus Auressa</SectionHeading>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                  {similarPerfumes.map((perfume) => (
                    <Link
                      key={perfume.id}
                      href={`/duft/${perfume.slug}`}
                      style={{
                        display: 'block', padding: '1.1rem',
                        backgroundColor: C.cream, borderRadius: '12px',
                        border: `1px solid ${C.sand}`, textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 4px 16px rgba(212,175,55,0.2)`;
                        e.currentTarget.style.borderColor = C.gold;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = C.sand;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {perfume.image_url && (
                        <div style={{ width: '100%', height: '90px', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem', backgroundColor: C.creamDark }}>
                          <Image
                            src={perfume.image_url}
                            alt={perfume.perfume_name}
                            width={200}
                            height={90}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            unoptimized
                          />
                        </div>
                      )}
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: C.dark, marginBottom: '0.25rem', lineHeight: 1.3 }}>{perfume.perfume_name}</div>
                      <div style={{ fontSize: '0.8rem', color: C.goldMuted, fontWeight: '600', marginBottom: '0.45rem' }}>{perfume.brands?.name}</div>
                      {perfume.fragrance_family && (
                        <div style={{ fontSize: '0.75rem', color: C.textLight, marginBottom: '0.35rem' }}>{perfume.fragrance_family}</div>
                      )}
                      {perfume.price_chf && (
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: C.gold }}>CHF {perfume.price_chf}</div>
                      )}
                      <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: C.goldMuted, fontWeight: '600' }}>
                        Zum Duft →
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ── KI-EMPFEHLUNGEN ───────────────────────────────────────── */}
            {currentAnalysis.similarPerfumes && currentAnalysis.similarPerfumes.length > 0 && (
              <section style={{ marginBottom: '2.5rem' }}>
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

      </div>{/* end tabContentRef div */}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: `1px solid ${C.sand}` }}>
        <button
          onClick={onNewSearch}
          style={{
            padding: '13px 36px', borderRadius: '8px',
            border: `2px solid ${C.gold}`, backgroundColor: C.gold,
            color: C.dark, fontSize: '1rem', fontWeight: '700',
            cursor: 'pointer', fontFamily: "'Inter', sans-serif",
          }}
        >
          🔍 Neuen Duft analysieren
        </button>
        <p style={{ fontSize: '0.82rem', color: C.textLight, marginTop: '0.65rem' }}>
          Ein anderes Parfüm fotografieren?
        </p>
      </div>

      {/* ── BACK TO TOP BUTTON ───────────────────────────────────────────── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.25rem',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: C.gold,
            border: 'none',
            color: C.dark,
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(212,175,55,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            fontWeight: '700',
            transition: 'transform 0.15s ease',
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
