import { useCallback, useState } from 'react';

/**
 * Hook that returns a toggle state and a function to toggle it.
 * @param initialValue The initial value of the toggle state.
 * @returns A tuple containing the current state and a function to toggle it.
 */
export function useToggle<T>(initialValue: T): [boolean, (value: T) => void] {
  const [on, setOn] = useState<boolean>(() => {
    if (typeof initialValue === 'boolean') {
      return initialValue;
    }

    return Boolean(initialValue);
  });

  const handleToggle = useCallback((value: T): void => {
    if (typeof value === 'boolean') {
      setOn(value);
      return;
    }

    setOn((v) => !v);
  }, []);

  return [on, handleToggle];
}
