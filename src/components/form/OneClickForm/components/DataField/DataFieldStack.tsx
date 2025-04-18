import { ReactElement } from 'react';
import { Stack, StackProps } from '@mui/material';

import { useCredentialsDisplay } from '../CredentialsDisplay/CredentialsDisplayContext';

/**
 * This component renders a sequence of data field atomic/composite credentials and spaces them.
 * @param props
 * @constructor
 */
export function DataFieldStack(props: StackProps): ReactElement {
  const context = useCredentialsDisplay();

  return (
    <Stack
      direction='column'
      {...props}
      sx={{ width: '100%', ...props.sx }}
      spacing={context.isEditMode ? 2.125 : 1.1875}
    />
  );
}
