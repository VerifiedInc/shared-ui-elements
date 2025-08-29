// Not all credential type are here because is not needed to,
// because it is being used currently to make conditional renderings for the data fields.
export const credentialTypes = {
  SSNCredential: 'SSNCredential',
  FullNameCredential: 'FullNameCredential',
  AddressCredential: 'AddressCredential',
  Line2Credential: 'Line2Credential',
  PhoneCredential: 'PhoneCredential',
  BirthDateCredential: 'BirthDateCredential',
  GovernmentIdDocumentImageCredential: 'GovernmentIdDocumentImageCredential',
} as const;
