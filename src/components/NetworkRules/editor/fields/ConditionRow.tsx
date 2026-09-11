import { IconButton, MenuItem, Stack, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import type { NetworkRuleCatalog, NetworkRuleFormValues } from '../../types';
import {
  getKeyDef,
  getOperatorLabel,
  getPresets,
  isOperatorMulti,
} from '../../utils/catalog';
import { ConditionValuesInput } from './ConditionValuesInput';

export interface ConditionRowProps {
  index: number;
  catalog: NetworkRuleCatalog;
  onRemove: () => void;
  /** Presets created while editing, by condition key; shown after the catalog's. */
  addedPresets?: Readonly<Record<string, readonly string[]>>;
  onCreatePreset?: (key: string, value: string) => void;
  canRemove?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function ConditionRow({
  index,
  catalog,
  onRemove,
  addedPresets,
  onCreatePreset,
  canRemove = true,
  disabled = false,
  autoFocus,
}: Readonly<ConditionRowProps>) {
  const { control, setValue, formState } =
    useFormContext<NetworkRuleFormValues>();

  const keyField = useController({ control, name: `conditions.${index}.key` });
  const operatorField = useController({
    control,
    name: `conditions.${index}.operator`,
  });
  const valuesField = useController({
    control,
    name: `conditions.${index}.values`,
  });
  const values =
    useWatch({ control, name: `conditions.${index}.values` }) ?? [];

  const keyDef = getKeyDef(catalog, keyField.field.value);
  const allowedOperators = keyDef?.operators ?? [];
  const multi = isOperatorMulti(catalog, operatorField.field.value);
  const shouldValidate = formState.isSubmitted;
  const presets = keyDef
    ? [
        ...getPresets(catalog, keyDef.key),
        ...(addedPresets?.[keyDef.key] ?? []),
      ]
    : [];

  const handleKeyChange = (nextKey: string): void => {
    keyField.field.onChange(nextKey);
    const nextAllowed = getKeyDef(catalog, nextKey)?.operators ?? [];
    setValue(
      `conditions.${index}.operator`,
      nextAllowed.length === 1 ? nextAllowed[0] : '',
      { shouldDirty: true, shouldValidate },
    );
    setValue(`conditions.${index}.values`, [], {
      shouldDirty: true,
      shouldValidate,
    });
  };

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={1.5}
      alignItems='flex-start'
    >
      <TextField
        select
        required
        label='Key'
        value={keyField.field.value}
        onChange={(event) => {
          handleKeyChange(event.target.value);
        }}
        onBlur={keyField.field.onBlur}
        inputRef={keyField.field.ref}
        disabled={disabled}
        autoFocus={autoFocus}
        error={keyField.fieldState.error !== undefined}
        helperText={keyField.fieldState.error?.message}
        sx={{ minWidth: { md: 200 }, width: { xs: '100%', md: 'auto' } }}
      >
        {catalog.keys.map((definition) => (
          <MenuItem key={definition.key} value={definition.key}>
            {definition.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        required
        label='Operator'
        value={operatorField.field.value}
        onChange={(event) => {
          const nextOperator = event.target.value;
          operatorField.field.onChange(nextOperator);
          if (!isOperatorMulti(catalog, nextOperator) && values.length > 1) {
            setValue(`conditions.${index}.values`, values.slice(0, 1), {
              shouldDirty: true,
              shouldValidate,
            });
          }
        }}
        onBlur={operatorField.field.onBlur}
        inputRef={operatorField.field.ref}
        disabled={disabled || keyDef === undefined}
        error={operatorField.fieldState.error !== undefined}
        helperText={operatorField.fieldState.error?.message}
        sx={{ minWidth: { md: 180 }, width: { xs: '100%', md: 'auto' } }}
      >
        {allowedOperators.map((operator) => (
          <MenuItem key={operator} value={operator}>
            {getOperatorLabel(catalog, operator)}
          </MenuItem>
        ))}
      </TextField>

      <Stack flex={1} width='100%' minWidth={0}>
        <ConditionValuesInput
          keyDef={keyDef}
          multi={multi}
          values={values}
          onChange={(next) => {
            valuesField.field.onChange(next);
          }}
          presets={presets}
          onCreatePreset={
            onCreatePreset && keyDef
              ? (value) => {
                  onCreatePreset(keyDef.key, value);
                }
              : undefined
          }
          disabled={disabled || operatorField.field.value === ''}
          error={valuesField.fieldState.error !== undefined}
          helperText={valuesField.fieldState.error?.message}
        />
      </Stack>

      <IconButton
        aria-label={`Remove condition ${index + 1}`}
        color='error'
        onClick={onRemove}
        disabled={disabled || !canRemove}
        sx={{ mt: { md: 1 } }}
      >
        <Delete />
      </IconButton>
    </Stack>
  );
}
