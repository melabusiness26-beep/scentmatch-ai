// „Mergen = fertig": läuft vor jedem Build (npm prebuild).
//
// 1. Prüft immer alle Dateien in catalog/perfumes/ – ein Fehler bricht den Build ab,
//    damit die Vorschau im PR rot wird, bevor etwas live geht.
// 2. Nur beim Production-Build (VERCEL_ENV=production) mit Server-Schlüssel:
//    trägt NEUE Düfte ein (fehlende Marken werden angelegt). Bei bestehenden Düften
//    (gleicher slug) werden NUR die Preisfelder (price_chf, volume_ml, sizes) aus der
//    Katalog-Datei übernommen, wenn sie sich unterscheiden UND das Preis-Datum der Datei
//    (price_checked) nicht älter ist als das in der Datenbank – so überschreibt eine alte
//    Datei nie einen neueren Preis aus dem Admin. Alles andere bleibt unberührt; es wird
//    nie etwas gelöscht.
//
// Ein Datenbank-Fehler beim Eintragen stoppt den Build nicht (die Website soll
// trotzdem live gehen); er steht im Build-Log.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { checkCatalog, slugify, toPerfumeRow } from '../lib/catalog.ts';
import { cleanSizes, priceSource, type SizePrice } from '../lib/perfume-extras.ts';
import { runPriceAlerts } from '../lib/price-alerts.ts';

const DIR = join(process.cwd(), 'catalog', 'perfumes');

const files = existsSync(DIR)
  ? readdirSync(DIR)
      .filter((f) => f.endsWith('.json'))
      .sort()
      .map((name) => ({ name, text: readFileSync(join(DIR, name), 'utf8') }))
  : [];

const { entries, errors } = checkCatalog(files);
if (errors.length) {
  console.error(`[katalog] ${errors.length} Datei(en) fehlerhaft – Build gestoppt:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`[katalog] ${entries.length} Datei(en) geprüft, alles gültig.`);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (process.env.VERCEL_ENV !== 'production' || process.env.CATALOG_SYNC === 'off') {
  console.log('[katalog] Kein Production-Build – nichts eingetragen.');
  process.exit(0);
}
if (!url || !key) {
  console.warn('[katalog] NEXT_PUBLIC_SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt – nichts eingetragen.');
  process.exit(0);
}

const db = createClient(url, key, { auth: { persistSession: false } });

try {
  const { data: perfumes, error: pErr } = await db
    .from('perfumes')
    .select('slug, perfume_name, concentration, brand_id, price_chf, volume_ml, sizes');
  if (pErr) throw pErr;
  const { data: brands, error: bErr } = await db.from('brands').select('id, name, slug');
  if (bErr) throw bErr;

  const brandBySlug = new Map<string, string>();
  for (const b of brands || []) brandBySlug.set(b.slug || slugify(b.name), b.id);
  const existingSlugs = new Set((perfumes || []).map((p) => p.slug));
  const existingKeys = new Set(
    (perfumes || []).map((p) => `${p.brand_id}|${slugify(p.perfume_name)}|${p.concentration || ''}`)
  );

  const bySlug = new Map((perfumes || []).map((p) => [p.slug, p]));
  const sameSizes = (a: unknown, b: SizePrice[]) => {
    const x = cleanSizes(a);
    return (
      x.length === b.length &&
      x.every((s, i) => s.ml === b[i].ml && s.price_chf === b[i].price_chf && s.shop === b[i].shop && s.checked === b[i].checked && s.url === b[i].url)
    );
  };

  let added = 0;
  let updated = 0;
  const updatedSlugs: string[] = [];
  for (const entry of entries) {
    const current = bySlug.get(entry.slug);
    if (current) {
      // Preise aus der Katalog-Datei übernehmen – aber nur, wenn sie nicht älter sind
      // als die Preise in der Datenbank (die können im Admin neuer eingetragen sein).
      const row = toPerfumeRow(entry.fields, current.brand_id, entry.slug);
      const sizes = row.sizes as SizePrice[];
      const fileDate = priceSource(sizes).checked;
      const dbDate = priceSource(cleanSizes(current.sizes)).checked;
      const fileIsCurrent = fileDate ? !dbDate || fileDate >= dbDate : !dbDate;
      const patch: Record<string, unknown> = {};
      if (fileIsCurrent) {
        if (row.price_chf != null && Number(current.price_chf) !== row.price_chf) patch.price_chf = row.price_chf;
        if (row.volume_ml != null && Number(current.volume_ml) !== row.volume_ml) patch.volume_ml = row.volume_ml;
        if (sizes.length && !sameSizes(current.sizes, sizes)) patch.sizes = sizes;
      }
      if (Object.keys(patch).length) {
        const { error } = await db.from('perfumes').update(patch).eq('slug', entry.slug);
        if (error) throw error;
        updated++;
        updatedSlugs.push(entry.slug);
        console.log(`[katalog] Preise aktualisiert: ${entry.slug} (${Object.keys(patch).join(', ')})`);
      } else if (!fileIsCurrent) {
        console.log(`[katalog] ${entry.slug}: Preise im Admin sind neuer (${dbDate}) – Datei (${fileDate || 'ohne Datum'}) nicht übernommen.`);
      }
      continue;
    }
    if (existingSlugs.has(entry.slug)) continue;

    const brandSlug = slugify(entry.brand);
    let brandId = brandBySlug.get(brandSlug);
    if (!brandId) {
      const { data, error } = await db
        .from('brands')
        .insert({ name: entry.brand, slug: brandSlug })
        .select('id')
        .single();
      if (error) throw error;
      brandId = data.id as string;
      brandBySlug.set(brandSlug, brandId);
      console.log(`[katalog] Marke angelegt: ${entry.brand}`);
    }

    const dupKey = `${brandId}|${slugify(entry.fields.perfume_name || '')}|${entry.fields.concentration || ''}`;
    if (existingKeys.has(dupKey)) {
      console.warn(`[katalog] ${entry.file}: gibt es schon unter anderem slug – übersprungen.`);
      continue;
    }

    const { error } = await db.from('perfumes').insert(toPerfumeRow(entry.fields, brandId, entry.slug));
    if (error) throw error;
    existingSlugs.add(entry.slug);
    existingKeys.add(dupKey);
    added++;
    console.log(`[katalog] Neu eingetragen: ${entry.fields.perfume_name} (${entry.slug})`);
  }
  console.log(`[katalog] Fertig: ${added} neue(r) Duft/Düfte eingetragen, ${updated} mit neuen Preisen.`);
  // Preis-Alarme: Wer einen Alarm für einen jetzt günstigeren Duft hat, bekommt eine E-Mail.
  if (updatedSlugs.length) {
    try {
      const sent = await runPriceAlerts(db, updatedSlugs);
      if (sent) console.log(`[katalog] Preis-Alarm: ${sent} E-Mail(s) verschickt.`);
    } catch (err) {
      console.error('[katalog] Preis-Alarm fehlgeschlagen (Website wird trotzdem veröffentlicht):', err);
    }
  }
} catch (err) {
  console.error('[katalog] Eintragen fehlgeschlagen – Website wird trotzdem veröffentlicht:', err);
}
