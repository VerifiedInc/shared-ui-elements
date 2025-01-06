import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { usePrevious } from '../../hooks/usePrevious';

const meta: Meta = {
  title: 'Hooks/usePrevious',
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
  // Counter example
  const [count, setCount] = React.useState(0);
  const previousCount = usePrevious(count);

  // Text input example
  const [text, setText] = React.useState('');
  const previousText = usePrevious(text);

  // Object example
  const [user, setUser] = React.useState({ name: 'John', age: 25 });
  const previousUser = usePrevious(user);

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
      <Section title='Number Value'>
        <div style={containerStyle}>
          <button onClick={() => setCount((c) => c + 1)}>
            Increment Count
          </button>
          <div style={valueStyle}>
            <div>Current count: {count}</div>
            <div>Previous count: {previousCount ?? 'undefined'}</div>
          </div>
        </div>
      </Section>

      <Section title='Text Value'>
        <div style={containerStyle}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type something...'
            style={{ marginBottom: '0.5rem' }}
          />
          <div style={valueStyle}>
            <div>Current text: "{text}"</div>
            <div>Previous text: "{previousText ?? 'undefined'}"</div>
          </div>
        </div>
      </Section>

      <Section title='Object Value'>
        <div style={containerStyle}>
          <button
            onClick={() => setUser((u) => ({ ...u, age: u.age + 1 }))}
            style={{ marginRight: '0.5rem' }}
          >
            Increment Age
          </button>
          <button
            onClick={() =>
              setUser((u) => ({
                ...u,
                name: u.name === 'John' ? 'Jane' : 'John',
              }))
            }
          >
            Toggle Name
          </button>
          <div style={valueStyle}>
            <div>Current user: {JSON.stringify(user)}</div>
            <div>
              Previous user: {JSON.stringify(previousUser ?? 'undefined')}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export const Default: StoryFn = () => <Example />;

Default.parameters = {
  title: 'Hooks/usePrevious',
  docs: {
    description: {
      component: `
A hook that tracks and returns the previous value of a variable. This is useful when you need to compare current values with previous values or implement functionality that depends on value changes.

### Basic Usage

\`\`\`tsx
const [count, setCount] = React.useState(0);
const previousCount = usePrevious(count);

// previousCount will be undefined on first render
// After count changes, previousCount will hold the previous value
\`\`\`

### Features

- Works with any value type (numbers, strings, objects, arrays)
- Returns undefined on first render
- Updates only when the tracked value changes
- Preserves value type through TypeScript generics

### Use Cases

1. Comparing current and previous values
2. Implementing undo functionality
3. Tracking state changes for animations
4. Conditional logic based on previous values

### Example with Different Types

\`\`\`tsx
// With numbers
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

// With strings
const [text, setText] = useState('');
const prevText = usePrevious(text);

// With objects
const [user, setUser] = useState({ name: 'John' });
const prevUser = usePrevious(user);
\`\`\`
`,
    },
  },
};
