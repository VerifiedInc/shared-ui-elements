import { useRef, type ReactNode } from 'react';
import { Box, TextField, type TextFieldProps } from '@mui/material';

export type MemberIdInputProps = Omit<TextFieldProps, 'onChange'> & {
  onChange?: (event: { target: { value: string } }) => void;
  name?: string;
  value?: string;
  label?: ReactNode;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
};

function isRedactedValue(value: string): boolean {
  return value.includes('*') || value.includes('•');
}

// Normalize * → • then apply centered masking for display.
function buildDisplayValue(value: string): string {
  const normalized = value.replace(/\*/g, '•');
  if (normalized.includes('•')) return normalized;
  const length = normalized.length;
  if (length <= 2) return normalized;
  if (length < 5) return '•'.repeat(length - 2) + normalized.slice(-2);
  return normalized.slice(0, 2) + '•'.repeat(length - 4) + normalized.slice(-2);
}

/**
 * Masked input for member IDs. Displays the middle characters as bullets.
 * - Pre-filled / redacted values: any keystroke starts fresh; backspace clears.
 * - User-typed values: normal editing; backspace always clears the whole field.
 */
export function MemberIdInput({
  onChange,
  label = 'Member ID',
  value,
  placeholder = '',
  InputProps,
  ...rest
}: MemberIdInputProps) {
  // Tracks the last value we propagated so we can tell user-typed from external.
  const lastPropagatedRef = useRef<string | null>(null);
  // Cursor position captured in onKeyDown, used to reconstruct raw on insert/overwrite.
  const cursorRef = useRef<number>(0);

  const rawValue = value ?? '';
  const isRedacted = isRedactedValue(rawValue);
  // "Actively typing" = the user set this value themselves (not loaded from outside).
  // Empty is always active so the field accepts fresh input naturally.
  const isActivelyTyping =
    !isRedacted && (rawValue === '' || lastPropagatedRef.current === rawValue);
  const displayValue = buildDisplayValue(rawValue);

  function propagate(newRaw: string) {
    lastPropagatedRef.current = newRaw;
    onChange?.({ target: { value: newRaw } });
  }

  return (
    <Box width='100%'>
      <TextField
        {...rest}
        label={label}
        value={displayValue}
        placeholder={placeholder}
        onChange={(e) => {
          const newDisplay = e.target.value;
          const prevRaw = lastPropagatedRef.current ?? '';
          const prevDisplay = buildDisplayValue(prevRaw);
          const pos = cursorRef.current;

          if (!isActivelyTyping) {
            // Pre-filled/redacted — only reachable via paste or autofill since
            // regular keystrokes are intercepted in onKeyDown. Strip display
            // dots and treat the result as a fresh value.
            propagate(newDisplay.replace(/•/g, ''));
            return;
          }

          let newRaw: string;
          if (newDisplay.length > prevDisplay.length) {
            // Chars inserted at cursor (normal typing or paste).
            const inserted = newDisplay.slice(
              pos,
              pos + (newDisplay.length - prevDisplay.length),
            );
            newRaw =
              prevRaw.slice(0, pos) +
              inserted.replace(/•/g, '') +
              prevRaw.slice(pos);
          } else if (newDisplay.length < prevDisplay.length) {
            // Deletion via cut / drag-drop (keyboard backspace is handled below).
            const newCursor = e.target.selectionStart ?? 0;
            const removed = prevDisplay.length - newDisplay.length;
            newRaw =
              prevRaw.slice(0, newCursor) + prevRaw.slice(newCursor + removed);
          } else {
            // Same length: overwrite at cursor position.
            const newChar = newDisplay[pos] ?? '';
            newRaw = prevRaw.slice(0, pos) + newChar + prevRaw.slice(pos + 1);
          }

          propagate(newRaw);
        }}
        inputProps={{
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            cursorRef.current = e.currentTarget.selectionStart ?? 0;

            // Backspace/Delete always clears the entire field.
            if (e.key === 'Backspace' || e.key === 'Delete') {
              e.preventDefault();
              if (rawValue !== '') propagate('');
              return;
            }

            if (isActivelyTyping) return;

            // Pre-filled or redacted: start fresh with the typed char.
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
              e.preventDefault();
              propagate(e.key);
            }
          },
        }}
        InputProps={{
          ...InputProps,
          endAdornment: InputProps?.endAdornment,
        }}
        fullWidth
      />
    </Box>
  );
}
