// Einheitliche Preisanzeige: ganze Beträge ohne Rappen (CHF 100),
// sonst immer zwei Stellen (CHF 90.90 statt CHF 90.9).
export function formatChf(value: number | string | null | undefined): string {
  if (value == null || value === '') return '';
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return String(value);
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
