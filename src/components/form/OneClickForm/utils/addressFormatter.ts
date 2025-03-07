/**
 * A mapping of ISO 3166-1 alpha-2 country codes to country names.
 * For now, the only one we care about is the US, but we will want to add more in the future.
 */
const countryCodeMapping: Record<string, string> = {
  US: 'United States',
};

/**
 * Parses a country code into a country name.
 * @param {string} code the country code
 * @returns {string} the country name. If the country code is not found, the country code is returned.
 */
export const parseCountryCode = (code: string): string => {
  const countryName = countryCodeMapping[code];

  if (countryName) {
    return countryName;
  }

  return code;
};

/**
 * Formats an address value.
 * @param {string} rawValue the raw address value in the format street, city, ISO 3166-2code postalcode
 * @returns {string} the formatted address value in the format street\n city, region, postalcode\n country
 * @deprecated Use toUSaddress and fromUSAddress instead
 */
export const addressFormatter = (rawValue: string) => {
  const parts = rawValue.split(',');
  // split the address into street, city, and iso3166CodeAndPostalCode
  const street = parts
    .slice(0, parts.length - 2)
    .join(',')
    .trim();
  const city = parts[parts.length - 2].trim();
  const iso3166CodeAndPostalCode = parts[parts.length - 1].trim();

  // split the iso3166CodeAndPostalCode into iso3166Code and postalCode
  // postal codes in some countries (e.g. the UK) can have spaces in them, so we need to join them back together
  const [iso3166Code, ...postalCodes] = iso3166CodeAndPostalCode.split(' ');
  const postalCode = postalCodes.join(' ');

  // split the countryRegion into country and region codes
  const [countryCode, region] = iso3166Code.split('-');

  const countryName = parseCountryCode(countryCode);

  const formattedValue = `${street}\n${city}, ${region}, ${postalCode}\n${countryName}`;
  return formattedValue;
};

/**
 * Formats an address to U.S format.
 * @param {string} address the address value in the format: street number street name city, state, zipCode.
 * @returns {string} the formatted address value in the format: line1, city, state, country(optional), zipCode.
 * @returns {null} if the address parts are invalid
 */
export const toUSaddress = (parts: {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}): string | null => {
  const { line1, line2, city, state, zipCode, country } = parts;

  // Validate required fields
  if (!line1 || !city || !state || !zipCode) {
    return null;
  }

  // Validate state format (should be 2 uppercase letters)
  if (!/^[A-Z]{2}$/.test(state)) {
    return null;
  }

  // Format address line (line1, city, state, country(optional), zipCode)
  const addressLine = `${line1}${line2 ? `, ${line2}` : ''}, ${city}, ${state}${country ? `, ${country}` : ''}, ${zipCode}`;

  return addressLine;
};

/**
 * Formats an address to U.S format (pretty).
 * @param {string} address the address value in the format: street number street name city, state, zipCode.
 * @returns {string} the formatted address value in the format: line1, city, state, country(optional), zipCode.
 * @returns {null} if the address parts are invalid
 */
export const toUSaddressPretty = (parts: {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}): string | null => {
  const { line1, line2, city, state, zipCode, country } = parts;

  // Validate required fields
  if (!line1 || !city || !state || !zipCode) {
    return null;
  }

  // Validate state format (should be 2 uppercase letters)
  if (!/^[A-Z]{2}$/.test(state)) {
    return null;
  }

  // Format address line (line1, city, state, country(optional), zipCode)
  const firstLine = `${line1}${line2 ? `, ${line2}` : ''}\n`;
  const secondLine = `${city}, ${state}${country ? `, ${country}` : ''} ${zipCode}`;

  return `${firstLine}${secondLine}`;
};

/**
 * Parses a US formatted address string back into its component parts.
 * Expected format: "line1, city, state, country(optional), zipCode"
 *
 * @param {string} formattedAddress The formatted address string
 * @returns Object containing the address parts or null if parsing fails
 */
export const fromUSAddress = (
  formattedAddress: string,
): {
  line1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country: string;
} | null => {
  // Initialize address parts with default country
  const addressParts: {
    line1?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country: string;
  } = {
    country: 'US',
  };

  try {
    // Split the address by commas
    const parts = formattedAddress.split(',').map((part) => part.trim());

    // Extract address components
    // The pattern is: line1, city, state, zipCode OR line1, city, state, country, zipCode

    if (!parts[0]) return addressParts;
    addressParts.line1 = parts[0];

    if (!parts[1]) return addressParts;
    addressParts.city = parts[1];

    // Check if state has the format of 2 uppercase letters
    const statePattern = /^[A-Z]{2}$/;
    if (statePattern.test(parts[2])) {
      addressParts.state = parts[2];

      // If we have 5 parts, then format is line1, city, state, country, zipCode
      if (parts.length >= 5) {
        // Country is part[3] (optional)
        addressParts.zipCode = parts[parts.length - 1];
      } else {
        // Format is line1, city, state, zipCode
        addressParts.zipCode = parts[3];
      }
    }

    return addressParts;
  } catch (error) {
    return addressParts;
  }
};
