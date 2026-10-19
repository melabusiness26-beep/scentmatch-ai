'use client';

import React, { useState, useEffect, ReactElement } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default function AdminPage(): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [perfumeCount, setPerfumeCount] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session) {
        fetchPerfumeCount();
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPerfumeCount = async () => {
    try {
      const { count } = await supabase
        .from('perfumes')
        .select('*', { count: 'exact', head: true });
      setPerfumeCount(count || 0);
    } catch (error) {
      console.error('Error fetching perfume count:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoginError(error.message);
      } else {
        setIsLoggedIn(true);
        fetchPerfumeCount();
      }
    } catch (error) {
      setLoginError('Login fehlgeschlagen. Bitte versuche es später erneut.');
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Wird geladen...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <article className="legal-page">
        <section className="page-hero">
          <div className="page-hero-inner">
            <h1>Admin-Dashboard</h1>
            <p className="lead">Auressa – Duft-Verwaltung</p>
          </div>
        </section>

        <section className="page-content" style={{ maxWidth: '400px' }}>
          <h2>Anmelden</h2>

          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label htmlFor="email">E-Mail-Adresse</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.ch"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Passwort</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <div className="error-message" role="alert">
                {loginError}
              </div>
            )}

            <button type="submit" className="button button-primary">
              Anmelden
            </button>
          </form>

          <p style={{ marginTop: '2rem', fontSize: '14px', color: '#666' }}>
            Passwort vergessen?{' '}
            <Link href="/admin/reset" style={{ color: '#D4AF37' }}>
              Hier zurücksetzen
            </Link>
          </p>
        </section>
      </article>
    );
  }

  return (
    <article className="legal-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Admin-Dashboard</h1>
          <p className="lead">Willkommen, {email}</p>
        </div>
      </section>

      <section className="page-content">
        <div style={{ marginBottom: '2rem' }}>
          <button onClick={handleLogout} className="button button-secondary">
            Abmelden
          </button>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-number">{perfumeCount}</div>
            <div className="stat-label">Düfte im Katalog</div>
          </div>
        </div>

        <h2>Duft-Verwaltung</h2>
        <p>
          Verwende die folgenden Tools, um Düfte in deinen Katalog zu verwalten:
        </p>

        <div className="admin-links">
          <Link href="/admin/perfumes/new" className="admin-link-card">
            <div className="icon">➕</div>
            <h3>Neuen Duft hinzufügen</h3>
            <p>Füge einen neuen Duft zu deinem Katalog hinzu</p>
          </Link>

          <Link href="/admin/perfumes" className="admin-link-card">
            <div className="icon">📋</div>
            <h3>Düfte bearbeiten</h3>
            <p>Bearbeite bestehende Düfte oder lösche sie</p>
          </Link>

          <Link href="/admin/brands" className="admin-link-card">
            <div className="icon">🏷️</div>
            <h3>Marken verwalten</h3>
            <p>Verwalte Duft-Marken</p>
          </Link>
        </div>

        <hr style={{ margin: '3rem 0' }} />

        <h3>Systemeinformationen</h3>
        <ul>
          <li>
            <strong>Supabase:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Verbunden' : '✗ Nicht verbunden'}
          </li>
          <li>
            <strong>Database Rolle:</strong> Authentifiziert
          </li>
        </ul>

        <hr style={{ margin: '3rem 0' }} />

        <p style={{ fontSize: '14px', color: '#999' }}>
          Fragen? Schreib an:{' '}
          <a href="mailto:melanie.viele@auressa.ch">melanie.viele@auressa.ch</a>
        </p>
      </section>
    </article>
  );
}
