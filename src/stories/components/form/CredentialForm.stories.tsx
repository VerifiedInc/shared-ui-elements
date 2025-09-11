import React, { useEffect, useState, useRef, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Portal, Stack } from '@mui/material';

import { type CredentialRequest } from '../../../components/form/NewOneClickForm/types';
import { type Form } from '../../../components/form/NewOneClickForm/core/form/form';
import {
  FormContextValue,
  NewOneClickForm,
} from '../../../components/form/NewOneClickForm/react';

const Debugger = ({ form }: { form: FormContextValue }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [form]);

  return (
    <Portal
      container={document.querySelector(
        'div[data-testid="one-click-form-state-details"]',
      )}
    >
      <div
        style={{
          width: 300,
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
        }}
      >
        <h2>Form Debugger</h2>
        <h3>Form State</h3>
        <p>Field Count: {Object.keys(form.state.form?.fields ?? {}).length}</p>
        <p>Valid: {form.state.form.isValid ? '✅' : '❌'}</p>
        <p>Dirty: {form.state.form.isDirty ? '✅' : '❌'}</p>
        <p>Submitting: {form.state.isSubmitting ? '✅' : '❌'}</p>
        <p>Submit Success: {form.state.isSubmitSuccess ? '✅' : '❌'}</p>

        <h3>Field State</h3>
        <Stack
          sx={{
            mt: 1,
            '& *': {
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            },
          }}
        >
          {Object.entries(form.state.form?.fields ?? {}).map(
            ([fieldKey, field]) => {
              // Recursive function to render field data including children
              const renderFieldData = (
                field: any,
                depth = 0,
              ): React.ReactNode => {
                const indent = '  '.repeat(depth);
                const hasChildren =
                  field.children && Object.keys(field.children).length > 0;

                return (
                  <div
                    key={`field-${depth}`}
                    style={{ marginLeft: `${depth * 1}rem` }}
                  >
                    <div
                      style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}
                    >
                      <div>
                        <strong>defaultValue:</strong>{' '}
                        {JSON.stringify(field.defaultValue)}
                      </div>
                      <div>
                        <strong>value:</strong> {JSON.stringify(field.value)}
                      </div>
                      <div>
                        <strong>isValid:</strong> {field.isValid ? '✅' : '❌'}
                      </div>
                      <div>
                        <strong>isDirty:</strong> {field.isDirty ? '✅' : '❌'}
                      </div>
                      <div>
                        <strong>isRequired:</strong>{' '}
                        {field.isRequired ? '✅' : '❌'}
                      </div>
                      {field.errors && field.errors.length > 0 && (
                        <div>
                          <strong>errors:</strong>{' '}
                          {JSON.stringify(field.errors)}
                        </div>
                      )}
                      {field.type && (
                        <div>
                          <strong>type:</strong> {field.type}
                        </div>
                      )}
                      {field.required !== undefined && (
                        <div>
                          <strong>required:</strong>{' '}
                          {field.required ? '✅' : '❌'}
                        </div>
                      )}
                      {field.disabled !== undefined && (
                        <div>
                          <strong>disabled:</strong>{' '}
                          {field.disabled ? '✅' : '❌'}
                        </div>
                      )}
                    </div>

                    {field.variants && (
                      <details style={{ marginTop: '0.5rem' }}>
                        <summary
                          style={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                          }}
                        >
                          Variants ({Object.keys(field.variants).length})
                        </summary>
                        <div style={{ marginTop: '0.5rem' }}>
                          {Object.entries(field.variants).map(
                            ([variantKey, variantField]) => (
                              <details
                                key={variantKey}
                                style={{ marginBottom: '0.5rem' }}
                              >
                                <summary
                                  style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                  }}
                                >
                                  {variantKey}
                                </summary>
                                <div style={{ marginTop: '0.5rem' }}>
                                  {renderFieldData(variantField, depth + 1)}
                                </div>
                              </details>
                            ),
                          )}
                        </div>
                      </details>
                    )}

                    {hasChildren && (
                      <details style={{ marginTop: '0.5rem' }}>
                        <summary
                          style={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                          }}
                        >
                          Children ({Object.keys(field.children).length})
                        </summary>
                        <div style={{ marginTop: '0.5rem' }}>
                          {Object.entries(field.children).map(
                            ([childKey, childField]) => (
                              <details
                                key={childKey}
                                style={{ marginBottom: '0.5rem' }}
                              >
                                <summary
                                  style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                  }}
                                >
                                  {childKey}
                                </summary>
                                <div style={{ marginTop: '0.5rem' }}>
                                  {renderFieldData(childField, depth + 1)}
                                </div>
                              </details>
                            ),
                          )}
                        </div>
                      </details>
                    )}
                  </div>
                );
              };

              const hasChildren =
                field.children && Object.keys(field.children).length > 0;

              return (
                <details key={fieldKey} style={{ marginBottom: '0.5rem' }}>
                  <summary
                    style={{
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                    }}
                  >
                    {fieldKey}{' '}
                    {hasChildren &&
                      `(${Object.keys(field.children ?? {}).length} children)`}
                  </summary>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      marginTop: '0.5rem',
                      backgroundColor: '#f5f5f5',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {renderFieldData(field)}
                  </div>
                </details>
              );
            },
          )}
        </Stack>
      </div>
    </Portal>
  );
};

const FormFooter = ({ form }: { form: FormContextValue }) => {
  return (
    <>
      <Button
        data-testid='one-click-form-submit-button'
        type='submit'
        variant='contained'
        fullWidth
        sx={{ mt: 2 }}
        disabled={
          !form.state.form.isValid ||
          form.state.isSubmitting ||
          form.state.isSubmitSuccess
        }
        color={form.state.isSubmitSuccess ? 'success' : 'primary'}
      >
        {form.state.isSubmitting
          ? 'Submitting...'
          : form.state.isSubmitSuccess
            ? 'Success!'
            : 'Submit'}
      </Button>
      <Debugger form={form} />
    </>
  );
};

const CredentialForm: React.FC = () => {
  const [stickyTop, setStickyTop] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialTopRef = useRef<number>(0);

  const handleSubmit = async (form: Form) => {
    console.log('Form submitted with form instance:', form);
    console.log('Form validation state:', form.isValid);
    console.log('Form all fields:', form.fields);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Effect to make the form sticky for better readability in Storybook
  useEffect(() => {
    // Add scroll listener to multiple possible containers
    const addScrollListeners = () => {
      const containers = [
        document.querySelector('#storybook-root'),
        document.querySelector('body'),
        document.documentElement,
        window,
      ];

      containers.forEach((container, index) => {
        if (container) {
          container.addEventListener('scroll', handleScrollEvent, {
            passive: true,
          });
        }
      });
    };

    const removeScrollListeners = () => {
      const containers = [
        document.querySelector('#storybook-root'),
        document.querySelector('body'),
        document.documentElement,
        window,
      ];

      containers.forEach((container) => {
        if (container) {
          container.removeEventListener('scroll', handleScrollEvent);
        }
      });
    };

    const handleScrollEvent = () => {
      if (!formRef.current || !containerRef.current) return;

      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // Store initial position on first render
      if (initialTopRef.current === 0) {
        const formRect = formRef.current.getBoundingClientRect();
        initialTopRef.current = formRect.top + scrollTop;
      }

      // Calculate how much we've scrolled past the initial form position
      const scrollPastInitial = scrollTop - initialTopRef.current;

      // When we've scrolled past the initial form position, make it sticky
      if (scrollPastInitial >= 0) {
        // The form should stick at the top of the viewport
        setStickyTop(scrollPastInitial);
      } else {
        // Reset to normal position
        setStickyTop(0);
      }
    };

    addScrollListeners();
    window.addEventListener('resize', handleScrollEvent, { passive: true });

    handleScrollEvent();

    return () => {
      removeScrollListeners();
      window.removeEventListener('resize', handleScrollEvent);
    };
  }, []);

  return (
    <Stack direction='row' width={680} flex={1} spacing={2} ref={containerRef}>
      <Stack
        ref={formRef}
        width={362}
        flex={1}
        pt={1}
        sx={{
          alignSelf: 'flex-start',
          position: 'relative',
          top: stickyTop,
          transition: 'top 0.1s ease-out',
        }}
      >
        <NewOneClickForm
          credentialRequests={mockCredentialRequests as CredentialRequest[]}
          credentials={mockCredentials}
          options={{
            features: {
              datePickerClickOutsideBoundaryElement: document.body,
            },
            servicePaths: {
              googlePlacesAutocompletePlaces: async (
                input: string,
                signal?: AbortSignal,
              ) => {
                const response = await fetch(
                  'http://localhost:3070/api/googleapis/places/AutocompletePlaces',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ input }),
                    signal,
                  },
                );

                if (!response.ok) {
                  throw new Error(
                    `AutocompletePlaces API error! status: ${response.status}`,
                  );
                }

                return response.json();
              },
              googlePlacesGetPlace: async (
                placeId: string,
                signal?: AbortSignal,
              ) => {
                const response = await fetch(
                  'http://localhost:3070/api/googleapis/places/GetPlace',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: placeId }),
                    signal,
                  },
                );

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
              },
            },
          }}
          onSubmit={handleSubmit}
          FooterComponent={FormFooter}
        />
      </Stack>
      <Stack width={300} data-testid='one-click-form-state-details' />
    </Stack>
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
      ssn: '000456789',
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
      {
        id: 'line2-id-1234',
        uuid: 'line2-uuid-5678',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'Line2Credential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'issuer-line2-uuid',
        data: {
          line2: 'Apt 4B',
        },
      },
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
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdej',
    uuid: '12345678-90ab-cdef-1234-567890abcdej',
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
      {
        id: 'line2-id-1234',
        uuid: 'line2-uuid-5678',
        createdAt: '1738698702792',
        updatedAt: '1738698702792',
        type: 'Line2Credential',
        issuanceDate: '1738698702792',
        expirationDate: null,
        issuerUuid: 'issuer-line2-uuid',
        data: {
          line2: 'Apt 1A',
        },
      },
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
          city: 'California',
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
          state: 'CA',
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
  {
    id: 'sex-id-1234',
    uuid: 'sex-uuid-5678',
    createdAt: '1738698702792',
    updatedAt: '1738698702792',
    type: 'SexCredential',
    issuanceDate: '1738698702792',
    expirationDate: null,
    issuerUuid: 'issuer-sex-uuid',
    data: {
      sex: 'Male',
    },
  },
  {
    id: 'dob-id-1234',
    uuid: 'dob-uuid-5678',
    createdAt: '1738698702792',
    updatedAt: '1738698702792',
    type: 'BirthDateCredential',
    issuanceDate: '1738698702792',
    expirationDate: null,
    issuerUuid: 'issuer-dob-uuid',
    data: {
      birthDate: '617976000000',
    },
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
        mandatory: 'yes',
        description: 'Your first name',
        // allowUserInput: false,
      },
      // { type: 'MiddleNameCredential', mandatory: 'yes', allowUserInput: false },
    ],
  },
  {
    allowUserInput: true,
    mandatory: 'no',
    multi: false,
    type: 'PhoneCredential',
  },
  // 'AddressCredential',
  {
    allowUserInput: true,
    mandatory: 'yes',
    multi: false,
    type: 'AddressCredential',
    description: 'Your address information',
    children: [
      {
        type: 'Line1Credential',
        mandatory: 'yes',
        description: 'Street',
      },
      {
        type: 'Line2Credential',
        mandatory: 'yes',
        description: 'Apt, Unit, etc.',
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
  {
    allowUserInput: true,
    mandatory: 'yes',
    multi: false,
    type: 'BirthDateCredential',
    description: 'MM/DD/YYYY',
  },
  {
    allowUserInput: true,
    mandatory: 'yes',
    multi: false,
    type: 'SsnCredential',
    description: 'Your legal SSN',
  },
  {
    allowUserInput: true,
    mandatory: 'yes',
    multi: false,
    type: 'SexCredential',
    description: 'Your birth sex',
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

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
