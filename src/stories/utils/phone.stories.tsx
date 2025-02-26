import { Meta } from '@storybook/react';
import {
  parseToPhoneNational,
  getPhoneData,
  countries,
  validatePhone,
} from '../../utils/phone';

const meta: Meta = {
  title: 'Utils/Phone',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
    {children}
  </div>
);

const Example = () => {
  // Example phone numbers
  const usPhone = '+1 (404) 432-0000';
  const brPhone = '+55 (11) 98999-0000';
  const caPhone = '+1 (604) 432-0000';
  const invalidPhone = '+999 invalid';

  return (
    <div>
      <Section title='Parse to Phone National'>
        <div>
          <p>US Phone: {parseToPhoneNational(usPhone)}</p>
          <p>BR Phone: {parseToPhoneNational(brPhone)}</p>
          <p>CA Phone: {parseToPhoneNational(caPhone)}</p>
          <p>Invalid Phone: {parseToPhoneNational(invalidPhone)}</p>
        </div>
      </Section>

      <Section title='Get Phone Data'>
        <div>
          <p>US Phone Data:</p>
          <pre>{JSON.stringify(getPhoneData(usPhone), null, 2)}</pre>

          <p>BR Phone Data:</p>
          <pre>{JSON.stringify(getPhoneData(brPhone), null, 2)}</pre>

          <p>CA Phone Data:</p>
          <pre>{JSON.stringify(getPhoneData(caPhone), null, 2)}</pre>
        </div>
      </Section>

      <Section title='Validate Phone'>
        <div>
          <p>US Phone Valid: {String(validatePhone(usPhone))}</p>
          <p>BR Phone Valid: {String(validatePhone(brPhone))}</p>
          <p>CA Phone Valid: {String(validatePhone(caPhone))}</p>
          <p>Invalid Phone Valid: {String(validatePhone(invalidPhone))}</p>
        </div>
      </Section>

      <Section title='Available Countries'>
        <div>
          <p>Supported countries and their formats:</p>
          <pre>{JSON.stringify(countries, null, 2)}</pre>
        </div>
      </Section>
    </div>
  );
};

export const Default = () => <Example />;

Default.parameters = {
  docs: {
    description: {
      component: `
# Phone Utils

A collection of utility functions for handling phone numbers across different countries.

## Functions

### parseToPhoneNational
Formats a phone number into its national format with country code.

### getPhoneData
Retrieves country-specific data for a given phone number.

### validatePhone
Validates a phone number and checks if it belongs to a supported country.

## Supported Countries
Currently supports phone numbers from:
- United States (US)
- Canada (CA)
- Brazil (BR)

Each country has specific formatting rules and masks for proper display.
      `,
    },
  },
};
