import React from 'react';
import { Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { MandatoryEnum } from '@verifiedinc/constants';
import {
  useFieldArray,
  type UseFieldArrayReturn,
  useFormContext,
} from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Button } from '../../Button';

import { buildDataFieldValue } from '../utils/buildDataFieldValue';
import { CredentialRequestFieldProvider } from '../contexts/CredentialRequestFieldContext';
import { DataFieldAccordion } from './DataFieldAccordion';

import { useCredentialRequestsEditor } from '../CredentialRequestsEditor.context';
import {
  type CredentialRequestsEditorForm,
  type CredentialRequestsWithNew,
} from '../types/form';

function CredentialRequestField({
  path = 'credentialRequests',
  parentFieldArray,
  parentIndex = 0,
  level = 0,
}: Readonly<{
  path?: string;
  parentFieldArray?: UseFieldArrayReturn<CredentialRequestsEditorForm>;
  parentIndex?: number;
  level?: number;
}>): React.JSX.Element {
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
            onAllFieldsDelete={() => {
              (parentFieldArray ?? fieldArray)?.remove(parentIndex);
            }}
          >
            <DataFieldAccordion
              integrationType={customConfig.integrationType}
            />
            {Array.isArray(field.children) && (
              <CredentialRequestField
                key={`${_path}.children`}
                path={`${_path}.children`}
                parentFieldArray={fieldArray}
                parentIndex={index}
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
            const baseValue = buildDataFieldValue('', customConfig.schemas);
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
          {customConfig.addButtonText ?? 'Add Credential Request'}
        </Button>
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
