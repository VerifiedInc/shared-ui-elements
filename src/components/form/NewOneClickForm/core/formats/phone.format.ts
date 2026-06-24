import { parseToPhoneNational } from '../../../../../utils/phone';

export const phoneFormat = (value: string): string => {
  if (!value) return value;
  // Render E.164 in a human-readable national format (e.g. "+1 (212) 555-0010").
  // Falls back to the raw value if it can't be parsed.
  try {
    return parseToPhoneNational(value);
  } catch {
    return value;
  }
};
