import { ReactElement } from 'react';
import { StackProps } from '@mui/material';

import { useCredentialsDisplay } from '../CredentialsDisplay/CredentialsDisplayContext';

import { DataFieldStack } from './DataFieldStack';

/**
 * This component renders a sequence of data field atomic/composite credentials and spaces them.
 * @param props
 * @constructor
 */
export function DataFieldRootStack(props: StackProps): ReactElement {
  const context = useCredentialsDisplay();

  return (
    <DataFieldStack
      {...props}
      role='button'
      onClick={() => {
        if (context.isEditMode) return;
        context.setEditMode(true);
      }}
    />
  );
}
