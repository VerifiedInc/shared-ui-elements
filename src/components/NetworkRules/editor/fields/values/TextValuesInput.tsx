import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { dedupeValues } from '../../../utils/condition';

export interface TextValuesInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  multi: boolean;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
}

/** Free-text chips; Enter or blur adds the typed value. */
export function TextValuesInput({
  values,
  onChange,
  multi,
  label,
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
    <Autocomplete<string, true, false, true>
      multiple
      freeSolo
      options={[]}
      value={values}
      inputValue={inputValue}
      disabled={disabled}
      limitTags={4}
      onInputChange={(_event, next) => {
        setInputValue(next);
      }}
      onChange={(_event, next) => {
        commit(next);
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
