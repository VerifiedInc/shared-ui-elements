import React, {
  createContext,
  type PropsWithChildren,
  useContext,
} from 'react';
import {
  type FieldArrayWithId,
  type UseFieldArrayReturn,
} from 'react-hook-form';
import type { CredentialRequestsEditorForm } from '../types/form';

type CredentialRequestFieldContext = PropsWithChildren & {
  path: string | undefined;
  field: FieldArrayWithId<CredentialRequestsEditorForm, 'credentialRequests'>;
  fieldArray: UseFieldArrayReturn<
    CredentialRequestsEditorForm,
    'credentialRequests'
  >;
  index: number;
  level: number;
  onAllFieldsDelete: () => void;
};

const Context = createContext<CredentialRequestFieldContext | null>(null);

export const useCredentialRequestField =
  (): CredentialRequestFieldContext | null => {
    return useContext(Context);
  };

export function CredentialRequestFieldProvider({
  children,
  ...props
}: CredentialRequestFieldContext): React.JSX.Element {
  return <Context.Provider value={props}>{children}</Context.Provider>;
}
