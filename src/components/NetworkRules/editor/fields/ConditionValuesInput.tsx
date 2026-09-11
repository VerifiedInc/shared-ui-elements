import { TextField } from '@mui/material';

import type { NetworkRuleKeyDef } from '../../types';
import { hasInlineOptions, hasRemoteSource } from '../../utils/catalog';
import { InlineValuesInput } from './values/InlineValuesInput';
import { RemoteValuesInput } from './values/RemoteValuesInput';
import { TextValuesInput } from './values/TextValuesInput';

export interface ConditionValuesInputProps {
  /** Undefined until a key is chosen. */
  keyDef: NetworkRuleKeyDef | undefined;
  multi: boolean;
  values: string[];
  onChange: (values: string[]) => void;
  /** Free-text keys only. */
  presets?: readonly string[];
  onCreatePreset?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

/** Pick-list, remote search or free text, by the shape of the key's `values`. */
export function ConditionValuesInput({
  keyDef,
  multi,
  values,
  onChange,
  presets,
  onCreatePreset,
  error,
  helperText,
  disabled,
}: Readonly<ConditionValuesInputProps>) {
  const label = multi ? 'Values' : 'Value';

  if (!keyDef) {
    return (
      <TextField
        fullWidth
        disabled
        label={label}
        placeholder='Select a key first'
        InputLabelProps={{ shrink: true }}
      />
    );
  }

  if (hasInlineOptions(keyDef)) {
    return (
      <InlineValuesInput
        options={keyDef.values.options}
        values={values}
        onChange={onChange}
        multi={multi}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
      />
    );
  }

  if (hasRemoteSource(keyDef)) {
    return (
      <RemoteValuesInput
        keyDef={keyDef}
        values={values}
        onChange={onChange}
        multi={multi}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
      />
    );
  }

  return (
    <TextValuesInput
      values={values}
      onChange={onChange}
      multi={multi}
      label={label}
      presets={presets}
      onCreatePreset={onCreatePreset}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
}
