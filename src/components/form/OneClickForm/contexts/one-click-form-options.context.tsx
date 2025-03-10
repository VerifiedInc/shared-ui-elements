import { createContext, ReactElement, ReactNode, useContext } from 'react';

type OneClickOptionFeatures = {
  googlePlacesApiKey?: string;
  selectableCredentials?: boolean;
  phoneCredentialWhitelist?: string[];
  phoneCredentialRegexWhitelist?: string;
  /** Array of field names that can be filled by query params. Use '*' to allow all fields. */
  fillEmptyByQueryParam?: string[];
};

type OneClickOptionServicePaths = {
  credentialImagePath: string;
};

type OneClickOptionApiKeys = {
  googlePlacesApiKey?: string;
};

export type OneClickFormOptions = {
  features: OneClickOptionFeatures;
  servicePaths: OneClickOptionServicePaths;
  apiKeys: OneClickOptionApiKeys;
};

type OneClickFormOptionsContext = {
  options: OneClickFormOptions;
};

type OneClickFormOptionsProviderProps = {
  children: ReactNode;
  options: OneClickFormOptions;
};

const Context = createContext<OneClickFormOptionsContext | null>(null);

export function useOneClickFormOptions(): OneClickFormOptionsContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'useOneClickFormOptions must be used within a OneClickFormOptionsProvider',
    );
  }

  return context;
}

/**
 * Provider for 1-click form that should provide options to be accessed by deep react modules.
 * @param props
 * @constructor
 */
export function OneClickFormOptionsProvider(
  props: OneClickFormOptionsProviderProps,
): ReactElement {
  const { selectableCredentials = true } = props.options.features;
  return (
    <Context.Provider
      value={{
        options: {
          ...props.options,
          features: { ...props.options.features, selectableCredentials },
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
