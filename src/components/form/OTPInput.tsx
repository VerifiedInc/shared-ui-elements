import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  type KeyboardEvent,
  useCallback,
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
  error?: boolean;
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
  const blurTimer = useRef<NodeJS.Timeout | null>(null);

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

  const idleInputStyle: SxProps = {
    borderColor: props.error
      ? theme.palette.error.main
      : // FIXME - don't know what the original color are from the palette, so assume it is disabled.
        theme.palette.action.disabled,
  };
  const hoverInputStyle: SxProps = {
    borderColor: props.error
      ? theme.palette.error.main
      : theme.palette.text.primary,
  };
  const focusInputStyle: SxProps = {
    borderColor: props.error
      ? theme.palette.error.main
      : theme.palette.primary.main,
    boxShadow: `inset 0 0 0 1px ${props.error ? theme.palette.error.main : theme.palette.primary.main}`,
  };

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
        borderRadius: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        ...idleInputStyle,
      },
      ...(!props.disabled && {
        '&:hover input': {
          ...hoverInputStyle,
        },
      }),
      ...(isFocused && {
        '& input, &:hover input': {
          ...focusInputStyle,
        },
      }),
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
    }),
    [],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      // Handle autofill (particularly from iOS/Android)
      if (value.length === 6 && /^\d{6}$/.test(value)) {
        // This is likely an autofill or paste of the entire code
        const newValue = value.split('');

        // Update the hidden input value
        if (inputRef.current) {
          inputRef.current.value = value;
        }

        // Call onChange with the complete value
        props.onChange?.({ target: { value } });

        // Update UI and blur all inputs
        inputsRef.current.forEach((input) => input?.blur());

        // Update state
        setValues(newValue);
        return;
      }

      // For manual input (single digit)
      // Get the index of the currently focused input
      // Get the correct document object (works in both iframe and non-iframe contexts)
      const ownerDocument = event.currentTarget.ownerDocument;
      const currentInputIndex = inputsRef.current.findIndex(
        (input) => input === ownerDocument.activeElement,
      );

      // Extract the last digit from input
      const lastChar = value.charAt(value.length - 1);
      // Only proceed if it's a digit
      if (!lastChar || !/^[0-9]$/.test(lastChar)) return;

      setValues((prev) => {
        // Create a copy of the current values
        const newValue = [...prev];

        // Insert the digit at the currently focused input position
        if (currentInputIndex !== -1) {
          newValue[currentInputIndex] = lastChar;
        } else {
          // Fallback: Add to the end if no input is focused
          const firstEmptyIndex = newValue.findIndex((v) => !v);
          if (firstEmptyIndex !== -1) {
            newValue[firstEmptyIndex] = lastChar;
          } else if (newValue.length < 6) {
            newValue.push(lastChar);
          }
        }

        const newValueString = newValue.join('');

        if (inputRef.current) {
          inputRef.current.value = newValueString;
        }

        // Calls onChange when all OTP fields are filled
        if (newValueString.length === 6) {
          inputsRef.current.forEach((input) => input?.blur());
          props.onChange?.({ target: { value: newValueString } });
        } else {
          // Focus the next input
          const nextInputIndex =
            currentInputIndex !== -1 ? currentInputIndex + 1 : 0;
          if (nextInputIndex < 6) {
            inputsRef.current[nextInputIndex]?.focus();
          }
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
        // Focus the previous input after deleting a value
        const prevInputIndex = newValue.length;
        if (prevInputIndex >= 0 && prevInputIndex < 6) {
          inputsRef.current[prevInputIndex]?.focus();
        }
        return newValue;
      });
    }
  }, []);

  // Handle arrow key navigation between inputs
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // Get the correct document object (works in both iframe and non-iframe contexts)
      const ownerDocument = event.currentTarget.ownerDocument;
      const currentInputIndex = inputsRef.current.findIndex(
        (input) => input === ownerDocument.activeElement,
      );

      if (currentInputIndex === -1) return;

      let nextInputIndex = currentInputIndex;

      switch (event.key) {
        case 'ArrowLeft':
          nextInputIndex = Math.max(0, currentInputIndex - 1);
          break;
        case 'ArrowRight':
          nextInputIndex = Math.min(5, currentInputIndex + 1);
          break;
        default:
          return; // Only handle arrow keys
      }

      if (nextInputIndex !== currentInputIndex) {
        event.preventDefault();
        inputsRef.current[nextInputIndex]?.focus();
        inputsRef.current[nextInputIndex]?.select();
      }
    },
    [],
  );
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    // Clear any pending blur timer
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
    }

    // Use setTimeout to avoid state updates during render phase
    blurTimer.current = setTimeout(() => {
      // Check if any of the inputs is still focused
      // Get the correct document object (works in both iframe and non-iframe contexts)
      const ownerDocument = inputsRef.current[0]?.ownerDocument;
      const anyInputFocused = inputsRef.current.some(
        (input) => input && input === ownerDocument?.activeElement,
      );

      if (!anyInputFocused) {
        setIsFocused(false);
      }
    }, 0);
  }, []);

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
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              tabIndex={index + startIndex + 1}
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
      handleKeyDown,
      handleBlur,
      values,
      inputProps,
      props.autoComplete,
      props.disabled,
    ],
  );

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
      <Stack data-testid='otp-input-container' {...inputContainerProps}>
        {renderInputGroup(0)}
        <Typography sx={{ fontWeight: '700', fontSize: 32 }}>-</Typography>
        {renderInputGroup(3)}
      </Stack>
    </Box>
  );
}

export const OTPInput = forwardRef(OTPInputComponent);
