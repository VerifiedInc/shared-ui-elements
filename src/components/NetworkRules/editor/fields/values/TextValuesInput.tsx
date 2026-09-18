import { Fragment, useState } from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';

import { dedupeValues } from '../../../utils/condition';
import { renderPresetOption } from '../PresetOptionRow';
import {
  filterPresetOptions,
  presetOptionLabel,
  type PresetOption,
} from '../presetOptions';
import { OrSeparator } from './OrSeparator';

export interface TextValuesInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  multi: boolean;
  label: string;
  presets?: readonly string[];
  /** When set, a typed value that is not a preset offers "Add … as a preset". */
  onCreatePreset?: (value: string) => void;
  /** When set, each preset row offers an edit (or delete) control. */
  onEditPreset?: (value: string) => void;
  onDeletePreset?: (value: string) => void;
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
  onEditPreset,
  onDeletePreset,
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

  // Managing a preset moves focus to a dialog; the text typed to find it must not become a value.
  const manage = (
    handler: ((value: string) => void) | undefined,
  ): ((value: string) => void) | undefined =>
    handler
      ? (value) => {
          setInputValue('');
          handler(value);
        }
      : undefined;

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
      renderOption={renderPresetOption({
        onEdit: manage(onEditPreset),
        onDelete: manage(onDeletePreset),
      })}
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
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index }) as ReturnType<
            typeof getTagProps
          > & { key: string };
          return (
            <Fragment key={key}>
              {index > 0 && <OrSeparator />}
              <Chip {...tagProps} label={presetOptionLabel(option)} />
            </Fragment>
          );
        })
      }
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
