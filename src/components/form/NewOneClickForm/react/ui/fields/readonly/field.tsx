import { Box, Stack } from '@mui/material';

import { credentialTypes, fieldInputTypes } from '../../../../core/fields';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import { makeAttributes } from '../shared';

import { FieldLabel } from './style';
import { MultiField } from './multi.field';
import { SingleField } from './single.field';

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
        <FieldLabel fieldKey={fieldKey} />
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
          <MultiField fieldKey={fieldKey} />
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
      {field?.hasVariants ? (
        <MultiField fieldKey={fieldKey} />
      ) : (
        <SingleField fieldKey={fieldKey} />
      )}
    </FieldRow>
  );
}

export function ReadonlyFields() {
  const context = useOneClickForm();
  const { fields } = context.formContext.state.form;

  return (
    <Stack
      spacing={2}
      sx={{ width: '100%' }}
      onClick={() => {
        if (context.formContext.state.form?.isDisabled) return;
        context.setEditMode(true);
      }}
    >
      {Object.entries(fields).map(([fieldKey, field]) => {
        // Phone credential should not be rendered
        if (field.schema.type === credentialTypes.PhoneCredential) return null;
        return <FieldContainer key={fieldKey} fieldKey={fieldKey} />;
      })}
    </Stack>
  );
}
