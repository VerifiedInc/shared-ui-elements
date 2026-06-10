'use client';

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface Persistor<T> {
  get: () => T | null | Promise<T | null>;
  set: (value: T) => void | Promise<void>;
}

function isThenable(value: unknown): value is PromiseLike<unknown> {
  return typeof (value as { then?: unknown })?.then === 'function';
}

export function usePersistedState<T>(
  initialState: T,
  persistor: Persistor<T>,
): [T | null, Dispatch<SetStateAction<T | null>>, boolean] {
  const [state, setState] = useState<{ value: T | null; ready: boolean }>(
    () => {
      try {
        const result = persistor.get();
        if (isThenable(result)) return { value: null, ready: false };
        return { value: (result as T | null) ?? initialState, ready: true };
      } catch {
        return { value: null, ready: false };
      }
    },
  );

  const setValue: Dispatch<SetStateAction<T | null>> = useCallback(
    (action: SetStateAction<T | null>) =>
      setState((prev) => ({
        ...prev,
        value:
          typeof action === 'function'
            ? (action as (prev: T | null) => T | null)(prev.value)
            : action,
      })),
    [],
  );

  useEffect(() => {
    if (state.ready) return;

    let cancelled = false;

    const resolve = async () => {
      try {
        const persisted = await persistor.get();
        if (cancelled) return;

        setState((prev) => ({
          value: prev.value !== null ? prev.value : (persisted ?? initialState),
          ready: true,
        }));
      } catch {
        if (cancelled) return;

        setState((prev) => ({
          value: prev.value !== null ? prev.value : initialState,
          ready: true,
        }));
      }
    };

    resolve();

    return () => {
      cancelled = true;
    };
  }, [initialState, persistor, state.ready]);

  useEffect(() => {
    if (state.ready && state.value !== null) {
      const persist = async () => {
        try {
          await persistor.set(state.value as T);
        } catch {
          // persistor unavailable, skip
        }
      };
      persist();
    }
  }, [state.value, state.ready]);

  return [state.value, setValue, state.ready];
}
