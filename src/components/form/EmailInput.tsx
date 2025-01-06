import { type FC } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import capitalize from 'lodash/capitalize';

/**
 * An input for email addresses
 *
 * EmailInput is an abstraction over the MUI TextField component
 * encapsulating props shared by inputs of this type.
 * See the TextField component docs for additional props, options, etc. https://mui.com/components/text-fields/
 *
 * @param {TextFieldProps} props EmailInput takes the same props as the MUI TextField component
 * with default values for name ('email'), type ('email'), id ('email') and label ('Email')
 */
export const EmailInput: FC<TextFieldProps> = ({
  name = 'email',
  type = 'email',
  id = name,
  label = capitalize(name),
  ...props
}) => {
  return (
    <TextField
      fullWidth
      type={type}
      name={name}
      id={id}
      label={label}
      inputProps={{
        autoCorrect: 'off',
        autoCapitalize: 'off',
      }}
      {...props}
    />
  );
};
