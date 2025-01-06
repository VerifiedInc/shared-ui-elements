import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useSearchParams } from '../../hooks/useSearchParams';

const meta: Meta = {
  title: 'Hooks/useSearchParams',
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
  const [customSearch, setCustomSearch] = React.useState('?name=John&age=25');
  const currentParams = useSearchParams();
  const customParams = useSearchParams(customSearch);

  const containerStyle = {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '1rem',
  };

  const valueStyle = {
    padding: '0.5rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    marginTop: '0.5rem',
    fontFamily: 'monospace',
  };

  return (
    <div>
      <Section title='Current URL Parameters'>
        <div style={containerStyle}>
          <p>Parameters from current URL:</p>
          <div style={valueStyle}>
            {Array.from(currentParams.entries()).map(([key, value]) => (
              <div key={key}>
                {key}: {value}
              </div>
            )) || 'No parameters found'}
          </div>
        </div>
      </Section>

      <Section title='Custom Search Parameters'>
        <div style={containerStyle}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              value={customSearch}
              onChange={(e) => setCustomSearch(e.target.value)}
              style={{ width: '100%' }}
              placeholder='Enter search string (e.g., ?name=John&age=25)'
            />
          </div>
          <p>Parsed parameters:</p>
          <div style={valueStyle}>
            {Array.from(customParams.entries()).map(([key, value]) => (
              <div key={key}>
                {key}: {value}
              </div>
            )) || 'No parameters found'}
          </div>
        </div>
      </Section>

      <Section title='Parameter Operations'>
        <div style={containerStyle}>
          <p>Common URLSearchParams operations:</p>
          <div style={valueStyle}>
            <div>Has 'name': {customParams.has('name') ? 'true' : 'false'}</div>
            <div>Get 'age': {customParams.get('age') || 'not found'}</div>
            <div>
              All 'name' values:{' '}
              {customParams.getAll('name').join(', ') || 'none'}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export const Default: StoryFn = () => <Example />;

Default.parameters = {
  title: 'Hooks/useSearchParams',
  docs: {
    description: {
      component: `
A hook that provides a convenient way to work with URL search parameters. It returns a URLSearchParams object that can be used to read and manipulate URL query parameters.

### Basic Usage

\`\`\`tsx
// Get current URL parameters
const params = useSearchParams();
const name = params.get('name');

// Use with custom search string
const customParams = useSearchParams('?name=John&age=25');
const age = customParams.get('age');
\`\`\`

### Features

1. **Flexible Input**: 
   - Uses current URL search params by default
   - Accepts custom search string or URLSearchParams object
2. **Standard API**: Returns native URLSearchParams object
3. **Type Safe**: Full TypeScript support

### Common Operations

\`\`\`tsx
const params = useSearchParams();

// Check if parameter exists
params.has('key');

// Get single value
params.get('key');

// Get all values
params.getAll('key');

// Set value
params.set('key', 'value');

// Add value
params.append('key', 'value');

// Delete parameter
params.delete('key');

// Convert to string
params.toString();
\`\`\`

### Use Cases

1. Reading URL query parameters
2. Building search/filter functionality
3. Maintaining state in URLs
4. Sharing links with parameters
5. Form submission handling
`,
    },
  },
};
