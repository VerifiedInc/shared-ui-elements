import { type RefObject, useEffect, useState } from 'react';

interface IntersectionResult {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Hook that tracks the intersection of a DOM element with its containing element or viewport
 * @param elementRef - React ref object for the target element
 * @param options - IntersectionObserver options with additional hook-specific options
 * @returns Object containing intersection state and the latest IntersectionObserverEntry
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: UseIntersectionObserverOptions = {},
): IntersectionResult {
  const [intersectionResult, setIntersectionResult] =
    useState<IntersectionResult>({
      isIntersecting: false,
      entry: null,
    });

  useEffect(() => {
    const element = elementRef?.current;
    let unobserve: (() => void) | undefined;

    if (element) {
      // If we already saw the element and freezeOnceVisible is true, skip observation
      if (freezeOnceVisible && intersectionResult.isIntersecting) {
        return;
      }

      const observerCallback = (entries: IntersectionObserverEntry[]): void => {
        const [entry] = entries;
        setIntersectionResult({
          isIntersecting: entry.isIntersecting,
          entry,
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        threshold,
        root,
        rootMargin,
      });

      observer.observe(element);

      unobserve = () => {
        observer.disconnect();
      };
    }

    return () => {
      if (unobserve) {
        unobserve();
      }
    };
  }, [
    elementRef,
    threshold,
    root,
    rootMargin,
    freezeOnceVisible,
    intersectionResult.isIntersecting,
  ]);

  return intersectionResult;
}
