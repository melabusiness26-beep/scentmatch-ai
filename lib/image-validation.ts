const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export function validateBase64Image(imageBase64: string): {
  valid: boolean;
  error?: string;
} {
  if (!imageBase64) {
    return { valid: false, error: 'Kein Bild vorhanden' };
  }

  // Base64 String längenwert ist ungefähr (actual size * 4/3)
  const estimatedSize = (imageBase64.length * 3) / 4;
  if (estimatedSize > MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: `Bild zu gross (max ${MAX_SIZE_MB}MB)`,
    };
  }

  // Prüfe MIME-Type aus Data-URI
  const mimeMatch = imageBase64.match(/^data:([^;]+)/);
  const mimeType = mimeMatch ? mimeMatch[1] : null;

  if (!mimeType || !ALLOWED_MIME_TYPES.includes(mimeType)) {
    return {
      valid: false,
      error: 'Nur JPEG, PNG oder WebP akzeptiert',
    };
  }

  return { valid: true };
}

export function stripDataUriPrefix(imageBase64: string): string {
  // Entfernt "data:image/jpeg;base64," falls vorhanden
  return imageBase64.replace(/^data:[^;]+;base64,/, '');
}
