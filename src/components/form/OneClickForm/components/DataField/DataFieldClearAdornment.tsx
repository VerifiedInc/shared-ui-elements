import { Close } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';

import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

type DataFieldClearAdornmentProps = Readonly<{
  onClick?: () => void;
}>;

export function DataFieldClearAdornment({
  onClick,
}: DataFieldClearAdornmentProps) {
  const { handleClearValueCredential } = useCredentialsDisplayItem();
  return (
    <InputAdornment position='end'>
      <IconButton
        tabIndex={-1}
        aria-label='clear value'
        edge='end'
        size='small'
        onClick={() => {
          handleClearValueCredential();
          onClick?.();
        }}
      >
        <Close fontSize='small' />
      </IconButton>
    </InputAdornment>
  );
}
