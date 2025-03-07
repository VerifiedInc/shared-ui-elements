import { ReactElement } from 'react';
import { Box, SxProps } from '@mui/material';

import { HeaderSelect } from './HeaderSelect';
import { DataFieldLabel } from '../DataFieldLabel';

type DataFieldHeaderProps = Readonly<{
  block?: boolean;
  onFocus?: () => void;
}>;

/**
 * This component renders the select for the composite level credential, it manages the selection
 * of desired credential to be used.
 * @constructor
 */
export function DataFieldHeader(props: DataFieldHeaderProps): ReactElement {
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
        <DataFieldLabel />
        <HeaderSelect />
      </Box>
    </Box>
  );
}
