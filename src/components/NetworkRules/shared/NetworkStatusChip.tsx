import { Chip, type ChipProps } from '@mui/material';

import { getStatusPresentation } from '../statuses';

export interface NetworkStatusChipProps extends Omit<
  ChipProps,
  'label' | 'color' | 'icon'
> {
  status: string;
}

export function NetworkStatusChip({
  status,
  size = 'small',
  sx,
  ...chipProps
}: Readonly<NetworkStatusChipProps>) {
  const presentation = getStatusPresentation(status);

  return (
    <Chip
      size={size}
      label={presentation.label}
      color={presentation.color ?? 'default'}
      icon={presentation.icon}
      sx={[
        { '& .MuiChip-label': { fontWeight: 700 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...chipProps}
    />
  );
}
