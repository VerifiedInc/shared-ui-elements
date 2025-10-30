import { useMemo } from 'react';
import { useController } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { MandatoryEnum } from '../types/mandatoryEnum';

import { prettyField } from '../utils/prettyField';

import {
  type CredentialRequests,
  type CredentialRequestsEditorForm,
  type CredentialRequestsWithNew,
} from '../types/form';
import { buildDataFieldValue } from '../utils/buildDataFieldValue';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldOptionType(): React.JSX.Element {
  const credentialRequestField = useCredentialRequestField();
  const field = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}` as any,
  });

  const schemaValues = useMemo(() => {
    const orderedTypes: Record<string, number> = {
      PhoneCredential: 0,
      FullNameCredential: 1,
      AddressCredential: 2,
      BirthDateCredential: 3,
      SsnCredential: 4,
      SexCredential: 5,
      DriversLicenseCredential: 6,
    };

    return Object.keys(orderedTypes)
      .map((key) => ({
        label: prettyField(key),
        id: key,
      }))
      .sort((a, b) => orderedTypes[a.id] - orderedTypes[b.id]);
  }, []);
  const selectedValue = useMemo(() => {
    const type = (field.field?.value as CredentialRequests)?.type;
    return schemaValues?.find((value) => value.id === type);
  }, [field, schemaValues]);

  return (
    <DataFieldSection
      key={JSON.stringify(selectedValue)}
      title='Field Type'
      description='What type of user data this field is for'
      tip={
        <>
          <pre>POST /1-click</pre>
          <pre>{`{\n  type: string\n}`}</pre>
        </>
      }
    >
      <Autocomplete
        value={selectedValue}
        onChange={(_, value) => {
          if (!value) return;

          const baseValue = buildDataFieldValue(value.id);
          const newValue: CredentialRequestsWithNew = {
            type: baseValue.type,
            issuers: baseValue.issuers,
            required: baseValue.required,
            mandatory: baseValue.mandatory as MandatoryEnum | undefined,
            description: baseValue.description,
            allowUserInput: baseValue.allowUserInput,
            multi: baseValue.multi,
            children: baseValue.children as
              | CredentialRequestsWithNew[]
              | undefined,
          };
          credentialRequestField?.fieldArray.update(
            credentialRequestField?.index,
            newValue,
          );
        }}
        options={schemaValues}
        disablePortal
        renderInput={(params) => (
          <TextField
            {...params}
            label='Type'
            color='success'
            size='small'
            className='original'
            fullWidth
            inputProps={{
              ...params.inputProps,
              'data-testid': 'custom-demo-dialog-data-field-type-input',
            }}
            placeholder='Choose a type...'
          />
        )}
        disabled={(credentialRequestField?.level ?? 0) > 0}
      />
    </DataFieldSection>
  );
}
