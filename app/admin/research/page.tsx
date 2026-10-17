'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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
          <section className="section card" style={{ maxWidth: 800 }}>
            <h2>✅ Recherche-Ergebnisse</h2>

            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              <p><strong>Duftname:</strong> {result.perfume_name || '–'}</p>
              <p><strong>Marke:</strong> {result.brand || '–'}</p>
              <p><strong>Familie:</strong> {result.fragrance_family || '–'}</p>
              <p><strong>Geschlecht:</strong> {result.gender || '–'}</p>
              <p><strong>Preis CHF:</strong> {result.price_chf || '–'}</p>
              <p><strong>Haltbarkeit (1-10):</strong> {result.longevity || '–'}</p>
              <p><strong>Sillage (1-10):</strong> {result.sillage || '–'}</p>
              <p><strong>Saison:</strong> {result.season || '–'}</p>
              <p><strong>Anlass:</strong> {result.occasion || '–'}</p>
              <p><strong>Kopfnoten:</strong> {result.top_notes || '–'}</p>
              <p><strong>Herznoten:</strong> {result.heart_notes || '–'}</p>
              <p><strong>Basisnoten:</strong> {result.base_notes || '–'}</p>

              <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />

              <p style={{ fontSize: 12, color: '#666' }}>
                <strong>Quellen:</strong> {result.sources.join(', ') || 'Keine'}
              </p>
              <p style={{ fontSize: 12, color: '#666' }}>
                <strong>Daten-Qualität:</strong> {result.notes_confidence === 'high' ? '⭐⭐⭐ Sehr zuverlässig' : result.notes_confidence === 'medium' ? '⭐⭐ Teilweise zuverlässig' : '⭐ Begrenzt verfügbar'}
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
