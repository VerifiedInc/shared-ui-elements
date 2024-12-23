import { useState } from 'react';
import { Box, TextField, type TextFieldProps } from '@mui/material';

import { usePrevious } from '../../hooks/usePrevious';
import { DataFieldClearAdornment } from './DataFieldClearAdornment';
import { TextMaskCustom } from './TextMaskCustom';

type TextStyles = Omit<TextFieldProps, 'onChange'> & { onChange: any };

export interface SSNInputProps {
  onChange?: (event: { target: { value: string } }) => void;
  name?: string;
  value?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  shouldHaveCloseAdornment?: boolean;
}

/**
 * This component manages the input of type SSN.
 * @constructor
 */
export function SSNInput({
  onChange,
  label = 'Social Security number',
  shouldHaveCloseAdornment = false,
  ...rest
}: SSNInputProps): React.JSX.Element {
  // Arbitrary states to allow to empty input field.
  const [value, setValue] = useState<string | undefined>('');
  const previousValue = usePrevious(value);

  const handleChange = (value: string): void => {
    setValue(value);
    onChange?.({ target: { value } });
  };

  const handleClear = (): void => {
    handleChange('');
    onChange?.({ target: { value: '' } });
  };

  const textFieldStyle: TextStyles = {
    value,
    onChange: (e: any, nativeEvent: any) => {
      if (!nativeEvent) return;
      handleChange(e.target.value);
    },
    inputProps: {
      onFocus: () => {
        handleChange('');
      },
      onBlur: () => {
        if (value?.length) return;
        handleChange(previousValue ?? '');
      },

      // Use onChange event.
      useOnComplete: false,
      // Use unmasked value.
      unmask: true,
      // Mask in the pattern of SSN.
      mask: 'XXX-XX-0000',

      definitions: {
        X: {
          mask: /[0-9•]/,
          displayChar: '•',
        },
      },

      // Set input mode to numeric, so mobile virtual keyboards just show numeric keys.
      inputMode: 'numeric',

      overwrite: false,
      // Tab index for each block.
      tabIndex: 0,
    },
    InputProps: {
      inputComponent: TextMaskCustom as any,

      endAdornment: !!shouldHaveCloseAdornment && (
        <DataFieldClearAdornment
          onClick={handleClear}
          handleClear={handleClear}
        />
      ),
    },
    fullWidth: true,
    label,
  };

  return (
    <Box width='100%'>
      <TextField {...textFieldStyle} {...rest} />
    </Box>
  );
}
