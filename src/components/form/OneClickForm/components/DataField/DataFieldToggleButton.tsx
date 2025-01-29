import { IconButton, IconButtonProps } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

type DataFieldToggleButtonProps = IconButtonProps;

/**
 * This component renders and manages the expand/collapse of composite credentials.
 * @param props
 * @constructor
 */
export function DataFieldToggleButton(props: DataFieldToggleButtonProps) {
  return (
    <IconButton
      color='primary'
      aria-label='expanded'
      sx={{ flexShrink: 0, alignSelf: 'center' }}
      {...props}
    >
      <ExpandMore />
    </IconButton>
  );
}
