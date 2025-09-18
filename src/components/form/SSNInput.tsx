import { ReactNode } from 'react';
import { Box, TextField, type TextFieldProps } from '@mui/material';

import { DataFieldClearAdornment } from './DataFieldClearAdornment';
import { ChangeEvent, TextMaskCustom } from './TextMaskCustom';

type TextStyles = Omit<TextFieldProps, 'onChange'> & { onChange: any };

export type SSNInputProps = TextFieldProps & {
  onChange?: (event: { target: { value: string } }) => void;
  name?: string;
  value?: string;
  label?: ReactNode;
  error?: boolean;
  helperText?: string;
  shouldHaveCloseAdornment?: boolean;
};

/**
 * This component manages the input of type SSN.
 * @constructor
 */
export function SSNInput({
  onChange,
  label = 'Social Security number',
  value,
  shouldHaveCloseAdornment = false,
  InputProps,
  ...rest
}: SSNInputProps) {
  const handleChange = (value: string): void => {
    onChange?.({ target: { value } });
  };

  const handleClear = (): void => {
    handleChange('');
    onChange?.({ target: { value: '' } });
  };

  const textFieldStyle: TextStyles = {
    ...rest,
    label,
    value: value?.replace(/-/g, '') ?? '',
    onChange: ((e, nativeEvent) => {
      if (!nativeEvent) return;
      const currentValue = value?.replace(/-/g, '') ?? '';
      const newValue = e.target.value.replace(/-/g, '');
      // If the user is removing characters, clear the field
      if (newValue.length < currentValue.length) {
        onChange?.({ target: { value: '' } });
        return;
      }
      onChange?.({ target: { value: e.target.value } });
    }) as ChangeEvent,
    placeholder: '___-__-____',
    inputProps: {
      // Use onChange event.
      useOnComplete: false,
      // Use unmasked value.
      unmask: true,
      // Make placeholder always visible
      lazy: true,
      // Mask in the pattern of SSN.
      mask: 'XXX-XX-0000',
      definitions: {
        X: {
          mask: /[0-9•]/,
          displayChar: '•',
        },
      },
      placeholderChar: '_',
      // Set input mode to numeric, so mobile virtual keyboards just show numeric keys.
      inputMode: 'numeric',

      overwrite: false,
      // Tab index for each block.
      tabIndex: 0,
    },
    InputProps: {
      ...InputProps,
      inputComponent: TextMaskCustom as any,
      endAdornment: (
        <>
          {!!shouldHaveCloseAdornment && (
            <DataFieldClearAdornment
              onClick={handleClear}
              handleClear={handleClear}
            />
          )}
          {InputProps?.endAdornment}
        </>
      ),
    },
    fullWidth: true,
    sx: {
      '& input': {
        letterSpacing: '1px',
      },
    },
  };

  return (
    <Box width='100%'>
      <TextField {...textFieldStyle} />
    </Box>
  );
}
