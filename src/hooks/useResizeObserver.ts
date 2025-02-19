import { useSyncExternalStore, useRef } from 'react';

/**
 * A React hook that observes and returns the dimensions of a DOM element.
 * Uses ResizeObserver API for efficient size tracking and useSyncExternalStore
 * for React 18+ concurrent rendering compatibility.
 * @param containerRef - React ref object pointing to the DOM element to observe
 * @returns [width, height] - Array containing the current width and height. Returns 'auto' for each dimension if the ref is not yet attached.
 */
export function useResizeObserver(
  containerRef: React.RefObject<HTMLDivElement>,
): Array<string | number> {
  // Cache for the last known dimensions
  const dimensionsCache = useRef<[string | number, string | number]>([
    'auto',
    'auto',
  ]);

  // Set up the resize observer subscription
  const subscribe = (callback: () => void): (() => void) => {
    if (
      typeof window === 'undefined' ||
      typeof ResizeObserver === 'undefined'
    ) {
      return () => {};
    }

    if (!containerRef.current) return () => {};

    // Create a new ResizeObserver instance that calls our callback
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(containerRef.current);

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  };

  // Get the current dimensions of the observed element
  const getSnapshot = (): Array<string | number> => {
    if (typeof window === 'undefined') {
      return dimensionsCache.current;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 'auto';
    const height = rect?.height ?? 'auto';

    // Only create a new array if the dimensions have changed
    if (
      dimensionsCache.current[0] !== width ||
      dimensionsCache.current[1] !== height
    ) {
      dimensionsCache.current = [width, height];
    }

    return dimensionsCache.current;
  };

  // Server snapshot always returns the initial dimensions
  const getServerSnapshot = (): Array<string | number> => {
    return dimensionsCache.current;
  };

  // Subscribe to size changes using React 18's useSyncExternalStore
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
