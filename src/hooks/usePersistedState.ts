'use client';

import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export interface Persistor<T> {
  get: () => T | null | Promise<T | null>;
  set: (value: T) => void | Promise<void>;
}

export function usePersistedState<T>(
  initialState: T,
  persistor: Persistor<T>,
): [T | null, Dispatch<SetStateAction<T | null>>, boolean] {
  const [value, setValue] = useState<T | null>(() => {
    try {
      const result = persistor.get();
      if (result instanceof Promise) return null;
      return result ?? initialState;
    } catch {
      return null;
    }
  });

  const [ready, setReady] = useState(value !== null);

  useEffect(() => {
    if (!ready) {
      const resolve = async () => {
        try {
          const persisted = await persistor.get();
          setValue(persisted !== null ? persisted : initialState);
        } catch {
          setValue(initialState);
        }
        setReady(true);
      };
      resolve();
    }
  }, []);

  useEffect(() => {
    if (ready && value !== null) {
      const persist = async () => {
        try {
          await persistor.set(value);
        } catch {
          // persistor unavailable, skip
        }
      };
      persist();
    }
  }, [value, ready]);

  return [value, setValue, ready];
}
