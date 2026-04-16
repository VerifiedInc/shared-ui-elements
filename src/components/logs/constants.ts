import type { LogEntry } from './types';

export const PRODUCT_LABELS: Record<LogEntry['product'], string> = {
  signup: '1-Click Signup',
  verify: '1-Click Verify',
  health: '1-Click Health',
  'text-to-signup': 'Text to Signup',
};
