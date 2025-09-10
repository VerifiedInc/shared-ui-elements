import { Box, Typography } from '@mui/material';

import { useFormField } from '../../../core/field.hook';

export function FieldLabel({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });

  if (field?.isRequired) {
    return (
      <Box
        component='span'
        sx={{
          display: 'block',
          alignItems: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whitespace: 'pre',
        }}
      >
        {field.schema.characteristics.label}{' '}
        <Typography
          data-asterisk
          component='span'
          color='error'
          variant='subtitle2'
          sx={{ fontSize: 'inherit' }}
        >
          ✽
        </Typography>
      </Box>
    );
  }

  return <>{field?.schema.characteristics.label}</>;
}
