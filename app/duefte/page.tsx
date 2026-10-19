import React, { ReactElement } from 'react';
import type { Metadata } from 'next';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Perfume } from '@/lib/perfumes';
import PerfumeCatalog from '@/app/components/PerfumeCatalog';

export const metadata: Metadata = {
  title: 'Duft-Katalog | Auressa',
  description:
    'Durchsuche unseren Duft-Katalog mit über 400 Parfümen. Filtere nach Familie, Preis, Geschlecht und mehr.',
  openGraph: {
    title: 'Duft-Katalog | Auressa',
    description:
      'Finde deinen perfekten Duft aus unserer riesigen Auswahl.',
  },
};

async function getPerfumes(): Promise<Perfume[]> {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('perfumes')
      .select(
        `
        id,
        perfume_name,
        slug,
        gender,
        fragrance_family,
        price_chf,
        longevity,
        sillage,
        scentmatch_score,
        season,
        occasion,
        description,
        image_url,
        affiliate_url,
        top_notes,
        heart_notes,
        base_notes,
        brands(name, slug, country)
      `
      )
      .order('perfume_name', { ascending: true })
      .limit(500);

    if (error) {
      console.error('Failed to fetch perfumes:', error);
      return [];
    }

    // Normalize brands array to single object for each perfume
    const normalized = (data as any[] | null)?.map((p: any) => ({
      ...p,
      brands: Array.isArray(p.brands) && p.brands.length > 0 ? p.brands[0] : null,
    })) as Perfume[];
    return normalized || [];
  } catch (err) {
    console.error('Error fetching perfumes:', err);
    return [];
  }
}

export default async function DueftePage(): Promise<
  ReactElement
> {
  const perfumes = await getPerfumes();

  return (
    <div className="page-duefte">
      {/* Hero */}
      <section className="hero-stage hero-page">
        <div className="hero-page-inner">
          <div className="eyebrow">Unser Katalog</div>
          <h1>Alle Düfte</h1>
          <p className="lead">
            Entdecke über 400 kuratierte Düfte für jeden
            Geschmack und jedes Budget.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="catalog-section">
        <PerfumeCatalog perfumes={perfumes} />
      </section>
    </div>
  );
}
