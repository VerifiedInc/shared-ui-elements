import { ReactElement } from 'react';
import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

import { CredentialFieldSet } from '../types';
import { isSomeFieldInputAllowed } from '../utils';
import { useCredentialsDisplay } from '../CredentialsDisplayContext';

export function EditModeButton(): ReactElement | null {
  const context = useCredentialsDisplay();
  const form = useFormContext<CredentialFieldSet>();
  const data = form.watch();
  const shouldShow = isSomeFieldInputAllowed(data);

  if (context.isEditMode || !shouldShow) return null;

  return (
    <Button
      variant='text'
      size='small'
      color='neutral'
      startIcon={<Edit aria-hidden='true' />}
      sx={{
        position: 'absolute',
        top: 4,
        right: 0,
        zIndex: 1,
      }}
      onClick={() => {
        context.setEditMode(true);
      }}
    >
      Edit
    </Button>
  );
}
