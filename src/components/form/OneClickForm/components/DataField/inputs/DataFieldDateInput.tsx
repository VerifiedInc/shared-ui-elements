import { memo, ReactElement, useState } from 'react';
import { Box } from '@mui/material';
import isEqual from 'lodash/isEqual';

import { DateInput } from '../../../../../form';

import { credentialTypes } from '../../../constants';
import { inputStyle } from '../../../styles/input';
import { formatDateMMDDYYYY } from '../../../utils/date';
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
    const { description } = credentialDisplayInfo.credentialRequest ?? {};
    const { isValid } = itemValid;
    const errorMessageRaw = objectController.fieldState.error?.message;
    const errorMessage =
      errorMessageRaw && errorMessageRaw.length > 0
        ? errorMessageRaw
        : description;

    // Arbitrary value to format the timestamp into human-readable date.
    const [localValue, setLocalValue] = useState<string>(
      objectController.field.value.value
        ? formatDateMMDDYYYY(objectController.field.value.value)
        : '',
    );

    const isDob =
      objectController.field.value.type === credentialTypes.BirthDateCredential;

    const nowDate = new Date();

    // Min date boundaries (always 1900)
    const minYear = 1900;
    const minMonth = 1;
    const minDay = 1;

    // Max date boundaries (today for regular dates, 18 years ago for birth dates)
    const maxYear = isDob
      ? nowDate.getUTCFullYear() - 18
      : nowDate.getUTCFullYear();
    const maxMonth = nowDate.getUTCMonth() + 1;
    const maxDay = nowDate.getUTCDate();

    // For the picker, we need to create local timezone dates that represent the same calendar dates
    // as our UTC boundaries, so the picker displays the correct selectable range
    const minDateForPicker = new Date(minYear, minMonth - 1, minDay);
    const maxDateForPicker = new Date(maxYear, maxMonth - 1, maxDay);

    return (
      <Box width='100%'>
        <DateInput
          {...inputStyle}
          autoComplete='bday'
          autoCorrect='off'
          label={<DataFieldLabelText />}
          value={localValue}
          error={!isValid}
          helperText={isValid ? description : errorMessage}
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
            const dateTimestamp = Date.UTC(year, month - 1, day, 12, 0, 0, 0);

            handleChangeValueCredential(String(dateTimestamp));
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
          minDate={minDateForPicker}
          maxDate={maxDateForPicker}
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
