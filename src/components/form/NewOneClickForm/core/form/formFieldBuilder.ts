import cloneDeep from 'lodash/cloneDeep';
import { z } from 'zod';

import { type Credential, type CredentialRequestObject } from '../../types';

import { type FieldValueDefinitions } from '../declarations';
import { fieldInputTypes, fields } from '../fields';
import type { BaseFieldDefinition } from '../fields';

import { FormField } from './formField';
import { normalizeCredentialType } from './utils';

export interface CredentialRequestOptions {
  allowUserInput?: boolean;
  mandatory?: 'yes' | 'no' | 'if_available';
  multi?: boolean;
  description?: string;
}

/**
 * Builds a schema-shaped "empty" value for a composite field that has no declared children (e.g.
 * healthInsurance, which is edited as one custom widget rather than per-subfield inputs, so it's
 * intentionally requested without children — see `singleFieldComposites` in formBuilder.ts).
 *
 * Without this, such a field's defaultValue falls back to `undefined` when no credential is
 * available, unlike every other field type (composite-with-children and primitive fields both
 * resolve to a concrete empty value). A component rendering that field then has nothing to bind
 * its inputs to. This walks the field's own zodSchema to produce a real, empty instance instead —
 * generic to any composite-without-children field, not just healthInsurance.
 */
function buildEmptyValueFromZodSchema(schema: z.ZodTypeAny): any {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape as Record<string, z.ZodTypeAny>;
    return Object.fromEntries(
      Object.entries(shape).map(([key, childSchema]) => [
        key,
        buildEmptyValueFromZodSchema(childSchema),
      ]),
    );
  }

  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
    return undefined;
  }

  if (schema instanceof z.ZodEffects) {
    return buildEmptyValueFromZodSchema(schema.innerType());
  }

  if (schema instanceof z.ZodDefault) {
    return schema._def.defaultValue();
  }

  if (schema instanceof z.ZodLiteral) {
    return schema.value;
  }

  if (schema instanceof z.ZodString) {
    return '';
  }

  // Numbers, unions, and anything else: no safe, unambiguous empty value to invent.
  return undefined;
}

export class FormFieldBuilder {
  createFromCredential<
    TFieldKey extends keyof FieldValueDefinitions = keyof FieldValueDefinitions,
  >(
    credential: Credential,
    children?: Record<string, FormField<TFieldKey>>,
    options?: CredentialRequestOptions,
    variants?: Array<FormField<TFieldKey>>,
  ): FormField<TFieldKey> {
    const fieldSchema = fields[credential.type as keyof typeof fields];

    if (!fieldSchema) {
      throw new Error(`Invalid credential type: ${credential.type}`);
    }

    const fieldKey = fieldSchema.key;
    let defaultValue: any;

    // Handle different credential value structures with the new format
    if (fieldSchema.characteristics.inputType === fieldInputTypes.composite) {
      // TODO - check with Leo if the below approach is correct
      // // For composite fields, use the credential's value directly
      // // The value should contain all the composite field data
      // defaultValue =
      //   credential.value && Object.keys(credential.value).length > 0
      //     ? credential.value
      //     : undefined;

      // TODO - check with Leo if the above approach is correct
      // For composite fields, filter the credential's value to only include
      // properties that correspond to the requested children
      if (credential.value && Object.keys(credential.value).length > 0) {
        if (children && Object.keys(children).length > 0) {
          // Only include properties that have corresponding children fields
          const filteredValue: Record<string, any> = {};
          Object.keys(children).forEach((childKey) => {
            if (childKey in credential.value) {
              filteredValue[childKey] = credential.value[childKey];
            }
          });
          defaultValue =
            Object.keys(filteredValue).length > 0 ? filteredValue : undefined;
        } else {
          // For composite fields without children (like healthInsurance),
          // use the entire credential value
          defaultValue = credential.value;
        }
      } else {
        defaultValue = undefined;
      }
    } else {
      // For regular (non-composite) fields, extract the specific field value
      // The credential.value should contain the field data with the fieldKey
      defaultValue = credential.value?.[fieldKey];
    }

    return new FormField(
      credential.uuid,
      defaultValue,
      defaultValue,
      fieldSchema,
      {
        children,
        allowUserInput: options?.allowUserInput ?? true,
        mandatory: options?.mandatory ?? 'no',
        multi: options?.multi ?? false,
        variants,
        description: options?.description,
      },
    );
  }

  createFromSchema(
    requestObj: CredentialRequestObject,
    fieldSchema: BaseFieldDefinition<string>,
  ): FormField {
    let defaultValue: any;
    let finalChildren: Record<string, FormField> | undefined;

    // Extract request options
    const options: CredentialRequestOptions = {
      allowUserInput: requestObj.allowUserInput ?? true,
      mandatory: requestObj.mandatory ?? 'no',
      multi: requestObj.multi ?? false,
      description: requestObj.description,
    };

    // For composite fields, create children from request specification
    if (
      fieldSchema.characteristics.inputType === fieldInputTypes.composite &&
      requestObj.children
    ) {
      const childFields: Record<string, FormField> = {};

      for (const childRequest of requestObj.children) {
        // Normalize the credential type (e.g., "DocumentNumberCredential" to "documentNumber")
        const childRequestType = normalizeCredentialType(childRequest.type);
        const childFieldSchema = fields[childRequestType];

        if (childFieldSchema) {
          // Recursively create child field from its request
          const childField = this.createFromSchema(
            childRequest,
            childFieldSchema,
          );
          childFields[childFieldSchema.key] = childField;
        }
      }

      finalChildren =
        Object.keys(childFields).length > 0 ? childFields : undefined;
    }

    // Handle different field types for value construction
    if (fieldSchema.characteristics.inputType === fieldInputTypes.composite) {
      // For composite fields, construct default value from children if they exist
      if (finalChildren && Object.keys(finalChildren).length > 0) {
        const compositeValue: Record<string, any> = {};

        Object.entries(finalChildren).forEach(([key, child]) => {
          // Always include all child default values in composite default value
          compositeValue[key] = child.defaultValue;
        });

        defaultValue = compositeValue;
      } else {
        // No declared children (e.g. healthInsurance) — fall back to a schema-shaped empty value
        // instead of `undefined`, so a mandatory-but-unsourced field still has something concrete
        // to render against.
        defaultValue = buildEmptyValueFromZodSchema(fieldSchema.zodSchema);
      }
    } else {
      // For non-composite fields, use empty string as default
      defaultValue = '';
    }

    // For schema-created fields, value should be the same as defaultValue but not share reference
    const value =
      typeof defaultValue === 'object' && defaultValue !== null
        ? cloneDeep(defaultValue)
        : defaultValue;

    return new FormField(undefined, defaultValue, value, fieldSchema, {
      children: finalChildren,
      allowUserInput: options.allowUserInput,
      mandatory: options.mandatory,
      multi: options.multi,
      variants: undefined,
      description: options.description,
    });
  }
}
