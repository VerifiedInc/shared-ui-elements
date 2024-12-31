import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useDebounceValue } from '../../hooks/useDebounceValue';

export default {
  title: 'Hooks/useDebounceValue',
  parameters: {
    docs: {
      description: {
        component:
          'A hook that debounces a value by delaying its update for a specified time.',
      },
    },
  },
} as Meta;

const DemoComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounceValue(inputValue, 500);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>useDebounceValue Demo</h3>
        <p>
          Type in the input below. The debounced value will update 500ms (per
          config) after you stop typing.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label
            htmlFor='input'
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Input Value:
          </label>
          <input
            id='input'
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '300px',
            }}
          />
        </div>

        <div>
          <strong>Current Value:</strong> {inputValue}
        </div>

        <div>
          <strong>Debounced Value:</strong> {debouncedValue}
        </div>
      </div>
    </div>
  );
};

export const Default: StoryFn = () => <DemoComponent />;
Default.storyName = 'Default Example';
