import { useRef, memo, ReactElement, useMemo } from 'react';
import { produce } from 'immer';
import { Box, TextField, TextFieldProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import isEqual from 'lodash/isEqual';

import { fromUSAddress, toUSaddress } from '../../../utils/addressFormatter';
import { inputStyle } from '../../../styles/input';

import { extractChildrenFromCredentialFieldSet } from '../../CredentialsDisplay/utils';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';
import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldClearAdornment } from '../DataFieldClearAdornment';
import { CredentialFieldSet } from '../../CredentialsDisplay/types';

type DataFieldAddressInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

/**
 * This a memoized component composes the fields of address except line 2.
 * It re-renders from outside if credentialsDisplayItem and itemValid changes.
 */
const DataFieldAddressInputMemoized = memo(
  function DataFieldAddressInputMemoized({
    credentialsDisplayItem,
  }: DataFieldAddressInputMemoizedProps) {
    const form = useFormContext();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { objectController } = credentialsDisplayItem;
    const fieldName = objectController.field.name;
    const fieldValue = objectController.field.value;

    const error = useMemo(() => {
      for (const [key] of Object.entries(
        extractChildrenFromCredentialFieldSet(fieldValue),
      )) {
        // Composite address data field does not changes line 2
        if (key === 'line2') continue;
        const childFieldState = form.getFieldState(`${fieldName}.${key}`);
        if (childFieldState.error?.message)
          return childFieldState.error?.message;
      }
      return undefined;
    }, [form]);

    const defaultValue = useMemo(() => {
      return toUSaddress({
        line1: fieldValue.line1.value,
        city: fieldValue.city.value,
        state: fieldValue.state.value,
        zipCode: fieldValue.zipCode.value,
      });
    }, []);

    const handleChange = (value: string): void => {
      const formattedValue = value.split('\n').slice(0, 2).join('\n');

      if (inputRef.current) {
        inputRef.current.value = formattedValue;
      }

      const addressParts = fromUSAddress(value);

      const setValueOptions = {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      };

      // Update all existing child values in the form context.
      for (const [key] of Object.entries(
        extractChildrenFromCredentialFieldSet(fieldValue),
      )) {
        // Composite address data field does not changes line 2
        if (key === 'line2') continue;
        const path = `${fieldName}.${key}`;
        const fieldValue = produce(
          form.getValues(path),
          (draft: CredentialFieldSet) => {
            draft.value =
              addressParts?.[key as keyof typeof addressParts] ?? '';
            draft.credentialDisplayInfo.value = draft.value;
          },
        );
        form.setValue(path, fieldValue, setValueOptions);
      }
    };

    const textFieldStyle: TextFieldProps = {
      inputRef,
      ...inputStyle,
      label: <DataFieldLabelText />,
      multiline: true,
      minRows: 2,
      maxRows: 2,
      defaultValue: defaultValue ?? '',
      onChange: (e) => {
        handleChange(e.target.value);
      },
      error: !!error,
      helperText: !error
        ? credentialsDisplayItem.credentialDisplayInfo.credentialRequest
            ?.description
        : error,
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
