import React, { useEffect, useState, useRef, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Portal, Stack } from '@mui/material';

import { type CredentialRequest } from '../../../components/form/NewOneClickForm/types';
import {
  type FormContextValue,
  type Form,
  NewOneClickForm,
  toCreatePatchCredentials,
} from '../../../components/form/NewOneClickForm';

const Debugger = ({ form }: { form: FormContextValue }) => {
  const [key, setKey] = useState(0);
  console.log({ form });

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
        <p>Empty: {form.state.form.isEmpty ? '✅' : '❌'}</p>
        <p>Dirty: {form.state.form.isDirty ? '✅' : '❌'}</p>
        <p>Disabled: {form.state.form.isDisabled ? '✅' : '❌'}</p>
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
                      <div>
                        <strong>isDisabled:</strong>{' '}
                        {field.isDisabled ? '✅' : '❌'}
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
          form.state.form.isEmpty ||
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
    console.log('Form to create/patch:', toCreatePatchCredentials(form));
    console.log('Form values:', form.values);

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
              // editMode: {
              //   hide: true,
              // },
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
              oneClickHealthProviderPayers: async (params) => {
                const allProviders = [
                  {
                    verifiedId: 'V9980890',
                    name: 'Aetna',
                    logoUrl:
                      'https://renatozupo.com.br/storage/unnamed-768x768.jpg',
                  },
                  {
                    verifiedId: 'V989089',
                    name: 'Anthem Blue Cross Blue Shield',
                    logoUrl:
                      'http://s3.localhost.localstack.cloud:4566/1-click/health/payers/890dabde-a4de-49fa-8f37-5093702a54c6.png',
                  },
                  {
                    verifiedId: 'V4352321',
                    name: 'Blue Cross Blue Shield',
                  },
                  { verifiedId: 'V9483759', name: 'Cigna' },
                  { verifiedId: 'V57459834', name: 'Humana' },
                  { verifiedId: 'V32567324', name: 'Kaiser Permanente' },
                  { verifiedId: 'V58943751', name: 'Medicaid' },
                  { verifiedId: 'V098765', name: 'Medicare' },
                  { verifiedId: 'V09876543', name: 'UnitedHealthcare' },
                  { verifiedId: 'V567898765', name: 'WellCare' },
                ];

                await new Promise((resolve) => setTimeout(resolve, 500));

                let filtered = allProviders;
                if (params?.search) {
                  const search = params.search.toLowerCase();
                  filtered = allProviders.filter((p) =>
                    p.name.toLowerCase().includes(search),
                  );
                }

                const skip = params?.skip ?? 0;
                const limit = params?.limit ?? 20;
                return filtered.slice(skip, skip + limit);
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
    uuid: 'phone-uuid',
    type: 'phone',
    value: {
      phone: '+12125550010',
    },
  },
  {
    uuid: '174714b4-b2d3-4369-a44d-b5f940d935eb',
    type: 'fullName',
    value: {
      firstName: 'Richard',
      lastName: 'Hendricks',
    },
  },
  {
    uuid: '99fb267d-c1d0-4b12-a296-5533317dc5c2',
    type: 'ssn',
    value: {
      ssn: '000456789',
    },
  },
  {
    uuid: 'a1b2c3d4-e5f6-7890-1234-567890abcde1',
    type: 'address',
    value: {
      line1: '123 Main Street',
      line2: 'Apt 1A',
      city: 'New York',
      state: 'NY',
      country: 'US',
      zipCode: '12345',
    },
  },
  {
    uuid: 'a1b2c3d4-e5f6-7890-1234-567890abcde2',
    type: 'address',
    value: {
      line1: '123 Main Street',
      line2: 'Apt 1A',
      city: 'California',
      state: 'CA',
      country: 'US',
      zipCode: '10001',
    },
  },
  {
    uuid: 'sex-id-1234',
    type: 'sex',
    value: {
      sex: 'Male',
    },
  },
  {
    uuid: 'dob-id-1234',
    type: 'birthDate',
    value: {
      birthDate: '617976000000',
    },
  },
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
  {
    uuid: 'drivers-license-id-1236',
    type: 'driversLicense',
    value: {
      documentNumber: '123456781',
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
  {
    uuid: 'health-insurance-id-1234',
    type: 'healthInsurance',
    value: {
      id: 174,
      memberId: 'AC****02',
      payer: {
        verifiedId: 'V123123',
        name: 'Aviato Health Insurance Of California',
        logoUrl:
          'https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2022/02/14120224/biscoito-recheado-classic-nestle-140g-eb8.png',
      },
    },
  },
  {
    uuid: 'health-insurance-id-1235',
    type: 'healthInsurance',
    value: {
      id: 176,
      memberId: 'AC****03',
      payer: {
        verifiedId: 'V123124',
        name: 'Blue Shield of California',
        logoUrl:
          'https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2022/02/14120224/biscoito-recheado-classic-nestle-140g-eb8.png',
      },
    },
  },
];

const mockCredentialRequests = [
  {
    allowUserInput: true,
    mandatory: 'no',
    multi: false,
    type: 'FullNameCredential',
    children: [
      // {
      //   type: 'MiddleNameCredential',
      //   mandatory: 'no',
      //   description: 'Your middle name',
      //   // allowUserInput: true,
      // },
      {
        type: 'LastNameCredential',
        mandatory: 'no',
        description: 'Your last name',
        // allowUserInput: true,
      },
      {
        type: 'FirstNameCredential',
        mandatory: 'no',
        description: 'Your first name',
        // allowUserInput: true,
      },
    ],
  },
  {
    allowUserInput: true,
    mandatory: 'no',
    type: 'PhoneCredential',
  },
  // 'AddressCredential',
  // {
  //   allowUserInput: true,
  //   mandatory: 'yes',
  //   multi: false,
  //   type: 'AddressCredential',
  //   description: 'Your address information',
  // },
  {
    allowUserInput: true,
    mandatory: 'no',
    multi: false,
    type: 'AddressCredential',
    description: 'Your address information',
    children: [
      {
        type: 'Line1Credential',
        description: 'Street',
      },
      {
        type: 'Line2Credential',
        mandatory: 'no',
        description: 'Apt, Unit, etc.',
      },
      {
        type: 'CityCredential',
        description: 'City',
      },
      {
        type: 'StateCredential',
        description: 'State',
      },
      {
        type: 'CountryCredential',
        description: 'Country',
      },
      {
        mandatory: 'no',
        type: 'ZipCodeCredential',
        description: 'ZipCode',
      },
    ],
  },
  {
    allowUserInput: true,
    mandatory: 'no',
    multi: false,
    type: 'BirthDateCredential',
    description: 'MM/DD/YYYY',
  },
  {
    allowUserInput: true,
    mandatory: 'no',
    multi: false,
    type: 'SsnCredential',
    description: 'Your legal SSN',
  },
  {
    allowUserInput: false,
    mandatory: 'if_available',
    multi: false,
    type: 'SexCredential',
    description: 'Your birth sex',
  },
  // {
  //   allowUserInput: true,
  //   mandatory: 'no',
  //   multi: false,
  //   type: 'DriversLicenseCredential',
  //   description: 'We are required by law to ask for a government ID',
  // },
  {
    allowUserInput: true,
    mandatory: 'no',
    multi: false,
    type: 'DriversLicenseCredential',
    description: 'We are required by law to ask for a government ID',
    children: [
      {
        allowUserInput: true,
        mandatory: 'no',
        multi: false,
        type: 'DocumentNumberCredential',
        description: 'Your driver’s license number',
      },
      {
        allowUserInput: true,
        mandatory: 'no',
        multi: false,
        type: 'IssuanceStateCredential',
      },
      {
        allowUserInput: true,
        mandatory: 'no',
        multi: false,
        type: 'IssuanceDateCredential',
        description: 'MM/DD/YYYY',
      },
      {
        allowUserInput: true,
        mandatory: 'no',
        multi: false,
        type: 'ExpirationDateCredential',
        description: 'MM/DD/YYYY',
      },
      {
        allowUserInput: true,
        mandatory: 'no',
        multi: false,
        type: 'AddressCredential',
        description: 'The address on the license',
        children: [
          {
            type: 'Line1Credential',
            description: 'Street',
          },
          {
            type: 'Line2Credential',
            mandatory: 'no',
            description: 'Apt, Unit, etc.',
          },
          {
            type: 'CityCredential',
            description: 'City',
          },
          {
            type: 'StateCredential',
            description: 'State',
          },
          {
            type: 'CountryCredential',
            description: 'Country',
          },
        ],
      },
    ],
  },
  {
    allowUserInput: true,
    mandatory: 'if_available',
    type: 'HealthInsuranceCredential',
    description: 'Choose the right insurance plan',
  },
];

const meta: Meta<typeof CredentialForm> = {
  title: 'Components/form/NewOneClickForm',
  component: CredentialForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
