import { useEffect, useState } from 'react';

/**
 * Track the previous value of a variable with usePrevious.
 * @param value
 * @returns The previous value of the variable.
 */
export function usePrevious<T>(value: T): T | null {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T | null>(null);

  useEffect(() => {
    if (value !== current) {
      setPrevious(current);
      setCurrent(value);
    }
  }, [current, value]);

  return previous;
}
