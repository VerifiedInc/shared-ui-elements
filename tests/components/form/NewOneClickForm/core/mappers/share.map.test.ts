import { test, describe, expect } from 'vitest';
import {
  toShareCredentials,
  type CreatedPatchedCredential,
} from '../../../../../../src/components/form/NewOneClickForm/core/mappers/share.map';

describe('toShareCredentials', () => {
  test('should return empty array for empty input', () => {
    const result = toShareCredentials.toShareCredentials([]);

    expect(result).toEqual([]);
  });

  test('should map simple credential with primitive fields', () => {
    const credentials: CreatedPatchedCredential[] = [
      {
        uuid: 'ssn-uuid-123',
        type: 'ssn',
        value: {
          ssn: '123456789',
        },
      },
    ];

    const result = toShareCredentials.toShareCredentials(credentials);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      uuid: 'ssn-uuid-123',
      fields: ['ssn'],
    });
  });

  test('should map credential with nested object fields using dot notation', () => {
    const credentials: CreatedPatchedCredential[] = [
      {
        uuid: 'address-uuid-456',
        type: 'address',
        value: {
          line1: '123 Main St',
          city: 'New York',
          state: 'NY',
        },
      },
    ];

    const result = toShareCredentials.toShareCredentials(credentials);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      uuid: 'address-uuid-456',
      fields: ['line1', 'city', 'state'],
    });
  });

  test('should map multiple credentials', () => {
    const credentials: CreatedPatchedCredential[] = [
      {
        uuid: 'ssn-uuid-123',
        type: 'ssn',
        value: {
          ssn: '123456789',
        },
      },
      {
        uuid: 'fullname-uuid-456',
        type: 'fullName',
        value: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    ];

    const result = toShareCredentials.toShareCredentials(credentials);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      uuid: 'ssn-uuid-123',
      fields: ['ssn'],
    });
    expect(result[1]).toEqual({
      uuid: 'fullname-uuid-456',
      fields: ['firstName', 'lastName'],
    });
  });

  test('should handle mixed primitive and nested fields', () => {
    const credentials: CreatedPatchedCredential[] = [
      {
        uuid: 'fullname-uuid-999',
        type: 'fullName',
        value: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    ];

    const result = toShareCredentials.toShareCredentials(credentials);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      uuid: 'fullname-uuid-999',
      fields: ['firstName', 'lastName'],
    });
  });

  test('should handle drivers license credential', () => {
    const credentials: CreatedPatchedCredential[] = [
      {
        uuid: 'drivers-license-uuid-555',
        type: 'driversLicense',
        value: {
          documentNumber: '123456789',
          issuanceState: 'NY',
          issuanceDate: '1754049600000',
          expirationDate: '1765800000000',
          address: {
            line1: '123 Main Street',
            city: 'New York',
            state: 'NY',
            country: 'US',
            zipCode: '10001',
          },
        },
      },
    ];

    const result = toShareCredentials.toShareCredentials(credentials);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      uuid: 'drivers-license-uuid-555',
      fields: [
        'documentNumber',
        'issuanceState',
        'issuanceDate',
        'expirationDate',
        'address.line1',
        'address.city',
        'address.state',
        'address.country',
        'address.zipCode',
      ],
    });
  });
});
