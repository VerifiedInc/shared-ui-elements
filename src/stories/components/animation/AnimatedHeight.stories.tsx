import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { AnimateHeight } from '../../../components/animation/AnimatedHeight';

const meta = {
  title: 'Components/Animation/AnimateHeight',
  component: AnimateHeight,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    duration: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      description: 'Animation duration in seconds',
      defaultValue: 0.2,
    },
  },
} satisfies Meta<typeof AnimateHeight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DefaultDemo duration={args.duration} />,
  args: {
    duration: 0.2,
  },
};

const DefaultDemo = ({ duration }: { duration?: number }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ width: '300px' }}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isVisible ? 'Hide Content' : 'Show Content'}
      </button>
      <div
        style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          background: '#f5f5f5',
        }}
      >
        <h3>Animation Demo</h3>
        <AnimateHeight duration={duration}>
          {isVisible && (
            <div style={{ overflow: 'hidden' }}>
              <p>This content will animate its height when toggled.</p>
              <p>
                Try adjusting the duration control to see different animation
                speeds.
              </p>
            </div>
          )}
        </AnimateHeight>
      </div>
    </div>
  );
};

export const ToggleVisibility: Story = {
  render: (args) => <ToggleDemo duration={args.duration} />,
  args: {
    duration: 0.2,
  },
};

export const WithDynamicContent: Story = {
  args: {
    duration: 0.2,
    children: (
      <div style={{ padding: '1rem' }}>
        <p>This is a paragraph that demonstrates the height animation.</p>
        <p>When content changes, the container smoothly adjusts its height.</p>
        <p>
          Try toggling the content visibility to see the animation in action.
        </p>
      </div>
    ),
  },
};

const ToggleDemo = ({ duration }: { duration?: number }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ width: '300px' }}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isVisible ? 'Hide Content' : 'Show Content'}
      </button>
      <div
        style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          background: '#f5f5f5',
        }}
      >
        <h3>Animated Content</h3>
        <AnimateHeight duration={duration}>
          {isVisible && (
            <div style={{ overflow: 'hidden' }}>
              <p>This content will smoothly animate in and out when toggled.</p>
              <p>The container height adjusts automatically.</p>
            </div>
          )}
        </AnimateHeight>
      </div>
    </div>
  );
};
