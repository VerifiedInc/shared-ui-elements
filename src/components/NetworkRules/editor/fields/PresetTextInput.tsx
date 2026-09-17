import type { Ref } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import {
  filterPresetOptions,
  presetOptionLabel,
  type PresetOption,
} from './presetOptions';

export interface PresetTextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  presets?: readonly string[];
  onCreatePreset?: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  inputRef?: Ref<HTMLInputElement>;
}

/**
 * A single free-text value with the brand's presets as suggestions; the chip-based
 * `TextValuesInput` is for a condition's several values. Leaving the field keeps the text but
 * creates no preset — see the note in `presetOptions.ts` before changing that.
 */
export function PresetTextInput({
  label,
  value,
  onChange,
  onBlur,
  presets = [],
  onCreatePreset,
  maxLength,
  placeholder,
  required,
  disabled,
  error,
  helperText,
  inputRef,
}: Readonly<PresetTextInputProps>) {
  return (
    <Autocomplete<PresetOption, false, false, true>
      freeSolo
      autoHighlight
      selectOnFocus
      handleHomeEndKeys
      options={presets as PresetOption[]}
      value={value}
      inputValue={value}
      disabled={disabled}
      getOptionLabel={presetOptionLabel}
      isOptionEqualToValue={(option, selected) =>
        presetOptionLabel(option) === presetOptionLabel(selected)
      }
      filterOptions={(options, state) =>
        filterPresetOptions(options, state, onCreatePreset !== undefined)
      }
      onInputChange={(_event, next, reason) => {
        if (reason !== 'reset') onChange(next);
      }}
      onChange={(_event, next) => {
        if (next === null) {
          onChange('');
        } else if (typeof next === 'string') {
          onChange(next);
        } else {
          onChange(next.inputValue);
          onCreatePreset?.(next.inputValue);
        }
      }}
      onBlur={onBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          inputRef={inputRef}
          inputProps={{ ...params.inputProps, maxLength }}
        />
      )}
    />
  );
}
