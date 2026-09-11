import {
  Alert,
  Button,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { NetworkRuleCatalog, NetworkRuleFormValues } from '../../types';
import { emptyConditionFormValues } from '../../utils/condition';
import { ConditionRow } from './ConditionRow';

export interface ConditionsFieldProps {
  catalog: NetworkRuleCatalog;
  addedPresets?: Readonly<Record<string, readonly string[]>>;
  onCreatePreset?: (key: string, value: string) => void;
  disabled?: boolean;
  focusIndex?: number;
}

export function ConditionsField({
  catalog,
  addedPresets,
  onCreatePreset,
  disabled,
  focusIndex,
}: Readonly<ConditionsFieldProps>) {
  const { control, formState } = useFormContext<NetworkRuleFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'conditions',
  });

  const listError =
    formState.errors.conditions?.root?.message ??
    formState.errors.conditions?.message;

  return (
    <Stack spacing={2}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontWeight={700}>Conditions</Typography>
        <Button
          startIcon={<Add />}
          disabled={disabled}
          onClick={() => {
            append(emptyConditionFormValues());
          }}
        >
          Add Condition
        </Button>
      </Stack>

      <Alert severity='info'>
        If multiple values are selected for a given condition, that condition
        applies if any of the values match. In other words, multiple values map
        to an inclusive OR.
      </Alert>

      {fields.length === 0 && (
        <Typography variant='body2' color='text.secondary'>
          No conditions yet. A rule needs at least one; all conditions must
          match.
        </Typography>
      )}

      {fields.map((field, index) => (
        <ConditionRow
          key={field.id}
          index={index}
          catalog={catalog}
          addedPresets={addedPresets}
          onCreatePreset={onCreatePreset}
          disabled={disabled}
          autoFocus={index === focusIndex}
          onRemove={() => {
            remove(index);
          }}
        />
      ))}

      {listError && <FormHelperText error>{listError}</FormHelperText>}
    </Stack>
  );
}
