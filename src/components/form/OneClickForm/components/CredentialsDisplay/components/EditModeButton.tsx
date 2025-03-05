import { ReactElement, useState } from 'react';
import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';

import { useCredentialsDisplay } from '../CredentialsDisplayContext';

export function EditModeButton(): ReactElement | null {
  const context = useCredentialsDisplay();
  const [isVisible, setVisibility] = useState(true);

  if (!isVisible) return null;

  return (
    <Button
      variant='text'
      size='small'
      color='neutral'
      startIcon={<Edit />}
      sx={{
        position: 'absolute',
        top: 8,
        right: 14.5,
        zIndex: 1,
      }}
      onClick={() => {
        setVisibility(false);
        context.setEditMode(true);
      }}
    >
      Edit
    </Button>
  );
}
