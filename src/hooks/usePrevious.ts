import React from 'react';

/**
 * Custom React hook for tracking previous values.
 * @param value
 */
export function usePrevious<T>(value: T): T | undefined {
  const [current, setCurrent] = React.useState<T>(value);
  const [previous, setPrevious] = React.useState<T>();

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}
