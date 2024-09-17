import React from 'react';
import { Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { buildDataFieldValue } from '../utils/buildDataFieldValue';
import { CredentialRequestFieldProvider } from '../contexts/CredentialRequestFieldContext';
import { OriginalButton } from './OriginalButton';
import { DataFieldAccordion } from './DataFieldAccordion';

import { useCredentialRequestsEditor } from '../CredentialRequestsEditor.context';
import {
  type CredentialRequestsEditorForm,
  type CredentialRequestsWithNew,
} from '../types/form';

function CredentialRequestField({
  path = 'credentialRequests',
  level = 0,
}: Readonly<{ path?: string; level?: number }>): React.JSX.Element {
  const customConfig = useCredentialRequestsEditor();
  const form = useFormContext<CredentialRequestsEditorForm>();
  const fieldArray = useFieldArray<CredentialRequestsEditorForm>({
    control: form.control,
    name: path as any,
  });

  return (
    <>
      {fieldArray.fields.map((field, index) => {
        const _path = `${path}.${index}`;
        return (
          <CredentialRequestFieldProvider
            key={_path + field.type}
            path={_path}
            field={field}
            fieldArray={fieldArray}
            index={index}
            level={level}
          >
            <DataFieldAccordion />
            {Array.isArray(field.children) && (
              <CredentialRequestField
                key={`${_path}.children`}
                path={`${_path}.children`}
                level={level + 1}
              />
            )}
          </CredentialRequestFieldProvider>
        );
      })}
      {path === 'credentialRequests' && (
        <OriginalButton
          type='button'
          onClick={() => {
            if (!customConfig) return;
            const newValue: CredentialRequestsWithNew = {
              ...buildDataFieldValue('', customConfig.schemas),
              isNew: true,
            };
            fieldArray.append(newValue);
          }}
          size='small'
          variant='outlined'
          startIcon={<Add />}
          fullWidth
          sx={{ width: '100%' }}
        >
          {customConfig.addButtonText ?? 'Add Credential Request'}
        </OriginalButton>
      )}
    </>
  );
}

export function CredentialRequestsField(): React.JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <Stack spacing={2}>
        <CredentialRequestField />
      </Stack>
    </DndProvider>
  );
}
