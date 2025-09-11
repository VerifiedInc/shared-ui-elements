import { cloneDeep } from 'lodash';
import { fieldsFromCredentialTypes, type BaseFieldDefinition } from '../fields';
import { type Credential, type CredentialRequestObject } from '../../types';
import { FormField } from './formField';

export interface CredentialRequestOptions {
  allowUserInput?: boolean;
  mandatory?: 'yes' | 'no' | 'if_available';
  multi?: boolean;
  description?: string;
}

export class FormFieldBuilder {
  createFromCredential(
    credential: Credential,
    children?: Record<string, FormField>,
    options?: CredentialRequestOptions,
    variants?: FormField[],
  ): FormField {
    const fieldSchema =
      fieldsFromCredentialTypes[
        credential.type as keyof typeof fieldsFromCredentialTypes
      ];

    if (!fieldSchema) {
      throw new Error(`Invalid credential type: ${credential.type}`);
    }

    const fieldKey = fieldSchema.key;
    let defaultValue: any;

    // Handle different credential data structures
    if (fieldSchema.characteristics.inputType === 'composite') {
      // For composite fields, construct value from children if they have values
      if (children && Object.keys(children).length > 0) {
        const compositeValue: Record<string, any> = {};
        let hasValues = false;

        Object.entries(children).forEach(([key, child]) => {
          // Always include all child values in composite value
          compositeValue[key] = child.value;
          if (
            child.value !== undefined &&
            child.value !== null &&
            child.value !== ''
          ) {
            hasValues = true;
          }
        });

        defaultValue = hasValues ? compositeValue : undefined;
      } else {
        defaultValue = undefined;
      }
    } else if (Array.isArray(credential.data)) {
      // For non-composite credentials with array data (shouldn't happen normally)
      defaultValue = undefined;
    } else {
      // For regular credentials with object data
      defaultValue = credential.data[fieldKey];
    }

    return new FormField(
      credential.id,
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
    fieldSchema: BaseFieldDefinition<string, string>,
  ): FormField {
    // Generate a UUID for fields without existing credentials
    const uuid = crypto.randomUUID();
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
      fieldSchema.characteristics.inputType === 'composite' &&
      requestObj.children
    ) {
      const childFields: Record<string, FormField> = {};

      for (const childRequest of requestObj.children) {
        const childRequestType = childRequest.type;
        const childFieldSchema =
          fieldsFromCredentialTypes[
            childRequestType as keyof typeof fieldsFromCredentialTypes
          ];

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
    if (fieldSchema.characteristics.inputType === 'composite') {
      // For composite fields, construct default value from children if they exist
      if (finalChildren && Object.keys(finalChildren).length > 0) {
        const compositeValue: Record<string, any> = {};

        Object.entries(finalChildren).forEach(([key, child]) => {
          // Always include all child default values in composite default value
          compositeValue[key] = child.defaultValue;
        });

        defaultValue = compositeValue;
      } else {
        defaultValue = undefined;
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

    return new FormField(uuid, defaultValue, value, fieldSchema, {
      children: finalChildren,
      allowUserInput: options.allowUserInput,
      mandatory: options.mandatory,
      multi: options.multi,
      variants: undefined,
      description: options.description,
    });
  }
}
