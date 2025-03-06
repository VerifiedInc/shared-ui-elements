import { useRef, memo, ReactElement } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { inputStyle } from '../../../styles/input';

import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldClearAdornment } from '../DataFieldClearAdornment';

type DataFieldAddressInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

const DataFieldAddressInputMemoized = memo(
  function DataFieldAddressInputMemoized({
    credentialsDisplayItem,
    itemValid,
  }: DataFieldAddressInputMemoizedProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { objectController, handleChangeDebouncedValueCredential } =
      credentialsDisplayItem;

    const textFieldStyle: TextFieldProps = {
      inputRef,
      ...inputStyle,
      label: <DataFieldLabelText />,
      multiline: true,
      minRows: 2,
      maxRows: 2,
      defaultValue: objectController.field.value.value || '',
      onChange: (e) => {
        const value = e.target.value;
        console.log(value);
        // handleChangeDebouncedValueCredential(e.target.value);
      },
      error: !itemValid.isValid,
      helperText: itemValid.isValid
        ? credentialsDisplayItem.credentialDisplayInfo.credentialRequest
            ?.description
        : itemValid.errorMessage,
      InputLabelProps: {
        shrink: objectController.field.value.value ? true : undefined,
      },
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
 * This component composes the fields of address except line 2.
 * @constructor
 */
export function DataFieldAddressInput(): ReactElement {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldAddressInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
