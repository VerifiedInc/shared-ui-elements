import { type ReactElement, useMemo } from 'react';
import {
  type PopperProps,
  Autocomplete,
  FormControl,
  Popper,
  TextField,
} from '@mui/material';

import { timezones } from './timezones';

const PopperComponent = function PopperComponent(
  props: PopperProps,
): ReactElement {
  return (
    <Popper
      {...props}
      style={{ width: 'fit-content' }}
      placement='bottom-end'
    />
  );
};

/**
 * Props for the TimezoneInput component.
 */
interface TimezoneInputProps {
  /**
   * The currently selected timezone code.
   * This should be a valid IANA timezone identifier (e.g., 'America/New_York', 'Europe/London').
   * The value must match one of the timezone codes from the timezones.json file.
   */
  value: string;

  /**
   * Callback fired when the timezone selection changes.
   * @param value - The new timezone code selected by the user
   */
  onChange: (value: string) => void;
}

export function TimezoneInput({
  value,
  onChange,
}: TimezoneInputProps): ReactElement {
  const options = useMemo(() => {
    return timezones.map((timezone) => ({
      tzCode: timezone.name,
      label: `${timezone.name} (GMT${timezone.utc_offset.includes('-') ? '' : '+'}${timezone.utc_offset.replace(/(.*)(:00)$/, '$1')})`,
    }));
  }, []);

  const getTimezoneOption = (timezone: string) => {
    return options.find((option) => option.tzCode === timezone);
  };

  const selected = getTimezoneOption(value);

  return (
    <FormControl fullWidth>
      <Autocomplete
        disablePortal
        disableClearable
        value={selected}
        options={options}
        getOptionLabel={(option) => option.label.replace(/_/gm, ' ')}
        getOptionKey={(option) => option.tzCode}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              value:
                params.inputProps?.value
                  ?.toString()
                  ?.match(/.*\((.*)\)/)?.[1] ?? '',
            }}
            label='Timezone'
          />
        )}
        isOptionEqualToValue={(option, value) => option.tzCode === value.tzCode}
        onChange={(e, newValue) => {
          if (!newValue) return;

          onChange(newValue.tzCode);
        }}
        sx={{
          width: 166,
          '& *': { whiteSpace: 'pre', wordBreak: 'break-all' },
          '& .MuiAutocomplete-option': {
            scrollbarWidth: 'thin',
            opacity: 0,
          },
        }}
        PopperComponent={PopperComponent}
        slotProps={{
          popper: {
            sx: {
              whiteSpace: 'pre',
              wordBreak: 'break-all',
              '& *': {
                scrollbarWidth: 'thin',
                whiteSpace: 'pre',
                wordBreak: 'break-all',
              },
            },
          },
        }}
      />
    </FormControl>
  );
}
