import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
  useState,
  type ChangeEventHandler,
} from 'react';
import {
  Box,
  IconButton,
  Stack,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import ReactDatePickerImport from 'react-datepicker';

import { useOnClickOutside } from '../../../hooks';
import { reactDatepickerCss as pickerCSS } from '../../../styles/lib/react-datepicker';
import { masks } from '../../../utils/masks';

import { InputMask, InputMaskProps } from '../InputMask';
import { ChangeEvent, TextMaskCustom } from '../TextMaskCustom';

// CJS/ESM interop: some bundlers don't unwrap the module default when resolving
// the externalized react-datepicker CJS build, returning the exports object
// instead of the class. This guard handles both cases safely.
const DatePicker: typeof ReactDatePickerImport =
  (ReactDatePickerImport as any).default ?? ReactDatePickerImport;

interface DateInputProps extends Omit<TextFieldProps, 'onBlur' | 'onChange'> {
  label?: ReactNode;
  value?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  pickerDefaultSelectedDate?: Date;
  pickerClickOutsideBoundaryElement?: HTMLElement | null;
  pickerInputOverflow?: boolean;
  inputMaskProps?: Readonly<Partial<InputMaskProps>>;
  minDate?: Date;
  maxDate?: Date;
  InputProps?: TextFieldProps['InputProps'] & {
    'data-mask-me'?: boolean;
  };
  redactYear?: boolean;
}

const GhostInput = forwardRef(function RenderInput(
  props: any,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Stack ref={ref} sx={{ position: 'relative' }}>
      <IconButton
        edge='end'
        size='small'
        onClick={() => {
          if (props.disabled) return;
          props.onFocus?.();
        }}
        disabled={props.disabled}
      >
        <CalendarToday fontSize='small' />
      </IconButton>
    </Stack>
  );
});

const Picker = function RenderPicker({
  value,
  onChange,
  defaultSelectedDate,
  overflow = false,
  clickOutsideBoundaryElement,
  minDate: _minDate,
  maxDate: _maxDate,
  disabled,
  nonce: _nonce,
}: {
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  defaultSelectedDate?: Date;
  overflow?: boolean;
  clickOutsideBoundaryElement?: HTMLElement | null;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  /**
   * CSP nonce applied to the inline <style> tag. Pass this from the server
   * (e.g. Next.js middleware/headers) so the style tag carries a nonce during
   * SSR. Falls back to reading `<meta property="csp-nonce">` on the client.
   */
  nonce?: string;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const nonce = useMemo(() => {
    if (_nonce) return _nonce;
    if (typeof document === 'undefined') return undefined;
    return (
      document
        .querySelector('meta[property="csp-nonce"]')
        ?.getAttribute('content') ?? undefined
    );
  }, [_nonce]);

  const defaultDate = new Date('08/01/1989');
  const minDate = _minDate ?? new Date(1900, 0, 1);
  const maxDate = _maxDate ?? new Date();

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
        year > maxDate.getFullYear()
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
      <style nonce={nonce}>{pickerCSS}</style>
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
        dropdownMode='select'
        onSelect={(date) => {
          const formattedDate = formatDate(date);
          if (formattedDate) {
            onChange?.({ target: { value: formattedDate } });
            setOpen(false);
          }
        }}
        disabled={disabled}
        customInput={<GhostInput disabled={disabled} />}
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
    inputMaskProps,
    minDate,
    maxDate,
    redactYear = false,
    ...props
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

  const pickerAdornment = (
    <>
      {!redactYear && (
        <Picker
          onChange={handleChange}
          value={value}
          overflow={pickerInputOverflow}
          clickOutsideBoundaryElement={pickerClickOutsideBoundaryElement}
          defaultSelectedDate={pickerDefaultSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
        />
      )}
      {props.InputProps?.endAdornment}
    </>
  );

  const textFieldSx = {
    flex: 1,
    '& input': {
      boxShadow: 'none!important',
      border: 'none!important',
      letterSpacing: '1px',
    },
  };

  // When redactYear is enabled, use TextMaskCustom (imask) with displayChar
  // to show the year as ••••, exactly like the SSN input. If the user removes
  // characters, the entire value is cleared so they re-enter from scratch.
  if (redactYear) {
    return (
      <TextField
        label={label}
        error={error}
        helperText={helperText}
        fullWidth
        {...props}
        autoComplete='bday'
        inputRef={ref}
        value={value?.replace(/-/g, '') ?? ''}
        onChange={
          ((e, nativeEvent) => {
            if (!nativeEvent) return;
            const currentValue = value?.replace(/\//g, '') ?? '';
            const newValue = e.target.value.replace(/\//g, '');
            // If the user is removing characters, clear the field
            if (newValue.length < currentValue.length) {
              onChange?.('');
              if (!isControlled) setInternalValue('');
              return;
            }
            onChange?.(e.target.value);
            if (!isControlled) setInternalValue(e.target.value);
          }) as ChangeEvent
        }
        onBlur={onBlur as any}
        disabled={disabled}
        placeholder='__/__/____'
        inputProps={{
          ...props.inputProps,
          useOnComplete: false,
          unmask: false,
          lazy: true,
          mask: '00/00/YYYY',
          definitions: {
            Y: {
              mask: /[0-9•]/,
              displayChar: '•',
            },
          },
          placeholderChar: '_',
          inputMode: 'numeric',
          overwrite: false,
          tabIndex: 0,
        }}
        InputProps={{
          ...props.InputProps,
          inputComponent: TextMaskCustom as any,
          endAdornment: pickerAdornment,
        }}
        sx={textFieldSx}
      />
    );
  }

  const textFieldStyle: TextFieldProps = {
    label,
    error,
    helperText,
    fullWidth: true,
    ...props,
    autoComplete: 'bday',
    inputProps: {
      ...props.inputProps,
      // Set the input mode to numeric.
      inputMode: 'numeric',
      // Tab index for each block.
      tabIndex: 0,
      // Mask type date.
      mask: masks.DOB_MASK,
    },
    InputProps: {
      ...props.InputProps,
      endAdornment: pickerAdornment,
    },
  };

  return (
    <InputMask
      mask={masks.DOB_MASK}
      maskPlaceholder={null}
      disabled={disabled}
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
      {...inputMaskProps}
    >
      <TextField
        {...textFieldStyle}
        inputRef={ref}
        fullWidth
        sx={textFieldSx}
      />
    </InputMask>
  );
}

export const DateInput = forwardRef(DateInputComponent);
