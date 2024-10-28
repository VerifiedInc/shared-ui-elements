import { Box, TextField } from '@mui/material';
import { forwardRef, useState, type ChangeEventHandler } from 'react';
import {
  formatDateDDMMYYYY,
  getMaxDateInstance,
  getMinDateInstance,
} from '../../utils/date';
import { masks } from '../../utils/masks';
import { USDateSchema } from '../../validations';
import { type TextFieldProps } from '../TextField';
import { InputMask } from './InputMask';
import { inputStyle } from './styles/input';

interface DateInputProps {
  name?: string;
  value?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (event: { target: { value: string } }) => void;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  allowFutureDates?: boolean;
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
    onBlur,
    disabled,
    allowFutureDates = true,
    ...rest
  }: Readonly<DateInputProps>,
  ref: any,
): React.JSX.Element {
  // Arbitrary value to format the timestamp into human-readable date.
  const [localValue, setLocalValue] = useState<string>(
    value ? formatDateDDMMYYYY(value) : '',
  );

  const minDateInstance = getMinDateInstance();
  const maxDateInstance = getMaxDateInstance(allowFutureDates);

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
      // Mask type date.
      mask: masks.DOB_MASK,
    },
    fullWidth: true,
  };

  return (
    <Box width='100%'>
      <InputMask
        mask={masks.DOB_MASK}
        maskPlaceholder={null}
        value={localValue}
        onBlur={onBlur}
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
        <TextField {...textFieldStyle} inputRef={ref} {...rest} />
      </InputMask>
    </Box>
  );
}

export const DateInput = forwardRef(DateInputComponent);
