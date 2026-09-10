import { useEffect, useState } from 'react';

/** Freezes `value` while `open` is false, so a closing dialog keeps its content through the exit transition. */
export function useHeldWhileClosed<T>(open: boolean, value: T): T {
  const [held, setHeld] = useState(value);
  useEffect(() => {
    if (open) setHeld(value);
  }, [open, value]);
  return open ? value : held;
}
