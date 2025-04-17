import { memo, ReactElement } from 'react';
import { Box } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { SSNInput } from '../../../../SSNInput';
import { inputStyle } from '../../../styles/input';

import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldClearAdornment } from '../DataFieldClearAdornment';

type DataFieldSSNInputMemoizedProps = {
  credentialsDisplayItem: ReturnType<typeof useCredentialsDisplayItem>;
  itemValid: ReturnType<typeof useCredentialsDisplayItemValid>;
};

/**
 * Memoized component for SSN input fields
 */
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
    const { isValid } = itemValid;
    const value = objectController.field.value.value;

    const handleChange = (event: { target: { value: string } }): void => {
      if (credentialsDisplayItem.isDisabled) return;
      handleChangeValueCredential(event.target.value, {
        shouldValidate: event.target.value.length > 0,
      });
    };

    return (
      <Box width='100%'>
        <SSNInput
          {...inputStyle}
          label={<DataFieldLabelText />}
          value={value}
          onChange={handleChange}
          error={!isValid}
          helperText={credentialDisplayInfo.credentialRequest?.description}
          InputProps={{
            endAdornment: (
              <DataFieldClearAdornment
                onClick={() => {
                  handleChange({ target: { value: '' } });
                }}
              />
            ),
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

/**
 * This component manages the input of type SSN.
 * @constructor
 */
export function DataFieldSSNInput(): ReactElement {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldSSNInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
