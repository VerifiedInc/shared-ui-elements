import { useRef } from 'react';
import { Box } from '@mui/material';

import { SSNInput } from '../../../../../SSNInput';

import { useFormField } from '../../../core/field.hook';

import { getAutoCompleteAttributeValue } from '../shared';

import { FieldLabel } from './label';
import { ClearFieldAdornment } from './clear-field-adornment';

export function SSNInputField({ fieldKey }: { fieldKey: string }) {
  const { field, setValue } = useFormField<'ssn'>({ key: fieldKey });
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!field) return null;

  const handleChange = (event: { target: { value: string } }) => {
    if (field.isDisabled) return;
    setValue(event.target.value);
  };

  return (
    <Box width='100%'>
      <SSNInput
        inputRef={inputRef}
        variant='outlined'
        size='small'
        autoComplete={getAutoCompleteAttributeValue(field.schema.key)}
        label={<FieldLabel fieldKey={fieldKey} />}
        value={field.value || ''}
        onChange={handleChange}
        error={!field?.isValid}
        helperText={field?.description}
        shouldHaveCloseAdornment={false}
        disabled={field.isDisabled}
        InputProps={{
          endAdornment: <ClearFieldAdornment fieldKey={fieldKey} />,
        }}
      />
    </Box>
  );
}
