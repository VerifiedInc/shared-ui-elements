import { forwardRef, useMemo } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import { CalendarToday, Close } from '@mui/icons-material';
import ReactDatePickerImport from 'react-datepicker';

import { reactDatepickerCss as pickerCSS } from '../../../../styles/lib/react-datepicker';

import { dayToRuleDate, ruleDateToDay } from '../../utils/date';

// CJS/ESM interop, same guard as `DateInput`.
const DatePicker: typeof ReactDatePickerImport =
  (ReactDatePickerImport as any).default ?? ReactDatePickerImport;

const POPPER_CLASS = 'network-rules-date-popper';

export interface DateFieldProps {
  label: string;
  /** `YYYY-MM-DD` or null. */
  value: string | null;
  onChange: (value: string | null) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  name?: string;
  /** CSP nonce for the inline style tag; defaults to `<meta property="csp-nonce">`. */
  nonce?: string;
}

type InputProps = TextFieldProps & { onClear?: () => void };

const Input = forwardRef<HTMLInputElement, InputProps>(function DateFieldInput(
  { onClear, InputProps: muiInputProps, disabled, ...props },
  ref,
) {
  return (
    <TextField
      {...props}
      disabled={disabled}
      inputRef={ref}
      fullWidth
      InputProps={{
        ...muiInputProps,
        endAdornment: (
          <InputAdornment position='end'>
            {onClear && !disabled && (
              <IconButton
                size='small'
                aria-label='Clear date'
                onClick={(event) => {
                  event.stopPropagation();
                  onClear();
                }}
              >
                <Close fontSize='small' />
              </IconButton>
            )}
            <CalendarToday fontSize='small' color='action' />
          </InputAdornment>
        ),
      }}
    />
  );
});

/** Calendar-day picker for a rule date. */
export function DateField({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled,
  required,
  minDate,
  maxDate,
  placeholder = 'MM/DD/YYYY',
  name,
  nonce: nonceProp,
}: Readonly<DateFieldProps>) {
  const nonce = useMemo(() => {
    if (nonceProp) return nonceProp;
    if (typeof document === 'undefined') return undefined;
    return (
      document
        .querySelector('meta[property="csp-nonce"]')
        ?.getAttribute('content') ?? undefined
    );
  }, [nonceProp]);

  const selected = useMemo(() => ruleDateToDay(value), [value]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        // The calendar inherits its font; hosts that set fonts per component need it here.
        fontFamily: (theme) => theme.typography.fontFamily,
      }}
    >
      <style
        nonce={nonce}
      >{`${pickerCSS}\n.${POPPER_CLASS}{z-index:1500;}`}</style>
      <DatePicker
        selected={selected}
        autoComplete='off'
        onChange={(date) => {
          onChange(dayToRuleDate(date));
        }}
        onBlur={onBlur}
        dateFormat='MM/dd/yyyy'
        placeholderText={placeholder}
        showPopperArrow={false}
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown={false}
        popperClassName={POPPER_CLASS}
        // Fixed so a scrolling dialog body does not clip the calendar.
        popperProps={{ strategy: 'fixed' }}
        popperPlacement='bottom-start'
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        name={name}
        customInput={
          <Input
            label={label}
            error={error}
            helperText={helperText}
            required={required}
            onClear={value !== null ? () => onChange(null) : undefined}
          />
        }
      />
    </Box>
  );
}
