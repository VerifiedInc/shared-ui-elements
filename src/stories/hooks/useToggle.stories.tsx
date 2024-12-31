import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useToggle } from '../../hooks/useToggle';

export default {
  title: 'Hooks/useToggle',
  parameters: {
    docs: {
      description: {
        component:
          'A hook that manages a boolean toggle state with support for both boolean and generic value types.',
      },
    },
  },
} as Meta;

const ToggleDemo = () => {
  const [isOn, toggle] = useToggle(false);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Basic Toggle Demo</h3>
        <p>Click the button to toggle the state between true and false.</p>
      </div>

      <button
        onClick={() => toggle(!isOn)}
        style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: isOn ? '#4CAF50' : '#f5f5f5',
          color: isOn ? 'white' : 'black',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        Toggle: {isOn ? 'ON' : 'OFF'}
      </button>

      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <strong>Current State:</strong> {isOn.toString()}
      </div>
    </div>
  );
};

const AdvancedToggleDemo = () => {
  const [lightMode, setLightMode] = useToggle('light');
  const [menuOpen, setMenuOpen] = useToggle(0);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Advanced Toggle Demo</h3>
        <p>
          Examples of using useToggle with different value types. The hook will
          convert any value to a boolean internally.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <button
            onClick={() => setLightMode('dark')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Toggle Theme Mode
          </button>
          <div style={{ marginTop: '10px' }}>
            Current Theme: {lightMode ? 'Light Mode' : 'Dark Mode'}
          </div>
        </div>

        <div>
          <button
            onClick={() => setMenuOpen(1)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Toggle Menu
          </button>
          <div style={{ marginTop: '10px' }}>
            Menu is: {menuOpen ? 'Open' : 'Closed'}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Basic: StoryFn = () => <ToggleDemo />;
Basic.storyName = 'Basic Usage';

export const Advanced: StoryFn = () => <AdvancedToggleDemo />;
Advanced.storyName = 'Advanced Usage';
