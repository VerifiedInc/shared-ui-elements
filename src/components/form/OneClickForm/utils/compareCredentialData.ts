import _ from 'lodash';

// Compare credentials based on the data property, if they are equal, they will return true.
export const compareCredentialData = (a: any, b: any): boolean => {
  // Map credential in any depth of data to return just the data value.
  const mapData = (credential: any): any => {
    if (Array.isArray(credential.data)) {
      return credential.data.map(mapData);
    }
    return Object.values(credential.data)[0];
  };

  const aCredential = mapData(a);
  const bCredential = mapData(b);

  return _.isEqual(aCredential, bCredential);
};
