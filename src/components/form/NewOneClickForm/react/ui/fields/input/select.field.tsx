import {
  Autocomplete,
  Box,
  TextField,
  type TextFieldProps,
} from '@mui/material';

import { fieldInputTypes } from '../../../../core/fields';

import { useFormField } from '../../../core/field.hook';

import { FieldLabel } from './label';

export function SelectInputField({ fieldKey }: { fieldKey: string }) {
  const { field, setValue } = useFormField({ key: fieldKey });

  if (field?.schema.characteristics.inputType !== fieldInputTypes.select) {
    return null;
  }

  const options = field.schema.characteristics.options || [];

  // Find the current option that matches the field value
  const currentOption =
    options.find((option) => option.value === field.value) ?? null;

  const textFieldStyle: TextFieldProps = {
    variant: 'outlined',
    size: 'small',
    label: <FieldLabel fieldKey={fieldKey} />,
    error: !field.isValid,
    helperText: field.description,
    inputProps: {
      // Tab index for each block.
      tabIndex: 0,
    },
    fullWidth: true,
  };

  return (
    <Box width='100%'>
      <Autocomplete
        disablePortal
        autoHighlight
        options={options}
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        value={currentOption}
        onChange={(_event, newInputValue) => {
          if (field.isDisabled) return;

          if (!newInputValue) {
            // User clicked on clear button or cleared the field
            setValue('');
            return;
          }

          // Set the value to the selected option's value
          setValue(newInputValue.value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            {...textFieldStyle}
            inputProps={{
              ...params.inputProps,
              ...textFieldStyle.inputProps,
            }}
          />
        )}
        disabled={field.isDisabled}
      />
    </Box>
  );
}
