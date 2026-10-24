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
const CONCENTRATIONS = ['EDP', 'EDT', 'Extrait', 'Cologne', 'EDC', 'Spray'];
const INTENSITIES = ['Leicht', 'Mittel', 'Intensiv'];

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
  affiliate_url: '',
  is_featured: false,
  // Pro Status Fields
  concentration: 'EDP',
  long_description: '',
  bottle_description: '',
  intensity: 'Mittel',
  scent_dna: '',
  rating: ''
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
  is_featured?: boolean | null;
  // Pro Status
  concentration?: string | null;
  long_description?: string | null;
  bottle_description?: string | null;
  intensity?: string | null;
  scent_dna?: string[] | null;
  rating?: number | null;
};

const PERFUME_EDIT_FIELDS =
  'id, perfume_name, brand_id, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, image_url, affiliate_url, is_featured, concentration, long_description, bottle_description, intensity, scent_dna, rating';

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
  const [deletingAll, setDeletingAll] = useState(false);
  const [researching, setResearching] = useState(false);
  const [researchBrand, setResearchBrand] = useState('');
  const [researchName, setResearchName] = useState('');

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

    // Load research data if coming from research page
    const params = new URLSearchParams(window.location.search);
    if (params.get('research') === 'true') {
      const stored = sessionStorage.getItem('researchData');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setForm({
            perfume_name: data.perfume_name || '',
            brand: data.brand || '',
            fragrance_family: data.fragrance_family || 'clean',
            gender: data.gender || 'Unisex',
            price_chf: data.price_chf || '',
            longevity: data.longevity?.toString() || '',
            sillage: data.sillage?.toString() || '',
            scentmatch_score: data.scentmatch_score?.toString() || '',
            season: data.season || 'Ganzjährig',
            occasion: data.occasion || 'Alltag',
            top_notes: data.top_notes || '',
            heart_notes: data.heart_notes || '',
            base_notes: data.base_notes || '',
            image_url: data.image_url || '',
            affiliate_url: data.affiliate_url || '',
            is_featured: data.is_featured || false,
            // Pro fields from research
            concentration: data.concentration || 'EDP',
            long_description: data.long_description || '',
            bottle_description: data.bottle_description || '',
            intensity: data.intensity || 'Mittel',
            scent_dna: (data.scent_dna && Array.isArray(data.scent_dna)) ? data.scent_dna.join(', ') : '',
            rating: data.rating?.toString() || ''
          });
          setMessage(`✅ Daten recherchiert! Überprüfe die Werte und speichere.`);
          sessionStorage.removeItem('researchData');
          // Scroll to form
          if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
          console.error('Error loading research data:', err);
        }
      }
    }
  }, [session]);

  function setField(key: keyof typeof emptyForm, value: string | boolean) {
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
      affiliate_url: p.affiliate_url || '',
      is_featured: p.is_featured || false,
      concentration: p.concentration || 'EDP',
      long_description: p.long_description || '',
      bottle_description: p.bottle_description || '',
      intensity: p.intensity || 'Mittel',
      scent_dna: (p.scent_dna || []).join(', '),
      rating: p.rating?.toString() ?? ''
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

  async function deleteAllPerfumes() {
    if (!confirm('⚠️ ACHTUNG! Alle Düfte werden gelöscht! Das kann nicht rückgängig gemacht werden. Bist du sicher?')) {
      return;
    }
    if (!confirm('Zweite Bestätigung: Alle Düfte WIRKLICH löschen?')) {
      return;
    }

    setDeletingAll(true);
    try {
      const response = await fetch('/api/admin/delete-all-perfumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: 'DELETE_ALL_PERFUMES' })
      });

      if (response.ok) {
        setMessage('✅ Alle Düfte wurden gelöscht!');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        const data = await response.json();
        setMessage(`Fehler: ${data.error}`);
      }
    } catch (error: any) {
      setMessage(`Fehler: ${error.message}`);
    } finally {
      setDeletingAll(false);
    }
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

  async function autoResearch() {
    if (!researchBrand.trim() || !researchName.trim()) {
      setMessage('Bitte Marke und Duftname eingeben');
      return;
    }

    setResearching(true);
    setMessage('');

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: researchBrand.trim(), name: researchName.trim() })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setMessage(`Recherche-Fehler: ${data.error || 'unbekannt'}`);
        setResearching(false);
        return;
      }

      // Füllt die Form-Felder mit den recherchierten Daten
      setForm(prev => ({
        ...prev,
        perfume_name: data.perfume_name || prev.perfume_name,
        brand: data.brand || prev.brand,
        fragrance_family: data.fragrance_family || prev.fragrance_family,
        gender: data.gender || prev.gender,
        price_chf: data.price_chf ? String(data.price_chf) : prev.price_chf,
        longevity: data.longevity ? String(data.longevity) : prev.longevity,
        sillage: data.sillage ? String(data.sillage) : prev.sillage,
        season: data.season || prev.season,
        occasion: data.occasion || prev.occasion,
        top_notes: data.top_notes || prev.top_notes,
        heart_notes: data.heart_notes || prev.heart_notes,
        base_notes: data.base_notes || prev.base_notes,
        concentration: data.concentration || prev.concentration,
        long_description: data.long_description || prev.long_description,
        bottle_description: data.bottle_description || prev.bottle_description,
        intensity: data.intensity || prev.intensity,
        scent_dna: data.scent_dna ? data.scent_dna.join(', ') : prev.scent_dna,
        rating: data.rating ? String(data.rating) : prev.rating
      }));

      setMessage(`✓ Auto-Recherchiere erfolgreich! ${data.perfume_name || 'Duft'} gefunden.`);
      setResearchBrand('');
      setResearchName('');
    } catch (err: any) {
      setMessage(`Fehler: ${err?.message || 'unbekannt'}`);
    }
    setResearching(false);
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
        affiliate_url: form.affiliate_url.trim() || null,
        is_featured: form.is_featured,
        // Pro Status Fields
        concentration: form.concentration || 'EDP',
        long_description: form.long_description.trim() || null,
        bottle_description: form.bottle_description.trim() || null,
        intensity: form.intensity || 'Mittel',
        scent_dna: form.scent_dna ? toArray(form.scent_dna) : null,
        rating: toNumber(form.rating)
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
            <Link className="logo" href="/">Auressa</Link>
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
          <Link className="logo" href="/">Auressa</Link>
          <button className="button secondary" onClick={logout}>Abmelden</button>
        </nav>

        <section className="section card" style={{ backgroundColor: '#f5f1e8', borderLeft: '4px solid #d4af37' }}>
          <h2>🔬 Intelligente Duft-Recherche</h2>
          <p className="small">
            Gib Brand und Duftname ein → Claude recherchiert automatisch alle Daten von Fragrantica, Parfumo, Douglas, Notino und anderen Quellen und füllt alle Felder!
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'flex-end', maxWidth: '600px' }}>
            <div className="field">
              <label htmlFor="research-brand">Brand / Marke *</label>
              <input
                id="research-brand"
                type="text"
                value={researchBrand}
                onChange={e => setResearchBrand(e.target.value)}
                placeholder="z.B. Dolce & Gabbana"
              />
            </div>
            <div className="field">
              <label htmlFor="research-name">Duft Name *</label>
              <input
                id="research-name"
                type="text"
                value={researchName}
                onChange={e => setResearchName(e.target.value)}
                placeholder="z.B. Light Blue"
              />
            </div>
            <button
              className="button"
              type="button"
              onClick={autoResearch}
              disabled={researching || !researchBrand.trim() || !researchName.trim()}
            >
              {researching ? '⏳ Läuft...' : '🔍 Recherchier'}
            </button>
          </div>
        </section>

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
                <label>Auressa-Score (0–100)</label>
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

            <div className="field" style={{ marginTop: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={e => setField('is_featured', e.target.checked ? true : false)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <span>🌟 Auf der Startseite hervorheben (Manual Featured)</span>
              </label>
            </div>

            {/* Pro Status Fields */}
            <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px solid #D4AF37' }} />
            <h3 style={{ color: '#D4AF37', marginBottom: 15 }}>⭐ Pro-Status Felder (optional aber empfohlen)</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
              <div className="field">
                <label>Konzentration</label>
                <select value={form.concentration} onChange={e => setField('concentration', e.target.value)}>
                  {CONCENTRATIONS.map(c => <option value={c} key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Intensität</label>
                <select value={form.intensity} onChange={e => setField('intensity', e.target.value)}>
                  {INTENSITIES.map(i => <option value={i} key={i}>{i}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label>Bewertung (0-10, z.B. 7.5)</label>
              <input type="number" step="0.1" min="0" max="10" value={form.rating} onChange={e => setField('rating', e.target.value)} placeholder="7.5" />
            </div>

            <div className="field">
              <label>Ausführliche Beschreibung (3-4 Sätze, deutsch, poetic)</label>
              <textarea
                value={form.long_description}
                onChange={e => setField('long_description', e.target.value)}
                placeholder="Ein frischer Duft, der Eleganz und Modernität vereint. Die Kopfnoten öffnen mit zitronigen Akkorden, während die Herznoten subtile Blütennoten zeigen..."
                style={{ minHeight: 100 }}
              />
            </div>

            <div className="field">
              <label>Flakon-Beschreibung (Aussehen, Design)</label>
              <textarea
                value={form.bottle_description}
                onChange={e => setField('bottle_description', e.target.value)}
                placeholder="Ein klassischer Flakon mit klarem, rechteckigem Design. Das durchsichtige Glas zeigt die helle Flüssigkeit. Die weiße Kappe kontrastiert elegant..."
                style={{ minHeight: 80 }}
              />
            </div>

            <div className="field">
              <label>Duft-DNA (3 ähnliche Düfte, Komma-getrennt)</label>
              <input
                value={form.scent_dna}
                onChange={e => setField('scent_dna', e.target.value)}
                placeholder="Bleu de Chanel, Sauvage, Acqua di Parma Colonia"
              />
            </div>

            {message && <p className="admin-msg" style={{ color: message.startsWith('Fehler') ? '#b3261e' : message.startsWith('✅') ? '#1b7a3d' : '#f57c00' }}>{message}</p>}

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

            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #ff6b6b' }}>
              <h3 style={{ color: '#ff6b6b', marginBottom: '10px' }}>🗑️ Datenbank-Verwaltung</h3>
              <button
                type="button"
                onClick={deleteAllPerfumes}
                disabled={deletingAll}
                style={{
                  background: '#ff6b6b',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: deletingAll ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {deletingAll ? 'Löscht alle Düfte…' : '🗑️ Alle Düfte löschen'}
              </button>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                ⚠️ Diese Aktion kann NICHT rückgängig gemacht werden!
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
