import { ReactNode, useState } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
  placeholder?: string;
  mask?: string;
  shouldHaveCloseAdornment?: boolean;
};

function isRedactedValue(value: string): boolean {
  return value.includes('*') || value.includes('•');
}

// Normalize * → • so that imask accepts the redacted characters.
function normalizeRedactedValue(value: string): string {
  return value.replace(/\*/g, '•');
}

/**
 * This component manages the input of type SSN.
 * @constructor
 */
export function SSNInput({
  onChange,
  label = 'Social Security number',
  value,
  shouldHaveCloseAdornment = false,
  mask: maskProp = 'XXX-XX-0000',
  placeholder = '___-__-____',
  InputProps,
  ...rest
}: SSNInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const rawValue = value ?? '';
  const isRedacted = isRedactedValue(rawValue);
  const canToggleVisibility = !isRedacted && rawValue.replace(/-/g, '').length > 0;
  // Normalize * → • so imask accepts redacted characters via the X definition.
  const normalizedValue = normalizeRedactedValue(rawValue);

  const activeMask = isVisible ? '000-00-0000' : maskProp;

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
    value: normalizedValue.replace(/-/g, ''),
    onChange: ((e, nativeEvent) => {
      if (!nativeEvent) return;
      const currentValue = normalizedValue.replace(/-/g, '');
      const newValue = e.target.value.replace(/-/g, '');
      // If the user is removing characters, clear the field
      if (newValue.length < currentValue.length) {
        onChange?.({ target: { value: '' } });
        return;
      }
      onChange?.({ target: { value: e.target.value } });
    }) as ChangeEvent,
    placeholder: placeholder,
    inputProps: {
      // Use onChange event.
      useOnComplete: false,
      // Use unmasked value.
      unmask: true,
      // Make placeholder always visible
      lazy: true,
      // Mask in the pattern of SSN.
      mask: activeMask,
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
          {canToggleVisibility && (
            <InputAdornment position='end'>
              <IconButton
                aria-label={isVisible ? 'hide ssn' : 'show ssn'}
                edge='end'
                size='small'
                onClick={() => setIsVisible((prev) => !prev)}
                tabIndex={-1}
              >
                {isVisible ? (
                  <VisibilityOff fontSize='small' />
                ) : (
                  <Visibility fontSize='small' />
                )}
              </IconButton>
            </InputAdornment>
          )}
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
