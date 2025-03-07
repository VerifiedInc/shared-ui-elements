import { ReactElement } from 'react';
import { Box, Stack, SxProps } from '@mui/material';

import { DisplayFormatEnum } from '../../types/display-format';
import { credentialTypes } from '../../constants';
import { when } from '../../utils/when';

import { When } from '../shared/When';
import { findCorrectSchemaProperty } from '../CredentialsDisplay/utils';
import { useCredentialsDisplay } from '../CredentialsDisplay/CredentialsDisplayContext';
import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

import { InputFormatEnum } from './types';
import { DataFieldImage, DataFieldText } from './formats';
import {
  DataFieldSelectInput,
  DataFieldTextInput,
  DataFieldPhoneInput,
  DataFieldDateInput,
  DataFieldSSNInput,
  DataFieldImageInput,
} from './inputs';
import {
  DataFieldInputModeHeader,
  DataFieldLegend,
  DataFieldLeftSide,
} from './';

/**
 * This component renders an atomic level credential, it displays the component by displayFormat.
 * @constructor
 */
export function DataFieldAtomic(): ReactElement | null {
  const { schema } = useCredentialsDisplay();
  const { credentialDisplayInfo, objectController, parentFieldSet, isRoot } =
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

    return when(credentialDisplayInfo?.displayFormat, {
      [DisplayFormatEnum.Image]: () => <DataFieldImage {...props} />,
      else: () => <DataFieldText />,
    });
  };

  // Render the given credential, being input mode or display mode.
  const renderField = (): ReactElement | undefined => {
    if (canEdit && isEditMode) {
      return renderInputField();
    }

    return renderReadOnlyField();
  };

  // The following atomic credentials should not have render directly if
  // some of the given parent fields are provided.
  if (parentFieldSet?.type === credentialTypes.AddressCredential) {
    // Except line 2 field will not be rendered directly.
    if (objectController.field.value.type !== credentialTypes.Line2Credential) {
      return null;
    }

    // If in readonly mode, do not render the field.
    if (!isEditMode) {
      return null;
    }
  }

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
        {renderField()}
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
