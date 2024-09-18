import { useController } from 'react-hook-form';
import { RadioGroup } from '@mui/material';

import { type CredentialRequestsEditorForm } from '../types/form';
import { MandatoryEnum } from '../types/mandatoryEnum';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { RadioOption } from './RadioOption';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldMandatory(): React.JSX.Element {
  const credentialRequestField = useCredentialRequestField();
  const field = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}` as any,
  });
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
    >
      <RadioGroup
        value={mandatory.field.value}
        onChange={(e) => {
          const value = e.target.value as MandatoryEnum;

          // Update form state
          mandatory.field.onChange({ target: { value } });

          // Update array state
          credentialRequestField?.fieldArray.update(
            credentialRequestField?.index,
            {
              ...(field as any).field.value,
              mandatory: value,
            },
          );
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
        />
        <RadioOption
          value={MandatoryEnum.YES}
          title='Required'
          description="Required — flow fails if user doesn't have it"
          tip={MandatoryEnum.YES}
          inputProps={
            {
              'data-testid': 'custom-demo-dialog-mandatory-yes-radio',
            } as any
          }
        />
      </RadioGroup>
    </DataFieldSection>
  );
}
