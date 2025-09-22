import { InputAdornment, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { useFormField } from '../../../core/field.hook';

type ClearFieldAdornmentProps = Readonly<{
  fieldKey: string;
  ignoreKeys?: string[];
  disabled?: boolean;
  onClick?: () => void;
}>;

type QueryInputReturn =
  | HTMLInputElement
  | HTMLTextAreaElement
  | null
  | undefined;

export function ClearFieldAdornment({
  fieldKey,
  ignoreKeys,
  onClick,
  disabled,
}: ClearFieldAdornmentProps) {
  const { field, clear } = useFormField({ key: fieldKey });

  const queryInput = (button: HTMLButtonElement): QueryInputReturn => {
    return (
      button.parentElement?.parentElement?.querySelector('input') ??
      button.parentElement?.parentElement?.querySelector('textarea')
    );
  };

  return (
    <InputAdornment position='end'>
      <IconButton
        tabIndex={-1}
        aria-label='clear value'
        edge='end'
        size='small'
        onClick={(e) => {
          // Handling disabled state
          if (disabled ?? field?.isDisabled) return;
          queryInput(e.currentTarget)?.focus();
          clear({ ignoreKeys });
          onClick?.();
        }}
        disabled={disabled ?? field?.isDisabled}
      >
        <Close fontSize='small' />
      </IconButton>
    </InputAdornment>
  );
}
