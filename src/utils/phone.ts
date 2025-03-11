import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js';
import find from 'lodash/find';

interface CountryData {
  countryName: string;
  countryCode: string;
  emoji: string;
  mask: string;
}

export const countries: CountryData[] = [
  {
    countryName: 'Canada',
    countryCode: 'CA',
    emoji: '🇨🇦',
    mask: '{+}{1} (000) 000-0000',
  },
  {
    countryName: 'United States',
    countryCode: 'US',
    emoji: '🇺🇸',
    mask: '{+}{1} (000) 000-0000',
  },
  {
    countryName: 'Brazil',
    countryCode: 'BR',
    emoji: '🇧🇷',
    mask: '{+}{55} (00) 00000-0000',
  },
];

export function parseToPhoneNational(internationalPhone: string): string {
  const phoneMeta = parsePhoneNumber(internationalPhone);

  if (!phoneMeta?.country) {
    // If the phone meta couldn't be retrieved, format like us number
    const digitsOnly = internationalPhone.replace(/\D/g, '');
    return `+${phoneMeta?.countryCallingCode} (${digitsOnly.substring(1, 4)}) ${digitsOnly.substring(4, 7)}-${digitsOnly.substring(7)}`;
  }
  return `+${phoneMeta.countryCallingCode} ${phoneMeta.formatNational()}`;
}

/**
 * Get phone data by the international phone string.
 * @param internationalPhone
 */
export function getPhoneData(
  internationalPhone: string,
): CountryData | undefined {
  const phoneMeta = parsePhoneNumber(internationalPhone);
  return countries.find((c) => c.countryCode === phoneMeta?.country);
}

/**
 * Get phone data by property and value match.
 * @param fieldName
 * @param value
 */
export function getPhoneDataByFieldName(
  fieldName: keyof CountryData,
  value: string,
): CountryData | undefined {
  return find(countries, { [fieldName]: value });
}

/**
 * Helper to sort countries by country name.
 * @param a
 * @param b
 */
export const sortByCountryName = (a: CountryData, b: CountryData) =>
  a.countryName.localeCompare(b.countryName);

/**
 * Validate phone when it is valid and contains a country.
 * @param internationalPhone
 */
export const validatePhone = (internationalPhone: string) => {
  const phoneMeta = parsePhoneNumber(internationalPhone);
  return isValidPhoneNumber(internationalPhone) && !!phoneMeta?.country;
};
