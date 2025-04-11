/**
 * Represents the information to display for a single credential.
 */

export enum MandatoryEnum {
  YES = 'yes',
  NO = 'no',
  IF_AVAILABLE = 'if_available',
}

export interface CredentialDisplayInfo {
  id: string;
  label?: string | undefined;
  value: string;
  displayFormat?: string | undefined;
  isNewCredential: boolean;
  children?: CredentialDisplayInfo[] | undefined;
  credential: Credentials;
  credentialRequest: Omit<any, 'children' | 'issuers'>;
  schema?: any;
  instances: CredentialDisplayInfo[];
  originalInstance: CredentialDisplayInfo | null;
  uiState: CredentialDisplayInfoUIState;
}

/**
 * Represents the state to manage a single credential behavior on UI.
 */
export interface CredentialDisplayInfoUIState {
  isEditMode: boolean;
  isChecked: boolean;
  isValid: boolean;
  isDirty: boolean;
  errorMessage: string | null;
}

/**
 * Represents the information needed to display credential(s) of a specific type.
 */
export interface CredentialTypeDisplayInfo {
  displayFormat?: string;
  label: string;
  type: string;
  schema: any;
}

export interface CredentialRequests {
  type: string;
  mandatory?: MandatoryEnum | undefined;
  description?: string | undefined;
  allowUserInput?: boolean | undefined;
  children?: CredentialRequests[] | undefined;
  multi?: boolean | undefined;
}

export interface Credentials {
  uuid: string;
  id: string;
  type: string;
  data: Record<string, any> | Array<Record<string, any>>;
  createdAt: number;
  updatedAt: number;
  verificationMethod?: string;
}

export interface CredentialField {
  id: string;
  value: string;
  credentialDisplayInfo: CredentialDisplayInfo;
  type: string;
}

export type CredentialFieldSet = CredentialField & {
  [key: string]: CredentialFieldSet;
};
