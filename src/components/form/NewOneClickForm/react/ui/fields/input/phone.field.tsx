import { Box } from '@mui/material';

import { PhoneInput } from '../../../../../PhoneInput';

import { useFormField } from '../../../core/field.hook';

import { FieldLabel } from './label';

export function PhoneInputField({ fieldKey }: { fieldKey: string }) {
  const { field, setValue } = useFormField<'phone'>({ key: fieldKey });

  if (!field) return null;

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
        error={!field.isValid}
        helperText={field.description}
        disabled={field.isDisabled}
        shouldHaveClearButton
        shouldHaveSelectCountryButton={false}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}
