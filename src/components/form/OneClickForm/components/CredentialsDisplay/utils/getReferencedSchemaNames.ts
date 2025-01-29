/**
 * Extracts and returns schema names (i.e., $id or $ref properties) from a given input schema.
 *
 * @param {Object} schema - The input schema object.
 * @param {number} [desiredDepth=1] - The maximum depth to search within the schema.
 * @returns {string[]} An array of schema names.
 */
export const getReferencedSchemaNames = (schema: any, desiredDepth = 1) => {
  // An array to store the collected schema names.
  const ids: string[] = [];

  /**
   * Recursively traverse the schema to find schema names.
   *
   * @param {Object} schema - The current schema object to examine.
   * @param {boolean} [shouldIgnore=true] - Flag to ignore schema names in the current context.
   * @param {number} [depth=0] - The depth level of the current schema object in the schema tree.
   */
  function findIdsInSchema(schema: any, shouldIgnore = true, depth = 0) {
    // Keys used to reference other schemas
    const keys = ['anyOf', 'allOf', 'oneOf'];

    // Check if the schema includes any of the reference keys
    const includeKeys = (schema: any) =>
      Object.keys(schema).some((key) => keys.includes(key));

    // If schema names are not ignored, collect them
    if (!shouldIgnore) {
      if (schema.$id || schema.$ref) {
        ids.push(schema.$id || schema.$ref);
      }
    }

    // If the schema includes reference keys, explore them
    if (includeKeys(schema)) {
      keys.forEach((key) => {
        if (!schema[key]) return;

        const value = schema[key];

        if (Array.isArray(value)) {
          value.forEach((value) => {
            // If depth exceeds the desired depth, skip further processing
            if (depth > desiredDepth) return;

            // Recursively search for schema names in the sub-schemas
            findIdsInSchema(value, false, depth + 1);
          });
        } else {
          // Recursively search for schema names in the sub-schema
          findIdsInSchema(value, false, depth);
        }
      });
    }
  }

  // Start the schema name extraction by calling the inner function.
  findIdsInSchema(schema);

  return ids;
};
