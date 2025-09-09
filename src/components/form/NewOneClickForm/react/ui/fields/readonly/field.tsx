import { Box, Stack } from '@mui/material';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import { DataFieldLabel, DataFieldValue, DataFieldDescription } from './style';

function FieldRow({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });

  // If it's a composite field, render its children as individual fields
  if (
    field?.schema.characteristics.inputType === 'composite' &&
    field.children
  ) {
    return (
      <Stack
        component='section'
        role='region'
        aria-label={field?.schema.characteristics.label}
        data-testid={`data-field-composite-${field.schema.key}`}
        data-credentialid={field?.id}
        spacing={2}
        sx={{ width: '100%' }}
      >
        {Object.keys(field.children).map((childKey) => (
          <FieldRow key={childKey} fieldKey={`${fieldKey}.${childKey}`} />
        ))}
      </Stack>
    );
  }

  // Render individual field
  return (
    <Box
      component='section'
      role='region'
      aria-label={field?.schema.characteristics.label}
      data-testid={`data-field-atomic-${field?.schema.key}`}
      data-credentialid={field?.id}
      style={{ width: '100%' }}
    >
      <Stack direction='row' width='100%'>
        <DataFieldLabel fieldKey={fieldKey} />
        <Stack direction='column'>
          <DataFieldValue fieldKey={fieldKey} />
          <DataFieldDescription fieldKey={fieldKey} />
        </Stack>
      </Stack>
    </Box>
  );
}

export function ReadonlyFields() {
  const context = useOneClickForm();
  const { fields } = context.formContext.state.form;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {Object.entries(fields).map(([fieldKey]) => {
        return <FieldRow fieldKey={fieldKey} />;
      })}
    </Stack>
  );
}
