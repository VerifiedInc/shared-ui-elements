import { Stack } from '@mui/material';

import { credentialKeys, fieldInputTypes } from '../../../../core/fields';
import { FormField } from '../../../../core/form';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import {
  FieldRowContainer,
  FieldSectionContent,
  FieldSectionTitle,
} from '../style';

import { getDisplayFieldKeys } from '../field-order';

import { AddressInputField } from './address.field';
import { PhoneInputField } from './phone.field';
import { TextInputField } from './text.field';
import { SelectInputField } from './select.field';
import { SSNInputField } from './ssn.field';
import { DateInputField } from './date.field';
import { HealthInsuranceInputField } from './healthInsurance.field';

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

  // Custom render for the phone field — uses the dedicated phone input
  // (country selector + masking) instead of the generic text input.
  if (field?.schema?.key === credentialKeys.phone) {
    return (
      <FieldRowContainer fieldKey={fieldKey}>
        <PhoneInputField fieldKey={fieldKey} />
      </FieldRowContainer>
    );
  }

  // Custom render for the health insurance field as a section with formatted value
  if (field?.schema?.key === credentialKeys.healthInsurance) {
    return (
      <FieldRowContainer fieldKey={fieldKey} spacing={1.25}>
        <FieldSectionTitle
          fieldKey={fieldKey}
          description='Enter your insurance info:'
        />
        <FieldSectionContent spacing={1.25}>
          <HealthInsuranceInputField fieldKey={fieldKey} />
        </FieldSectionContent>
      </FieldRowContainer>
    );
  }

  // If it's a composite field, render its children as individual fields
  if (field?.schema.characteristics.inputType === fieldInputTypes.composite) {
    if (!field?.children) return null;

    if (field.schema.key === credentialKeys.fullName) {
      return Object.keys(field.children).map((childKey) => (
        <FieldRowContainer key={childKey} fieldKey={`${fieldKey}.${childKey}`}>
          {renderField(`${fieldKey}.${childKey}`, field.children?.[childKey])}
        </FieldRowContainer>
      ));
    }

    if (field.schema.key === credentialKeys.address) {
      // Custom render for the address field
      return (
        <>
          <FieldRowContainer fieldKey={fieldKey}>
            <AddressInputField fieldKey={fieldKey} />
          </FieldRowContainer>
          <FieldRowContainer fieldKey={`${fieldKey}.line2`}>
            <TextInputField fieldKey={`${fieldKey}.line2`} />
          </FieldRowContainer>
        </>
      );
    }

    // Render the children of the composite field
    return (
      <FieldRowContainer fieldKey={fieldKey} spacing={1.25}>
        <FieldSectionTitle fieldKey={fieldKey} />
        <FieldSectionContent spacing={2} sx={{ pt: 1 }}>
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

  return (
    <FieldRowContainer fieldKey={fieldKey}>
      {renderField(fieldKey, field)}
    </FieldRowContainer>
  );
}

export function EditFields() {
  const context = useOneClickForm();
  const { fields } = context.formContext.state.form;
  const fieldKeys = getDisplayFieldKeys(fields, {
    showPhone: context.options.features.field?.phone?.show,
  });

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {fieldKeys.map((fieldKey) => (
        <FieldContainer key={fieldKey} fieldKey={fieldKey} />
      ))}
    </Stack>
  );
}
