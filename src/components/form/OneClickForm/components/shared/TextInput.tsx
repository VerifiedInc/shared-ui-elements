import { FC } from 'react';
import { TextFieldProps } from '@mui/material';
import capitalize from 'lodash/capitalize';

import DefaultInput from './DefaultInput';

/**
 * A somewhat generic input for text
 *
 * TextInput is an abstraction over the MUI TextField component
 * encapsulating props shared by inputs of this type.
 * See the TextField component docs for additional props, options, etc. https://mui.com/components/text-fields/
 *
 * @param {TextFieldProps} props TextInput takes the same props as the MUI TextField component
 * with a default values for type ('text') and id and label defaulting to the value of the name prop
 * and the name prop (capitalized)
 */
const TextInput: FC<TextFieldProps> = ({
  type = 'text',
  name,
  id = name,
  label = capitalize(name),
  ...props
}) => {
  return (
    <DefaultInput type={type} name={name} id={id} label={label} {...props} />
  );
};

export default TextInput;
