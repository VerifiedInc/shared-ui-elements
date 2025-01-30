import { memo, useEffect } from 'react';
import { Box } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';
import PhoneInput from '../../shared/PhoneInput';

import { DataFieldClearAdornment } from '../DataFieldClearAdornment';

type DataFieldPhoneInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

/**
 * This component manages the input of type Phone.
 * @constructor
 */
const DataFieldPhoneInputMemoized = memo(
  function DataFieldPhoneInputMemoized({
    credentialsDisplayItem,
    itemValid,
  }: DataFieldPhoneInputMemoizedProps) {
    const {
      objectController,
      credentialDisplayInfo,
      handleChangeValueCredential,
    } = credentialsDisplayItem;
    const { isValid, errorMessage } = itemValid;

    const handleChangeCountry = (_value: string): void => {
      handleChangeValueCredential('');
    };

    // Autofill phone number if it is passed as a query param.
    useEffect(() => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.searchParams);
      const phoneParam = searchParams.get('phone');

      if (phoneParam) {
        console.log('+' + phoneParam);
        const interval = setTimeout(() => {
          handleChangeValueCredential(phoneParam, {
            shouldValidate: false,
          });
        }, 10);
        return () => clearInterval(interval);
      }
    }, []);

    const handleChange = (newValue: string) => {
      handleChangeValueCredential(newValue, {
        shouldValidate: newValue.length > 3,
      });
    };

    const helperText = isValid
      ? credentialDisplayInfo.credentialRequest?.description
      : errorMessage;

    return (
      <Box width='100%'>
        <PhoneInput
          label={credentialDisplayInfo.label}
          onChange={handleChange}
          helperText={helperText}
          error={!isValid}
          handleChangeCountry={handleChangeCountry}
          value={objectController.field.value.value}
          InputProps={{ endAdornment: <DataFieldClearAdornment /> }}
        />
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

export function DataFieldPhoneInput() {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldPhoneInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
