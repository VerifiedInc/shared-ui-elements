import { Box, Stack } from '@mui/material';

import { credentialTypes, fieldInputTypes } from '../../../../core/fields';
import { FormField } from '../../../../core/form';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import { DataFieldLabel, DataFieldValue, DataFieldDescription } from './style';
import { AddressField } from './address.field';

const makeAttributes = (field: FormField | undefined) => ({
  role: 'region',
  ariaLabel: field?.schema.characteristics.label,
  dataTestId:
    field?.schema.characteristics.inputType === fieldInputTypes.composite
      ? `data-field-composite-${field?.schema.key}`
      : `data-field-atomic-${field?.schema.key}`,
  credentialId: field?.id,
});

function FieldRow({
  fieldKey,
  children,
}: {
  fieldKey: string;
  children: React.ReactNode;
}) {
  const { field } = useFormField({ key: fieldKey });
  const attributes = makeAttributes(field);

  return (
    <Box component='section' {...attributes} style={{ width: '100%' }}>
      <Stack direction='row' width='100%'>
        <DataFieldLabel fieldKey={fieldKey} />
        <Stack direction='column'>{children}</Stack>
      </Stack>
    </Box>
  );
}

function FieldContainer({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });
  const attributes = makeAttributes(field);

  // If it's a composite field, render its children as individual fields
  if (
    field?.schema.characteristics.inputType === fieldInputTypes.composite &&
    field.children
  ) {
    // Custom render for the address field
    if (field.schema.type === credentialTypes.AddressCredential) {
      return (
        <FieldRow fieldKey={fieldKey}>
          <AddressField fieldKey={fieldKey} />
        </FieldRow>
      );
    }

    // Render the children of the composite field
    return (
      <Stack
        component='section'
        {...attributes}
        spacing={2}
        sx={{ width: '100%' }}
      >
        {Object.keys(field.children).map((childKey) => (
          <FieldContainer key={childKey} fieldKey={`${fieldKey}.${childKey}`} />
        ))}
      </Stack>
    );
  }

  // Render individual field
  return (
    <FieldRow fieldKey={fieldKey}>
      <DataFieldValue fieldKey={fieldKey} />
      <DataFieldDescription fieldKey={fieldKey} />
    </FieldRow>
  );
}

export function ReadonlyFields() {
  const context = useOneClickForm();
  const { fields } = context.formContext.state.form;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {Object.entries(fields).map(([fieldKey]) => {
        return <FieldContainer fieldKey={fieldKey} />;
      })}
    </Stack>
  );
}
