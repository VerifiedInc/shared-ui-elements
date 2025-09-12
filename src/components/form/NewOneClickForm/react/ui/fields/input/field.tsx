import { Stack } from '@mui/material';

import { credentialKeys, fieldInputTypes } from '../../../../core/fields';
import { FormField } from '../../../../core/form';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import { makeAttributes } from '../shared';

import { AddressInputField } from './address.field';
import { TextInputField } from './text.field';
import { SelectInputField } from './select.field';
import { SSNInputField } from './ssn.field';
import { DateInputField } from './date.field';

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
    <Stack component='section' {...attributes} style={{ width: '100%' }}>
      {children}
    </Stack>
  );
}

function FieldContainer({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });

  const renderField = (fieldKey: string, field: FormField | undefined) => {
    if (
      field?.schema.characteristics.inputType === fieldInputTypes.text &&
      field?.schema.key === credentialKeys.ssn
    ) {
      return <SSNInputField fieldKey={fieldKey} />;
    }

    if (field?.schema.characteristics.inputType === fieldInputTypes.date) {
      return <DateInputField fieldKey={fieldKey} />;
    }

    if (field?.schema.characteristics.inputType === fieldInputTypes.select) {
      return <SelectInputField fieldKey={fieldKey} />;
    }

    if (field?.schema.characteristics.inputType === fieldInputTypes.text) {
      return <TextInputField fieldKey={fieldKey} />;
    }

    console.warn('Field not supported:', field?.schema.key);

    return null;
  };

  // If it's a composite field, render its children as individual fields
  if (field?.schema.characteristics.inputType === fieldInputTypes.composite) {
    if (!field?.children) return null;

    if (field.schema.key === credentialKeys.fullName) {
      return Object.keys(field.children).map((childKey) => (
        <FieldRow key={childKey} fieldKey={`${fieldKey}.${childKey}`}>
          {renderField(`${fieldKey}.${childKey}`, field.children?.[childKey])}
        </FieldRow>
      ));
    }

    if (field.schema.key === credentialKeys.address) {
      // Custom render for the address field
      return (
        <>
          <FieldRow fieldKey={fieldKey}>
            <AddressInputField fieldKey={fieldKey} />
          </FieldRow>
          <FieldRow fieldKey={`${fieldKey}.line2`}>
            <TextInputField fieldKey={`${fieldKey}.line2`} />
          </FieldRow>
        </>
      );
    }

    console.warn('Composite field not supported:', field.schema.key);

    return null;
  }

  return (
    <FieldRow fieldKey={fieldKey}>{renderField(fieldKey, field)}</FieldRow>
  );
}

export function EditFields() {
  const context = useOneClickForm();
  const { fields } = context.formContext.state.form;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {Object.entries(fields).map(([fieldKey, field]) => {
        // We don't want to render the phone field in edit mode
        if (field.schema.key === credentialKeys.phone) return null;
        return <FieldContainer key={fieldKey} fieldKey={fieldKey} />;
      })}
    </Stack>
  );
}
