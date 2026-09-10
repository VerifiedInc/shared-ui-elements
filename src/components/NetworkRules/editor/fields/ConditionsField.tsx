import { Button, FormHelperText, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { NetworkRuleCatalog, NetworkRuleFormValues } from '../../types';
import { emptyConditionFormValues } from '../../utils/condition';
import { ConditionRow } from './ConditionRow';

export interface ConditionsFieldProps {
  catalog: NetworkRuleCatalog;
  disabled?: boolean;
  focusIndex?: number;
}

export function ConditionsField({
  catalog,
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
