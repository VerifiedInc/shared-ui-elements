import { useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import debounce from 'lodash/debounce';
import { TextField } from '@mui/material';

import { type CredentialRequestsEditorForm } from '../types/form';
import { useCredentialRequestsEditor } from '../CredentialRequestsEditor.context';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldDescription(): React.JSX.Element {
  const { features } = useCredentialRequestsEditor();
  const isFeatureDisabled = features?.description?.disabled === true;

  const credentialRequestField = useCredentialRequestField();
  const description = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}.description` as any,
  });
  const [value, setValue] = useState(description.field.value ?? '');

  const debounceChange = useRef(
    debounce((value: string) => {
      // Update form state
      description.field.onChange({ target: { value } });
    }, 500),
  ).current;

  const handleChange = (e: any): void => {
    if (isFeatureDisabled) return;
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
      sx={{
        opacity: isFeatureDisabled ? 0.5 : 1,
      }}
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
        disabled={isFeatureDisabled}
      />
    </DataFieldSection>
  );
}
