import { useState, useEffect } from 'react';

/**
 * useDebounceValue Hook
 *
 * @param {any} value - The value to be debounced
 * @param {number} delay - The delay in milliseconds
 * @returns {any} - The debounced value
 */
export function useDebounceValue<T>(value: T, delay = 250) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value changes or the component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
