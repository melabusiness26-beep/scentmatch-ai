'use client';

import React, { useState, useEffect, ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function NewPerfumePage(): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [brands, setBrands] = useState<Array<{ id: string; name: string }>>([]);

  const [formData, setFormData] = useState({
    perfume_name: '',
    brand_id: '',
    gender: 'Unisex',
    fragrance_family: 'Clean',
    price_chf: '',
    longevity: '7',
    sillage: '3',
    season: 'Ganzjährig',
    occasion: 'Alltag',
    description: '',
    image_url: '',
    affiliate_url: '',
    top_notes: '',
    heart_notes: '',
    base_notes: '',
  };

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchBrands();
  }, []);

  const checkAuthAndFetchBrands = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setIsLoggedIn(false);
        setError('Du musst angemeldet sein.');
        setIsLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const { data, error: brandsError } = await supabase.from('brands').select('id, name').order('name');

      if (brandsError) throw brandsError;
      setBrands(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Fehler beim Laden der Marken.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    if (!formData.perfume_name || !formData.brand_id) {
      setError('Duftname und Marke sind erforderlich.');
      setIsSaving(false);
      return;
    }

    try {
      const slug = generateSlug(formData.perfume_name);

      const { error: insertError } = await supabase.from('perfumes').insert([
        {
          perfume_name: formData.perfume_name,
          slug,
          brand_id: formData.brand_id,
          gender: formData.gender,
          fragrance_family: formData.fragrance_family,
          price_chf: parseInt(formData.price_chf) || 0,
          longevity: parseInt(formData.longevity) || 5,
          sillage: parseInt(formData.sillage) || 3,
          season: formData.season,
          occasion: formData.occasion,
          description: formData.description,
          image_url: formData.image_url || null,
          affiliate_url: formData.affiliate_url || null,
          top_notes: formData.top_notes ? formData.top_notes.split(',').map((n) => n.trim()) : [],
          heart_notes: formData.heart_notes ? formData.heart_notes.split(',').map((n) => n.trim()) : [],
          base_notes: formData.base_notes ? formData.base_notes.split(',').map((n) => n.trim()) : [],
        },
      ]);

      if (insertError) throw insertError;

      setSuccess('Duft erfolgreich hinzugefügt!');
      setTimeout(() => router.push('/admin/perfumes'), 2000);
    } catch (err) {
      console.error('Save error:', err);
      setError('Fehler beim Speichern. Versuche es später erneut.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isLoggedIn) {
    return (
      <article className="legal-page">
        <section className="page-content">
          <h1>Zugriff verweigert</h1>
          <p>Du musst angemeldet sein.</p>
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
          <h1>Neuen Duft hinzufügen</h1>
          <p className="lead">Füge einen neuen Duft zu deinem Katalog hinzu</p>
        </div>
      </section>

      <section className="page-content" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="perfume_name">
              Duftname<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="perfume_name"
              name="perfume_name"
              type="text"
              value={formData.perfume_name}
              onChange={handleChange}
              placeholder="z.B. Sauvage"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand_id">
              Marke<span style={{ color: 'red' }}>*</span>
            </label>
            <select
              id="brand_id"
              name="brand_id"
              value={formData.brand_id}
              onChange={handleChange}
              required
            >
              <option value="">— Marke wählen —</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Geschlecht</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Women">Damen</option>
                <option value="Men">Herren</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fragrance_family">Duftfamilie</label>
              <select id="fragrance_family" name="fragrance_family" value={formData.fragrance_family} onChange={handleChange}>
                <option value="Clean">Clean</option>
                <option value="Gourmand">Gourmand</option>
                <option value="Woody">Woody</option>
                <option value="Floral">Floral</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price_chf">Preis (CHF)</label>
              <input
                id="price_chf"
                name="price_chf"
                type="number"
                value={formData.price_chf}
                onChange={handleChange}
                placeholder="z.B. 120"
              />
            </div>

            <div className="form-group">
              <label htmlFor="longevity">Longevity (1-10)</label>
              <input
                id="longevity"
                name="longevity"
                type="number"
                min="1"
                max="10"
                value={formData.longevity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sillage">Sillage (1-5)</label>
              <input
                id="sillage"
                name="sillage"
                type="number"
                min="1"
                max="5"
                value={formData.sillage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="season">Saison</label>
              <select id="season" name="season" value={formData.season} onChange={handleChange}>
                <option value="Frühling">Frühling</option>
                <option value="Sommer">Sommer</option>
                <option value="Herbst">Herbst</option>
                <option value="Winter">Winter</option>
                <option value="Ganzjährig">Ganzjährig</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="occasion">Anlass</label>
              <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
                <option value="Alltag">Alltag</option>
                <option value="Büro">Büro</option>
                <option value="Party">Party</option>
                <option value="Romantisch">Romantisch</option>
                <option value="Sport">Sport</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="top_notes">Top-Noten (kommagetrennt)</label>
            <input
              id="top_notes"
              name="top_notes"
              type="text"
              value={formData.top_notes}
              onChange={handleChange}
              placeholder="z.B. Bergamotte, Zitrone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="heart_notes">Herznoten (kommagetrennt)</label>
            <input
              id="heart_notes"
              name="heart_notes"
              type="text"
              value={formData.heart_notes}
              onChange={handleChange}
              placeholder="z.B. Jasmin, Rose"
            />
          </div>

          <div className="form-group">
            <label htmlFor="base_notes">Basisnoten (kommagetrennt)</label>
            <input
              id="base_notes"
              name="base_notes"
              type="text"
              value={formData.base_notes}
              onChange={handleChange}
              placeholder="z.B. Sandelholz, Vanille"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beschreibung</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Ausführliche Duftbeschreibung..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Bild-URL</label>
            <input
              id="image_url"
              name="image_url"
              type="url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="affiliate_url">Affiliate-Link</label>
            <input
              id="affiliate_url"
              name="affiliate_url"
              type="url"
              value={formData.affiliate_url}
              onChange={handleChange}
              placeholder="https://notino.ch/..."
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-actions">
            <button type="submit" className="button button-primary" disabled={isSaving}>
              {isSaving ? 'Wird gespeichert...' : 'Duft hinzufügen'}
            </button>
            <Link href="/admin/perfumes" className="button button-secondary">
              Abbrechen
            </Link>
          </div>
        </form>
      </section>
    </article>
  );
}
