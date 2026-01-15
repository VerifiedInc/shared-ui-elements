import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FormContextValue, useForm } from '../core/form.context';

type OneClickOptionFeatures = {
  /** Element that the date picker should be detached from when clicking outside of it. */
  datePickerClickOutsideBoundaryElement?: HTMLElement | null;
  enableUserPrivacy?: boolean;
};

type OneClickOptionServicePaths = {
  googlePlacesAutocompletePlaces?: (
    input: string,
    signal?: AbortSignal,
  ) => Promise<unknown>;
  googlePlacesGetPlace?: (
    placeId: string,
    signal?: AbortSignal,
  ) => Promise<unknown>;
};

export type OneClickFormOptions = {
  features: OneClickOptionFeatures;
  servicePaths: OneClickOptionServicePaths;
  queryClient?: QueryClient;
};

export type OneClickFormContext = {
  formContext: FormContextValue;
  options: OneClickFormOptions;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

const Context = createContext<OneClickFormContext | null>(null);

type OneClickFormProviderProps = {
  options: OneClickFormOptions;
  children: ReactNode;
};

export function OneClickFormProvider({
  options,
  children,
}: OneClickFormProviderProps) {
  const formContext = useForm();
  const [editMode, setEditMode] = useState(!formContext.state.form.isValid);

  // Configure a React Query client to handle requests client side only,
  // it supports SSR as well but is not the focus.
  const [queryClientState] = useState(
    () =>
      options.queryClient ??
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: Infinity,
            retryDelay: 3000,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const contextValue: OneClickFormContext = useMemo(
    () => ({
      formContext,
      options,
      editMode,
      setEditMode,
    }),
    [formContext, options, editMode, setEditMode],
  );

  return (
    <QueryClientProvider client={queryClientState}>
      <Context.Provider value={contextValue}>{children}</Context.Provider>
    </QueryClientProvider>
  );
}

export function useOneClickForm(): OneClickFormContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'useOneClickForm must be used within a OneClickFormProvider',
    );
  }

  return context;
}
