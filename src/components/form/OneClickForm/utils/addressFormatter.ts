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
