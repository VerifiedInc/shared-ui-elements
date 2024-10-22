import { Close } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';

type DataFieldClearAdornmentProps = Readonly<{
  onClick?: () => void;
  handleClear: () => void;
}>;

export function DataFieldClearAdornment({
  onClick,
  handleClear,
}: DataFieldClearAdornmentProps): React.JSX.Element {
  return (
    <InputAdornment position='end'>
      <IconButton
        aria-label='clear value'
        edge='end'
        size='small'
        onClick={() => {
          handleClear();
          onClick?.();
        }}
      >
        <Close fontSize='small' />
      </IconButton>
    </InputAdornment>
  );
}
