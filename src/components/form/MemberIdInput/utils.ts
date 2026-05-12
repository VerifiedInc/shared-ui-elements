// Normalize * → • then apply last-4 masking for display.
export function buildDisplayValue(value: string): string {
  const normalized = value.replace(/\*/g, '•');
  if (normalized.includes('•')) {
    // Server may use an old format (e.g. "21••••••••13") that exposes chars at both ends.
    // Re-mask so only the trailing visible chars are shown, everything else is a bullet.
    const lastBulletIdx = normalized.lastIndexOf('•');
    const trailingVisible = normalized.slice(lastBulletIdx + 1);
    return (
      '•'.repeat(normalized.length - trailingVisible.length) + trailingVisible
    );
  }
  const length = normalized.length;
  if (length <= 4) return normalized;
  return '•'.repeat(length - 4) + normalized.slice(-4);
}
