import { Stack, Typography, SxProps } from '@mui/material';

import { useFormField } from '../../core/field.hook';

import { getRawValue, makeAttributes } from './shared';

export function FieldLabel({
  fieldKey,
  sx,
}: {
  fieldKey: string;
  sx?: SxProps;
}) {
  const { fieldProps } = useFormField({ key: fieldKey });
  return (
    <Stack
      sx={{
        flexShrink: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 100,
        mt: 0.7,
        ...sx,
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

export function FieldValue({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });

  if (!field) return null;

  return (
    <Typography
      data-testid={`data-field-value-${fieldKey}`}
      data-verified-sdk-raw-value={getRawValue(field)}
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
      {field?.displayValue || (!field?.isRequired ? '-' : null)}
    </Typography>
  );
}

export function FieldDescription({ fieldKey }: { fieldKey: string }) {
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

export function FieldRowContainer({
  fieldKey,
  children,
  spacing,
}: {
  fieldKey: string;
  children: React.ReactNode;
  spacing?: number;
}) {
  const { field } = useFormField({ key: fieldKey });
  const attributes = makeAttributes(field);

  return (
    <Stack
      component='section'
      {...attributes}
      spacing={spacing}
      style={{ width: '100%' }}
    >
      {children}
    </Stack>
  );
}

export function FieldRow({
  fieldKey,
  children,
}: {
  fieldKey: string;
  children: React.ReactNode;
}) {
  return (
    <FieldRowContainer fieldKey={fieldKey}>
      <Stack direction='row' width='100%'>
        <FieldLabel fieldKey={fieldKey} />
        <Stack direction='column'>{children}</Stack>
      </Stack>
    </FieldRowContainer>
  );
}

export function FieldSectionTitle({ fieldKey }: { fieldKey: string }) {
  return (
    <Stack>
      <FieldLabel fieldKey={fieldKey} sx={{ width: '100%', mt: 0 }} />
      <FieldDescription fieldKey={fieldKey} />
    </Stack>
  );
}

export function FieldSectionContent({
  children,
  spacing,
  sx,
}: {
  children: React.ReactNode;
  spacing?: number;
  sx?: SxProps;
}) {
  return (
    <Stack
      spacing={spacing}
      sx={{
        pl: 2,
        borderLeftWidth: 1,
        borderLeftColor: 'neutral.main',
        borderLeftStyle: 'solid',
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
}
