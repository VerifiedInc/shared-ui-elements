import { memo, useState } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { usePrevious } from '../../../hooks/usePrevious';
import { inputStyle } from '../../../styles/input';

import { ChangeEvent, TextMaskCustom } from '../../shared/TextMaskCustom';
import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldClearAdornment } from '../DataFieldClearAdornment';

type TextStyles = Omit<TextFieldProps, 'onChange'> & { onChange: any };

type DataFieldSSNInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

const DataFieldSSNInputMemoized = memo(
  function DataFieldSSNInputMemoized({
    credentialsDisplayItem,
    itemValid,
  }: DataFieldSSNInputMemoizedProps) {
    const {
      objectController,
      credentialDisplayInfo,
      handleChangeValueCredential,
    } = credentialsDisplayItem;
    const { isValid, errorMessage } = itemValid;

    // Arbitrary states to allow to empty input field.
    const [value, setValue] = useState<string>(
      objectController.field.value.value,
    );

    const textFieldStyle: TextStyles = {
      ...inputStyle,
      label: <DataFieldLabelText />,
      error: !isValid,
      value,
      onChange: ((e, nativeEvent) => {
        if (!nativeEvent) return;
        handleChangeValueCredential(e.target.value);
        setValue(e.target.value);
      }) as ChangeEvent,
      helperText: isValid
        ? credentialDisplayInfo.credentialRequest?.description
        : errorMessage,
      placeholder: '___-__-____',
      inputProps: {
        onFocus: () => {
          setValue('');
          handleChangeValueCredential('', { shouldValidate: false });
        },
        // Use onChange event.
        useOnComplete: false,
        // Use unmasked value.
        unmask: true,
        // Mask in the pattern of SSN.
        mask: 'XXX-XX-0000',

        definitions: {
          X: {
            mask: /[0-9•]/,
            displayChar: '•',
          },
        },

        // Set input mode to numeric, so mobile virtual keyboards just show numeric keys.
        inputMode: 'numeric',

        overwrite: false,
        // Tab index for each block.
        tabIndex: 0,
      },
      InputProps: {
        inputComponent: TextMaskCustom as any,
        endAdornment: (
          <DataFieldClearAdornment
            onClick={() => {
              handleChangeValueCredential('', {
                shouldValidate: false,
              });
              setValue('');
            }}
          />
        ),
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
 * This component manages the input of type SSN.
 * @constructor
 */
export function DataFieldSSNInput() {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldSSNInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
