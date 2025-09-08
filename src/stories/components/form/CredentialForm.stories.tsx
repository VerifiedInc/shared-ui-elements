import React, { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { type CredentialRequest } from '../../../components/form/NewOneClickForm/core/form/types';
import { FormBuilder } from '../../../components/form/NewOneClickForm/core/form/formBuilder';
import { type Form } from '../../../components/form/NewOneClickForm/core/form/form';

import {
  FormProvider,
  useForm,
  useFieldInput,
} from '../../../components/form/NewOneClickForm/react/core';

interface FormFieldProps {
  fieldKey: string;
}

const FormField: React.FC<FormFieldProps> = ({ fieldKey }) => {
  const field = useFieldInput({ key: fieldKey });

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={fieldKey}
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 'bold',
        }}
      >
        {field.field?.schema.characteristics.label}
        {field.field?.isRequired && <span style={{ color: 'red' }}> *</span>}
      </label>
      <input
        {...field.inputProps}
        placeholder={
          field.field?.schema?.characteristics &&
          'placeholder' in field.field.schema.characteristics
            ? field.field.schema.characteristics.placeholder
            : ''
        }
        style={{
          width: '100%',
          padding: '0.5rem',
          border: `1px solid ${field.isValid ? '#ccc' : '#ff0000'}`,
          borderRadius: '4px',
          fontSize: '1rem',
        }}
        disabled={!field.field?.allowUserInput}
        readOnly={!field.field?.allowUserInput}
      />
      {!field.error && field.field?.description && (
        <div
          style={{
            color: '#666',
            fontSize: '0.875rem',
            marginTop: '0.25rem',
          }}
        >
          {field.field?.description}
        </div>
      )}
      {field.error && field.isTouched && (
        <div
          style={{
            color: '#ff0000',
            fontSize: '0.875rem',
            marginTop: '0.25rem',
          }}
        >
          {field.error}
        </div>
      )}
      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
        Valid: {field.isValid ? '✓' : '✗'} | Dirty: {field.isDirty ? '✓' : '✗'}{' '}
        | Touched: {field.isTouched ? '✓' : '✗'}
      </div>
    </div>
  );
};

const CredentialFormContent: React.FC = () => {
  const { state, submitForm, resetForm, validateForm } = useForm();

  // Logging for debug purposes
  console.log(state.form.fields);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleReset = () => {
    resetForm();
  };

  const isFormValid = validateForm();
  const isFormDirty =
    Object.values(state.form?.fields ?? {}).some((field) => field.isDirty) ??
    false;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        gap: '2rem',
      }}
    >
      <div style={{ width: 396 }}>
        <h2 style={{ marginBottom: '2rem' }}>Credential Form</h2>

        <form onSubmit={handleSubmit}>
          {Object.entries(state.form?.fields ?? {}).map(([fieldKey, field]) => {
            // Handle composite fields with children
            if (
              field.schema.characteristics.inputType === 'composite' &&
              field.children
            ) {
              return (
                <div key={fieldKey} style={{ marginBottom: '1.5rem' }}>
                  <h3
                    style={{
                      marginBottom: '1rem',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                    }}
                  >
                    {field.schema.characteristics.label}
                  </h3>
                  <div
                    style={{
                      paddingLeft: '1rem',
                      borderLeft: '2px solid #e9ecef',
                    }}
                  >
                    {Object.entries(field.children).map(([childKey]) => (
                      <FormField
                        key={childKey}
                        fieldKey={`${fieldKey}.${childKey}`}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            // Handle regular fields
            return <FormField key={fieldKey} fieldKey={fieldKey} />;
          })}

          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <button
              type='submit'
              disabled={!isFormValid || state.isSubmitting}
              style={{
                backgroundColor: isFormValid ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                marginRight: '1rem',
              }}
            >
              {state.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            <button
              type='button'
              onClick={handleReset}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div
        style={{
          width: 300,
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
        }}
      >
        <h3>Form State</h3>
        <p>Valid: {isFormValid ? '✓' : '✗'}</p>
        <p>Dirty: {isFormDirty ? '✓' : '✗'}</p>
        <p>Field Count: {Object.keys(state.form?.fields ?? {}).length}</p>
        <p>Submitting: {state.isSubmitting ? '✓' : '✗'}</p>

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            Field Details
          </summary>
          <pre
            style={{
              fontSize: '0.75rem',
              marginTop: '0.5rem',
              overflow: 'hidden',
              whiteSpace: 'pre-wrap',
            }}
          >
            {JSON.stringify(
              Object.entries(state.form?.fields ?? {}).reduce(
                (acc, [fieldKey, field]) => {
                  // Recursive function to extract field data including children
                  const extractFieldData = (f: any): any => {
                    const fieldData: any = {
                      value: f.value,
                      isValid: f.isValid,
                      isDirty: f.isDirty,
                      errors: f.errors,
                    };

                    // If field has children, recursively extract their data
                    if (f.children && Object.keys(f.children).length > 0) {
                      fieldData.children = Object.entries(f.children).reduce(
                        (childAcc, [childKey, childField]) => {
                          childAcc[childKey] = extractFieldData(childField);
                          return childAcc;
                        },
                        {} as Record<string, any>,
                      );
                    }

                    return fieldData;
                  };

                  acc[fieldKey] = extractFieldData(field);
                  return acc;
                },
                {} as Record<string, any>,
              ),
              null,
              2,
            )}
          </pre>
        </details>
      </div>
    </div>
  );
};

const CredentialForm: React.FC = () => {
  const form = useMemo(() => {
    const formBuilder = new FormBuilder();
    return formBuilder.createFromCredentialAndRequests(
      mockCredentials,
      mockCredentialRequests as CredentialRequest[],
    );
  }, []);

  const handleSubmit = async (form: Form) => {
    console.log('Form submitted with form instance:', form);
    console.log('Form validation state:', form.isValid);
    console.log('Form all fields:', form.fields);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <FormProvider form={form} onSubmit={handleSubmit}>
      <CredentialFormContent />
    </FormProvider>
  );
};

// Mock credentials and requests data
const mockCredentials = [
  {
    id: '174714b4-b2d3-4369-a44d-b5f940d935ed',
    uuid: 'b59becd7-5269-4d6d-a234-179613923331',
    createdAt: '1738698702792',
    updatedAt: '1738698702792',
    type: 'FullNameCredential',
    issuanceDate: '1738698702792',
    expirationDate: null,
    issuerUuid: 'e68875fa-1e38-4ffe-8e21-e72d1b16685c',
    data: [
      {
        id: '9da2dad4-714a-4381-bd1f-f6294b1301dd',
        uuid: 'e26d3a0d-7f0c-49fb-a9b4-a9c9e98db169',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'FirstNameCredential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'cd4f73f3-b110-4d68-9ba6-4f9e114c8933',
        data: {
          firstName: 'Richard',
        },
      },
    ],
  },
  {
    id: '174714b4-b2d3-4369-a44d-b5f940d935eb',
    uuid: 'b59becd7-5269-4d6d-a234-179613923339',
    createdAt: '1738698702792',
    updatedAt: '1738698702792',
    type: 'FullNameCredential',
    issuanceDate: '1738698702792',
    expirationDate: null,
    issuerUuid: 'e68875fa-1e38-4ffe-8e21-e72d1b16685c',
    data: [
      {
        id: '9da2dad4-714a-4381-bd1f-f6294b1301dd',
        uuid: 'e26d3a0d-7f0c-49fb-a9b4-a9c9e98db169',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'FirstNameCredential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'cd4f73f3-b110-4d68-9ba6-4f9e114c8933',
        data: {
          firstName: 'Richard',
        },
      },
      {
        id: 'beb2685a-1e12-4c15-9984-0cbab71b9b94',
        uuid: '4c79402a-195c-41b8-8b21-690b193387a5',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'LastNameCredential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'c6fbc6bc-162d-4903-96e4-f0b7a711a516',
        data: {
          lastName: 'Hendricks',
        },
      },
    ],
  },
  {
    id: '99fb267d-c1d0-4b12-a296-5533317dc5c2',
    uuid: '10a9e718-e20a-4179-8774-54a25f73eab6',
    createdAt: '1738698702792',
    updatedAt: '1738698702792',
    type: 'SsnCredential',
    issuanceDate: '1738698702792',
    expirationDate: null,
    issuerUuid: '2f842399-4220-434d-920d-8b41319cf5db',
    data: {
      ssn: '•••-••-6788',
    },
  },
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    uuid: '12345678-90ab-cdef-1234-567890abcdef',
    createdAt: '1738698702792',
    updatedAt: '1738698702792',
    type: 'AddressCredential',
    issuanceDate: '1738698702792',
    expirationDate: null,
    issuerUuid: 'f1e2d3c4-b5a6-9788-1234-567890abcdef',
    data: [
      {
        id: 'line1-id-1234',
        uuid: 'line1-uuid-5678',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'Line1Credential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'issuer-line1-uuid',
        data: {
          line1: '123 Main Street',
        },
      },
      // {
      //   id: 'line2-id-1234',
      //   uuid: 'line2-uuid-5678',
      //   createdAt: '1738698702792',
      //   updatedAt: '1738698702792',
      //   type: 'Line2Credential',
      //   issuanceDate: '1738698702792',
      //   expirationDate: null,
      //   issuerUuid: 'issuer-line2-uuid',
      //   data: {
      //     line2: 'Apt 4B',
      //   },
      // },
      {
        id: 'city-id-1234',
        uuid: 'city-uuid-5678',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'CityCredential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'issuer-city-uuid',
        data: {
          city: 'New York',
        },
      },
      {
        id: 'state-id-1234',
        uuid: 'state-uuid-5678',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'StateCredential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'issuer-state-uuid',
        data: {
          state: 'NY',
        },
      },
      {
        id: 'country-id-1234',
        uuid: 'country-uuid-5678',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'CountryCredential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'issuer-country-uuid',
        data: {
          country: 'US',
        },
      },
      {
        id: 'zipcode-id-1234',
        uuid: 'zipcode-uuid-5678',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'ZipCodeCredential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'issuer-zipcode-uuid',
        data: {
          zipCode: '10001',
        },
      },
    ],
  },
];

const mockCredentialRequests = [
  // 'FullNameCredential',
  {
    allowUserInput: true,
    mandatory: 'if_available',
    multi: false,
    type: 'FullNameCredential',
    children: [
      {
        type: 'LastNameCredential',
        mandatory: 'yes',
        description: 'Your last name',
        // allowUserInput: false,
      },
      {
        type: 'FirstNameCredential',
        mandatory: 'no',
        description: 'Your first name',
        // allowUserInput: false,
      },
      // { type: 'MiddleNameCredential', mandatory: 'no', allowUserInput: false },
    ],
  },
  {
    allowUserInput: true,
    mandatory: 'no',
    multi: false,
    type: 'SsnCredential',
    description: 'Last 4 digits',
  },
  {
    allowUserInput: true,
    mandatory: 'if_available',
    multi: false,
    type: 'AddressCredential',
    description: 'Your address information',
    children: [
      {
        type: 'Line1Credential',
        mandatory: 'yes',
        description: 'Address line 1',
      },
      {
        type: 'Line2Credential',
        mandatory: 'no',
        description: 'Address line 2 (optional)',
      },
      {
        type: 'CityCredential',
        mandatory: 'yes',
        description: 'City',
      },
      {
        type: 'StateCredential',
        mandatory: 'yes',
        description: 'State',
      },
      {
        type: 'CountryCredential',
        mandatory: 'yes',
        description: 'Country',
      },
      {
        type: 'ZipCodeCredential',
        mandatory: 'yes',
        description: 'Zip code',
      },
    ],
  },
];

const meta: Meta<typeof CredentialForm> = {
  title: 'Components/Form/CredentialForm',
  component: CredentialForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
