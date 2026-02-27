import { Credential } from '../../../types';

// Use this function to map to the form domain including any necessary fields in here
export function toDomainCredentials(credentials: Credential[]) {
  return credentials.filter(Boolean);
}
