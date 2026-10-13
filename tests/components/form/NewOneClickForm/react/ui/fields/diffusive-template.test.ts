import { describe, test, expect } from 'vitest';

import { toDiffusiveTemplate } from '../../../../../../../src/components/form/NewOneClickForm/react/ui/fields/shared';

describe('toDiffusiveTemplate', () => {
  test('maps digits to #', () => {
    expect(toDiffusiveTemplate('94303')).toBe('#####');
  });

  test('keeps the case of letters', () => {
    expect(toDiffusiveTemplate('Richard')).toBe('Xxxxxxx');
  });

  test('keeps every other character as is', () => {
    expect(toDiffusiveTemplate('01/15/••••')).toBe('##/##/••••');
    expect(toDiffusiveTemplate('a.b@c-d 1')).toBe('x.x@x-x #');
  });

  test('keeps the length', () => {
    const value = '123 Main St, Apt 4B';
    expect(toDiffusiveTemplate(value)).toHaveLength(value.length);
  });
});
