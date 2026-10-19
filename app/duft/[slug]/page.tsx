'use server';

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPerfumeBySlug, getAllPerfumeSlugs, describePerfume, buyUrl } from '@/lib/perfumes';
import type { Perfume } from '@/lib/perfumes';

interface DuftPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPerfumeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: DuftPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  if (!perfume) {
    return { title: 'Duft nicht gefunden | Auressa' };
  }

  const brandName = perfume.brands?.name || 'Duft';
  const title = `${perfume.perfume_name} von ${brandName} | Auressa`;
  const description = perfume.description || describePerfume(perfume);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://auressa.ch/duft/${slug}`,
      images: perfume.image_url ? [{ url: perfume.image_url, width: 500, height: 500 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: perfume.image_url ? [perfume.image_url] : [],
    },
  };
}

export default async function DuftPage({ params }: DuftPageProps) {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  if (!perfume) {
    notFound();
  }

  const brandName = perfume.brands?.name || 'Unbekannte Marke';
  const description = perfume.description || describePerfume(perfume);
  const url = buyUrl(perfume);

  return (
    <article className="duft-detail-page">
      {/* Hero Section */}
      <section className="duft-hero">
        <div className="duft-hero-inner">
          <div className="eyebrow">{brandName}</div>
          <h1>{perfume.perfume_name}</h1>
          <p className="lead">
            {perfume.gender === 'Women'
              ? 'Ein exquisiter Duft für Damen'
              : perfume.gender === 'Men'
              ? 'Ein exquisiter Duft für Herren'
              : 'Ein vielseitiger Unisex-Duft'}
          </p>

          {/* Stats */}
          <div className="duft-stats">
            {perfume.price_chf && (
              <div className="stat">
                <strong>Preis</strong>
                <span>CHF {perfume.price_chf}</span>
              </div>
            )}
            {perfume.longevity && (
              <div className="stat">
                <strong>Haltbarkeit</strong>
                <span>{perfume.longevity}/10</span>
              </div>
            )}
            {perfume.sillage && (
              <div className="stat">
                <strong>Sillage</strong>
                <span>{perfume.sillage}/10</span>
              </div>
            )}
            {perfume.season && (
              <div className="stat">
                <strong>Jahreszeit</strong>
                <span>{perfume.season}</span>
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        {perfume.image_url && (
          <div className="duft-image">
            <img src={perfume.image_url} alt={perfume.perfume_name} />
          </div>
        )}
      </section>

      {/* Description */}
      <section className="duft-description">
        <h2>Über diesen Duft</h2>
        <p>{description}</p>
      </section>

      {/* Olfactory Pyramid */}
      <section className="duft-pyramid">
        <h2>Duftaufbau</h2>
        <div className="pyramid">
          {perfume.top_notes && perfume.top_notes.length > 0 && (
            <div className="pyramid-level pyramid-top">
              <h3>Kopfnoten</h3>
              <p className="notes">{perfume.top_notes.join(', ')}</p>
            </div>
          )}
          {perfume.heart_notes && perfume.heart_notes.length > 0 && (
            <div className="pyramid-level pyramid-heart">
              <h3>Herznoten</h3>
              <p className="notes">{perfume.heart_notes.join(', ')}</p>
            </div>
          )}
          {perfume.base_notes && perfume.base_notes.length > 0 && (
            <div className="pyramid-level pyramid-base">
              <h3>Basisnoten</h3>
              <p className="notes">{perfume.base_notes.join(', ')}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="duft-cta">
        <h2>Jetzt Duft ansehen</h2>
        <a href={url} target="_blank" rel="noopener noreferrer sponsored" className="button button-primary large">
          Zum Shop
        </a>
        <p className="small">
          Über affiliate Links unterstützt du Auressa und siehst noch bessere Empfehlungen.
        </p>
      </section>
    </article>
  );
}
