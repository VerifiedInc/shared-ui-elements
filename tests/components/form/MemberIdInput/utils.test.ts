import { describe, expect, it } from 'vitest';

import { buildDisplayValue } from '../../../../src/components/form/MemberIdInput/utils';

describe('buildDisplayValue', () => {
  describe('short values (≤4 chars) — no masking', () => {
    it('returns 1-char value unchanged', () => {
      expect(buildDisplayValue('A')).toBe('A');
    });

    it('returns 2-char value unchanged', () => {
      expect(buildDisplayValue('AB')).toBe('AB');
    });

    it('returns 3-char value unchanged', () => {
      expect(buildDisplayValue('ABC')).toBe('ABC');
    });

    it('returns 4-char value unchanged', () => {
      expect(buildDisplayValue('ABCD')).toBe('ABCD');
    });
  });

  describe('longer values — masks all but last 4', () => {
    it('masks 1 char for a 5-char value', () => {
      expect(buildDisplayValue('ABCDE')).toBe('•BCDE');
    });

    it('masks 2 chars for a 6-char value', () => {
      expect(buildDisplayValue('ABCDEF')).toBe('••CDEF');
    });

    it('masks 3 chars for a 7-char value', () => {
      expect(buildDisplayValue('ABCDEFG')).toBe('•••DEFG');
    });

    it('masks all but last 4 for a 12-char value', () => {
      expect(buildDisplayValue('ABCDEFGHIJKL')).toBe('••••••••IJKL');
    });

    it('preserves numeric characters', () => {
      expect(buildDisplayValue('123456789')).toBe('•••••6789');
    });

    it('preserves alphanumeric mix', () => {
      expect(buildDisplayValue('XYZ123456789')).toBe('••••••••6789');
    });
  });

  describe('server-redacted values (already contain • or *)', () => {
    it('returns a value already in last-4 format unchanged', () => {
      expect(buildDisplayValue('••••5678')).toBe('••••5678');
    });

    it('normalizes * to • for a value already in last-4 format', () => {
      expect(buildDisplayValue('****5678')).toBe('••••5678');
    });

    it('normalizes mixed * and •', () => {
      expect(buildDisplayValue('**••5678')).toBe('••••5678');
    });

    it('re-masks old server format (first-2 + last-2) to last-visible-only', () => {
      // Server sends "21••••••••13" — strip leading visible chars, keep trailing.
      expect(buildDisplayValue('21••••••••13')).toBe('••••••••••13');
    });

    it('re-masks old server format with * characters', () => {
      expect(buildDisplayValue('21********13')).toBe('••••••••••13');
    });
  });

  describe('edge cases', () => {
    it('returns empty string unchanged', () => {
      expect(buildDisplayValue('')).toBe('');
    });

    it('handles exactly 4 chars with no masking', () => {
      expect(buildDisplayValue('1234')).toBe('1234');
    });

    it('masks length is preserved (display length equals input length)', () => {
      const input = 'ABCDEFGHIJ'; // 10 chars
      const display = buildDisplayValue(input);
      expect(display.length).toBe(input.length);
    });
  });
});
