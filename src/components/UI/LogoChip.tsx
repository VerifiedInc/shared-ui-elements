import { Chip, type ChipProps } from '@mui/material';

import { LogoAvatar } from './LogoAvatar';

export interface LogoChipProps extends Omit<ChipProps, 'avatar'> {
  /** Entity name; drives the avatar's fallback initial. Pass `label` separately for the chip text. */
  name: string;
  logoUrl?: string | null;
}

/**
 * A chip carrying a `LogoAvatar`. The avatar is a rounded square, so it is
 * inset a little further than MUI's default round avatar to keep the pill's
 * curve from clipping its corners. MUI paints chip avatars in gray text, which
 * would swallow the fallback initial on its primary background, so the initial
 * is pinned to the primary contrast color.
 */
export function LogoChip({
  name,
  logoUrl,
  label,
  sx,
  ...chipProps
}: Readonly<LogoChipProps>) {
  return (
    <Chip
      {...chipProps}
      label={label ?? name}
      avatar={<LogoAvatar name={name} logoUrl={logoUrl} />}
      sx={[
        {
          '& .MuiChip-avatar': {
            marginLeft: '10px',
            color: 'primary.contrastText',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
