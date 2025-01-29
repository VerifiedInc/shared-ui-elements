import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  OneClickFormOptions,
  OneClickFormOptionsProvider,
} from './contexts/one-click-form-options.context';
import CredentialsDisplayProvider from './components/CredentialsDisplay/CredentialsDisplayContext';
import CredentialsDisplay from './components/CredentialsDisplay/CredentialsDisplay';
import {
  CredentialRequests,
  Credentials,
  CredentialSchemas,
} from './types/request';

type OneClickFormProps = {
  credentialRequests?: CredentialRequests[];
  credentials: Credentials[];
  schema: CredentialSchemas['schemas'];
  options: OneClickFormOptions;
  renderExtra?: ReactNode; // Extra content to render after the credentials display, it can have access to the form context.
  queryClient?: QueryClient;
};

export function OneClickForm({
  credentialRequests,
  credentials,
  schema,
  options,
  renderExtra,
  queryClient: _queryClient,
}: OneClickFormProps) {
  // Configure a React Query client to handle requests client side only,
  // it supports SSR as well but is not the focus.
  const [queryClient] = useState(
    () =>
      _queryClient ??
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

  return (
    <OneClickFormOptionsProvider options={options}>
      <QueryClientProvider client={queryClient}>
        <CredentialsDisplayProvider
          value={{
            credentialRequests: credentialRequests as any[],
            credentials: credentials as any[],
            schema,
          }}
        >
          <CredentialsDisplay />
          {renderExtra}
        </CredentialsDisplayProvider>
      </QueryClientProvider>
    </OneClickFormOptionsProvider>
  );
}
