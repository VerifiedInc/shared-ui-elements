export type CreatedPatchedCredential = {
  uuid: string;
  type: string;
  value: Record<string, any>;
};

export type ShareCredentialsResult = {
  uuid: string;
  fields?: string[];
};

export const toShareCredentials = {
  toShareCredentials: (
    credentials: CreatedPatchedCredential[],
  ): ShareCredentialsResult[] => {
    return credentials.map((credential) => {
      const result: ShareCredentialsResult = { uuid: credential.uuid };

      const dotNotation = (key: string[]): string => {
        return key.join('.');
      };

      const fieldsRecursivelyDotNotation = (
        value: Record<string, any>,
        currentPath: string[] = [],
      ): string[] => {
        return Object.entries(value).flatMap(([key, value]) => {
          const fullPath = [...currentPath, key];
          if (
            typeof value === 'object' &&
            value !== null &&
            Object.keys(value).length > 0
          ) {
            return fieldsRecursivelyDotNotation(value, fullPath);
          }
          return [dotNotation(fullPath)];
        });
      };

      if (typeof credential.value === 'object' && credential.value !== null) {
        result.fields = fieldsRecursivelyDotNotation(credential.value);
      }

      return result;
    });
  },
};
