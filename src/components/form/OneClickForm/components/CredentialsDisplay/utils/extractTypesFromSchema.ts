import _ from 'lodash';

/**
 * This function extracts all the types from a given schema.
 * It traverses the schema object and collects all the values of '$ref' and '$id' keys.
 * If the '$id' key is found within 'allOf', 'anyOf', or 'oneOf' keys, its value is also collected.
 * The function uses recursion to handle nested objects and arrays within the schema.
 *
 * @param {object} record - The schema object to extract types from.
 * @param {string[]} [result=[]] - An array to store the extracted types. Default is an empty array.
 * @param {string[]} [parentKeys=[]] - An array to store the keys of parent objects during recursion. Default is an empty array.
 * @returns {string[]} - An array of extracted types.
 */
export function extractTypesFromSchema(
  record: any,
  result: string[] = [],
  parentKeys: string[] = [],
): string[] {
  _.forOwn(record, (value, key) => {
    // Check if the current key is $ref or $id and handle accordingly
    if (key === '$ref' && typeof value === 'string') {
      result.push(value);
    } else if (
      key === '$id' &&
      typeof value === 'string' &&
      _.some(parentKeys, (key) => ['allOf', 'anyOf', 'oneOf'].includes(key))
    ) {
      result.push(value);
    }

    // If the value is an object or array, recurse into it
    if (_.isObject(value)) {
      extractTypesFromSchema(value, result, [...parentKeys, key]);
    }
  });

  return result;
}
