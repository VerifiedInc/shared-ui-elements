import { Stack, Typography } from '@mui/material';

import { useFormField } from '../../../core/field.hook';

export function DataFieldLabel({ fieldKey }: { fieldKey: string }) {
  const { fieldProps } = useFormField({ key: fieldKey });
  return (
    <Stack
      sx={{
        flexShrink: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 100,
        mt: 0.7,
      }}
    >
      <Typography
        component='span'
        variant={'subtitle2'}
        textTransform='uppercase'
        color='text.primary'
        sx={{
          position: 'relative',
          fontSize: 12,
          fontWeight: 700,
          textAlign: 'left',
          alignSelf: 'flex-start',
          letterSpacing: 1,
        }}
      >
        {fieldProps.label}
      </Typography>
    </Stack>
  );
}

export function DataFieldValue({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });
  return (
    <Typography
      variant='body1'
      sx={
        {
          fontSize: 20,
          fontWeight: 300,
          wordBreak: 'break-word',
          textAlign: 'left',
        } as any
      }
    >
      {field?.value || (!field?.isRequired ? '-' : null)}
    </Typography>
  );
}

export function DataFieldDescription({ fieldKey }: { fieldKey: string }) {
  const { fieldProps } = useFormField({ key: fieldKey });

  if (!fieldProps.description) return null;

  return (
    <Typography
      variant='body1'
      color='text.secondary'
      sx={{
        fontSize: 12,
        fontWeight: 400,
        wordBreak: 'break-word',
        mt: 0.5,
        mr: 1.75,
        textAlign: 'left',
      }}
    >
      {fieldProps.description}
    </Typography>
  );
}
