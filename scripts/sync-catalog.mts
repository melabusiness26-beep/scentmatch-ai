// „Mergen = fertig": läuft vor jedem Build (npm prebuild).
//
// 1. Prüft immer alle Dateien in catalog/perfumes/ – ein Fehler bricht den Build ab,
//    damit die Vorschau im PR rot wird, bevor etwas live geht.
// 2. Nur beim Production-Build (VERCEL_ENV=production) mit Server-Schlüssel:
//    trägt NEUE Düfte ein (fehlende Marken werden angelegt). Bestehende Düfte
//    (gleicher slug, oder gleiche Marke + Name + Konzentration) bleiben unberührt –
//    es wird nie etwas geändert oder gelöscht.
//
// Ein Datenbank-Fehler beim Eintragen stoppt den Build nicht (die Website soll
// trotzdem live gehen); er steht im Build-Log.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { checkCatalog, slugify, toPerfumeRow } from '../lib/catalog.ts';

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
    .select('slug, perfume_name, concentration, brand_id');
  if (pErr) throw pErr;
  const { data: brands, error: bErr } = await db.from('brands').select('id, name, slug');
  if (bErr) throw bErr;

  const brandBySlug = new Map<string, string>();
  for (const b of brands || []) brandBySlug.set(b.slug || slugify(b.name), b.id);
  const existingSlugs = new Set((perfumes || []).map((p) => p.slug));
  const existingKeys = new Set(
    (perfumes || []).map((p) => `${p.brand_id}|${slugify(p.perfume_name)}|${p.concentration || ''}`)
  );

  let added = 0;
  for (const entry of entries) {
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
  console.log(`[katalog] Fertig: ${added} neue(r) Duft/Düfte eingetragen.`);
} catch (err) {
  console.error('[katalog] Eintragen fehlgeschlagen – Website wird trotzdem veröffentlicht:', err);
}
