import { ReactElement } from 'react';
import { Stack, SxProps } from '@mui/material';

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
import { DataFieldHeader, DataFieldLeftSide } from './';

/**
 * This component renders an atomic level credential, it displays the component by displayFormat.
 * @constructor
 */
export function DataFieldAtomic(): ReactElement | null {
  const { schema } = useCredentialsDisplay();
  const { credentialDisplayInfo, objectController, parentFieldSet, isRoot } =
    useCredentialsDisplayItem();
  const hasMultipleInstances = credentialDisplayInfo.instances.length > 1;
  const isEditMode = credentialDisplayInfo.uiState.isEditMode;
  const fieldType = objectController.field.value.type;

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
    if (hasMultipleInstances) {
      return (
        <When value={isRoot && !isEditMode}>
          <DataFieldHeader block />
        </When>
      );
    }

    return when(credentialDisplayInfo?.displayFormat, {
      [DisplayFormatEnum.Image]: () => <DataFieldImage />,
      else: () => <DataFieldText />,
    });
  };

  // Render the given credential, being input mode or display mode.
  const renderField = (): ReactElement | undefined => {
    if (isEditMode) {
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

  // Phone credential should not be rendered as user already has provided the information.
  // TODO - Provide this from features in one click form context options, this does not belong to the domain logic.
  if (fieldType === credentialTypes.PhoneCredential) {
    return null;
  }

  return (
    <Stack
      component='section'
      role='region'
      aria-label={
        typeof credentialDisplayInfo.label === 'string'
          ? credentialDisplayInfo.label
          : 'Credential field'
      }
      data-testid='data-field-atomic'
      data-credentialid={credentialDisplayInfo.id}
      sx={{ width: '100%', outline: 'none' }}
      direction='row'
      alignItems='center'
    >
      <DataFieldLeftSide />
      <Stack direction='column' sx={stackStyle}>
        {renderField()}
      </Stack>
    </Stack>
  );
}
