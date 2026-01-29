import { test, describe, expect } from 'vitest';
import { toDomainCredentials } from '../../../../../../../src/components/form/NewOneClickForm/core/internal/mappers/domain.map';
import type { Credential } from '../../../../../../../src/components/form/NewOneClickForm/types';
import { makeCredential } from '../../../utils/form';

describe('toDomainCredentials', () => {
  test('should return empty array when given empty credentials', () => {
    const result = toDomainCredentials([]);
    expect(result).toEqual([]);
  });

  describe('HealthInsurance field', () => {
    test('should add selected: true to all health insurance items', () => {
      const healthInsurance = makeCredential({
        type: 'healthInsurance',
        value: [
          {
            memberId: 'AC****02',
            payer: {
              verifiedId: 'V123123',
              name: 'Aviato Health Insurance Of California',
              logoUrl: 'https://example.com/logo.png',
            },
          },
          {
            memberId: 'XY****99',
            payer: {
              verifiedId: 'V123321',
              name: 'Blue Cross Blue Shield',
            },
          },
        ],
      });

      const result = toDomainCredentials([healthInsurance]);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('healthInsurance');
      expect(result[0].value).toHaveLength(2);
      expect(result[0].value[0]).toEqual({
        memberId: 'AC****02',
        payer: {
          verifiedId: 'V123123',
          name: 'Aviato Health Insurance Of California',
          logoUrl: 'https://example.com/logo.png',
        },
        selected: true,
      });
      expect(result[0].value[1]).toEqual({
        memberId: 'XY****99',
        payer: {
          verifiedId: 'V123321',
          name: 'Blue Cross Blue Shield',
        },
        selected: true,
      });
    });
  });
});
