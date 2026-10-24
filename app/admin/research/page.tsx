'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ResearchResult {
  perfume_name: string | null;
  brand: string | null;
  fragrance_family: string | null;
  gender: string | null;
  price_chf: string | null;
  longevity: number | null;
  sillage: number | null;
  season: string | null;
  occasion: string | null;
  top_notes: string | null;
  heart_notes: string | null;
  base_notes: string | null;
  concentration?: string | null;
  long_description?: string | null;
  bottle_description?: string | null;
  intensity?: string | null;
  scent_dna?: string[];
  rating?: number | null;
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

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || `Fehler: ${res.status}`);
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (err: any) {
      setError(`Fehler: ${err.message}`);
    }
    setLoading(false);
  }

  function useResult() {
    if (!result) return;
    sessionStorage.setItem('researchData', JSON.stringify(result));
    window.location.href = '/admin';
  }

  return (
    <main>
      <div className="container">
        <nav className="nav">
          <Link className="logo" href="/">Auressa</Link>
          <div className="badge">Schnelle Recherche</div>
        </nav>

        <section className="section card" style={{ maxWidth: 600 }}>
          <h2>🔍 Schnelle Recherche</h2>
          <p className="small">
            Gib Marke und Duftname ein – das System recherchiert alle Daten automatisch.
          </p>

          <form onSubmit={research}>
            <div className="field">
              <label>Marke *</label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="z.B. Dolce & Gabbana"
                required
              />
            </div>
            <div className="field">
              <label>Duftname *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="z.B. Light Blue"
                required
              />
            </div>
            <button className="button" type="submit" disabled={loading}>
              {loading ? '🔍 Recherchiert...' : '🔍 Recherchieren'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: 20, padding: 15, backgroundColor: '#ffebee', borderRadius: 8, color: '#c62828' }}>
              <strong>Fehler:</strong> {error}
            </div>
          )}
        </section>

        {result && !result.error && (
          <section className="section card" style={{ maxWidth: 800 }}>
            <h2>{result.perfume_name || 'Duft'}</h2>
            <p style={{ color: '#999', marginBottom: 20 }}>{result.brand}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 20 }}>
              <div style={{ padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 4, fontSize: 12 }}>DUFTFAMILIE</div>
                <div>{result.fragrance_family || '–'}</div>
              </div>
              <div style={{ padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 4, fontSize: 12 }}>GESCHLECHT</div>
                <div>{result.gender || '–'}</div>
              </div>
              <div style={{ padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 4, fontSize: 12 }}>PREIS</div>
                <div>{result.price_chf ? `CHF ${result.price_chf}` : '–'}</div>
              </div>
              <div style={{ padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 4, fontSize: 12 }}>SILLAGE</div>
                <div>{result.sillage ? `${result.sillage}/10` : '–'}</div>
              </div>
            </div>

            {result.top_notes && (
              <div style={{ marginBottom: 15 }}>
                <strong>Kopfnoten:</strong> {result.top_notes}
              </div>
            )}
            {result.heart_notes && (
              <div style={{ marginBottom: 15 }}>
                <strong>Herznoten:</strong> {result.heart_notes}
              </div>
            )}
            {result.base_notes && (
              <div style={{ marginBottom: 15 }}>
                <strong>Basisnoten:</strong> {result.base_notes}
              </div>
            )}

            <div style={{ marginTop: 30, display: 'flex', gap: 10 }}>
              <button className="button" onClick={useResult}>
                ✅ Diese Daten verwenden
              </button>
              <button className="button secondary" onClick={() => setResult(null)}>
                🔄 Neu recherchieren
              </button>
              <Link className="button secondary" href="/admin">
                ← Zurück
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
