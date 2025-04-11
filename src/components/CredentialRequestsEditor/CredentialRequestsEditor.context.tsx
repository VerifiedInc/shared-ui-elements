import { createContext, type ReactNode, useContext, useEffect } from 'react';
import { FormProvider, useForm, type WatchObserver } from 'react-hook-form';
import debounce from 'lodash/debounce';

import { omitProperties } from '../../utils/omitProperty';

import {
  type CredentialRequests,
  type CredentialRequestsEditorForm,
  type CredentialRequestsWithNew,
} from './types/form';
import { SDKIntegrationType } from './types/sdk';

export interface CredentialRequestsEditorFeatures {
  allowUserInput?: {
    disabled?: boolean;
  };
  description?: {
    disabled?: boolean;
  };
  mandatory?: {
    disabled?: boolean;
  };
  multi?: {
    disabled?: boolean;
  };
}

export interface CredentialRequestsEditorProps {
  addButtonText?: string;
  credentialRequests: CredentialRequestsWithNew[];
  schemas: Record<string, any>;
  children: ReactNode;
  integrationType: SDKIntegrationType;
  riskSignals: 'none' | 'basic' | 'advanced';
  onChange: (credentialRequests: CredentialRequests[]) => void;
  features?: CredentialRequestsEditorFeatures;
}

export interface CredentialRequestsEditorContext {
  addButtonText?: string;
  riskSignals: 'none' | 'basic' | 'advanced';
  schemas: Record<string, any>;
  features?: CredentialRequestsEditorFeatures;
  integrationType: SDKIntegrationType;
}

const Context = createContext<CredentialRequestsEditorContext | null>(null);

export function useCredentialRequestsEditor(): CredentialRequestsEditorContext {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      'useCredentialRequestsEditor must be used within a CredentialRequestsEditorProvider',
    );
  }
  return context;
}

export function CredentialRequestsEditorProvider(
  props: CredentialRequestsEditorProps,
): React.JSX.Element {
  const form = useForm<CredentialRequestsEditorForm>({
    defaultValues: { credentialRequests: props.credentialRequests },
  });

  // Listen to credentialRequests changes and call onChange event
  useEffect(() => {
    // Debouncing the watch observer to prevent multiple calls in a short period of time since it may dispatch child object change plus the property change
    const debouncedWatchObserver = debounce<
      WatchObserver<CredentialRequestsEditorForm>
    >((data, { name, type }) => {
      if (data.credentialRequests) {
        const credentialRequestsData = data.credentialRequests.filter(
          (credentialRequest) => !!credentialRequest?.type,
        );

        props.onChange(
          omitProperties(credentialRequestsData, [
            'isNew',
            'id',
          ]) as CredentialRequests[],
        );
      }
    }, 100);
    const subscription = form.watch(debouncedWatchObserver);
    return subscription.unsubscribe;
  }, [form.watch]);

  return (
    <FormProvider {...form}>
      <Context.Provider
        value={{
          addButtonText: props.addButtonText,
          riskSignals: props.riskSignals,
          schemas: props.schemas,
          features: props.features,
          integrationType: props.integrationType,
        }}
      >
        {props.children}
      </Context.Provider>
    </FormProvider>
  );
}
