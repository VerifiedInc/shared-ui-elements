import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useRef,
  useState,
  type ChangeEventHandler,
} from 'react';
import { Box, Stack, TextField, type TextFieldProps } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import DatePicker from 'react-datepicker';

import pickerCSS from '../../../styles/lib/react-datepicker.css?inline=true';
import { masks } from '../../../utils/masks';
import { useOnClickOutside } from '../../../hooks';
import { InputMask } from '../InputMask';

interface DateInputProps extends Omit<TextFieldProps, 'onBlur' | 'onChange'> {
  label?: string;
  value?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  overflowPicker?: boolean;
}

const GhostInput = forwardRef(function RenderInput(
  props: any,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Stack
      ref={ref}
      onClick={() => {
        props.onFocus?.();
      }}
      sx={{
        cursor: 'pointer',
      }}
    >
      <CalendarMonth color='neutral' />
    </Stack>
  );
});

const Picker = function RenderPicker({
  value,
  onChange,
  overflowPicker = false,
}: {
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  overflowPicker?: boolean;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  // Close on outside click and show on focus

  useOnClickOutside(ref, (e) => {
    const target = e.target as HTMLElement;

    // Don't close if clicking on input
    if (target.closest('.MuiInputBase-root')) {
      return;
    }

    setOpen(false);
  });

  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    // Ensure we're working with a valid date
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }

    try {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      // Validate ranges
      if (
        month === '00' ||
        month > '12' ||
        day === '00' ||
        day > '31' ||
        year < 1900 ||
        year > new Date().getFullYear()
      ) {
        return '';
      }

      return `${month}/${day}/${year}`;
    } catch (error) {
      return '';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        '& .react-datepicker-popper': overflowPicker
          ? {
              transform: 'translate(-32px, calc(-50% + 16px))!important',
            }
          : {},
      }}
    >
      <style>{pickerCSS}</style>
      <DatePicker
        open={open}
        onFocus={() => {
          setOpen((prev) => !prev);
        }}
        popperPlacement='bottom-end'
        placeholderText='MM/DD/YYYY'
        showPopperArrow={false}
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown={false}
        dateFormat='MM/dd/yyyy'
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
        selected={value ? new Date(value) : undefined}
        onChange={(date) => {
          const formattedDate = formatDate(date);
          if (formattedDate) {
            onChange?.({ target: { value: formattedDate } });
            setOpen(false);
          }
        }}
        customInput={<GhostInput />}
      />
    </Box>
  );
};

function DateInputComponent(
  {
    label = 'Date',
    value: controlledValue,
    error,
    helperText,
    onChange,
    onBlur,
    disabled,
    overflowPicker = false,
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
    InputProps: {
      endAdornment: (
        <Picker
          onChange={handleChange}
          value={value}
          overflowPicker={overflowPicker}
        />
      ),
    },
    ...rest,
  };

  return (
    <InputMask
      mask={masks.DOB_MASK}
      maskPlaceholder={null}
      disabled={disabled}
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
    >
      <TextField
        {...textFieldStyle}
        inputRef={ref}
        fullWidth
        sx={{
          flex: 1,
          '& input': {
            boxShadow: 'none!important',
            border: 'none!important',
          },
        }}
      />
    </InputMask>
  );
}

export const DateInput = forwardRef(DateInputComponent);
