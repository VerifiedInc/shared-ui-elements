import { test, describe, expect, beforeEach } from 'vitest';

import {
  Form,
  FormBuilder,
  FormField,
} from '../../../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../../../utils/form';

const setupCredential = () => {
  return makeCredential({
    type: 'healthInsurance',
    value: [
      {
        id: 174,
        memberId: 'AC****02',
        payer: {
          verifiedId: 'V123456789',
          name: 'Aviato Health Insurance Of California',
        },
      },
    ],
  });
};

const setupCredentialRequest = (
  { mandatory }: { mandatory: 'yes' | 'no' | 'if_available' } = {
    mandatory: 'no',
  },
) => {
  return makeCredentialRequest({
    type: 'HealthInsuranceCredential',
    mandatory,
  });
};

describe('health insurance', () => {
  let form: Form;

  beforeEach(() => {
    form = new FormBuilder().createFromCredentialAndRequests(
      [setupCredential()],
      [setupCredentialRequest()],
    );
  });

  describe('isValid', () => {
    describe('complete field validation', () => {
      test('field is valid', () => {
        const field = form.fields
          .healthInsurance as FormField<'healthInsurance'>;
        expect(field.isValid).toBe(true);
      });
      test('field with new value is valid', () => {
        const field = form.fields
          .healthInsurance as FormField<'healthInsurance'>;

        field.value = [
          ...field.value,
          {
            selected: true,
            memberId: 'ACDE321',
            payer: {
              verifiedId: 'V123456789',
              name: 'Custom Health Insurance',
            },
          },
        ];
        expect(field.isValid).toBe(true);
      });
    });
    describe('required field validation', () => {
      describe('memberId', () => {
        test('field without memberId is invalid', () => {
          const field = form.fields
            .healthInsurance as FormField<'healthInsurance'>;
          field.value[0].memberId = '';
          expect(field.isValid).toBe(false);
        });
      });
      describe('payer.verifiedId', () => {
        test('field without verifiedId is invalid', () => {
          const field = form.fields
            .healthInsurance as FormField<'healthInsurance'>;
          field.value[0].payer.verifiedId = '';
          expect(field.isValid).toBe(false);
        });
        test('field without verifiedId pattern is invalid', () => {
          const field = form.fields
            .healthInsurance as FormField<'healthInsurance'>;
          field.value[0].payer.verifiedId = 'A123';
          expect(field.isValid).toBe(false);
        });
      });
    });
  });
});
