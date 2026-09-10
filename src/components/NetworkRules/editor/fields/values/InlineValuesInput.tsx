import { Autocomplete, Checkbox, TextField, Typography } from '@mui/material';

import type { NetworkRuleOption } from '../../../types';
import { toOptions } from '../../../utils/catalog';

export interface InlineValuesInputProps {
  options: readonly NetworkRuleOption[];
  values: string[];
  onChange: (values: string[]) => void;
  multi: boolean;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export function InlineValuesInput({
  options,
  values,
  onChange,
  multi,
  label,
  error,
  helperText,
  disabled,
}: Readonly<InlineValuesInputProps>) {
  const selected = toOptions(values, options);

  return (
    <Autocomplete<NetworkRuleOption, true, false, false>
      multiple
      options={options as NetworkRuleOption[]}
      value={selected}
      disabled={disabled}
      limitTags={4}
      disableCloseOnSelect={multi}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, candidate) =>
        option.value === candidate.value
      }
      onChange={(_event, next) => {
        const nextValues = next.map((option) => option.value);
        onChange(multi ? nextValues : nextValues.slice(-1));
      }}
      renderOption={(props, option, { selected: isSelected }) => {
        const { key, ...rest } = props as typeof props & { key: string };
        return (
          <li key={key} {...rest}>
            {multi && <Checkbox checked={isSelected} sx={{ mr: 1 }} />}
            <Typography>{option.label}</Typography>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={values.length === 0 ? 'Select…' : undefined}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
