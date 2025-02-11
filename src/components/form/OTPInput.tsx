import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Stack,
  type StackProps,
  type SxProps,
  TextField,
  InputBase,
  type InputBaseProps,
  Typography,
  useTheme,
  FormControl,
} from '@mui/material';
import { v4 as uuid } from 'uuid';

interface OTPInputProps {
  name?: string;
  onChange?: (event: { target: { value: string } }) => void;
  disabled?: boolean;
  sx?: SxProps;
  autoComplete?: string;
}

export type OTPInputInstance = Readonly<{
  focus: () => void;
  blur: () => void;
  clear: () => void;
}> & { get value(): string; set value(newValue: string) };

/**
 * OTP input component that displays individual field for each value.
 * @param props
 * @param ref
 * @constructor
 */
function OTPInputComponent(
  props: OTPInputProps,
  ref: ForwardedRef<OTPInputInstance> | null,
): React.JSX.Element {
  const theme = useTheme();
  // Generate unique ids for each input.
  const ids = useRef(Array.from({ length: 6 }, () => uuid()));
  const [values, setValues] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [isFocused, setIsFocused] = useState(false);

  // Control inputs from outside via ref.
  useImperativeHandle(
    ref,
    () => ({
      get value() {
        return values.join('');
      },
      set value(newValue: string) {
        setValues(newValue.split(''));
        // Trigger onChange when the value is set from outside.
        props.onChange?.({ target: { value: newValue } });
      },
      focus() {
        inputsRef.current[0]?.click();
        inputsRef.current[0]?.focus();
      },
      blur() {
        inputsRef.current.forEach((input) => input?.blur());
      },
      clear() {
        setValues([]);
      },
    }),
    [props, values],
  );

  const inputContainerProps: StackProps = {
    boxSizing: 'content-box',
    direction: 'row',
    alignItems: 'center',
    spacing: 1.25,
    sx: {
      '& input': {
        textAlign: 'center',
        fontWeight: 500,
        height: 30,
        [theme.breakpoints.down('xs')]: {
          height: 16,
          fontSize: 16,
          pt: 1,
          pb: 1,
          px: 1,
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: 28,
          px: 1,
        },
        fontSize: 32,
        py: 1.75,
      },
    },
  };
  const inputProps: InputBaseProps = useMemo(
    () => ({
      inputProps: {
        inputMode: 'numeric',
        pattern: '[0-9]*',
        autoCorrect: 'off',
        autoCapitalize: 'off',
      },
      sx: {
        '& input': {
          borderRadius: 1,
          borderStyle: 'solid',
          borderColor: 'rgba(0, 0, 0, 0.23)',
          borderWidth: 1,
        },
        ...(isFocused && {
          '& input': {
            borderRadius: 1,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: theme.palette.primary.main,
            boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
          },
        }),
      },
    }),
    [isFocused, theme.palette.primary.main],
  );

  const focusFirstEmptyInput = useCallback(() => {
    const valuesString = values.join('');
    const firstEmptyInput = inputsRef.current[valuesString.length];

    firstEmptyInput?.focus();
    firstEmptyInput?.select();
  }, [values]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      // Allow up to 6 digits only.
      if (!value.length || !/^[0-9]{1,6}$/.test(value)) return;

      setValues((prev) => {
        const newValue = value.length === 6 ? [...value] : [...prev, ...value];
        const newValueString = newValue.join('');

        if (inputRef.current) {
          inputRef.current.value = newValue.join('');
        }

        // Calls onChange when all OTP fields are filled.
        if (newValueString.length === 6) {
          inputsRef.current.forEach((input) => input?.blur());
          props.onChange?.({ target: { value: newValueString } });
        }

        return newValue;
      });
    },
    [props],
  );

  const handleKeyUp = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      setValues((prev) => {
        const newValue = [...prev.slice(0, -1)];
        if (inputRef.current) {
          inputRef.current.value = newValue.join('');
        }
        return newValue;
      });
    }
  }, []);

  const handleFocus = useCallback(() => {
    focusFirstEmptyInput();
    setIsFocused(true);
  }, [focusFirstEmptyInput]);

  const renderInputGroup = useCallback(
    (startIndex: number) => {
      return new Array(3).fill(undefined).map((_, index) => {
        return (
          // FormControl is required for InputBase to avoid bad setState in handleBlur event, and it is one per input.
          <FormControl key={ids.current[index + startIndex]}>
            <InputBase
              inputRef={(input) =>
                ((inputsRef.current[index + startIndex] as any) = input)
              }
              autoComplete={props.autoComplete ?? 'one-time-code'}
              autoFocus={index + startIndex === 0}
              value={values[index + startIndex] || ''}
              disabled={props.disabled}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              onFocus={handleFocus}
              onBlur={() => setIsFocused(false)}
              {...inputProps}
              data-testid={`otp-input-${index + startIndex}`}
            />
          </FormControl>
        );
      });
    },
    [
      handleChange,
      handleFocus,
      handleKeyUp,
      inputProps,
      props.disabled,
      values,
    ],
  );

  // Focus the first empty input when the value changes.
  useEffect(() => {
    focusFirstEmptyInput();
  }, [focusFirstEmptyInput]);

  return (
    <Box width='100%' sx={props.sx}>
      {/* Use input facade to update the value and listen to changes */}
      <div style={{ display: 'none!important', pointerEvents: 'none' }}>
        <TextField
          inputRef={inputRef}
          name={props.name}
          type='text'
          value={values.join('') || ''}
          sx={{ pointerEvents: 'none', display: 'none' }}
          inputProps={{ hidden: true }}
        />
      </div>
      <Stack {...inputContainerProps} onClick={focusFirstEmptyInput}>
        {renderInputGroup(0)}
        <Typography sx={{ fontWeight: '700', fontSize: 32 }}>-</Typography>
        {renderInputGroup(3)}
      </Stack>
    </Box>
  );
}

export const OTPInput = forwardRef(OTPInputComponent);
