import {
  Box,
  InputAdornment,
  InputBaseProps,
  InputProps,
  SxProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useMemo, useRef, useState } from 'react';

import { inputStyle } from '../../styles/input';
import { getPhoneDataByFieldName } from '../../utils/phone';

import CountrySelector from '../shared/CountrySelector';
import { TextMaskCustom } from '../shared/TextMaskCustom';

export type PhoneInputProps = {
  label?: string;
  name?: string;
  helperText?: string;
  initialValue?: string;
  onChange?(value: string): void;
  error?: boolean;
  handleChangeCountry?(newCountry: string): void;
  value?: string;
  variant?: TextFieldProps['variant'];
  autoFocus?: boolean;
  disabled?: boolean;
  inputProps?: InputBaseProps['inputProps'];
  InputProps?: InputProps;
  sx?: SxProps;
};

/**
 * Renders a phone input component with country selector and masking.
 */
function PhoneInput({
  name = 'phone',
  label,
  helperText,
  onChange,
  initialValue = '',
  error = false,
  value: valueProp,
  handleChangeCountry,
  inputProps: _inputProps,
  InputProps,
}: Readonly<PhoneInputProps>) {
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
  const _handleChangeCountry = (newCountry: string) => {
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

  /**
   * Handles the change event of the phone input field.
   *
   * @param e - The change event object.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    // set the value in component state, which controls the input field
    setValue(targetValue);

    // pass the value to the parent component to be handled there as well
    if (onChange) {
      onChange(targetValue);
    }
  };

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
    onChange: handleChange,
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
          <CountrySelector value={country} onChange={_handleChangeCountry} />
        </InputAdornment>
      ),
      // prevent this element from being recorded by Sentry
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // 'data-sentry-mask': config.env.env === 'production' || undefined,
    },
    fullWidth: true,
  };

  return (
    <Box width='100%'>
      {/* Use arbitrary input since the text field will contain formatted values to display on UI */}
      <input
        name={name}
        value={value.replace(/[^0-9+]/m, '')}
        readOnly
        hidden
      />
      <TextField {...inputProps} />
    </Box>
  );
}

export default PhoneInput;
