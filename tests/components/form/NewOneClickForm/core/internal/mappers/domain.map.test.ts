import { test, describe, expect } from 'vitest';

import { toDomainCredentials } from '../../../../../../../src/components/form/NewOneClickForm/core/internal/mappers/domain.map';

import { makeCredential } from '../../../utils/form';

describe('toDomainCredentials', () => {
  test('should return empty array when given empty credentials', () => {
    const result = toDomainCredentials([]);
    expect(result).toEqual([]);
  });

  describe('HealthInsurance field', () => {
    test('should pass through health insurance credential unchanged', () => {
      const healthInsurance = makeCredential({
        type: 'healthInsurance',
        value: {
          memberId: 'AC****02',
          payer: {
            verifiedId: 'V123123',
            name: 'Aviato Health Insurance Of California',
            logoUrl: 'https://example.com/logo.png',
          },
        },
      });

      const result = toDomainCredentials([healthInsurance]);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('healthInsurance');
      expect(result[0].value).toEqual({
        memberId: 'AC****02',
        payer: {
          verifiedId: 'V123123',
          name: 'Aviato Health Insurance Of California',
          logoUrl: 'https://example.com/logo.png',
        },
      });
    });
  });
});
