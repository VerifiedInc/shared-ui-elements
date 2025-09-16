import { fieldInputTypes, fields } from '../fields';

import type {
  CredentialRequest,
  Credential,
  CredentialRequestObject,
} from '../../types';
import {
  FormFieldBuilder,
  type CredentialRequestOptions,
} from './formFieldBuilder';
import { FormField } from './formField';
import { Form } from './form';
import { normalizeCredentialType } from './utils';

export class FormBuilder {
  private readonly fieldBuilder = new FormFieldBuilder();

  createFromCredentialAndRequests(
    credentials: Credential[],
    credentialRequests: CredentialRequest[],
  ): Form {
    const formFields: Record<string, FormField> = {};

    for (const request of credentialRequests) {
      let requestObj: CredentialRequestObject;

      // Handle simplified credential request (string format)
      if (typeof request === 'string') {
        requestObj = this.expandCredentialType(request);
      } else {
        // Handle complex credential request (object format)
        requestObj = request;
      }

      // Convert credential type (e.g., "FullNameCredential") to field key (e.g., "fullName")
      const credentialType = normalizeCredentialType(requestObj.type);

      // Find matching credentials for this request (could be multiple for multi)
      const matchingCredentials = credentials.filter(
        (cred) => cred.type === credentialType,
      );

      // Find all credentials that meet the requirements
      const validCredentials = matchingCredentials.filter((credential) =>
        this.credentialMeetsRequirements(requestObj, credential),
      );

      // Create field (either from credentials or empty)
      const field = this.createField(
        requestObj,
        validCredentials,
        credentialType,
      );
      const fieldSchema = fields[credentialType];
      if (fieldSchema) {
        formFields[fieldSchema.key] = field;
      }
    }

    return new Form(formFields);
  }

  // Method to create a form field from valid credentials or empty field
  private createField(
    requestObj: CredentialRequestObject,
    validCredentials: Credential[],
    requestType: keyof typeof fields,
  ): FormField {
    const fieldSchema = fields[requestType];
    if (!fieldSchema) {
      throw new Error(`Unknown credential type: ${requestType}`);
    }

    // Extract credential request options
    const options = this.extractRequestOptions(requestObj);

    // If no valid credentials found, create empty form field
    if (validCredentials.length === 0) {
      return this.fieldBuilder.createFromSchema(requestObj, fieldSchema);
    }

    // Use first valid credential as primary
    const primaryCredential = validCredentials[0];

    // Handle children requests for composite fields
    const childFields = this.createChildFields(requestObj, primaryCredential);

    // Create variants from all valid credentials (including the first for UI selection)
    let variants: FormField[] | undefined;
    if (validCredentials.length > 1) {
      variants = validCredentials.map((credential) => {
        const variantChildFields = this.createChildFields(
          requestObj,
          credential,
        );
        return this.fieldBuilder.createFromCredential(
          credential,
          variantChildFields,
          options,
        );
      });
    }

    return this.fieldBuilder.createFromCredential(
      primaryCredential,
      childFields,
      options,
      variants,
    );
  }

  // Helper method to create child fields for composite credentials
  private createChildFields(
    requestObj: CredentialRequestObject,
    credential: Credential,
  ): Record<string, FormField> | undefined {
    if (!requestObj.children) {
      return undefined;
    }

    const childFields: Record<string, FormField> = {};

    // For composite credentials, create child fields based on the credential's value object
    // The new structure has credential.value as an object with direct field values
    for (const childRequest of requestObj.children) {
      const childRequestType = normalizeCredentialType(childRequest.type);
      const fieldSchema = fields[childRequestType];

      if (!fieldSchema) {
        continue;
      }

      const fieldKey = fieldSchema.key;

      // Check if the credential's value contains data for this child field
      if (credential.value && fieldKey in credential.value) {
        // Create a synthetic child credential from the parent's value
        // For composite fields, we need to determine if this is a nested composite
        // or a direct child of the current composite
        let childCredentialValue: any;

        if (
          fieldSchema.characteristics.inputType === fieldInputTypes.composite
        ) {
          // For nested composite fields (like address within driversLicense),
          // use the nested object directly
          childCredentialValue = credential.value[fieldKey];
        } else {
          // For direct children of composite fields (like firstName within fullName),
          // use the parent's value so the child can access its own data
          childCredentialValue = credential.value;
        }

        const childCredential: Credential = {
          ...credential,
          uuid: undefined as any, // Child fields don't have a uuid
          type: childRequestType,
          value: childCredentialValue,
        };

        // Extract child request options including description
        const chilRequestdOptions = this.extractRequestOptions(
          childRequest,
          requestObj,
        );

        // Recursively handle nested composite fields
        let nestedChildFields: Record<string, FormField> | undefined;
        if (
          fieldSchema.characteristics.inputType === fieldInputTypes.composite &&
          childRequest.children
        ) {
          nestedChildFields = this.createChildFields(
            childRequest,
            childCredential,
          );
        }

        const childField = this.fieldBuilder.createFromCredential(
          childCredential,
          nestedChildFields,
          chilRequestdOptions,
        );

        childFields[fieldKey] = childField;
      } else {
        // Extract child request options including description
        const chilRequestdOptions = this.extractRequestOptions(
          childRequest,
          requestObj,
        );

        const enhancedRequestObj = {
          ...childRequest,
          ...chilRequestdOptions,
        };

        // Create empty field for missing optional credentials
        const emptyField = this.fieldBuilder.createFromSchema(
          enhancedRequestObj,
          fieldSchema,
        );
        childFields[fieldKey] = emptyField;
      }
    }

    return Object.keys(childFields).length > 0 ? childFields : undefined;
  }

  // Method to expand a credential type into a full request object
  private expandCredentialType(
    credentialType: string,
  ): CredentialRequestObject {
    // Convert credential type (e.g., "FullNameCredential") to field key (e.g., "fullName")
    const fieldKey = credentialType.replace(/Credential$/, '');
    const requestType = (fieldKey.charAt(0).toLowerCase() +
      fieldKey.slice(1)) as keyof typeof fields;
    const fieldSchema = fields[requestType];

    if (!fieldSchema) {
      throw new Error(`Unknown credential type: ${credentialType}`);
    }

    const requestObj = {
      type: credentialType,
      allowUserInput: true,
      mandatory: 'no' as const,
      multi: false,
    };

    // If it's a composite field, recursively expand children using defaultOrder
    if (
      fieldSchema.characteristics.inputType === fieldInputTypes.composite &&
      'children' in fieldSchema &&
      'defaultOrder' in fieldSchema.characteristics &&
      fieldSchema.characteristics.defaultOrder
    ) {
      const children: CredentialRequestObject[] = [];

      // Use defaultOrder to determine which children to include and their sequence
      for (const childKey of fieldSchema.characteristics.defaultOrder) {
        const childField = (fieldSchema.children as any)?.[childKey];
        if (childField) {
          // Recursively expand each child credential type
          const expandedChild = this.expandCredentialType(childField.key);
          children.push(expandedChild);
        }
      }

      return {
        ...requestObj,
        children,
      };
    }

    return requestObj;
  }

  // Method to ensure that the credential meets the requirements of the request
  private credentialMeetsRequirements(
    requestObj: CredentialRequestObject,
    credential: Credential,
  ): boolean {
    // If no children requirements, credential is valid
    if (!requestObj.children) {
      return true;
    }

    // Check if credential has all required children
    for (const childRequest of requestObj.children) {
      const childRequestType = normalizeCredentialType(
        typeof childRequest === 'string' ? childRequest : childRequest.type,
      );
      const childMandatory =
        typeof childRequest === 'string'
          ? 'no'
          : (childRequest.mandatory ?? 'no');

      // Skip non-mandatory children
      if (childMandatory === 'no') {
        continue;
      }

      let hasRequiredChild = false;

      // Check in credential's value object using the field schema key
      const fieldSchema = fields[childRequestType];

      if (fieldSchema && credential.value) {
        const fieldKey = fieldSchema.key;
        hasRequiredChild =
          fieldKey in credential.value &&
          credential.value[fieldKey] !== undefined &&
          credential.value[fieldKey] !== null &&
          credential.value[fieldKey] !== '';
      }

      // If required child is missing, credential doesn't meet requirements
      if (!hasRequiredChild) {
        return false;
      }
    }

    return true;
  }

  // Helper method to extract request options
  private extractRequestOptions(
    requestObj: CredentialRequestObject,
    parentRequestObj?: CredentialRequestObject,
  ): CredentialRequestOptions {
    return {
      allowUserInput:
        requestObj.allowUserInput ?? parentRequestObj?.allowUserInput ?? true,
      mandatory: requestObj.mandatory ?? parentRequestObj?.mandatory ?? 'no',
      multi: requestObj.multi ?? false,
      description: requestObj.description,
    };
  }
}
