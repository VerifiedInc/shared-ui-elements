import { uuidV4Regex } from './regex';

// This pattern will split camel cased string out of the credential,
// when a camel word contain a sequence of uppercase character it is kept to maintain consistency of that word.
const schemaNamePattern = /([A-Z][a-z0-9]+)/gm;

export const stringUtils = {
  /**
   * Capitalizes the first letter of every word in a string.
   * Deliminator is space char `' '`.
   */
  capitalizeAll: function (str: string) {
    return str
      .split(' ')
      .map(
        (substr) =>
          `${substr.charAt(0).toUpperCase()}${substr.slice(1).toLowerCase()}`,
      )
      .join(' ');
  },

  /**
   * Capitalizes the first letter of a string.
   */
  capitalize: function (str: string) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
  },

  camelCase: function (str: string) {
    const [firstLetter, ...rest] = str;
    return firstLetter.toLowerCase() + rest.join('');
  },

  // Format the camel cased text to a human-readable.
  prettifyCamelCase: (field: string) =>
    field
      .split(schemaNamePattern)
      .filter((e) => e)
      .join(' '),

  replaceUuidWithPlaceholder(pathname: string, placeholder = ':uuid') {
    // Replace UUIDs with placeholder
    return pathname.replace(uuidV4Regex, placeholder);
  },
};
