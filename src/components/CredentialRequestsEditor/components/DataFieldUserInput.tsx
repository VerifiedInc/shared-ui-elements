import { RadioGroup } from '@mui/material';
import { useController } from 'react-hook-form';

import { type CredentialRequestsEditorForm } from '../types/form';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { RadioOption } from './RadioOption';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldUserInput(): React.JSX.Element {
  const credentialRequestField = useCredentialRequestField();
  const field = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}` as any,
  });
  const allowUserInput = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}.allowUserInput` as any,
  });

  return (
    <DataFieldSection
      title='Allow User Input'
      description='Whether the user is allowed to add or edit data for this field'
      tip={
        <>
          <pre>POST /1-click</pre>
          <pre>{`{\n  allowUserInput?: boolean\n}`}</pre>
        </>
      }
    >
      <RadioGroup
        value={credentialRequestField?.field.allowUserInput}
        onChange={(_, value) => {
          // Update form state
          allowUserInput.field.onChange({
            target: { value: value === 'true' },
          });

          // Update array state
          credentialRequestField?.fieldArray.update(
            credentialRequestField?.index,
            {
              ...(field as any).field.value,
              allowUserInput: value === 'true',
            },
          );
        }}
      >
        <RadioOption
          isDefault
          value
          title='Yes'
          description='The user can add or edit data for the user to share'
          tip='true'
          inputProps={
            {
              'data-testid': 'custom-demo-dialog-user-input-yes-radio',
            } as any
          }
        />
        <RadioOption
          value={false}
          title='No'
          description="The user can't add or edit data"
          tip='false'
          inputProps={
            {
              'data-testid': 'custom-demo-dialog-user-input-no-radio',
            } as any
          }
        />
      </RadioGroup>
    </DataFieldSection>
  );
}
