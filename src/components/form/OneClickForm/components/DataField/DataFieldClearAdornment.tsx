import { ReactElement, ReactNode } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

type DataFieldClearAdornmentProps = Readonly<{
  onClick?: () => void;
}>;

type QueryInputReturn =
  | HTMLInputElement
  | HTMLTextAreaElement
  | null
  | undefined;

export function DataFieldClearAdornment({
  onClick,
}: DataFieldClearAdornmentProps) {
  const { handleClearValueCredential } = useCredentialsDisplayItem();
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
          queryInput(e.currentTarget)?.focus();
          handleClearValueCredential();
          onClick?.();
        }}
      >
        <Close fontSize='small' />
      </IconButton>
    </InputAdornment>
  );
}
