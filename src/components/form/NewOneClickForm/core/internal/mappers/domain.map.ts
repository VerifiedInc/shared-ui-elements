import { Credential } from '../../../types';

import { credentialKeys } from '../../fields';

// Use this function to map to the form domain including any necessary fields in here
export function toDomainCredentials(credentials: Credential[]) {
  return credentials
    .map((credential) => {
      if (credential.type === credentialKeys.healthInsurance) {
        return {
          ...credential,
          value: credential.value.map((item: Record<string, unknown>) => ({
            ...item,
            selected: true,
          })),
        };
      }
      return credential;
    })
    .filter(Boolean) as Credential[];
}
