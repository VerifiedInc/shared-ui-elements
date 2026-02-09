import { HealthInsuranceValue } from '../validations';

// Mask member ID with adaptive redaction strategy
// - Length < 5: redact on the left, showing only last 2 characters
// - Length >= 5: centered redaction (show first and last characters, redact middle)
// Also replaces asterisks (*) with dots (•)
export const maskMemberId = (memberId: string): string => {
  // Replace asterisks with dots
  const normalized = memberId.replace(/\*/g, '•');

  // If already has dots, return as is
  if (normalized.includes('•')) {
    return normalized;
  }

  const length = normalized.length;

  // No masking needed for very short IDs
  if (length <= 2) {
    return normalized;
  }

  // Length < 5: redact left (show only last 2)
  if (length < 5) {
    const visiblePart = normalized.slice(-2);
    const maskedPart = '•'.repeat(length - 2);
    return maskedPart + visiblePart;
  }

  // Length >= 5: centered redaction
  // Show first 2, redact middle, show last 2
  const firstPart = normalized.slice(0, 2);
  const lastPart = normalized.slice(-2);
  const middleLength = length - 4;
  const maskedMiddle = '•'.repeat(middleLength);

  return firstPart + maskedMiddle + lastPart;
};

export const healthInsuranceFormat = (value: HealthInsuranceValue) => {
  return value
    .filter((item) => item.payer?.name && item.memberId)
    .map((item) => `${item.payer.name}-${maskMemberId(item.memberId)}`)
    .join(',');
};
