// TODO - replace any

export type Credentials = Record<string, any>;

export type CredentialRequests = {
  type: string;
  issuers?: string[];
  required?: boolean;
  mandatory?: 'yes' | 'no' | 'if_available';
  description?: string;
  allowUserInput?: boolean;
  children?: CredentialRequests[];
};

export type CredentialSchemas = Record<string, any>;
