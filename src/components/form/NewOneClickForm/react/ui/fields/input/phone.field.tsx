import { Box } from '@mui/material';

import { PhoneInput } from '../../../../../PhoneInput';

import { useFormField } from '../../../core/field.hook';

import { FieldLabel } from './label';

export function PhoneInputField({ fieldKey }: { fieldKey: string }) {
  const { field, setValue, setTouched } = useFormField<'phone'>({
    key: fieldKey,
  });

  if (!field) return null;

  const showError = (field.touched || field.isDirty) && !field.isValid;

  return (
    <Box width='100%'>
      <PhoneInput
        variant='outlined'
        size='small'
        label={<FieldLabel fieldKey={fieldKey} />}
        value={field.value || ''}
        onChange={(value) => {
          if (field.isDisabled) return;
          setValue(value);
        }}
        onBlur={() => setTouched(true)}
        error={showError}
        helperText={field.description}
        disabled={field.isDisabled}
        shouldHaveClearButton
        shouldHaveSelectCountryButton={false}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}
