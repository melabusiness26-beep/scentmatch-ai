import { concentrationLabel, type Perfume } from './perfumes';

// Versionen eines Duftes (z. B. Light Blue als Eau de Toilette, Eau de Parfum
// und Eau Intense). Jede Version ist ein eigener Eintrag mit eigenen Daten;
// zusammengehörig sind sie, wenn Marke und Geschlecht gleich sind und der Name
// ohne Konzentrations-Zusatz übereinstimmt.

// Zusätze am Namensende, die nur die Version bezeichnen (längste zuerst).
const VERSION_SUFFIXES = [
  'eau de parfum intense',
  // Bekannte Varianten-Namen (Flanker) einer Duftlinie, z. B. Terre d'Hermès Eau Givrée.
  'eau intense vetiver',
  'eau tres fraiche',
  'eau givree',
  'extrait de parfum',
  'eau de parfum',
  'eau de toilette',
  'eau de cologne',
  'parfum intense',
  'eau intense',
  'le parfum',
  'intense',
  'extrait',
  'elixir',
  'parfum',
  'cologne',
  'edp',
  'edt'
];

// Reihenfolge von leicht nach stark – so stehen die Versionen im Umschalter.
const CONCENTRATION_ORDER: Record<string, number> = { Cologne: 0, EdC: 0, EdT: 1, EdP: 2, Parfum: 3, Extrait: 3 };

function norm(value: string | null | undefined): string {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function baseName(name: string): string {
  let n = norm(name);
  let changed = true;
  while (changed) {
    changed = false;
    for (const suffix of VERSION_SUFFIXES) {
      if (n.endsWith(` ${suffix}`)) {
        n = n.slice(0, -suffix.length - 1).trim();
        changed = true;
      }
    }
  }
  return n;
}

// Alle Versionen dieses Duftes inkl. ihm selbst, sortiert von leicht nach stark.
// Gibt es keine weitere Version, ist die Liste leer.
export function findVersions(perfume: Perfume, pool: Perfume[]): Perfume[] {
  const base = baseName(perfume.perfume_name);
  const brand = norm(perfume.brands?.name);
  if (!base || !brand) return [];
  const group = pool.filter(
    (p) =>
      p.slug &&
      p.id !== perfume.id &&
      norm(p.brands?.name) === brand &&
      p.gender === perfume.gender &&
      baseName(p.perfume_name) === base
  );
  if (group.length === 0) return [];
  return [perfume, ...group].sort(
    (a, b) =>
      (CONCENTRATION_ORDER[a.concentration || ''] ?? 2) - (CONCENTRATION_ORDER[b.concentration || ''] ?? 2) ||
      a.perfume_name.length - b.perfume_name.length
  );
}

// Kurzer Name einer Version für den Umschalter: der Namenszusatz
// („Eau Intense") oder sonst die Konzentration („Eau de Toilette").
export function versionLabel(p: Perfume): string {
  const words = p.perfume_name.trim().split(/\s+/);
  const base = baseName(p.perfume_name);
  // Wörter des Originalnamens zählen, bis sie den Grundnamen ergeben – so stimmt es
  // auch bei Apostrophen („Terre d'Hermès" = 2 Wörter, normalisiert aber 3).
  let baseWords = words.length;
  for (let i = 1; i <= words.length; i++) {
    if (norm(words.slice(0, i).join(' ')) === base) {
      baseWords = i;
      break;
    }
  }
  const suffix = words.slice(baseWords).join(' ');
  if (suffix && norm(suffix) !== norm(concentrationLabel(p.concentration))) {
    return suffix;
  }
  return concentrationLabel(p.concentration) || suffix || p.perfume_name;
}

// Ehrlicher Kurzvergleich einer anderen Version mit der aktuellen – nur aus
// vorhandenen Daten (Haltbarkeit, Sillage, Preis, Noten). Keine Annahmen.
export function compareVersion(current: Perfume, other: Perfume): string {
  const parts: string[] = [];
  if (current.longevity != null && other.longevity != null && other.longevity !== current.longevity) {
    parts.push(other.longevity > current.longevity ? 'hält länger' : 'hält weniger lang');
  }
  if (current.sillage != null && other.sillage != null && other.sillage !== current.sillage) {
    parts.push(other.sillage > current.sillage ? 'strahlt stärker aus' : 'bleibt näher an der Haut');
  }
  if (current.price_chf != null && other.price_chf != null) {
    const a = current.volume_ml;
    const b = other.volume_ml;
    if (a && b && a !== b) {
      // Verschiedene Flaschengrössen: fair über den Preis pro 100 ml vergleichen.
      const diff = Math.round((other.price_chf / b - current.price_chf / a) * 100);
      if (Math.abs(diff) >= 3) parts.push(`pro 100 ml ca. CHF ${Math.abs(diff)} ${diff > 0 ? 'teurer' : 'günstiger'}`);
    } else if (a === b || (!a && !b)) {
      const diff = Math.round(other.price_chf - current.price_chf);
      if (Math.abs(diff) >= 3) parts.push(`ca. CHF ${Math.abs(diff)} ${diff > 0 ? 'teurer' : 'günstiger'}`);
    }
  }
  const notesOf = (p: Perfume) => [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])];
  // „Zitrone" und „Sizilianische Zitrone" gelten als dieselbe Note.
  const own = notesOf(current).map((n) => n.toLowerCase());
  const sameNote = (n: string) => own.some((o) => o.includes(n.toLowerCase()) || n.toLowerCase().includes(o));
  const extra = notesOf(other).filter((n, i, all) => !sameNote(n) && all.indexOf(n) === i);

  let text =
    parts.length === 0
      ? 'in Haltbarkeit, Ausstrahlung und Preis sehr ähnlich'
      : parts.length === 1
        ? parts[0]
        : `${parts.slice(0, -1).join(', ')} und ${parts[parts.length - 1]}`;
  if (extra.length > 0 && own.length > 0) {
    const shown = extra.slice(0, 3);
    const list = shown.length > 1 ? `${shown.slice(0, -1).join(', ')} und ${shown[shown.length - 1]}` : shown[0];
    text += `. Zusätzliche Noten: ${list}`;
  }
  return text;
}

// Anzeigename für Auswahllisten: bei gleichnamigen Düften kommt die Version dazu
// („Light Blue (Eau de Parfum)"), damit man sie unterscheiden kann.
export function listName(p: Perfume, all: Perfume[]): string {
  const same = all.filter((o) => o.perfume_name.toLowerCase() === p.perfume_name.toLowerCase());
  if (same.length < 2) return p.perfume_name;
  const label = concentrationLabel(p.concentration);
  return label ? `${p.perfume_name} (${label})` : p.perfume_name;
}

// Gegenstück für das andere Geschlecht (z. B. Light Blue ↔ Light Blue Pour Homme):
// gleiche Marke, gleicher Name ohne Geschlechts- und Versions-Zusatz.
const GENDER_SUFFIXES = ['pour homme', 'pour femme', 'for men', 'for women', 'for him', 'for her', 'homme', 'femme', 'uomo', 'donna', 'men', 'women', 'man', 'woman', 'him', 'her'];

function lineName(name: string): string {
  let n = baseName(name);
  let changed = true;
  while (changed) {
    changed = false;
    for (const suffix of GENDER_SUFFIXES) {
      if (n.endsWith(` ${suffix}`)) {
        n = baseName(n.slice(0, -suffix.length - 1));
        changed = true;
      }
    }
  }
  return n;
}

export function findCounterpart(perfume: Perfume, pool: Perfume[]): Perfume | null {
  const other = perfume.gender === 'Women' ? 'Men' : perfume.gender === 'Men' ? 'Women' : null;
  if (!other) return null;
  const line = lineName(perfume.perfume_name);
  const brand = norm(perfume.brands?.name);
  if (!line || !brand) return null;
  const matches = pool.filter(
    (p) => p.slug && p.gender === other && norm(p.brands?.name) === brand && lineName(p.perfume_name) === line
  );
  if (!matches.length) return null;
  // Bevorzugt dieselbe Linie (Eau Intense ↔ Eau Intense, Original ↔ Original), darin
  // dieselbe Konzentration; sonst die kürzeste Bezeichnung (meist das Original).
  const own = versionSuffix(perfume.perfume_name);
  const sameLine = matches.filter((p) => versionSuffix(p.perfume_name) === own);
  return (
    sameLine.find((p) => p.concentration && p.concentration === perfume.concentration) ||
    sameLine[0] ||
    [...matches].sort((a, b) => a.perfume_name.length - b.perfume_name.length)[0]
  );
}

// Namenszusatz nach dem Grundnamen, z. B. „eau intense" – leer beim Original.
function versionSuffix(name: string): string {
  return norm(name).slice(baseName(name).length).trim();
}
