import { type Perfume } from './perfumes';
import { findVersions, versionLabel } from './versions';

// Vergleichsseiten „X vs. Y" für Versionen desselben Duftes (z. B. Light Blue EdT vs. EdP).
// Die Paare entstehen automatisch aus dem Katalog: Kommt eine neue Version dazu, gibt es
// auch die passenden Vergleichsseiten – ohne dass jemand etwas eintragen muss.

export type VersionPair = { slug: string; a: Perfume; b: Perfume };

// Adresse eines Paars: leichtere Version zuerst, z. B. „light-blue-vs-light-blue-eau-de-parfum".
export function pairSlug(a: Perfume, b: Perfume): string {
  return `${a.slug}-vs-${b.slug}`;
}

// Alle Paare im Katalog (jede Kombination zweier Versionen eines Duftes, leichtere zuerst).
export function versionPairs(perfumes: Perfume[]): VersionPair[] {
  const pairs: VersionPair[] = [];
  const seenGroups = new Set<string>();
  for (const p of perfumes) {
    const group = findVersions(p, perfumes); // sortiert von leicht nach stark
    if (group.length < 2) continue;
    const key = group.map((x) => x.id).sort().join('|');
    if (seenGroups.has(key)) continue;
    seenGroups.add(key);
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i];
        const b = group[j];
        if (a.slug && b.slug) pairs.push({ slug: pairSlug(a, b), a, b });
      }
    }
  }
  return pairs;
}

export function findPair(slug: string, perfumes: Perfume[]): VersionPair | null {
  return versionPairs(perfumes).find((p) => p.slug === slug) ?? null;
}

// Alle Vergleichsseiten, an denen ein bestimmter Duft beteiligt ist (für Links auf der Duft-Seite).
export function pairsFor(perfume: Perfume, perfumes: Perfume[]): VersionPair[] {
  return versionPairs(perfumes).filter((p) => p.a.id === perfume.id || p.b.id === perfume.id);
}

// Noten vergleichen: gemeinsame und nur in der einen bzw. anderen Version.
// „Zitrone" und „Sizilianische Zitrone" gelten als dieselbe Note.
export function compareNotes(a: Perfume, b: Perfume) {
  const all = (p: Perfume) =>
    [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].filter(
      (n, i, list) => n && list.indexOf(n) === i
    );
  const na = all(a);
  const nb = all(b);
  const same = (x: string, y: string) => {
    const lx = x.toLowerCase();
    const ly = y.toLowerCase();
    return lx === ly || lx.includes(ly) || ly.includes(lx);
  };
  const shared = na.filter((n) => nb.some((m) => same(n, m)));
  const onlyA = na.filter((n) => !nb.some((m) => same(n, m)));
  const onlyB = nb.filter((n) => !na.some((m) => same(n, m)));
  return { shared, onlyA, onlyB, hasNotes: na.length > 0 && nb.length > 0 };
}

// Preis pro 100 ml (gerundet) – nur wenn Preis und Grösse bekannt sind.
export function pricePer100(p: Perfume): number | null {
  if (p.price_chf == null || !p.volume_ml) return null;
  return Math.round((p.price_chf / p.volume_ml) * 100);
}

// Lesbarer Titel eines Paars, z. B. „Light Blue: Eau de Toilette vs. Eau de Parfum".
export function pairTitle(pair: VersionPair): string {
  const la = versionLabel(pair.a);
  const lb = versionLabel(pair.b);
  const base = pair.a.perfume_name.toLowerCase().endsWith(la.toLowerCase())
    ? pair.a.perfume_name.slice(0, -la.length).trim() || pair.a.perfume_name
    : pair.a.perfume_name;
  return `${base}: ${la} vs. ${lb}`;
}
