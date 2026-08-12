import { RadioGroup } from '@mui/material';
import { useController } from 'react-hook-form';

import { type CredentialRequestsEditorForm } from '../types/form';
import { useCredentialRequestsEditor } from '../CredentialRequestsEditor.context';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';

import { RadioOption } from './RadioOption';
import { DataFieldSection } from './DataFieldSection';

/**
 * Only rendered for a FirstNameCredential entry, which normally sits as a child of
 * FullNameCredential. Unlike DataFieldMulti this deliberately has no `level > 0` guard: the
 * setting belongs on the child, not the parent.
 */
export function DataFieldAutofillLegalFirstName(): React.JSX.Element {
  const { features } = useCredentialRequestsEditor();
  const isFeatureDisabled = features?.autofillLegalFirstName?.disabled === true;

  const credentialRequestField = useCredentialRequestField();
  const autofillLegalFirstName = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}.autofillLegalFirstName` as any,
  });

  return (
    <DataFieldSection
      title='Always Autofill Legal First Name'
      description="Whether to always autofill the user's legal first name, even if they entered another first name they go by"
      tip={<pre>{`{\n  autofillLegalFirstName?: boolean\n}`}</pre>}
      sx={{
        opacity: isFeatureDisabled ? 0.5 : 1,
      }}
    >
      <RadioGroup
        value={autofillLegalFirstName.field.value ?? false}
        onChange={(_, value) => {
          if (isFeatureDisabled) return;

          // Update form state
          autofillLegalFirstName.field.onChange({
            target: { value: value === 'true' },
          });
        }}
      >
        <RadioOption
          value={true}
          title='Yes'
          tip='true'
          inputProps={
            {
              'data-testid':
                'custom-demo-dialog-autofill-legal-first-name-yes-radio',
            } as any
          }
          disabled={isFeatureDisabled}
        />
        <RadioOption
          value={false}
          title='No'
          tip='false'
          inputProps={
            {
              'data-testid':
                'custom-demo-dialog-autofill-legal-first-name-no-radio',
            } as any
          }
          disabled={isFeatureDisabled}
        />
      </RadioGroup>
    </DataFieldSection>
  );
}
