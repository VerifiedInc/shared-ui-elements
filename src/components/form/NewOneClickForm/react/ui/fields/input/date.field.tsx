import { useRef, useState } from 'react';
import { Box } from '@mui/material';

import { USDateSchema } from '../../../../../../../validations/date.schema';
import { formatDateMMDDYYYY } from '../../../../../../../utils/date';

import { DateInput } from '../../../../../../form';

import { credentialKeys, fieldInputTypes } from '../../../../core/fields';

import { useFormField } from '../../../core/field.hook';

import { getAutoCompleteAttributeValue } from '../shared';

import { FieldLabel } from './label';
import { ClearFieldAdornment } from './clear-field-adornment';

export function DateInputField({ fieldKey }: { fieldKey: string }) {
  const { field, setValue } = useFormField({ key: fieldKey });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localValue, setLocalValue] = useState<string>(
    field?.value ? formatDateMMDDYYYY(field?.value) : '',
  );

  if (
    !field ||
    field.schema.characteristics.inputType !== fieldInputTypes.date
  ) {
    return null;
  }

  const isDob = field.schema.key === credentialKeys.birthDate;
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

  const handleChange = (value: string) => {
    if (field.isDisabled) return;

    const valid = USDateSchema.safeParse(value);
    const valueParsed = value.replace(/[^0-9]/g, '');

    // Update local value for display
    setLocalValue(value);

    if (valueParsed.length <= 0) {
      return setValue('');
    }

    if (!valid.success) {
      return setValue('NaN');
    }

    // Parse the date string (MM/DD/YYYY) and create a UTC date
    const [month, day, year] = value.split('/').map(Number);
    const dateTimestamp = Date.UTC(year, month - 1, day, 12, 0, 0, 0);

    setValue(String(dateTimestamp));
  };

  const handleClear = () => {
    setLocalValue('');
    setValue('');
  };

  return (
    <Box width='100%'>
      <DateInput
        inputRef={inputRef}
        variant='outlined'
        size='small'
        autoComplete={getAutoCompleteAttributeValue(field.schema.key)}
        label={<FieldLabel fieldKey={fieldKey} />}
        value={localValue}
        onChange={handleChange}
        error={!field?.isValid}
        helperText={
          field.errorMessage?.length ? field.errorMessage : field?.description
        }
        placeholder={field.schema.characteristics.placeholder}
        pickerDefaultSelectedDate={new Date('08/01/1989')}
        minDate={minDateForPicker}
        maxDate={maxDateForPicker}
        disabled={field.isDisabled}
        InputProps={{
          endAdornment: (
            <ClearFieldAdornment
              fieldKey={fieldKey}
              onClick={handleClear}
              disabled={field.isDisabled}
            />
          ),
        }}
      />
    </Box>
  );
}
