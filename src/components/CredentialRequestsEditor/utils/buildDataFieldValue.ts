import _ from 'lodash';
import { type CompositeCredentialSchema } from '../types/compositeCredentialSchema';
import { CredentialRequests } from '../types/form';
import { type CredentialSchemaDto } from '../types/credentialSchemasDto';
import { MandatoryEnum } from '@verifiedinc/constants';

const isComposed = (schema: unknown): schema is CompositeCredentialSchema =>
  Object.prototype.hasOwnProperty.call(schema || {}, 'anyOf') ||
  Object.prototype.hasOwnProperty.call(schema || {}, 'allOf');

function extractTypes(record: any, parentId?: string): string[] {
  const result: string[] = [];

  // Handle direct $id at current level (skip if it matches parent)
  if (record.$id && typeof record.$id === 'string' && record.$id !== parentId) {
    result.push(record.$id);
  }

  // Handle direct $ref at current level
  if (record.$ref && typeof record.$ref === 'string') {
    result.push(record.$ref);
    return result;
  }

  // Process anyOf array - only process direct children
  if (Array.isArray(record.anyOf)) {
    record.anyOf.forEach((schema: any) => {
      if (schema && typeof schema === 'object') {
        // If schema has $id, collect it but don't traverse deeper
        if (schema.$id && typeof schema.$id === 'string') {
          result.push(schema.$id);
        }
        // If schema has $ref, collect it
        else if (schema.$ref && typeof schema.$ref === 'string') {
          result.push(schema.$ref);
        }
        // If no $id or $ref, traverse deeper
        else {
          result.push(...extractTypes(schema, parentId));
        }
      }
    });
  }

  // Process allOf array
  if (Array.isArray(record.allOf)) {
    record.allOf.forEach((schema: any) => {
      if (schema && typeof schema === 'object') {
        if (schema.$ref && typeof schema.$ref === 'string') {
          result.push(schema.$ref);
        } else {
          result.push(...extractTypes(schema, parentId));
        }
      }
    });
  }

  return _.uniq(result);
}

export function buildDataFieldValue(
  type: string,
  schema: CredentialSchemaDto['schemas'],
): CredentialRequests {
  const selectedSchema = schema[type];
  const isComposedSchema = isComposed(selectedSchema);

  if (isComposedSchema) {
    const children = extractTypes(selectedSchema, type)
      .map((item) => buildDataFieldValue(item, schema))
      .filter((child): child is CredentialRequests => child !== null);

    return {
      type,
      mandatory: MandatoryEnum.NO,
      description: '',
      allowUserInput: true,
      multi: false,
      ...(children.length > 0 ? { children } : {}),
    };
  }

  return {
    type,
    mandatory: MandatoryEnum.NO,
    description: '',
    allowUserInput: true,
    multi: type === 'EmailCredential',
  };
}
