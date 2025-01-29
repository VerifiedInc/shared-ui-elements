import { when } from '../../../utils/when';

// Define different separator based on credentials type.
export const getCredentialSeparator = (type: string | undefined) => {
  return when(type, {
    AddressCredential: () => ', ',
    EmployerCredential: () => '; ',
    else: () => ' ',
  });
};
