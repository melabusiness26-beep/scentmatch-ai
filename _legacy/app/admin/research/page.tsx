'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface DataQuality {
  noten_verifiziert: boolean;
  preis_aktuell: boolean;
  longevity_quelle?: string;
  fehlende_daten: string[];
}

interface ResearchResult {
  perfume_name: string | null;
  brand: string | null;
  fragrance_family: string | null;
  gender: string | null;
  price_chf: string | null;
  longevity: number | null;
  sillage: number | null;
  scentmatch_score: number | null;
  season: string | null;
  occasion: string | null;
  top_notes: string | null;
  heart_notes: string | null;
  base_notes: string | null;
  image_url: string | null;
  affiliate_url: string | null;
  sources: string[];
  notes_confidence: 'high' | 'medium' | 'low';
  data_quality?: DataQuality;
  concentration?: string | null;
  long_description?: string | null;
  bottle_description?: string | null;
  intensity?: string | null;
  scent_dna?: string[];
  rating?: number | null;
  confidence_level?: string | null;
  data_sources?: Record<string, boolean>;
  error?: string;
}

function StarRating({ rating }: { rating: number | null | undefined }) {
  if (!rating) return <span style={{ color: '#999' }}>–</span>;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span>
      {'★'.repeat(fullStars)}
      {hasHalf && '½'}
      {'☆'.repeat(5 - Math.ceil(rating))} {rating.toFixed(1)}/10
    </span>
  );
}

export default function ResearchPage() {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState('');

  async function research(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: brand.trim(), name: name.trim() })
      });

      const data: ResearchResult = await res.json();

      if (!res.ok) {
        setError(data.error || 'Recherche fehlgeschlagen');
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Fehler bei der Recherche');
    }
    setLoading(false);
  }

  function useThisData() {
    if (!result) return;
    sessionStorage.setItem('researchData', JSON.stringify(result));
    window.location.href = '/admin?research=true';
  }

  if (!isSupabaseConfigured) {
    return (
      <main>
        <div className="container">
          <p className="lead">Supabase nicht konfiguriert.</p>
          <Link className="button" href="/admin">Zurück</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <nav className="nav">
          <Link className="logo" href="/">Auressa</Link>
          <div className="badge">Professionelle Duft-Recherche (Pro Status)</div>
        </nav>

        <section className="section card" style={{ maxWidth: 600 }}>
          <h2>🚀 Automated Pro Research</h2>
          <p className="small">
            Recherchiere jeden Duft mit vollständigem Profi-Status: Noten, Beschreibung, Flakon, Intensität, Duft-DNA.
          </p>

          <form onSubmit={research}>
            <div className="field">
              <label>Marke (z.B. "Davidoff")</label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="Parfüm-Marke"
                required
              />
            </div>
            <div className="field">
              <label>Duftname (z.B. "Cool Water")</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Duftname"
                required
              />
            </div>
            <button className="button" type="submit" disabled={loading}>
              {loading ? '🔍 Recherchiere Pro-Status...' : '🔍 Recherchieren'}
            </button>
          </form>

          {error && <p className="admin-msg" style={{ color: '#b3261e' }}>{error}</p>}
        </section>

        {result && !result.error && (
          <section className="section card" style={{ maxWidth: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h2>{result.perfume_name}</h2>
                <p style={{ fontSize: 14, color: '#999', marginTop: 5 }}>{result.brand}</p>
              </div>
              {result.confidence_level === 'high' && (
                <div style={{
                  padding: '8px 16px',
                  backgroundColor: '#D4AF37',
                  color: '#333',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                  ⭐ HOHE KONFIDENZ
                </div>
              )}
              {result.confidence_level === 'medium' && (
                <div style={{
                  padding: '8px 16px',
                  backgroundColor: '#FFD700',
                  color: '#333',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                  ⭐ MITTLERE KONFIDENZ
                </div>
              )}
              {result.confidence_level === 'low' && (
                <div style={{
                  padding: '8px 16px',
                  backgroundColor: '#E0E0E0',
                  color: '#333',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                  ⚠️ BEGRENZT
                </div>
              )}
            </div>

            {/* Rating */}
            {result.rating !== null && result.rating !== undefined && (
              <div style={{ marginBottom: 25, paddingBottom: 20, borderBottom: '1px solid #eee' }}>
                <h3 style={{ marginBottom: 10 }}>Bewertung</h3>
                <div style={{ fontSize: 20 }}>
                  <StarRating rating={result.rating} />
                </div>
              </div>
            )}

            {/* Langbeschreibung */}
            {result.long_description && (
              <div style={{ marginBottom: 25, paddingBottom: 20, borderBottom: '1px solid #eee' }}>
                <h3 style={{ marginBottom: 10 }}>Beschreibung</h3>
                <p style={{ fontStyle: 'italic', lineHeight: 1.6, color: '#555' }}>
                  {result.long_description}
                </p>
              </div>
            )}

            {/* Steckbrief */}
            <div style={{ marginBottom: 25, paddingBottom: 20, borderBottom: '1px solid #eee' }}>
              <h3 style={{ marginBottom: 15 }}>Steckbrief</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, fontSize: 14 }}>
                <div style={{ padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 4 }}>KONZENTRATION</div>
                  <div>{result.concentration || '–'}</div>
                </div>
                <div style={{ padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 4 }}>DUFTFAMILIE</div>
                  <div style={{ textTransform: 'capitalize' }}>{result.fragrance_family || '–'}</div>
                </div>
                <div style={{ padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 4 }}>GESCHLECHT</div>
                  <div>{result.gender || '–'}</div>
                </div>
                <div style={{ padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 4 }}>INTENSITÄT</div>
                  <div>{result.intensity || '–'}</div>
                </div>
              </div>
            </div>

            {/* Flakon */}
            {result.bottle_description && (
              <div style={{ marginBottom: 25, paddingBottom: 20, borderBottom: '1px solid #eee' }}>
                <h3 style={{ marginBottom: 10 }}>🏺 Flakon</h3>
                <p style={{ color: '#555', lineHeight: 1.6 }}>
                  {result.bottle_description}
                </p>
              </div>
            )}

            {/* Basis-Tabelle */}
            <div style={{ marginBottom: 25, paddingBottom: 20, borderBottom: '1px solid #eee', fontSize: 14, lineHeight: 2 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', width: '30%', paddingRight: 20 }}>Saison:</td>
                    <td>{result.season || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Anlass:</td>
                    <td>{result.occasion || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Preis CHF:</td>
                    <td>{result.price_chf || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Haltbarkeit:</td>
                    <td>{result.longevity ? `${result.longevity}/10` : <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Sillage:</td>
                    <td>{result.sillage ? `${result.sillage}/10` : <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Noten */}
            <div style={{ marginBottom: 25, paddingBottom: 20, borderBottom: '1px solid #eee' }}>
              <h3 style={{ marginBottom: 15 }}>Duft-Pyramide</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', width: '25%', paddingRight: 20 }}>Kopfnoten:</td>
                    <td>{result.top_notes || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Herznoten:</td>
                    <td>{result.heart_notes || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Basisnoten:</td>
                    <td>{result.base_notes || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Duft-DNA */}
            {result.scent_dna && result.scent_dna.length > 0 && (
              <div style={{ marginBottom: 25, paddingBottom: 20, borderBottom: '1px solid #eee' }}>
                <h3 style={{ marginBottom: 10 }}>🧬 Duft-DNA (ähnliche Düfte)</h3>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {result.scent_dna.map((duft, i) => (
                    <div key={i} style={{
                      padding: '8px 16px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: 6,
                      fontSize: 13,
                      border: '1px solid #ddd'
                    }}>
                      {duft}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Data Quality */}
            <div style={{ marginBottom: 25 }}>
              <h3 style={{ marginBottom: 15 }}>📊 Datenqualität & Quellen</h3>

              {result.data_quality && (
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.8, marginBottom: 15 }}>
                  <p style={{ marginBottom: 8 }}>
                    <strong>Noten verifiziert:</strong> {result.data_quality.noten_verifiziert ? '✅ Ja' : '❌ Nein'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>Preis aktuell:</strong> {result.data_quality.preis_aktuell ? '✅ Ja' : '❌ Nein'}
                  </p>
                  {result.data_quality.longevity_quelle && (
                    <p style={{ marginBottom: 8 }}>
                      <strong>Haltbarkeit-Quelle:</strong> {result.data_quality.longevity_quelle}
                    </p>
                  )}
                </div>
              )}

              <div style={{ fontSize: 12, color: '#777', lineHeight: 1.8 }}>
                <strong>Quellen:</strong><br />
                {result.sources.map((source, i) => (
                  <span key={i}>
                    • {source}<br />
                  </span>
                )) || 'Keine'}
              </div>
            </div>

            <div className="cta" style={{ marginTop: 30 }}>
              <button className="button" onClick={useThisData}>
                ✅ Diese Pro-Daten verwenden
              </button>
              <button className="button secondary" onClick={() => setResult(null)}>
                🔄 Neu recherchieren
              </button>
              <Link className="button secondary" href="/admin">
                ← Zurück zum Admin
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
