import { FormField } from './formField';

export class Form {
  fields: Record<string, FormField>;

  constructor(fields: Record<string, FormField>) {
    this.fields = fields;
  }

  get isValid() {
    return Object.values(this.fields).every((field) => field.isValid);
  }
}
