import type { ReactNode } from 'react';
import { Chip, Stack } from '@mui/material';

import { LogoChip } from '../../UI/LogoChip';
import type { NetworkRuleOption } from '../types';

export interface OptionChipsProps {
  options: readonly NetworkRuleOption[];
  /** Remote-source values: chips carry the option's logo, or its initial. */
  withLogo?: boolean;
  emptyPlaceholder?: ReactNode;
}

/** Condition values as a wrapping row of chips. */
export function OptionChips({
  options,
  withLogo = false,
  emptyPlaceholder = '-',
}: Readonly<OptionChipsProps>) {
  if (options.length === 0) {
    return <>{emptyPlaceholder}</>;
  }

  return (
    <Stack direction='row' flexWrap='wrap' useFlexGap gap={0.75}>
      {options.map((option) =>
        withLogo ? (
          <LogoChip
            key={option.value}
            size='small'
            label={option.label}
            name={option.label}
            logoUrl={option.logoUrl}
          />
        ) : (
          <Chip key={option.value} size='small' label={option.label} />
        ),
      )}
    </Stack>
  );
}
