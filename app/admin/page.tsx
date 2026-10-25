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

type Brand = { id: string; name: string };

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

  const [brands, setBrands] = useState<Brand[]>([]);
  const [perfumes, setPerfumes] = useState<AdminPerfume[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage' | 'basic' | 'notes' | 'details' | 'media' | 'advanced' | 'brands'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFamily, setFilterFamily] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);
  const [deletingBrands, setDeletingBrands] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [editingBrandName, setEditingBrandName] = useState('');

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
    setBrands((data as Brand[]) || []);
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

  function getFilteredPerfumes() {
    return perfumes.filter(p => {
      const nameMatch = p.perfume_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       brands.find(b => b.id === p.brand_id)?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const familyMatch = !filterFamily || p.fragrance_family === filterFamily;
      const genderMatch = !filterGender || p.gender === filterGender;
      return nameMatch && familyMatch && genderMatch;
    });
  }

  function getStats() {
    return {
      total: perfumes.length,
      women: perfumes.filter(p => p.gender === 'Women').length,
      men: perfumes.filter(p => p.gender === 'Men').length,
      unisex: perfumes.filter(p => p.gender === 'Unisex').length,
      clean: perfumes.filter(p => p.fragrance_family === 'clean').length,
      gourmand: perfumes.filter(p => p.fragrance_family === 'gourmand').length,
      woody: perfumes.filter(p => p.fragrance_family === 'woody').length,
      floral: perfumes.filter(p => p.fragrance_family === 'floral').length,
      avgPrice: perfumes.length > 0 ? Math.round(perfumes.reduce((sum, p) => sum + (p.price_chf || 0), 0) / perfumes.length) : 0,
      avgRating: perfumes.length > 0 ? (perfumes.reduce((sum: number, p) => sum + (p.rating || 0), 0) / perfumes.length).toFixed(1) : '0'
    };
  }

  function exportCSV() {
    const headers = ['Name', 'Marke', 'Familie', 'Geschlecht', 'Preis CHF', 'Rating', 'Saison', 'Anlass'];
    const data = perfumes.map(p => [
      p.perfume_name,
      brands.find(b => b.id === p.brand_id)?.name || '',
      p.fragrance_family || '',
      p.gender || '',
      p.price_chf || '',
      p.rating || '',
      p.season || '',
      p.occasion || ''
    ]);

    const csv = [headers, ...data].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auressa-perfumes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
    setActiveTab('dashboard');
  }

  async function deletePerfume(id: string) {
    const perfume = perfumes.find(p => p.id === id);
    if (!perfume) return;
    if (!confirm(`🗑️ Duft "${perfume.perfume_name}" wirklich löschen?`)) return;

    setDeletingId(id);
    try {
      const { error } = await supabase.from('perfumes').delete().eq('id', id);
      if (error) throw error;
      setMessage(`✅ "${perfume.perfume_name}" gelöscht`);
      await loadPerfumes();
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
    setDeletingId(null);
  }

  async function saveBrand(e: React.FormEvent) {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    try {
      const { error } = await supabase.from('brands').insert({
        name: newBrandName.trim(),
        slug: slugify(newBrandName)
      });
      if (error) throw error;
      setNewBrandName('');
      setMessage(`✅ Marke "${newBrandName}" hinzugefügt`);
      await loadBrands();
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  }

  async function updateBrand(id: string, name: string) {
    if (!name.trim()) return;
    try {
      const { error } = await supabase.from('brands').update({
        name: name.trim(),
        slug: slugify(name)
      }).eq('id', id);
      if (error) throw error;
      setEditingBrandId(null);
      setMessage(`✅ Marke aktualisiert`);
      await loadBrands();
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  }

  async function deleteBrand(id: string) {
    const brand = brands.find(b => b.id === id);
    if (!brand) return;
    if (!confirm(`🗑️ Marke "${brand.name}" löschen? (nur wenn keine Düfte zugeordnet)`)) return;

    try {
      const { error } = await supabase.from('brands').delete().eq('id', id);
      if (error) throw error;
      setMessage(`✅ Marke gelöscht`);
      await loadBrands();
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
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
    if (!confirm('⚠️ ALLE DÜFTE LÖSCHEN?')) return;
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
        setMessage('❌ Fehler');
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    }
    setDeletingAll(false);
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

      // Duplikat-Check
      const isDuplicate = perfumes.some(p =>
        p.perfume_name.toLowerCase() === name.toLowerCase() &&
        p.id !== editingId
      );
      if (isDuplicate) {
        setMessage('⚠️ Duft mit diesem Namen existiert schon!');
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
        setMessage(`✅ ${name} hinzugefügt`);
      }

      setEditingId(null);
      setForm({ ...emptyForm });
      setActiveTab('dashboard');
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
              {resetSent && <p style={{ color: '#1b7a3d' }}>✅ Link gesendet</p>}
              <button className="button" type="submit">Anmelden</button>
            </form>
            <button type="button" onClick={() => resetPassword()} className="link-button" style={{ marginTop: 15 }}>Passwort vergessen?</button>
          </section>
        </div>
      </main>
    );
  }

  const stats = getStats();
  const filtered = getFilteredPerfumes();

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
          {['dashboard', 'manage', 'basic', 'notes', 'details', 'media', 'advanced', 'brands'].map(tab => (
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
                borderBottom: activeTab === tab ? '3px solid #D4AF37' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {['Dashboard', 'Verwalten', 'Basis', 'Noten', 'Details', 'Media', 'Advanced', 'Marken'][['dashboard', 'manage', 'basic', 'notes', 'details', 'media', 'advanced', 'brands'].indexOf(tab)]}
            </button>
          ))}
        </div>

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <section className="section card">
            <h2>📊 Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 15, marginBottom: 30 }}>
              <div style={{ padding: 15, background: '#f5f1e8', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: '700', color: '#D4AF37' }}>{stats.total}</div>
                <div style={{ fontSize: 12, color: '#6B5344' }}>Gesamt Düfte</div>
              </div>
              <div style={{ padding: 15, background: '#f5f1e8', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: '700', color: '#D4AF37' }}>{stats.women}</div>
                <div style={{ fontSize: 12, color: '#6B5344' }}>Damen</div>
              </div>
              <div style={{ padding: 15, background: '#f5f1e8', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: '700', color: '#D4AF37' }}>{stats.men}</div>
                <div style={{ fontSize: 12, color: '#6B5344' }}>Herren</div>
              </div>
              <div style={{ padding: 15, background: '#f5f1e8', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: '700', color: '#D4AF37' }}>{stats.unisex}</div>
                <div style={{ fontSize: 12, color: '#6B5344' }}>Unisex</div>
              </div>
              <div style={{ padding: 15, background: '#f5f1e8', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: '700', color: '#D4AF37' }}>{stats.avgPrice} CHF</div>
                <div style={{ fontSize: 12, color: '#6B5344' }}>Ø Preis</div>
              </div>
              <div style={{ padding: 15, background: '#f5f1e8', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: '700', color: '#D4AF37' }}>{stats.avgRating}/10</div>
                <div style={{ fontSize: 12, color: '#6B5344' }}>Ø Rating</div>
              </div>
            </div>

            <h3>Nach Familie</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <div style={{ padding: 10, background: '#f5f1e8', borderRadius: 4, textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>{stats.clean}</div>
                <div style={{ fontSize: 12 }}>Clean</div>
              </div>
              <div style={{ padding: 10, background: '#f5f1e8', borderRadius: 4, textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>{stats.gourmand}</div>
                <div style={{ fontSize: 12 }}>Gourmand</div>
              </div>
              <div style={{ padding: 10, background: '#f5f1e8', borderRadius: 4, textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>{stats.woody}</div>
                <div style={{ fontSize: 12 }}>Woody</div>
              </div>
              <div style={{ padding: 10, background: '#f5f1e8', borderRadius: 4, textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>{stats.floral}</div>
                <div style={{ fontSize: 12 }}>Floral</div>
              </div>
            </div>

            <div className="cta" style={{ marginTop: 30 }}>
              <button className="button" onClick={exportCSV}>📥 Als CSV exportieren</button>
              <button className="button secondary" onClick={() => setActiveTab('manage')}>➕ Duft hinzufügen</button>
            </div>
          </section>
        )}

        {/* MANAGE PERFUMES */}
        {activeTab === 'manage' && (
          <section className="section card">
            <h2>🔍 Düfte verwalten</h2>

            <div style={{ marginBottom: 20 }}>
              <input
                type="text"
                placeholder="🔍 Duft oder Marke suchen..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: 10, borderRadius: 4, border: '1px solid #D4AF37' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <select value={filterFamily} onChange={e => setFilterFamily(e.target.value)} style={{ padding: 10, borderRadius: 4, border: '1px solid #D4AF37' }}>
                  <option value="">Alle Familien</option>
                  {FAMILIES.map(([k, v]) => <option value={k} key={k}>{v}</option>)}
                </select>
                <select value={filterGender} onChange={e => setFilterGender(e.target.value)} style={{ padding: 10, borderRadius: 4, border: '1px solid #D4AF37' }}>
                  <option value="">Alle Geschlechter</option>
                  {GENDERS.map(g => <option value={g} key={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <p style={{ fontSize: 12, color: '#6B5344', marginBottom: 10 }}>Ergebnisse: {filtered.length} von {perfumes.length}</p>

            <div style={{ maxHeight: 500, overflowY: 'auto', marginBottom: 20 }}>
              {filtered.map(p => (
                <div key={p.id} style={{
                  padding: 10,
                  borderBottom: '1px solid #eee',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto auto',
                  gap: 10,
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{p.perfume_name}</div>
                    <div style={{ fontSize: 12, color: '#6B5344' }}>
                      {brands.find(b => b.id === p.brand_id)?.name} • {p.fragrance_family} • {p.gender} • {p.price_chf ? `${p.price_chf} CHF` : 'N/A'}
                    </div>
                  </div>
                  <button className="button secondary" onClick={() => startEdit(p.id)} style={{ padding: '5px 10px', fontSize: 12 }}>✏️ Edit</button>
                  <button
                    className="button secondary"
                    onClick={() => deletePerfume(p.id)}
                    disabled={deletingId === p.id}
                    style={{ padding: '5px 10px', fontSize: 12, background: '#ff6b6b', color: '#fff' }}
                  >
                    {deletingId === p.id ? '⏳' : '🗑️'}
                  </button>
                  <button className="button secondary" onClick={() => window.open(`/duft/${p.id}`, '_blank')} style={{ padding: '5px 10px', fontSize: 12 }}>👁️</button>
                </div>
              ))}
            </div>

            <div className="cta">
              <button className="button" onClick={() => setActiveTab('basic')}>➕ Neuer Duft</button>
              <button className="button secondary" onClick={() => setActiveTab('dashboard')}>← Zurück</button>
            </div>
          </section>
        )}

        {/* FORM TABS (basic, notes, details, media, advanced) */}
        {['basic', 'notes', 'details', 'media', 'advanced'].includes(activeTab) && (
          <section className="section card">
            <h2>{editingId ? '✏️ Duft bearbeiten' : '➕ Neuen Duft hinzufügen'}</h2>
            <form onSubmit={save}>
              {activeTab === 'basic' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                  <div className="field"><label>Duftname *</label><input value={form.perfume_name} onChange={e => setField('perfume_name', e.target.value)} required /></div>
                  <div className="field"><label>Marke</label><input list="brand-list" value={form.brand} onChange={e => setField('brand', e.target.value)} /><datalist id="brand-list">{brands.map(b => <option value={b.name} key={b.id} />)}</datalist></div>
                  <div className="field"><label>Duftfamilie</label><select value={form.fragrance_family} onChange={e => setField('fragrance_family', e.target.value)}>{FAMILIES.map(([k, v]) => <option value={k} key={k}>{v}</option>)}</select></div>
                  <div className="field"><label>Geschlecht</label><select value={form.gender} onChange={e => setField('gender', e.target.value)}>{GENDERS.map(g => <option value={g} key={g}>{g}</option>)}</select></div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <div className="field"><label>📌 Kopfnoten</label><input value={form.top_notes} onChange={e => setField('top_notes', e.target.value)} placeholder="Bergamotte, Zitrone, Neroli" /></div>
                  <div className="field"><label>💚 Herznoten</label><input value={form.heart_notes} onChange={e => setField('heart_notes', e.target.value)} placeholder="Jasmin, Rose, Ylang-Ylang" /></div>
                  <div className="field"><label>🌳 Basisnoten</label><input value={form.base_notes} onChange={e => setField('base_notes', e.target.value)} placeholder="Sandelholz, Moschus, Vanille" /></div>
                </div>
              )}

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

              {activeTab === 'media' && (
                <div>
                  <div className="field"><label>🖼️ Bild-URL</label><input value={form.image_url} onChange={e => setField('image_url', e.target.value)} placeholder="https://..." /></div>
                  <div className="field"><label>🛒 Affiliate-Link</label><input value={form.affiliate_url} onChange={e => setField('affiliate_url', e.target.value)} placeholder="https://www.notino.ch/..." /></div>
                  <div className="field"><label>📝 Beschreibung</label><textarea value={form.description} onChange={e => setField('description', e.target.value)} placeholder="Ausführliche Duft-Beschreibung..." style={{ minHeight: 100 }} /></div>
                </div>
              )}

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
                  <div style={{ gridColumn: '1 / -1' }} className="field"><label>Ähnliche Düfte</label><input value={form.similar_perfumes} onChange={e => setField('similar_perfumes', e.target.value)} placeholder="Aventus, Sauvage, Bleu de Chanel" /></div>
                </div>
              )}

              {message && <p style={{ color: message.startsWith('✅') ? '#1b7a3d' : '#b3261e', marginTop: 20 }}>{message}</p>}

              <div className="cta" style={{ marginTop: 30 }}>
                <button className="button" type="submit" disabled={saving}>{saving ? '⏳ Speichert...' : editingId ? '💾 Speichern' : '➕ Hinzufügen'}</button>
                {editingId && <button className="button secondary" type="button" onClick={cancelEdit} disabled={saving}>❌ Abbrechen</button>}
              </div>
            </form>
          </section>
        )}

        {/* MARKEN-VERWALTUNG */}
        {activeTab === 'brands' && (
          <section className="section card">
            <h2>🏷️ Marken verwalten</h2>

            <form onSubmit={saveBrand} style={{ marginBottom: 30 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
                <div className="field" style={{ margin: 0 }}>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={e => setNewBrandName(e.target.value)}
                    placeholder="Neue Marke eingeben..."
                  />
                </div>
                <button className="button" type="submit">➕ Hinzufügen</button>
              </div>
            </form>

            <div style={{ maxHeight: 500, overflowY: 'auto' }}>
              {brands.map(b => (
                <div key={b.id} style={{
                  padding: 10,
                  borderBottom: '1px solid #eee',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto',
                  gap: 10,
                  alignItems: 'center'
                }}>
                  {editingBrandId === b.id ? (
                    <>
                      <input
                        type="text"
                        value={editingBrandName}
                        onChange={e => setEditingBrandName(e.target.value)}
                        style={{ padding: 10, borderRadius: 4, border: '1px solid #D4AF37' }}
                      />
                      <button className="button secondary" onClick={() => updateBrand(b.id, editingBrandName)} style={{ padding: '5px 10px', fontSize: 12 }}>✅ Speichern</button>
                      <button className="button secondary" onClick={() => setEditingBrandId(null)} style={{ padding: '5px 10px', fontSize: 12 }}>❌ Abbrechen</button>
                    </>
                  ) : (
                    <>
                      <div>{b.name}</div>
                      <button className="button secondary" onClick={() => { setEditingBrandId(b.id); setEditingBrandName(b.name); }} style={{ padding: '5px 10px', fontSize: 12 }}>✏️</button>
                      <button className="button secondary" onClick={() => deleteBrand(b.id)} style={{ padding: '5px 10px', fontSize: 12, background: '#ff6b6b', color: '#fff' }}>🗑️</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DANGER ZONE */}
        {['dashboard', 'manage'].includes(activeTab) && (
          <section className="section card" style={{ borderLeft: '4px solid #ff6b6b' }}>
            <h3 style={{ color: '#ff6b6b' }}>🚨 Gefahrenzone</h3>
            <button type="button" onClick={deleteAllPerfumes} disabled={deletingAll} style={{ background: '#ff6b6b', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: 10 }}>
              {deletingAll ? '⏳ Löscht...' : '🗑️ Alle Düfte löschen'}
            </button>
            <button type="button" onClick={deleteAllBrands} disabled={deletingBrands} style={{ background: '#ff6b6b', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {deletingBrands ? '⏳ Löscht...' : '🗑️ Alle Marken löschen'}
            </button>
          </section>
        )}
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
