import { ImageAnalysisResult } from '@/types/image-analysis';

export interface ScanHistoryEntry {
  id: string;
  perfumeName: string;
  brandName: string;
  confidence: string;
  family?: string;
  scannedAt: number; // timestamp
  analysis: ImageAnalysisResult['data'];
}

const STORAGE_KEY = 'auressa_scan_history';
const SCHEMA_VERSION = 1;
const SCHEMA_VERSION_KEY = 'auressa_scan_history_v';
const MAX_ENTRIES = 5;

/** Validate that an entry has all required fields; drop malformed ones from old schema versions. */
function isValidEntry(e: unknown): e is ScanHistoryEntry {
  if (!e || typeof e !== 'object') return false;
  const entry = e as Record<string, unknown>;
  return (
    typeof entry.id === 'string' &&
    typeof entry.perfumeName === 'string' &&
    typeof entry.brandName === 'string' &&
    typeof entry.confidence === 'string' &&
    typeof entry.scannedAt === 'number' &&
    entry.analysis != null &&
    typeof entry.analysis === 'object'
  );
}

export function getScanHistory(): ScanHistoryEntry[] {
  try {
    const storedVersion = parseInt(localStorage.getItem(SCHEMA_VERSION_KEY) || '0', 10);
    // Clear storage when schema version changes to avoid crashes from missing fields
    if (storedVersion !== SCHEMA_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(SCHEMA_VERSION_KEY, String(SCHEMA_VERSION));
      return [];
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Filter out any entries that don't match the current shape
    return parsed.filter(isValidEntry);
  } catch {
    return [];
  }
}

export function addScanToHistory(analysis: ImageAnalysisResult['data']): void {
  try {
    const history = getScanHistory();
    const entry: ScanHistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      perfumeName: analysis.perfumeName,
      brandName: analysis.brandName,
      confidence: analysis.confidence,
      family: analysis.family,
      scannedAt: Date.now(),
      analysis,
    };
    // Deduplicate by name+brand (keep newest)
    const filtered = history.filter(
      (e) => !(e.perfumeName === entry.perfumeName && e.brandName === entry.brandName)
    );
    const updated = [entry, ...filtered].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(SCHEMA_VERSION_KEY, String(SCHEMA_VERSION));
  } catch {
    // localStorage might be unavailable (private mode etc.) — fail silently
  }
}

export function clearScanHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 2) return 'Gerade eben';
  if (minutes < 60) return `vor ${minutes} Min.`;
  if (hours < 24) return `vor ${hours} Std.`;
  if (days === 1) return 'Gestern';
  return `vor ${days} Tagen`;
}
