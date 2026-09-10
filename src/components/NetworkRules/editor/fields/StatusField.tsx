import { MenuItem, TextField } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';

import { NetworkStatusChip } from '../../shared/NetworkStatusChip';
import type { NetworkRuleFormValues } from '../../types';

export interface StatusFieldProps {
  statuses: readonly string[];
  disabled?: boolean;
}

export function StatusField({
  statuses,
  disabled,
}: Readonly<StatusFieldProps>) {
  const { control } = useFormContext<NetworkRuleFormValues>();
  const { field, fieldState } = useController({ control, name: 'status' });

  return (
    <TextField
      select
      fullWidth
      required
      label='Status'
      value={field.value}
      onChange={(event) => {
        field.onChange(event.target.value);
      }}
      onBlur={field.onBlur}
      inputRef={field.ref}
      disabled={disabled}
      error={fieldState.error !== undefined}
      helperText={fieldState.error?.message}
      SelectProps={{
        renderValue: (value) => <NetworkStatusChip status={String(value)} />,
      }}
    >
      {statuses.map((status) => (
        <MenuItem key={status} value={status}>
          <NetworkStatusChip status={status} />
        </MenuItem>
      ))}
    </TextField>
  );
}
