import { useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { debounce } from 'lodash';
import { TextField } from '@mui/material';

import { type CredentialRequestsEditorForm } from '../types/form';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldDescription(): React.JSX.Element {
  const credentialRequestField = useCredentialRequestField();
  const field = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}.description` as any,
  });
  const [value, setValue] = useState(field.field.value || '');

  const debounceChange = useRef(
    debounce((value: string) => {
      // Update form state
      field.field.onChange({ target: { value } });

      // Update array state
      credentialRequestField?.fieldArray.update(credentialRequestField?.index, {
        ...credentialRequestField.field,
        description: value,
      });
    }, 500),
  ).current;

  const handleChange = (e: any) => {
    setValue(e.target.value);
    debounceChange(e.target.value);
  };

  return (
    <DataFieldSection
      title='Field Description'
      description='What text appears under the field'
      tip={
        <>
          <pre>POST /1-click</pre>
          <pre>{`{\n  description?: string\n}`}</pre>
        </>
      }
    >
      <TextField
        {...field.field}
        value={value}
        onChange={handleChange}
        error={!!field.fieldState.error}
        helperText={
          field.fieldState.error?.message ?? 'Optional — defaults to empty'
        }
        label='Description'
        color='success'
        size='small'
        className='original'
        inputProps={{
          'data-testid': 'custom-demo-dialog-data-field-description-input',
        }}
      />
    </DataFieldSection>
  );
}
