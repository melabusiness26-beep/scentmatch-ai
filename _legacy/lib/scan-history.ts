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
const MAX_ENTRIES = 5;

export function getScanHistory(): ScanHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ScanHistoryEntry[];
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
