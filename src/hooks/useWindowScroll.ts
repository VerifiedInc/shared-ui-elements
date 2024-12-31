import { useCallback, useLayoutEffect, useState } from 'react';

interface ScrollState {
  x: number;
  y: number;
}

type ScrollToArgs = [ScrollToOptions] | [number, number];

/**
 * Hook to manage window scroll position and scrolling behavior
 * @returns Object containing current scroll position and scrollTo function
 */
export function useWindowScroll(): {
  x: number;
  y: number;
  scrollTo: (...args: ScrollToArgs) => void;
} {
  const [state, setState] = useState<ScrollState>({
    x: 0,
    y: 0,
  });

  const scrollTo = useCallback((...args: ScrollToArgs): void => {
    if (args.length === 1 && typeof args[0] === 'object') {
      window.scrollTo(args[0]);
    } else if (args.length === 2) {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error(
        'Invalid arguments passed to scrollTo. Expected either ScrollToOptions object or x,y coordinates. See https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo',
      );
    }
  }, []);

  useLayoutEffect(() => {
    const handleScroll = (): void => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { ...state, scrollTo };
}
