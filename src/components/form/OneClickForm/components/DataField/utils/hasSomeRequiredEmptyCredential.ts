import { CredentialDisplayInfo } from '../../CredentialsDisplay/types';
import { isRequiredCredentialDisplayInfo } from '../../CredentialsDisplay/utils';

export function hasSomeRequiredEmptyCredential(
  credentialDisplayInfo: CredentialDisplayInfo,
): boolean {
  const isRequired = isRequiredCredentialDisplayInfo({
    mandatory: credentialDisplayInfo.credentialRequest?.mandatory,
  });

  if (Array.isArray(credentialDisplayInfo.children)) {
    return credentialDisplayInfo.children.some(
      (credentialDisplayInfo: CredentialDisplayInfo) =>
        hasSomeRequiredEmptyCredential(credentialDisplayInfo),
    );
  }

  return isRequired && !credentialDisplayInfo.value.length;
}
