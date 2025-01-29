import _ from 'lodash';

import { CredentialFieldSet } from '../types';
import { isAtomicBySchema } from '../../../utils/isAtomicBySchema';
import { isCompositeBySchema } from '../../../utils/isCompositeBySchema';

/**
 * Returns the correct schema property based on the values for the related credential.
 * @param schema
 * @param credentialDisplayInfo
 */
export const findCorrectSchemaProperty = (
  schema: any | undefined,
  schemas: any,
  fieldSet?: CredentialFieldSet,
): any | undefined => {
  let matchProperty: Record<string, any> | undefined;

  if (isAtomicBySchema(schema) && schema.if) {
    // Get the related property name to look for in schemas.
    const fieldName = Object.keys(schema.if?.properties)[0];
    const fieldValue = schema.if?.properties[fieldName].const;

    // Find in schemas the one that contains properties and fieldName variable.
    const credentialName = _.chain(_.toArray(schemas))
      .find((schema) => {
        if (isCompositeBySchema(schema)) {
          return !!_.find([schema.anyOf, schema.oneOf], (item) =>
            _.find(item, (i) => _.get(i, `properties.${fieldName}`)),
          );
        }

        return !!_.get(schema, `properties.${fieldName}`);
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .get('$id')
      .value();

    const lookUpCredential = (
      matcher: string,
      fieldSet?: CredentialFieldSet,
    ): CredentialFieldSet | undefined => {
      if (!fieldSet) return;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, value, credentialDisplayInfo, ...fields } = fieldSet;

      // If current node matches, return its credentialDisplayInfo
      if (credentialDisplayInfo?.credentialRequest?.type === matcher) {
        return fieldSet;
      }

      if (Object.values(fields).length === 0) return;

      // Look through child fields for a match
      return Object.values(fields).find((childFieldSet) => {
        return lookUpCredential(matcher, childFieldSet);
      });
    };

    const matchCredential = lookUpCredential(credentialName, fieldSet);

    if (matchCredential?.value === fieldValue) {
      matchProperty = schema.then.properties;
    }
  }

  if (isCompositeBySchema(schema)) {
    // Find the atomic schema properties from the composite schema.
    matchProperty = _.chain(schema.anyOf || schema.oneOf)
      .find((o: any) => o?.allOf === undefined)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .get('properties')
      .value();

    // When there are no match property it means the credential is only composite.
    if (!matchProperty) {
      return;
    }
  }

  // When there are no match from the composite find, we presume it is an atomic.
  if (!matchProperty && isAtomicBySchema(schema)) {
    matchProperty = schema.properties;
  }

  // This should never happen, once the properties must be captured from composite or atomic schema.
  if (!matchProperty) throw new Error('Schema is not defined.');

  return Object.values(matchProperty)[0];
};
