import type {
  Credential,
  CredentialRequestObject,
} from '../../../../../src/components/form/NewOneClickForm/types';

import { fields } from '../../../../../src/components/form/NewOneClickForm/core/fields';

export const makeCredential = (
  options: Partial<Credential> & { type: string; value: Credential['value'] },
) => {
  if (!fields[options.type as keyof typeof fields]) {
    throw new Error(`Invalid credential type: ${options.type}`);
  }
  return {
    uuid: options.uuid ?? crypto.randomUUID(),
    type: options.type,
    value: options.value,
  };
};

export const makeCredentialRequest = (
  options: Partial<CredentialRequestObject> & { type: string },
) => {
  return {
    type: options.type,
    children: options.children,
    allowUserInput: options.allowUserInput ?? true,
    mandatory: options.mandatory ?? 'no',
    multi: options.multi ?? false,
    description: options.description,
  };
};
