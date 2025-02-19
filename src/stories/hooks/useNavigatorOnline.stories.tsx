import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { useNavigatorOnline } from '../../hooks/useNavigatorOnline';

const OnlineStatusDemo: React.FC = () => {
  const isOnline = useNavigatorOnline();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#0dbc3d' : '#dc3545',
          }}
        />
        <span style={{ fontSize: '1.2rem' }}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#666',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        Toggle your device&apos;s internet connection or use browser DevTools to
        simulate offline mode
      </div>
    </div>
  );
};

const meta = {
  title: 'Hooks/useNavigatorOnline',
  component: OnlineStatusDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "A hook that tracks the browser's online/offline status. Try toggling your network connection to see it in action.",
      },
    },
  },
} satisfies Meta<typeof OnlineStatusDemo>;

export default meta;

const Template: StoryFn<typeof OnlineStatusDemo> = () => <OnlineStatusDemo />;

export const Default = Template;
