import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useMemo,
  useRef,
  useState,
  type ChangeEventHandler,
} from 'react';
import { Box, Stack, TextField, type TextFieldProps } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import DatePicker from 'react-datepicker';

import { useOnClickOutside } from '../../../hooks';
import pickerCSS from '../../../styles/lib/react-datepicker.css?inline=true';
import { masks } from '../../../utils/masks';
import { InputMask } from '../InputMask';

interface DateInputProps extends Omit<TextFieldProps, 'onBlur' | 'onChange'> {
  label?: string;
  value?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  pickerDefaultSelectedDate?: Date;
  pickerClickOutsideBoundaryElement?: HTMLElement;
  pickerInputOverflow?: boolean;
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
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <CalendarToday color='neutral' fontSize='small' />
    </Stack>
  );
});

const Picker = function RenderPicker({
  value,
  onChange,
  defaultSelectedDate,
  overflow = false,
  clickOutsideBoundaryElement,
}: {
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  defaultSelectedDate?: Date;
  overflow?: boolean;
  clickOutsideBoundaryElement?: HTMLElement;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const defaultDate = new Date('08/01/1989');
  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date();

  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    // Ensure we're working with a valid date
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }

    try {
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = date.getUTCFullYear();

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

  const selected = useMemo(() => {
    if (!value) {
      return defaultSelectedDate ?? undefined;
    }
    const valueDate = new Date(value);

    if (isNaN(+valueDate)) {
      return defaultDate;
    }

    if (
      !/^\d{2}\/\d{2}\/\d{4}$/.test(value) ||
      valueDate < minDate ||
      valueDate > maxDate
    ) {
      return defaultDate;
    }
    return valueDate;
  }, [value]);

  // Close on outside click
  useOnClickOutside(
    ref,
    () => {
      setOpen(false);
    },
    'mousedown',
    {},
    clickOutsideBoundaryElement,
  );

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        '& .react-datepicker-popper': overflow
          ? {
              transform:
                'translate(calc(-100% + 32px), calc(-50% + 10px))!important',
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
        minDate={minDate}
        maxDate={maxDate}
        selected={selected}
        onSelect={(date) => {
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
    pickerDefaultSelectedDate,
    pickerClickOutsideBoundaryElement,
    pickerInputOverflow = false,
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
          overflow={pickerInputOverflow}
          clickOutsideBoundaryElement={pickerClickOutsideBoundaryElement}
          defaultSelectedDate={pickerDefaultSelectedDate}
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
