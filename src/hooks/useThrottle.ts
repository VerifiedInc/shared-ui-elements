import { useEffect, useRef, useState } from 'react';

/**
 * A hook that throttles a value by delaying its update for a specified time.
 * @param value The value to be throttled.
 * @param interval The interval in milliseconds.
 * @returns The throttled value.
 */
export function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdated.current;

    if (timeSinceLastUpdate >= interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const timeToNextUpdate = interval - timeSinceLastUpdate;
      const id = window.setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
      }, timeToNextUpdate);

      return () => {
        window.clearTimeout(id);
      };
    }
  }, [value, interval]);

  return throttledValue;
}
