export type Credential = {
  id: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  issuanceDate: string;
  expirationDate: string | null;
  issuerUuid: string;
  data: Record<string, any> | Credential[];
};

export type CredentialRequestObject = {
  allowUserInput?: boolean;
  mandatory?: 'yes' | 'no' | 'if_available';
  multi?: boolean;
  type: string;
  description?: string;
  children?: CredentialRequestObject[];
};

export type CredentialRequest = CredentialRequestObject | string;
