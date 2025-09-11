import { fieldsFromCredentialTypes } from '../fields';

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

export class FormBuilder {
  private readonly fieldBuilder = new FormFieldBuilder();

  createFromCredentialAndRequests(
    credentials: Credential[],
    credentialRequests: CredentialRequest[],
  ): Form {
    const fields: Record<string, FormField> = {};

    for (const request of credentialRequests) {
      let requestObj: CredentialRequestObject;

      // Handle simplified credential request (string format)
      if (typeof request === 'string') {
        requestObj = this.expandCredentialType(request);
      } else {
        // Handle complex credential request (object format)
        requestObj = request;
      }

      const requestType =
        requestObj.type as keyof typeof fieldsFromCredentialTypes;

      // Find matching credentials for this request (could be multiple for multi)
      const matchingCredentials = credentials.filter(
        (cred) => cred.type === requestType,
      );

      // Find all credentials that meet the requirements
      const validCredentials = matchingCredentials.filter((credential) =>
        this.credentialMeetsRequirements(requestObj, credential),
      );

      // Create field (either from credentials or empty)
      const field = this.createField(requestObj, validCredentials, requestType);
      const fieldSchema = fieldsFromCredentialTypes[requestType];
      if (fieldSchema) {
        fields[fieldSchema.key] = field;
      }
    }

    return new Form(fields);
  }

  // Method to create a form field from valid credentials or empty field
  private createField(
    requestObj: CredentialRequestObject,
    validCredentials: Credential[],
    requestType: keyof typeof fieldsFromCredentialTypes,
  ): FormField {
    const fieldSchema = fieldsFromCredentialTypes[requestType];
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

    // For composite credentials, check if data is an array of child credentials
    if (Array.isArray(credential.data)) {
      for (const childRequest of requestObj.children) {
        const childRequestType = childRequest.type;
        const matchingChildCredential = credential.data.find(
          (childCred: any) => childCred.type === childRequestType,
        );

        if (matchingChildCredential) {
          // Extract child request options including description
          const chilRequestdOptions = this.extractRequestOptions(
            childRequest,
            requestObj,
          );

          const childField = this.fieldBuilder.createFromCredential(
            matchingChildCredential,
            undefined,
            chilRequestdOptions,
          );
          // Use the field schema key as the object key
          const fieldSchema =
            fieldsFromCredentialTypes[
              matchingChildCredential.type as keyof typeof fieldsFromCredentialTypes
            ];
          if (fieldSchema) {
            childFields[fieldSchema.key] = childField;
          }
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
          const fieldSchema =
            fieldsFromCredentialTypes[
              childRequestType as keyof typeof fieldsFromCredentialTypes
            ];

          if (fieldSchema) {
            const emptyField = this.fieldBuilder.createFromSchema(
              enhancedRequestObj,
              fieldSchema,
            );
            childFields[fieldSchema.key] = emptyField;
          }
        }
      }
    }

    return Object.keys(childFields).length > 0 ? childFields : undefined;
  }

  // Method to expand a credential type into a full request object
  private expandCredentialType(
    credentialType: string,
  ): CredentialRequestObject {
    const fieldSchema =
      fieldsFromCredentialTypes[
        credentialType as keyof typeof fieldsFromCredentialTypes
      ];

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
      fieldSchema.characteristics.inputType === 'composite' &&
      fieldSchema.children &&
      'defaultOrder' in fieldSchema.characteristics &&
      fieldSchema.characteristics.defaultOrder
    ) {
      const children: CredentialRequestObject[] = [];

      // Use defaultOrder to determine which children to include and their sequence
      for (const childKey of fieldSchema.characteristics.defaultOrder) {
        const childField = fieldSchema.children[childKey];
        if (childField) {
          // Recursively expand each child credential type
          const expandedChild = this.expandCredentialType(childField.type);
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
      const childRequestType =
        typeof childRequest === 'string' ? childRequest : childRequest.type;
      const childMandatory =
        typeof childRequest === 'string'
          ? 'no'
          : (childRequest.mandatory ?? 'no');

      // Skip non-mandatory children
      if (childMandatory === 'no') {
        continue;
      }

      let hasRequiredChild = false;

      // Check in credential's data array
      if (Array.isArray(credential.data)) {
        hasRequiredChild = credential.data.some(
          (childCred: any) => childCred.type === childRequestType,
        );
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
