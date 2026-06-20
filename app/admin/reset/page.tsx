'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    // Beim Klick auf den Link aus der E-Mail erstellt Supabase automatisch eine
    // Wiederherstellungs-Sitzung (in der URL). Wir warten, bis sie da ist.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    if (password.length < 8) {
      setMessage('Das Passwort muss mindestens 8 Zeichen haben.');
      return;
    }
    if (password !== password2) {
      setMessage('Die Passwörter stimmen nicht überein.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMessage(`Fehler: ${error.message}`);
    else setDone(true);
  }

  return (
    <main>
      <div className="container">
        <nav className="nav">
          <Link className="logo" href="/">ScentMatch AI</Link>
          <div className="badge">Passwort zurücksetzen</div>
        </nav>

        <section className="section card" style={{ maxWidth: 460 }}>
          {done ? (
            <>
              <h2>Passwort geändert ✓</h2>
              <p className="lead">Dein neues Passwort ist gespeichert.</p>
              <Link className="button" href="/admin">Zum Login</Link>
            </>
          ) : !ready ? (
            <>
              <h2>Link öffnen</h2>
              <p className="small">Bitte öffne diese Seite über den Link in der E-Mail „Passwort zurücksetzen". Danach kannst du hier ein neues Passwort setzen.</p>
              <Link className="button secondary" href="/admin">Zurück zum Login</Link>
            </>
          ) : (
            <>
              <h2>Neues Passwort setzen</h2>
              <form onSubmit={submit}>
                <div className="field">
                  <label>Neues Passwort (mind. 8 Zeichen)</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Passwort wiederholen</label>
                  <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} required />
                </div>
                {message && <p className="admin-msg" style={{ color: message.startsWith('Fehler') ? '#b3261e' : '#1b7a3d' }}>{message}</p>}
                <button className="button" type="submit">Passwort speichern</button>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
