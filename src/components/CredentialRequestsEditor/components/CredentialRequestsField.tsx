import React from 'react';
import { Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Button } from '../../Button';

import { buildDataFieldValue } from '../utils/buildDataFieldValue';
import { CredentialRequestFieldProvider } from '../contexts/CredentialRequestFieldContext';
import { SectionAccordion } from './SectionAccordion';
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
        <Button
          type='button'
          onClick={() => {
            if (!customConfig) return;
            const newValue: CredentialRequestsWithNew = {
              ...buildDataFieldValue('', customConfig.schemas),
              isNew: true,
            };
            fieldArray.append(newValue);
          }}
          size='large'
          variant='outlined'
          startIcon={<Add />}
          fullWidth
          sx={{ width: '100%' }}
        >
          Add Data Field
        </Button>
      )}
    </>
  );
}

export function CredentialRequestsField(): React.JSX.Element {
  return (
    <SectionAccordion
      title='Data Fields'
      description='What data your brand will ask the user to share'
      tip={
        <>
          <pre>POST /1-click</pre>
          <pre>{`{\n  credentialRequests?: CredentialRequest[]\n}`}</pre>
        </>
      }
    >
      <DndProvider backend={HTML5Backend}>
        <Stack spacing={2}>
          <CredentialRequestField />
        </Stack>
      </DndProvider>
    </SectionAccordion>
  );
}
