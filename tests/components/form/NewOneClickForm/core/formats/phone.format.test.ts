import { describe, test, expect } from 'vitest';

import { phoneFormat } from '../../../../../../src/components/form/NewOneClickForm/core/formats/phone.format';

describe('phoneFormat', () => {
  test('formats a US E.164 number in national format', () => {
    expect(phoneFormat('+12125550010')).toBe('+1 (212) 555-0010');
  });

  test('returns an empty string unchanged', () => {
    expect(phoneFormat('')).toBe('');
  });
});
