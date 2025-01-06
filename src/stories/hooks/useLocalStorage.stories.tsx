import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const meta: Meta = {
  title: 'Hooks/useLocalStorage',
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
  // Example with string value
  const stringStorage = useLocalStorage('demo-string');
  const [inputValue, setInputValue] = React.useState('');
  const [storedString, setStoredString] = React.useState(stringStorage.get());

  // Example with object value
  const objectStorage = useLocalStorage('demo-object');
  const [user, setUser] = React.useState({ name: '', age: 0 });
  const [storedObject, setStoredObject] = React.useState(objectStorage.get());

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
  };

  return (
    <div>
      <Section title='String Storage'>
        <div style={containerStyle}>
          <div>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Type a string value'
              style={{ marginRight: '0.5rem' }}
            />
            <button
              onClick={() => {
                stringStorage.set(inputValue);
                setStoredString(stringStorage.get());
              }}
              style={{ marginRight: '0.5rem' }}
            >
              Save
            </button>
            <button
              onClick={() => {
                stringStorage.remove();
                setStoredString(null);
              }}
            >
              Clear
            </button>
          </div>
          <div style={valueStyle}>
            Stored Value: {storedString || 'No value stored'}
          </div>
        </div>
      </Section>

      <Section title='Object Storage'>
        <div style={containerStyle}>
          <div style={{ marginBottom: '0.5rem' }}>
            <input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder='Name'
              style={{ marginRight: '0.5rem' }}
            />
            <input
              type='number'
              value={user.age || ''}
              onChange={(e) =>
                setUser({ ...user, age: parseInt(e.target.value) || 0 })
              }
              placeholder='Age'
              style={{ marginRight: '0.5rem' }}
            />
            <button
              onClick={() => {
                objectStorage.set(user);
                setStoredObject(objectStorage.get());
              }}
              style={{ marginRight: '0.5rem' }}
            >
              Save
            </button>
            <button
              onClick={() => {
                objectStorage.remove();
                setStoredObject(null);
              }}
            >
              Clear
            </button>
          </div>
          <div style={valueStyle}>
            Stored Object: {JSON.stringify(storedObject) || 'No object stored'}
          </div>
        </div>
      </Section>
    </div>
  );
};

export const Default: StoryFn = () => <Example />;

Default.parameters = {
  title: 'Hooks/useLocalStorage',
  docs: {
    description: {
      component: `
A hook that provides a simple interface for working with localStorage, supporting both primitive and complex data types.

### Basic Usage

\`\`\`tsx
const storage = useLocalStorage('my-key');

// Set a value
storage.set('hello world');
storage.set({ complex: 'object' });

// Get the stored value
const value = storage.get();

// Remove the stored value
storage.remove();
\`\`\`

### Features

1. **Type Handling**: Automatically handles JSON serialization/deserialization
2. **Error Handling**: Safely handles JSON parsing errors
3. **Persistence**: Values persist across page reloads
4. **Simple API**: Easy to use set/get/remove interface

### Use Cases

1. Storing user preferences
2. Caching application state
3. Maintaining form data across sessions
4. Storing authentication tokens

### Implementation Note

The hook automatically handles JSON serialization for complex data types and falls back to string storage for primitive values.
`,
    },
  },
};
