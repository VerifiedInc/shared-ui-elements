import { TextFieldProps } from '@mui/material';

/**
 * The base style definition for input fields, it should reflect changes across all inputs.
 */
export const inputStyle = {
  variant: 'outlined',
  size: 'small',
} as const;

export const readOnlyInputStyle: TextFieldProps = {
  sx: {
    '&, & input': {
      pointerEvents: 'none',
    },

    '& fieldset.MuiOutlinedInput-notchedOutline': {
      border: 'none!important',
    },
    '& svg.MuiSvgIcon-root': {
      display: 'none',
    },
  },
};
