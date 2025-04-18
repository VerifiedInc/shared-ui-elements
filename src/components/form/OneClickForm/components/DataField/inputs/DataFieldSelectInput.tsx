import { useEffect, useMemo } from 'react';
import { Autocomplete, Box, TextField, TextFieldProps } from '@mui/material';

import { inputStyle } from '../../../styles/input';
import { useCanFillByQueryParam } from '../../../hooks/useCanFillByQueryParam';

import { useCredentialsDisplay } from '../../CredentialsDisplay/CredentialsDisplayContext';
import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';
import {
  findCorrectSchemaProperty,
  isRequiredCredentialDisplayInfo,
  getLastPathName,
} from '../../CredentialsDisplay/utils';
import { DataFieldLabelText } from '../../DataField/DataFieldLabelText';

/**
 * This component manages the input of type Select.
 * @constructor
 */
export function DataFieldSelectInput() {
  const { schema } = useCredentialsDisplay();
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const canFillByQueryParam = useCanFillByQueryParam();

  const {
    objectController,
    credentialDisplayInfo,
    parentFieldSet,
    handleChangeValueCredential,
    handleClearValueCredential,
  } = credentialsDisplayItem;

  const { isValid } = useCredentialsDisplayItemValid();

  const schemaProperty = findCorrectSchemaProperty(
    credentialDisplayInfo.schema,
    schema,
    parentFieldSet,
  );

  // Format the options in label/value keypair.
  const options = useMemo(() => {
    return (schemaProperty?.input?.options || []).map((option: any) => {
      if (typeof option === 'string') return { label: option, value: option };
      return option;
    });
  }, [schemaProperty?.input?.options]);

  // Options used by autocomplete component.
  const autoCompleteOptions = useMemo(
    () =>
      options.map((option: any) => ({ label: option.label, id: option.value })),
    [options],
  );

  const defaultValue = useMemo(() => {
    // Try to use schema default input value if it is set and the credential is required.
    if (
      schemaProperty?.input?.default &&
      isRequiredCredentialDisplayInfo({
        mandatory: credentialDisplayInfo.credentialRequest?.mandatory,
      })
    ) {
      const defaultOption = autoCompleteOptions.find(
        (option: any) => option.id === schemaProperty?.input?.default,
      );

      if (defaultOption) {
        return { label: defaultOption.label, id: defaultOption.id };
      }
    }

    // If the default input value is not set, return undefined.
    return undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaProperty?.input?.default, autoCompleteOptions]);

  const value = useMemo(() => {
    const option = options.find(
      (option: any) => option.value === objectController.field.value.value,
    );

    if (option?.value) {
      return { label: option.label, id: option.value };
    }

    return null;
  }, [options, objectController.field.value.value]);

  const textFieldStyle: TextFieldProps = {
    ...inputStyle,
    label: <DataFieldLabelText />,
    error: !isValid,
    helperText: credentialDisplayInfo.credentialRequest?.description,
    inputProps: {
      // Tab index for each block.
      tabIndex: 0,
    },
    fullWidth: true,
  };

  // Effect to check value existence in option list.
  useEffect(() => {
    const valueExistInOptions = options.some(
      (option: any) => option.value === objectController.field.value.value,
    );
    if (!valueExistInOptions && !!objectController.field.value.value) {
      // Clears the input value if it does not exist in the options.
      handleClearValueCredential();
    }
  }, [objectController.field.value.value, options]);

  // Effect to set default value.
  useEffect(() => {
    if (defaultValue?.id) {
      handleChangeValueCredential(defaultValue.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const option = options.find(
        (opt: any) =>
          opt.value === fieldValueParam || opt.label === fieldValueParam,
      );

      if (option) {
        const interval = setTimeout(() => {
          handleChangeValueCredential(option.value);
        }, 10 /** Timeout required to avoid race condition */);

        return () => clearTimeout(interval);
      }
    }
  }, []);

  return (
    <Box width='100%'>
      <Autocomplete
        disablePortal
        autoHighlight
        defaultValue={defaultValue}
        options={autoCompleteOptions}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        value={value}
        onChange={(_event, newInputValue) => {
          if (credentialsDisplayItem.isDisabled) return;
          if (!newInputValue) {
            // User clicked on clear button.
            handleClearValueCredential();
            return;
          }

          handleChangeValueCredential(newInputValue?.id ?? '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            {...textFieldStyle}
            inputProps={{
              ...params.inputProps,
              ...textFieldStyle.inputProps,
            }}
          />
        )}
        disabled={credentialsDisplayItem.isDisabled}
      />
    </Box>
  );
}
