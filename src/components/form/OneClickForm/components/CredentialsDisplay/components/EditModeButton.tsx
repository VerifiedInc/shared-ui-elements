import { ReactElement } from 'react';
import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';

import { useCredentialsDisplay } from '../CredentialsDisplayContext';

export function EditModeButton(): ReactElement | null {
  const context = useCredentialsDisplay();

  if (context.isEditMode) return null;

  return (
    <Button
      variant='text'
      size='small'
      color='neutral'
      startIcon={<Edit />}
      sx={{
        position: 'absolute',
        top: 0,
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
