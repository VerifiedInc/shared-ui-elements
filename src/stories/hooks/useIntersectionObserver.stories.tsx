import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default {
  title: 'Hooks/useIntersectionObserver',
  parameters: {
    docs: {
      description: {
        component:
          'A hook that tracks when an element intersects with its parent or viewport using the Intersection Observer API.',
      },
    },
  },
} as Meta;

const Card = ({ index }: { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(ref, {
    threshold: 0.5,
    rootMargin: '0px',
  });

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        margin: '20px 0',
        backgroundColor: isIntersecting ? '#e8f5e9' : '#f5f5f5',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        transform: isIntersecting ? 'translateX(0)' : 'translateX(-20px)',
        opacity: isIntersecting ? 1 : 0.5,
      }}
    >
      <h3 style={{ margin: 0 }}>Card {index}</h3>
      <p>
        This card changes appearance when it is at least 50% visible in the
        viewport.
      </p>
    </div>
  );
};

const InfiniteScrollDemo = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(loadMoreRef, {
    threshold: 0,
    rootMargin: '200px',
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Intersection Observer Demo</h3>
        <p>
          Scroll down to see cards animate as they enter the viewport. The cards
          will change color and slide in when they become visible.
        </p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} index={index + 1} />
        ))}

        <div
          ref={loadMoreRef}
          style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: isIntersecting ? '#e3f2fd' : '#f5f5f5',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isIntersecting ? 'Loading more...' : 'Scroll for more'}
        </div>
      </div>

      <div style={{ position: 'fixed', top: 20, right: 20 }}>
        <div
          style={{
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <strong>Scroll down to see the effect</strong>
        </div>
      </div>
    </div>
  );
};

export const Default: StoryFn = () => <InfiniteScrollDemo />;
Default.storyName = 'Intersection Observer Demo';
