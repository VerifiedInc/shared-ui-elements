import { type MandatoryEnum } from '@verifiedinc/core-types';

export interface CredentialRequests {
  type: string;
  issuers?: string[];
  required?: boolean;
  mandatory?: MandatoryEnum;
  description?: string;
  allowUserInput?: boolean;
  children?: CredentialRequests[];
}

export interface CredentialRequestsWithNew {
  type: string;
  issuers?: string[];
  required?: boolean;
  mandatory?: MandatoryEnum;
  description?: string;
  allowUserInput?: boolean;
  children?: CredentialRequestsWithNew[];
  isNew?: boolean;
}

export interface CredentialRequestsEditorForm {
  credentialRequests: CredentialRequestsWithNew[];
}
