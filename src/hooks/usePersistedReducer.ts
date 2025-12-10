import {
  type Dispatch,
  type Reducer,
  type ReducerAction,
  type ReducerState,
  useEffect,
  useReducer,
} from 'react';

import { useLocalStorage, usePrevious } from '.';

/**
 * Hook to persiste reducer state in local storage
 */
export function usePersistedReducer<R extends Reducer<any, any>, I>(
  storageKey: string,
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: (arg: I & ReducerState<R>) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const localStorage = useLocalStorage(storageKey);

  const init = () => {
    const persisted = localStorage.get();

    if (persisted) {
      try {
        return persisted;
      } catch {
        return initialState;
      }
    }

    if (initializer) {
      return initializer(initialState);
    }

    return initialState;
  };

  const [state, dispatch] = useReducer<R, I>(reducer, initialState, init);
  const previousState = usePrevious(state);

  useEffect(() => {
    const stateEqual = JSON.stringify(previousState) === JSON.stringify(state);
    if (!stateEqual) {
      localStorage.set(state);
    }
  }, [state]);

  return [state, dispatch];
}
