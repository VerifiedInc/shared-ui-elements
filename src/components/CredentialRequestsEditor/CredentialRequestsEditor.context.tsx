import { createContext, type ReactNode, useContext, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { omitProperties } from '../../utils/omitProperty';

import {
  type CredentialRequests,
  type CredentialRequestsEditorForm,
  type CredentialRequestsWithNew,
} from './types/form';

export interface CredentialRequestsEditorProps {
  credentialRequests: CredentialRequestsWithNew[];
  schemas: Record<string, any>;
  children: ReactNode;
  onChange: (credentialRequests: CredentialRequests[]) => void;
}

export interface CredentialRequestsEditorContext {
  schemas: Record<string, any>;
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
    const subscription = form.watch((data, { name, type }) => {
      if (name === 'credentialRequests' && data.credentialRequests) {
        const credentialRequestsData = data.credentialRequests.filter(
          (credentialRequest) => !!credentialRequest?.type,
        );

        props.onChange(
          omitProperties(credentialRequestsData, [
            'isNew',
          ]) as CredentialRequests[],
        );
      }
    });
    return subscription.unsubscribe;
  }, [form.watch]);

  return (
    <FormProvider {...form}>
      <Context.Provider value={{ schemas: props.schemas }}>
        {props.children}
      </Context.Provider>
    </FormProvider>
  );
}
