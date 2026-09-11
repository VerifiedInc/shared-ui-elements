import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { dedupeValues } from '../../../utils/condition';
import {
  filterPresetOptions,
  presetOptionLabel,
  type PresetOption,
} from '../presetOptions';

export interface TextValuesInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  multi: boolean;
  label: string;
  presets?: readonly string[];
  /** When set, a typed value that is not a preset offers "Add … as a preset". */
  onCreatePreset?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Free-text chips with the presets as suggestions. As in the notes field, Enter takes the
 * highlighted suggestion: a matching preset, or "Add … as a preset" for a new value.
 */
export function TextValuesInput({
  values,
  onChange,
  multi,
  label,
  presets = [],
  onCreatePreset,
  error,
  helperText,
  disabled,
  placeholder = 'Type a value and press Enter',
}: Readonly<TextValuesInputProps>) {
  const [inputValue, setInputValue] = useState('');

  const commit = (next: readonly string[]): void => {
    const deduped = dedupeValues(next);
    onChange(multi ? deduped : deduped.slice(-1));
  };

  return (
    <Autocomplete<PresetOption, true, false, true>
      multiple
      freeSolo
      autoHighlight
      options={presets as PresetOption[]}
      value={values}
      inputValue={inputValue}
      disabled={disabled}
      limitTags={4}
      getOptionLabel={presetOptionLabel}
      filterOptions={(options, state) =>
        filterPresetOptions(options, state, onCreatePreset !== undefined)
      }
      onInputChange={(_event, next) => {
        setInputValue(next);
      }}
      onChange={(_event, next) => {
        const created = next.find((option) => typeof option !== 'string');
        if (created !== undefined && typeof created !== 'string') {
          onCreatePreset?.(created.inputValue);
        }
        commit(
          next.map((option) =>
            typeof option === 'string' ? option : option.inputValue,
          ),
        );
        setInputValue('');
      }}
      onBlur={() => {
        if (inputValue.trim()) {
          commit([...values, inputValue]);
          setInputValue('');
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={values.length === 0 ? placeholder : undefined}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
