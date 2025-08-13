import { useController, useFormContext } from 'react-hook-form';
import { RadioGroup } from '@mui/material';

import { type CredentialRequestsEditorForm } from '../types/form';
import { MandatoryEnum } from '../types/mandatoryEnum';
import { useCredentialRequestsEditor } from '../CredentialRequestsEditor.context';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { propagateToChildren } from '../utils/propagateToChildren';
import { RadioOption } from './RadioOption';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldMandatory(): React.JSX.Element {
  const { features } = useCredentialRequestsEditor();
  const isFeatureDisabled = features?.mandatory?.disabled === true;

  const credentialRequestField = useCredentialRequestField();
  const form = useFormContext<CredentialRequestsEditorForm>();
  const mandatory = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}.mandatory` as any,
  });

  return (
    <DataFieldSection
      title='Optional or Required'
      description="Whether it's optional or required for the user to share this data"
      tip={
        <>
          <pre>POST /1-click</pre>
          <pre>{`{\n  mandatory?: enum\n}`}</pre>
        </>
      }
      sx={{
        opacity: isFeatureDisabled ? 0.5 : 1,
      }}
    >
      <RadioGroup
        value={mandatory.field.value}
        onChange={(e) => {
          if (isFeatureDisabled) return;
          const value = e.target.value as MandatoryEnum;

          // Update form state
          mandatory.field.onChange({ target: { value } });

          // Propagate to children if this field has children
          const currentPath = credentialRequestField?.path;
          if (currentPath) {
            propagateToChildren(form, value, currentPath, 'mandatory');
          }
        }}
      >
        <RadioOption
          isDefault
          value={MandatoryEnum.NO}
          title='Optional'
          description='Optional for the user to share'
          tip={MandatoryEnum.NO}
          inputProps={
            {
              'data-testid': 'custom-demo-dialog-mandatory-no-radio',
            } as any
          }
          disabled={isFeatureDisabled}
        />
        <RadioOption
          value={MandatoryEnum.IF_AVAILABLE}
          title='Required if available'
          description='Required to share, if the user has it'
          tip={MandatoryEnum.IF_AVAILABLE}
          inputProps={
            {
              'data-testid': 'custom-demo-dialog-mandatory-if_available-radio',
            } as any
          }
          disabled={isFeatureDisabled}
        />
      </RadioGroup>
    </DataFieldSection>
  );
}
