import { RadioGroup } from '@mui/material';
import { useController } from 'react-hook-form';

import { type CredentialRequestsEditorForm } from '../types/form';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { RadioOption } from './RadioOption';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldMulti(): React.JSX.Element | null {
  const credentialRequestField = useCredentialRequestField();
  const multi = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}.multi` as any,
  });

  if ((credentialRequestField?.level || 0) > 0) return null;

  return (
    <DataFieldSection
      title='Multiple Values'
      description='Whether multiple data values should be included if available'
      tip={
        <>
          <pre>POST /1-click</pre>
          <pre>{`{\n  multi?: boolean\n}`}</pre>
        </>
      }
    >
      <RadioGroup
        value={multi.field.value || false}
        onChange={(_, value) => {
          // Update form state
          multi.field.onChange({
            target: { value: value === 'true' },
          });
        }}
      >
        <RadioOption
          value={true}
          title='Yes'
          description='Multiple values will be included if available'
          tip='true'
          inputProps={
            {
              'data-testid': 'custom-demo-dialog-multi-yes-radio',
            } as any
          }
        />
        <RadioOption
          isDefault
          value={false}
          title='No'
          description="Multiple values won't be included"
          tip='false'
          inputProps={
            {
              'data-testid': 'custom-demo-dialog-multi-no-radio',
            } as any
          }
        />
      </RadioGroup>
    </DataFieldSection>
  );
}
