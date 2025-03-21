export const RISK_SCORE_RANGES = {
  ALLOW: {
    MIN: 0,
    MAX: 400,
    NAME: 'Allow',
    LABEL: '0-400',
  },
  FLAG: {
    MIN: 401,
    MAX: 600,
    NAME: 'Flag',
    LABEL: '401-600',
  },
  BLOCK: {
    MIN: 601,
    MAX: 1000,
    NAME: 'Block',
    LABEL: '601-1000',
  },
} as const;

export const ERROR_CODES_MESSAGES: Record<string, string> = {
  ERR001: 'Generic error code',
  OCE001: '1-Click error code',
  OCE002: 'Unsupported phone number',
  OCE003: 'Either phone or email is required',
  OCE004: 'User not found',
  OCE005: 'Credential requests are missing',
  OCE006: 'User identifier is missing',
  OCE007: 'Missing mandatory credentials',
  OCE008: 'Invalid/expired verification code',
  OCE009: 'Verification code required',
  OCE010: 'Missing fields to autofill',
  OCE011: 'Additional information required',
  OCE012: 'BirthDate or SSN4 mismatch',
  OCE013: 'No credentials found',
  OCE014: '1-Click request expired',
  OCE015: '1-Click not found',
  OCE016: 'Conflict request for phone number',
  OCE017: 'Risk score too high',
  OCE018: 'Maximum code attempts exceeded',
  OCE019: 'Maximum input attempts exceeded',
};
