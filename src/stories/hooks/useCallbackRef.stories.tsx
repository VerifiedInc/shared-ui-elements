import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useCallbackRef } from '../../hooks/useCallbackRef';

const meta: Meta = {
  title: 'Hooks/useCallbackRef',
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
  const [count, setCount] = React.useState(0);
  const [lastClickTime, setLastClickTime] = React.useState<string>('');

  // Example 1: Basic callback with dependency
  const handleClick = useCallbackRef(() => {
    setCount((c) => c + 1);
    setLastClickTime(new Date().toLocaleTimeString());
  }, [setCount, setLastClickTime]);

  // Example 2: Callback with parameters
  const [message, setMessage] = React.useState('');
  const handleInput = useCallbackRef(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    [setMessage],
  );

  // Example 3: Effect with callback
  const [effectCount, setEffectCount] = React.useState(0);
  const handleEffect = useCallbackRef(() => {
    setEffectCount((c) => c + 1);
  }, [setEffectCount]);

  React.useEffect(() => {
    handleEffect();
  }, [handleEffect, count]);

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
      <Section title='Basic Callback Usage'>
        <div style={containerStyle}>
          <button onClick={handleClick}>Increment Count</button>
          <div style={valueStyle}>
            <div>Count: {count}</div>
            <div>Last Click: {lastClickTime || 'No clicks yet'}</div>
          </div>
        </div>
      </Section>

      <Section title='Callback with Event Parameters'>
        <div style={containerStyle}>
          <input
            type='text'
            value={message}
            onChange={handleInput}
            placeholder='Type something...'
            style={{ marginBottom: '0.5rem' }}
          />
          <div style={valueStyle}>
            <div>Current Message: {message}</div>
          </div>
        </div>
      </Section>

      <Section title='Effect with Callback'>
        <div style={containerStyle}>
          <div style={valueStyle}>
            <div>Effect Count: {effectCount}</div>
            <div>(Increments when count changes or component re-renders)</div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export const Default: StoryFn = () => <Example />;

Default.parameters = {
  title: 'Hooks/useCallbackRef',
  docs: {
    description: {
      component: `
A hook that provides a stable callback reference that can be safely used in effects and event handlers. It's a user-land implementation of React's experimental \`useEffectEvent\` hook.

### Purpose

This hook solves the problem of stale closures in effects and helps separate event-style logic from effect logic. It's particularly useful when:
- You need to use the latest props/state in an effect callback
- You want to avoid unnecessary effect re-runs due to callback dependencies
- You need to maintain a stable callback reference across renders

### Basic Usage

\`\`\`tsx
const callback = useCallbackRef((value) => {
  // This callback will always have access to latest props/state
  console.log(value);
}, []); // Dependencies array is optional

// Use in effects
useEffect(() => {
  callback(someValue);
}, [callback]); // callback reference is stable
\`\`\`

### Key Features

1. **Stable Reference**: The returned callback maintains a stable reference across renders
2. **Latest Values**: Always has access to the latest props and state
3. **Type Safe**: Full TypeScript support for callback parameters and return type
4. **Effect-Safe**: Can be safely used in effects without causing unnecessary re-runs

### When to Use

1. Inside useEffect when you need access to latest values
2. Event handlers that need to reference latest state
3. Callbacks passed to child components that need latest context
4. Any scenario where you need to avoid stale closures

### Implementation Note

This is a user-land implementation of React's experimental \`useEffectEvent\` hook. It uses \`useInsertionEffect\` internally to update the callback reference before layout effects run.
`,
    },
  },
};
