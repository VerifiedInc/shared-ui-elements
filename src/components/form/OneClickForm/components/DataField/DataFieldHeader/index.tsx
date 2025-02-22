import { Box, SxProps } from '@mui/material';

import { HeaderSelect } from './HeaderSelect';

type DataFieldHeaderProps = Readonly<{
  block?: boolean;
  onFocus?: () => void;
}>;

/**
 * This component renders the select for the composite level credential, it manages the selection
 * of desired credential to be used.
 * @constructor
 */
export function DataFieldHeader(props: DataFieldHeaderProps) {
  const containerStyle: SxProps = {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  };
  const containerBoxStyle: SxProps = {
    width: props.block ? '100%' : 'auto',
    minWidth: '150px',
    maxWidth: '100%',
    display: 'flex',
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={containerBoxStyle}>
        <HeaderSelect />
      </Box>
    </Box>
  );
}
