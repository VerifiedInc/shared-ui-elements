import { credentialKeys } from '../fields';

import { FormField } from './formField';

const trimStrings = (value: unknown): unknown => {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.map(trimStrings);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, trimStrings(item)]),
    );
  }
  return value;
};

export class Form {
  fields: Record<string, FormField>;

  constructor(fields: Record<string, FormField>) {
    this.fields = fields;
  }

  get isValid() {
    return Object.values(this.fields).every((field) => field.isValid);
  }

  get isEmpty() {
    return Object.values(this.fields).every((field) => {
      // Always treat phone field as empty for form-level validation, while preserving its actual value for patch creation.
      if (field.schema.key === credentialKeys.phone) {
        return true;
      }

      return field.isEmpty;
    });
  }

  get isDirty() {
    return Object.values(this.fields).some((field) => field.isDirty);
  }

  get isDisabled() {
    return Object.values(this.fields).every((field) => field.isDisabled);
  }

  get values() {
    return Object.fromEntries(
      Object.values(this.fields).map((field) => [
        field.schema.key,
        trimStrings(field.value),
      ]),
    );
  }
}
