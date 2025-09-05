import React from 'react';
import { useForm } from '../react/form.context';

interface FullNameFieldProps {
  fieldPath: string;
  label?: string;
}

/**
 * Example composite field component that demonstrates declarative field management
 * using dot notation paths like 'fullName.firstName' and 'fullName.lastName'
 */
export const FullNameField: React.FC<FullNameFieldProps> = ({
  fieldPath,
  label = 'Full Name',
}) => {
  const { getField, updateFieldValue, setFieldTouched } = useForm();

  // Get the composite field and its children using dot notation
  const fullNameField = getField(fieldPath);
  const firstNameField = getField(`${fieldPath}.firstName`);
  const lastNameField = getField(`${fieldPath}.lastName`);

  const handleFirstNameChange = (value: string) => {
    // Declaratively set the value using dot notation
    updateFieldValue(`${fieldPath}.firstName`, value);
  };

  const handleLastNameChange = (value: string) => {
    // Declaratively set the value using dot notation
    updateFieldValue(`${fieldPath}.lastName`, value);
  };

  const handleFirstNameBlur = () => {
    setFieldTouched(`${fieldPath}.firstName`, true);
  };

  const handleLastNameBlur = () => {
    setFieldTouched(`${fieldPath}.lastName`, true);
  };

  if (!fullNameField) {
    return <div>Field not found: {fieldPath}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontWeight: 'bold' }}>{label}</label>

      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <input
            type='text'
            placeholder='First Name'
            value={firstNameField?.value || ''}
            onChange={(e) => handleFirstNameChange(e.target.value)}
            onBlur={handleFirstNameBlur}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              borderColor:
                firstNameField?.touched && !firstNameField?.isValid
                  ? 'red'
                  : '#ccc',
            }}
          />
          {firstNameField?.touched && firstNameField?.errors?.error && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {firstNameField.errors.error.message}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <input
            type='text'
            placeholder='Last Name'
            value={lastNameField?.value || ''}
            onChange={(e) => handleLastNameChange(e.target.value)}
            onBlur={handleLastNameBlur}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              borderColor:
                lastNameField?.touched && !lastNameField?.isValid
                  ? 'red'
                  : '#ccc',
            }}
          />
          {lastNameField?.touched && lastNameField?.errors?.error && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {lastNameField.errors.error.message}
            </div>
          )}
        </div>
      </div>

      {/* Display composite field validation errors */}
      {fullNameField.touched && fullNameField.errors?.error && (
        <div style={{ color: 'red', fontSize: '12px' }}>
          {fullNameField.errors.error.message}
        </div>
      )}
    </div>
  );
};

/**
 * Example usage of the composite field component
 */
export const CompositeFieldExample: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>Composite Field Example</h2>
      <p>
        This demonstrates how the enhanced form context enables declarative
        composite field management using dot notation paths.
      </p>

      {/* This component can now manage nested fields declaratively */}
      <FullNameField fieldPath='personalInfo' label='Personal Information' />

      <div style={{ marginTop: '20px' }}>
        <h3>Usage Pattern:</h3>
        <pre
          style={{ background: '#f5f5f5', padding: '10px', fontSize: '12px' }}
        >
          {`// Now possible with enhanced form context:
updateFieldValue('personalInfo.firstName', 'John');
updateFieldValue('personalInfo.lastName', 'Doe');
setFieldTouched('personalInfo.firstName', true);

// Get nested fields:
const firstNameField = getField('personalInfo.firstName');
const lastNameField = getField('personalInfo.lastName');`}
        </pre>
      </div>
    </div>
  );
};
