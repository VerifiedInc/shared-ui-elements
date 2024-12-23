import { forwardRef } from 'react';
import { TextField, type TextFieldProps } from '../TextField';

/**
 * A wrapper around the MUI TextField component to encapsulate some common defaults.
 * Primarily intended for use creating more specific Input components rather than for direct use.
 *
 * @param {TextFieldProps} props DefaultInput takes the same props as the MUI TextField component.
 * It sets default values for variant ('outlined') and margin ('normal').
 */
const DefaultInput = (
  { variant = 'outlined', margin = 'normal', ...props }: TextFieldProps,
  ref: any,
): React.JSX.Element => {
  return (
    <TextField
      inputRef={ref}
      variant={variant}
      margin={margin}
      fullWidth
      {...props}
    />
  );
};

export default forwardRef(DefaultInput);
