import { Box, TextField, type TextFieldProps } from '@mui/material';
import { forwardRef, useState, type ChangeEventHandler } from 'react';
import { masks } from '../../utils/masks';
import { InputMask } from './InputMask';
import { inputStyle } from './styles/input';

interface DateInputProps extends Omit<TextFieldProps, 'onBlur' | 'onChange'> {
  label?: string;
  value?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
}

function DateInputComponent(
  {
    label = 'Date',
    value: controlledValue,
    error,
    helperText,
    onChange,
    onBlur,
    disabled,
    ...rest
  }: Readonly<DateInputProps>,
  ref: any,
): React.JSX.Element {
  const [internalValue, setInternalValue] = useState<string>('');

  // Determine the value to display
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: any): void => {
    const date = e.target.value;
    if (!isControlled) {
      setInternalValue(date); // Update internal state only if uncontrolled
    }

    if (onChange) {
      onChange(date);
    }
  };

  const textFieldStyle: TextFieldProps = {
    ...inputStyle,
    label,
    error,
    helperText,
    inputProps: {
      // Set the input mode to numeric.
      inputMode: 'numeric',
      // Tab index for each block.
      tabIndex: 0,
      // Mask type date.
      mask: masks.DOB_MASK,
    },
    fullWidth: true,
    ...rest,
  };

  return (
    <Box width='100%'>
      <InputMask
        mask={masks.DOB_MASK}
        maskPlaceholder={null}
        disabled={disabled}
        value={value}
        onBlur={onBlur}
        onChange={handleChange}
      >
        <TextField {...textFieldStyle} inputRef={ref} />
      </InputMask>
    </Box>
  );
}

export const DateInput = forwardRef(DateInputComponent);
