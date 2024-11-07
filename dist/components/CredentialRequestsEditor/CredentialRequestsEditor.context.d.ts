import { ReactNode } from 'react';
import { CredentialRequests, CredentialRequestsWithNew } from './types/form';
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
    onChange: (credentialRequests: CredentialRequests[]) => void;
    features?: CredentialRequestsEditorFeatures;
}
export interface CredentialRequestsEditorContext {
    addButtonText?: string;
    schemas: Record<string, any>;
    features?: CredentialRequestsEditorFeatures;
}
export declare function useCredentialRequestsEditor(): CredentialRequestsEditorContext;
export declare function CredentialRequestsEditorProvider(props: CredentialRequestsEditorProps): React.JSX.Element;
