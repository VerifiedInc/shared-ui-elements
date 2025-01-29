import { useRef, useEffect, memo } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { inputStyle } from '../../../styles/input';

import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldClearAdornment } from '../DataFieldClearAdornment';

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

    const {
      objectController,
      credentialDisplayInfo,
      handleChangeValueCredential,
      handleChangeDebouncedValueCredential,
    } = credentialsDisplayItem;

    // Autofill phone number if it is passed as a query param.
    useEffect(() => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.searchParams);
      const email = searchParams.get('email');

      if (
        email &&
        credentialDisplayInfo.credentialRequest?.type === 'EmailCredential'
      ) {
        const interval = setTimeout(() => {
          handleChangeValueCredential(email, { shouldValidate: false });
          if (inputRef.current) {
            inputRef.current.value = email;
          }
        }, 10);
        return () => clearInterval(interval);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const textFieldStyle: TextFieldProps = {
      inputRef,
      ...inputStyle,
      label: <DataFieldLabelText />,
      defaultValue: objectController.field.value.value || '',
      onChange: (e) => handleChangeDebouncedValueCredential(e.target.value),
      error: !itemValid.isValid,
      helperText: itemValid.isValid
        ? credentialsDisplayItem.credentialDisplayInfo.credentialRequest
            ?.description
        : itemValid.errorMessage,
      InputProps: {
        // prevent this element from being recorded by Sentry
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // 'data-sentry-mask':
        //   appContext.config.env.env === 'production' || undefined,
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
