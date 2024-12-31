import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useScript } from '../../hooks/useScript';

export default {
  title: 'Hooks/useScript',
  parameters: {
    docs: {
      description: {
        component:
          'A hook for dynamically loading external JavaScript scripts. It handles script loading states and cleanup.',
      },
    },
  },
} as Meta;

const ScriptDemo = ({ src }: { src: string }) => {
  const status = useScript(src, { removeOnUnmount: true });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Script Loading Status</h3>
        <p>
          This demo shows the loading states of an external script. The script
          will be removed when the component unmounts.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <strong>Script Source:</strong>{' '}
          <code
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            {src}
          </code>
        </div>

        <div>
          <strong>Loading Status:</strong>{' '}
          <span
            style={{
              color:
                status === 'ready'
                  ? 'green'
                  : status === 'error'
                    ? 'red'
                    : 'orange',
            }}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

const ToggleScriptDemo = () => {
  const [showScript, setShowScript] = useState(true);

  return (
    <div>
      <button
        onClick={() => setShowScript(!showScript)}
        style={{
          padding: '8px 16px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
      >
        {showScript ? 'Remove Script' : 'Load Script'}
      </button>

      {showScript && (
        <ScriptDemo src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js' />
      )}
    </div>
  );
};

export const Default: StoryFn = () => <ToggleScriptDemo />;
Default.storyName = 'Script Loading Demo';

export const ErrorCase: StoryFn = () => (
  <ScriptDemo src='https://invalid-url-that-will-fail.js' />
);
ErrorCase.storyName = 'Error State Demo';
