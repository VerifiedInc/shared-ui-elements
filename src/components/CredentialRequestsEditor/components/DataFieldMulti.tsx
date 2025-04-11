import { RadioGroup } from '@mui/material';
import { useController } from 'react-hook-form';

import { type CredentialRequestsEditorForm } from '../types/form';
import { useCredentialRequestsEditor } from '../CredentialRequestsEditor.context';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { RadioOption } from './RadioOption';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldMulti({
  riskSignals,
}: {
  riskSignals: 'none' | 'basic' | 'advanced';
}): React.JSX.Element | null {
  const { features } = useCredentialRequestsEditor();
  const isFeatureDisabled =
    features?.multi?.disabled === true || riskSignals === 'none';

  const credentialRequestField = useCredentialRequestField();
  const multi = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}.multi` as any,
  });

  if ((credentialRequestField?.level ?? 0) > 0) return null;

  return (
    <DataFieldSection
      title='Multiple Values'
      description={
        riskSignals === 'none'
          ? 'This option is disabled when the Risk Signals brand setting is set to Off'
          : 'Whether multiple data values should be included if available'
      }
      tip={
        <>
          <pre>POST /1-click</pre>
          <pre>{`{\n  multi?: boolean\n}`}</pre>
        </>
      }
      sx={{
        opacity: isFeatureDisabled ? 0.5 : 1,
      }}
    >
      <RadioGroup
        value={multi.field.value ?? false}
        onChange={(_, value) => {
          if (isFeatureDisabled) return;

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
          disabled={isFeatureDisabled}
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
          disabled={isFeatureDisabled}
        />
      </RadioGroup>
    </DataFieldSection>
  );
}
