'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const FAMILIES: [string, string][] = [
  ['clean', 'Clean / Frisch'],
  ['gourmand', 'Gourmand / Süß'],
  ['woody', 'Woody / Holzig'],
  ['floral', 'Floral / Blumig']
];
const GENDERS = ['Women', 'Men', 'Unisex'];
const SEASONS = ['Frühling', 'Sommer', 'Herbst/Winter', 'Winter', 'Ganzjährig'];
const OCCASIONS = ['Alltag', 'Büro', 'Date', 'Abend'];

const emptyForm = {
  perfume_name: '',
  brand: '',
  fragrance_family: 'clean',
  gender: 'Unisex',
  price_chf: '',
  longevity: '',
  sillage: '',
  scentmatch_score: '',
  season: 'Ganzjährig',
  occasion: 'Alltag',
  top_notes: '',
  heart_notes: '',
  base_notes: '',
  image_url: '',
  affiliate_url: ''
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type AdminPerfume = {
  id: string;
  perfume_name: string;
  brand_id: string | null;
  fragrance_family: string | null;
  gender: string | null;
  price_chf: number | null;
  longevity: number | null;
  sillage: number | null;
  scentmatch_score: number | null;
  season: string | null;
  occasion: string | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  image_url: string | null;
  affiliate_url: string | null;
};

const PERFUME_EDIT_FIELDS =
  'id, perfume_name, brand_id, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, image_url, affiliate_url';

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState<any>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [perfumes, setPerfumes] = useState<AdminPerfume[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function loadBrands() {
    const { data } = await supabase.from('brands').select('id, name').order('name');
    setBrands((data as { id: string; name: string }[]) || []);
  }

  async function loadPerfumes() {
    const { data } = await supabase.from('perfumes').select(PERFUME_EDIT_FIELDS).order('perfume_name');
    setPerfumes((data as AdminPerfume[]) || []);
  }

  useEffect(() => {
    if (!session) return;
    loadBrands();
    loadPerfumes();
  }, [session]);

  function setField(key: keyof typeof emptyForm, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function startEdit(id: string) {
    const p = perfumes.find(x => x.id === id);
    if (!p) return;
    setEditingId(p.id);
    setForm({
      perfume_name: p.perfume_name || '',
      brand: brands.find(b => b.id === p.brand_id)?.name || '',
      fragrance_family: p.fragrance_family || 'clean',
      gender: p.gender || 'Unisex',
      price_chf: p.price_chf?.toString() ?? '',
      longevity: p.longevity?.toString() ?? '',
      sillage: p.sillage?.toString() ?? '',
      scentmatch_score: p.scentmatch_score?.toString() ?? '',
      season: p.season || 'Ganzjährig',
      occasion: p.occasion || 'Alltag',
      top_notes: (p.top_notes || []).join(', '),
      heart_notes: (p.heart_notes || []).join(', '),
      base_notes: (p.base_notes || []).join(', '),
      image_url: p.image_url || '',
      affiliate_url: p.affiliate_url || ''
    });
    setMessage('');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setMessage('');
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  async function resetPassword() {
    setAuthError('');
    setResetSent(false);
    if (!email) {
      setAuthError('Bitte zuerst deine E-Mail oben eingeben.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset`
    });
    if (error) setAuthError(error.message);
    else setResetSent(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const name = form.perfume_name.trim();
      if (!name) {
        setMessage('Bitte einen Duftnamen eingeben.');
        setSaving(false);
        return;
      }

      let brandId: string | null = null;
      const brandName = form.brand.trim();
      if (brandName) {
        const existing = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
        if (existing) {
          brandId = existing.id;
        } else {
          const { data, error } = await supabase
            .from('brands')
            .insert({ name: brandName, slug: slugify(brandName) })
            .select('id')
            .single();
          if (error) throw error;
          brandId = (data as { id: string }).id;
        }
      }

      const toArray = (s: string) => s.split(',').map(x => x.trim()).filter(Boolean);
      const toNumber = (s: string) => (s === '' ? null : Number(s));

      // Gemeinsame Felder. Beim Bearbeiten lassen wir slug und description
      // bewusst unangetastet (Links bleiben gleich, manuelle Texte erhalten).
      const fields = {
        perfume_name: name,
        brand_id: brandId,
        fragrance_family: form.fragrance_family,
        gender: form.gender,
        price_chf: toNumber(form.price_chf),
        longevity: toNumber(form.longevity),
        sillage: toNumber(form.sillage),
        scentmatch_score: toNumber(form.scentmatch_score),
        season: form.season,
        occasion: form.occasion,
        top_notes: toArray(form.top_notes),
        heart_notes: toArray(form.heart_notes),
        base_notes: toArray(form.base_notes),
        image_url: form.image_url.trim() || null,
        affiliate_url: form.affiliate_url.trim() || null
      };

      if (editingId) {
        const { error } = await supabase.from('perfumes').update(fields).eq('id', editingId);
        if (error) throw error;
        setMessage(`✓ Duft aktualisiert: ${name}`);
      } else {
        const { error } = await supabase.from('perfumes').insert({ ...fields, slug: slugify(name) });
        if (error) throw error;
        setMessage(`✓ Duft gespeichert: ${name}`);
      }

      setEditingId(null);
      setForm({ ...emptyForm });
      await loadBrands();
      await loadPerfumes();
    } catch (err: any) {
      setMessage(`Fehler: ${err?.message || 'unbekannt'}`);
    }
    setSaving(false);
  }

  if (checking) {
    return (
      <main>
        <div className="container">
          <p className="small">Lädt…</p>
        </div>
      </main>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <main>
        <div className="container">
          <h1>Admin</h1>
          <p className="lead">Supabase ist noch nicht konfiguriert. Bitte die Umgebungsvariablen in Vercel setzen.</p>
          <Link className="button" href="/">Zurück zur Startseite</Link>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main>
        <div className="container">
          <nav className="nav">
            <Link className="logo" href="/">Vaelo</Link>
            <div className="badge">Admin-Login</div>
          </nav>
          <section className="section card" style={{ maxWidth: 460 }}>
            <h2>Anmelden</h2>
            <p className="small">Nur für Administratoren. Melde dich mit deinem Supabase-Login an.</p>
            <form onSubmit={login}>
              <div className="field">
                <label>E-Mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="field">
                <label>Passwort</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              {authError && <p className="admin-msg" style={{ color: '#b3261e' }}>{authError}</p>}
              {resetSent && <p className="admin-msg" style={{ color: '#1b7a3d' }}>E-Mail zum Zurücksetzen wurde gesendet. Schau in dein Postfach (auch im Spam-Ordner).</p>}
              <button className="button" type="submit">Anmelden</button>
            </form>
            <button type="button" onClick={resetPassword} className="link-button">Passwort vergessen?</button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <nav className="nav">
          <Link className="logo" href="/">Vaelo</Link>
          <button className="button secondary" onClick={logout}>Abmelden</button>
        </nav>

        <section className="section card">
          <h2>Bestehenden Duft bearbeiten</h2>
          <p className="small">
            Wähle einen Duft aus, um seine Daten zu prüfen und zu korrigieren. Der Link (slug) und
            eine eventuell vorhandene eigene Beschreibung bleiben dabei erhalten.
          </p>
          <select
            className="search"
            value={editingId || ''}
            onChange={e => (e.target.value ? startEdit(e.target.value) : cancelEdit())}
          >
            <option value="">– Duft zum Bearbeiten wählen ({perfumes.length}) –</option>
            {perfumes.map(p => (
              <option value={p.id} key={p.id}>
                {p.perfume_name}
              </option>
            ))}
          </select>
        </section>

        <section className="section card">
          <h2>{editingId ? 'Duft bearbeiten' : 'Neuen Duft hinzufügen'}</h2>
          <p className="small">
            Mehrere Noten mit Komma trennen (z. B. „Bergamotte, Zitrone, Neroli"). Pflichtfeld ist nur der Name.
            {editingId && ' Du bearbeitest gerade einen bestehenden Duft.'}
          </p>

          <form onSubmit={save}>
            <div className="admin-grid">
              <div className="field">
                <label>Duftname *</label>
                <input value={form.perfume_name} onChange={e => setField('perfume_name', e.target.value)} required />
              </div>
              <div className="field">
                <label>Marke</label>
                <input list="brand-list" value={form.brand} onChange={e => setField('brand', e.target.value)} placeholder="bestehende wählen oder neue tippen" />
                <datalist id="brand-list">
                  {brands.map(b => <option value={b.name} key={b.id} />)}
                </datalist>
              </div>
              <div className="field">
                <label>Duftfamilie</label>
                <select value={form.fragrance_family} onChange={e => setField('fragrance_family', e.target.value)}>
                  {FAMILIES.map(([code, label]) => <option value={code} key={code}>{label}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Geschlecht</label>
                <select value={form.gender} onChange={e => setField('gender', e.target.value)}>
                  {GENDERS.map(g => <option value={g} key={g}>{g}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Preis (CHF)</label>
                <input type="number" value={form.price_chf} onChange={e => setField('price_chf', e.target.value)} />
              </div>
              <div className="field">
                <label>Vaelo-Score (0–100)</label>
                <input type="number" value={form.scentmatch_score} onChange={e => setField('scentmatch_score', e.target.value)} />
              </div>
              <div className="field">
                <label>Haltbarkeit (1–10)</label>
                <input type="number" value={form.longevity} onChange={e => setField('longevity', e.target.value)} />
              </div>
              <div className="field">
                <label>Sillage (1–10)</label>
                <input type="number" value={form.sillage} onChange={e => setField('sillage', e.target.value)} />
              </div>
              <div className="field">
                <label>Saison</label>
                <select value={form.season} onChange={e => setField('season', e.target.value)}>
                  {SEASONS.map(s => <option value={s} key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Anlass</label>
                <select value={form.occasion} onChange={e => setField('occasion', e.target.value)}>
                  {OCCASIONS.map(o => <option value={o} key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label>Kopfnoten (mit Komma getrennt)</label>
              <input value={form.top_notes} onChange={e => setField('top_notes', e.target.value)} />
            </div>
            <div className="field">
              <label>Herznoten (mit Komma getrennt)</label>
              <input value={form.heart_notes} onChange={e => setField('heart_notes', e.target.value)} />
            </div>
            <div className="field">
              <label>Basisnoten (mit Komma getrennt)</label>
              <input value={form.base_notes} onChange={e => setField('base_notes', e.target.value)} />
            </div>
            <div className="field">
              <label>Bild-Link (URL, optional)</label>
              <input value={form.image_url} onChange={e => setField('image_url', e.target.value)} placeholder="https://… (nur Bilder, die du verwenden darfst)" />
            </div>
            <div className="field">
              <label>Affiliate-Link / Shop-URL (optional)</label>
              <input value={form.affiliate_url} onChange={e => setField('affiliate_url', e.target.value)} placeholder="https://… (dein persönlicher Partner-Link zum Shop)" />
            </div>

            {message && <p className="admin-msg" style={{ color: message.startsWith('Fehler') ? '#b3261e' : '#1b7a3d' }}>{message}</p>}

            <div className="cta">
              <button className="button" type="submit" disabled={saving}>
                {saving ? 'Speichert…' : editingId ? 'Änderungen speichern' : 'Duft speichern'}
              </button>
              {editingId && (
                <button className="button secondary" type="button" onClick={cancelEdit} disabled={saving}>
                  Abbrechen / neuer Duft
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
