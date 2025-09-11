import { useRef } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';

import { useFormField } from '../../../core/field.hook';

import { getAutoCompleteAttributeValue } from '../shared';

import { FieldLabel } from './label';
import { ClearFieldAdornment } from './clear-field-adornment';

export function TextInputField({ fieldKey }: { fieldKey: string }) {
  const { field, setValue } = useFormField({ key: fieldKey });
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!field) return null;

  const textFieldStyle: TextFieldProps = {
    inputRef,
    variant: 'outlined',
    size: 'small',
    autoComplete: getAutoCompleteAttributeValue(field.schema.type),
    label: <FieldLabel fieldKey={fieldKey} />,
    value: field.value || '',
    onChange: (e) => {
      if (field.isDisabled) return;
      setValue(e.target.value);
    },
    error: !field?.isValid,
    helperText: field?.description,
    InputProps: {
      endAdornment: (
        <ClearFieldAdornment
          fieldKey={fieldKey}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = '';
            }
          }}
        />
      ),
    },
    inputProps: {
      // Tab index for each block.
      tabIndex: 0,
      autoCorrect: 'off',
      autoCapitalize: 'off',
    },
    fullWidth: true,
    disabled: field.isDisabled,
  };

  return (
    <Box width='100%'>
      <TextField {...textFieldStyle} />
    </Box>
  );
}
