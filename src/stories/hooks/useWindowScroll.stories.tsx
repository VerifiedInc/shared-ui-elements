import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useWindowScroll } from '../../hooks/useWindowScroll';

export default {
  title: 'Hooks/useWindowScroll',
  parameters: {
    docs: {
      description: {
        component:
          'A hook that tracks window scroll position and provides methods to control scrolling.',
      },
    },
  },
} as Meta;

const ScrollDemo = () => {
  const { x, y, scrollTo } = useWindowScroll();

  const handleScrollToTop = () => {
    scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToBottom = () => {
    scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleScrollToCoordinates = () => {
    scrollTo(0, 500);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <strong>Current Scroll Position:</strong>
          <div>X: {Math.round(x)}px</div>
          <div>Y: {Math.round(y)}px</div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <button
            onClick={handleScrollToTop}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              backgroundColor: '#f8f8f8',
            }}
          >
            Scroll to Top
          </button>
          <button
            onClick={handleScrollToBottom}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              backgroundColor: '#f8f8f8',
            }}
          >
            Scroll to Bottom
          </button>
          <button
            onClick={handleScrollToCoordinates}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              backgroundColor: '#f8f8f8',
            }}
          >
            Scroll to Y: 500px
          </button>
        </div>
      </div>

      {/* Content to make the page scrollable */}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>Scroll Demo</h1>
        <p style={{ marginBottom: '20px' }}>
          Scroll this page to see the current scroll position update in
          real-time. Use the buttons on the right to control scrolling.
        </p>

        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              marginBottom: '20px',
              backgroundColor: index % 2 ? '#f5f5f5' : '#e9e9e9',
              borderRadius: '8px',
            }}
          >
            <h3>Section {index + 1}</h3>
            <p>
              This is a content section to make the page scrollable. The hook
              tracks both vertical and horizontal scroll positions.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Default: StoryFn = () => <ScrollDemo />;
Default.storyName = 'Window Scroll Demo';
