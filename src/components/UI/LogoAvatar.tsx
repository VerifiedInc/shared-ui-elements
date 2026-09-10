import { useState } from 'react';
import { Avatar, type AvatarProps } from '@mui/material';

export interface LogoAvatarProps extends Omit<AvatarProps, 'src' | 'children'> {
  /** Entity name; its first letter is the fallback when there is no (working) logo. */
  name: string;
  logoUrl?: string | null;
  /** Width and height in px. Defaults to 32. */
  size?: number;
}

/**
 * Rounded-square avatar showing an entity's logo, falling back to its initial
 * on a primary background when the logo is missing or fails to load. Matches
 * the payer avatar in the 1-Click health insurance field.
 */
export function LogoAvatar({
  name,
  logoUrl,
  size = 32,
  sx,
  slotProps,
  ...avatarProps
}: Readonly<LogoAvatarProps>) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const logoSrc = logoUrl && logoUrl !== failedUrl ? logoUrl : undefined;

  return (
    <Avatar
      src={logoSrc}
      alt={`${name} logo`}
      variant='rounded'
      {...avatarProps}
      sx={[
        {
          width: size,
          height: size,
          fontSize: Math.round(size * 0.5),
          borderRadius: 1,
          bgcolor: logoSrc ? 'transparent' : 'primary.main',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      slotProps={{
        ...slotProps,
        img: {
          ...slotProps?.img,
          onError: () => {
            setFailedUrl(logoUrl ?? null);
          },
        },
      }}
    >
      {name.trim()[0]?.toUpperCase()}
    </Avatar>
  );
}
