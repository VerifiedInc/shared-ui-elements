import { Stack } from '@mui/material';

import { credentialKeys, fieldInputTypes } from '../../../../core/fields';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import {
  FieldRow,
  FieldRowContainer,
  FieldSectionTitle,
  FieldSectionContent,
} from '../style';
import { MultiField } from './multi.field';
import { SingleField } from './single.field';
import { HealthInsuranceField } from './healthInsurance.field';

function FieldContainer({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });

  // Custom render for the health insurance field as a section with formatted value
  if (field?.schema?.key === credentialKeys.healthInsurance) {
    return (
      <FieldRowContainer fieldKey={fieldKey} spacing={1.25}>
        <FieldSectionTitle fieldKey={fieldKey} />
        <FieldSectionContent spacing={1.25}>
          <HealthInsuranceField fieldKey={fieldKey} />
        </FieldSectionContent>
      </FieldRowContainer>
    );
  }

  // If it's a composite field, render its children as individual fields
  if (
    field?.schema.characteristics.inputType === fieldInputTypes.composite &&
    field.children
  ) {
    // Custom render for the address field
    if (field.schema.key === credentialKeys.address) {
      return (
        <FieldRow fieldKey={fieldKey}>
          <MultiField fieldKey={fieldKey} />
        </FieldRow>
      );
    }

    if (field.schema.key === credentialKeys.fullName) {
      return (
        <FieldRowContainer fieldKey={fieldKey} spacing={1.25}>
          {Object.keys(field.children).map((childKey) => (
            <FieldContainer
              key={childKey}
              fieldKey={`${fieldKey}.${childKey}`}
            />
          ))}
        </FieldRowContainer>
      );
    }

    // Render the children of the composite field
    return (
      <FieldRowContainer fieldKey={fieldKey} spacing={1.25}>
        <FieldSectionTitle fieldKey={fieldKey} />
        <FieldSectionContent spacing={1.25}>
          {Object.keys(field.children).map((childKey) => (
            <FieldContainer
              key={childKey}
              fieldKey={`${fieldKey}.${childKey}`}
            />
          ))}
        </FieldSectionContent>
      </FieldRowContainer>
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
      spacing={1.25}
      sx={{ width: '100%' }}
      onClick={() => {
        if (
          context.options.features.editMode?.hide ??
          context.formContext.state.form?.isDisabled
        ) {
          return;
        }

        context.setEditMode(true);
      }}
    >
      {Object.entries(fields).map(([fieldKey, field]) => {
        // Phone credential should not be rendered
        if (field.schema.key === credentialKeys.phone) return null;
        return <FieldContainer key={fieldKey} fieldKey={fieldKey} />;
      })}
    </Stack>
  );
}
