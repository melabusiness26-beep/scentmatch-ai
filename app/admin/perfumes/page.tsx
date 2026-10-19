'use client';

import React, { useState, useEffect, ReactElement } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import type { Perfume } from '@/lib/perfumes';

export default function AdminPerfumesPage(): ReactElement {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setIsLoggedIn(false);
        setError('Du musst angemeldet sein, um diese Seite zu sehen.');
        setIsLoading(false);
        return;
      }

      setIsLoggedIn(true);
      fetchPerfumes();
    } catch (err) {
      setError('Fehler beim Laden. Bitte versuche es später erneut.');
      setIsLoading(false);
    }
  };

  const fetchPerfumes = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('perfumes')
        .select(
          `
          id,
          perfume_name,
          slug,
          brand_id,
          brands ( name ),
          gender,
          fragrance_family,
          price_chf,
          created_at
        `
        )
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPerfumes((data as any[]) || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Fehler beim Laden der Düfte.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Diesen Duft wirklich löschen?')) return;

    try {
      const { error: deleteError } = await supabase.from('perfumes').delete().eq('id', id);

      if (deleteError) throw deleteError;

      setPerfumes(perfumes.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Fehler beim Löschen des Dufts.');
    }
  };

  const filteredPerfumes = perfumes.filter(
    (p) =>
      p.perfume_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brands as any)?.[0]?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <article className="legal-page">
        <section className="page-content">
          <h1>Zugriff verweigert</h1>
          <p>Du musst angemeldet sein, um diese Seite zu sehen.</p>
          <Link href="/admin" className="button button-primary">
            Zur Anmeldung
          </Link>
        </section>
      </article>
    );
  }

  return (
    <article className="legal-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Düfte verwalten</h1>
          <p className="lead">Bearbeite und lösche Düfte in deinem Katalog</p>
        </div>
      </section>

      <section className="page-content">
        <div className="admin-toolbar">
          <Link href="/admin/perfumes/new" className="button button-primary">
            ➕ Neuer Duft
          </Link>
          <Link href="/admin" className="button button-secondary">
            ← Zurück
          </Link>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Nach Duft oder Marke suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        {isLoading ? (
          <p>Wird geladen...</p>
        ) : filteredPerfumes.length === 0 ? (
          <p>Keine Düfte gefunden.</p>
        ) : (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Duft</th>
                  <th>Marke</th>
                  <th>Geschlecht</th>
                  <th>Familie</th>
                  <th>Preis (CHF)</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredPerfumes.map((perfume) => (
                  <tr key={perfume.id}>
                    <td>{perfume.perfume_name}</td>
                    <td>{(perfume.brands as any)?.[0]?.name || '—'}</td>
                    <td>{perfume.gender}</td>
                    <td>{perfume.fragrance_family}</td>
                    <td>{perfume.price_chf}</td>
                    <td>
                      <Link
                        href={`/admin/perfumes/${perfume.id}/edit`}
                        className="button button-secondary small"
                      >
                        Bearbeiten
                      </Link>
                      <button
                        onClick={() => handleDelete(perfume.id)}
                        className="button button-danger small"
                        style={{ marginLeft: '0.5rem' }}
                      >
                        Löschen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </article>
  );
}
