import { test, describe, expect, beforeEach } from 'vitest';

import {
  FormField,
  FormFieldBuilder,
  FormBuilder,
} from '../../../../../../src/components/form/NewOneClickForm/core/form';

import { makeCredential, makeCredentialRequest } from '../../utils/form';

describe('FormField', () => {
  describe('states', () => {
    let field: FormField<'ssn'>;

    beforeEach(() => {
      field = new FormFieldBuilder().createFromCredential<'ssn'>(
        makeCredential({ type: 'ssn', value: { ssn: '' } }),
        undefined,
        makeCredentialRequest({
          type: 'SsnCredential',
          allowUserInput: true,
          mandatory: 'yes',
          description: 'SSN',
        }),
      );
    });

    describe('hasVariants', () => {
      test('field has variants', () => {
        const field = new FormFieldBuilder().createFromCredential<'ssn'>(
          makeCredential({ type: 'ssn', value: { ssn: '123456789' } }),
          undefined,
          makeCredentialRequest({
            type: 'SsnCredential',
            allowUserInput: true,
            mandatory: 'yes',
            description: 'SSN',
          }),
          [
            new FormFieldBuilder().createFromCredential<'ssn'>(
              makeCredential({ type: 'ssn', value: { ssn: '123456788' } }),
              undefined,
              makeCredentialRequest({
                type: 'SsnCredential',
                allowUserInput: true,
                mandatory: 'yes',
                description: 'SSN',
              }),
            ),
            new FormFieldBuilder().createFromCredential<'ssn'>(
              makeCredential({ type: 'ssn', value: { ssn: '123456787' } }),
              undefined,
              makeCredentialRequest({
                type: 'SsnCredential',
                allowUserInput: true,
                mandatory: 'yes',
                description: 'SSN',
              }),
            ),
          ],
        );
        console.log(field);
        expect(field.hasVariants).toBe(true);
      });

      test('field has no variants', () => {
        expect(field.hasVariants).toBe(false);
      });
    });

    describe('isValid', () => {
      test('field is valid', () => {
        field.value = '123456789';
        expect(field.isValid).toBe(true);
      });

      test('field is invalid', () => {
        field.value = '123';
        expect(field.isValid).toBe(false);
      });
    });

    describe('isRequired', () => {
      test('field is required with yes', () => {
        field.mandatory = 'yes';
        expect(field.isRequired).toBe(true);
      });

      test('field is required with if_available', () => {
        field.mandatory = 'if_available';
        expect(field.isRequired).toBe(true);
      });

      test('field is not required', () => {
        field.mandatory = 'no';
        expect(field.isRequired).toBe(false);
      });
    });

    describe('isDisabled', () => {
      test('field is disabled', () => {
        field.allowUserInput = false;
        expect(field.isDisabled).toBe(true);
      });

      test('field is not disabled', () => {
        field.allowUserInput = true;
        expect(field.isDisabled).toBe(false);
      });
    });

    describe('isEmpty', () => {
      test('field is empty', () => {
        expect(field.isEmpty).toBe(true);
      });

      test('field is not empty', () => {
        field.value = '123';
        expect(field.isEmpty).toBe(false);
      });
    });

    describe('isDirty', () => {
      test('field is dirty', () => {
        field.value = '123456788';
        expect(field.isDirty).toBe(true);
      });

      test('field is not dirty', () => {
        expect(field.isDirty).toBe(false);
      });
    });

    describe('replaceWithVariant', () => {
      test('field replaces with variant successfully using FormBuilder', () => {
        // Create a form with multiple SSN credentials (variants)
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              uuid: 'main-ssn-id',
              type: 'ssn',
              value: { ssn: '123456789' },
            }),
            makeCredential({
              uuid: 'variant-1-id',
              type: 'ssn',
              value: { ssn: '987654321' },
            }),
            makeCredential({
              uuid: 'variant-2-id',
              type: 'ssn',
              value: { ssn: '555444333' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
              allowUserInput: true,
              mandatory: 'yes',
              description: 'SSN Field',
            }),
          ],
        );

        const ssnField = form.fields.ssn;

        // Verify the field has variants
        expect(ssnField.hasVariants).toBe(true);
        expect(ssnField.variants).toHaveLength(3);

        // Store original variants for comparison
        const originalVariants = ssnField.variants;

        // Replace with variant-1-id
        ssnField.replaceWithVariant('variant-1-id');

        // Verify the field was replaced with variant properties
        expect(ssnField.id).toBe('variant-1-id');
        expect(ssnField.value).toBe('987654321');

        // Verify variants are preserved
        expect(ssnField.variants).toBe(originalVariants);
        expect(ssnField.hasVariants).toBe(true);

        // Verify we can switch to another variant
        ssnField.replaceWithVariant('variant-2-id');
        expect(ssnField.id).toBe('variant-2-id');
        expect(ssnField.value).toBe('555444333');
      });

      test('field handles non-existent variant ID gracefully', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              uuid: 'main-ssn-id',
              type: 'ssn',
              value: { ssn: '123456789' },
            }),
            makeCredential({
              uuid: 'variant-1-id',
              type: 'ssn',
              value: { ssn: '987654321' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
              allowUserInput: true,
              mandatory: 'yes',
              description: 'SSN Field',
            }),
          ],
        );

        const ssnField = form.fields.ssn;

        // Store original values
        const originalId = ssnField.id;
        const originalValue = ssnField.value;
        const originalAllowUserInput = ssnField.allowUserInput;
        const originalMandatory = ssnField.mandatory;
        const originalDescription = ssnField.description;

        // Try to replace with non-existent variant
        ssnField.replaceWithVariant('non-existent-id');

        // Verify field remains unchanged
        expect(ssnField.id).toBe(originalId);
        expect(ssnField.value).toBe(originalValue);
        expect(ssnField.allowUserInput).toBe(originalAllowUserInput);
        expect(ssnField.mandatory).toBe(originalMandatory);
        expect(ssnField.description).toBe(originalDescription);
      });

      test('field handles no variants gracefully', () => {
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              uuid: 'single-ssn-id',
              type: 'ssn',
              value: { ssn: '123456789' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'SsnCredential',
              allowUserInput: true,
              mandatory: 'yes',
              description: 'SSN Field',
            }),
          ],
        );

        const ssnField = form.fields.ssn;

        // Verify no variants
        expect(ssnField.hasVariants).toBe(false);

        // Store original values
        const originalId = ssnField.id;
        const originalValue = ssnField.value;
        const originalAllowUserInput = ssnField.allowUserInput;
        const originalMandatory = ssnField.mandatory;
        const originalDescription = ssnField.description;

        // Try to replace with variant when none exist
        ssnField.replaceWithVariant('some-id');

        // Verify field remains unchanged
        expect(ssnField.id).toBe(originalId);
        expect(ssnField.value).toBe(originalValue);
        expect(ssnField.allowUserInput).toBe(originalAllowUserInput);
        expect(ssnField.mandatory).toBe(originalMandatory);
        expect(ssnField.description).toBe(originalDescription);
      });

      test('field properly clones object values when replacing with variant', () => {
        // Create form with multiple fullName credentials (variants)
        const form = new FormBuilder().createFromCredentialAndRequests(
          [
            makeCredential({
              uuid: 'main-name-id',
              type: 'fullName',
              value: { firstName: 'John', lastName: 'Doe' },
            }),
            makeCredential({
              uuid: 'variant-name-id',
              type: 'fullName',
              value: { firstName: 'Jane', lastName: 'Smith' },
            }),
          ],
          [
            makeCredentialRequest({
              type: 'FullNameCredential',
              allowUserInput: true,
              mandatory: 'yes',
              description: 'Full Name',
              children: [
                makeCredentialRequest({
                  type: 'FirstNameCredential',
                  mandatory: 'yes',
                  allowUserInput: true,
                }),
                makeCredentialRequest({
                  type: 'LastNameCredential',
                  mandatory: 'yes',
                  allowUserInput: true,
                }),
              ],
            }),
          ],
        );

        const nameField = form.fields.fullName;

        // Verify field has variants
        expect(nameField.hasVariants).toBe(true);

        // Get reference to variant's original value
        const variant = nameField.variants?.find(
          (v) => v.id === 'variant-name-id',
        );
        expect(variant).toBeDefined();
        if (!variant) throw new Error('Variant not found');
        const variantOriginalValue = variant.value;

        // Replace with variant
        nameField.replaceWithVariant('variant-name-id');

        // Verify the value was copied, not referenced
        expect(nameField.value).toEqual({
          firstName: 'Jane',
          lastName: 'Smith',
        });
        expect(nameField.value).not.toBe(variantOriginalValue); // Different object references

        // Modify the main field's value and ensure variant's value is unchanged
        (nameField.value as any).firstName = 'Modified';
        expect((variantOriginalValue as any).firstName).toBe('Jane'); // Variant unchanged
      });
    });
  });
});
