import { Box, InputAdornment, type InputProps } from '@mui/material';
import { type TextFieldProps } from '../TextField';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getPhoneDataByFieldName } from '../../utils/phone';
import { inputStyle } from './styles/input';
import { phoneSchema } from '../../validations/phone.schema';

import { TextMaskCustom } from './TextMaskCustom';
import CountrySelector from './CountrySelector';
import DefaultInput from './DefaultInput';
import { DataFieldClearAdornment } from './DataFieldClearAdornment';

export interface PhoneInputProps {
  label?: string;
  name?: string;
  helperText?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  onValidPhone?: (value: string) => void;
  error?: boolean;
  handleChangeCountry?: (newCountry: string) => void;
  value?: string;
  shouldShowOnlyNorthAmericanCountries?: boolean;
  shouldHaveClearButton?: boolean;
  variant?: TextFieldProps['variant'];
  InputProps?: InputProps;
}

/**
 * Renders a phone input component with country selector and masking.
 *
 * @param label - The label for the phone input. Defaults to 'Phone'.
 * @param name - The name of the phone input. Defaults to 'phone'.
 * @param helperText - The helper text for the phone input.
 * @param onChange - The callback function to handle the change event of the phone input.
 * @param initialValue - The initial value for the phone input. Defaults to ''.
 * @param error - Whether the phone input has an error. Defaults to false.
 * @param handleChangeCountry - The callback function to handle the change event of the country selector.
 * @param value - The value of the phone input. If passed, it will be used instead of the value from component state.
 */
export function PhoneInput({
  label = 'Phone',
  name = 'phone',
  helperText,
  onChange,
  onValidPhone,
  initialValue = '',
  error = false,
  handleChangeCountry,
  value: valueProp,
  InputProps,
  shouldHaveClearButton = false,
  shouldShowOnlyNorthAmericanCountries = true,
}: Readonly<PhoneInputProps>): React.JSX.Element {
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
    console.log(validation, 'validation');
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
    ...inputStyle,
    label,
    name: `_${name}`,
    helperText,
    // if the value prop is passed, use it, otherwise use the value from component state
    // this allows the parent component to control the value of the input field
    value: valueProp ?? value,
    error,
    onChange: (e) => {
      handleChange(e.target.value);
    },
    inputProps: {
      // Receive unmasked value on change.
      unmask: true,
      // Make placeholder always visible
      lazy: false,
      mask: phoneData?.mask,
      placeholderChar: '_',
      // Tab index for each block.
      tabIndex: 0,
    },
    InputProps: {
      ...InputProps,
      inputComponent: TextMaskCustom as any,
      startAdornment: (
        <InputAdornment position='start'>
          <CountrySelector
            value={country}
            onChange={_handleChangeCountry}
            shouldShowOnlyNorthAmericanCountries={
              shouldShowOnlyNorthAmericanCountries
            }
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
    },
    fullWidth: true,
  };

  return (
    <Box width='100%'>
      <input name={name} value={value} readOnly type='hidden' hidden />
      <DefaultInput {...inputProps} />
    </Box>
  );
}
