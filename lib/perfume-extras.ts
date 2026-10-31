import type { StoredAccord } from './accords.ts';
// Zusatzangaben pro Duft, die im Chat recherchiert und über den Admin eingetragen
// werden: Grössen & Preise, „bekannte Alternative zu …", ähnliche Düfte und der Flakon.
// Im Admin werden sie als einfache Textzeilen gepflegt; hier wird zwischen Text und
// Datenbank-Format umgewandelt. Unvollständige Zeilen werden ignoriert, nicht geraten.

export type SizePrice = { ml: number; price_chf: number };
export type AlternativeTo = { name: string; brand?: string | null; price_chf?: number | null; note?: string | null };
export type SimilarName = { name: string; brand: string | null };

export type PerfumeExtras = {
  sizes?: SizePrice[] | null;
  alternative_to?: AlternativeTo[] | null;
  similar_perfumes?: string[] | null;
  flacon_description?: string | null;
  flacon_designer?: string | null;
  accords?: StoredAccord[] | null;
};

function toNumber(value: unknown): number | null {
  if (value == null || value === '') return null;
  const n = Number(String(value).replace(/chf/i, '').replace(',', '.').trim());
  return Number.isFinite(n) ? n : null;
}

function lines(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

// ── Grössen & Preise ──────────────────────────────────────────
// Eine Zeile pro Grösse: „40 ml: 14.99" (auch „40: 14.99" oder „40ml 14,99").
export function parseSizes(text: string): SizePrice[] {
  const out: SizePrice[] = [];
  for (const line of lines(text)) {
    const m = line.match(/^(\d+(?:[.,]\d+)?)\s*(?:ml)?\s*[:=\-–]?\s*(?:ca\.?\s*)?(?:chf\s*)?(\d+(?:[.,]\d+)?)/i);
    if (!m) continue;
    const ml = toNumber(m[1]);
    const price = toNumber(m[2]);
    if (ml && ml > 0 && ml <= 1000 && price != null && price > 0 && price <= 5000) out.push({ ml, price_chf: price });
  }
  return cleanSizes(out);
}

export function sizesToText(sizes: SizePrice[] | null | undefined): string {
  return (sizes || []).map((s) => `${s.ml} ml: ${s.price_chf}`).join('\n');
}

// Gültige Einträge, nach Grösse sortiert, jede Grösse nur einmal.
export function cleanSizes(input: unknown): SizePrice[] {
  if (!Array.isArray(input)) return [];
  const byMl = new Map<number, SizePrice>();
  for (const item of input) {
    if (!item || typeof item !== 'object') continue;
    const ml = toNumber((item as Record<string, unknown>).ml);
    const price = toNumber((item as Record<string, unknown>).price_chf);
    if (ml && ml > 0 && price != null && price > 0) byMl.set(ml, { ml, price_chf: price });
  }
  return [...byMl.values()].sort((a, b) => a.ml - b.ml);
}

export function pricePer100ml(size: SizePrice): number {
  return Math.round((size.price_chf / size.ml) * 100 * 100) / 100;
}

// Grösse mit dem tiefsten Preis pro 100 ml (null bei weniger als zwei Grössen).
export function bestValueSize(sizes: SizePrice[]): SizePrice | null {
  if (sizes.length < 2) return null;
  return sizes.reduce((best, s) => (pricePer100ml(s) < pricePer100ml(best) ? s : best));
}

// ── „Bekannte Alternative zu …" ───────────────────────────────
// Eine Zeile pro Duft: „Name | Marke | Preis | Hinweis" (nur der Name ist Pflicht).
export function parseAlternatives(text: string): AlternativeTo[] {
  return cleanAlternatives(
    lines(text).map((line) => {
      const [name, brand, price, ...note] = line.split('|').map((p) => p.trim());
      return { name, brand, price_chf: price, note: note.join(' | ') };
    })
  );
}

export function alternativesToText(list: AlternativeTo[] | null | undefined): string {
  return (list || [])
    .map((a) => {
      const parts = [a.name, a.brand || '', a.price_chf != null ? String(a.price_chf) : '', a.note || ''];
      while (parts.length > 1 && !parts[parts.length - 1]) parts.pop();
      return parts.join(' | ');
    })
    .join('\n');
}

export function cleanAlternatives(input: unknown): AlternativeTo[] {
  if (!Array.isArray(input)) return [];
  const out: AlternativeTo[] = [];
  for (const item of input) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Record<string, unknown>;
    const name = String(r.name ?? '').trim();
    if (!name) continue;
    const brand = String(r.brand ?? '').trim() || null;
    const price = toNumber(r.price_chf);
    const note = String(r.note ?? '').trim() || null;
    out.push({ name, brand, price_chf: price != null && price > 0 ? price : null, note });
  }
  return out;
}

// ── Ähnliche Düfte (bekannte, auch ausserhalb des Katalogs) ───
// Gespeichert als „Name – Marke" (Gedankenstrich), eine Zeile pro Duft.
export function parseSimilarNames(text: string): string[] {
  const out: string[] = [];
  for (const line of lines(text)) {
    const { name, brand } = splitSimilar(line);
    const entry = brand ? `${name} – ${brand}` : name;
    if (name && !out.includes(entry)) out.push(entry);
  }
  return out;
}

export function splitSimilar(entry: string): SimilarName {
  const m = entry.match(/^(.+?)\s+(?:[–—|]|-)\s+(.+)$/);
  if (m) return { name: m[1].trim(), brand: m[2].trim() };
  const pipe = entry.split('|');
  if (pipe.length === 2 && pipe[0].trim() && pipe[1].trim()) return { name: pipe[0].trim(), brand: pipe[1].trim() };
  return { name: entry.trim(), brand: null };
}
