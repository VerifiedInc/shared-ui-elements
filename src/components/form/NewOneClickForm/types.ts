export type Credential = {
  uuid: string;
  type: string;
  value: Record<string, any>;
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
