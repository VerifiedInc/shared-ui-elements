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
