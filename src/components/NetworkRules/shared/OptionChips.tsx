import { Fragment, type ReactNode } from 'react';
import { Chip, Stack, type ChipProps } from '@mui/material';

import type { NetworkRuleOption, NetworkRuleRenderChip } from '../types';

export interface OptionChipsProps {
  options: readonly NetworkRuleOption[];
  renderChip?: NetworkRuleRenderChip;
  emptyPlaceholder?: ReactNode;
}

/** Condition values as a wrapping row of chips. */
export function OptionChips({
  options,
  renderChip,
  emptyPlaceholder = '-',
}: Readonly<OptionChipsProps>) {
  if (options.length === 0) {
    return <>{emptyPlaceholder}</>;
  }

  return (
    <Stack direction='row' flexWrap='wrap' useFlexGap gap={0.75}>
      {options.map((option) => {
        const chipProps: ChipProps = { size: 'small', label: option.label };
        return (
          <Fragment key={option.value}>
            {renderChip ? (
              renderChip(option, chipProps)
            ) : (
              <Chip {...chipProps} />
            )}
          </Fragment>
        );
      })}
    </Stack>
  );
}
