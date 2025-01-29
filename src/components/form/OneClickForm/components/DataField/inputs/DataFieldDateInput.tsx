import { memo } from 'react';
import { Box } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';
import { DateInput } from '../../shared/DateInput';

import { DataFieldLabelText } from '../DataFieldLabelText';

type DataFieldDateInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

const DataFieldDateInputMemoized = memo(
  function DataFieldDateInputMemoized({
    credentialsDisplayItem,
    itemValid,
  }: DataFieldDateInputMemoizedProps) {
    const {
      objectController,
      credentialDisplayInfo,
      handleChangeValueCredential,
    } = credentialsDisplayItem;
    const { isValid, errorMessage } = itemValid;

    return (
      <Box width='100%'>
        <DateInput
          label={<DataFieldLabelText />}
          value={objectController.field.value.value}
          error={!isValid}
          allowFutureDates={
            credentialDisplayInfo.credentialRequest?.type !==
            'BirthDateCredential'
          }
          helperText={
            isValid
              ? credentialDisplayInfo.credentialRequest?.description
              : errorMessage
          }
          onChange={(e) => handleChangeValueCredential(e.target.value)}
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

/**
 * This component manages the input of type Date.
 * @constructor
 */
export function DataFieldDateInput() {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldDateInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
