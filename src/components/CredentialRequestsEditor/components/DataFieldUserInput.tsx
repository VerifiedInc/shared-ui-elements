import { RadioGroup } from '@mui/material';
import { useController } from 'react-hook-form';

import { type CredentialRequestsEditorForm } from '../types/form';
import { useCredentialRequestsEditor } from '../CredentialRequestsEditor.context';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { RadioOption } from './RadioOption';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldUserInput(): React.JSX.Element {
  const { features } = useCredentialRequestsEditor();
  const isFeatureDisabled = features?.description?.disabled === true;

  const credentialRequestField = useCredentialRequestField();
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
      sx={{
        opacity: isFeatureDisabled ? 0.5 : 1,
      }}
    >
      <RadioGroup
        value={allowUserInput.field.value}
        onChange={(_, value) => {
          if (isFeatureDisabled) return;
          // Update form state
          allowUserInput.field.onChange({
            target: { value: value === 'true' },
          });
        }}
      >
        <RadioOption
          isDefault
          value={true}
          title='Yes'
          description='The user can add or edit data for the user to share'
          tip='true'
          inputProps={
            {
              'data-testid': 'custom-demo-dialog-user-input-yes-radio',
            } as any
          }
          disabled={isFeatureDisabled}
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
          disabled={isFeatureDisabled}
        />
      </RadioGroup>
    </DataFieldSection>
  );
}
