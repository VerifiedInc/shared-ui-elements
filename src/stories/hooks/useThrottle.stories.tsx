import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useThrottle } from '../../hooks/useThrottle';

export default {
  title: 'Hooks/useThrottle',
  parameters: {
    docs: {
      description: {
        component:
          'A hook that throttles a value by limiting its update frequency to once per specified interval.',
      },
    },
  },
} as Meta;

const ThrottleDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const throttledValue = useThrottle(inputValue, 500);
  const [updateCount, setUpdateCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setUpdateCount((prev) => prev + 1);
  };

  React.useEffect(() => {
    setThrottledCount((prev) => prev + 1);
  }, [throttledValue]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>useThrottle Demo</h3>
        <p>
          Type in the input below. The throttled value will update at most once
          every 500ms, even if the input value changes more frequently.
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
            onChange={handleInputChange}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '300px',
            }}
            placeholder='Type here...'
          />
        </div>

        <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
          <div>
            <strong>Current Value:</strong> {inputValue}
          </div>
          <div>
            <strong>Throttled Value:</strong> {throttledValue}
          </div>
          <div>
            <strong>Input Update Count:</strong>{' '}
            <span style={{ color: 'blue' }}>{updateCount}</span>
          </div>
          <div>
            <strong>Throttled Update Count:</strong>{' '}
            <span style={{ color: 'green' }}>{throttledCount}</span>
          </div>
        </div>

        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Notice how the throttled update count increases less frequently than
            the input update count, demonstrating the throttling effect.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Default: StoryFn = () => <ThrottleDemo />;
Default.storyName = 'Throttle Demo';
