export function validateImageSize(base64String: string, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const sizeBytes = Math.ceil(base64String.length * 0.75);
  return sizeBytes <= maxSizeBytes;
}

export function validateImageType(mimeType: string): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  return allowedTypes.includes(mimeType);
}

export function extractMimeTypeFromDataUri(dataUri: string): string {
  const match = dataUri.match(/^data:([^;]+)/);
  return match ? match[1] : 'image/jpeg';
}

export function extractBase64FromDataUri(dataUri: string): string {
  return dataUri.split(',')[1] || dataUri;
}
