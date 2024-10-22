import { TextField, type TextFieldProps } from '../TextField';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePrevious } from '../../hooks/usePrevious';
import { inputStyle } from './styles/input';
import { TextMaskCustom } from './TextMaskCustom';
import { DataFieldClearAdornment } from './DataFieldClearAdornment';

type TextStyles = Omit<TextFieldProps, 'onChange'> & { onChange: any };

export interface SSNInputProps {
  onChange: (value: string) => void;
  onClear: () => void;
  InputProps: TextFieldProps;
}

/**
 * This component manages the input of type SSN.
 * @constructor
 */
export function SSNInput({
  onChange,
  onClear,
  InputProps,
}: SSNInputProps): React.JSX.Element {
  // Arbitrary states to allow to empty input field.
  const [value, setValue] = useState<string | undefined>('');
  const previousValue = usePrevious(value);

  const handleChange = (value: string): void => {
    setValue(value);
    onChange(value);
  };

  const handleClear = (): void => {
    handleChange('');
    onClear();
  };

  // Clearing value first time when component is mounted, so it doesn't hold redacted value state.
  useEffect(() => {
    handleClear();
  }, []);

  const textFieldStyle: TextStyles = {
    ...inputStyle,
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

      endAdornment: (
        <DataFieldClearAdornment
          onClick={handleClear}
          handleClear={handleClear}
        />
      ),
      ...{ InputProps },
    },
    fullWidth: true,
  };

  return (
    <Box width='100%'>
      <TextField {...textFieldStyle} />
    </Box>
  );
}
