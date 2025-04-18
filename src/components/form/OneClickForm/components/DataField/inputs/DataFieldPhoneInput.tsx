import { memo, ReactElement, useEffect } from 'react';
import { Box } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { PhoneInput } from '../../../../../form/PhoneInput';

import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldClearAdornment, DataFieldLabelText } from '..';

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
    const { isValid } = itemValid;
    const value = objectController.field.value.value;

    const handleChangeCountry = (_value: string): void => {
      handleChangeValueCredential('');
    };

    // Autofill phone number if it is passed as a query param.
    useEffect(() => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.searchParams);
      const phoneParam = searchParams.get('phone');

      if (phoneParam) {
        const interval = setTimeout(() => {
          handleChangeValueCredential(phoneParam, {
            shouldValidate: false,
          });
        }, 10);
        return () => clearInterval(interval);
      }
    }, []);

    const handleChange = (newValue: string): void => {
      if (credentialsDisplayItem.isDisabled) return;
      handleChangeValueCredential(newValue, {
        shouldValidate: newValue.length > 3,
      });
    };

    return (
      <Box width='100%'>
        <PhoneInput
          label={<DataFieldLabelText />}
          size='small'
          onChange={handleChange}
          helperText={credentialDisplayInfo.credentialRequest?.description}
          error={!isValid}
          handleChangeCountry={handleChangeCountry}
          value={value}
          shouldHaveClearButton
          shouldHaveSelectCountryButton={false}
          InputProps={{
            endAdornment: <DataFieldClearAdornment />,
          }}
          disabled={credentialsDisplayItem.isDisabled}
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

export function DataFieldPhoneInput(): ReactElement {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldPhoneInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
