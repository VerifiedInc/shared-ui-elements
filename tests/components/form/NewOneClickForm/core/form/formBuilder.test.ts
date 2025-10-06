import { describe, test, expect } from 'vitest';
import { FormBuilder } from '../../../../../../src/components/form/NewOneClickForm/core/form/formBuilder';
import type {
  CredentialRequest,
  Credential,
} from '../../../../../../src/components/form/NewOneClickForm/types';

describe('FormBuilder', () => {
  const formBuilder = new FormBuilder();

  describe('DriversLicenseCredential expansion', () => {
    test('should expand DriversLicenseCredential object without children', () => {
      const credentialRequests: CredentialRequest[] = [
        {
          allowUserInput: true,
          mandatory: 'no',
          multi: false,
          type: 'DriversLicenseCredential',
          description: 'We are required by law to ask for a government ID',
        },
      ];

      const credentials: Credential[] = [
        {
          uuid: 'drivers-license-id-1234',
          type: 'driversLicense',
          value: {
            documentNumber: '123456789',
            issuanceState: 'NY',
            issuanceDate: '1754049600000',
            expirationDate: '1765800000000',
            address: {
              line1: '123 Main Street',
              line2: 'Apt 1A',
              city: 'California',
              state: 'CA',
              country: 'US',
              zipCode: '10001',
            },
          },
        },
      ];

      const form = formBuilder.createFromCredentialAndRequests(
        credentials,
        credentialRequests,
      );

      // The form should have a driversLicense field
      expect(form.fields.driversLicense).toBeDefined();

      // The driversLicense field should have children
      expect(form.fields.driversLicense.children).toBeDefined();
      expect(form.fields.driversLicense.children).not.toBeNull();

      // Check that all expected children are present
      const children = form.fields.driversLicense.children;
      expect(children?.documentNumber).toBeDefined();
      expect(children?.issuanceState).toBeDefined();
      expect(children?.issuanceDate).toBeDefined();
      expect(children?.expirationDate).toBeDefined();
      expect(children?.address).toBeDefined();

      // Check that the address child also has its children
      expect(children?.address.children).toBeDefined();
      expect(children?.address.children?.line1).toBeDefined();
      expect(children?.address.children?.line2).toBeDefined();
      expect(children?.address.children?.city).toBeDefined();
      expect(children?.address.children?.state).toBeDefined();
      expect(children?.address.children?.country).toBeDefined();
      expect(children?.address.children?.zipCode).toBeDefined();
    });

    test('should not expand DriversLicenseCredential object when children are already provided', () => {
      const credentialRequests: CredentialRequest[] = [
        {
          allowUserInput: true,
          mandatory: 'no',
          multi: false,
          type: 'DriversLicenseCredential',
          description: 'We are required by law to ask for a government ID',
          children: [
            {
              type: 'DocumentNumberCredential',
              mandatory: 'no',
              description: "Your driver's license number",
            },
          ],
        },
      ];

      const credentials: Credential[] = [];

      const form = formBuilder.createFromCredentialAndRequests(
        credentials,
        credentialRequests,
      );

      // The form should have a driversLicense field
      expect(form.fields.driversLicense).toBeDefined();

      // The driversLicense field should have children
      expect(form.fields.driversLicense.children).toBeDefined();

      // But it should only have the documentNumber child (not all default children)
      const children = form.fields.driversLicense.children;
      expect(children?.documentNumber).toBeDefined();
      expect(children?.issuanceState).toBeUndefined();
      expect(children?.issuanceDate).toBeUndefined();
      expect(children?.expirationDate).toBeUndefined();
      expect(children?.address).toBeUndefined();
    });

    test('should expand string format DriversLicenseCredential', () => {
      const credentialRequests: CredentialRequest[] = [
        'DriversLicenseCredential',
      ];
      const credentials: Credential[] = [];

      const form = formBuilder.createFromCredentialAndRequests(
        credentials,
        credentialRequests,
      );

      // The form should have a driversLicense field with all children
      expect(form.fields.driversLicense).toBeDefined();
      expect(form.fields.driversLicense.children).toBeDefined();

      const children = form.fields.driversLicense.children;
      expect(children?.documentNumber).toBeDefined();
      expect(children?.issuanceState).toBeDefined();
      expect(children?.issuanceDate).toBeDefined();
      expect(children?.expirationDate).toBeDefined();
      expect(children?.address).toBeDefined();
    });
  });

  describe('Other composite fields expansion', () => {
    test('should expand FullNameCredential object without children', () => {
      const credentialRequests: CredentialRequest[] = [
        {
          allowUserInput: true,
          mandatory: 'no',
          multi: false,
          type: 'FullNameCredential',
        },
      ];

      const credentials: Credential[] = [];

      const form = formBuilder.createFromCredentialAndRequests(
        credentials,
        credentialRequests,
      );

      // The form should have a fullName field with children
      expect(form.fields.fullName).toBeDefined();
      expect(form.fields.fullName.children).toBeDefined();

      const children = form.fields.fullName.children;
      expect(children?.firstName).toBeDefined();
      expect(children?.lastName).toBeDefined();
      expect(children?.middleName).toBeDefined();
    });

    test('should expand AddressCredential object without children', () => {
      const credentialRequests: CredentialRequest[] = [
        {
          allowUserInput: true,
          mandatory: 'no',
          multi: false,
          type: 'AddressCredential',
        },
      ];

      const credentials: Credential[] = [];

      const form = formBuilder.createFromCredentialAndRequests(
        credentials,
        credentialRequests,
      );

      // The form should have an address field with children
      expect(form.fields.address).toBeDefined();
      expect(form.fields.address.children).toBeDefined();

      const children = form.fields.address.children;
      expect(children?.line1).toBeDefined();
      expect(children?.line2).toBeDefined();
      expect(children?.city).toBeDefined();
      expect(children?.state).toBeDefined();
      expect(children?.country).toBeDefined();
      expect(children?.zipCode).toBeDefined();
    });
  });

  describe('Non-composite fields', () => {
    test('should not expand non-composite fields', () => {
      const credentialRequests: CredentialRequest[] = [
        {
          allowUserInput: true,
          mandatory: 'no',
          multi: false,
          type: 'SsnCredential',
        },
      ];

      const credentials: Credential[] = [];

      const form = formBuilder.createFromCredentialAndRequests(
        credentials,
        credentialRequests,
      );

      // The form should have an ssn field without children
      expect(form.fields.ssn).toBeDefined();
      expect(form.fields.ssn.children).toBeUndefined();
    });
  });
});
