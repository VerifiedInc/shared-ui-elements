import React from 'react';
import { Stack, ToggleButton } from '@mui/material';

interface InternalBrandNameToggleProps {
  selected: boolean;
  onChange: (selected: boolean) => void;
}

/** Sits by a chart's brand legend; swaps external brand names for internal ones. */
export function InternalBrandNameToggle({
  selected,
  onChange,
}: Readonly<InternalBrandNameToggleProps>): React.ReactNode {
  return (
    <Stack direction='row' justifyContent='flex-end'>
      <ToggleButton
        value='internal-brand-name'
        selected={selected}
        onChange={() => onChange(!selected)}
        size='small'
        aria-label='Show Internal Brand Name'
        aria-pressed={selected}
      >
        Show Internal Brand Name
      </ToggleButton>
    </Stack>
  );
}
