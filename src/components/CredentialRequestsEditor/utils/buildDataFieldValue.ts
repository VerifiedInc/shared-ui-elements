import _ from 'lodash';
import { type CompositeCredentialSchema } from '../types/compositeCredentialSchema';
import { type CredentialRequestDto } from '../types/credentialRequestDto';
import { type CredentialSchemaDto } from '../types/credentialSchemasDto';
import { MandatoryEnum } from '../types/mandatoryEnum';

const isComposed = (schema: unknown): schema is CompositeCredentialSchema =>
  Object.prototype.hasOwnProperty.call(schema || {}, 'anyOf') ||
  Object.prototype.hasOwnProperty.call(schema || {}, 'allOf');

function extractTypes(
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
      _.some(parentKeys, (k) => ['allOf', 'anyOf', 'oneOf'].includes(k))
    ) {
      result.push(value);
    }

    // If the value is an object or array, recurse into it
    if (_.isObject(value)) {
      extractTypes(value, result, [...parentKeys, key]);
    }
  });

  return result;
}

export function buildDataFieldValue(
  type: string,
  schema: CredentialSchemaDto['schemas'],
): CredentialRequestDto {
  const selectedSchema = schema[type];
  const isComposedSchema = isComposed(selectedSchema);

  if (isComposedSchema) {
    return {
      type,
      mandatory: MandatoryEnum.NO,
      description: '',
      allowUserInput: true,
      children: extractTypes(selectedSchema).map((item) =>
        buildDataFieldValue(item, schema),
      ),
    };
  }

  return {
    type,
    mandatory: MandatoryEnum.NO,
    description: '',
    allowUserInput: true,
  };
}