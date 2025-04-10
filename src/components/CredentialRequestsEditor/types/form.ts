import { type MandatoryEnum } from '@verifiedinc/constants';
import { CredentialRequest as CredentialRequests } from '@verifiedinc/constants';

export type { CredentialRequests };

export interface CredentialRequestsWithNew {
  type: string;
  issuers?: string[];
  required?: boolean;
  mandatory?: MandatoryEnum;
  description?: string;
  allowUserInput?: boolean;
  multi?: boolean;
  children?: CredentialRequestsWithNew[];
  isNew?: boolean;
}

export interface CredentialRequestsEditorForm {
  credentialRequests: CredentialRequestsWithNew[];
}
