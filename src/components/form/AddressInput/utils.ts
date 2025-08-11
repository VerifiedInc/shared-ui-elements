/**
 * Returns the autocomplete attribute value based on the type of the field.
 * @param type The type of the field.
 * @returns The autocomplete attribute value.
 */
export function getAutoCompleteAttributeValue(type: string) {
  if (type === 'FirstNameCredential') {
    return 'given-name';
  }
  if (type === 'LastNameCredential') {
    return 'family-name';
  }
  if (type === 'EmailCredential') {
    return 'email';
  }
  if (type === 'PhoneCredential') {
    return 'tel';
  }
  if (type === 'AddressCredential') {
    return 'street-address address-level2 address-level1 postal-code';
  }
  if (type === 'Line2Credential') {
    return 'address-line2';
  }
  return 'off';
}
