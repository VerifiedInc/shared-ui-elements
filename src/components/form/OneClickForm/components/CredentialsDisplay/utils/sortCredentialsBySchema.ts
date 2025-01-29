import { Credentials } from '../types';
import { extractTypesFromSchema } from '../utils/extractTypesFromSchema';

export const sortCredentialsBySchema = (
  credential: Credentials,
  schema: any,
) => {
  return (a: Credentials, b: Credentials) => {
    const currentSchema = schema[credential.type] as any;
    const types: string[] = extractTypesFromSchema(currentSchema);
    return types.indexOf(a.type) - types.indexOf(b.type);
  };
};
