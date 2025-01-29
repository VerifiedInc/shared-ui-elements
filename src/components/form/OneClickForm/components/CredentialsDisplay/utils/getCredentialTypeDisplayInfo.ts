import { CredentialTypeDisplayInfo } from '../types';

import { stringUtils } from '../../../utils/string';
import { isAtomicBySchema } from '../../../utils/isAtomicBySchema';
import { isCompositeBySchema } from '../../../utils/isCompositeBySchema';

/**
 * Gets credential type display info from the schema, it will tell the behavior for the given credential type.
 * @param {any} schema the schema to get the display info from
 * @param {string} type the credential type to get the display info for
 * @returns {CredentialTypeDisplayInfo} the display info for the credential type
 */
export const getCredentialTypeDisplayInfo = (
  schema: any,
  type: string,
): CredentialTypeDisplayInfo => {
  // for now, we can assume that the schema will always have a schemas property
  if (!schema) {
    const message = 'schema must be defined';
    console.error(message);
    throw new Error(message);
  }

  // find the credential schema that matches the type
  const [, schemaMatch] = Object.entries(schema).find(
    ([key]: any) => key === type,
  ) as unknown as any;

  // for now, assume there will always be a matching schema
  if (!schemaMatch) {
    const message = `Schema for ${type} not found`;
    console.error(message);
    throw new Error(message);
  }

  let property: any | undefined;

  if (isAtomicBySchema(schemaMatch)) {
    property = Object.values(schemaMatch.properties)[0];
  }
  if (isCompositeBySchema(schemaMatch)) {
    const matchProperty = (
      (schemaMatch as any).allOf ||
      schemaMatch.anyOf ||
      []
    ).find((schema: any) => schema?.properties !== undefined);

    // Composite credentials have no title nor display format and type, so it have to create the data.
    property = {
      ...(Object.values(matchProperty?.properties ?? {})[0] as any),
      title: stringUtils.prettifyCamelCase(
        schemaMatch.$id.replace('Credential', ''),
      ),
    };
  }

  return {
    type,
    label: property?.title as string,
    displayFormat: property?.displayFormat,
    schema: schemaMatch,
  };
};
