import { createContext, ReactNode, useContext } from 'react';

type OneClickOptionFeatures = {
  selectableCredentials?: boolean;
  phoneCredentialWhitelist?: string[];
  phoneCredentialRegexWhitelist?: string;
};

type OneClickOptionServicePaths = {
  credentialImagePath: string;
};

export type OneClickFormOptions = {
  features: OneClickOptionFeatures;
  servicePaths: OneClickOptionServicePaths;
};

type OneClickFormOptionsContext = {
  options: OneClickFormOptions;
};

type OneClickFormOptionsProviderProps = {
  children: ReactNode;
  options: OneClickFormOptions;
};

const Context = createContext<OneClickFormOptionsContext | null>(null);

export function useOneClickFormOptions() {
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
) {
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
