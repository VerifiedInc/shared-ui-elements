import { type MandatoryEnum } from './mandatoryEnum';

export interface CredentialRequests {
  type: string;
  issuers?: string[];
  required?: boolean;
  mandatory?: MandatoryEnum;
  description?: string;
  allowUserInput?: boolean;
  multi?: boolean;
  // Return the legal first name our providers hold, even when the end-user typed a nickname the
  // provider also holds. Only acted on for a FirstNameCredential entry, the same way `multi` is
  // only acted on for AddressCredential. Absent means off.
  autofillLegalFirstName?: boolean;
  children?: CredentialRequests[];
}

export interface CredentialRequestsWithNew {
  type: string;
  issuers?: string[];
  required?: boolean;
  mandatory?: MandatoryEnum;
  description?: string;
  allowUserInput?: boolean;
  multi?: boolean;
  autofillLegalFirstName?: boolean;
  children?: CredentialRequestsWithNew[];
  isNew?: boolean;
}

export interface CredentialRequestsEditorForm {
  credentialRequests: CredentialRequestsWithNew[];
}
