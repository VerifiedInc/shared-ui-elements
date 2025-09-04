import React, { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FormProvider,
  useForm,
} from '../../../components/form/NewOneClickForm/react/form.context';
import { useFieldInput } from '../../../components/form/NewOneClickForm/react/field.hook';
import {
  FormBuilder,
  Form,
} from '../../../components/form/NewOneClickForm/core/form';

interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  required,
}) => {
  const field = useFieldInput({
    id,
  });

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 'bold',
        }}
      >
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <input
        {...field.inputProps}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: `1px solid ${field.isValid ? '#ccc' : '#ff0000'}`,
          borderRadius: '4px',
          fontSize: '1rem',
        }}
      />
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleReset = () => {
    resetForm();
  };

  const isFormValid = validateForm();
  const isFormDirty =
    state.form?.fields.some((field) => field.isDirty) ?? false;

  console.log(state.form?.fields);
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Credential Form</h2>

      <form onSubmit={handleSubmit}>
        {state.form?.fields.map((field) => {
          // Handle composite fields with children
          if (
            field.schema.characteristics.inputType === 'composite' &&
            field.children
          ) {
            return (
              <div key={field.id} style={{ marginBottom: '1.5rem' }}>
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
                  {Object.entries(field.children).map(
                    ([childKey, childField]) => (
                      <FormField
                        key={childField.id}
                        id={childField.id}
                        label={childField.schema.characteristics.label}
                        placeholder={`Enter your ${childField.schema.characteristics.label.toLowerCase()}`}
                        required={true}
                      />
                    ),
                  )}
                </div>
              </div>
            );
          }

          // Handle regular fields
          return (
            <FormField
              key={field.id}
              id={field.id}
              label={field.schema.characteristics.label}
              placeholder={`Enter your ${field.schema.characteristics.label.toLowerCase()}`}
              required={true}
            />
          );
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

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
        }}
      >
        <h3>Form State</h3>
        <p>Valid: {isFormValid ? '✓' : '✗'}</p>
        <p>Dirty: {isFormDirty ? '✓' : '✗'}</p>
        <p>Field Count: {state.form?.fields.length ?? 0}</p>
        <p>Submitting: {state.isSubmitting ? '✓' : '✗'}</p>

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            Field Details
          </summary>
          <pre
            style={{
              fontSize: '0.75rem',
              marginTop: '0.5rem',
              overflow: 'auto',
            }}
          >
            {JSON.stringify(
              state.form?.fields.reduce(
                (acc, field) => {
                  acc[field.id] = {
                    value: field.value,
                    isValid: field.isValid,
                    isDirty: field.isDirty,
                    errors: field.errors,
                  };
                  return acc;
                },
                {} as Record<string, any>,
              ) ?? {},
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
      mockCredentialRequests,
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
];

const mockCredentialRequests = [
  {
    allowUserInput: true,
    mandatory: 'if_available',
    multi: false,
    type: 'FullNameCredential',
    children: [
      {
        type: 'FirstNameCredential',
        mandatory: 'yes',
        description: 'Your first name',
        // allowUserInput: false,
      },
      // { type: 'MiddleNameCredential', mandatory: 'no', allowUserInput: false },
      {
        type: 'LastNameCredential',
        mandatory: 'no',
        description: 'Your last name',
        // allowUserInput: false,
      },
    ],
  },
  {
    allowUserInput: true,
    mandatory: 'no',
    multi: false,
    type: 'SsnCredential',
    description: 'Last 4 digits',
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
