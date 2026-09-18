import { IconButton, MenuItem, Stack, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useController, useFormContext } from 'react-hook-form';

import type {
  NetworkRuleFormValues,
  NetworkRuleMetadataLimits,
  NetworkRuleMetadataType,
} from '../../types';
import {
  NETWORK_RULE_METADATA_BOOLEAN_OPTIONS,
  NETWORK_RULE_METADATA_PRESET_FIELDS,
  isPartialNumberInput,
  metadataTypeLabel,
} from '../../utils/metadata';
import { PresetTextInput } from './PresetTextInput';

export interface MetadataRowProps {
  index: number;
  onRemove: () => void;
  types: readonly NetworkRuleMetadataType[];
  limits: NetworkRuleMetadataLimits;
  keyPresets?: readonly string[];
  valuePresets?: readonly string[];
  /** Called with the preset field the value belongs to, as `ConditionRow` does with its key. */
  onCreatePreset?: (field: string, value: string) => void;
  onEditPreset?: (field: string, value: string) => void;
  onDeletePreset?: (field: string, value: string) => void;
  disabled?: boolean;
}

/** One `key: value` pair. No IF/AND: metadata is carried along, not matched on. */
export function MetadataRow({
  index,
  onRemove,
  types,
  limits,
  keyPresets = [],
  valuePresets = [],
  onCreatePreset,
  onEditPreset,
  onDeletePreset,
  disabled = false,
}: Readonly<MetadataRowProps>) {
  const { control, setValue, formState } =
    useFormContext<NetworkRuleFormValues>();

  const keyField = useController({ control, name: `metadata.${index}.key` });
  const typeField = useController({ control, name: `metadata.${index}.type` });
  const valueField = useController({
    control,
    name: `metadata.${index}.value`,
  });

  const type = typeField.field.value;
  const value = valueField.field.value;
  const shouldValidate = formState.isSubmitted;
  const valueError = valueField.fieldState.error?.message;
  // What every shape of the value input shares; each adds only how it takes input.
  const valueInputProps = {
    required: true,
    label: 'Value',
    onBlur: valueField.field.onBlur,
    inputRef: valueField.field.ref,
    disabled,
    error: valueError !== undefined,
    helperText: valueError,
  };
  const forField = (
    handler: ((field: string, value: string) => void) | undefined,
    field: string,
  ): ((value: string) => void) | undefined =>
    handler
      ? (value) => {
          handler(field, value);
        }
      : undefined;

  // A value the new type cannot hold is cleared rather than left to fail validation.
  const handleTypeChange = (next: NetworkRuleMetadataType): void => {
    typeField.field.onChange(next);
    const keepsValue =
      next === 'string' ||
      (next === 'number' && isPartialNumberInput(value)) ||
      (next === 'boolean' && (value === 'true' || value === 'false'));
    if (!keepsValue) {
      setValue(`metadata.${index}.value`, '', {
        shouldDirty: true,
        shouldValidate,
      });
    }
  };

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={1.5}
      alignItems='flex-start'
    >
      <Stack sx={{ minWidth: { md: 200 }, width: { xs: '100%', md: 'auto' } }}>
        <PresetTextInput
          label='Key'
          required
          value={keyField.field.value}
          onChange={keyField.field.onChange}
          onBlur={keyField.field.onBlur}
          inputRef={keyField.field.ref}
          presets={keyPresets}
          onCreatePreset={forField(
            onCreatePreset,
            NETWORK_RULE_METADATA_PRESET_FIELDS.key,
          )}
          onEditPreset={forField(
            onEditPreset,
            NETWORK_RULE_METADATA_PRESET_FIELDS.key,
          )}
          onDeletePreset={forField(
            onDeletePreset,
            NETWORK_RULE_METADATA_PRESET_FIELDS.key,
          )}
          maxLength={limits.maxKeyLength}
          placeholder='Pick a preset or type a key'
          disabled={disabled}
          error={keyField.fieldState.error !== undefined}
          helperText={keyField.fieldState.error?.message}
        />
      </Stack>

      <TextField
        select
        required
        label='Type'
        value={type}
        onChange={(event) => {
          handleTypeChange(event.target.value as NetworkRuleMetadataType);
        }}
        onBlur={typeField.field.onBlur}
        inputRef={typeField.field.ref}
        disabled={disabled}
        error={typeField.fieldState.error !== undefined}
        helperText={typeField.fieldState.error?.message}
        sx={{ minWidth: { md: 140 }, width: { xs: '100%', md: 'auto' } }}
      >
        {types.map((option) => (
          <MenuItem key={option} value={option}>
            {metadataTypeLabel(option)}
          </MenuItem>
        ))}
      </TextField>

      <Stack flex={1} width='100%' minWidth={0}>
        {type === 'boolean' && (
          <TextField
            {...valueInputProps}
            select
            fullWidth
            value={value === 'true' || value === 'false' ? value : ''}
            onChange={(event) => {
              valueField.field.onChange(event.target.value);
            }}
          >
            {NETWORK_RULE_METADATA_BOOLEAN_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {type === 'number' && (
          <TextField
            {...valueInputProps}
            fullWidth
            value={value}
            onChange={(event) => {
              const next = event.target.value;
              // Digits only, so the field never holds something the API cannot take.
              if (isPartialNumberInput(next)) valueField.field.onChange(next);
            }}
            placeholder='Type a number'
            inputProps={{ inputMode: 'decimal' }}
          />
        )}

        {type === 'string' && (
          <PresetTextInput
            {...valueInputProps}
            value={value}
            onChange={valueField.field.onChange}
            presets={valuePresets}
            onCreatePreset={forField(
              onCreatePreset,
              NETWORK_RULE_METADATA_PRESET_FIELDS.value,
            )}
            onEditPreset={forField(
              onEditPreset,
              NETWORK_RULE_METADATA_PRESET_FIELDS.value,
            )}
            onDeletePreset={forField(
              onDeletePreset,
              NETWORK_RULE_METADATA_PRESET_FIELDS.value,
            )}
            maxLength={limits.maxValueLength}
            placeholder='Pick a preset or type a value'
          />
        )}
      </Stack>

      <IconButton
        aria-label={`Remove metadata ${index + 1}`}
        color='error'
        onClick={onRemove}
        disabled={disabled}
        sx={{ mt: { md: 1 } }}
      >
        <Delete />
      </IconButton>
    </Stack>
  );
}
