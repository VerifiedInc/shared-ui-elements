import { Typography } from '@mui/material';

import type { NetworkRuleOption } from '../types';

/** The label with its code inline, so the code ends the label's last line when the label wraps. */
export function OptionLabel({
  option,
}: Readonly<{ option: NetworkRuleOption }>) {
  return (
    <Typography>
      {option.label}
      <Typography
        component='span'
        variant='caption'
        color='text.secondary'
        sx={{ ml: 1 }}
      >
        {option.value}
      </Typography>
    </Typography>
  );
}
