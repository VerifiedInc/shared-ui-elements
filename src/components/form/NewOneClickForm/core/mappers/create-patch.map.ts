import { fieldInputTypes } from '../fields';
import { Form, FormField } from '../form';

export type CreatePatchCredentialsResult = {
  uuid?: string;
  value: Record<string, any>;
};

export function toCreatePatchCredentials(
  form: Form,
): CreatePatchCredentialsResult[] {
  const nonEmptyFields = (field: FormField) => {
    if (
      field.schema.characteristics.inputType === fieldInputTypes.composite &&
      field.children
    ) {
      return Object.values(field.children).some(nonEmptyFields);
    }

    return !field.isEmpty;
  };

  const map = (field: FormField) => {
    const result: CreatePatchCredentialsResult = {
      value: {},
    };

    if (field.id) {
      result.uuid = field.id;
    }

    result.value[field.schema.key] = field.value;

    return result;
  };

  return Object.values(form.fields).filter(nonEmptyFields).map(map);
}
