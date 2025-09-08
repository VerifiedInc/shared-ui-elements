import { fieldsFromCredentialTypes } from '../fields';
import type { CredentialRequest, Credential } from './types';
import { FormFieldBuilder } from './formFieldBuilder';
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
      // Handle simplified credential request (string only)
      if (typeof request === 'string') {
        const requestType = request;
        // Find matching credential for this request
        const matchingCredential = credentials.find(
          (cred) => cred.type === requestType,
        );

        if (matchingCredential) {
          // Get field schema to check if it's composite and has defaultOrder
          const fieldSchema =
            fieldsFromCredentialTypes[
              requestType as keyof typeof fieldsFromCredentialTypes
            ];

          if (
            fieldSchema &&
            fieldSchema.characteristics.inputType === 'composite' &&
            'defaultOrder' in fieldSchema.characteristics
          ) {
            // Create child fields using defaultOrder
            const childFields: Record<string, FormField> = {};
            const defaultOrder = fieldSchema.characteristics.defaultOrder;

            for (const childKey of defaultOrder) {
              // Find the child field schema
              const childFieldSchema = fieldSchema.children?.[childKey];
              if (childFieldSchema) {
                // Try to find matching child credential
                let matchingChildCredential;
                if (Array.isArray(matchingCredential.data)) {
                  matchingChildCredential = matchingCredential.data.find(
                    (childCred: any) =>
                      childCred.type === childFieldSchema.type,
                  );
                } else {
                  matchingChildCredential = credentials.find(
                    (cred) => cred.type === childFieldSchema.type,
                  );
                }

                if (matchingChildCredential) {
                  const childField = this.fieldBuilder.createFromCredential(
                    matchingChildCredential,
                  );
                  childFields[childKey] = childField;
                } else {
                  // Create empty field for missing credentials
                  const emptyField =
                    this.fieldBuilder.createFromSchema(childFieldSchema);
                  childFields[childKey] = emptyField;
                }
              }
            }

            const field = this.fieldBuilder.createFromCredential(
              matchingCredential,
              childFields,
            );
            fields[fieldSchema.key] = field;
          } else {
            // Handle non-composite fields
            const field =
              this.fieldBuilder.createFromCredential(matchingCredential);
            if (fieldSchema) {
              fields[fieldSchema.key] = field;
            }
          }
        }
        continue;
      }

      // Handle complex credential request (object format)
      // At this point, request must be an object since we handled the string case above
      const requestType = (
        request as { type: string; children?: CredentialRequest[] }
      ).type;
      // Find matching credential for this request
      const matchingCredential = credentials.find(
        (cred) => cred.type === requestType,
      );

      if (matchingCredential) {
        // Handle children requests for composite fields
        let childFields: Record<string, FormField> | undefined;

        const requestObj = request as {
          type: string;
          children?: CredentialRequest[];
        };
        if (requestObj.children) {
          childFields = {};

          // For composite credentials, check if data is an array of child credentials
          if (Array.isArray(matchingCredential.data)) {
            for (const childRequest of requestObj.children) {
              const childRequestType =
                typeof childRequest === 'string'
                  ? childRequest
                  : childRequest.type;
              const matchingChildCredential = matchingCredential.data.find(
                (childCred: any) => childCred.type === childRequestType,
              );

              if (matchingChildCredential) {
                const childField = this.fieldBuilder.createFromCredential(
                  matchingChildCredential,
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
                // Create empty field for missing optional credentials
                const fieldSchema =
                  fieldsFromCredentialTypes[
                    childRequestType as keyof typeof fieldsFromCredentialTypes
                  ];
                if (fieldSchema) {
                  const emptyField =
                    this.fieldBuilder.createFromSchema(fieldSchema);
                  childFields[fieldSchema.key] = emptyField;
                }
              }
            }
          } else {
            // Fallback to searching in the main credentials array
            for (const childRequest of requestObj.children) {
              const childRequestType2 =
                typeof childRequest === 'string'
                  ? childRequest
                  : childRequest.type;
              const matchingChildCredential = credentials.find(
                (cred) => cred.type === childRequestType2,
              );
              if (matchingChildCredential) {
                const childField = this.fieldBuilder.createFromCredential(
                  matchingChildCredential,
                );
                // Use the field schema key as the object key
                const fieldSchema =
                  fieldsFromCredentialTypes[
                    matchingChildCredential.type as keyof typeof fieldsFromCredentialTypes
                  ];
                if (fieldSchema) {
                  childFields[fieldSchema.key] = childField;
                }
              }
            }
          }
        }

        const field = this.fieldBuilder.createFromCredential(
          matchingCredential,
          childFields,
        );

        // Use the field schema key as the object key for top-level fields
        const fieldSchema =
          fieldsFromCredentialTypes[
            matchingCredential.type as keyof typeof fieldsFromCredentialTypes
          ];
        if (fieldSchema) {
          fields[fieldSchema.key] = field;
        }
      }
    }

    return new Form(fields);
  }
}
