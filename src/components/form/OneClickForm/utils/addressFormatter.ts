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
 * @param {string} rawValue the raw address value in the format street, city, ISO 3166-2 alpha-2 code postalcode
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
 * @returns {string} with available parts if some fields are missing
 */
export const toUSaddress = (parts: {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}): string => {
  const { line1, line2, city, state, zipCode, country } = parts;

  // Array to hold available address components
  const addressComponents: string[] = [];

  // Add line1 if available
  if (line1?.trim()) {
    addressComponents.push(line1.trim());
  }

  // Add line2 if available
  if (line2?.trim()) {
    addressComponents.push(line2.trim());
  }

  // Process city component
  if (city?.trim()) {
    addressComponents.push(city.trim());
  }

  // Process state component if valid
  if (state?.trim()) {
    // Add state only if it's in the expected format or just use it as-is
    addressComponents.push(state.trim());
  }

  // Process country if available
  if (country?.trim()) {
    addressComponents.push(country.trim());
  }

  const partsString = addressComponents.join(', ');

  // Process zip code if available
  if (zipCode?.trim()) {
    return partsString.concat(' ', zipCode.trim());
  }

  return partsString;
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
  const partsString = toUSaddress(parts);
  const commaIndex = partsString.indexOf(', ');
  const secondCommaIndex = partsString.indexOf(', ', commaIndex + 2);

  if (parts.line2 && commaIndex !== -1 && secondCommaIndex !== -1) {
    // Replace the second comma with a breakline
    return (
      partsString.substring(0, secondCommaIndex) +
      '\n' +
      partsString.substring(secondCommaIndex + 2)
    );
  }

  return partsString;
};

/**
 * Parses a US formatted address string back into its component parts.
 * Expected format: "street address, city, state zipCode"
 * Example: "5320 Newell Rd, Palo Alto, CA 94303"
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
  if (!formattedAddress) return null;

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
    addressParts.city = parts[1]; // City

    if (!parts[2]) return addressParts;

    // Handle the last part which contains "state zipCode" format
    const lastPart = parts[2];

    // Try to extract state ISO 3166-2 alpha-2 and zip code
    // Format: "CA 94303"
    const stateZipMatch = lastPart.match(/^([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/);

    if (stateZipMatch) {
      // If the last part matches "CA 94303" format
      addressParts.state = stateZipMatch[1]; // State (e.g., "CA")
      addressParts.zipCode = stateZipMatch[2]; // Zip code (e.g., "94303")
    } else {
      // Fallback to legacy format support
      const statePattern = /^[A-Z]{2}$/;
      if (statePattern.test(parts[2])) {
        addressParts.state = parts[2];

        // If we have more parts, handle zip code from the last part
        if (parts.length > 3) {
          addressParts.zipCode = parts[parts.length - 1];
        }
      } else {
        // Try to extract zip code from the end of the last part
        const zipMatch = lastPart.match(/(\d{5}(?:-\d{4})?)$/);

        if (zipMatch) {
          addressParts.zipCode = zipMatch[0];

          // Extract state by removing the zip code
          const stateText = lastPart.replace(zipMatch[0], '').trim();
          // Ensure state is a 2-letter code ISO 3166-2 alpha-2 (e.g., "CA")
          if (statePattern.test(stateText)) {
            addressParts.state = stateText;
          }
        }
      }
    }

    return addressParts;
  } catch (error) {
    return addressParts;
  }
};
