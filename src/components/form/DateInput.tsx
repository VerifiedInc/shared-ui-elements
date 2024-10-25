import { type TextFieldProps } from '../TextField';
import { formatDateDDMMYYYY } from '../../utils/date';
import { USDateSchema } from '../../validations';
import { Box, TextField, type InputProps } from '@mui/material';
import { forwardRef, useState, type ReactNode } from 'react';
import { inputStyle } from './styles/input';
import { InputMask } from './InputMask';
import { masks } from '../../utils/masks';

interface DateInputProps {
  name?: string;
  value?: string;
  label?: ReactNode;
  error?: boolean;
  helperText?: string;
  onChange?: (event: { target: { value: string } }) => void;
  disabled?: boolean;
  allowFutureDates?: boolean;
  InputProps?: InputProps;
}

/**
 * The input with date format.
 * @constructor
 */
function DateInputComponent(
  {
    label = 'Date of Birth',
    value,
    error,
    helperText,
    onChange,
    disabled,
    allowFutureDates = true,
    InputProps,
  }: Readonly<DateInputProps>,
  ref: any,
): React.JSX.Element {
  // Arbitrary value to format the timestamp into human-readable date.
  const [localValue, setLocalValue] = useState<string>(
    value ? formatDateDDMMYYYY(value) : '',
  );
  const nowDate = new Date();
  const minDate = 1;
  const minMonth = 1;
  const minYear = 1900;
  const minDateInstance = new Date(minYear, minMonth - 1, minDate, 0, 0, 0, 0);

  const maxDate = allowFutureDates ? 31 : nowDate.getDate();
  const maxMonth = allowFutureDates ? 12 : nowDate.getMonth() + 1;
  const maxYear = allowFutureDates ? 2200 : nowDate.getFullYear();
  const maxDateInstance = new Date(
    maxYear,
    maxMonth - 1,
    maxDate,
    23,
    59,
    59,
    999,
  );

  const textFieldStyle: TextFieldProps = {
    ...inputStyle,
    label,
    error,
    disabled,
    helperText,
    inputProps: {
      // Set the input mode to numeric.
      inputMode: 'numeric',
      // Tab index for each block.
      tabIndex: 0,
      // Use onComplete event.
      useOnComplete: false,
      // Mask type date.
      mask: masks.DOB_MASK,
    },
    InputProps: {
      ...InputProps,
    },
    fullWidth: true,
  };

  return (
    <Box width='100%'>
      <input value={value} hidden readOnly />
      <InputMask
        mask={masks.DOB_MASK}
        maskPlaceholder={null}
        value={localValue}
        onChange={(e) => {
          const value = e.target.value;
          const valid = USDateSchema.safeParse(value);

          // Update the facade input value, so it let user input wrong/right values.
          setLocalValue(value);

          if (!valid.success) {
            // A way to make sure the data field state is invalid is to empty the value.
            return onChange?.({ target: { value: '' } });
          }

          const date = new Date(value);
          if (date < minDateInstance || date > maxDateInstance) {
            // A way to make sure the data field state is invalid is to empty the value.
            return onChange?.({ target: { value: '' } });
          }

          date.setUTCHours(12);

          // The date is valid in the US date format and is in between the valid min-max date range.
          onChange?.({ target: { value: String(+date) } });
        }}
      >
        <TextField {...textFieldStyle} inputRef={ref} />
      </InputMask>
    </Box>
  );
}

export const DateInput = forwardRef(DateInputComponent);
