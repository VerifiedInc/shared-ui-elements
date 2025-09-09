import { Box, TextField } from '@mui/material';

import { useFormField } from '../../../core/field.hook';

import { inputStyle, readOnlyInputStyle } from '../../styles/input';

export function AddressField({ fieldKey }: { fieldKey: string }) {
  const { field } = useFormField({ key: fieldKey });
  return (
    <Box width='100%'>
      <TextField
        {...inputStyle}
        {...readOnlyInputStyle}
        value={'TODO HERE ADD THE VALUE '}
        multiline
        rows={2}
        helperText={field?.description}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
      />
    </Box>
  );
}
