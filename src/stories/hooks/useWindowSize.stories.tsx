import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useWindowSize } from '../../hooks/useWindowSize';

export default {
  title: 'Hooks/useWindowSize',
  parameters: {
    docs: {
      description: {
        component:
          'A hook that tracks window dimensions and updates in real-time when the window is resized.',
      },
    },
  },
} as Meta;

const WindowSizeDemo = () => {
  const { width, height } = useWindowSize();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Window Size Demo</h3>
        <p>
          Resize your browser window to see the dimensions update in real-time.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <strong>Width:</strong> {width}px
          </div>
          <div>
            <strong>Height:</strong> {height}px
          </div>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '20px',
            backgroundColor: '#e9e9e9',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ marginTop: 0 }}>Responsive Box</h4>
          <p>
            This box will resize with the window. Current width:{' '}
            {Math.min(600, width - 40)}px
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                textAlign: 'center',
              }}
            >
              Grid Item {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Default: StoryFn = () => <WindowSizeDemo />;
Default.storyName = 'Window Size Demo';
