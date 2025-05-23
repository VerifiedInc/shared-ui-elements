import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  InputAdornment,
  InputLabelProps,
  type InputProps,
} from '@mui/material';

import { getPhoneDataByFieldName } from '../../utils/phone';
import { phoneSchema } from '../../validations/phone.schema';

import { type TextFieldProps } from '../TextField';

import { TextMaskCustom } from './TextMaskCustom';
import CountrySelector from './CountrySelector';
import DefaultInput from './DefaultInput';
import { DataFieldClearAdornment } from './DataFieldClearAdornment';

export interface BasePhoneInputProps {
  label?: ReactNode;
  name?: string;
  helperText?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onValidPhone?: (value: string) => void;
  error?: boolean;
  handleChangeCountry?: (newCountry: string) => void;
  value?: string;
  shouldHaveSelectCountryButton?: boolean;
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
 * Renders a phone input component with country selector and masking.
 *
 * @param label - The label for the phone input. Defaults to 'Phone'.
 * @param name - The name of the phone input. Defaults to 'phone'.
 * @param helperText - The helper text for the phone input.
 * @param onChange - The callback function to handle the change event of the phone input.
 * @param onBlur - The callback function to handle the blur event of the phone input.
 * @param onValidPhone - The callback function to handle the valid phone event of the phone input.
 * @param initialValue - The initial value for the phone input. Defaults to ''.
 * @param error - Whether the phone input has an error. Defaults to false.
 * @param handleChangeCountry - The callback function to handle the change event of the country selector.
 * @param value - The value of the phone input. If passed, it will be used instead of the value from component state.
 * @param autoFocus - Whether the phone input should be focused on mount. Defaults to false.
 * @param InputProps - Additional props to be passed to the input component.
 * @param InputLabelProps - Additional props to be passed to the input label component.
 * @param shouldHaveSelectCountryButton - Whether to show the country selector button. Defaults to true.
 * @param shouldHaveClearButton - Whether to show the clear button. Defaults to false.
 * @param disabled - Whether the phone input is disabled. Defaults to false.
 * @param size - The size of the phone input. Defaults to 'small'.
 * @param variant - The variant of the phone input. Defaults to 'outlined'.
 * @param placeholder - The placeholder for the phone input.
 * @param lazy - Whether to use lazy loading for the phone input. Defaults to false.
 */
export function BasePhoneInput({
  label = 'Phone',
  name = 'phone',
  helperText,
  onChange,
  onBlur,
  onValidPhone,
  initialValue = '',
  error = false,
  handleChangeCountry,
  value: valueProp,
  autoFocus = false,
  InputProps,
  InputLabelProps,
  shouldHaveSelectCountryButton = true,
  shouldHaveClearButton = false,
  disabled = false,
  size,
  placeholder = '+1 (___) ___-____',
  lazy = true,
}: Readonly<BasePhoneInputProps>): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Represents the country selected for the phone input. Defaults to US.
   */
  const [country, setCountry] = useState<string>('US');

  /**
   * Represents the value of the phone input. Initially set to the initialValue passed in the props.
   */
  const [value, setValue] = useState<string>(initialValue);

  const phoneData = useMemo(
    () => getPhoneDataByFieldName('countryCode', country),
    [country],
  );

  /**
   * Handles the change of the selected country in the phone input.
   * @param newCountry - The selected country.
   */
  const _handleChangeCountry = (newCountry: string): void => {
    setCountry(newCountry);

    if (handleChangeCountry) {
      handleChangeCountry(newCountry);
    }

    // HACK alert:
    // Wait a while so focus can take effect.
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const checkIsValidPhone = (phone: string): void => {
    const validation = phoneSchema.safeParse(value);
    if (validation.success) {
      onValidPhone?.(phone);
    }
  };

  const handleChange = (value: string): void => {
    setValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    checkIsValidPhone(value);
  }, [value]);

  const inputProps: TextFieldProps = {
    inputRef,
    autoFocus,
    label,
    name,
    helperText,
    // if the value prop is passed, use it, otherwise use the value from component state
    // this allows the parent component to control the value of the input field
    value: valueProp ?? value,
    error,
    onChange: (e) => {
      handleChange(e.target.value);
    },
    onBlur,
    autoComplete: 'tel',
    size,
    placeholder,
    inputProps: {
      // Receive unmasked value on change.
      unmask: true,
      // Make placeholder always visible
      lazy,
      mask: phoneData?.mask,
      placeholderChar: '_',
      // Tab index for each block.
      tabIndex: 0,
      type: 'tel',
    },
    InputLabelProps: {
      shrink: true,
      ...InputLabelProps,
    },
    InputProps: {
      inputComponent: TextMaskCustom as any,
      startAdornment: shouldHaveSelectCountryButton && (
        <InputAdornment position='start'>
          <CountrySelector
            value={country}
            onChange={_handleChangeCountry}
            shouldShowOnlyNorthAmericanCountries={false}
          />
        </InputAdornment>
      ),
      endAdornment: shouldHaveClearButton && (
        <DataFieldClearAdornment
          handleClear={() => {
            handleChange('');
          }}
        />
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
