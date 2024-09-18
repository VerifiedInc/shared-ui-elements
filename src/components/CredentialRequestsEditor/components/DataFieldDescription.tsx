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
    name: `${credentialRequestField?.path as any}` as any,
  });
  const description = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}.description` as any,
  });
  const [value, setValue] = useState(description.field.value ?? '');

  const debounceChange = useRef(
    debounce((value: string) => {
      // Update form state
      description.field.onChange({ target: { value } });

      // Update array state
      credentialRequestField?.fieldArray.update(credentialRequestField?.index, {
        ...(field as any).field.value,
        description: value,
      });
    }, 500),
  ).current;

  const handleChange = (e: any): void => {
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
        {...description.field}
        value={value}
        onChange={handleChange}
        error={!!description.fieldState.error}
        helperText={
          description.fieldState.error?.message ??
          'Optional — defaults to empty'
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
