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
  error?: string;
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
    // Store in sessionStorage for admin page to pick up
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
          <div className="badge">Duft recherchieren</div>
        </nav>

        <section className="section card" style={{ maxWidth: 600 }}>
          <h2>Automatische Duft-Recherche</h2>
          <p className="small">
            Gib die Marke und den Duft-Namen ein. Claude recherchiert automatisch alle Daten von Fragrantica, Parfumo, Douglas.ch und anderen Quellen.
          </p>

          <form onSubmit={research}>
            <div className="field">
              <label>Marke (z.B. "Jardin Bohème")</label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="Parfüm-Marke"
                required
              />
            </div>
            <div className="field">
              <label>Duftname (z.B. "Épisode Romantique Orchidée Sublime")</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Duftname"
                required
              />
            </div>
            <button className="button" type="submit" disabled={loading}>
              {loading ? '🔍 Recherchiere...' : '🔍 Recherchieren'}
            </button>
          </form>

          {error && <p className="admin-msg" style={{ color: '#b3261e' }}>{error}</p>}
        </section>

        {result && !result.error && (
          <section className="section card" style={{ maxWidth: 900 }}>
            <h2>✅ Recherche-Ergebnisse</h2>

            <div style={{ fontSize: 14, lineHeight: 2, marginBottom: 20 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', width: '30%', paddingRight: 20 }}>Duftname:</td>
                    <td>{result.perfume_name || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Marke:</td>
                    <td>{result.brand || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Familie:</td>
                    <td>{result.fragrance_family || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Geschlecht:</td>
                    <td>{result.gender || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Preis CHF:</td>
                    <td>{result.price_chf || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Haltbarkeit (1-10):</td>
                    <td>{result.longevity ? `${result.longevity}/10` : <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Sillage (1-10):</td>
                    <td>{result.sillage ? `${result.sillage}/10` : <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Saison:</td>
                    <td>{result.season || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Anlass:</td>
                    <td>{result.occasion || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Kopfnoten:</td>
                    <td>{result.top_notes || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Herznoten:</td>
                    <td>{result.heart_notes || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ fontWeight: 'bold', paddingRight: 20 }}>Basisnoten:</td>
                    <td>{result.base_notes || <span style={{ color: '#999' }}>–</span>}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px solid #ddd' }} />

            <h3 style={{ marginTop: 30, marginBottom: 15 }}>📊 Daten-Qualität & Quellen</h3>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 10 }}>
                <strong>Zuverlässigkeit:</strong>{' '}
                {result.notes_confidence === 'high'
                  ? '✅ ⭐⭐⭐ Sehr zuverlässig (3+ verifizierte Quellen)'
                  : result.notes_confidence === 'medium'
                  ? '⚠️ ⭐⭐ Teilweise zuverlässig (2 Quellen)'
                  : '⚠️ ⭐ Begrenzt verfügbar (1 Quelle)'}
              </p>

              {result.data_quality && (
                <>
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
                  {result.data_quality.fehlende_daten.length > 0 && (
                    <p style={{ marginBottom: 8, color: '#999' }}>
                      <strong>Fehlende Daten:</strong> {result.data_quality.fehlende_daten.join(', ')}
                    </p>
                  )}
                </>
              )}

              <p style={{ marginTop: 15, fontSize: 12, color: '#777' }}>
                <strong>Quellen:</strong><br />
                {result.sources.map((source, i) => (
                  <span key={i}>
                    • {source}<br />
                  </span>
                )) || 'Keine'}
              </p>
            </div>

            <div className="cta" style={{ marginTop: 30 }}>
              <button className="button" onClick={useThisData}>
                ✅ Diese Daten verwenden
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
