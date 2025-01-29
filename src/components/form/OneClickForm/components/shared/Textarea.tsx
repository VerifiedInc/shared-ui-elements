import { TextFieldProps } from '@mui/material';
import { FC } from 'react';

import TextInput from './TextInput';

/**
 * A multiline textarea input
 *
 * Textarea is an abstraction over the MUI TextField component
 * encapsulating props shared by inputs of this type
 * see the TextField component docs for additional props, options, etc https://mui.com/components/text-fields/
 *
 * @param {TextFieldProps} props Textarea takes the same props as the MUI TextField component
 * with multiline always set to true.
 */
const Textarea: FC<TextFieldProps> = (props) => {
  return <TextInput multiline {...props} />;
};

export default Textarea;
