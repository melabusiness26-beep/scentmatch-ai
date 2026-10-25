'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const FAMILIES = [['clean', 'Clean / Frisch'], ['gourmand', 'Gourmand / Süß'], ['woody', 'Woody / Holzig'], ['floral', 'Floral / Blumig']] as const;
const GENDERS = ['Women', 'Men', 'Unisex'] as const;
const SEASONS = ['Frühling', 'Sommer', 'Herbst/Winter', 'Winter', 'Ganzjährig'] as const;
const OCCASIONS = ['Alltag', 'Büro', 'Date', 'Abend'] as const;
const CONCENTRATIONS = ['EdP', 'EdT', 'EdC', 'Extrait', 'Cologne', 'Spray'] as const;
const INTENSITIES = ['Zart', 'Ausgewogen', 'Kräftig'] as const;
const AGE_GROUPS = ['18-25', '25-35', '35-40', 'all'] as const;
const LIFESTYLES = ['student', 'professional', 'party', 'casual', 'sporty'] as const;
const TREND_VIBES = ['trendy', 'classic', 'niche', 'popular'] as const;

const PERFUME_EDIT_FIELDS =
  'id, perfume_name, brand_id, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, image_url, affiliate_url, concentration, release_year, volume_ml, rating, flacon_description, similar_perfumes, age_group, lifestyle, trend_vibe, gender_nuance, description, created_at';

type AdminPerfume = {
  id: string;
  perfume_name: string;
  brand_id: string | null;
  fragrance_family: string | null;
  gender: string | null;
  price_chf: number | null;
  longevity: string | null;
  sillage: string | null;
  scentmatch_score: number | null;
  season: string | null;
  occasion: string | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  image_url: string | null;
  affiliate_url: string | null;
  concentration?: string | null;
  release_year?: number | null;
  volume_ml?: number | null;
  rating?: number | null;
  flacon_description?: string | null;
  similar_perfumes?: string[] | null;
  age_group?: string | null;
  lifestyle?: string | null;
  trend_vibe?: string | null;
  gender_nuance?: string | null;
  description?: string | null;
};

const emptyForm = {
  perfume_name: '',
  brand: '',
  fragrance_family: 'clean' as const,
  gender: 'Unisex' as const,
  price_chf: '',
  longevity: 'Ausgewogen',
  sillage: 'Ausgewogen',
  scentmatch_score: '',
  season: 'Ganzjährig' as const,
  occasion: 'Alltag' as const,
  top_notes: '',
  heart_notes: '',
  base_notes: '',
  image_url: '',
  affiliate_url: '',
  concentration: 'EdP' as const,
  release_year: '',
  volume_ml: '',
  rating: '',
  flacon_description: '',
  similar_perfumes: '',
  age_group: 'all' as const,
  lifestyle: 'casual' as const,
  trend_vibe: 'classic' as const,
  gender_nuance: '',
  description: ''
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
  const [activeTab, setActiveTab] = useState<'basic' | 'notes' | 'details' | 'media' | 'advanced'>('basic');
  const [deletingAll, setDeletingAll] = useState(false);
  const [deletingBrands, setDeleteingBrands] = useState(false);

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

  function setField(key: keyof typeof emptyForm, value: any) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function startEdit(id: string) {
    const p = perfumes.find(x => x.id === id);
    if (!p) return;
    setEditingId(p.id);
    setForm({
      perfume_name: p.perfume_name || '',
      brand: brands.find(b => b.id === p.brand_id)?.name || '',
      fragrance_family: (p.fragrance_family || 'clean') as any,
      gender: (p.gender || 'Unisex') as any,
      price_chf: p.price_chf?.toString() ?? '',
      longevity: p.longevity || 'Ausgewogen',
      sillage: p.sillage || 'Ausgewogen',
      scentmatch_score: p.scentmatch_score?.toString() ?? '',
      season: (p.season || 'Ganzjährig') as any,
      occasion: (p.occasion || 'Alltag') as any,
      top_notes: (p.top_notes || []).join(', '),
      heart_notes: (p.heart_notes || []).join(', '),
      base_notes: (p.base_notes || []).join(', '),
      image_url: p.image_url || '',
      affiliate_url: p.affiliate_url || '',
      concentration: (p.concentration || 'EdP') as any,
      release_year: p.release_year?.toString() ?? '',
      volume_ml: p.volume_ml?.toString() ?? '',
      rating: p.rating?.toString() ?? '',
      flacon_description: p.flacon_description || '',
      similar_perfumes: (p.similar_perfumes || []).join(', '),
      age_group: (p.age_group || 'all') as any,
      lifestyle: (p.lifestyle || 'casual') as any,
      trend_vibe: (p.trend_vibe || 'classic') as any,
      gender_nuance: p.gender_nuance || '',
      description: p.description || ''
    });
    setActiveTab('basic');
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setMessage('');
    setActiveTab('basic');
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

  async function deleteAllPerfumes() {
    if (!confirm('⚠️ ACHTUNG! Alle Düfte löschen?')) return;
    if (!confirm('Zweite Bestätigung erforderlich!')) return;

    setDeletingAll(true);
    try {
      const response = await fetch('/api/admin/delete-all-perfumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: 'DELETE_ALL_PERFUMES' })
      });
      if (response.ok) {
        setMessage('✅ Alle Düfte gelöscht!');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage('Fehler beim Löschen');
      }
    } catch (error: any) {
      setMessage(`Fehler: ${error.message}`);
    }
    setDeletingAll(false);
  }

  async function deleteAllBrands() {
    if (!confirm('⚠️ ACHTUNG! Alle Marken löschen?')) return;
    if (!confirm('Zweite Bestätigung erforderlich!')) return;

    setDeleteingBrands(true);
    try {
      const response = await fetch('/api/admin/delete-all-brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: 'DELETE_ALL_BRANDS' })
      });
      if (response.ok) {
        setMessage('✅ Alle Marken gelöscht!');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage('Fehler beim Löschen');
      }
    } catch (error: any) {
      setMessage(`Fehler: ${error.message}`);
    }
    setDeleteingBrands(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const name = form.perfume_name.trim();
      if (!name) {
        setMessage('❌ Duftname erforderlich');
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

      const fields = {
        perfume_name: name,
        brand_id: brandId,
        fragrance_family: form.fragrance_family,
        gender: form.gender,
        price_chf: toNumber(form.price_chf),
        longevity: form.longevity,
        sillage: form.sillage,
        scentmatch_score: toNumber(form.scentmatch_score),
        season: form.season,
        occasion: form.occasion,
        top_notes: toArray(form.top_notes),
        heart_notes: toArray(form.heart_notes),
        base_notes: toArray(form.base_notes),
        image_url: form.image_url.trim() || null,
        affiliate_url: form.affiliate_url.trim() || null,
        concentration: form.concentration,
        release_year: toNumber(form.release_year),
        volume_ml: toNumber(form.volume_ml),
        rating: toNumber(form.rating),
        flacon_description: form.flacon_description.trim() || null,
        similar_perfumes: toArray(form.similar_perfumes),
        age_group: form.age_group,
        lifestyle: form.lifestyle,
        trend_vibe: form.trend_vibe,
        gender_nuance: form.gender_nuance.trim() || null,
        description: form.description.trim() || null
      };

      if (editingId) {
        const { error } = await supabase.from('perfumes').update(fields).eq('id', editingId);
        if (error) throw error;
        setMessage(`✅ ${name} aktualisiert`);
      } else {
        const { error } = await supabase.from('perfumes').insert({ ...fields, slug: slugify(name) });
        if (error) throw error;
        setMessage(`✅ ${name} gespeichert`);
      }

      setEditingId(null);
      setForm({ ...emptyForm });
      setActiveTab('basic');
      await loadBrands();
      await loadPerfumes();
    } catch (err: any) {
      setMessage(`❌ ${err?.message || 'Fehler'}`);
    }
    setSaving(false);
  }

  if (checking) return <main><div className="container"><p>Lädt…</p></div></main>;
  if (!isSupabaseConfigured) return <main><div className="container"><h1>Admin</h1><p>Supabase nicht konfiguriert</p></div></main>;

  if (!session) {
    return (
      <main>
        <div className="container">
          <nav className="nav">
            <Link className="logo" href="/">Auressa</Link>
            <div className="badge">Admin</div>
          </nav>
          <section className="section card" style={{ maxWidth: 460 }}>
            <h2>🔐 Admin-Login</h2>
            <form onSubmit={login}>
              <div className="field">
                <label>E-Mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="field">
                <label>Passwort</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              {authError && <p style={{ color: '#b3261e' }}>❌ {authError}</p>}
              {resetSent && <p style={{ color: '#1b7a3d' }}>✅ Link zum Zurücksetzen gesendet</p>}
              <button className="button" type="submit">Anmelden</button>
            </form>
            <button type="button" onClick={() => resetPassword()} className="link-button" style={{ marginTop: 15 }}>Passwort vergessen?</button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <nav className="nav">
          <Link className="logo" href="/">Auressa</Link>
          <button className="button secondary" onClick={logout}>Abmelden</button>
        </nav>

        {/* TAB-NAVIGATION */}
        <div style={{
          display: 'flex',
          gap: 10,
          marginBottom: 30,
          borderBottom: '2px solid #D4AF37',
          paddingBottom: 0,
          overflowX: 'auto'
        }}>
          {['basic', 'notes', 'details', 'media', 'advanced'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab ? '#D4AF37' : 'transparent',
                color: activeTab === tab ? '#1F1410' : '#6B5344',
                border: 'none',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? '700' : '400',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '0.1em',
                borderBottom: activeTab === tab ? '3px solid #D4AF37' : 'none'
              }}
            >
              {['Basis', 'Noten', 'Details', 'Media', 'Advanced'][['basic', 'notes', 'details', 'media', 'advanced'].indexOf(tab)]}
            </button>
          ))}
        </div>

        <section className="section card">
          <h2>{editingId ? '✏️ Duft bearbeiten' : '➕ Neuen Duft hinzufügen'}</h2>
          <select
            className="search"
            value={editingId || ''}
            onChange={e => (e.target.value ? startEdit(e.target.value) : cancelEdit())}
            style={{ marginBottom: 20 }}
          >
            <option value="">– Duft bearbeiten ({perfumes.length}) –</option>
            {perfumes.map(p => (
              <option value={p.id} key={p.id}>{p.perfume_name}</option>
            ))}
          </select>

          <form onSubmit={save}>
            {/* TAB: BASIC */}
            {activeTab === 'basic' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <div className="field"><label>Duftname *</label><input value={form.perfume_name} onChange={e => setField('perfume_name', e.target.value)} required /></div>
                <div className="field"><label>Marke</label><input list="brand-list" value={form.brand} onChange={e => setField('brand', e.target.value)} /><datalist id="brand-list">{brands.map(b => <option value={b.name} key={b.id} />)}</datalist></div>
                <div className="field"><label>Duftfamilie</label><select value={form.fragrance_family} onChange={e => setField('fragrance_family', e.target.value)}>{FAMILIES.map(([k, v]) => <option value={k} key={k}>{v}</option>)}</select></div>
                <div className="field"><label>Geschlecht</label><select value={form.gender} onChange={e => setField('gender', e.target.value)}>{GENDERS.map(g => <option value={g} key={g}>{g}</option>)}</select></div>
              </div>
            )}

            {/* TAB: NOTES */}
            {activeTab === 'notes' && (
              <div>
                <div className="field"><label>📌 Kopfnoten (Komma-getrennt)</label><input value={form.top_notes} onChange={e => setField('top_notes', e.target.value)} placeholder="Bergamotte, Zitrone, Neroli" /></div>
                <div className="field"><label>💚 Herznoten (Komma-getrennt)</label><input value={form.heart_notes} onChange={e => setField('heart_notes', e.target.value)} placeholder="Jasmin, Rose, Ylang-Ylang" /></div>
                <div className="field"><label>🌳 Basisnoten (Komma-getrennt)</label><input value={form.base_notes} onChange={e => setField('base_notes', e.target.value)} placeholder="Sandelholz, Moschus, Vanille" /></div>
              </div>
            )}

            {/* TAB: DETAILS */}
            {activeTab === 'details' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <div className="field"><label>Preis (CHF)</label><input type="number" value={form.price_chf} onChange={e => setField('price_chf', e.target.value)} /></div>
                <div className="field"><label>Auressa-Score (0-100)</label><input type="number" value={form.scentmatch_score} onChange={e => setField('scentmatch_score', e.target.value)} /></div>
                <div className="field"><label>Haltbarkeit</label><select value={form.longevity} onChange={e => setField('longevity', e.target.value)}>{INTENSITIES.map(i => <option value={i} key={i}>{i}</option>)}</select></div>
                <div className="field"><label>Sillage</label><select value={form.sillage} onChange={e => setField('sillage', e.target.value)}>{INTENSITIES.map(i => <option value={i} key={i}>{i}</option>)}</select></div>
                <div className="field"><label>Saison</label><select value={form.season} onChange={e => setField('season', e.target.value)}>{SEASONS.map(s => <option value={s} key={s}>{s}</option>)}</select></div>
                <div className="field"><label>Anlass</label><select value={form.occasion} onChange={e => setField('occasion', e.target.value)}>{OCCASIONS.map(o => <option value={o} key={o}>{o}</option>)}</select></div>
              </div>
            )}

            {/* TAB: MEDIA */}
            {activeTab === 'media' && (
              <div>
                <div className="field"><label>🖼️ Bild-URL</label><input value={form.image_url} onChange={e => setField('image_url', e.target.value)} placeholder="https://..." /></div>
                <div className="field"><label>🛒 Affiliate-Link</label><input value={form.affiliate_url} onChange={e => setField('affiliate_url', e.target.value)} placeholder="https://www.notino.ch/..." /></div>
                <div className="field"><label>📝 Beschreibung</label><textarea value={form.description} onChange={e => setField('description', e.target.value)} placeholder="Ausführliche Duft-Beschreibung..." style={{ minHeight: 100 }} /></div>
              </div>
            )}

            {/* TAB: ADVANCED */}
            {activeTab === 'advanced' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <div className="field"><label>Konzentration</label><select value={form.concentration} onChange={e => setField('concentration', e.target.value)}>{CONCENTRATIONS.map(c => <option value={c} key={c}>{c}</option>)}</select></div>
                <div className="field"><label>Jahr</label><input type="number" min="1900" max={new Date().getFullYear()} value={form.release_year} onChange={e => setField('release_year', e.target.value)} /></div>
                <div className="field"><label>Volumen (ml)</label><input type="number" min="1" max="500" value={form.volume_ml} onChange={e => setField('volume_ml', e.target.value)} /></div>
                <div className="field"><label>Bewertung (0-10)</label><input type="number" step="0.1" min="0" max="10" value={form.rating} onChange={e => setField('rating', e.target.value)} /></div>
                <div className="field"><label>Altersgruppe</label><select value={form.age_group} onChange={e => setField('age_group', e.target.value)}>{AGE_GROUPS.map(a => <option value={a} key={a}>{a}</option>)}</select></div>
                <div className="field"><label>Lifestyle</label><select value={form.lifestyle} onChange={e => setField('lifestyle', e.target.value)}>{LIFESTYLES.map(l => <option value={l} key={l}>{l}</option>)}</select></div>
                <div className="field"><label>Trend-Vibe</label><select value={form.trend_vibe} onChange={e => setField('trend_vibe', e.target.value)}>{TREND_VIBES.map(t => <option value={t} key={t}>{t}</option>)}</select></div>
                <div className="field"><label>Gender-Nuance</label><input value={form.gender_nuance} onChange={e => setField('gender_nuance', e.target.value)} placeholder="masculine, feminine, androgynous" /></div>
                <div style={{ gridColumn: '1 / -1' }} className="field"><label>Flakon-Beschreibung</label><textarea value={form.flacon_description} onChange={e => setField('flacon_description', e.target.value)} placeholder="Beschreibung des Flakons..." style={{ minHeight: 80 }} /></div>
                <div style={{ gridColumn: '1 / -1' }} className="field"><label>Ähnliche Düfte (Komma-getrennt)</label><input value={form.similar_perfumes} onChange={e => setField('similar_perfumes', e.target.value)} placeholder="Aventus, Sauvage, Bleu de Chanel" /></div>
              </div>
            )}

            {message && <p style={{ color: message.startsWith('✅') ? '#1b7a3d' : '#b3261e', marginTop: 20 }}>{message}</p>}

            <div className="cta" style={{ marginTop: 30 }}>
              <button className="button" type="submit" disabled={saving}>{saving ? '⏳ Speichert...' : editingId ? '💾 Speichern' : '➕ Hinzufügen'}</button>
              {editingId && <button className="button secondary" type="button" onClick={cancelEdit} disabled={saving}>❌ Abbrechen</button>}
            </div>

            <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #ff6b6b' }} />
            <h3 style={{ color: '#ff6b6b' }}>🗑️ Datenbank-Verwaltung</h3>
            <button type="button" onClick={deleteAllPerfumes} disabled={deletingAll} style={{ background: '#ff6b6b', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: 10 }}>
              {deletingAll ? '⏳ Löscht...' : '🗑️ Alle Düfte löschen'}
            </button>
            <button type="button" onClick={deleteAllBrands} disabled={deletingBrands} style={{ background: '#ff6b6b', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {deletingBrands ? '⏳ Löscht...' : '🗑️ Alle Marken löschen'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );

  function resetPassword() {
    if (!email) {
      setAuthError('E-Mail eingeben');
      return;
    }
    supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin/reset` });
    setResetSent(true);
  }
}
