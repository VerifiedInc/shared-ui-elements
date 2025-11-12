import {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Stack, StackProps } from '@mui/material';

export type TunnelContext = {
  register: (id: string, element: HTMLElement) => void;
  unregister: (id: string) => void;
  getTarget: (id: string) => HTMLElement | null;
  subscribe: (
    id: string,
    callback: (element: HTMLElement | null) => void,
  ) => () => void;
};

const Context = createContext<TunnelContext | null>(null);

// Hook to access tunnel context
function useTunnel() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useTunnel must be used within a TunnelProvider');
  }
  return context;
}

// Provider component that manages portal targets
function Provider({ children }: { children: ReactNode }) {
  const [tunnelMap, setTunnelMap] = useState<Map<string, HTMLElement>>(
    new Map(),
  );
  const [subscribers] = useState<
    Map<string, Set<(element: HTMLElement | null) => void>>
  >(new Map());

  const register = useCallback(
    (id: string, element: HTMLElement) => {
      setTunnelMap((prev) => {
        const next = new Map(prev);
        next.set(id, element);
        return next;
      });

      // Notify subscribers
      const callbacks = subscribers.get(id);
      if (callbacks) {
        callbacks.forEach((callback) => callback(element));
      }
    },
    [subscribers],
  );

  const unregister = useCallback(
    (id: string) => {
      setTunnelMap((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });

      // Notify subscribers
      const callbacks = subscribers.get(id);
      if (callbacks) {
        callbacks.forEach((callback) => callback(null));
      }
    },
    [subscribers],
  );

  const getTarget = useCallback(
    (id: string) => {
      return tunnelMap.get(id) ?? null;
    },
    [tunnelMap],
  );

  const subscribe = useCallback(
    (id: string, callback: (element: HTMLElement | null) => void) => {
      if (!subscribers.has(id)) {
        subscribers.set(id, new Set());
      }
      subscribers.get(id)?.add(callback);

      // Immediately call with current value
      const current = tunnelMap.get(id) ?? null;
      callback(current);

      // Return unsubscribe function
      return () => {
        const callbacks = subscribers.get(id);
        if (callbacks) {
          callbacks.delete(callback);
          if (callbacks.size === 0) {
            subscribers.delete(id);
          }
        }
      };
    },
    [subscribers, tunnelMap],
  );

  return (
    <Context.Provider value={{ register, unregister, getTarget, subscribe }}>
      {children}
    </Context.Provider>
  );
}

// Component that creates a portal target
function Target({ id, ...stackProps }: StackProps & { id: string }) {
  const { register, unregister } = useTunnel();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        register(id, node);
      } else {
        unregister(id);
      }
    },
    [id, register, unregister],
  );

  return <Stack {...stackProps} ref={ref} data-tunnel-target={id} />;
}

// Component that renders content through a portal
function Source({ id, children }: { id: string; children: ReactNode }) {
  const { subscribe } = useTunnel();
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // Subscribe to target element changes
  useLayoutEffect(() => {
    const unsubscribe = subscribe(id, setTargetElement);
    return unsubscribe;
  }, [id, subscribe]);

  if (!targetElement) {
    return null;
  }

  return createPortal(children, targetElement);
}

export const Tunnel = {
  Provider,
  Target,
  Source,
  useTunnel, // Export for advanced usage
};
