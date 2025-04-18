import { ReactElement } from 'react';
import { StackProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { CredentialFieldSet } from '../CredentialsDisplay/types';
import { isSomeFieldInputAllowed } from '../CredentialsDisplay/utils';
import { useCredentialsDisplay } from '../CredentialsDisplay/CredentialsDisplayContext';

import { DataFieldStack } from './DataFieldStack';

/**
 * This component renders a sequence of data field atomic/composite credentials and spaces them.
 * @param props
 * @constructor
 */
export function DataFieldRootStack(props: StackProps): ReactElement {
  const context = useCredentialsDisplay();
  const form = useFormContext<CredentialFieldSet>();
  const data = form.watch();
  const shouldShow = isSomeFieldInputAllowed(data);
  return (
    <DataFieldStack
      {...props}
      role='button'
      onClick={(e) => {
        if (context.isEditMode || !shouldShow) return;
        context.setEditMode(true);
      }}
    />
  );
}
