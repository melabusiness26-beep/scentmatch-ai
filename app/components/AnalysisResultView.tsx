'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';
import { type PerfumeMatch } from '@/lib/analysis-matcher';
import ScanCorrectionBanner from './ScanCorrectionBanner';

interface AnalysisResultViewProps {
  analysis: ImageAnalysisResult['data'];
  similarPerfumes: Perfume[];
  onNewSearch: () => void;
  dbMatch?: Perfume | null;
  dbMatches?: PerfumeMatch[];
  onSelectDbMatch?: (perfume: Perfume) => void;
}

// ─── Design Tokens (Premium Palette) ───────────────────────────────────────────
const C = {
  dark: '#1a1108',
  darkText: '#2a1d12',
  gold: '#d4af37',
  goldLight: '#e8c84a',
  goldMuted: '#b08b4f',
  goldSoft: 'rgba(212, 175, 55, 0.12)',
  cream: '#f9f6f1',
  creamDark: '#f0ebe1',
  sand: '#e8dcc8',
  text: '#3d2e22',
  textMuted: '#7a6a5e',
  textLight: '#9a8a7e',
  journeyBg: '#fdf7e8',
  heroBg: '#1a1108',
  shadowSm: '0 2px 8px rgba(0, 0, 0, 0.08)',
  shadowMd: '0 4px 16px rgba(0, 0, 0, 0.12)',
  shadowLg: '0 12px 32px rgba(0, 0, 0, 0.15)',
  shadowXl: '0 20px 48px rgba(0, 0, 0, 0.18)',
} as const;

type Tab = 'profil' | 'noten' | 'erlebnis' | 'kaufen';

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: '1.5rem',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    color: C.darkText,
    marginBottom: '1.5rem',
    marginTop: '2.5rem',
    paddingBottom: '0.75rem',
    borderBottom: `3px solid ${C.gold}`,
    background: `linear-gradient(90deg, ${C.darkText} 0%, ${C.goldMuted} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}>
    {children}
  </h2>
);

const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    backgroundColor: C.cream,
    borderRadius: '16px',
    padding: '1.75rem 2rem',
    border: `1px solid ${C.sand}`,
    boxShadow: C.shadowMd,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...style,
  }}
  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = C.shadowLg; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = C.shadowMd; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
    {children}
  </div>
);

const BarRow = ({ label, value, max = 10, suffix = '/10' }: { label: string; value?: number; max?: number; suffix?: string }) => {
  if (!value) return null;
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.95rem', fontWeight: '600', color: C.darkText, letterSpacing: '0.3px' }}>{label}</span>
        <span style={{ fontSize: '0.9rem', color: C.gold, fontVariantNumeric: 'tabular-nums', fontWeight: '700' }}>
          {value}{suffix}
        </span>
      </div>
      <div style={{ height: '8px', backgroundColor: C.sand, borderRadius: '6px', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${C.goldMuted} 0%, ${C.gold} 100%)`, borderRadius: '6px', transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `0 0 12px rgba(212, 175, 55, 0.4)` }} />
      </div>
    </div>
  );
};

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    backgroundColor: C.goldSoft,
    color: C.darkText,
    border: `1.5px solid ${C.gold}`,
    padding: '0.45rem 1rem',
    borderRadius: '24px',
    fontSize: '0.9rem',
    fontWeight: '600',
    display: 'inline-block',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  }}
  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.gold; (e.currentTarget as HTMLElement).style.color = C.dark; }}
  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = C.goldSoft; (e.currentTarget as HTMLElement).style.color = C.darkText; }}>
    {children}
  </span>
);

const NoteList = ({ notes }: { notes: string[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.6rem' }}>
    {notes.length > 0
      ? notes.map((n, i) => (
          <span key={i} style={{ fontSize: '0.82rem', color: C.text, display: 'flex', alignItems: 'flex-start', gap: '0.3rem', lineHeight: '1.4', overflowWrap: 'break-word' }}>
            <span style={{ flexShrink: 0, color: C.gold, fontWeight: '700' }}>·</span>
            <span>{n}</span>
          </span>
        ))
      : <span style={{ fontSize: '0.85rem', color: C.textLight, fontStyle: 'italic' }}>Keine Daten</span>
    }
  </div>
);

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Math.round(rating / 2);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', marginTop: '0.75rem', marginBottom: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{
          fontSize: '1.3rem',
          color: s <= stars ? C.gold : 'rgba(212,175,55,0.25)',
          filter: s <= stars ? 'drop-shadow(0 0 4px rgba(212,175,55,0.5))' : 'none',
        }}>★</span>
      ))}
      <span style={{ fontSize: '0.78rem', color: 'rgba(212,175,55,0.6)', marginLeft: '0.4rem' }}>
        {rating.toFixed(1)}/10
      </span>
    </div>
  );
};

const intensityMap: Record<string, { label: string; emoji: string }> = {
  very_light: { label: 'Sehr leicht', emoji: '🌬️' },
  light:       { label: 'Leicht',      emoji: '💨' },
  medium:      { label: 'Mittel',      emoji: '🌿' },
  strong:      { label: 'Intensiv',    emoji: '🔥' },
  very_strong: { label: 'Sehr stark',  emoji: '💥' },
};

// ─── Scroll-Fortschrittsbalken ────────────────────────────────────────────────
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
        height: '100%', width: `${progress}%`,
        background: `linear-gradient(90deg, ${C.goldMuted}, ${C.gold}, ${C.goldLight})`,
        transition: 'width 0.1s linear',
        boxShadow: '0 0 8px rgba(212,175,55,0.6)',
      }} />
    </div>
  );
};

// ─── Tab-Navigation (Premium) ───────────────────────────────────────────────────
const TabNav = ({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) => {
  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'profil',   label: 'Profil',   emoji: '📋' },
    { id: 'noten',    label: 'Noten',    emoji: '🌸' },
    { id: 'erlebnis', label: 'Erlebnis', emoji: '✨' },
    { id: 'kaufen',   label: 'Kaufen',   emoji: '🛍️' },
  ];
  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '2.5rem',
      padding: '0.75rem',
      backgroundColor: C.goldSoft,
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
      border: `1px solid rgba(212, 175, 55, 0.25)`,
      boxShadow: C.shadowSm,
      overflowX: 'auto',
      scrollbarWidth: 'none',
    }} className="tabs-container">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: '1 1 auto',
            minWidth: '0',
            padding: '0.75rem 1rem',
            border: 'none',
            backgroundColor: active === t.id ? C.cream : 'transparent',
            color: active === t.id ? C.dark : C.textMuted,
            fontWeight: active === t.id ? '700' : '600',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            whiteSpace: 'nowrap',
            borderRadius: '12px',
            boxShadow: active === t.id ? C.shadowMd : 'none',
          }}
          onMouseEnter={(e) => {
            if (active !== t.id) {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(249, 246, 241, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (active !== t.id) {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{t.emoji}</span>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.3px' }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── Teilen-Buttons ───────────────────────────────────────────────────────────
const ShareButtons = ({ name, brand }: { name: string; brand: string }) => {
  const [copied, setCopied] = useState(false);
  const shareText = `Ich habe gerade "${name}" von ${brand} mit Auressa entdeckt, dem KI-Duft-Scanner! 🌸`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://auressa.ch';
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* ignore */ }
  };
  return (
    <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.5rem 1.1rem', borderRadius: '8px',
        backgroundColor: '#25D366', color: '#fff',
        fontWeight: '600', fontSize: '0.82rem', textDecoration: 'none',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        WhatsApp
      </a>
      <button onClick={copyLink} style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.5rem 1.1rem', borderRadius: '8px',
        backgroundColor: copied ? C.gold : 'transparent',
        border: `1px solid ${copied ? C.gold : C.sand}`,
        color: copied ? C.dark : C.textMuted,
        fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        transition: 'all 0.2s ease',
      }}>
        {copied ? '✓ Kopiert!' : '🔗 Link kopieren'}
      </button>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AnalysisResultView({ analysis, similarPerfumes, onNewSearch, dbMatch, dbMatches = [], onSelectDbMatch }: AnalysisResultViewProps) {
  const [currentAnalysis, setCurrentAnalysis] = useState(analysis);
  const [activeTab, setActiveTab] = useState<Tab>('profil');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);

  if (!currentAnalysis) return null;

  // DB-Daten bevorzugen wenn verfügbar
  const displayName        = dbMatch?.perfume_name || currentAnalysis.perfumeName;
  const displayBrand       = dbMatch?.brands?.name || currentAnalysis.brandName;
  const displayNotes       = dbMatch
    ? {
        top:   (dbMatch.top_notes?.length)   ? dbMatch.top_notes   : currentAnalysis.notes.top,
        heart: (dbMatch.heart_notes?.length) ? dbMatch.heart_notes : currentAnalysis.notes.heart,
        base:  (dbMatch.base_notes?.length)  ? dbMatch.base_notes  : currentAnalysis.notes.base,
      }
    : currentAnalysis.notes;
  const displayDescription = dbMatch?.description || currentAnalysis.poeticDescription || currentAnalysis.generalDescription;
  const displayImage       = dbMatch?.image_url || null;
  const dbGender           = dbMatch?.gender;
  // Wenn DB-Match: verlässliches Geschlecht. Ohne DB-Match: KI-Erkennung aus Flakon-Text.
  // Fallback auf 'Unisex' statt raten, wenn gender null/unbekannt.
  const genderLabel        = dbGender === 'Women' ? 'Damen' : dbGender === 'Men' ? 'Herren' : dbGender === 'Unisex' ? 'Unisex' : (currentAnalysis.gender === 'woman' ? 'Damen' : currentAnalysis.gender === 'man' ? 'Herren' : 'Unisex');
  const buyUrl             = dbMatch?.affiliate_url || `https://www.notino.ch/suche/?q=${encodeURIComponent(`${displayBrand} ${displayName}`)}`;
  const flaconiUrl         = `https://www.flaconi.ch/suche/?q=${encodeURIComponent(`${displayBrand} ${displayName}`)}`;
  const confidenceLabel    = dbMatch ? 'In Auressa-DB gefunden' : currentAnalysis.confidence === 'high' ? 'Hohe Konfidenz' : currentAnalysis.confidence === 'medium' ? 'Mittlere Konfidenz' : 'Niedrige Konfidenz';
  const intensityInfo      = currentAnalysis.intensity ? intensityMap[currentAnalysis.intensity] : null;
  const hasDevelopment     = currentAnalysis.development && (currentAnalysis.development.opening || currentAnalysis.development.middleGame || currentAnalysis.development.drydown);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem 1rem calc(6rem + env(safe-area-inset-bottom, 0px))' }}>

      <ScrollProgressBar />

      {/* DEBUG: Timing-Panel */}
      {(analysis as any)._timing && (
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '12px',
          color: '#666',
          fontFamily: 'monospace',
          textAlign: 'center',
        }}>
          ⏱️ Erkennungszeit: <strong>{(analysis as any)._timing}ms</strong>
        </div>
      )}

      <ScanCorrectionBanner
        analysis={currentAnalysis}
        onCorrected={(updated) => setCurrentAnalysis(updated)}
      />

      {/* ── TOP 3 MATCHES (Falls mehrere Optionen) ──────────────────────── */}
      {dbMatches && dbMatches.length > 1 && (
        <div style={{
          backgroundColor: 'rgba(212,175,55,0.08)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: `1px solid rgba(212,175,55,0.2)`,
        }}>
          <p style={{ fontSize: '0.85rem', color: C.textMuted, marginBottom: '0.75rem', fontWeight: '600', marginTop: 0 }}>
            🔍 Top-Treffer gefunden:
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {dbMatches.map((match, idx) => (
              <button
                key={idx}
                onClick={() => onSelectDbMatch?.(match.perfume)}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  border: dbMatch?.id === match.perfume.id ? `2px solid ${C.gold}` : `1px solid rgba(212,175,55,0.3)`,
                  backgroundColor: dbMatch?.id === match.perfume.id ? 'rgba(212,175,55,0.2)' : 'transparent',
                  color: C.text,
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                title={`${match.perfume.brands?.name || 'Marke offen'} ${match.perfume.perfume_name} (${(match.score * 100).toFixed(0)}%)`}
              >
                {match.perfume.perfume_name} {idx === 0 ? '⭐' : ''}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.7rem', color: C.textLight, marginTop: '0.5rem', marginBottom: 0 }}>
            Klicke auf einen Duft, um Details zu aktualisieren
          </p>
        </div>
      )}

      {/* ── HERO (Premium Design) ─────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(165deg, #0a0503 0%, #1a1108 40%, #2a1d12 70%, #3a2518 100%)`,
        color: C.cream,
        borderRadius: '20px',
        marginBottom: '2.5rem',
        overflow: 'hidden',
        boxShadow: C.shadowXl,
        position: 'relative',
        border: `1px solid rgba(212, 175, 55, 0.15)`,
      }}>
        {displayImage && (
          <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
            <Image
              src={displayImage}
              alt={`${displayName} von ${displayBrand}`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top', opacity: 0.75 }}
              unoptimized
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #1a1108 100%)' }} />
          </div>
        )}

        <div style={{ padding: displayImage ? '0 2rem 2.5rem' : '3rem 2rem 2.5rem', textAlign: 'center' }}>
          {/* Konfidenz-Badge */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              backgroundColor: dbMatch ? C.gold : 'rgba(212,175,55,0.25)',
              color: dbMatch ? C.dark : C.gold,
              border: dbMatch ? 'none' : `1px solid ${C.gold}`,
              padding: '0.28rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {confidenceLabel}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            margin: '0 0 0.3rem',
            lineHeight: 1.1,
            color: C.cream,
          }}>
            {displayName}
          </h1>
          <p style={{ fontSize: '1.15rem', color: C.gold, marginBottom: '0.4rem', fontWeight: '600' }}>
            {displayBrand}
          </p>

          {(currentAnalysis.year || currentAnalysis.concentration) && (
            <p style={{ fontSize: '0.82rem', color: 'rgba(212,175,55,0.6)', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
              {[currentAnalysis.year && `seit ${currentAnalysis.year}`, currentAnalysis.concentration].filter(Boolean).join(' · ')}
            </p>
          )}

          {dbMatch && (
            <p style={{ fontSize: '0.75rem', color: 'rgba(212,175,55,0.55)', marginBottom: '1rem', letterSpacing: '0.03em' }}>
              ✓ Daten aus Auressa-Datenbank
            </p>
          )}

          {currentAnalysis.rating && currentAnalysis.rating > 0 && (
            <StarRating rating={currentAnalysis.rating} />
          )}

          {displayDescription && (
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'rgba(249,246,241,0.85)',
              maxWidth: '500px',
              margin: '0.75rem auto 0',
              fontStyle: 'italic',
            }}>
              {displayDescription.length > 240 ? displayDescription.slice(0, 240).trimEnd() + ' …' : displayDescription}
            </p>
          )}

          <ShareButtons name={displayName} brand={displayBrand} />
        </div>
      </section>

      {/* ── KONFIDENZ-WARNUNG bei niedriger Sicherheit ────────────────────── */}
      {!dbMatch && currentAnalysis.confidence === 'low' && (
        <div style={{
          backgroundColor: '#fff8e6',
          border: '1px solid #f0c040',
          borderLeft: '4px solid #d4af37',
          borderRadius: '10px',
          padding: '0.85rem 1.1rem',
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          color: '#7a5c10',
          lineHeight: 1.6,
        }}>
          <strong>⚠️ Niedrige Erkennungssicherheit</strong>
          {currentAnalysis.confidenceReason && (
            <span> — {currentAnalysis.confidenceReason}</span>
          )}
          <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#9a7a30' }}>
            Tipp: Fotografiere das Etikett direkt und sorge für gute Beleuchtung für ein genaueres Ergebnis.
          </div>
        </div>
      )}

      {/* ── TAB-NAVIGATION ────────────────────────────────────────────────── */}
      <TabNav active={activeTab} onChange={setActiveTab} />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB: PROFIL                                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'profil' && (
        <div>
          {/* Steckbrief */}
          <section style={{ marginBottom: '2.5rem' }}>
            <SectionHeading>Steckbrief</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
              {[
                currentAnalysis.concentration && { icon: '🧴', label: 'Konzentration', value: currentAnalysis.concentration },
                currentAnalysis.family        && { icon: '🌸', label: 'Duftfamilie',   value: currentAnalysis.family },
                                                 { icon: '👥', label: 'Geschlecht',    value: genderLabel },
                currentAnalysis.origin        && { icon: '🌍', label: 'Herkunft',      value: currentAnalysis.origin },
                currentAnalysis.year          && { icon: '📅', label: 'Jahr',          value: String(currentAnalysis.year) },
                currentAnalysis.parfumeur     && { icon: '👃', label: 'Parfümeur',     value: currentAnalysis.parfumeur },
                dbMatch?.price_chf            && { icon: '💰', label: 'Preis (CH)',    value: `CHF ${dbMatch.price_chf}` },
                dbMatch?.season               && { icon: '🍂', label: 'Saison',        value: dbMatch.season },
                currentAnalysis.bottleDescription && { icon: '🫙', label: 'Flakon',   value: currentAnalysis.bottleDescription },
                intensityInfo                 && { icon: intensityInfo.emoji, label: 'Intensität', value: intensityInfo.label },
              ].filter(Boolean).map((item) => {
                const it = item as { icon: string; label: string; value: string };
                return (
                  <div key={it.label} style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${C.sand}`,
                    borderRadius: '14px',
                    padding: '1rem 1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    boxShadow: C.shadowSm,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = C.shadowMd;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = C.shadowSm;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}>
                    <div style={{ fontSize: '0.65rem', color: C.gold, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {it.icon} {it.label}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: C.darkText, fontWeight: '700', letterSpacing: '-0.3px' }}>{it.value}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Bewertungen + Duft-DNA */}
          <section style={{ marginBottom: '2.5rem' }}>
            <SectionHeading>Bewertungen & Duft-DNA</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {(currentAnalysis.longevity || currentAnalysis.sillage || currentAnalysis.projection || currentAnalysis.uniqueness || currentAnalysis.priceValue) && (
                <Card>
                  <div style={{ fontSize: '0.75rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Performance</div>
                  <BarRow label="Haltbarkeit"    value={currentAnalysis.longevity}  />
                  <BarRow label="Sillage"         value={currentAnalysis.sillage}    />
                  <BarRow label="Projektion"      value={currentAnalysis.projection} />
                  <BarRow label="Einzigartigkeit" value={currentAnalysis.uniqueness} />
                  <BarRow label="Preis-Leistung"  value={currentAnalysis.priceValue} />
                </Card>
              )}
              {currentAnalysis.duftDNA && Object.values(currentAnalysis.duftDNA).some(v => v !== undefined) && (
                <Card>
                  <div style={{ fontSize: '0.75rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Duft-DNA</div>
                  <BarRow label="Blumig"  value={currentAnalysis.duftDNA.blumig}  max={100} suffix="%" />
                  <BarRow label="Frisch"  value={currentAnalysis.duftDNA.frisch}  max={100} suffix="%" />
                  <BarRow label="Süss"    value={currentAnalysis.duftDNA.süss}    max={100} suffix="%" />
                  <BarRow label="Holzig"  value={currentAnalysis.duftDNA.holzig}  max={100} suffix="%" />
                  <BarRow label="Würzig"  value={currentAnalysis.duftDNA.würzig}  max={100} suffix="%" />
                </Card>
              )}
            </div>
          </section>

          {/* Geschichte & Wissenswertes */}
          {(currentAnalysis.history || currentAnalysis.funFacts?.length || currentAnalysis.famouswearers?.length) && (
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
                    <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>⭐ Bekannte Träger</div>
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
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB: NOTEN                                                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'noten' && (
        <div>
          {/* Duftpyramide */}
          <section style={{ marginBottom: '2.5rem' }}>
            <SectionHeading>Duftpyramide</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.6rem' }}>
              {[
                { label: 'Kopfnote',  emoji: '✨', sub: 'erste Sekunden', notes: displayNotes.top },
                { label: 'Herznote',  emoji: '🌸', sub: 'nach 30 Min.',   notes: displayNotes.heart },
                { label: 'Basisnote', emoji: '🌿', sub: 'nach Stunden',   notes: displayNotes.base },
              ].map(({ label, emoji, sub, notes }) => (
                <div key={label} style={{
                  backgroundColor: C.cream, border: `1px solid ${C.sand}`,
                  borderRadius: '12px', padding: '1rem 0.75rem',
                  borderTop: `3px solid ${C.gold}`, minWidth: 0,
                }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '1.1rem', lineHeight: 1 }}>{emoji}</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: C.gold, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontSize: '0.65rem', color: C.textLight, marginTop: '0.1rem' }}>{sub}</div>
                  </div>
                  <NoteList notes={notes} />
                </div>
              ))}
            </div>
          </section>

          {/* Entwicklung auf der Haut */}
          {hasDevelopment && (
            <section style={{ marginBottom: '2.5rem' }}>
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
                        position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)',
                        zIndex: 1, width: '20px', height: '20px',
                        backgroundColor: C.gold, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', color: C.dark, fontWeight: '700',
                        boxShadow: `0 0 0 3px ${C.cream}`,
                      }}>→</div>
                    )}
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{stage.icon}</div>
                    <div style={{ fontSize: '0.72rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.15rem' }}>{stage.label}</div>
                    <div style={{ fontSize: '0.68rem', color: C.textLight, marginBottom: '0.5rem' }}>{stage.subtitle}</div>
                    <p style={{ fontSize: '0.88rem', color: C.text, margin: 0, lineHeight: 1.65 }}>{stage.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Vergleich mit bekannten Düften */}
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
                    <div style={{
                      flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%',
                      backgroundColor: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.72rem', fontWeight: '700', color: C.dark,
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: '0.93rem', fontWeight: '700', color: C.dark, marginBottom: '0.25rem' }}>{comp.name}</div>
                      <div style={{ fontSize: '0.85rem', color: C.textMuted, lineHeight: 1.5 }}>{comp.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB: ERLEBNIS                                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'erlebnis' && (
        <div>
          {/* Duftreise durch den Tag */}
          {currentAnalysis.duftJourney && Object.values(currentAnalysis.duftJourney).some(v => v) && (
            <section style={{ marginBottom: '2.5rem' }}>
              <SectionHeading>Duftreise durch den Tag</SectionHeading>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
                {[
                  { key: 'morgen', icon: '🌅', label: 'Morgen', text: currentAnalysis.duftJourney.morgen },
                  { key: 'mittag', icon: '☀️', label: 'Mittag', text: currentAnalysis.duftJourney.mittag },
                  { key: 'abend',  icon: '🌆', label: 'Abend',  text: currentAnalysis.duftJourney.abend },
                  { key: 'nacht',  icon: '🌙', label: 'Nacht',  text: currentAnalysis.duftJourney.nacht },
                ].filter(t => t.text).map(({ key, icon, label, text }) => (
                  <div key={key} style={{
                    backgroundColor: C.journeyBg, borderRadius: '10px',
                    padding: '1.1rem', border: `1px solid #f0e0a0`,
                    borderLeft: `3px solid ${C.gold}`,
                  }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: C.goldMuted, marginBottom: '0.5rem' }}>{icon} {label}</div>
                    <p style={{ fontSize: '0.88rem', color: C.text, margin: 0, lineHeight: 1.6 }}>{text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Charakter & Persönlichkeit */}
          {((Array.isArray(currentAnalysis.characterTags) && currentAnalysis.characterTags.length > 0) ||
            (currentAnalysis.personalityType?.trim?.()) ||
            (currentAnalysis.mood?.trim?.())) && (
            <section style={{ marginBottom: '2.5rem' }}>
              <SectionHeading>Charakter & Persönlichkeit</SectionHeading>
              <div style={{
                background: `linear-gradient(165deg, #0f0b06 0%, #1a1108 40%, #2a1d12 100%)`,
                color: C.cream,
                padding: '2.25rem 2.5rem',
                borderRadius: '18px',
                boxShadow: C.shadowLg,
                border: `1px solid rgba(212, 175, 55, 0.2)`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = C.shadowXl; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 175, 55, 0.3)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = C.shadowLg; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 175, 55, 0.2)'; }}>
                {currentAnalysis.personalityType && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.7rem', color: C.goldLight, fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.95 }}>Persönlichkeitstyp</div>
                    <p style={{ fontSize: '1.15rem', color: C.cream, margin: 0, lineHeight: 1.6, fontWeight: '600' }}>{currentAnalysis.personalityType}</p>
                  </div>
                )}
                {currentAnalysis.mood && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.7rem', color: C.goldLight, fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.95 }}>Stimmung</div>
                    <p style={{ fontSize: '1.05rem', color: 'rgba(249, 246, 241, 0.95)', margin: 0, lineHeight: 1.65 }}>{currentAnalysis.mood}</p>
                  </div>
                )}
                {currentAnalysis.characterTags && currentAnalysis.characterTags.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.7rem', color: C.goldLight, fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.85rem', opacity: 0.95 }}>Charakter-Tags</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {currentAnalysis.characterTags.map((tag, i) => {
                        const tagSlug = tag.toLowerCase()
                          .replace(/[äöü]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue' }[c] || c))
                          .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        return (
                          <Link key={i} href={`/tag/${tagSlug}`} style={{
                            backgroundColor: 'rgba(212, 175, 55, 0.15)',
                            border: `1.5px solid rgba(212, 175, 55, 0.4)`,
                            color: C.goldLight,
                            padding: '0.4rem 1rem',
                            borderRadius: '24px',
                            fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', display: 'inline-block',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 175, 55, 0.6)';
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212, 175, 55, 0.4)';
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                          }}>
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

          {/* Wann tragen */}
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

          {/* Der perfekte Moment */}
          {currentAnalysis.perfectMoment && (
            <section style={{ marginBottom: '2.5rem' }}>
              <SectionHeading>Der perfekte Moment</SectionHeading>
              <div style={{
                background: 'linear-gradient(135deg, #fdf7e8, #fef9ee)',
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
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TAB: KAUFEN                                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'kaufen' && (
        <div>
          {/* Preise & Shops */}
          <section style={{ marginBottom: '2.5rem' }}>
            <SectionHeading>Jetzt kaufen</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href={buyUrl} target="_blank" rel="sponsored noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.25rem 1.5rem', borderRadius: '12px',
                backgroundColor: C.gold, color: C.dark,
                fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
              }}>
                <span>🛍️ Bei Notino ansehen</span>
                <span style={{ fontSize: '0.85rem', opacity: 0.75 }}>→</span>
              </a>
              <a href={flaconiUrl} target="_blank" rel="sponsored noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.25rem 1.5rem', borderRadius: '12px',
                backgroundColor: C.cream, border: `2px solid ${C.gold}`,
                color: C.dark, fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
              }}>
                <span>🔍 Bei Flaconi ansehen</span>
                <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>→</span>
              </a>
            </div>
            <p style={{ fontSize: '0.72rem', color: C.textLight, marginTop: '0.85rem', textAlign: 'center' }}>
              * Affiliate-Links — du zahlst nichts extra, wir erhalten eine kleine Provision.
            </p>
          </section>

          {/* Ähnliche Düfte aus Auressa */}
          {similarPerfumes.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <SectionHeading>Ähnliche Düfte aus Auressa</SectionHeading>

              {/* Filter-Leiste */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {/* Preis-Filter */}
                {[null, 50, 80, 120].map((price) => (
                  <button
                    key={price ?? 'alle'}
                    onClick={() => setPriceFilter(price)}
                    style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      border: `1px solid ${priceFilter === price ? '#d4af37' : '#e8dcc8'}`,
                      backgroundColor: priceFilter === price ? '#d4af37' : 'transparent',
                      color: priceFilter === price ? '#2a1d12' : '#7a6a5e',
                      fontSize: '0.78rem',
                      fontWeight: priceFilter === price ? '700' : '500',
                      cursor: 'pointer',
                    }}
                  >
                    {price === null ? 'Alle Preise' : `bis CHF ${price}`}
                  </button>
                ))}
                {/* Trennlinie */}
                <span style={{ color: '#e8dcc8', alignSelf: 'center' }}>|</span>
                {/* Geschlechts-Filter */}
                {[null, 'Women', 'Men', 'Unisex'].map((g) => (
                  <button
                    key={g ?? 'alle'}
                    onClick={() => setGenderFilter(g)}
                    style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      border: `1px solid ${genderFilter === g ? '#d4af37' : '#e8dcc8'}`,
                      backgroundColor: genderFilter === g ? '#d4af37' : 'transparent',
                      color: genderFilter === g ? '#2a1d12' : '#7a6a5e',
                      fontSize: '0.78rem',
                      fontWeight: genderFilter === g ? '700' : '500',
                      cursor: 'pointer',
                    }}
                  >
                    {g === null ? 'Alle' : g === 'Women' ? 'Damen' : g === 'Men' ? 'Herren' : 'Unisex'}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                {similarPerfumes.filter(p => {
                  if (priceFilter !== null && (p.price_chf == null || p.price_chf > priceFilter)) return false;
                  if (genderFilter !== null && p.gender !== genderFilter) return false;
                  return true;
                }).map((perfume) => (
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
                      Mehr erfahren →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* KI-Empfehlungen */}
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
        </div>
      )}

      {/* ── CTA Neuen Scan starten ────────────────────────────────────────── */}
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

      {/* ── STICKY KAUF-BAR (mobile) ──────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0.85rem 1rem',
        paddingBottom: 'calc(0.85rem + env(safe-area-inset-bottom, 0px))',
        backgroundColor: C.dark,
        borderTop: `1px solid rgba(212,175,55,0.3)`,
        display: 'flex',
        gap: '0.75rem',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <a href={buyUrl} target="_blank" rel="sponsored noopener noreferrer" style={{
          flex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          padding: '0.75rem', borderRadius: '8px',
          backgroundColor: C.gold, color: C.dark,
          fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none',
          boxShadow: '0 2px 12px rgba(212,175,55,0.4)',
        }}>
          🛍️ Kaufen
        </a>
        <button
          onClick={onNewSearch}
          style={{
            flex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            padding: '0.75rem', borderRadius: '8px',
            border: `1px solid rgba(212,175,55,0.4)`,
            backgroundColor: 'transparent',
            color: C.cream,
            fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          🔍 Neuer Scan
        </button>
      </div>

    </div>
  );
}
