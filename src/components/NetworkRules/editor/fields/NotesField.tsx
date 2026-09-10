import { useState } from 'react';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';

import type { NetworkRuleFormValues } from '../../types';

export interface NotesFieldProps {
  presets?: readonly string[];
  /** When set, a typed note that is not a preset offers "Add … as a preset". */
  onCreatePreset?: (value: string) => void | Promise<void>;
  disabled?: boolean;
  helperText?: string;
}

type CreatePresetOption = { inputValue: string; label: string };
type NoteOption = string | CreatePresetOption;

const filter = createFilterOptions<NoteOption>();

const optionLabel = (option: NoteOption): string =>
  typeof option === 'string' ? option : option.label;

/**
 * One note, a preset or free text, shown as a chip so a preset reads as one.
 * `multiple` is only for the chip rendering: picking or typing replaces it.
 */
export function NotesField({
  presets = [],
  onCreatePreset,
  disabled,
  helperText = 'Returned with the network status so your app can act on it',
}: Readonly<NotesFieldProps>) {
  const { control } = useFormContext<NetworkRuleFormValues>();
  const { field, fieldState } = useController({ control, name: 'notes' });
  const [inputValue, setInputValue] = useState('');
  const note = field.value?.trim() ? field.value : null;

  return (
    <Autocomplete<NoteOption, true, false, true>
      multiple
      freeSolo
      // Enter picks the highlighted suggestion instead of submitting the dialog.
      autoHighlight
      options={presets as NoteOption[]}
      value={note ? [note] : []}
      inputValue={inputValue}
      disabled={disabled}
      getOptionLabel={optionLabel}
      isOptionEqualToValue={(option, selected) =>
        optionLabel(option) === optionLabel(selected)
      }
      onInputChange={(_event, next, reason) => {
        if (reason !== 'reset') setInputValue(next);
      }}
      onChange={(_event, next) => {
        const last = next[next.length - 1];
        if (last === undefined) {
          field.onChange(null);
        } else if (typeof last === 'string') {
          field.onChange(last);
        } else {
          field.onChange(last.inputValue);
          void onCreatePreset?.(last.inputValue);
        }
        setInputValue('');
      }}
      onBlur={() => {
        if (inputValue.trim()) {
          field.onChange(inputValue.trim());
          setInputValue('');
        }
        field.onBlur();
      }}
      filterOptions={(options, state) => {
        const filtered = filter(options, state);
        const input = state.inputValue.trim();
        const exists = options.some(
          (option) =>
            typeof option === 'string' &&
            option.toLowerCase() === input.toLowerCase(),
        );
        if (input && onCreatePreset && !exists) {
          filtered.push({
            inputValue: input,
            label: `Add "${input}" as a preset`,
          });
        }
        return filtered;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Notes'
          placeholder={note ? undefined : 'Pick a preset or type a note'}
          error={fieldState.error !== undefined}
          helperText={fieldState.error?.message ?? helperText}
        />
      )}
    />
  );
}
