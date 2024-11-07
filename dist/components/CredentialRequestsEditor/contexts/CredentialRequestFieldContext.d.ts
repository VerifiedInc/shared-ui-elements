import { default as React, PropsWithChildren } from 'react';
import { FieldArrayWithId, UseFieldArrayReturn } from 'react-hook-form';
import { CredentialRequestsEditorForm } from '../types/form';
type CredentialRequestFieldContext = PropsWithChildren & {
    path: string | undefined;
    field: FieldArrayWithId<CredentialRequestsEditorForm, 'credentialRequests'>;
    fieldArray: UseFieldArrayReturn<CredentialRequestsEditorForm, 'credentialRequests'>;
    index: number;
    level: number;
    onAllFieldsDelete: () => void;
};
export declare const useCredentialRequestField: () => CredentialRequestFieldContext | null;
export declare function CredentialRequestFieldProvider({ children, ...props }: CredentialRequestFieldContext): React.JSX.Element;
export {};
