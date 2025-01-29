export type Address = {
  line1?: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
};

/**
 * Possible input format that user can provide.
 */
export enum InputFormatEnum {
  Text = 'Text',
  Date = 'Date',
  Select = 'Select',
  Email = 'Email',
  Phone = 'Phone',
  SSN = 'SSN',
  Image = 'Image',
}
