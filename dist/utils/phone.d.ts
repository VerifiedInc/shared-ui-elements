interface CountryData {
    countryName: string;
    countryCode: string;
    emoji: string;
    mask: string;
}
export declare const countries: CountryData[];
export declare function parseToPhoneNational(internationalPhone: string): string;
/**
 * Get phone data by the international phone string.
 * @param internationalPhone
 */
export declare function getPhoneData(internationalPhone: string): CountryData | undefined;
/**
 * Get phone data by property and value match.
 * @param fieldName
 * @param value
 */
export declare function getPhoneDataByFieldName(fieldName: keyof CountryData, value: string): CountryData | undefined;
/**
 * Helper to sort countries by country name.
 * @param a
 * @param b
 */
export declare const sortByCountryName: (a: CountryData, b: CountryData) => number;
/**
 * Validate phone when it is valid and contains a country.
 * @param internationalPhone
 */
export declare const validatePhone: (internationalPhone: string) => boolean;
export {};
