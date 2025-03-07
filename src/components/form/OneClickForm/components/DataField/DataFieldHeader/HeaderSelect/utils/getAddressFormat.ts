import { toUSaddress } from '../../../../../utils/addressFormatter';
import { CredentialDisplayInfo } from '../../../../CredentialsDisplay/types';
import { transformToFormObject } from '../../../../CredentialsDisplay/utils';

export function getAddressFormat(
  credentialDisplayInfo: CredentialDisplayInfo,
): string | null {
  const { address } = transformToFormObject([credentialDisplayInfo]);

  return toUSaddress({
    line1: address.line1.value,
    line2: address.line2.value,
    city: address.city.value,
    state: address.state.value,
    zipCode: address.zipCode.value,
    country: address.country.value,
  });
}
