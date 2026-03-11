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

type TimezoneInputProps =
  | {
      value: string;
      onChange: (value: string) => void;
      disabled?: false;
    }
  | {
      value: string;
      onChange?: never;
      disabled: true;
    };

export function TimezoneInput({
  value,
  onChange,
  disabled,
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
        disabled={disabled}
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

          onChange?.(newValue.tzCode);
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
