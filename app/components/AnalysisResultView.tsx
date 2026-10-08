'use client';

import Link from 'next/link';
import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';

interface AnalysisResultViewProps {
  analysis: ImageAnalysisResult['data'];
  similarPerfumes: Perfume[];
  onNewSearch: () => void;
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
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: '1.6rem',
    fontFamily: "'Playfair Display', serif",
    color: C.dark,
    marginBottom: '1.25rem',
    marginTop: 0,
    borderBottom: `2px solid ${C.sand}`,
    paddingBottom: '0.6rem',
  }}>
    {children}
  </h2>
);

const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    backgroundColor: C.cream,
    borderRadius: '10px',
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
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: C.text }}>{label}</span>
        <span style={{ fontSize: '0.85rem', color: C.textLight, fontVariantNumeric: 'tabular-nums' }}>
          {value}{suffix}
        </span>
      </div>
      <div style={{ height: '7px', backgroundColor: C.sand, borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: C.gold, borderRadius: '4px', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
};

const Pill = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span style={{
    backgroundColor: dark ? C.gold : C.sand,
    color: C.dark,
    padding: '0.3rem 0.85rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: dark ? '600' : '500',
    whiteSpace: 'nowrap',
  }}>
    {children}
  </span>
);

const MetaItem = ({ icon, label, value }: { icon: string; label: string; value: string | number }) => (
  <div style={{
    backgroundColor: C.cream,
    border: `1px solid ${C.sand}`,
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  }}>
    <div style={{ fontSize: '0.8rem', color: C.textLight }}>
      <span style={{ marginRight: '0.35rem' }}>{icon}</span>{label}
    </div>
    <div style={{ fontSize: '1rem', fontWeight: '700', color: C.dark }}>{value}</div>
  </div>
);

const NoteList = ({ notes }: { notes: string[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.75rem' }}>
    {notes.length > 0
      ? notes.map((n, i) => (
          <span key={i} style={{ fontSize: '0.95rem', color: C.text, display: 'flex', alignItems: 'flex-start', gap: '0.4rem', lineHeight: '1.4' }}>
            <span style={{ flexShrink: 0, color: C.gold, fontWeight: '700' }}>·</span>
            <span>{n}</span>
          </span>
        ))
      : <span style={{ fontSize: '0.85rem', color: C.textLight, fontStyle: 'italic' }}>Keine Daten</span>
    }
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AnalysisResultView({ analysis, similarPerfumes, onNewSearch }: AnalysisResultViewProps) {
  if (!analysis) return null;

  const confidenceColor = analysis.confidence === 'high' ? C.gold : analysis.confidence === 'medium' ? '#c0a96a' : C.textLight;
  const confidenceLabel = analysis.confidence === 'high' ? 'Hohe Konfidenz' : analysis.confidence === 'medium' ? 'Mittlere Konfidenz' : 'Niedrige Konfidenz';
  const genderLabel = analysis.gender === 'woman' ? 'Damen' : analysis.gender === 'man' ? 'Herren' : 'Unisex';

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(145deg, #1e1308 0%, ${C.dark} 60%, #3a2a18 100%)`,
        color: C.cream,
        padding: '3rem 2rem 2.5rem',
        borderRadius: '14px',
        marginBottom: '2.5rem',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(42,29,18,0.18)',
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{
            backgroundColor: confidenceColor,
            color: C.dark,
            padding: '0.25rem 0.9rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {confidenceLabel}
          </span>
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 8vw, 3.2rem)',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          margin: '0.5rem 0 0.4rem',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
        }}>
          {analysis.perfumeName}
        </h1>
        <p style={{ fontSize: '1.2rem', color: C.gold, marginBottom: '0.5rem', fontWeight: '500' }}>
          {analysis.brandName}
        </p>
        {analysis.year && (
          <p style={{ fontSize: '0.85rem', color: '#c4b5a0', marginBottom: '1.5rem' }}>seit {analysis.year}</p>
        )}
        <p style={{
          fontSize: '1.05rem',
          lineHeight: 1.85,
          color: '#ddd4c4',
          maxWidth: '560px',
          margin: '0 auto',
          fontStyle: 'italic',
        }}>
          {analysis.poeticDescription || analysis.generalDescription}
        </p>
      </section>

      {/* ── 2. STECKBRIEF ────────────────────────────────────────────────── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <SectionHeading>Steckbrief</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.85rem' }}>
          {analysis.concentration && <MetaItem icon="🧴" label="Konzentration" value={analysis.concentration} />}
          {analysis.family && <MetaItem icon="🌸" label="Duftfamilie" value={analysis.family} />}
          {analysis.gender && <MetaItem icon="👥" label="Geschlecht" value={genderLabel} />}
          {analysis.origin && <MetaItem icon="🌍" label="Herkunft" value={analysis.origin} />}
          {analysis.year && <MetaItem icon="📅" label="Jahr" value={analysis.year} />}
          {analysis.parfumeur && <MetaItem icon="👃" label="Parfümeur" value={analysis.parfumeur} />}
        </div>
      </section>

      {/* ── 3. BEWERTUNGEN ───────────────────────────────────────────────── */}
      {(analysis.longevity || analysis.sillage || analysis.projection || analysis.uniqueness || analysis.priceValue) && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Bewertungen</SectionHeading>
          <Card>
            <BarRow label="Haltbarkeit" value={analysis.longevity} />
            <BarRow label="Sillage" value={analysis.sillage} />
            <BarRow label="Projektion" value={analysis.projection} />
            <BarRow label="Einzigartigkeit" value={analysis.uniqueness} />
            <BarRow label="Preis-Leistung" value={analysis.priceValue} />
          </Card>
        </section>
      )}

      {/* ── 4. DUFT-DNA ──────────────────────────────────────────────────── */}
      {analysis.duftDNA && Object.values(analysis.duftDNA).some(v => v !== undefined) && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Duft-DNA</SectionHeading>
          <Card>
            <BarRow label="Blumig" value={analysis.duftDNA.blumig} max={100} suffix="%" />
            <BarRow label="Frisch" value={analysis.duftDNA.frisch} max={100} suffix="%" />
            <BarRow label="Süss" value={analysis.duftDNA.süss} max={100} suffix="%" />
            <BarRow label="Holzig" value={analysis.duftDNA.holzig} max={100} suffix="%" />
            <BarRow label="Würzig" value={analysis.duftDNA.würzig} max={100} suffix="%" />
          </Card>
        </section>
      )}

      {/* ── 5. DUFTPYRAMIDE ──────────────────────────────────────────────── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <SectionHeading>Duftpyramide</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'KOPFNOTEN', emoji: '✨', notes: analysis.notes.top },
            { label: 'HERZNOTEN', emoji: '💛', notes: analysis.notes.heart },
            { label: 'BASISNOTEN', emoji: '🌿', notes: analysis.notes.base },
          ].map(({ label, emoji, notes }) => (
            <div key={label} style={{
              backgroundColor: C.cream,
              border: `1px solid ${C.sand}`,
              borderRadius: '10px',
              padding: '1.25rem',
              borderTop: `3px solid ${C.gold}`,
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: C.gold, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                {emoji} {label}
              </div>
              <NoteList notes={notes} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. DUFTREISE ─────────────────────────────────────────────────── */}
      {analysis.duftJourney && Object.values(analysis.duftJourney).some(v => v) && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Duftreise durch den Tag</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            {[
              { key: 'morgen', icon: '🌅', label: 'Morgen', text: analysis.duftJourney.morgen },
              { key: 'mittag', icon: '☀️', label: 'Mittag', text: analysis.duftJourney.mittag },
              { key: 'abend', icon: '🌆', label: 'Abend', text: analysis.duftJourney.abend },
              { key: 'nacht', icon: '🌙', label: 'Nacht', text: analysis.duftJourney.nacht },
            ].filter(t => t.text).map(({ key, icon, label, text }) => (
              <div key={key} style={{
                backgroundColor: C.journeyBg,
                borderRadius: '10px',
                padding: '1.25rem',
                borderLeft: `3px solid ${C.gold}`,
                border: `1px solid #f0e0a0`,
                borderLeftWidth: '3px',
                borderLeftColor: C.gold,
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: C.goldMuted, marginBottom: '0.6rem' }}>
                  {icon} {label}
                </div>
                <p style={{ fontSize: '0.9rem', color: C.text, margin: 0, lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. CHARAKTER ─────────────────────────────────────────────────── */}
      {(analysis.characterTags || analysis.personalityType || analysis.mood) && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Charakter & Persönlichkeit</SectionHeading>
          <div style={{
            background: `linear-gradient(135deg, ${C.dark} 0%, #3a2518 100%)`,
            color: C.cream,
            padding: '2rem',
            borderRadius: '12px',
          }}>
            {analysis.personalityType && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', color: C.gold, fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Persönlichkeitstyp</div>
                <p style={{ fontSize: '1.05rem', color: C.cream, margin: 0, lineHeight: 1.5 }}>{analysis.personalityType}</p>
              </div>
            )}
            {analysis.mood && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', color: C.gold, fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Stimmung</div>
                <p style={{ fontSize: '1.05rem', color: C.cream, margin: 0 }}>{analysis.mood}</p>
              </div>
            )}
            {analysis.characterTags && analysis.characterTags.length > 0 && (
              <div>
                <div style={{ fontSize: '0.8rem', color: C.gold, fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Charakter-Tags</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {analysis.characterTags.map((tag, i) => (
                    <span key={i} style={{
                      backgroundColor: 'rgba(212,175,55,0.2)',
                      border: `1px solid rgba(212,175,55,0.5)`,
                      color: C.gold,
                      padding: '0.3rem 0.85rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 8. WANN TRAGEN ───────────────────────────────────────────────── */}
      {(analysis.seasonRecommendation || analysis.occasionList?.length || analysis.climate?.length) && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Wann tragen?</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analysis.seasonRecommendation && (
              <Card>
                <div style={{ fontSize: '0.8rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                  🍂 Saison
                </div>
                <p style={{ fontSize: '1rem', color: C.dark, margin: 0, fontWeight: '500' }}>{analysis.seasonRecommendation}</p>
              </Card>
            )}
            {analysis.occasionList && analysis.occasionList.length > 0 && (
              <Card>
                <div style={{ fontSize: '0.8rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                  🎯 Anlässe
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.occasionList.map((o, i) => <Pill key={i}>{o}</Pill>)}
                </div>
              </Card>
            )}
            {analysis.climate && analysis.climate.length > 0 && (
              <Card>
                <div style={{ fontSize: '0.8rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                  🌡️ Klima
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.climate.map((c, i) => <Pill key={i}>{c}</Pill>)}
                </div>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* ── 9. DER PERFEKTE MOMENT ───────────────────────────────────────── */}
      {analysis.perfectMoment && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Der perfekte Moment</SectionHeading>
          <div style={{
            background: `linear-gradient(135deg, #fdf7e8, #fef9ee)`,
            border: `1px solid #f0e0a0`,
            borderLeft: `4px solid ${C.gold}`,
            borderRadius: '10px',
            padding: '1.75rem 2rem',
          }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: C.dark, margin: 0, fontStyle: 'italic' }}>
              ✨ {analysis.perfectMoment}
            </p>
          </div>
        </section>
      )}

      {/* ── 10. VERGLEICH ────────────────────────────────────────────────── */}
      {analysis.comparisonPerfumes && analysis.comparisonPerfumes.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Vergleich mit bekannten Düften</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {analysis.comparisonPerfumes.map((comp, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '1rem',
                backgroundColor: C.cream,
                border: `1px solid ${C.sand}`,
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                alignItems: 'flex-start',
              }}>
                <div style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', backgroundColor: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700', color: C.dark }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: C.dark, marginBottom: '0.3rem' }}>{comp.name}</div>
                  <div style={{ fontSize: '0.875rem', color: C.textMuted, lineHeight: 1.55 }}>{comp.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 11. FUN FACTS & GESCHICHTE ───────────────────────────────────── */}
      {(analysis.history || (analysis.funFacts && analysis.funFacts.length > 0) || (analysis.famouswearers && analysis.famouswearers.length > 0)) && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Fun Facts & Geschichte</SectionHeading>
          <Card>
            {analysis.history && (
              <div style={{ marginBottom: analysis.funFacts?.length ? '1.5rem' : 0 }}>
                <div style={{ fontSize: '0.8rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>📖 Geschichte</div>
                <p style={{ fontSize: '0.95rem', color: C.textMuted, lineHeight: 1.7, margin: 0 }}>{analysis.history}</p>
              </div>
            )}
            {analysis.famouswearers && analysis.famouswearers.length > 0 && (
              <div style={{ marginBottom: analysis.funFacts?.length ? '1.5rem' : 0 }}>
                <div style={{ fontSize: '0.8rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>⭐ Bekannte Träger</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.famouswearers.map((w, i) => <Pill key={i}>{w}</Pill>)}
                </div>
              </div>
            )}
            {analysis.funFacts && analysis.funFacts.length > 0 && (
              <div>
                <div style={{ fontSize: '0.8rem', color: C.goldMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>💡 Interessantes</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {analysis.funFacts.map((fact, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, color: C.gold, fontWeight: '700', marginTop: '0.1rem' }}>·</span>
                      <span style={{ fontSize: '0.95rem', color: C.textMuted, lineHeight: 1.6 }}>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </section>
      )}

      {/* ── 12. ÄHNLICHE DÜFTE AUS AURESSA ───────────────────────────────── */}
      {similarPerfumes.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Ähnliche Düfte aus Auressa</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem' }}>
            {similarPerfumes.map((perfume) => (
              <Link
                key={perfume.id}
                href={`/duft/${perfume.slug}`}
                style={{
                  display: 'block',
                  padding: '1.25rem',
                  backgroundColor: C.cream,
                  borderRadius: '10px',
                  border: `1px solid ${C.sand}`,
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 16px rgba(212,175,55,0.18)`;
                  e.currentTarget.style.borderColor = C.gold;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = C.sand;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: C.dark, marginBottom: '0.3rem' }}>{perfume.perfume_name}</div>
                <div style={{ fontSize: '0.85rem', color: C.goldMuted, fontWeight: '600', marginBottom: '0.6rem' }}>{perfume.brands?.name || 'Unbekannte Marke'}</div>
                {perfume.fragrance_family && (
                  <div style={{ fontSize: '0.8rem', color: C.textLight, marginBottom: '0.5rem' }}>{perfume.fragrance_family}</div>
                )}
                {perfume.price_chf && (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: C.gold }}>CHF {perfume.price_chf}</div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── 13. ÄHNLICHE DÜFTE (KI) ──────────────────────────────────────── */}
      {analysis.similarPerfumes && analysis.similarPerfumes.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <SectionHeading>Ähnliche Düfte (aus KI-Wissen)</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {analysis.similarPerfumes.map((perf, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '1rem',
                backgroundColor: C.cream,
                border: `1px solid ${C.sand}`,
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                alignItems: 'flex-start',
              }}>
                <div style={{ flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', backgroundColor: C.gold, marginTop: '0.55rem' }} />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: C.dark, marginBottom: '0.25rem' }}>{perf.name}</div>
                  <div style={{ fontSize: '0.875rem', color: C.textMuted, lineHeight: 1.55 }}>{perf.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA: NEUE SUCHE ──────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: `1px solid ${C.sand}`, marginTop: '1rem' }}>
        <button
          onClick={onNewSearch}
          style={{
            padding: '13px 36px',
            borderRadius: '8px',
            border: `2px solid ${C.gold}`,
            backgroundColor: C.gold,
            color: C.dark,
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.01em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = C.dark;
            e.currentTarget.style.color = C.gold;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = C.gold;
            e.currentTarget.style.color = C.dark;
          }}
        >
          🔍 Neuen Duft analysieren
        </button>
        <p style={{ fontSize: '0.85rem', color: C.textLight, marginTop: '0.75rem' }}>
          Ein anderes Parfüm fotografieren?
        </p>
      </div>

    </div>
  );
}
