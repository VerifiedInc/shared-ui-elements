import { useEffect, useMemo } from 'react';
import { Autocomplete, Box, TextField, TextFieldProps } from '@mui/material';

import { inputStyle } from '../../../styles/input';

import { useCredentialsDisplay } from '../../CredentialsDisplay/CredentialsDisplayContext';
import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';
import {
  findCorrectSchemaProperty,
  isRequiredCredentialDisplayInfo,
} from '../../CredentialsDisplay/utils';
import { DataFieldLabelText } from '../../DataField/DataFieldLabelText';

/**
 * This component manages the input of type Select.
 * @constructor
 */
export function DataFieldSelectInput() {
  const { schema } = useCredentialsDisplay();
  const credentialsDisplayItem = useCredentialsDisplayItem();

  const {
    objectController,
    credentialDisplayInfo,
    parentFieldSet,
    handleChangeValueCredential,
    handleClearValueCredential,
  } = credentialsDisplayItem;

  const { isValid, errorMessage } = useCredentialsDisplayItemValid();

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
    helperText: isValid
      ? credentialDisplayInfo.credentialRequest?.description
      : errorMessage,
    inputProps: {
      // prevent this element from being recorded by Sentry
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // 'data-sentry-mask':
      //   appContext.config.env.env === 'production' || undefined,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectController.field.value.value, options]);

  // Effect to set default value.
  useEffect(() => {
    // If the value is not set and the default value is set, set the default value.
    if (!value?.label && defaultValue) {
      handleChangeValueCredential(defaultValue.id);
    }

    // The dependency value is not in the array because we want to set the default value only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

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
          // User clicked on clear button.
          if (!newInputValue) {
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
      />
    </Box>
  );
}
