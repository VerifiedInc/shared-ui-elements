import { type MandatoryEnum } from '@verifiedinc/core-types';

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
