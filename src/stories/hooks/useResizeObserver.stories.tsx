import React, { useRef } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { motion } from 'framer-motion';

import { useResizeObserver } from '../../hooks/useResizeObserver';

const ResizeDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, height] = useResizeObserver(containerRef);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <p>Current dimensions:</p>
        <code>
          width: {width}px, height: {height}px
        </code>
      </div>

      <motion.div
        ref={containerRef}
        style={{
          background: 'linear-gradient(45deg, #0dbc3d 30%, #008a01 90%)',
          borderRadius: '8px',
          padding: '20px',
          cursor: 'pointer',
          color: 'white',
          textAlign: 'center',
        }}
        initial={{ width: 200, height: 100 }}
        whileHover={{
          width: 300,
          height: 150,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        Hover me to resize!
      </motion.div>

      <p
        style={{
          fontSize: '0.9rem',
          color: '#666',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        This demo uses Framer Motion for smooth animations. The dimensions above
        update in real-time as you hover over the box.
      </p>
    </div>
  );
};

const meta = {
  title: 'Hooks/useResizeObserver',
  component: ResizeDemo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ResizeDemo>;

export default meta;

const Template: StoryFn<typeof ResizeDemo> = () => <ResizeDemo />;

export const Default = Template;
