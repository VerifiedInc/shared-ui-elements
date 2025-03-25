import { useRef, useEffect, memo } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { inputStyle } from '../../../styles/input';
import { getLastPathName } from '../../CredentialsDisplay/utils/getLastPathName';
import { useCanFillByQueryParam } from '../../../hooks/useCanFillByQueryParam';

import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldClearAdornment } from '../DataFieldClearAdornment';
import { getAutoCompleteAttributeValue } from '../utils';

type DataFieldTextInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

const DataFieldTextInputMemoized = memo(
  function DataFieldTextInputMemoized({
    credentialsDisplayItem,
    itemValid,
  }: DataFieldTextInputMemoizedProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const canFillByQueryParam = useCanFillByQueryParam();
    const {
      objectController,
      handleChangeValueCredential,
      handleChangeDebouncedValueCredential,
    } = credentialsDisplayItem;

    // Autofill field if it is passed as a query param
    useEffect(() => {
      const lastPathName = getLastPathName(objectController.field.name);

      if (!canFillByQueryParam(lastPathName)) {
        return;
      }

      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.searchParams);
      const fieldValueParam = searchParams.get(
        getLastPathName(objectController.field.name),
      );

      if (fieldValueParam && !objectController.field.value.value) {
        const interval = setTimeout(() => {
          handleChangeValueCredential(fieldValueParam, {
            shouldValidate: false,
          });
          if (inputRef.current) {
            inputRef.current.value = fieldValueParam;
          }
        }, 10 /** Timeout required to avoid race condition */);
        return () => clearInterval(interval);
      }
    }, []);

    const textFieldStyle: TextFieldProps = {
      inputRef,
      ...inputStyle,
      autoComplete: getAutoCompleteAttributeValue(
        objectController.field.value.type,
      ),
      label: <DataFieldLabelText />,
      defaultValue: objectController.field.value.value || '',
      onChange: (e) => handleChangeDebouncedValueCredential(e.target.value),
      error: !itemValid.isValid,
      helperText:
        credentialsDisplayItem.credentialDisplayInfo.credentialRequest
          ?.description,
      InputProps: {
        // The placeholder must be empty in order to not display the one from google places API.
        placeholder: '',
        endAdornment: (
          <DataFieldClearAdornment
            onClick={() => {
              //
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }}
          />
        ),
      },
      inputProps: {
        // Tab index for each block.
        tabIndex: 0,
        autoCorrect: 'off',
        autoCapitalize: 'off',
      },
      fullWidth: true,
    };

    return (
      <Box width='100%'>
        <TextField {...textFieldStyle} />
      </Box>
    );
  },
  (props, nextProps) => {
    return isEqual(
      {
        itemValid: props.itemValid,
        objectController: props.credentialsDisplayItem.objectController,
      },
      {
        itemValid: nextProps.itemValid,
        objectController: nextProps.credentialsDisplayItem.objectController,
      },
    );
  },
);

/**
 * This component manages the input of type Text.
 * @constructor
 */
export function DataFieldTextInput() {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldTextInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
