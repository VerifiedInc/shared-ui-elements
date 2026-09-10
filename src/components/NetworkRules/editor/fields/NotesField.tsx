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

export function NotesField({
  presets = [],
  onCreatePreset,
  disabled,
  helperText = 'Returned with the network status so your app can act on it',
}: Readonly<NotesFieldProps>) {
  const { control } = useFormContext<NetworkRuleFormValues>();
  const { field, fieldState } = useController({ control, name: 'notes' });
  const value = field.value ?? '';

  return (
    <Autocomplete<NoteOption, false, false, true>
      freeSolo
      // Enter picks the highlighted suggestion instead of submitting the dialog.
      autoHighlight
      options={presets as NoteOption[]}
      value={null}
      inputValue={value}
      disabled={disabled}
      getOptionLabel={optionLabel}
      onInputChange={(_event, next, reason) => {
        if (reason === 'reset') return;
        field.onChange(next === '' ? null : next);
      }}
      onChange={(_event, next) => {
        if (next === null) {
          field.onChange(null);
          return;
        }
        if (typeof next === 'string') {
          field.onChange(next);
          return;
        }
        field.onChange(next.inputValue);
        void onCreatePreset?.(next.inputValue);
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
          onBlur={field.onBlur}
          error={fieldState.error !== undefined}
          helperText={fieldState.error?.message ?? helperText}
        />
      )}
    />
  );
}
