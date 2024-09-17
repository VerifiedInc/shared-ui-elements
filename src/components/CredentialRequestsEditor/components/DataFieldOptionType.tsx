import { useMemo } from 'react';
import { useController } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

import { prettyField } from '../utils/prettyField';

import { type CredentialRequestsEditorForm } from '../types/form';
import { type CredentialRequestDto } from '../types/credentialRequestDto';
import { buildDataFieldValue } from '../utils/buildDataFieldValue';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { useCredentialRequestsEditor } from '../CredentialRequestsEditor.context';
import { DataFieldSection } from './DataFieldSection';

export function DataFieldOptionType(): React.JSX.Element {
  const credentialRequestField = useCredentialRequestField();
  const field = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}` as any,
  });

  const { schemas } = useCredentialRequestsEditor();
  const schemaValues = useMemo(() => {
    if (!schemas) return [];
    return Object.values(schemas)
      .map((schema) => ({
        label: prettyField(schema.$id),
        id: schema.$id as string,
      }))
      .filter((schema) => {
        const blacklist = ['IdentityCredential'];
        return !blacklist.includes(schema.id);
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));
  }, [schemas]);
  const selectedValue = useMemo(() => {
    const type = (field.field?.value as CredentialRequestDto)?.type;
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

          credentialRequestField?.fieldArray.update(
            credentialRequestField?.index,
            buildDataFieldValue(value.id, schemas),
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
        disabled={(credentialRequestField?.level ?? 0) > 0 || schemas === null}
      />
    </DataFieldSection>
  );
}
