import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Box,
  InputAdornment,
  type InputProps,
  InputLabelProps,
} from '@mui/material';

import { npiSchema } from '../../../validations/npi.schema';
import { type TextFieldProps } from '../TextField';

import { TextMaskCustom } from '../TextMaskCustom';
import DefaultInput from '../DefaultInput';
import { DataFieldClearAdornment } from '../DataFieldClearAdornment';

export interface NPIInputProps {
  label?: ReactNode;
  name?: string;
  helperText?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onValidNPI?: (value: string) => void;
  error?: boolean;
  value?: string;
  shouldHaveClearButton?: boolean;
  variant?: TextFieldProps['variant'];
  size?: TextFieldProps['size'];
  autoFocus?: boolean;
  disabled?: boolean;
  InputProps?: InputProps;
  InputLabelProps?: InputLabelProps;
  placeholder?: string;
  lazy?: boolean;
}

/**
 * Renders an NPI (National Provider Identifier) input component with masking.
 * NPI is a 10-digit numeric identifier.
 *
 * @param label - The label for the NPI input. Defaults to 'NPI'.
 * @param name - The name of the NPI input. Defaults to 'npi'.
 * @param helperText - The helper text for the NPI input.
 * @param onChange - The callback function to handle the change event of the NPI input.
 * @param onBlur - The callback function to handle the blur event of the NPI input.
 * @param onValidNPI - The callback function to handle the valid NPI event of the NPI input.
 * @param initialValue - The initial value for the NPI input. Defaults to ''.
 * @param error - Whether the NPI input has an error. Defaults to false.
 * @param value - The value of the NPI input. If passed, it will be used instead of the value from component state.
 * @param autoFocus - Whether the NPI input should be focused on mount. Defaults to false.
 * @param InputProps - Additional props to be passed to the input component.
 * @param InputLabelProps - Additional props to be passed to the input label component.
 * @param shouldHaveClearButton - Whether to show the clear button. Defaults to false.
 * @param disabled - Whether the NPI input is disabled. Defaults to false.
 * @param size - The size of the NPI input. Defaults to 'small'.
 * @param variant - The variant of the NPI input. Defaults to 'outlined'.
 * @param placeholder - The placeholder for the NPI input.
 * @param lazy - Whether to use lazy loading for the NPI input. Defaults to false.
 */
export function NPIInput({
  label = 'NPI',
  name = 'npi',
  helperText,
  onChange,
  onBlur,
  onValidNPI,
  initialValue = '',
  error = false,
  value: valueProp,
  autoFocus = false,
  InputProps,
  InputLabelProps,
  shouldHaveClearButton = false,
  disabled = false,
  size,
  placeholder = '__________',
  lazy = true,
}: Readonly<NPIInputProps>): React.JSX.Element {
  /**
   * Represents the value of the NPI input. Initially set to the initialValue passed in the props.
   */
  const [value, setValue] = useState<string>(initialValue);

  /**
   * Validates if the NPI is valid (10 digits).
   */
  const checkIsValidNPI = (npi: string): void => {
    const validation = npiSchema.safeParse(npi);
    if (validation.success) {
      onValidNPI?.(npi);
    }
  };

  const handleChange = (value: string): void => {
    setValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    checkIsValidNPI(value);
  }, [value]);

  const inputProps: TextFieldProps = {
    autoFocus,
    label,
    name,
    helperText,
    // if the value prop is passed, use it, otherwise use the value from component state
    // this allows the parent component to control the value of the input field
    value: valueProp ?? value,
    error,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    },
    onBlur,
    autoComplete: 'off',
    size,
    placeholder,
    inputProps: {
      // Receive unmasked value on change.
      unmask: true,
      // Make placeholder always visible
      lazy,
      // NPI mask: 10 digits (0000000000)
      mask: '0000000000',
      placeholderChar: '_',
      // Tab index for each block.
      tabIndex: 0,
      type: 'text',
      inputMode: 'numeric',
    },
    InputLabelProps: {
      shrink: true,
      ...InputLabelProps,
    },
    InputProps: {
      inputComponent: TextMaskCustom as any,
      endAdornment: shouldHaveClearButton && (
        <InputAdornment position='end'>
          <DataFieldClearAdornment
            handleClear={() => {
              handleChange('');
            }}
          />
        </InputAdornment>
      ),
      ...InputProps,
    },
    fullWidth: true,
    disabled,
  };

  return (
    <Box width='100%'>
      <DefaultInput
        {...inputProps}
        sx={{ m: 0, '& input': { letterSpacing: '1px' } }}
      />
    </Box>
  );
}
