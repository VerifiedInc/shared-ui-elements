import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { NetworkRulesServices } from './types';

interface NetworkRulesContextValue {
  services: NetworkRulesServices;
  statuses?: readonly string[];
}

const Context = createContext<NetworkRulesContextValue | null>(null);

export interface NetworkRulesProviderProps {
  services: NetworkRulesServices;
  /** Status codes a rule may take. Defaults to the catalog's `statuses`. */
  statuses?: readonly string[];
  children: ReactNode;
}

export function NetworkRulesProvider({
  services,
  statuses,
  children,
}: Readonly<NetworkRulesProviderProps>) {
  const [queryClient] = useState(
    () =>
      services.queryClient ??
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );
  const value = useMemo(() => ({ services, statuses }), [services, statuses]);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={value}>{children}</Context.Provider>
    </QueryClientProvider>
  );
}

function useNetworkRulesContext(): NetworkRulesContextValue {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      'NetworkRules components must be rendered within a NetworkRulesProvider',
    );
  }
  return context;
}

export function useNetworkRulesServices(): NetworkRulesServices {
  return useNetworkRulesContext().services;
}

export function useNetworkRuleStatuses(): readonly string[] | undefined {
  return useNetworkRulesContext().statuses;
}
