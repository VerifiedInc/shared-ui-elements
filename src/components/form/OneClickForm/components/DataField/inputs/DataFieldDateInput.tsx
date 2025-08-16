import { memo, ReactElement, useState } from 'react';
import { Box } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { DateInput } from '../../../../../form';

import { inputStyle } from '../../../styles/input';
import { formatDateDDMMYYYY } from '../../../utils/date';
import { useOneClickFormOptions } from '../../../contexts/one-click-form-options.context';

import { USDateSchema } from '../../validations/schemas/date.schema';
import { useCredentialsDisplayItemValid } from '../../CredentialsDisplay/hooks';
import { useCredentialsDisplayItem } from '../../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldLabelText } from '../DataFieldLabelText';
import { DataFieldClearAdornment } from '../DataFieldClearAdornment';

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
      options: { features },
    } = useOneClickFormOptions();
    const {
      objectController,
      credentialDisplayInfo,
      handleChangeValueCredential,
    } = credentialsDisplayItem;
    const { isValid } = itemValid;

    // Arbitrary value to format the timestamp into human-readable date.
    const [localValue, setLocalValue] = useState<string>(
      objectController.field.value.value
        ? formatDateDDMMYYYY(objectController.field.value.value)
        : '',
    );

    const nowDate = new Date();
    const minDate = 1;
    const minMonth = 1;
    const minYear = 1900;
    const minDateInstance = new Date(
      minYear,
      minMonth - 1,
      minDate,
      0,
      0,
      0,
      0,
    );

    const maxDate = nowDate.getDate();
    const maxMonth = nowDate.getMonth() + 1;
    const maxYear = nowDate.getFullYear();
    const maxDateInstance = new Date(
      maxYear,
      maxMonth - 1,
      maxDate,
      23,
      59,
      59,
      999,
    );

    return (
      <Box width='100%'>
        <DateInput
          {...inputStyle}
          autoComplete='bday'
          autoCorrect='off'
          label={<DataFieldLabelText />}
          value={localValue}
          error={!isValid}
          helperText={credentialDisplayInfo.credentialRequest?.description}
          placeholder='__/__/____'
          onChange={(value) => {
            if (credentialsDisplayItem.isDisabled) return;

            const valid = USDateSchema.safeParse(value);
            const valueParsed = value.replace(/[^0-9]/g, '');

            // Update the facade input value, so it let user input wrong/right values.
            setLocalValue(value);

            if (valueParsed.length <= 0) {
              // A way to make sure the data field state is empty is to empty the value.
              return handleChangeValueCredential('');
            }

            if (!valid.success) {
              // A way to make sure the data field state is invalid is to add an invalid date value.
              return handleChangeValueCredential('NaN');
            }

            // Parse the date string (MM/DD/YYYY) and create a UTC date
            const [month, day, year] = value.split('/').map(Number);
            const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));

            if (date < minDateInstance || date > maxDateInstance) {
              // A way to make sure the data field state is invalid is to add an invalid date value.
              return handleChangeValueCredential('NaN');
            }

            handleChangeValueCredential(String(+date));
          }}
          InputProps={{
            endAdornment: (
              <DataFieldClearAdornment
                onClick={() => {
                  if (credentialsDisplayItem.isDisabled) return;
                  setLocalValue('');
                }}
              />
            ),
          }}
          pickerInputOverflow
          pickerDefaultSelectedDate={new Date('08/01/1989')}
          pickerClickOutsideBoundaryElement={
            features.datePickerClickOutsideBoundaryElement
          }
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
 * This component manages the input of type Date.
 * @constructor
 */
export function DataFieldDateInput(): ReactElement {
  const credentialsDisplayItem = useCredentialsDisplayItem();
  const itemValid = useCredentialsDisplayItemValid();
  return (
    <DataFieldDateInputMemoized
      credentialsDisplayItem={credentialsDisplayItem}
      itemValid={itemValid}
    />
  );
}
