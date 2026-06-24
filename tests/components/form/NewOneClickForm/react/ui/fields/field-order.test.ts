import { describe, test, expect } from 'vitest';

import { FormBuilder } from '../../../../../../../src/components/form/NewOneClickForm/core/form/formBuilder';
import { getDisplayFieldKeys } from '../../../../../../../src/components/form/NewOneClickForm/react/ui/fields/field-order';
import type { CredentialRequest } from '../../../../../../../src/components/form/NewOneClickForm/types';

const buildFields = (requests: CredentialRequest[]) =>
  new FormBuilder().createFromCredentialAndRequests([], requests).fields;

const request = (type: string): CredentialRequest => ({
  type,
  allowUserInput: true,
  mandatory: 'no',
  multi: false,
});

describe('getDisplayFieldKeys', () => {
  test('omits phone by default (showPhone falsy)', () => {
    const fields = buildFields([
      request('FullNameCredential'),
      request('PhoneCredential'),
      request('AddressCredential'),
    ]);

    expect(getDisplayFieldKeys(fields, {})).toEqual(['fullName', 'address']);
    expect(getDisplayFieldKeys(fields, { showPhone: false })).toEqual([
      'fullName',
      'address',
    ]);
  });

  test('places phone between name and address when showPhone is true', () => {
    const fields = buildFields([
      request('FullNameCredential'),
      // Phone is requested last to prove it gets re-positioned, not left in place.
      request('AddressCredential'),
      request('PhoneCredential'),
    ]);

    expect(getDisplayFieldKeys(fields, { showPhone: true })).toEqual([
      'fullName',
      'phone',
      'address',
    ]);
  });

  test('falls back to just before address when name is absent', () => {
    const fields = buildFields([
      request('AddressCredential'),
      request('PhoneCredential'),
    ]);

    expect(getDisplayFieldKeys(fields, { showPhone: true })).toEqual([
      'phone',
      'address',
    ]);
  });

  test('appends phone when neither name nor address is present', () => {
    const fields = buildFields([
      request('BirthDateCredential'),
      request('PhoneCredential'),
    ]);

    expect(getDisplayFieldKeys(fields, { showPhone: true })).toEqual([
      'birthDate',
      'phone',
    ]);
  });

  test('is a no-op when there is no phone field, even if showPhone is true', () => {
    const fields = buildFields([
      request('FullNameCredential'),
      request('AddressCredential'),
    ]);

    expect(getDisplayFieldKeys(fields, { showPhone: true })).toEqual([
      'fullName',
      'address',
    ]);
  });
});
