import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { useNetworkType } from '../../hooks/useNetworkType';

const NetworkTypeDemo: React.FC = () => {
  const networkType = useNetworkType();

  const getNetworkIcon = (type: string) => {
    switch (type) {
      case 'wifi':
        return '📶';
      case 'cellular':
        return '📱';
      case 'ethernet':
        return '🔌';
      case 'bluetooth':
        return '🔵';
      case 'none':
        return '🚫';
      default:
        return '❓';
    }
  };

  const getNetworkColor = (type: string) => {
    switch (type) {
      case 'wifi':
        return '#0d6efd';
      case 'cellular':
        return '#198754';
      case 'ethernet':
        return '#6610f2';
      case 'bluetooth':
        return '#0dcaf0';
      case 'none':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

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
            fontSize: '2rem',
          }}
        >
          {getNetworkIcon(networkType)}
        </div>
        <span
          style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            color: getNetworkColor(networkType),
          }}
        >
          {networkType.charAt(0).toUpperCase() + networkType.slice(1)}
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
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        This hook detects your network connection type (WiFi, cellular,
        ethernet, etc.). Try switching between different network connections to
        see it update in real-time.
      </div>

      <div
        style={{
          marginTop: '0.5rem',
          padding: '0.75rem',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#856404',
          maxWidth: '400px',
          textAlign: 'center',
          border: '1px solid #ffeeba',
        }}
      >
        <strong>Note:</strong> The Network Information API may not be available
        in all browsers. If unsupported, this will show &quot;unknown&quot;.
      </div>
    </div>
  );
};

const meta = {
  title: 'Hooks/useNetworkType',
  component: NetworkTypeDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "A hook that tracks the browser's network connection type (WiFi, cellular, ethernet, etc.). Try switching your network connection to see it in action.",
      },
    },
  },
} satisfies Meta<typeof NetworkTypeDemo>;

export default meta;

const Template: StoryFn<typeof NetworkTypeDemo> = () => <NetworkTypeDemo />;

export const Default = Template;
