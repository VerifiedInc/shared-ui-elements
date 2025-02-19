import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AnimateHeight } from '../../../components/animation/AnimatedHeight';

const meta = {
  title: 'Components/Animation/AnimateHeight',
  component: AnimateHeight,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimateHeight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '1rem' }}>
        <p>This content will animate its height when changed.</p>
      </div>
    ),
  },
};

export const ToggleVisibility: Story = {
  render: () => <ToggleDemo />,
};

export const WithDynamicContent: Story = {
  args: {
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

const ToggleDemo = () => {
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
        <AnimateHeight>
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
