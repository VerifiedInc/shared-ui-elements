import { FormField, FormFieldBuilder } from './formField';
import { fieldsFromCredentialTypes } from './fields';

type Credential = {
  id: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  issuanceDate: string;
  expirationDate: string | null;
  issuerUuid: string;
  data: Record<string, any> | Credential[];
};

type CredentialRequest = {
  allowUserInput?: boolean;
  mandatory?: 'yes' | 'no' | 'if_available';
  multi?: boolean;
  type: string;
  description?: string;
  children?: CredentialRequest[];
};

export class Form {
  fields: Record<string, FormField>;

  constructor(fields: Record<string, FormField>) {
    this.fields = fields;
  }

  get isValid() {
    return Object.values(this.fields).every((field) => field.isValid);
  }
}

export class FormBuilder {
  private readonly fieldBuilder = new FormFieldBuilder();

  createFromCredentialAndRequests(
    credentials: Credential[],
    credentialRequests: CredentialRequest[],
  ): Form {
    const fields: Record<string, FormField> = {};

    for (const request of credentialRequests) {
      // Find matching credential for this request
      const matchingCredential = credentials.find(
        (cred) => cred.type === request.type,
      );

      if (matchingCredential) {
        // Handle children requests for composite fields
        let childFields: Record<string, FormField> | undefined;

        if (request.children) {
          childFields = {};

          // For composite credentials, check if data is an array of child credentials
          if (Array.isArray(matchingCredential.data)) {
            for (const childRequest of request.children) {
              const matchingChildCredential = matchingCredential.data.find(
                (childCred: any) => childCred.type === childRequest.type,
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
          } else {
            // Fallback to searching in the main credentials array
            for (const childRequest of request.children) {
              const matchingChildCredential = credentials.find(
                (cred) => cred.type === childRequest.type,
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
