import { ReactElement } from 'react';
import { Box, Stack, SxProps } from '@mui/material';

import { DisplayFormatEnum } from '../../types/display-format';
import { when } from '../../utils/when';

import { When } from '../shared/When';
import { findCorrectSchemaProperty } from '../CredentialsDisplay/utils';
import { useCredentialsDisplay } from '../CredentialsDisplay/CredentialsDisplayContext';
import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

import { InputFormatEnum } from './types';
import { DataFieldLeftSide } from './DataFieldLeftSide';
import { DataFieldHeader } from './DataFieldHeader';
import {
  DataFieldImage,
  DataFieldInputAddress,
  DataFieldInputText,
} from './formats';
import {
  DataFieldSelectInput,
  DataFieldTextInput,
  DataFieldPhoneInput,
  DataFieldDateInput,
  DataFieldSSNInput,
  DataFieldImageInput,
} from './inputs';
import { DataFieldInputSelect } from './formats/DataFieldInputSelect';
import { DataFieldInputModeHeader } from './DataFieldInputModeHeader';
import { DataFieldLegend } from './DataFieldLegend';

/**
 * This component renders an atomic level credential, it displays the component by displayFormat.
 * @constructor
 */
export function DataFieldAtomic(): ReactElement {
  const { schema } = useCredentialsDisplay();
  const { credentialDisplayInfo, parentFieldSet, isRoot } =
    useCredentialsDisplayItem();
  const hasMultipleInstances = credentialDisplayInfo.instances.length > 1;
  const allowUserInput =
    credentialDisplayInfo.credentialRequest?.allowUserInput;
  const canEdit = allowUserInput;
  const isEditMode = credentialDisplayInfo.uiState.isEditMode;

  // HACK alert:
  // This calculation subtracts left side component and right side component to fit in.
  const stackStyle: SxProps = { width: 'calc(100%)' };

  // Render data field as input mode.
  const renderInputField = (): ReactElement | undefined => {
    const schemaProperty = findCorrectSchemaProperty(
      credentialDisplayInfo.schema,
      schema,
      parentFieldSet,
    );
    return when(schemaProperty?.input?.type, {
      [InputFormatEnum.Date]: () => <DataFieldDateInput />,
      [InputFormatEnum.Phone]: () => <DataFieldPhoneInput />,
      [InputFormatEnum.SSN]: () => <DataFieldSSNInput />,
      [InputFormatEnum.Select]: () => <DataFieldSelectInput />,
      [InputFormatEnum.Image]: () => <DataFieldImageInput />,
      else: () => <DataFieldTextInput />,
    });
  };

  // Render data field as read only.
  const renderReadOnlyField = (): ReactElement | undefined => {
    const props = { hasMultipleInstances };
    const schemaProperty = findCorrectSchemaProperty(
      credentialDisplayInfo.schema,
      schema,
      parentFieldSet,
    );

    const readOnly = when(schemaProperty?.input?.type, {
      // Prefer input of type select over any other displayFormat.
      Select: () => <DataFieldInputSelect {...props} />,
      else: () => null,
    });

    if (readOnly) return readOnly;

    return when(credentialDisplayInfo?.displayFormat, {
      [DisplayFormatEnum.Image]: () => <DataFieldImage {...props} />,
      [DisplayFormatEnum.Address]: () => <DataFieldInputAddress {...props} />,
      else: () => <DataFieldInputText {...props} />,
    });
  };

  // Render the given credential, being input mode or display mode.
  const renderField = (): ReactElement | undefined => {
    if (canEdit && isEditMode) {
      return renderInputField();
    }

    return renderReadOnlyField();
  };

  return (
    <Stack
      direction='row'
      alignItems='center'
      data-testid='data-field-atomic'
      data-credentialid={credentialDisplayInfo.id}
      sx={{ width: '100%' }}
    >
      <DataFieldLeftSide />
      <Stack direction='column' sx={stackStyle}>
        {/* When is root data field, display the header. */}
        <When value={isRoot && !isEditMode}>
          <Box sx={{ mb: 0.5 }}>{/* <DataFieldHeader block /> */}</Box>
        </When>
        {/* When is root and edit mode, display the input mode header. */}
        <When value={isRoot && isEditMode}>
          <DataFieldInputModeHeader sx={{ mb: 0.5 }} />
        </When>
        {/* Display data field when */}
        {/* - is root and is not edit mode */}
        {/* - is not root */}
        <When value={(isRoot && isEditMode) || !isRoot}>{renderField()}</When>
        <When
          value={
            isRoot &&
            !isEditMode &&
            credentialDisplayInfo.credentialRequest?.description
          }
        >
          {(description) => (
            <Box sx={{ mx: 1.75 }}>
              <DataFieldLegend sx={{ mt: 0 }}>{description}</DataFieldLegend>
            </Box>
          )}
        </When>
      </Stack>
    </Stack>
  );
}
